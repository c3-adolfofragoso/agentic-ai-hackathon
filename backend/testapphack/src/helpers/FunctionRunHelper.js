function runFunctions (spec) {
  try {
    const textJsonInput = Alvin.featureExtractor(spec);
  }
  catch (error) {
    console.error("Error in featureExtractor:", error);
    return "error";
  }

  try {
    const similarityInput = CleanTextHelper.cleanTextToJson(textJsonInput);
  }
  catch (error) {
    console.error("Error in cleanTextToJson:", error);
    return "error";
  }

  try {
    Alvin.similarityScoreCalculator(similarityInput);
  }
  catch (error) {
    console.error("Error in similarityScoreCalculator:", error);
    return "error";
  }

  return "success";
}
