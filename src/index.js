var request = require("request"),
  cheerio = require("cheerio"), 
  fs = require("fs"),
  stream = fs.createWriteStream("customized.xml"),
  url = "http://www.google.com/",
  affiliateName = url.substring(url.indexOf('.')+1, url.lastIndexOf('.'));
  
request(url, function (error, response, body) {
  if (!error) {
  	stream.write("<" + affiliateName + ">\n");

    var $ = cheerio.load(body),
      stylesheets = $('link').attr('rel','stylesheet'),
      scripts = $("script").attr('type','text/javascript');
      stream.write("<stylesheets>" + "\n");

	stylesheets.each(function(i, stylesheet) {
		var sheet = $(stylesheet).attr('href');
		console.log("stylesheets: " + sheet + "\n");

		stream.write("<stylesheet><href>" + "\n");
		stream.write(sheet + "\n");
		stream.write("</href></stylesheet>" + "\n");
	})

	stream.write("</stylesheets>" + "\n");
	stream.write("<scripts>" + "\n");

	scripts.each(function(i, script) {
		var script = $(script).attr('src');
		if (script !== undefined) {
			console.log("scripts: " + script + "\n");
			if (script.indexOf('custom') > -1) {
				stream.write("<script><src>");
				stream.write(script);
				stream.write("</src></script>" + "\n");
			}
		}
	})

	stream.write("</scripts>" + "\n");

  } else {

    console.log("We’ve encountered an error: " + error);
  
  }

  stream.write("</" + affiliateName + ">");
});