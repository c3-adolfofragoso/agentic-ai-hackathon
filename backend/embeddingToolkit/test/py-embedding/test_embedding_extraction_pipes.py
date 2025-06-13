# Copyright 2009-2024 C3 AI (www.c3.ai). All Rights Reserved.
# Confidential and Proprietary C3 Materials.
# This material, including without limitation any software, is the confidential trade secret and proprietary
# information of C3 and its licensors. Reproduction, use and/or distribution of this material in any form is
# strictly prohibited except as set forth in a written license agreement with C3 and/or its authorized distributors.
# This material may be covered by one or more patents or pending patent applications.

import pandas as pd
import numpy as np


def _generate_sample_data():
    """Helper function to generate sample data for testing
    embedding extraction pipes and pipelines
    """
    texts = [
        "The quick brown fox jumps over the lazy dog.",
        "This is a question?!.",
        "We ensure our practices make use of low-carbon technologies.",
        " • Biodiversity is   an urgent issue that companies need to pay attention to.",
        "Our organization succeeds through: • Diversity and inclusion • Employee engagement",
    ]
    paragraph_ids = [f"par{i}" for i in range(len(texts))]

    sample_data = c3.Data.from_pandas(pd.DataFrame({"subject": paragraph_ids, "textString": texts}))

    return sample_data


def _run_test_with_pipe(embedding_extraction_pipe, sample_data, model_dimension):
    """Helper function to run `Embedding.Extraction.Pipe`s
    given a pre-trained model name
    """

    trained_embedding_extraction_pipe = embedding_extraction_pipe.train().result()
    embeddings = trained_embedding_extraction_pipe.process(
        x=sample_data,
    ).result()
    embeddings_df = embeddings.to_pandas()
    embeddings_df.index.name = None
    pd.testing.assert_index_equal(pd.Index(sample_data["subject"]), embeddings_df.index)

    embedding_array = np.stack(list(embeddings_df["embedding"]))
    num_dim = embedding_array.shape[1]
    assert (
        num_dim == model_dimension
    ), f"Result embedding dimension {num_dim} should be equal to expected model dimension {model_dimension}"
    assert np.sum(embedding_array) != 0, "Result embedding array should not be all zeros!"

    trained_embedding_extraction_pipe.cleanUp()


def test_extract_embedding_sentence_bert():
    """Simple test to ensure Embedding.Extraction.SentenceBertPipe runs
    and returns expected data size and dimension for `all-mpnet-base-v2` pre-trained model.
    """
    embedding_extraction_pipe = c3.Embedding.Extraction.SentenceBertPipe(modelName="all-mpnet-base-v2").withName(
        "GeneralEmbeddingExtraction"
    )
    sample_data = _generate_sample_data()
    _run_test_with_pipe(embedding_extraction_pipe, sample_data, 768)
    _run_test_embedding_extraction_pipeline(embedding_extraction_pipe, sample_data, 768)


def test_extract_embedding_bert():
    """Simple test to ensure Embedding.Extraction.BertPipe run
    and return expected data size and dimension for `bert-base-uncased` pre-trained model.
    """
    embedding_extraction_pipe = c3.Embedding.Extraction.BertPipe(modelName="bert-base-uncased").withName(
        "DomainEmbeddingExtraction"
    )
    sample_data = _generate_sample_data()
    _run_test_with_pipe(embedding_extraction_pipe, sample_data, 768)
    _run_test_embedding_extraction_pipeline(embedding_extraction_pipe, sample_data, 768)


def _create_embedding_extraction_pipeline(embedding_extraction_pipe):
    mla = c3.MlPipeline.Authoring
    x_paragraph = mla.var()

    # extract embeddings and calculate the embedding similarity
    embedding_extraction_pipe_trained = embedding_extraction_pipe.train_var(x_paragraph)
    embeddings = embedding_extraction_pipe_trained.process_var(x_paragraph)

    embedding_pipeline = mla.pipeline(
        x={"paragraph": x_paragraph},
        out={"embedding": embeddings},
        name="embeddingExtractionPipeline",
    )
    return embedding_pipeline


def _run_test_embedding_extraction_pipeline(embedding_extraction_pipe, sample_data, model_dimension):
    """Simple unit test to ensure Embedding.Extraction.Pipe runs as part of a pipeline"""
    embedding_extraction_pipeline = _create_embedding_extraction_pipeline(embedding_extraction_pipe)
    trained_pipeline = embedding_extraction_pipeline.train().result()
    assert trained_pipeline.isTrained(), "Embedding Extraction Pipeline could not be trained"

    embeddings = trained_pipeline.process(x={"paragraph": sample_data}).result()
    embeddings_df = embeddings["embedding"].to_pandas()

    embedding_array = np.stack(list(embeddings_df["embedding"]))
    num_dim = embedding_array.shape[1]
    assert (
        num_dim == model_dimension
    ), f"Result embedding dimension {num_dim} should be equal to expected model dimension {model_dimension}"

    trained_pipeline.cleanUp(cleanUpNested=True)
