# Copyright 2009-2024 C3 AI (www.c3.ai). All Rights Reserved.
# Confidential and Proprietary C3 Materials.
# This material, including without limitation any software, is the confidential trade secret and proprietary
# information of C3 and its licensors. Reproduction, use and/or distribution of this material in any form is
# strictly prohibited except as set forth in a written license agreement with C3 and/or its authorized distributors.
# This material may be covered by one or more patents or pending patent applications.

logger = c3.log()


def doTrain(this, beforeTrainResults=None, spec=None):
    from sentence_transformers import SentenceTransformer

    encoder = SentenceTransformer(this.modelName)
    encoder.max_seq_length = this.maxSequenceLength
    return {
        "model": {
            "encoder": encoder,
        }
    }


def saveModel(this, modelDir, model):
    model["encoder"].save(f"{modelDir}/sentenceTransformer")


def loadModel(this, modelDir):
    from sentence_transformers import SentenceTransformer

    encoder = SentenceTransformer(f"{modelDir}/sentenceTransformer")
    model = {"encoder": encoder}
    return model


def doProcess(this, beforeProcessOutputs, spec=None):
    import torch

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    logger.info(f"torch is using device {device}")

    # `x` for this pipe will likely come from a materialized feature set and may have "subject" as a column
    model, x = beforeProcessOutputs["model"], this.setFeatureIndices(beforeProcessOutputs["x"])
    sentences = list(x["textString"])
    encoder = model["encoder"]

    embeddings = encoder.encode(sentences, batch_size=this.batchSize, device=device)
    embeddings = list(embeddings)
    x["embedding"] = embeddings

    return {"out": x}
