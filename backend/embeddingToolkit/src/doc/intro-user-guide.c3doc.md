Topic Type: Manifest
Audience: C3-Internal  
Category: Data Science Tools
Title: C3 AI Embedding Toolkit Overview
Abstract: Embedding Toolkit Overview

# C3 AI Embedding Toolkit
## Overview
Text embeddings are an essential tool in the field of natural language processing (NLP). 
They are numerical representations of text where each word or phrase is represented as a dense vector of real numbers.
The C3 AI Embedding Toolkit provides a centralized solution to the data scientists with end-to-end pipelines for embedding extraction given text data. 


## Algorithms
The Embedding Toolkit provides two ready-to-use embedding extraction pipes in the form of 
{@link MlTemplate.AtomicPipe}s. These pipes allow the users to leverage `SentenceBERT` and `BERT` models from Hugging Face. 


### 1. SentenceBERT Pipe - {@link Embedding.Extraction.SentenceBertPipe}
An {@link MlAtomicPipe} that can extract `SentenceBERT` language model embeddings given a list of text. 
Refer to the pre-trained models here: https://www.sbert.net/docs/pretrained_models.html#sentence-embedding-models/

### 2. BERT Pipe - {@link Embedding.Extraction.BertPipe}
An {@link MlAtomicPipe} that can extract `BERT` language model embeddings given a list of text. 
Any BERT-based model or fine-tuned `BERT` model from Hugging Face can be used with this embedding extraction pipe. 
Refer to the pre-trained models here: https://huggingface.co/models?other=bert


## Getting Started with Embedding Toolkit

To get started with using this toolkit's algorithms, open the Jupyter notebook
`Embedding-Toolkit/Embedding-Toolkit-Tutorial.ipynb`! 
This tutorial will guide you on how to use different pipes in the toolkit to extract embeddings from sample text data.
