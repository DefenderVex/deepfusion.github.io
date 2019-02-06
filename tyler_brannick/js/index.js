// Terminal Bio 3.0 By Vex //
var click = new Audio("sound/char_scroll.wav");
var loop = new Audio("sound/fan_loop.wav");

loop.addEventListener('ended', function() {
	this.currentTime = 0;
	this.play();
}, false);

loop.play();

loop.volume = .03;
click.volume = .1;

$.fn.typewriter = function() {
	this.each(function() {
		var delay = 0;
		var $ele = $(this), str = $ele.html(), progress = 0, offset = 0;
		$ele.html('');
		var typewriting = function() {
			if(str.substring(progress, progress + 1) == "<"){
				var wt = new RegExp(/<span class="wait"/);
				var re = new RegExp(/<span class="instant"/);
				var cl = new RegExp(/<span class="clear"/);
				if(str.substring(progress,str.length).match(wt)){
					delay = 1000;
					str.substring(progress,str.length).indexOf('</span>')+7;
				}else if (str.substring(progress,str.length).match(re)) {
					progress += str.substring(progress,str.length).indexOf('</instant>')+10;
				}else if(str.substring(progress,str.length).match(cl)){
					offset = progress;
					str.substring(progress,str.length).indexOf('</span>')+7;
				}else{
					while(str.substring(progress, progress + 1) != ">"){
						progress++;
					}
				}
			}
			$ele.html(str.substring(offset, progress++));
			if (progress >= str.length){
				return;
			}else{
				click.play();
				if(delay > 0){
					setTimeout(typewriting, delay);
					delay = 0;
				}else{
					setTimeout(typewriting, 1);
				}	
			}
		}
		typewriting();
	});
	return this;
};
$('#terminal').typewriter();