// Focus
$('.console-input').focus();
var version = "2.0.1";

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
		output(["Vector OS " + version + " (TERMINAL MODE)", "Created by Clay Lockwood", "", "A low bandwidth or unstable connection environment was detected and Terminal Mode has been automatically enabled,",
				"This action was taken to decrease data traffic usage to maintain a smooth and stable connection to the remote server.", "", " Type 'commands' to begin", ""], false, true);
	},
	
	"list": function() {
		var print = [
			"file directory",
			"**********************************************************",
			"|---------------|--------------------|-------------------|",
			"| File Name     | File Type          | File Size (Bytes) |",
			"|---------------|--------------------|-------------------|",
			"| profile.txt   | Text Document      | 721 Bytes         |",
			"| relations.txt | Text Document      | 903 Bytes         |",
			"| aegis.enyt    | Encrypted Document | 000 Bytes         |",
			"|---------------|--------------------|-------------------|",
			"&nbsp;"
		];
		
		//$("#outputs").html("");
		output(print, true);
	},
	
	"commands": function() {
		var print = [
			"commands",
			"************************************************************************",
			"list                 :: [ prints all files and programs to the screen  ]",
			"clear                :: [ clears all printed information on the screen ]",
			"view    (file)       :: [ used to view the content of a specified file ]",
			"decrypt (file) (key) :: [ used to decrypt and view encrypted files     ]",
			"encrypt (file) (key) :: [ encrypts a file with a name and key is given ]",
			"&nbsp;"
		];
		
		//$("#outputs").html("");
		output(print, true);
	},
	
	"view": function(file) {		
		var files = [
			"profile.txt",
			"relations.txt"
		];
		
		if (!file) {
			output(["Error: No text file was specified!"]);
		} else if (!file.endsWith(".txt")) {
			output(["Error: '" + file + "' is not a valid text file!"]);
		} else if ($.inArray(file, files) > -1) {
			$("#outputs").html("");
			$.get("http://defendervex.github.io/vectorOS/" + file, function(data) {
				output(data.split("\n"), true, true);
			});
		} else {
			output(["Error: '" + file + "' does not exist!"]);
		}
	},
	
	"decrypt": function(dat) {	
		dat = dat.split(' ')
	
		var file = dat[0]
		var key = dat[1]
	
		var files = [
			"aegis.enyt"
		];
		
		if (!file) {
			output(["Error: No encrypted file was specified!"]);
		} else if (!key) {
			output(["Error: No valid encrypt key was specified!"]);
		} else if (!file.endsWith(".enyt")) {
			output(["Error: '" + file + "' is not a valid encrypted file!"]);
		} else if ($.inArray(file, files) > -1) {
			$.get("http://defendervex.github.io/vectorOS/" + file, function(data) {
				var RSA = cryptico.generateRSAKey(key, 512);
				var result = cryptico.decrypt(data, RSA).plaintext;
				
				if (data.startsWith("Decrypted File")) {
					$("#outputs").html("");
					output(data.split("\n"), true, true); 
				} else {
					output(["Error: Decryption Failed!"]);
				}
			});
		} else {
			output(["Error: '" + file + "' does not exist!"]);
		}
	},
	
	"encrypt": function(dat) {
		dat = dat.split(' ')
		
		var file = dat[0]
		var key = dat[1]
		
		if (!file) {
			output(["Error: No file was specified!"]);
		} else if (!key) {
			output(["Error: No valid encrypt key was specified!"]);
		} else {
			$.get("http://defendervex.github.io/vectorOS/" + file, function(data) {
				var RSA = cryptico.generateRSAKey(key, 512);
				var publicKey = cryptico.publicKeyString(RSA);
				
				var encrypted = cryptico.encrypt(data, publicKey);
				
				$("#outputs").html("");
					output(["Vector OS " + version + " (TERMINAL MODE)", "Created by Clay Lockwood", "", "A low bandwidth or unstable connection environment was detected and Terminal Mode has been automatically enabled,",
							"This action was taken to decrease data traffic usage to maintain a smooth and stable connection to the remote server.", "", " Type 'commands' to begin", ""], false, true);
				
				console.log("Encryption Key: " + key);
				console.log(encrypted.cipher);
			});
		}
	},
};

// Boot Output
output(["Vector OS " + version + " (TERMINAL MODE)", "Created by Clay Lockwood", "", "A low bandwidth or unstable connection environment was detected and Terminal Mode has been automatically enabled,",
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