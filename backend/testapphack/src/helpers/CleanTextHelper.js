function cleanTextToJson(input) {
  const preResults = input.replace(/\n/gi,'').split('---').slice(1);

  const results = preResults.map((text) => {
    // Regular expression to match the Title and Description
    const regex = /\*\*Title\*\*:\s*(.*?)\s*\*\*Description\*\*:\s*(.*)/s;
    const match = text.match(regex);

    // If the regex matches, extract the title and description
    if(match) {
      const title = match[1].trim();
      const description = match[2].trim();

      return {
        title,
        description
      };
    }

    // If no match is found, try another regex
    const regexAlt = /\*\*Title:\*\*\s*(.*?)\s*\*\*Description:\*\*\s*(.*)/s;
    const matchAlt = text.match(regexAlt);

    if(matchAlt) {
      const title = matchAlt[1].trim();
      const description = matchAlt[2].trim();

      return {
        title,
        description
      };
    }
    

    return null
  }).filter(output => output != null);

  return results;
}
