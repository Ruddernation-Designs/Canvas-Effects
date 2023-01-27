// URL: www.ruddernation.com
// Version: 1.4
// Copyright (c) 2015 Ruddernation Designs
(function(){
	
	var PI_2        = Math.PI * 2;
	
	var canvasW     = 1850;
	var canvasH     = 1050;
	var numMovers   = 1000;
	var friction    = 0.95;
	var movers      = [];
	
	
	
	var mouseX;
	var mouseY;
	var mouseVX;
	var mouseVY;
	var prevMouseX;
	var prevMouseY;
	var isMouseDown;


	function init(){
		canvas = document.getElementById("mainCanvas");
		
		if ( canvas.getContext ){
			setup();
			setInterval( run , 33 );
			
		}
	}
	   
	function setup(){
		outerDiv  = document.getElementById("outer");
		canvasDiv = document.getElementById("canvasContainer");
		ctx       = canvas.getContext("2d");
		
		var i = numMovers;
		while ( i-- ){
			var m = new Mover();
			m.x   = canvasW * 0.5;
			m.y   = canvasH * 0.5;
			m.vX  = Math.cos(i) * Math.random() * 88;
			m.vY  = Math.sin(i) * Math.random() * 88;
			movers[i] = m;
		}
		
		mouseX = prevMouseX = canvasW * 0.5;
		mouseY = prevMouseY = canvasH * 0.5;
		
		document.onmousedown = onDocMouseDown;
		document.onmouseup   = onDocMouseUp;
		document.onmousemove = onDocMouseMove;
	}

	function run(){
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "rgba(00,00,0,0.80)";
		ctx.fillRect( 0 , 0 , canvasW , canvasH );
		ctx.globalCompositeOperation = "lighter";
		
		mouseVX    = mouseX - prevMouseX;
		mouseVY    = mouseY - prevMouseY;
		prevMouseX = mouseX;
		prevMouseY = mouseY;
		
		var toDist   = canvasW * 0.86;
		var stirDist = canvasW * 0.125;
		var blowDist = canvasW * 0.5;
		
		var Mrnd = Math.random;
		var Mabs = Math.abs;
		
		var i = numMovers;
		while ( i-- ){
			var m  = movers[i];
			var x  = m.x;
			var y  = m.y;
			var vX = m.vX;
			var vY = m.vY;
			
			var dX = x - mouseX;
			var dY = y - mouseY; 
			var d  = Math.sqrt( dX * dX + dY * dY ) || 0.001;
			dX /= d;
			dY /= d;
			
			if ( isMouseDown ){
				if ( d < blowDist ){
					var blowAcc = ( 1 - ( d / blowDist ) ) * 14;
					vX += dX * blowAcc + 0.5 - Mrnd();
					vY += dY * blowAcc + 0.5 - Mrnd();
				}
			}
			
			if ( d < toDist ){
				var toAcc = ( 1 - ( d / toDist ) ) * canvasW * 0.0014;
				vX -= dX * toAcc;
				vY -= dY * toAcc;			
			}
			
			if ( d < stirDist ){
				var mAcc = ( 1 - ( d / stirDist ) ) * canvasW * 0.00026;
				vX += mouseVX * mAcc;
				vY += mouseVY * mAcc;			
			}
			
			vX *= friction;
			vY *= friction;
			
			var avgVX = Mabs( vX );
			var avgVY = Mabs( vY );
			var avgV  = ( avgVX + avgVY ) * 0.5;
			
			if( avgVX < .1 ) vX *= Mrnd() * 3;
			if( avgVY < .1 ) vY *= Mrnd() * 3;
			
			var sc = avgV * 0.45;
			sc = Math.max( Math.min( sc , 3.5 ) , 0.4 );
			
			var nextX = x + vX;
			var nextY = y + vY;
			
			if ( nextX > canvasW ){
				nextX = canvasW;
				vX *= -1;
			}
			else if ( nextX < 0 ){
				nextX = 0;
				vX *= -1;
			}
			
			if ( nextY > canvasH ){
				nextY = canvasH;
				vY *= -1;
			}
			else if ( nextY < 0 ){
				nextY = 0;
				vY *= -1;
			}
			
			m.vX = vX;
			m.vY = vY;
			m.x  = nextX;
			m.y  = nextY;
			
			ctx.fillStyle = m.color;
			ctx.beginPath();
			ctx.arc( nextX , nextY , sc , 0 , PI_2 , true );
			ctx.closePath();
			ctx.fill();		
		}
	}


	function onDocMouseMove( e ){
		var ev = e ? e : window.event;
		mouseX = ev.clientX - outerDiv.offsetLeft - canvasDiv.offsetLeft;
		mouseY = ev.clientY - outerDiv.offsetTop  - canvasDiv.offsetTop;
	}

	function onDocMouseDown( e ){
		isMouseDown = true;
		return false;
	}

	function onDocMouseUp( e ){
		isMouseDown = false;
		return false;
	}


	function Mover(){
		this.color = "rgb(" + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + ")";
		this.y     = 0;
		this.x     = 0;
		this.vX    = 0;
		this.vY    = 0;
		this.size  = 8; 
	}


	function rect( context , x , y , w , h ){
		context.beginPath();
		context.rect( x , y , w , h );
		context.closePath();
		context.fill();
	}


	function trace( str ){
		document.getElementById("output").innerHTML = str;
	}


	window.onload = init;
	
})();