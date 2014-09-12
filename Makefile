all: facepunch youtube stock math spotify convert
	
facepunch: 
	mocha -R spec test/facepunch.js
youtube:
	mocha -R spec test/youtube.js
stock:
	mocha -R spec test/stock.js
spotify:
	mocha -R spec test/spotify.js
math:
	mocha -R spec test/math.js
convert:
	mocha -R spec test/convert.js