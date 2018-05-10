const ANGLE = 0.5;

let floating = document.querySelectorAll(".floating");

floating.forEach((element, i) => {
	floatable(element);
});

function floatable (panel) {
	let content = panel.querySelector(".content");

	panel.addEventListener('mouseout', e => {
		content.style.transform = `perspective(300px)
								   rotateX(0deg)
								   rotateY(0deg)
								   rotateZ(0deg)`;
	});

	panel.addEventListener('mousemove', e => {
		let w = panel.clientWidth;
		let h = panel.clientHeight;
		let y = (e.offsetX - w * 0.5) / w * ANGLE;
		let x = (1 - (e.offsetY - h * 0.5)) / h * ANGLE;

		content.style.transform = `perspective(300px)
								   rotateX(${x}deg)
								   rotateY(${y}deg)`;
	});
}

var audio = document.getElementById("audio");
audio.volume = 0.25;
