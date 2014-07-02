$().ready(function() {
	var ctx = $("#canvas")[0].getContext("2d");	
	var x =  0;
	var y = 150;
	var speed = 25;

	function animate() {

		reqAnimFrame = window.mozRequestAnimationFrame    ||
		            window.webkitRequestAnimationFrame ||
		            window.msRequestAnimationFrame     ||
		            window.oRequestAnimationFrame
		            ;

		reqAnimFrame(animate);

		x += speed;

		if(x <= 0 || x >= 1100){
		    speed = -speed;
		};

		draw();
	};


	function draw() {
		ctx.clearRect(0, y, 1200, 170);
		ctx.fillStyle = "yellow";
		ctx.fillRect(x, y, 100, 100);
	}

	animate();
});
