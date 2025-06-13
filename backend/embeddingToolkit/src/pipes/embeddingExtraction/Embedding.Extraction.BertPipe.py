# Copyright 2009-2024 C3 AI (www.c3.ai). All Rights Reserved.
# Confidential and Proprietary C3 Materials.
# This material, including without limitation any software, is the confidential trade secret and proprietary
# information of C3 and its licensors. Reproduction, use and/or distribution of this material in any form is
# strictly prohibited except as set forth in a written license agreement with C3 and/or its authorized distributors.
# This material may be covered by one or more patents or pending patent applications.

logger = c3.log()


def doTrain(this, beforeTrainResults=None, spec=None):
    from transformers import AutoTokenizer, AutoModel

    tokenizer = AutoTokenizer.from_pretrained(this.modelName)
    encoder = AutoModel.from_pretrained(this.modelName)
    return {
        "model": {
            "encoder": encoder,
            "tokenizer": tokenizer,
        }
    }


def saveModel(this, modelDir, model):
    model["tokenizer"].save_pretrained(f"{modelDir}/tokenizer")
    model["encoder"].save_pretrained(f"{modelDir}/encoder")


def loadModel(this, modelDir):
    from transformers import AutoTokenizer, AutoModel

    tokenizer = AutoTokenizer.from_pretrained(f"{modelDir}/tokenizer")
    encoder = AutoModel.from_pretrained(f"{modelDir}/encoder")
    model = {"encoder": encoder, "tokenizer": tokenizer}
    return model


def doProcess(this, beforeProcessOutputs, spec=None):
    import torch
    import numpy as np
    from torch.utils.data import DataLoader

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    logger.info(f"torch is using device {device}")

    # `x` for this pipe will likely come from a materialized feature set and may have "subject" as a column
    model, x = beforeProcessOutputs["model"], this.setFeatureIndices(beforeProcessOutputs["x"])
    sentences = list(x["textString"])

    encoder, tokenizer = (
        model["encoder"],
        model["tokenizer"],
    )
    encoder = encoder.to(device)
    encoder.eval()

    batch_sentences = DataLoader(sentences, batch_size=this.batchSize)
    embeddings = []
    for batch in batch_sentences:
        tokens = tokenizer(batch, padding=True, truncation=True, return_tensors="pt")
        tokens = tokens.to(device)
        # Extract the cls-token
        with torch.no_grad():
            current_embedding = encoder(**tokens).last_hidden_state[:, 0, :].detach()
        embeddings.append(current_embedding)

    embeddings = list(torch.cat(embeddings, 0).cpu().numpy())
    x["embedding"] = embeddings
    return {"out": x}
