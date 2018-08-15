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

//===========================================================================================================
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
            myMovie(functionData);
            break;
        //call the fs module functionality to read/write from files
        case "do-what-it-says":
            fsThis();
            break;
        default:
            //little bit of error management - if command entered wrong
            console.log("larry does not understand that command");
    }

}


//===========================================================================================================
//make the functions that call the spotify api, omdb api, and call the fs module


//to get the artist name out of Artists, we can use a clever js method called .map(function_name) that will loop each
//item in an array, which is what songs[i].artists is, and then call a function on each index in the looped array
var getArtistName = function(bananas){//you can put anything in here
    return bananas.name; //then attach the name of the prop u wanna get out of the Artists array
}

//===========================================================================================================
//node-spotify-api function
var mySpotify = function(songName){
    //if user did not enter a song name default to "The Sign"
    if(songName === undefined){
        songName = "505"; //one of my favs, also "The Sign" pulls "The Light" - by MihTy,Jeremih,Ty Dolla $ign
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
            //grab the artists name 
            log(chalk.blue("artist(s): ") + chalk.red(songs[i].artists.map(getArtistName)));
            //grab the song name
            log(chalk.green("song name: ") + chalk.red(songs[i].name));
            //grab the preview link
            log(chalk.yellow("preview of song: ") + chalk.grey(songs[i].preview_url));
        }
    });    
}

//===========================================================================================================
//call the omdb api with the agr2 the user gave to LIRI
var myMovie = function(functionData){
    if(functionData === undefined){
        request("http://www.omdbapi.com/?t=mr+nobody&apikey=trilogy", function(error,response,body){
            //if there is no error and the http status code is 200; which is ok
            if(!error && response.statusCode === 200){
                //now make a JSON.parse onto the body so we can read it, then space it out with the 4, null on the reviver?
                console.log(JSON.parse(body),null, 4);
            }
        });
    }else{
    //setup the query url with the passed in movie name and api key = trilogy
    var queryURL = "http://www.omdbapi.com/?t=" + functionData + "&apikey=trilogy";

    //now make the HTTP REQUEST  with the queryURL
    request(queryURL, function(error, response, body){
        //if user did pass in a movie name then call the api with that
        //also build out a nice terminal log since we care about these results bit more
        if(!error && response.statusCode === 200){
            //nicely parse it all out
            log(chalk.redBright("Movie: ") + JSON.parse(body).Title);
            log(chalk.green("Release Year: ") + JSON.parse(body).year);
            log(chalk.yellow("IMDB Ratings: ") + JSON.parse(body).imdbRating);
            log(chalk.red("Rotten Tomatoes: ") + JSON.parse(body).Ratings[1].Value);
            log(chalk.blue("Country of production: ") + JSON.parse(body).Country);
            log(chalk.magenta("Language: ") + JSON.parse(body).Language);
            log(chalk.red("Plot: ") + JSON.parse(body).Plot);
            log(chalk.green("Actors: ") + JSON.parse(body).Actors);
        }
    });
    }
}

//===========================================================================================================
//fs to read and write to files
var fsThis = function(){
    //use the readFile method, with utf8 encoding on the random.txt file to `read` its content
    fs.readFile("random.txt", "utf8", function(err,data){
        if(err){
            return console.log(err);
        }
        //now use split to break the data at the comma, making the two liri commands
        var temp = data.split(",");//the split and array build
        var command1 = temp[0];
        var command2 = temp[1];
        //let the user know LIRI successfully got the commands
        log(chalk.green("your command is: ") + chalk.red(command1) + " " + chalk.blue(command2));
        //call pick

        pick(command1,command2);
    });
}

run(arg1,arg2);