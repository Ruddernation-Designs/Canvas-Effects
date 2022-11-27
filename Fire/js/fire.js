var QUALITY = 10,
			WIDTH = Math.floor(window.innerWidth / QUALITY), HEIGHT = Math.floor(window.innerHeight / QUALITY), SIZE = WIDTH * HEIGHT,

			context, image, data,
			buffer1, buffer2, turbulence,

			isUserInteracting, pointers, count = 0;

			init();
			setInterval(loop, 1000 / 60);

			function init() {

				var container, canvas;

				container = document.getElementById('container');

				canvas = document.createElement("canvas");
				canvas.width = WIDTH;
				canvas.height = HEIGHT;
				canvas.style.width = window.innerWidth + "px";
				canvas.style.height = window.innerHeight + "px";
				container.appendChild(canvas);

				context = canvas.getContext("2d");
				context.fillStyle = "rgb(0, 0, 0)";
				context.fillRect (0, 0, WIDTH, HEIGHT);
				image = context.getImageData(0, 0, WIDTH, HEIGHT);
				data = image.data;

				buffer1 = [];
				buffer2 = [];
				turbulence = [];

				for (var i = 0; i < SIZE + WIDTH; i ++) {

					buffer1[i] = 0;
					buffer2[i] = 0;
					turbulence[i] = Math.random();
				}

				document.addEventListener('mousedown', onDocumentMouseDown, false);
				document.addEventListener('mousemove', onDocumentMouseMove, false);
				document.addEventListener('mouseup', onDocumentMouseUp, false);
				document.addEventListener('mouseout', onDocumentMouseOut, false);

				document.addEventListener('touchstart', onDocumentTouchStart, false);
				document.addEventListener('touchmove', onDocumentTouchMove, false);
				document.addEventListener('touchend', onDocumentTouchEnd, false);
			}

			//

			function onDocumentMouseDown(event) {

				event.preventDefault();

				isUserInteracting = true;

				pointers = [[event.clientX / QUALITY, event.clientY / QUALITY]];

			}

			function onDocumentMouseMove(event) {

				pointers = [[event.clientX / QUALITY, event.clientY / QUALITY]];

			}

			function onDocumentMouseUp(event) {

				isUserInteracting = false;

			}

			function onDocumentMouseOut(event) {

				isUserInteracting = false;

			}

			function onDocumentTouchStart(event) {

				isUserInteracting = true;

				event.preventDefault();

				pointers = [];

				for (var i = 0; i < event.touches.length; i++) {

					pointers.push([event.touches[i].pageX / QUALITY, event.touches[i].pageY / QUALITY]);

				}

			}

			function onDocumentTouchMove(event) {

				event.preventDefault();

				pointers = [];

				for (var i = 0; i < event.touches.length; i++) {

					pointers.push([event.touches[i].pageX / QUALITY, event.touches[i].pageY / QUALITY]);

				}

			}

			function onDocumentTouchEnd(event) {

				event.preventDefault();

				isUserInteracting = false;

			}

			//

			function emit(x, y) {

				buffer1[ Math.floor(x) + (Math.floor(y) * WIDTH)] = 1000;

			}

			function loop() {

				if (isUserInteracting) {

					for (var i = 0; i < pointers.length; i++) {

						emit(pointers[i][0], pointers[i][1]);

					}
				}

				var iMax = WIDTH / 5;

				for (var i = 0; i < iMax; i ++) {

					emit(Math.random() * WIDTH, HEIGHT);

				}

				var i4, pixel;

				for (var i = WIDTH; i < SIZE; i ++) {

					i4 = i * 4;

					pixel = buffer2[i] = ((buffer1[i - 1] + buffer1[i + 1]) * .235) + (buffer1[i + WIDTH] * turbulence[(i + count) % SIZE]);

					data[ i4 ] = Math.min( 255, pixel << 3 );
					data[ i4 + 1 ] = Math.min( 255, pixel );
					data[ i4 + 2 ] = Math.min( 255, pixel >> 1 );
				}

				buffer1 = buffer2.slice(0);

				context.putImageData(image, 0, 0);

				count += Math.floor(Math.random() * SIZE);
			}
