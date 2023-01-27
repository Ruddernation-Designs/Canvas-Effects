// URL: www.ruddernation.com
// Version: 1.6
// Copyright (c) 2011 Ruddernation <contact@ruddernation.com>


(function(){
	
	function j(b){document.removeEventListener("mousemove",j,!1);document.removeEventListener("touchstart",j,!1);y(b);var g=l-p*0.5,f=m-q*0.5,a=Math.sqrt(g*g+f*f),b=l+g/a*150,a=m+f/a*150,g=Math.atan2(f,g);g+=Math.PI*(0.5+Math.random()*0.5)*(Math.random()>0.5?1:-1);for(f=0;f<z;f++){for(var e=A[f].f,c=0;c<r;c++){var d=e[c],h=Math.PI*0.15/r*c+g,k=Math.cos(h)*(r-c)*2,h=Math.sin(h)*(r-c)*2;d.x=b;d.y=a;d.d=k;d.e=h}j=!1}document.addEventListener("mousemove",y,!1);document.addEventListener("touchmove",y,!1);
document.addEventListener("touchstart",K,!1);setInterval(L,1E3/26)}

function L(){n.globalCompositeOperation="source-over";n.fillStyle="rgba(8,8,12,0.9)";n.fillRect(0,0,p,q);n.globalCompositeOperation="lighter";B.autoplay?(C++%10==0&&(D=G+Math.sin(C*0.03)*G*0.6,E=C*0.7+(M++%2==0?Math.PI:0)+Math.random(),H=p*0.5+Math.cos(E)*D*1.25,I=q*0.5+Math.sin(E)*D),s+=(H-s)*0.2,t+=(I-t)*0.2):(s=l,t=m);for(var b=[],g=z,f=g;f--;){var a=A[f],e=a.i,c=a.f[0];c.d+=(s-c.x)*e;c.e+=(t-c.y)*e;for(c=-1;++c<r;){
	var d=a.f[c];
	if(c>0){var h=a.f[c-1];d.d+=(h.x-d.x)*e;d.e+=(h.y-d.y)*e;d.d+=h.d*0.35;d.e+=h.e*0.35}e*=0.97;d.d*=a.h;d.e*=a.h;d.x+=d.d;d.y+=d.e;b[c]={x:d.x,y:d.y}}u<F&&(u+=0.25,u>=F&&(u=F));n.strokeStyle=a.m();
for(var a=n,e=b,c=f/g*u+1,k=void 0,i=void 0,h=d=void 0,k=e[0].x,i=e[0].y,o=0,j=e.length;++o<j;)a.lineCap=o<2?"round":"butt",a.lineWidth=c-o/j*c+0.1,a.beginPath(),a.moveTo(k,i),d=e[o-1].x,h=e[o-1].y,k=e[o].x,i=e[o].y,k=(d+k)*0.5,i=(h+i)*0.5,a.quadraticCurveTo(d,h,k,i),a.stroke()}}
function J(){this.i=0.01;this.h=0.55;this.o=0;this.f=[2];
this.q=this.p=this.n=0;this.path=[];
this.c=Math.round(Math.random()*600)+55;
this.b=Math.round(Math.random()*600)+55;
this.a=Math.round(Math.random()*200)+55;
this.l=0.002;
this.k=0.0015;
this.j=0.001;
this.g=2}
function N(){this.e=this.d=this.y=this.x=0}
function v(){window.scrollTo(0,1);p=window.innerWidth;q=window.innerHeight;w.width=p;w.height=q}
function y(b){if(b.touches){if(event.touches.length==1)event.preventDefault(),l=event.touches[0].pageX,m=event.touches[0].pageY}else l=b.clientX,m=b.clientY}
function O(){return!1}
function P(){return!1}
function K(b){if(b.touches.length==3)l=b.touches[0].pageX,m=b.touches[0].pageY}
var x=[[{c:68,b:95,a:82},{c:28,b:44,a:80},{c:43,b:19,a:102},{c:97,b:52,a:210},{c:142,b:52,a:144},{c:14,b:203,a:192},{c:21,b:24,a:233}],[{c:198,b:192,a:231},{c:200,b:243,a:165},{c:224,b:78,a:46},{c:190,b:204,a:56},{c:52,b:166,a:57},{c:209,b:26,a:78},{c:130,b:232,a:21}],[{c:147,b:39,a:43},{c:120,b:228,a:29},{c:204,b:211,a:201},{c:83,b:169,a:94},{c:117,b:42,
a:235},{c:24,b:225,a:138},{c:183,b:124,a:250}],[{c:72,b:254,a:240},{c:72,b:254,a:240},{c:72,b:254,a:240},{c:72,b:254,a:240},{c:72,b:254,a:240},{c:72,b:254,a:240},{c:72,b:254,a:240}],[{c:255,b:0,a:0},{c:255,b:0,a:0},{c:255,b:0,a:0},{c:255,b:0,a:0},{c:255,b:0,a:0},{c:255,b:0,a:0},{c:255,b:0,a:0}]],B={},p=1E3,q=560,l=0,m=0,s=0,t=0,C=0,A=[],w,n,u=20,F=28,z=5,r=18,i,H,I,E,D,M=50,G=60;
window.onload=function(){
	for(var b={},g=window.location.search.substring(1).split("&"),f=0;f<g.length;f++){var a=g[f].split("=");
b[a[0]]=a[1]}B=b;b=B.colours;b!="random"&&(i=b=="mono"?x[3]:isNaN(parseInt(b))?x[0]:x[parseInt(b)%x.length]);w=document.getElementById("mainCanvas");n=w.getContext("2d");
document.onmousedown=O;document.onmouseup=P;window.onresize=v;v();b=p*0.5;g=q*0.5;
for(f=30;f--;){a=new J;a.i=0.4+f/z*0.02;A[f]=a;if(i){var e=f%i.length;a.c=i[e].c;a.b=i[e].b;a.a=i[e].a}for(e=70;e--;){
	var c=new N;c.x=b;c.y=g;a.f[e]=c}}s=l=b;t=m=g;document.addEventListener("mousemove",j,!1);document.addEventListener("touchstart",j,
!1);
document.body.addEventListener("orientationchange",v,!1);setTimeout(v,1,null)};
J.prototype.m=function(){this.c+=this.l*this.g;
this.b+=this.k*this.g;
this.a+=this.j*this.g;
return"rgba("+(Math.sin(this.c)*808+112>>0)+","+(Math.sin(this.b)*808+112>>0)+","+(Math.sin(this.a)*808+112>>0)+",1)"}})();