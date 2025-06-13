function cleanTextToJson(input) {
  var preResults = input.replace(/\n/gi,'').split('---').slice(1);

  var results = preResults.map((text) => {
    // Regular expression to match the Title and Description
    var match = false;

    try{
      const regex = /Title:\s*(.*?)\s*Description:\s*(.*)/;;
      match = text.match(regex);
    }catch(err){
      match = false;
    }

    // If the regex matches, extract the title and description
    if(match) {
      const title = match[1].trim();
      const description = match[2].trim();

      return {
        title,
        description
      };
    }

    // // If no match is found, try another regex
    // var matchAlt = false;
    // try {
    //   const regexAlt = /\*\*Title:\*\*\s*(.*?)\s*\*\*Description:\*\*\s*(.*)/s;
    //   matchAlt = text.match(regexAlt);
    // }catch(err){
    //   matchAlt = false;
    // }

    // if(matchAlt) {
    //   const title = matchAlt[1].trim();
    //   const description = matchAlt[2].trim();

    //   return {
    //     title,
    //     description
    //   };
    // }
    

    return null
  }).filter(output => output != null);

  return results;
}
