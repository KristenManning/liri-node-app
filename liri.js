// Custom JS files 
var k = require("./keys.js");

// For reading random.txt
var fs = require("fs");

// APIs:
var Twitter = require('twitter');
var spotify = require('spotify');

// -----------------------------------------------------------------

var tKeys = k.twitterKeys

var client = new Twitter(k.twitterKeys)

// -----------------------------------------------------------------

// Functions for each of the 3 actions: 

var tweet = function(action_info){
	client.get('search/tweets', {from: '12345678kristen'}, function(error, tweets, response) {
   		var statuses = tweets.statuses
   		for (s in statuses){
   			console.log(statuses[s].created_at)
   			console.log(statuses[s].text)
   			console.log("")
   		}
	});
};

var song = function(action_info){
 
// spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
    // }
 
    // Do something with 'data' 
// });
	console.log(action_info)
};

var movie = function(action_info){
	console.log(action_info)
};

// --------------------------------------------------------------------

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