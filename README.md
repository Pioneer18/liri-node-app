# liri-node-app
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

LIRI takes 4 basic command pairs and logs the response to the Terminal

Command #1: `spotify-this-song` `_name_of_song`, will command LIRI to query the node-spotify-api for the name of the song entered after the command. LIRI will return  the artist(s) of the song, the title, and a link to a preview of the song (if available).

<img src="https://media.giphy.com/media/vwQz6tQnjMwSSOdp7x/giphy.gif" width="600" height="200">


If the user only enters the `spotify-this-song` command and does not specify a song as well, Liri will default grab the Artic Monkey's song, "505".

<img src="https://media.giphy.com/media/1zjOYpTJON5b8sAigd/giphy.gif" width="600" height="200">




command #2:  `movie-this` commands LIRI to return a plot overview as well as details about the actors and production of the requested film. 

<img src="https://media.giphy.com/media/kG8biFz9xx0yluJXOd/giphy.gif" width="600" height="200">

If the user does not specify a movie title after the `movie-this` command, LIRI will default query spotify for the movie "Mr. Nobody"

<img src="https://media.giphy.com/media/4WEKQ60xIdXg4QTBDx/giphy.gif" width="600" height="200">


Command #3: `do-what-it-says` commands LIRI to read a random.txt file that has a LIRI command, spotify-this-song,"I want it that way", saved inside. LIRI will read the file and query the spotify api for the song "I want it that way".

<img src="https://media.giphy.com/media/7SQzMooY3QxDUaIFRq/giphy.gif" width="600" height="200">
