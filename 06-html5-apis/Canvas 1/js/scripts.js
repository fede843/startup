var random = function(max) {
	return Math.floor(Math.random()*max);
}

var MAX_W = 1200,
	MAX_H = 800;


$().ready(function() {
	var ctx = $("#canvas")[0].getContext("2d");

	var rectangle = function() {
		var x = random(MAX_W),
			y = random(MAX_H);

		ctx.fillStyle = "#"+Math.floor(Math.random()*16777215).toString(16);
		ctx.fillRect(x-100, y-100, random(MAX_W)/3, random(MAX_H)/3);
	};

	var circle = function() {
		var x = random(MAX_W),
			y = random(MAX_H),
			r = random(50);

		ctx.strokeStyle = "#"+Math.floor(Math.random()*16777215).toString(16);
		ctx.lineWidth = 1.7*Math.random()*r;
		ctx.beginPath();
		ctx.arc(x-100, y-100,r,0,2*Math.PI);
		ctx.stroke();
	};

	var line = function() {
		var x = random(MAX_W),
			y = random(MAX_H);

		ctx.strokeStyle = "#"+Math.floor(Math.random()*16777215).toString(16);
		ctx.lineWidth = random(15);

		ctx.moveTo(x-100, y-100);
		ctx.lineTo(x+random(MAX_W)/8, y+random(MAX_H)/8);
		ctx.stroke();
	};

	var figures = [line, rectangle, circle];

	for (i = 0; i < 300; i++) {
		figures[random(3)]();
	}
});
