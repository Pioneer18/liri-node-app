//require the .env and .congfig()
require("dotenv").congfig();
//require all the other installed packages
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");