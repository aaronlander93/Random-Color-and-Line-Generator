window.onload = function() {

	var canvas = document.getElementById("canvas");

	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	fillScreen();


	function fillScreen() {
		
		var height = canvas.height;
		var width = canvas.width;
		var startingPoint = calcStart(width, height);
		var x = 0;
		var y = 0;
		var xTemp = 0;
		var yTemp = 0;
		var destination = calcDestination(x, y);
		var dx = destination['xCord'];
		var dy = destination['yCord'];
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = randomColor();
		
		var interval = setInterval(drawLine, 1);

		function drawLine() {
			
			ctx.lineWidth = 30;
			ctx.beginPath();
			ctx.moveTo(x, y);

			var nextCord = calcNextCord(x, y, dx, dy);
			xTemp = nextCord['xCord'];
			yTemp = nextCord['yCord'];

			ctx.lineTo(xTemp, yTemp);
			x = xTemp;
			y = yTemp;

			ctx.stroke();

			if(x == dx || y == dy) {
				var destination = calcDestination(x, y);
				dx = destination['xCord'];
				dy = destination['yCord'];

				ctx.strokeStyle = randomColor();
				interval = setInterval(drawLine, 10);

			}
		}

		function calcDestination(x, y) {
			destArr = {'xCord': 0, 'yCord': 0};
			var min = 0;
			var max = 3;
			var xChange = false;
			var yChange = false;
			var random = Math.floor(Math.random()* (+max - +min) + +min);

			if(x == 0) {
				var outcomes = {0: 0, 1: width, 2: height};				
				if(random == 1) {
					destArr['xCord'] = outcomes[random];
					xChange = true;
				}
				else {
					destArr['yCord'] = outcomes[random];
					yChange = true;
				}
			}
			else if(y == 0){
				var outcomes = {0: width, 1: height, 2: 0};
				if(random == 1) {
					destArr['yCord'] = outcomes[random];
					yChange = true;
				}
				else {
					destArr['xCord'] = outcomes[random];
					xChange = true;
				}
			}
			else if(x == width){
				var outcomes = {0: height, 1: 0, 2: 0};
				if(random == 1) {
					destArr['xCord'] = outcomes[random];
					xChange = true;
				}
				else{
					destArr['yCord'] = outcomes[random];
					yChange = true;
				}
			}
			else if(y == height){
				var outcomes = {0: 0, 1: 0, 2: width};
				if(random == 1) {
					destArr['yCord'] = outcomes[random];
					yChange = true;
				}
				else {
					destArr['xCord'] = outcomes[random];
					xChange = true;
				}
			}

			if(xChange){
				max = height + 1;
				random = Math.floor(Math.random() * (+max - +min) + +min);

				destArr['yCord'] = random;
			}
			else if(yChange){
				max = width + 1;
				var random = Math.floor(Math.random() * (+max - +min) + +min);

				destArr['xCord'] = random;
			}
			return destArr;
		}

		function calcStart(width, height){
			destArr= {'xCord': 0, 'yCord': 0};

			var min = 0;
			var xMax = width;
			var yMax = height;

			destArr['xCord'] = Math.floor(Math.random() * (+xMax - +min) + +min);
			destArr['yCord'] = Math.floor(Math.random() * (+yMax- +min) + +min);

			return destArr;
		}
		function calcNextCord(x, y, dx, dy) {
			var yDelta = dy - y;
			var xDelta = dx - x;
			var slope = (yDelta / xDelta);

			var yInt = (slope * dx) * -1;
			yInt = yInt + dy;

			if(dx > x){
				x = x + 1;
				y = (slope * x) + yInt;
			}
			else{
				x = x - 1;
				y = (slope * x) + yInt;
			}
			

			var nextCord = {'xCord': x, 'yCord': y};
			return nextCord;

		}

		function randomColor() {
			var hex = ['#'];
			var dict = {
				10: 'A',
				11: 'B',
				12: 'C',
				13: 'D',
				14: 'E',
				15: 'F'
			}

			for(i = 0; i < 6; i++) {
				var min = 0;
				var max = 16;

				var random = Math.floor(Math.random() * (+max - +min)) + +min;
				if(random > 9) {
					hex.push(dict[random])
				}
				else {
					hex.push(random);
				}
			}

			var newColor = hex.join("");
			console.log(newColor);
			return newColor;
			}
		}
}