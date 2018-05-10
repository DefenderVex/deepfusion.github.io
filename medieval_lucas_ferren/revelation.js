var decrypted = document.getElementById("decoded");
var encrypted = document.getElementById("encoded");

function startdecrypt() {
    // Original text, split into an array and reversed (for faster pop())
    var originalText = decrypted.textContent.split('').reverse();
    var decryptedText = "";
    var i = 0;

    decrypted.textContent = "";

    var shuffleInterval = setInterval(function(){

      // Generate random strings. You can modify the generator function range
      // (Math.random()*(to-from+1)+from);
      var shuffledText = '';
      var j = originalText.length;
      //while(j--) shuffledText += String.fromCharCode((Math.floor(Math.random() * (90 - 65) ) + 65));
      // You can also use this generator to use only the remaining letters
      while(j--) shuffledText += originalText[j | 0];

      // On every 10 cycles, remove a character from the original text to the decoded text
      if(i++ & j !== 0) decryptedText += originalText.pop();

      // Display
      decrypted.textContent = decryptedText;
      encrypted.textContent = shuffledText;

      // Stop when done
      if(!shuffledText.length) clearInterval(shuffleInterval);

	},20);
}

if (window.addEventListener) {
    window.addEventListener('load', startdecrypt, false); //W3C
} else {
    window.attachEvent('onload', startdecrypt); //IE
}
