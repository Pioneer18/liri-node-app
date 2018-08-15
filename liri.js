//require the .env and .congfig()
require("dotenv").congfig();
//require all the other installed packages
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");
var keys = require("./keys.js");
//lets add some text color to the command line in terminal
var chalk = require("chalk");

//initialize the spotify api with the keys so we call it later| if twitter was used do it here too
//create a new Spotify object with the keys stored in keys.js
var spotify = new Spotify(keys.spotify);

//grab the arguments from the command line
var arg1 = process.argv[2];//this will be the liri command
var arg2 = process.argv[3];//this will be the value passed to the function called by the liri command

//=======================================================================================================
//make the function to `run` the liri bot, and the function to determine what functions to call based on the inputed commands
var run = function(arg1,arg2){
    
}


