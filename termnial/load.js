//var open = new Audio("https://dl.dropboxusercontent.com/u/55126910/fallout/sounds/ui_hacking_passgood.wav");
//open.volume = .5;
//open.play();

var loop = new Audio("fan_loop.wav"); 
loop.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);
loop.volume = .1;
loop.play();