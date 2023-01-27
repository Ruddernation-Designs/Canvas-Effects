/*This is partially obfuscated, I'm sorry about that but I can't find my original file.*/
var g;
var canvas;
var width = window.innerWidth;
var height = window.innerHeight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseX = 0;
var mouseY = 0;
var pmouseX = 0;
var pmouseY = 0;
var mousePressed = false;
var drawRate = 6;
var frameCount = 0;
var PI = Math.PI;
var TWO_PI = 2 * Math.PI;
var HALF_PI = Math.PI * 0.5;
function init() {
  canvas = document.getElementById("canvas");
  canvas.width = width;
  canvas.height = height;
  g = canvas.getContext("2d");
  g.setTransform(1, 0, 0, 1, 0, 0);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("mousedown", onDocumentMouseDown, false);
  document.addEventListener("mouseup", onDocumentMouseUp, false);
  document.addEventListener("keydown", onDocumentKeyDown, false);
  setup();
  drawInternal();
}
;
function windowResize() {
  g.setTransform(1, 0, 0, 1, 0, 0);
}
;
function onDocumentMouseMove(_0x5155x14) {
  mouseX = _0x5155x14.clientX - canvas.offsetLeft;
  mouseY = _0x5155x14.clientY - canvas.offsetTop;
}
;
function onDocumentMouseDown(_0x5155x14) {
  mousePressed = true;
  mousePressedEvent();
}
;
function onDocumentMouseUp(_0x5155x14) {
  mousePressed = false;
}
;
function onDocumentKeyDown(_0x5155x14) {}
;
function drawInternal() {
  draw();
  setTimeout("drawInternal()", drawRate);
  pmouseX = mouseX;
  pmouseY = mouseY;
  frameCount++;
}
;
function clear() {
  g.clearRect(0, 0, width, height);
}
;
function line(_0x5155x1b, _0x5155x1c, _0x5155x1d, _0x5155x1e) {
  g.beginPath();
  g.moveTo(_0x5155x1b, _0x5155x1c);
  g.lineTo(_0x5155x1d, _0x5155x1e);
  g.closePath();
  g.stroke();
}
;
function fillStrokeCircle(_0x5155x20, _0x5155x21, _0x5155x22) {
  if (_0x5155x22 <= 0) {
    _0x5155x22 = 0;
  }
  ;
  g.beginPath();
  g.arc(_0x5155x20, _0x5155x21, _0x5155x22, 0, TWO_PI, true);
  g.closePath();
  g.fill();
  g.stroke();
}
;
function fillCircle(_0x5155x20, _0x5155x21, _0x5155x22) {
  if (_0x5155x22 <= 0) {
    _0x5155x22 = 0;
  }
  ;
  g.beginPath();
  g.arc(_0x5155x20, _0x5155x21, _0x5155x22, 0, TWO_PI, true);
  g.closePath();
  g.fill();
}
;
function strokeCircle(_0x5155x20, _0x5155x21, _0x5155x22) {
  if (_0x5155x22 <= 0) {
    _0x5155x22 = 0;
  }
  ;
  g.beginPath();
  g.arc(_0x5155x20, _0x5155x21, _0x5155x22, 0, TWO_PI, true);
  g.stroke();
}
;
function dist(_0x5155x26, _0x5155x27, _0x5155x28, _0x5155x29) {
  var _0x5155x2a = _0x5155x28 - _0x5155x26;
  dy = _0x5155x29 - _0x5155x27;
  return Math.sqrt(_0x5155x2a * _0x5155x2a + dy * dy + dz * dz);
}
;
var currentRandom = Math.random;
function Marsaglia(_0x5155x2d, _0x5155x2e) {
  var _0x5155x2f = _0x5155x2d || 362436069, _0x5155x30 = _0x5155x2e || 521288629;
  var _0x5155x31 = function () {
    _0x5155x2f = 36969 * (_0x5155x2f & 65535) + (_0x5155x2f >>> 16) & 4294967295;
    _0x5155x30 = 18e3 * (_0x5155x30 & 65535) + (_0x5155x30 >>> 16) & 4294967295;
    return ((_0x5155x2f & 65535) << 16 | _0x5155x30 & 65535) & 4294967295;
  };
  this.nextDouble = function () {
    var _0x5155x32 = _0x5155x31() / 4294967296;
    return _0x5155x32 < 0 ? 1 + _0x5155x32 : _0x5155x32;
  };
  this.nextInt = _0x5155x31;
}
;
Marsaglia.createRandomized = function () {
  var _0x5155x33 = new Date;
  return new Marsaglia(_0x5155x33 / 6e4 & 4294967295, _0x5155x33 & 4294967295);
};
function PerlinNoise(_0x5155x35) {
  var _0x5155x36 = _0x5155x35 !== undefined ? new Marsaglia(_0x5155x35) : Marsaglia.createRandomized();
  var _0x5155x32, _0x5155x37;
  var _0x5155x38 = new Array(512);
  for (_0x5155x32 = 0; _0x5155x32 < 256; ++_0x5155x32) {
    _0x5155x38[_0x5155x32] = _0x5155x32;
  }
  ;
  for (_0x5155x32 = 0; _0x5155x32 < 256; ++_0x5155x32) {
    var _0x5155x39 = _0x5155x38[_0x5155x37 = _0x5155x36.nextInt() & 255];
    _0x5155x38[_0x5155x37] = _0x5155x38[_0x5155x32];
    _0x5155x38[_0x5155x32] = _0x5155x39;
  }
  ;
  for (_0x5155x32 = 0; _0x5155x32 < 256; ++_0x5155x32) {
    _0x5155x38[_0x5155x32 + 256] = _0x5155x38[_0x5155x32];
  }
  ;
  function _0x5155x3a(_0x5155x32, _0x5155x20, _0x5155x21, _0x5155x2f) {
    var _0x5155x3b = _0x5155x32 & 15;
    var _0x5155x3c = _0x5155x3b < 8 ? _0x5155x20 : _0x5155x21, _0x5155x3d = _0x5155x3b < 4 ? _0x5155x21 : _0x5155x3b === 12 || _0x5155x3b === 14 ? _0x5155x20 : _0x5155x2f;
    return ((_0x5155x3b & 1) === 0 ? _0x5155x3c : -_0x5155x3c) + ((_0x5155x3b & 2) === 0 ? _0x5155x3d : -_0x5155x3d);
  }
  ;
  function _0x5155x3e(_0x5155x32, _0x5155x20, _0x5155x21) {
    var _0x5155x3d = (_0x5155x32 & 1) === 0 ? _0x5155x20 : _0x5155x21;
    return (_0x5155x32 & 2) === 0 ? -_0x5155x3d : _0x5155x3d;
  }
  ;
  function _0x5155x3f(_0x5155x32, _0x5155x20) {
    return (_0x5155x32 & 1) === 0 ? -_0x5155x20 : _0x5155x20;
  }
  ;
  ;
  this.noise3d = function (_0x5155x20, _0x5155x21, _0x5155x2f) {
    var _0x5155x43 = Math.floor(_0x5155x20) & 255, _0x5155x44 = Math.floor(_0x5155x21) & 255, _0x5155x45 = Math.floor(_0x5155x2f) & 255;
    _0x5155x20 -= Math.floor(_0x5155x20);
    _0x5155x21 -= Math.floor(_0x5155x21);
    _0x5155x2f -= Math.floor(_0x5155x2f);
    var _0x5155x46 = (3 - 2 * _0x5155x20) * _0x5155x20 * _0x5155x20, _0x5155x47 = (3 - 2 * _0x5155x21) * _0x5155x21 * _0x5155x21, _0x5155x48 = (3 - 2 * _0x5155x2f) * _0x5155x2f * _0x5155x2f;
    var _0x5155x49 = _0x5155x38[_0x5155x43] + _0x5155x44, _0x5155x4a = _0x5155x38[_0x5155x49] + _0x5155x45, _0x5155x4b = _0x5155x38[_0x5155x49 + 1] + _0x5155x45, _0x5155x4c = _0x5155x38[_0x5155x43 + 1] + _0x5155x44, _0x5155x4d = _0x5155x38[_0x5155x4c] + _0x5155x45, _0x5155x4e = _0x5155x38[_0x5155x4c + 1] + _0x5155x45;
    return _0x5155x3a(_0x5155x38[_0x5155x4a], _0x5155x20, _0x5155x21, _0x5155x2f) + _0x5155x46 * (_0x5155x3a(_0x5155x38[_0x5155x4d], _0x5155x20 - 1, _0x5155x21, _0x5155x2f) - _0x5155x3a(_0x5155x38[_0x5155x4a], _0x5155x20, _0x5155x21, _0x5155x2f)) + _0x5155x47 * (_0x5155x3a(_0x5155x38[_0x5155x4b], _0x5155x20, _0x5155x21 - 1, _0x5155x2f) + _0x5155x46 * (_0x5155x3a(_0x5155x38[_0x5155x4e], _0x5155x20 - 1, _0x5155x21 - 1, _0x5155x2f) - _0x5155x3a(_0x5155x38[_0x5155x4b], _0x5155x20, _0x5155x21 - 1, _0x5155x2f)) - (_0x5155x3a(_0x5155x38[_0x5155x4a], _0x5155x20, _0x5155x21, _0x5155x2f) + _0x5155x46 * (_0x5155x3a(_0x5155x38[_0x5155x4d], _0x5155x20 - 1, _0x5155x21, _0x5155x2f) - _0x5155x3a(_0x5155x38[_0x5155x4a], _0x5155x20, _0x5155x21, _0x5155x2f)))) + _0x5155x48 * (_0x5155x3a(_0x5155x38[_0x5155x4a + 1], _0x5155x20, _0x5155x21, _0x5155x2f - 1) + _0x5155x46 * (_0x5155x3a(_0x5155x38[_0x5155x4d + 1], _0x5155x20 - 1, _0x5155x21, _0x5155x2f - 1) - _0x5155x3a(_0x5155x38[_0x5155x4a + 1], _0x5155x20, _0x5155x21, _0x5155x2f - 1)) + _0x5155x47 * (_0x5155x3a(_0x5155x38[_0x5155x4b + 1], _0x5155x20, _0x5155x21 - 1, _0x5155x2f - 1) + _0x5155x46 * (_0x5155x3a(_0x5155x38[_0x5155x4e + 1], _0x5155x20 - 1, _0x5155x21 - 1, _0x5155x2f - 1) - _0x5155x3a(_0x5155x38[_0x5155x4b + 1], _0x5155x20, _0x5155x21 - 1, _0x5155x2f - 1)) - (_0x5155x3a(_0x5155x38[_0x5155x4a + 1], _0x5155x20, _0x5155x21, _0x5155x2f - 1) + _0x5155x46 * (_0x5155x3a(_0x5155x38[_0x5155x4d + 1], _0x5155x20 - 1, _0x5155x21, _0x5155x2f - 1) - _0x5155x3a(_0x5155x38[_0x5155x4a + 1], _0x5155x20, _0x5155x21, _0x5155x2f - 1)))) - (_0x5155x3a(_0x5155x38[_0x5155x4a], _0x5155x20, _0x5155x21, _0x5155x2f) + _0x5155x46 * (_0x5155x3a(_0x5155x38[_0x5155x4d], _0x5155x20 - 1, _0x5155x21, _0x5155x2f) - _0x5155x3a(_0x5155x38[_0x5155x4a], _0x5155x20, _0x5155x21, _0x5155x2f)) + _0x5155x47 * (_0x5155x3a(_0x5155x38[_0x5155x4b], _0x5155x20, _0x5155x21 - 1, _0x5155x2f) + _0x5155x46 * (_0x5155x3a(_0x5155x38[_0x5155x4e], _0x5155x20 - 1, _0x5155x21 - 1, _0x5155x2f) - _0x5155x3a(_0x5155x38[_0x5155x4b], _0x5155x20, _0x5155x21 - 1, _0x5155x2f)) - (_0x5155x3a(_0x5155x38[_0x5155x4a], _0x5155x20, _0x5155x21, _0x5155x2f) + _0x5155x46 * (_0x5155x3a(_0x5155x38[_0x5155x4d], _0x5155x20 - 1, _0x5155x21, _0x5155x2f) - _0x5155x3a(_0x5155x38[_0x5155x4a], _0x5155x20, _0x5155x21, _0x5155x2f))))));
  };
  this.noise2d = function (_0x5155x20, _0x5155x21) {
    var _0x5155x43 = Math.floor(_0x5155x20) & 255, _0x5155x44 = Math.floor(_0x5155x21) & 255;
    _0x5155x20 -= Math.floor(_0x5155x20);
    _0x5155x21 -= Math.floor(_0x5155x21);
    var _0x5155x46 = (3 - 2 * _0x5155x20) * _0x5155x20 * _0x5155x20, _0x5155x47 = (3 - 2 * _0x5155x21) * _0x5155x21 * _0x5155x21;
    var _0x5155x49 = _0x5155x38[_0x5155x43] + _0x5155x44, _0x5155x4c = _0x5155x38[_0x5155x43 + 1] + _0x5155x44;
    return _0x5155x3e(_0x5155x38[_0x5155x49], _0x5155x20, _0x5155x21) + _0x5155x46 * (_0x5155x3e(_0x5155x38[_0x5155x4c], _0x5155x20 - 1, _0x5155x21) - _0x5155x3e(_0x5155x38[_0x5155x49], _0x5155x20, _0x5155x21)) + _0x5155x47 * (_0x5155x3e(_0x5155x38[_0x5155x49 + 1], _0x5155x20, _0x5155x21 - 1) + _0x5155x46 * (_0x5155x3e(_0x5155x38[_0x5155x4c + 1], _0x5155x20 - 1, _0x5155x21 - 1) - _0x5155x3e(_0x5155x38[_0x5155x49 + 1], _0x5155x20, _0x5155x21 - 1)) - (_0x5155x3e(_0x5155x38[_0x5155x49], _0x5155x20, _0x5155x21) + _0x5155x46 * (_0x5155x3e(_0x5155x38[_0x5155x4c], _0x5155x20 - 1, _0x5155x21) - _0x5155x3e(_0x5155x38[_0x5155x49], _0x5155x20, _0x5155x21))));
  };
  this.noise1d = function (_0x5155x20) {
    var _0x5155x43 = Math.floor(_0x5155x20) & 255;
    _0x5155x20 -= Math.floor(_0x5155x20);
    var _0x5155x46 = (3 - 2 * _0x5155x20) * _0x5155x20 * _0x5155x20;
    return _0x5155x3f(_0x5155x38[_0x5155x43], _0x5155x20) + _0x5155x46 * (_0x5155x3f(_0x5155x38[_0x5155x43 + 1], _0x5155x20 - 1) - _0x5155x3f(_0x5155x38[_0x5155x43], _0x5155x20));
  };
}
;
var noiseProfile = {generator: undefined, octaves: 4, fallout: 0.5, seed: undefined};
function noise(_0x5155x20, _0x5155x21, _0x5155x2f) {
  if (noiseProfile.generator === undefined) {
    noiseProfile.generator = new PerlinNoise(noiseProfile.seed);
  }
  ;
  var _0x5155x51 = noiseProfile.generator;
  var _0x5155x52 = 1, _0x5155x53 = 1, _0x5155x54 = 0;
  for (var _0x5155x32 = 0; _0x5155x32 < noiseProfile.octaves; ++_0x5155x32) {
    _0x5155x52 *= noiseProfile.fallout;
    switch (arguments.length) {
      case 1:
        _0x5155x54 += _0x5155x52 * (1 + _0x5155x51.noise1d(_0x5155x53 * _0x5155x20)) / 2;
        break;
        ;
      case 2:
        _0x5155x54 += _0x5155x52 * (1 + _0x5155x51.noise2d(_0x5155x53 * _0x5155x20, _0x5155x53 * _0x5155x21)) / 2;
        break;
        ;
      case 3:
        _0x5155x54 += _0x5155x52 * (1 + _0x5155x51.noise3d(_0x5155x53 * _0x5155x20, _0x5155x53 * _0x5155x21, _0x5155x53 * _0x5155x2f)) / 2;
        break;
        ;
    }
    ;
    _0x5155x53 *= 2;
  }
  ;
  return _0x5155x54;
}
;
function Worm(_0x5155x20, _0x5155x21) {
  this.x = _0x5155x20;
  this.y = _0x5155x21;
  this.lx = _0x5155x20;
  this.ly = _0x5155x21;
  this.heading = Math.sin(frameCount * 0.083) * PI;
  ;
  ;
  this.rotation = Math.random() * (PI / (Math.random() * 70));
  this.rate = 0;
  this.maxLength = 15 + noise(frameCount * 0.0025, frameCount * 0.1) * 15;
  this.detail = 2;
  this.thickness = 3;
  this.thicknessTarget = 5 + Math.random() * 10;
  var _0x5155x56 = parseInt(Math.random() * colors.length);
  this.c = colors[_0x5155x56];
  this.life = 30 + Math.random() * 120;
  this.segments = new Array;
  this.ooo = true;
  this.counter = noise(frameCount * 0.1, frameCount * 0.1);
  this.update = function () {
    this.life--;
    if (this.life > 0) {
      this.thickness += (this.thicknessTarget - this.thickness) * 0.1;
      this.thickness += 0.1;
      if (this.thickness > this.thicknessTarget) {
        this.thickness = this.thicknessTarget;
      }
      ;
      this.heading += this.rotation;
      this.rate = Math.cos(this.counter / 200) * (10 + noise(frameCount * 0.05) * 10);
      this.rotation = Math.sin(this.counter / this.rate) * (this.segments.length + 1) * 0.01;
      this.counter++;
      var _0x5155x57 = this.segments.length * this.segments.length * this.segments.length * 0.0015 * this.thickness / this.thicknessTarget;
      var _0x5155x58 = this.detail + _0x5155x57;
      var _0x5155x59 = Math.cos(this.heading) * _0x5155x58;
      var _0x5155x5a = Math.sin(this.heading) * _0x5155x58;
      this.walk(_0x5155x59, _0x5155x5a);
    } else {
      if (this.segments.length > 1) {
        this.segments.pop();
      } else {
        this.thickness *= 0.95;
        this.thickness -= 0.2;
        if (this.thickness < 0.1) {
          this.ooo = true;
        }
        ;
        return;
      }
      ;
    }
    ;
    this.ooo = true;
    for (var _0x5155x32 = 0; _0x5155x32 < this.segments.length; _0x5155x32++) {
      var _0x5155x5b = this.segments[_0x5155x32];
      if (_0x5155x5b.ooo() == false) {
        this.ooo = false;
        break;
      }
      ;
    }
    ;
  };
  this.walk = function (_0x5155x59, _0x5155x5a) {
    this.lx = this.x;
    this.ly = this.y;
    this.x += _0x5155x59;
    this.y += _0x5155x5a;
    var _0x5155x5c = new Segment(this.lx, this.ly, this.x, this.y, this.thickness);
    this.segments.unshift(_0x5155x5c);
    if (this.segments.length > 1) {
      this.segments[this.segments.length - 1].smoothAgainst(this.segments[this.segments.length - 2]);
    }
    ;
    if (this.segments.length >= this.maxLength) {
      this.segments.pop();
    }
    ;
  };
}
;
function Segment(_0x5155x1b, _0x5155x1c, _0x5155x1d, _0x5155x1e, _0x5155x5e) {
  this.x1 = _0x5155x1b;
  this.y1 = _0x5155x1c;
  this.x2 = _0x5155x1d;
  this.y2 = _0x5155x1e;
  this.thickness = _0x5155x5e;
  var _0x5155x5f = Math.atan2(_0x5155x1e - _0x5155x1c, _0x5155x1d - _0x5155x1b);
  this.lAngle = _0x5155x5f - HALF_PI;
  var _0x5155x60 = Math.cos(this.lAngle) * _0x5155x5e;
  var _0x5155x61 = Math.sin(this.lAngle) * _0x5155x5e;
  this.leftX1 = _0x5155x1b + _0x5155x60;
  this.leftY1 = _0x5155x1c + _0x5155x61;
  this.leftX2 = _0x5155x1d + _0x5155x60;
  this.leftY2 = _0x5155x1e + _0x5155x61;
  this.rAngle = _0x5155x5f + HALF_PI;
  var _0x5155x62 = Math.cos(this.rAngle) * _0x5155x5e;
  var _0x5155x63 = Math.sin(this.rAngle) * _0x5155x5e;
  this.rightX1 = _0x5155x1b + _0x5155x62;
  this.rightY1 = _0x5155x1c + _0x5155x63;
  this.rightX2 = _0x5155x1d + _0x5155x62;
  this.rightY2 = _0x5155x1e + _0x5155x63;
  this.smoothAgainst = function (_0x5155x64) {
    this.leftX1 = _0x5155x64.leftX2 = (_0x5155x64.leftX2 + this.leftX1) * 0.5;
    this.leftY1 = _0x5155x64.leftY2 = (_0x5155x64.leftY2 + this.leftY1) * 0.5;
    this.rightX1 = _0x5155x64.rightX2 = (_0x5155x64.rightX2 + this.rightX1) * 0.5;
    this.rightY1 = _0x5155x64.rightY2 = (_0x5155x64.rightY2 + this.rightY1) * 0.5;
  };
  this.ooo = function () {
    if (this.x1 < 0 || this.y1 < 0 || this.x1 > width || this.y1 > height || this.x2 < 0 || this.y2 < 0 || this.x2 > width || this.y2 > height) {
      return true;
    } else {
      return false;
    }
    ;
  };
}
;
var worms;
var colors = [];
colors[0] = "#2cd9fe";
colors[1] = "#2cfecf";
colors[2] = "#373fdf";
colors[3] = "#88fe1f";
colors[4] = "#48d6ff";
colors[5] = "#b3fcff";
colors[6] = "#f76cad";
colors[7] = "#505083";
colors[8] = "#113a7e";
colors[9] = "#014050";
colors[10] = "#ccf3ef";
colors[11] = "#009437";
colors[12] = "#8fb300";
function setup() {
  worms = new Array;
}
;
function draw() {
  clear();
  for (var _0x5155x30 = 0; _0x5155x30 < worms.length; _0x5155x30++) {
    var _0x5155x69 = worms[_0x5155x30];
    _0x5155x69.update();
    g.fillStyle = _0x5155x69.c;
    g.lineWidth = 2;
    g.strokeStyle = "#ffffff";
    if (_0x5155x69.segments.length > 1) {
      g.beginPath();
      g.moveTo(_0x5155x69.segments[0].leftX1, _0x5155x69.segments[0].leftY1);
      for (var _0x5155x32 = 0; _0x5155x32 < _0x5155x69.segments.length; _0x5155x32++) {
        var _0x5155x5b = _0x5155x69.segments[_0x5155x32];
        g.lineTo(_0x5155x5b.leftX1, _0x5155x5b.leftY1);
      }
      ;
      g.lineTo(_0x5155x69.segments[_0x5155x69.segments.length - 1].rightX1, _0x5155x69.segments[_0x5155x69.segments.length - 1].rightY1);
      for (var _0x5155x32 = _0x5155x69.segments.length - 1; _0x5155x32 >= 0; _0x5155x32--) {
        var _0x5155x5b = _0x5155x69.segments[_0x5155x32];
        g.lineTo(_0x5155x5b.rightX1, _0x5155x5b.rightY1);
      }
      ;
      g.closePath();
      g.fill();
      g.stroke();
    }
    ;
    g.strokeStyle = "#ffffff";
    if (_0x5155x69.segments.length >= 1) {
      var _0x5155x20 = _0x5155x69.segments[0].x1;
      var _0x5155x21 = _0x5155x69.segments[0].y1;
      var _0x5155x5e = _0x5155x69.segments[0].thickness;
      if (_0x5155x69.thickness < _0x5155x5e) {
        _0x5155x5e = _0x5155x69.thickness;
      }
      ;
      if (_0x5155x5e <= 0) {
        _0x5155x5e = 0.000001;
      }
      ;
      g.beginPath();
      g.arc(_0x5155x20, _0x5155x21, _0x5155x5e, _0x5155x69.segments[0].lAngle, _0x5155x69.segments[0].rAngle, false);
      g.closePath();
      g.stroke();
      var _0x5155x6a = _0x5155x69.segments[_0x5155x69.segments.length - 1].x1;
      var _0x5155x6b = _0x5155x69.segments[_0x5155x69.segments.length - 1].y1;
      _0x5155x5e = _0x5155x69.segments[_0x5155x69.segments.length - 1].thickness;
      if (_0x5155x69.thickness < _0x5155x5e) {
        _0x5155x5e = _0x5155x69.thickness;
      }
      ;
      if (_0x5155x5e <= 0) {
        _0x5155x5e = 0.000001;
      }
      ;
      g.beginPath();
      g.arc(_0x5155x6a, _0x5155x6b, _0x5155x5e, _0x5155x69.segments[_0x5155x69.segments.length - 1].lAngle, _0x5155x69.segments[_0x5155x69.segments.length - 1].rAngle, true);
      g.closePath();
      g.stroke();
      _0x5155x5e = _0x5155x69.thickness - 0.6;
      if (_0x5155x69.thickness < _0x5155x5e) {
        _0x5155x5e = _0x5155x69.thickness;
      }
      ;
      fillCircle(_0x5155x69.segments[0].x1, _0x5155x69.segments[0].y1, _0x5155x5e);
      _0x5155x5e = _0x5155x69.segments[_0x5155x69.segments.length - 1].thickness - 0.6;
      if (_0x5155x69.thickness < _0x5155x5e) {
        _0x5155x5e = _0x5155x69.thickness;
      }
      ;
      fillCircle(_0x5155x69.segments[_0x5155x69.segments.length - 1].x1, _0x5155x69.segments[_0x5155x69.segments.length - 1].y1, _0x5155x5e);
      if (_0x5155x69.life > 0) {
        g.fillStyle = "#FFFFFF";
        fillCircle(_0x5155x69.segments[0].x1, _0x5155x69.segments[0].y1, _0x5155x5e * 0.72);
      }
      ;
    }
    ;
  }
  ;
  for (var _0x5155x30 = 0; _0x5155x30 < worms.length; _0x5155x30++) {
    var _0x5155x69 = worms[_0x5155x30];
    if (_0x5155x69.ooo) {
      worms.splice(_0x5155x30, 1);
      _0x5155x30--;
    }
    ;
  }
  ;
  if (frameCount % 2 == 0 && mousePressed && worms.length < 50) {
    var _0x5155x6c = Math.atan2(pmouseY - mouseY, pmouseX - mouseX) + PI;
    var _0x5155x6d = new Worm(mouseX, mouseY);
    worms.push(_0x5155x6d);
    if (mouseX != pmouseX && mouseY != pmouseY) {
      _0x5155x6d.heading = _0x5155x6c;
    }
    ;
  }
  ;
}
;
function mousePressedEvent() {}
;
