var request = require("request"),
  cheerio = require("cheerio"), 
  fs = require("fs"),
  stream = fs.createWriteStream("customized.xml"),
  url = "http://www.krgv.com?debug_verbose=XML",
  affiliateName = url.substring(url.indexOf('.')+1, url.lastIndexOf('.'));
  
request(url, function (error, response, body) {
  if (!error) {

    var $ = cheerio.load(body, { xmlMode: true }),
      stylesheets = $('customized');

	stream.write(stylesheets + "");

  } else {

    console.log("We’ve encountered an error: " + error);
  
  }

});