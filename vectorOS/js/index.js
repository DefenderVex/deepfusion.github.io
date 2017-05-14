// Focus
$('.console-input').focus();

// Force Lowercase Input
$('.console-input').keyup(function() {
	//this.value = this.value.toLowerCase();
});

// Force Cursor to End
$('.console-input').keydown(function() {
	this.value = this.value;
});

$('.console-input').click(function() {
	this.value = this.value;
});

// Output to Console
function output(print, pre, noAppend) {
	var cmd = $('.console-input').val();
	if(cmd==""){cmd="<span style='opacity:0;'>...</span>";}
	if (noAppend != true) { $("#outputs").append("<span class='output-cmd-pre'>USER //</span><span class='output-cmd'>" + cmd + "</span>"); }

	$.each(print, function(index, value) {
		cmd = "";
		cmd += "";
		if (value == "") {
			value = "&nbsp;";
			cmd = "&nbsp;";
		}
		if (pre == true) {
			$("#outputs").append("<span class='output-text-pre'>" + cmd + "</span><span class='output-text' style='line-height: 5px; white-space: pre;'><pre>" + value + "</pre></span>");
		} else {
			$("#outputs").append("<span class='output-text-pre'>" + cmd + "</span><span class='output-text'>" + value + "</span>");
		}
	});

	$('.console-input').val("");
	//$('.console-input').focus();
	$("html, body").animate({ scrollTop: $(document).height()}, 0);
}

// Break Value
var newLine = "<br/> &nbsp;";

// User Commands
var cmds = {
	"clear": function() {
		$("#outputs").html("");
		output(["Vector OS 2.0 (TERMINAL MODE)", "Created by Clay Lockwood", "", "A low bandwidth or unstable connection environment was detected and Terminal Mode has been automatically enabled,",
				"This action was taken to decrease data traffic usage to maintain a smooth and stable connection to the remote server.", "", " Type 'commands' to begin", ""], false, true);
	},
	
	"list": function() {
		var print = [
			"File Directory",
			"*********************************************",
			"|-----------|-----------|-------------------|",
			"| File Name | File Type | File Size (Bytes) |",
			"|-----------|-----------|-------------------|",
			"| profile   | Document  | 721 Bytes         |",
			"| relations | Document  | 903 Bytes         |",
			"|-----------|-----------|-------------------|",
			"&nbsp;"
		];
		
		$("#outputs").html("");
		output(print, true, true);
	},
	
	"commands": function() {
		var print = [
			"Commands",
			"*******************************************************",
			"list  :: <prints all files and programs to the screen>",
			"clear :: <clears all printed information on the screen>",
			"&nbsp;"
		];
		
		$("#outputs").html("");
		output(print, true, true);
	},
	
	"profile": function() {
		$("#outputs").html("");
		$.get("http://defendervex.github.io/vectorOS/profile.txt", function(data) {
			output(data.split("\n"), true, true);
		});
	},
	
	"relations": function() {		
		$("#outputs").html("");
		$.get("http://defendervex.github.io/vectorOS/relations.txt", function(data) {
			output(data.split("\n"), true, true);
		});
	},
};

// Boot Output
output(["Vector OS 2.0 (TERMINAL MODE)", "Created by Clay Lockwood", "", "A low bandwidth or unstable connection environment was detected and Terminal Mode has been automatically enabled,",
		"This action was taken to decrease data traffic usage to maintain a smooth and stable connection to the remote server.", "", " Type 'commands' to begin", ""], false, true);

// Get User Command
$('.console-input').on('keypress', function(event) {
	if (event.which === 13) {
		var str = $(this).val();
		
		var data = str.split(' '); data.shift(); data = data.join(' ');
		var cmd = str.split(' ')[0];
		
		if (str.length < 1 || str.charAt(0) == " ") {
			
		} else if (typeof cmds[cmd] == 'function') {
			if(cmds[cmd].length > 0) {
			cmds[cmd](data);
		} else {
			cmds[cmd]();
		}
		
		} else {
			output(["Error: Command or file not found!"]);
		}
		
		$(this).val("");
	}
});

// Particles BG
particlesJS('particles-js', {
	'particles': {
	'number': {
	'value': 100
	},
	'color': {
	'value': '#fca533'
	},
	'shape': {
	'type': 'triangle',
	'polygon': {
	'nb_sides': 5
	}
	},
	'opacity': {
	'value': 0.06,
	'random': false
	},
	'size': {
	'value': 11,
	'random': true
	},
	'line_linked': {
	'enable': true,
	'distance': 150,
	'color': '#fca533',
	'opacity': 0.4,
	'width': 1
	},
	'move': {
	'enable': true,
	'speed': 2,
	'direction': 'none',
	'random': false,
	'straight': false,
	'out_mode': 'out',
	'bounce': false
	}
	},
	'interactivity': {
	'detect_on': 'canvas',
	'events': {
	'onhover': {
	'enable': false
	},
	'onclick': {
	'enable': true,
	'mode': 'push'
	},
	'resize': true
	},
	'modes': {
	'push': {
	'particles_nb': 4
	}
	}
	},
	'retina_detect': true
},
function() {
});