require("dotenv").config();

// Add the code required to import the "keys.js" file and store it in a var
var keys = require('./keys.js');

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

// Access the keys information
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);

// Store process.argv in variables to make things easier
var argTwo = process.argv[2];
var argThree = process.argv[3];




// Tweet list function
// node liri.js mytweets
var mytweets = function(tweetList) {

    var params = {brandonaone: 'nodejs'};
    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
//        console.log(tweets);
	
            for ( var i = 0; i < tweets.length; i++) {
// Tweet date and time
                console.log("This tweet was created on: " + tweets[i].created_at);
// Tweet content
		console.log("The juicy stuff: " + tweets[i].text);

		console.log("-------------------------------------------");
		if ( i === 10) {
		    break;
		}
            }; // end of for loop 
        } // end of twitter info
    }); // end of url
};





// Spotify search function
// node liri.js spotifythissong '<song name here>'
var spotifythissong = function(songName) {

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
  	
// Store the song data in a variable named "songData"
        var songData = data.tracks.items;

// Loop through the songs
        for ( var i = 0; i < songData.length; i++) { 

// Artist(s)
            console.log("Artist(s): " + songData[i].artists[0].name);	
// Song Name
            console.log("Song Name: " + songData[i].name);	
// Preview link of song from spotify
            console.log("Preview Link: " + songData[i].preview_url);	
// The album the song is from
            console.log("Album: " +  songData[i].album.name);

	    console.log("-------------------------------------------");
        }; // end of for loop
    }); // end of search query
}; //end of spotifythissong() funtion





// OMDB search function
// node liri.js omdbsearch '<move name here>'
var omdbsearch = function(movieTitle) {

// Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
    console.log(queryUrl);

// Then create a request to the queryUrl
    request(queryUrl, function(error, response, body) {
// If the request is successful
        if (!error && response.statusCode === 200) {

// Store the name of the movie for reuse
	    var movieName = JSON.parse(body).Title;

// Title of the movie.
	    console.log("Movie: " + movieName)
// Year the movie came out.
	    console.log("Release Date: " + JSON.parse(body).Released)
// IMDB Rating of the movie.
            console.log("IMDB Rating: " + JSON.parse(body).Rated);
// Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatos Rating: " + JSON.parse(body).imdbRating);
// Country where the movie was produced.
            console.log("Country of Origin: " + JSON.parse(body).Country);
// Language of the movie.
            console.log("Language: " + JSON.parse(body).Language);
// Plot of the movie.
            console.log("Plot: " + JSON.parse(body).Plot);
// Actors in the movie.
            console.log("Actors: " + JSON.parse(body).Actors);
	    
	    console.log("--------------------------------------------");

	 //   console.log(JSON.parse(body));
        }
    });
}; // end of omdb search function




var dowhatitsays = function() {
// Read from the "random.txt" file.
// The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {

// If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }

// We will then print the contents of data
// console.log(data);

// Then split it by commas (to make it more readable)
      var dataArr = data.split(",");

// We will then re-display the content as an array for later use.
//      console.log(dataArr);
      spotifythissong(dataArr[1]); 
    });
};




// Run functions based on user input
if (argTwo === "spotifythissong" && typeof argThree === 'string') {
    spotifythissong(argThree);
} 

else if (argTwo === "mytweets") {
    mytweets();
}

else if (argTwo === "omdbsearch" && typeof argThree === 'string') {
    omdbsearch(argThree);
}

else if (argTwo === "spotifythissong") { 

// If no song provided, default to "The Sign" by Ace of Base
    spotify.search({ type: 'track', query: "The Sign"}, function(err, data) {
       if (err) {
           return console.log('Error occurred: ' + err);
       };
  
// Store the data path into a variable
       var songData = data.tracks.items;

// Loop through the songs
       for ( var i = 0; i < songData.length; i++) { 

// Artist(s)i
           if (songData[i].artists[0].name === "Ace of Base") {
               console.log("Artist(s): " + songData[i].artists[0].name);	
// Song Name
               console.log("Song Name: " + songData[i].name);	
// Preview link of song from spotify
               console.log("Preview Link: " + songData[i].preview_url);	
// The album the song is from
               console.log("Album: " +  songData[i].album.name);
               console.log("--------------------------------------------");
           }; // end of default song data for spotify
        } // end of default loop for spotify
    }); // end of default url for spotify
} // end of default bahavoir for spotify

else if (argTwo === "omdbsearch") {
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + 'Mr. Nobody' + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
    console.log(queryUrl);

// Then create a request to the queryUrl
    request(queryUrl, function(error, response, body) {
// If the request is successful
        if (!error && response.statusCode === 200) {

// Store the name of the movie for reuse
	    var movieName = JSON.parse(body).Title;

// Title of the movie.
	    console.log("Movie: " + movieName)
// Year the movie came out.
	    console.log("Release Date: " + JSON.parse(body).Released)
// IMDB Rating of the movie.
            console.log("IMDB Rating: " + JSON.parse(body).Rated);
// Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatos Rating: " + JSON.parse(body).imdbRating);
// Country where the movie was produced.
            console.log("Country of Origin: " + JSON.parse(body).Country);
// Language of the movie.
            console.log("Language: " + JSON.parse(body).Language);
// Plot of the movie.
            console.log("Plot: " + JSON.parse(body).Plot);
// Actors in the movie.
            console.log("Actors: " + JSON.parse(body).Actors);
	    
	    console.log("--------------------------------------------");

	 //   console.log(JSON.parse(body));
        }
    });
} else if (argTwo === "dowhatitsays") {
     dowhatitsays();

} else {
    console.log('Please input one of the following parameters:');
    console.log('To view tweets: "mytweets"'); 
    console.log('To search for song info through spotify: "spotifythissong"'); 
    console.log('To search for movie info through OMDB: "omdbsearch"');
    console.log('To do what the text file says: "dowhatitsays"');
};


