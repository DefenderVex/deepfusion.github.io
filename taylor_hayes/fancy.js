var sound_click = new Audio("sounds/ui_terminal_charscroll_lp.wav");
var sound_startup = new Audio("sounds/ui_terminal_holotape_programload_02.wav");

var tripped = false;

const paragraphs = document.querySelectorAll('p');

function addTypingEffect() {
	var max = 0;

	paragraphs.forEach(paragraph => {
		const words = paragraph.textContent.split(' ');
		paragraph.textContent = '';

		paragraph.style.display = '';

		if (words.length > max) {
			max = words.length
		}

		let index = 0;

		const typingInterval = setInterval(() => {
			paragraph.textContent += words[index] + ' ';
			index++;

			if (index === words.length) {
				clearInterval(typingInterval);
			}
		}, 100);
	});
}

window.addEventListener('click', function() {
	if (tripped === true) {
		return
	}

	tripped = true;

	sound_startup.play();

	paragraphs.forEach(paragraph => {
	  paragraph.style.display = 'none';
	});

	var bootDiv = document.getElementById('boot');

	if (bootDiv) {
	  bootDiv.remove();
	}
 
	var classNamesToReveal = ['content', 'scroller'];

	var max = 0;
 
	classNamesToReveal.forEach(function(className) {
	  var elements = document.querySelectorAll('.' + className);
	  elements.forEach(function(element) {
		 var children = element.children;
		 for (var i = 0; i < children.length; i++) {
			children[i].style.display = 'none';
			if (i > max) {
				max = i;
			}
		 }
	  });
	});
 
	var mainDiv = document.getElementById('main');
	if (mainDiv) {
	  mainDiv.style.display = '';
	}
 
	var intervalId;
	var currentIndex = 0;
 
	function showNextChild() {
	  var offset = currentIndex;
	  
	  for (var i = 0; i < classNamesToReveal.length; i++) {
		 var className = classNamesToReveal[i];
		 var elements = document.querySelectorAll('.' + className);

		 sound_click.play();

		 if (className === 'scroller') {
			offset = offset - 2;
		 }
 
		 elements.forEach(function(element) {
			var children = element.children;
			if (children.length > 0 && offset < children.length && children[offset]) {
			  children[offset].style.display = '';
			  return;
			}
		 });
	  }
 
	  currentIndex++;

	  if (currentIndex > max) {
		clearInterval(intervalId);
		addTypingEffect();
	  }
	}
 
	intervalId = setInterval(showNextChild, 250);
 });