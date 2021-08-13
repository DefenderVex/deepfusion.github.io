var loop = new Audio("sound/fan_loop.wav");

loop.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);

loop.play();

loop.volume = .03;
