Math.distance = function(a, b){
	return Math.sqrt( Math.pow((a.x-b.x), 2) + Math.pow((a.y-b.y), 2) );
}
// @see https://gist.github.com/mrdoob/838785
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			window.setTimeout( callback, 1000 / 60 );
		};
	})();
}
// vars definitions
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var PI2 = Math.PI*2;
var canvas, context;
var canvas2, context2;
var canvas3, context3;
//
var totalDots = isMobile ? 30 : 60;
var dots = [];
var dots2 = [];
var dots3 = [];
var min_distance = 140;
var friction = 0.15; //
// size
var width = window.innerWidth,
	height = window.innerHeight;

function init(){
	canvas = document.getElementById('hero-dots');
	canvas.width = canvas.getBoundingClientRect().width;
	canvas.height = canvas.getBoundingClientRect().height;
	context = canvas.getContext("2d");
	setDots(dots);

	canvas2 = document.getElementById('mid-dots');
	canvas2.width = canvas2.getBoundingClientRect().width;
	canvas2.height = canvas2.getBoundingClientRect().height;
	context2 = canvas2.getContext("2d");
	setDotsDown(dots2);

	canvas3 = document.getElementById('last-dots');
	canvas3.width = canvas3.getBoundingClientRect().width;
	canvas3.height = canvas3.getBoundingClientRect().height;
	context3 = canvas3.getContext("2d");
	setDots(dots3);
	addEvents();
}

function addEvents() {
	/* throttle for PERFORMANCE */
	window.addEventListener("resize", _.throttle(onWindowResize, 250), false);
}



function setDots(dotsArray){
	for (var i = 0; i < totalDots; i++) {
		if (i < totalDots / 2) {
			var _dot = new Dot({
				x: Math.random() * canvas.width / 2,
				y: (Math.random() * canvas.height / 4) + ((canvas.height / 4)*3)
			});
		} else {
			var _dot = new Dot({
				x: (Math.random() * canvas.width / 4) + ((canvas.width / 4)*3),
				y: Math.random() * canvas.height / 2
			});
		}

		dotsArray.push(_dot);
	}
}
function setDotsDown(dotsArray){
	for (var i = 0; i < totalDots; i++) {
		if (i < totalDots / 2) {
			var _dot = new Dot({
				x: Math.random() * canvas.width / 2,
				y: (Math.random() * canvas.height / 4) + ((canvas.height / 4)*3)
			});
		}

		dotsArray.push(_dot);
	}
}

function onWindowResize(){
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = canvas.getBoundingClientRect().width;
	canvas.height = canvas.getBoundingClientRect().height;
	canvas2.width = canvas2.getBoundingClientRect().width;
	canvas2.height = canvas2.getBoundingClientRect().height;
	canvas3.width = canvas3.getBoundingClientRect().width;
	canvas3.height = canvas3.getBoundingClientRect().height;
}

var Dot = function(args){
	if (args===undefined) var args = {};
	this.position = {
		x: args.x || Math.random() * canvas.width,
		y: args.y || Math.random() * canvas.height
	};
	this.radius = args.radius || Math.ceil(Math.random()*2);
	this.velocity = {
		x: Math.random() * 0.6 - 0.3,
		y: Math.random() * 0.6 - 0.3,
	}
	this.draw = function(ctx){
		this.updateCoords();
		ctx.beginPath();
		ctx.fillStyle="white";
		ctx.arc(this.position.x,this.position.y,this.radius,0,PI2);
		ctx.fill();
	}
	this.updateCoords = function(){
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if(this.position.x < 0 || this.position.x > canvas.width) this.velocity.x *= -1;
		if(this.position.y < 0 || this.position.y > canvas.height) this.velocity.y *= -1;
	}
	return this;
}


function animate(){
	requestAnimationFrame(animate);
	render();
}

function render(){
	context.clearRect(0,0,canvas.width,canvas.height);
	context2.clearRect(0,0,canvas.width,canvas.height);
	context3.clearRect(0,0,canvas.width,canvas.height + 5);

	for (var i = 0; i < dots.length; i++) {
		var _dot_a = dots[i];
		_dot_a.draw(context);

		var _dot_a2 = dots2[i];
		_dot_a2.draw(context2);

		var _dot_a3 = dots3[i];
		_dot_a3.draw(context3);

		
    for (var j = i + 1; j < dots.length; j++) {
      var _dot_b = dots[j];
      var _dot_b2 = dots2[j];
      var _dot_b3 = dots3[j];
      
      var _distance = Math.distance(_dot_a.position, _dot_b.position);
      if(_distance < min_distance){
        context.moveTo(_dot_a.position.x, _dot_a.position.y);
        context.lineTo(_dot_b.position.x, _dot_b.position.y);
        context.strokeStyle="white";
        context.lineWidth = .05;
        // context.lineWidth = .25 - (_distance/min_distance);
        context.stroke();
      }
      
      var _distance2 = Math.distance(_dot_a2.position, _dot_b2.position);
      if(_distance2 < min_distance){
        context2.moveTo(_dot_a2.position.x, _dot_a2.position.y);
        context2.lineTo(_dot_b2.position.x, _dot_b2.position.y);
        context2.strokeStyle="white";
        context2.lineWidth = .04;
        // context2.lineWidth = .5 - (_distance/min_distance);
        context2.stroke();
      }
      
      var _distance3 = Math.distance(_dot_a3.position, _dot_b3.position);
      if(_distance3 < min_distance){
        context3.moveTo(_dot_a3.position.x, _dot_a3.position.y);
        context3.lineTo(_dot_b3.position.x, _dot_b3.position.y);
        context3.strokeStyle="white";
        context3.lineWidth = .08;
        // context3.lineWidth = .2 - (_distance3/min_distance);
        context3.stroke();
      }
    }
	}
}

// init();
// animate();