// Custom JS files 
var k = require("./keys.js");

// For reading random.txt
var fs = require("fs");

// APIs:
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

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

var song = function(action_info, secondary_info){
 
	spotify.search({ type: 'track', query: (action_info + " " + secondary_info) }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    var track_info = data.tracks.items[0];
	 	console.log("ARTIST: " + track_info.artists[0].name)
	 	console.log("TRACK NAME: " + track_info.name)
	 	console.log("LINK TO PREVIEW: " + track_info.preview_url)
	 	console.log("ALBUM NAME: " + track_info.album.name)
	});
};

var movie = function(action_info){
	request('http://www.omdbapi.com/?t='+action_info+'&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var movie_info = JSON.parse(body)
  			console.log(movie_info)
    		console.log("Title: " + movie_info.Title)
    		console.log("Released: " + movie_info.Released) 
    		console.log("IMDB Rating: " + movie_info.imdbRating) 
    		console.log("Country (of Production): " + movie_info.Country) 
    		console.log("Language: " + movie_info.Language) 
    		console.log("Plot: " + movie_info.Plot) 
    		console.log("Actors: " + movie_info.Actors) 
			console.log("Rotten Tomatoes Rating: " + movie_info.tomatoRating) 
			console.log("Rotten Tomatoes URL: " + movie_info.tomatoURL) 

  		}
})
};

// --------------------------------------------------------------------

var takeAction = function(action_type,action_info, secondary_info){

	switch(action_type) {

		    case "my-tweets":
		        return tweet(action_info);

		    case "spotify-this-song":
		    	if (action_info){
					return song(action_info, secondary_info);
				}
		    	return song("The Sign", "Ace Of Base");

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

takeAction(process.argv[2],process.argv[3], process.argv[4])