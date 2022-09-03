////////////////////////////////////////////////////////

function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/* Loop through a collection of all HTML elements: */
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
	  elmnt = z[i];
	  /*search for elements with a certain atrribute:*/
	  file = elmnt.getAttribute("include-html");
	  if (file) {
		 /* Make an HTTP request using the attribute value as the file name: */
		 xhttp = new XMLHttpRequest();
		 xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
			  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
			  if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
			  /* Remove the attribute, and call this function once more: */
			  elmnt.removeAttribute("include-html");
			  includeHTML();
			}
		 }
		 xhttp.open("GET", file, true);
		 xhttp.send();
		 /* Exit the function: */
		 return;
	  }
	}
 }

includeHTML();

////////////////////////////////////////////////////////

var sound_page = new Audio("sounds/window_open.wav");
var sound_click = new Audio("sounds/button_click.wav");

var polaroidsIndex = 1;
showPolaroids(polaroidsIndex);

// Next/previous controls
function plusPolaroids(n) {
  showPolaroids(polaroidsIndex += n);
}

// Thumbnail image controls
function currentPolaroid(n) {
  showPolaroids(polaroidsIndex = n);

	sound_click.play();
	sound_page.play();
}

function showPolaroids(n) {
  var i;
  var Polaroids = document.getElementsByClassName("polaroids");
  var dots = document.getElementsByClassName("dot");
  if (n > Polaroids.length) {polaroidsIndex = 1}
  if (n < 1) {polaroidsIndex = Polaroids.length}
  for (i = 0; i < Polaroids.length; i++) {
		Polaroids[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
  }
  Polaroids[polaroidsIndex-1].style.display = "flex";
  dots[polaroidsIndex-1].className += " active";
}

////////////////////////////////////////////////////////

var baseSize = {
	w: 2560 * 0.9,
	h: 1440 * 0.9
}

function updateScale() {
var ww = $(window).width();
var wh = $(window).height();
var newScale = 1;

// compare ratios
if (ww / wh < baseSize.w / baseSize.h) { // tall ratio
	 newScale = ww / baseSize.w;
} else { // wide ratio
	 newScale = wh / baseSize.h;
}

  return "scale(" + newScale + "," +  newScale + ")"
}

!(function ($doc, $win) {
  var screenWidth = $(window).width() / 2,
	  screenHeight = $(window).height() / 2,
	  $elems = $doc.getElementsByClassName("container"),
	  validPropertyPrefix = '',
	  otherProperty = 'perspective(1000px) ' + updateScale(),
	  elemStyle = $elems[0].style;

  if(typeof elemStyle.webkitTransform == 'string') {
	  validPropertyPrefix = 'webkitTransform';
  } else if (typeof elemStyle.MozTransform == 'string') {
	  validPropertyPrefix = 'MozTransform';
  }

  $doc.addEventListener('mousemove', function (e) {
	  var centroX = e.clientX - screenWidth,
		  centroY = screenHeight - (e.clientY + 13),
		  degX = centroX * 0.04 / 8,
		  degY = 0, //centroY * 0.04 / 8,
		  $elem

	  for (var i = 0; i < $elems.length; i++) {
			  $elem = $elems[i];
		  $elem.style[validPropertyPrefix] = otherProperty + 'rotateY('+ degX +'deg)  rotateX('+ degY +'deg)';
	  };
  });
})(document, window);

////////////////////////////////////////////////////////

var sound_page = new Audio("sounds/window_open.wav");
var sound_hover = new Audio("sounds/button_hover.wav");
var sound_click = new Audio("sounds/button_click.wav");

var sound_bg = new Audio("sounds/playlist/4.mp3");
var bg_loop = new Audio("sounds/playlist/4_loop.mp3");

var volume_max = 0.5;

var journal = document.getElementById("journal");
var relations = document.getElementById("relations");
var content = document.getElementById("content");
var popups = document.getElementById("popups");

var active = "";

var count = 0;

function vargr() {
		return

		count++;

		if (count == 5) {
			content.style.display = "none";
			sound_bg.pause();

			var vargr = document.getElementById("vargr");
			vargr.style.display = "block";
		}
}

$(document).ready(function() {
	var splash = document.getElementById("splash");
	splash.style.display = "block";

  $("a").on("mouseover", function(event) {
	 sound_hover.play();
  });

  $("span").on("mouseover", function(event) {
		var classList = event.target.classList
		if (classList.contains("icon_inactive") || classList.contains("active")) {
			return
		}

	 sound_hover.play();
  });
})

var looping = false;

sound_bg.addEventListener("ended", function() {
	bg_loop.volume = volume_max;
	bg_loop.play();
}, false);

bg_loop.addEventListener("ended", function() {
	looping = true;
 this.currentTime = 0;
 this.play();
}, false);

var curTrack = 4;

function FlipTrack(track) {
	if (curTrack == track) {
		return
	}

	if (looping) {
		var cur1 = bg_loop.currentTime

		bg_loop.pause();

		bg_loop.src = "sounds/playlist/" + track + "_loop.mp3"
		bg_loop.load();
		bg_loop.currentTime = cur1
		bg_loop.play();
	} else {
		var cur2 = sound_bg.currentTime

		sound_bg.pause();

		sound_bg.src = "sounds/playlist/" + track + ".mp3"
		bg_loop.src = "sounds/playlist/" + track + "_loop.mp3"
		sound_bg.load();
		bg_loop.load();
		sound_bg.currentTime = cur2
		sound_bg.play();
	}

	curTrack = track;
}

function CloseSplash() {
	var splash = document.getElementById("splash");

	splash.style.display = "none";
	content.style.display = "block";

	sound_bg.volume = volume_max;
	sound_bg.play();
}

function ClosePopups() {
	var pop = document.getElementById(active);

	relations.style.display = "block";
	popups.style.display = "none";
	pop.style.display = "none";

	FlipTrack(4)

	sound_click.play();
	sound_page.play();
}

function ShowPopup(popup, dead) {
	var pop = document.getElementById(popup);

	relations.style.display = "none";
	popups.style.display = "block";
	pop.style.display = "block";

	active = popup;

	if (dead) {
		FlipTrack(2)
	} else {
		FlipTrack(4)
	}

	sound_click.play();
	sound_page.play();
}

function ShowRelations() {
	relations.style.display = "block";
	content.style.display = "none";
	journal.style.display = "none";

	FlipTrack(4)

	sound_click.play();
	sound_page.play();
}

function ShowContent() {
	relations.style.display = "none";
	content.style.display = "block";
	journal.style.display = "none";

	FlipTrack(4)

	sound_click.play();
	sound_page.play();
}

function ShowJournal() {
	relations.style.display = "none";
	content.style.display = "none";
	journal.style.display = "block";

	FlipTrack(3)

	sound_click.play();
	sound_page.play();
}

/////////////////////////////////////////////