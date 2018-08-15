//require the .env and .congfig()
require("dotenv").config();
//require all the other installed packages
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");
var keys = require("./keys.js");
//lets add some text color to the command line in terminal
var chalk = require("chalk");
//this little binding is reccommended by chalk on npm, but does not look neccessary. just some shorthand
var log = console.log;

//initialize the spotify api with the keys so we call it later| if twitter was used do it here too
//create a new Spotify object with the keys stored in keys.js
var spotify = new Spotify(keys.spotify);

//grab the arguments from the command line
var arg1 = process.argv[2];//this will be the liri command
var arg2 = process.argv[3];//this will be the value passed to the function called by the liri command

//=======================================================================================================
//Liri's functions to respond to user input 

//make the function to `run` the liri bot, and the function to determine what functions to call based on the inputed commands
var run = function(arg1,arg2){
    //pass user's inputed commands to the pick function which will `pick` what functions to run based on the commands
    pick(arg1,arg2);
}

var pick = function(caseData, functionData){
    //pass the args to the switch case
    switch(caseData){
        //call the spotify api with a song
        case "spotify-this-song":
            mySpotify(functionData);
            break;
        //call the omdb movie api
        case "movie-this":
            myMovie();
        //call the fs module functionality to read/write from files
        case "do-what-it-says":
            fsThis();
            break;
        default:
            //little bit of error management - if command entered wrong
            console.log("larry does not understand that command");
    }

}
run(arg1,arg2);

//=======================================================================
//make the functions that call the spotify api, omdb api, and call the fs module



//node-spotify-api function
var mySpotify = function(songName){
    //if user did not enter a song name default to "The Sign"
    if(songName === undefined){
        songName = "The Sign";
    }
    //use the spotify object created on line 14 to call the node-spotify-api
    //npm lists search: function({type: `track1, query: 'your search'}) as the easiest way to make a call
    spotify.search({
        type: "track", 
        query: songName,//grabed from the users inputed argument after the liri command
        limit: 1 //only grab one song please
    }, function(err,data) {
        //check for errors
        if(err){
            return console.log('error occurred: ' + err);
        }
        //now drill into the data, which is the response from the api
        var songs = data.tracks.items; //we will be drilling into songs now
        //songs is an array of objects we will get data from 
        for(var i = 0; i < songs.length; i++){
            console.log(i);
            //grab the artists name 
            log(chalk.blue("artist(s): ") + chalk.red(songs[i].artists.name));
            //grab the song name
            log(chalk.green("song name: ") + chalk.red(songs[i].name));
            //grab the preview link
            log(chalk.yellow("preview of song: ") + chalk.grey(songs[i].preview_url));

        }

    });
}
