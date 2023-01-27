// URL: www.ruddernation.com
// Version: 1.0
// Copyright (c) 2011 Ruddernation <contact@ruddernation.com>
	
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	
	var RADIUS = 60;
	
	var RADIUS_SCALE = 1;
	var RADIUS_SCALE_MIN = 1;
	var RADIUS_SCALE_MAX = 1.5;
	
	// This is the quantity of particles on the webpage.
	var QUANTITY = 30;

	var canvas;
	var context;
	var particles;
	
	var mouseX = SCREEN_WIDTH * 0.1;
	var mouseY = SCREEN_HEIGHT * 0.1;
	var mouseIsDown = false;

	init();

	function init() {

		canvas = document.getElementById( 'world' );
		
		if (canvas && canvas.getContext) {
			context = canvas.getContext('2d');
			
			document.addEventListener('mousemove', documentMouseMoveHandler, false);
			document.addEventListener('mousedown', documentMouseDownHandler, false);
			document.addEventListener('mouseup', documentMouseUpHandler, false);
			document.addEventListener('touchstart', documentTouchStartHandler, false);
			document.addEventListener('touchmove', documentTouchMoveHandler, false);
			window.addEventListener('resize', windowResizeHandler, false);
			
			createParticles();
			
			windowResizeHandler();
			
			setInterval( loop, 1000 / 60 );
		}
	}

	function createParticles() {
		particles = [];
		
		for (var i = 0; i < QUANTITY; i++) {
			var particle = {
				position: { x: mouseX, y: mouseY },
				shift: { x: mouseX, y: mouseY },
				size: 1,
				angle: 0,
				speed: 0.01+Math.random()*0.04,
				targetSize: 1,
				fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
				orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
			};
			
			particles.push( particle );
		}
	}
	
	function documentMouseMoveHandler(event) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
	
	function documentMouseDownHandler(event) {
		mouseIsDown = true;
	}
	
	function documentMouseUpHandler(event) {
		mouseIsDown = false;
	}

	function documentTouchStartHandler(event) {
		if(event.touches.length == 1) {
			event.preventDefault();

			mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
			mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
		}
	}
	
	function documentTouchMoveHandler(event) {
		if(event.touches.length == 1) {
			event.preventDefault();

			mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
			mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
		}
	}
	
	function windowResizeHandler() {
		SCREEN_WIDTH = window.innerWidth;
		SCREEN_HEIGHT = window.innerHeight;
		
		canvas.width = SCREEN_WIDTH;
		canvas.height = SCREEN_HEIGHT;
	}
	
	function loop() {
		
		context.shadowBlur = 3;
		
		if( mouseIsDown ) {
			// Scale upward to the max scale
			RADIUS_SCALE += ( RADIUS_SCALE_MAX - RADIUS_SCALE ) * (0.02);
		}
		else {
			// Scale downward to the min scale
			RADIUS_SCALE -= ( RADIUS_SCALE - RADIUS_SCALE_MIN ) * (0.02);
		}
		
		RADIUS_SCALE = Math.min( RADIUS_SCALE, RADIUS_SCALE_MAX );
		
		for (i = 0, len = particles.length; i < len; i++) {
			var particle = particles[i];
			
			particle.angle += particle.speed;
			
			particle.shift.x += ( mouseX - particle.shift.x) * (particle.speed);
			particle.shift.y += ( mouseY - particle.shift.y) * (particle.speed);
			
			particle.position.x = particle.shift.x + Math.cos(i + particle.angle) * (particle.orbit*RADIUS_SCALE);
			particle.position.y = particle.shift.y + Math.sin(i + particle.angle) * (particle.orbit*RADIUS_SCALE);
			
			particle.position.x = Math.max( Math.min( particle.position.x, SCREEN_WIDTH ), 0 );
			particle.position.y = Math.max( Math.min( particle.position.y, SCREEN_HEIGHT ), 0 );
			
			particle.size += ( particle.targetSize - particle.size ) * 0.05;
			
			if( Math.round( particle.size ) == Math.round( particle.targetSize ) ) {
				particle.targetSize = 1 + Math.random() * 7;
			}
			
			context.beginPath();
			context.fillStyle = particle.fillColor;;
			context.moveTo(particle.position.x, particle.position.y);
			context.arc(particle.position.x, particle.position.y, particle.size, 0, Math.PI*2, true);
			context.fill();
		}
	}
	