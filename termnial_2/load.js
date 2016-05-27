var loop = new Audio("http://defendervex.github.io/termnial/fan_loop.wav"); 
loop.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);
loop.volume = .1;
loop.play();