var k = require("./keys.js");
var fs = require("fs");

var tKeys = k.twitterKeys

var tweet = function(action_info){
	console.log("tweets")
};

var song = function(action_info){
	console.log(action_info)
};

var movie = function(action_info){
	console.log(action_info)
};

var takeAction = function(action_type,action_info){

	switch(action_type) {

		    case "my-tweets":
		        return tweet(action_info);

		    case "spotify-this-song":
		    	if (action_info){
					return song(action_info);
				}
		    	return song("The Sign");

		    case "movie-this":
		    	if (action_info){
					return movie(action_info);
				}
		    	return movie("Mr.Nobody");

		    case "do-what-it-says":
		    	fs.readFile("random.txt", "utf8", function(error, data){
					var liriArr = data.split(","); 
					return takeAction(liriArr[0],liriArr[1])
				});
	}
};

takeAction(process.argv[2],process.argv[3])