// RELATION COLORS //
function getColor(number) {
	const isPositive = number > 0;
	const colorScale = isPositive ? positiveColors : negativeColors;
	const absoluteNumber = Math.abs(number);

	if (absoluteNumber >= colorScale.length) {
		return colorScale[colorScale.length - 1];
	}

	const floor = Math.floor(absoluteNumber);
	const decimal = absoluteNumber - floor;

	const color1 = colorScale[floor];
	const color2 = colorScale[floor + 1];

	const r = Math.round((color1.r * (1 - decimal) + color2.r * decimal));
	const g = Math.round((color1.g * (1 - decimal) + color2.g * decimal));
	const b = Math.round((color1.b * (1 - decimal) + color2.b * decimal));

	return `rgb(${r}, ${g}, ${b})`;
}

function applyColors() {
	const positiveDivs = document.querySelectorAll('.relation_color.positive');
	const negativeDivs = document.querySelectorAll('.relation_color.negative');

	positiveDivs.forEach(div => {
		const number = parseFloat(div.textContent);
		const color = getColor(number);

		div.style.backgroundColor = color;
	});

	negativeDivs.forEach(div => {
		const number = parseFloat(div.textContent);
		const color = getColor(0 - number);

		div.style.backgroundColor = color;
	});
}

const positiveColors = {
	0: { r: 149, g: 165, b: 166 },
	1: { r: 118, g: 209, b: 205 },
	2: { r: 26, g: 171, b: 156 },
	3: { r: 52, g: 152, b: 219 },
	4: { r: 155, g: 89, b: 182 },
	5: { r: 111, g: 45, b: 165 }
};

const negativeColors = {
	0: { r: 149, g: 165, b: 166 },
	5: { r: 131, g: 49, b: 49 },
	4: { r: 192, g: 57, b: 43 },
	3: { r: 211, g: 84, b: 0 },
	2: { r: 243, g: 156, b: 18 },
	1: { r: 243, g: 220, b: 15 }
};

applyColors();
// RELATION COLORS //

// SCRAMBLER //
const numRows = 7;
const charsPerRow = 13;

function generateRandomString(length, characters) {
	let result = '';

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}

function fillDivsWithRandomChars() {
const divs = document.querySelectorAll('.scramble');
divs.forEach((div) => {
	const originalText = div.textContent;
	const originalSpaces = originalText.match(/\s/g) || [];
	const originalChars = originalText.replace(/\s/g, '');

	const randomChars = generateRandomString(originalChars.length, '░▒');

	let newText = '';
	let spaceIndex = 0;

	for (let i = 0; i < originalText.length; i++) {
		if (originalText[i] === ' ') {
			newText += ' ';
			spaceIndex++;
		} else {
			newText += randomChars[i - spaceIndex];
		}
	}

	div.textContent = newText;
});
}

function fillDivs() {
const divs = document.querySelectorAll('.row_profile_placeholder');
divs.forEach((div) => {
	div.innerHTML = '';

	for (let i = 0; i < numRows; i++) {
		const row = document.createElement('div');
		row.setAttribute('class', 'placeholder_line');

		if (i === 99) {
			const errorIndex = Math.floor(Math.random() * (charsPerRow - 13));
			row.textContent = generateRandomString(errorIndex, '▒▓') + "[[ ERR-IMG ]]" + generateRandomString(charsPerRow - errorIndex - 13, '▒▓');
			row.style.color = 'var(--failure)'
		} else {
			row.textContent = generateRandomString(charsPerRow, '▒▓');
		}

		div.appendChild(row);
	}
});
}

function refreshDivs() {
	fillDivs();
	fillDivsWithRandomChars();
	setTimeout(refreshDivs, 1000);
}

refreshDivs();
// SCRAMBLER //

// AUTO SCALER //
(function() {
	const baseResolution = 1279;
	const currentResolution = window.innerHeight;
	const scaleFactor = currentResolution / baseResolution;
	document.body.style.transform = `scale(${scaleFactor})`;
	document.body.style.transformOrigin = 'top left';
	document.body.style.height = `${100 / scaleFactor}vh`;

	window.addEventListener('resize', function() {
		const currentResolution = window.innerHeight;
		const scaleFactor = currentResolution / baseResolution;
		document.body.style.transform = `scale(${scaleFactor})`;
		document.body.style.height = `${100 / scaleFactor}vh`;
	});
})();
// AUTO SCALER //