var sound_click = new Audio("sounds/ui_terminal_charscroll_lp.wav");
var sound_startup = new Audio("sounds/ui_terminal_holotape_programload_02.wav");

var tripped = false;

function processWords(words) {
	let currentTag = '';
	let currentWord = '';
	let combinedWords = [];
 
	words.forEach((word) => {
	  if (word.startsWith('<') && !word.startsWith('</')) {
		 // Start of a tag, store the tag
		 currentTag = word;
	  } else if (word.startsWith('</')) {
		 // End of a tag
		 if (currentWord) {
			combinedWords.push(`${currentTag}${currentWord}</${currentTag.slice(1)}`);
			currentWord = '';
		 }
		 combinedWords.push(word);
		 currentTag = '';
	  } else if (word.trim() === '') {
		 // Space or empty string
		 if (currentWord) {
			combinedWords.push(`${currentTag}${currentWord}</${currentTag.slice(1)}`);
			currentWord = '';
		 }
		 combinedWords.push(word);
	  } else {
		 // Normal word or inside tag
		 if (currentTag) {
			if (currentWord) {
			  combinedWords.push(`${currentTag}${currentWord}</${currentTag.slice(1)}`);
			}
			currentWord = word;
		 } else {
			combinedWords.push(word);
		 }
	  }
	});
 
	// Handle any remaining words and tags
	if (currentWord) {
	  combinedWords.push(`${currentTag}${currentWord}</${currentTag.slice(1)}`);
	}
 
	return combinedWords;
 }
 
 // Example usage:
 const rawWords = ['<p>', 'Hello', ' ', 'world', '</p>'];
 const processedWords = processWords(rawWords);
 console.log(processedWords);
 

const paragraphs = document.querySelectorAll('p');

function addTypingEffect() {
	var max = 0;

	paragraphs.forEach(paragraph => {
		const words = paragraph.innerHTML.split(/(<\/?\w+[^>]*>|\s+)/).filter(Boolean);
		paragraph.textContent = '';

		paragraph.style.display = '';

		const combinedWords = processWords(words);

		if (combinedWords.length > max) {
			max = combinedWords.length
		}

		let index = 0;

		const typingInterval = setInterval(() => {
			paragraph.innerHTML += combinedWords[index];
			index++;

			if (index === combinedWords.length) {
				clearInterval(typingInterval);
			}
		}, 20);
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