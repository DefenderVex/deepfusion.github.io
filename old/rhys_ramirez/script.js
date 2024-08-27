////////////////////////////////////////////////////////

$("#polaroidSection").load("polaroids.html");
$("#cardsSection").load("cards.html");

////////////////////////////////////////////////////////

var sound_page = new Audio("sounds/window_open.wav");
var sound_click = new Audio("sounds/button_click.wav");

var polaroidsIndex = 1;
window.addEventListener("load", function () {
	showPolaroids(polaroidsIndex);
});

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
	w: 1920 * 0.9,
	h: 1080 * 0.9
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

var sound_bg = new Audio("sounds/bg.mp3");
var bg_loop = new Audio("sounds/bg_loop.mp3");

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

	sound_click.play();
	sound_page.play();
}

function ShowPopup(popup, dead) {
	var pop = document.getElementById(popup);

	relations.style.display = "none";
	popups.style.display = "block";
	pop.style.display = "block";

	active = popup;

	sound_click.play();
	sound_page.play();
}

function ShowRelations() {
	relations.style.display = "block";
	content.style.display = "none";
	journal.style.display = "none";

	sound_click.play();
	sound_page.play();
}

function ShowContent() {
	relations.style.display = "none";
	content.style.display = "block";
	journal.style.display = "none";

	sound_click.play();
	sound_page.play();
}

function ShowJournal() {
	relations.style.display = "none";
	content.style.display = "none";
	journal.style.display = "block";

	sound_click.play();
	sound_page.play();
}

var muted = false;

function ToggleVolume() {
	var toggle = document.getElementById("volume");

	if (sound_bg.volume > 0) {
		sound_bg.volume = 0;
		bg_loop.volume = 0;
		volume_max = 0;
		toggle.style.backgroundImage = "url('images/icons/muted.svg')";
	} else {
		volume_max = 0.5;
		sound_bg.volume = volume_max;
		bg_loop.volume = volume_max;
		toggle.style.backgroundImage = "url('images/icons/sound.svg')";
	}

	sound_click.play();
}

/////////////////////////////////////////////