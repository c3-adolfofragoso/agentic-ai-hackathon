function runFunctions (spec) {
  const textJsonInput = Alvin.featureExtractor(spec);
  const similarityInput = CleanTextHelper.cleanTextToJson(textJsonInput);
  const projectId = Alvin.similarityScoreCalculator(similarityInput);
  return projectId;
}
