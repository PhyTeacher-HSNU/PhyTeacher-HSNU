'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 九宮格地板：
	製作九宮格(27)星空，提示：new TEACHER.Points(0xffffff , 2);
	用 var stars 去裝。

2. 小球運動：
	(1) 仿造密室小球，讓箭頭按鈕控制 ball 受力。
	(2) 但是動的不是 ball 而是 stars
	(3) 加入空氣阻力 f = -bv，以限制小球的速度。

3. 自由落體的終端速度
	(1) 承接上述有空氣阻力的 運動小球，做出初速為零的自由落體運動。
	(2) 觀察終端速度的現象。
*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var ball;
var dt=0.1;
var boxarray1=[];
var boxarray2=[];
var boxarray3=[];
var boxarray4=[];
var boxarray5=[];
var boxarray6=[];
var boxarray7=[];
var boxarray8=[];
var boxarray9=[];
var bomb;
var n1;
var n2;
var n3;
var n4;
var n5;
var n6;
var n7;
var n8;
var n9;
var rr;
var r=2;
var b=0.1;
var gg=3;
var ggy=5;
var fx=0;
var fy=0;
var fz=0;
var fdx=0;
var fdy=0;
var fdz=0;
var vx=0;
var vy=0;
var vz=0;
var a=-1;
var bb=0;
var lose;
var win;
var blood;
var bloodr=1;
var time;
var timer=1;
var bloodword;
var timeword;
var ballx;
var ballz;
var winx;
var winz;
var winning;
var edge1;
var edge2;
var edge3;
var edge4;
var red=0;
var green=0;
var blue=0;
var ttt=0;
var bombt=0;
var ballshadow;
var bloodarray=[];
var timearray=[];
var bombtime=0;
var bombred=1;
var bombblue=0;
var bombgreen=0;
var e=0;
var soundbomb;
var soundhit;
var soundjump;
var soundtimee;
var soundbloodd;
var soundbackground;
var rule;
var soundwin;
var soundlose;
var zzzz=0;
//B.定義init
function init(){
	soundwin=new Audio('allData/mp3/win.mp3');
	soundlose=new Audio('allData/mp3/lose.mp3');
	soundbackground=new Audio('allData/mp3/background.mp3');
	soundbloodd=new Audio('allData/mp3/bloodd.mp3');
	soundtimee=new Audio('allData/mp3/timee.mp3');
	soundbomb=new Audio('allData/mp3/bombhit.mp3');
	soundhit=new Audio('allData/mp3/boxhit.mp3');
	soundjump=new Audio('allData/mp3/jump.mp3');
rule=new TEACHER.ObjPicPlane(60,30,pics.rule);
scene.add(rule);
rule.position.y=16;
rule.position.z=65;
	for(var i=0;i<10;i++){
		var bloodd=new TEACHER.ObjPicSphere(5,pics.bloodd);
       scene.add(bloodd);
	   bloodd.position.x=3000*(Math.random()-0.5);
	   bloodd.position.y=20*(Math.random()+0.1);
	   bloodd.position.z=-4200*Math.random();
       bloodarray.push(bloodd);
	}
	for(var i=0;i<10;i++){
		var timee=new TEACHER.ObjPicSphere(5,pics.timee);
		scene.add(timee);
		timee.position.x=3000*(Math.random()-0.5);
		timee.position.y=20*(Math.random()+0.1);
		timee.position.z=-4200*Math.random();
		timearray.push(timee);
	}
	bomb=new TEACHER.ObjSphere(9.5,0x888111);
	scene.add(bomb);
	bomb.position.y=1000;
	bomb.position.x=0;
	bomb.position.z=0;
	ballshadow=new TEACHER.ObjCylinder(r,0.1,0x666666);
	scene.add(ballshadow);
	ballshadow.position.y=0.1;
	timeword=new TEACHER.ObjTextPlane(14,3.5,"time",'z',0x0f0000);
	bloodword=new TEACHER.ObjTextPlane(15.5,3.5,"blood",'z',0x0f0000);
	scene.add(timeword);
	scene.add(bloodword);
	bloodword.position.y=38;
	timeword.position.y=41;
	bloodword.position.x=-79;
	timeword.position.x=-78;
	n1=15*(Math.random()+0.1);
	n2=15*(Math.random()+0.1);
	n3=15*(Math.random()+0.1);
	n4=15*(Math.random()+0.1);
	n5=15*(Math.random()+0.1);
	n6=15*(Math.random()+0.1);
	n7=15*(Math.random()+0.1);
	n8=15*(Math.random()+0.1);
	n9=15*(Math.random()+0.1);
	edge1=new TEACHER.ObjPicPlane(10000,40,pics.edge,"x",2);
	edge2=new TEACHER.ObjPicPlane(10000,40,pics.edge,"x",2);
	edge3=new TEACHER.ObjPicPlane(6000,40,pics.edge,"z",2);
	edge4=new TEACHER.ObjPicPlane(6000,40,pics.edge,"z",2);
	scene.add(edge1);
	scene.add(edge2);
	scene.add(edge3);
	scene.add(edge4);
	edge1.position.x=-1500;
	edge2.position.x=1500;
	edge1.position.z=-3000;
	edge2.position.z=-3000;
	edge3.position.z=130;
	edge4.position.z=-3000;
	lose=new TEACHER.ObjPicPlane(50,30,pics.lose,"z",2);
	winning=new TEACHER.ObjPicPlane(50,30,pics.winning,"z",2);
	win=new TEACHER.ObjPicPlane(200,20,pics.win,"z",2);
	scene.add(win);
	scene.add(lose);
	scene.add(winning);
	win.position.y=10;
	lose.visible=false;
	winning.visible=false;
	lose.position.z=65;
	lose.position.y=20;
	winning.position.z=65;
	winning.position.y=20;
    blood=new TEACHER.ObjBox(150,2,0.1,0xFF0000);
	time=new TEACHER.ObjBox(150,2,0.1,0xFFFFFF);
	scene.add(blood);
	blood.position.y=38;
	scene.add(time);
	time.position.y=41;
	world2D.sl01.minimum=1;
	world2D.sl01.maximum=8;
	world2D.sl03.visible=false;
	world2D.ch01.setLabel("變色");
	world2D.ch02.setLabel("遊戲規則");
	world2D.sl02.setLabel("難度");
	world2D.sl02.minimum=1;
	world2D.sl02.value=1;
	world2D.sl01.value=4;
	world2D.sl02.maximum=15;
	world2D.sl01.setLabel("靈敏度");
ground.visible=false;
world2D.slCameraRR.value=120;
world2D.slCameraRR.visible=false;	
	world2D.on('click',mice);
	world2D.btn02.on('click',clickbtn);
	world2D.btn01.visible=false;
	world2D.btnUp.visible=false;
	world2D.btnDown.visible=false;
	world2D.btnLeft.visible=false;
	world2D.btnRight.visible=false;
	world2D.btn02.setLabel('開始/暫停');
	ball=new TEACHER.ObjSphere(r,0xff0000);
	scene.add(ball);
	ball.position.y=35;
	ball.position.x=10;
	ball.position.z=10;
	scenemoveinit();
	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
if(bb===0){
	dt=0;
}
if(world2D.ch02.checked && dt!=0.1){
	rule.visible=true;
}else{
	rule.visible=false;
}
	if(dt===0.1){
		world2D.ch02.visible=false;
		soundbackground.play();
		if(soundbackground.duration>=2999){
			soundbackground.currentTime=0;
		}
	}else{
		world2D.ch02.visible=true;
		soundbackground.pause();
	}
	for(var i=0;i<10;i++){
	var bloodd=bloodarray[i];
	bloodd.position.x+=-vx*dt;
	bloodd.position.z+=-vz*dt;
	if(Math.sqrt((bloodd.position.x-ball.position.x)*(bloodd.position.x-ball.position.x)+(bloodd.position.z-ball.position.z)*(bloodd.position.z-ball.position.z)+(bloodd.position.y-ball.position.y)*(bloodd.position.y-ball.position.y))<=6){
	bloodd.visible=false;
	bloodd.position.y=50;
	bloodr=bloodr+0.25;
	soundbloodd.currentTime=0;
	soundbloodd.play();
	}
	}
	for(var i=0;i<10;i++){
		var timee=timearray[i];
		timee.position.x+=-vx*dt;
	    timee.position.z+=-vz*dt;
		if(Math.sqrt((timee.position.x-ball.position.x)*(timee.position.x-ball.position.x)+(timee.position.z-ball.position.z)*(timee.position.z-ball.position.z)+(timee.position.y-ball.position.y)*(timee.position.y-ball.position.y))<=6){
			timee.visible=false;
			timee.position.y=50;
		timer=timer+0.05339;
		soundtimee.currentTime=0;
		soundtimee.play();
		}
		}


	ballshadow.position.x=ball.position.x;
	ballshadow.position.z=ball.position.z;
ttt=ttt+0.1;
if(ttt%6<0.4){
red=Math.random();
green=Math.random();
blue=Math.random();
}
if(bomb.vy>1){
	bomb.vy=1;
}
bomb.vy+=-0.8*dt;

if(bomb.position.y<=4.8){
	e=1;
}


if(world2D.sl02.value>10 && world2D.sl02.value<16){
	bomb.position.x-=(bomb.position.x-ball.position.x)*0.5*dt;
	bomb.position.z-=(bomb.position.z-ball.position.z)*0.5*dt;
}
if(world2D.sl02.value>5){
bomb.visible=true;
if(Math.sqrt((ball.position.x-bomb.position.x)*(ball.position.x-bomb.position.x)+(ball.position.y-bomb.position.y)*(ball.position.y-bomb.position.y)+(ball.position.z-bomb.position.z)*(ball.position.z-bomb.position.z))<11.5){
if(e===0){
bloodr=bloodr-0.133;
e=1;
soundbomb.currentTime=0;
soundbomb.play();
bomb.position.y=3;
}
}
}else{
	bomb.visible=false;
}
if(world2D.ch01.checked){
	ball.mat.color.setRGB(red,green,blue);
}
if(e===1){
	bomb.vy=0;
	bombtime+=1;
	bombred-=0.015;
	bombblue+=0.08;
	bombgreen+=0.06;
bomb.mat.color.setRGB(bombred,bombgreen,bombblue);
bomb.scale.x+=0.05;
bomb.scale.y+=0.05;
bomb.scale.z+=0.05;
	if(bombtime>=60){
	bomb.position.x=bomb.position.x-10;
	bomb.position.y=Math.random()*5000;
	e=0;
	bombtime=0;
	bomb.mat.color.setHex(0x888111);
	bomb.scale.x=1;
    bomb.scale.y=1;
    bomb.scale.z=1;
	bombred=1;
	bombblue=0;
	bombgreen=0;
	}
}
bomb.position.y+=bomb.vy*dt;
bomb.position.x+=-vx*dt;
bomb.position.z+=-vz*dt;
if(bomb.position.y<=4.5 && e===0){
	bomb.position.y=Math.random()*3000;
	bomb.position.x=ball.position.x;
	bomb.position.z=ball.position.z-Math.random()*200;
	bomb.vy=0;
}
edge1.position.x+=-vx*dt;
edge2.position.x+=-vx*dt;
edge3.position.x+=-vx*dt;
edge4.position.x+=-vx*dt;
edge1.position.z+=-vz*dt;
edge2.position.z+=-vz*dt;
edge3.position.z+=-vz*dt;
edge4.position.z+=-vz*dt;
	gg=world2D.sl01.value;
var mouse=getMouse3D("y",0);
if(mouse.x>100){
	mouse.x=100;
}
if(mouse.z>100){
	mouse.z=100;
}
if(mouse.z<-100){
	mouse.z=-100;
}
if(mouse.x<-100){
	mouse.x=-100;
}
fx=(mouse.x-ball.position.x)/170*gg;
fz=(mouse.z-ball.position.z)/170*gg;
scene.fog=new THREE.Fog(0x0fffff,3000/Math.floor(world2D.sl02.value),3600/Math.floor(world2D.sl02.value));
time.scale.x=timer;
time.position.x=timer*150/2-75;
ballx+=vx*dt;
ballz+=vz*dt;
win.position.x=ball.position.x-ballx+winx;
win.position.z=ball.position.z-ballz+winz;

if(ballx<winx+100 && ballx>winx-100  && ballz<winz){
winning.visible=true;
if(zzzz===0){
soundwin.play();
zzzz=1;
}
bb=0;
a=-1;
}

if(bb===1 && dt===0.1){
timer=timer-17.7978/100000;
}
if(timer<0){
	timer=0;
	stop();
}
if(bloodr<0){
	bloodr=0;
	stop();
}
if(bb===0){
	world2D.sl02.visible=true;
}else{
	world2D.sl02.visible=false;
}
blood.scale.x=bloodr;
blood.position.x=bloodr*150/2-75;
fdx=-b*vx;
fdy=-b*vy;
fdz=-b*vz;
vx+=(fx+fdx)*dt;
vy+=(-ggy+fdy)*dt;
vz+=(fz+fdz)*dt;
ball.position.y+=vy*dt;
if(ball.position.y<r){
	vy=-vy;
}
if(ball.position.y<0.1*r){
	vy=0;
	ball.position.y=r;
	ggy=0;
}else if(ball.position.y<r-0.0005*r  && Math.abs(vy)<6){
	vy=0;
	ball.position.y=r;
	ggy=0;
}
if(ball.position.y>r){
	ggy=5;
}
if(ball.position.y>35){
	ball.position.y=35;
}
if(ballz<winz-2){
	vz=0;
	ballz=ballz+3;
	}
	if(ballz>100){
		vz=0;
		ballz=ballz-3;
		}
if(ballx<-1500){
		vx=0;
		ballx=ballx+1;
		}
if(ballx>1500){
			vx=0;
			ballx=ballx-1;
			}
scenemove();
if(a===1){
	dt=0.1;
}
if(a===-1){
	dt=0;
}
for(var i=0;i<n1;i++){
var box=boxarray1[i];
if(ball.position.x>box.position.x-box.w/2 && ball.position.x<box.position.x+box.w/2   &&  ball.position.z>box.position.z-box.d/2 && ball.position.z<box.position.z+box.d/2 && ball.position.y>box.position.y-box.h/2 && ball.position.y<box.position.y+box.h/2){
bloodr=bloodr-0.067;
box.position.x=box.position.x*(Math.random()-0.5);
box.position.z=box.position.z*(Math.random()-0.5);
soundhit.currentTime=0;
soundhit.play();
}
}
for(var i=0;i<n2;i++){
var box=boxarray2[i];
if(ball.position.x>box.position.x-box.w/2 && ball.position.x<box.position.x+box.w/2   &&  ball.position.z>box.position.z-box.d/2 && ball.position.z<box.position.z+box.d/2  && ball.position.y>box.position.y-box.h/2 && ball.position.y<box.position.y+box.h/2){
	bloodr=bloodr-0.067;
	box.position.x=box.position.x*(Math.random()-0.5);
	box.position.z=box.position.z*(Math.random()-0.5);
	soundhit.currentTime=0;
	soundhit.play();
	}
}
for(var i=0;i<n3;i++){
var box=boxarray3[i];
if(ball.position.x>box.position.x-box.w/2 && ball.position.x<box.position.x+box.w/2   &&  ball.position.z>box.position.z-box.d/2 && ball.position.z<box.position.z+box.d/2  && ball.position.y>box.position.y-box.h/2 && ball.position.y<box.position.y+box.h/2){
	bloodr=bloodr-0.067;
	box.position.x=box.position.x*(Math.random()-0.5);
	box.position.z=box.position.z*(Math.random()-0.5);
	soundhit.currentTime=0;
	soundhit.play();
	}
}
for(var i=0;i<n4;i++){
var box=boxarray4[i];
if(ball.position.x>box.position.x-box.w/2 && ball.position.x<box.position.x+box.w/2   &&  ball.position.z>box.position.z-box.d/2 && ball.position.z<box.position.z+box.d/2  && ball.position.y>box.position.y-box.h/2 && ball.position.y<box.position.y+box.h/2){
	bloodr=bloodr-0.067;
	box.position.x=box.position.x*(Math.random()-0.5);
	box.position.z=box.position.z*(Math.random()-0.5);
	soundhit.currentTime=0;
	soundhit.play();
	}
}
for(var i=0;i<n5;i++){
var box=boxarray5[i];
if(ball.position.x>box.position.x-box.w/2 && ball.position.x<box.position.x+box.w/2   &&  ball.position.z>box.position.z-box.d/2 && ball.position.z<box.position.z+box.d/2  && ball.position.y>box.position.y-box.h/2 && ball.position.y<box.position.y+box.h/2){
	bloodr=bloodr-0.067;
	box.position.x=box.position.x*(Math.random()-0.5);
	box.position.z=box.position.z*(Math.random()-0.5);
	soundhit.currentTime=0;
	soundhit.play();
	}
}
for(var i=0;i<n6;i++){
var box=boxarray6[i];
if(ball.position.x>box.position.x-box.w/2 && ball.position.x<box.position.x+box.w/2   &&  ball.position.z>box.position.z-box.d/2 && ball.position.z<box.position.z+box.d/2  && ball.position.y>box.position.y-box.h/2 && ball.position.y<box.position.y+box.h/2){
	bloodr=bloodr-0.067;
	box.position.x=box.position.x*(Math.random()-0.5);
	box.position.z=box.position.z*(Math.random()-0.5);
	soundhit.currentTime=0;
	soundhit.play();
	}
}
for(var i=0;i<n7;i++){
var box=boxarray7[i];
if(ball.position.x>box.position.x-box.w/2 && ball.position.x<box.position.x+box.w/2   &&  ball.position.z>box.position.z-box.d/2 && ball.position.z<box.position.z+box.d/2  && ball.position.y>box.position.y-box.h/2 && ball.position.y<box.position.y+box.h/2){
	bloodr=bloodr-0.067;
	box.position.x=box.position.x*(Math.random()-0.5);
	box.position.z=box.position.z*(Math.random()-0.5);
	soundhit.currentTime=0;
	soundhit.play();
	}
}
for(var i=0;i<n8;i++){
var box=boxarray8[i];
if(ball.position.x>box.position.x-box.w/2 && ball.position.x<box.position.x+box.w/2   &&  ball.position.z>box.position.z-box.d/2 && ball.position.z<box.position.z+box.d/2  && ball.position.y>box.position.y-box.h/2 && ball.position.y<box.position.y+box.h/2){
	bloodr=bloodr-0.067;
	box.position.x=box.position.x*(Math.random()-0.5);
	box.position.z=box.position.z*(Math.random()-0.5);
	soundhit.currentTime=0;
	soundhit.play();
	}
}
for(var i=0;i<n9;i++){
var box=boxarray9[i];
if(ball.position.x>box.position.x-box.w/2 && ball.position.x<box.position.x+box.w/2   &&  ball.position.z>box.position.z-box.d/2 && ball.position.z<box.position.z+box.d/2  && ball.position.y>box.position.y-box.h/2 && ball.position.y<box.position.y+box.h/2){
	bloodr=bloodr-0.067;
	box.position.x=box.position.x*(Math.random()-0.5);
	box.position.z=box.position.z*(Math.random()-0.5);
	soundhit.currentTime=0;
	soundhit.play();
	}
}
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}
function mice(){
if(ball.position.y<25){
	vy=10;
	if(dt===0.1){
		soundjump.currentTime=0;
	soundjump.play();

	}
}
}

function clickbtn(e){
	var abc=e.target.parent.name;
	if(abc==="btn02"){
	a=a*(-1);
	if(bb===0){
	vx=0;
	vz=0;
	vy=0;
	bb=1;
	lose.visible=false;
	winning.visible=false;
	winz=-12000*Math.sqrt(world2D.sl02.value)*(Math.random()/5+0.1);
	winx=3000*(Math.random()-0.5);
	edge4.position.z=winz;
	edge1.position.x=-1500;
	edge2.position.x=1500;
	edge1.position.z=-3000;
	edge2.position.z=-3000;
	edge3.position.z=130;
	ball.position.y=35;
	ball.position.x=10;
	ball.position.z=10;
	ballx=ball.position.x;
	ballz=ball.position.z;
	bloodr=1;
	timer=1;
	bomb.position.y=Math.random()*5000;
	bomb.vy=0;
	zzzz=0;
	for(var i=0;i<10;i++){
		var bloodd=bloodarray[i];
	   bloodd.position.x=3000*(Math.random()-0.5);
	   bloodd.position.y=20*(Math.random()+0.1);
	   bloodd.position.z=-4200*Math.random();
	}
	for(var i=0;i<10;i++){
		var timee=timearray[i];
		timee.position.x=3000*(Math.random()-0.5);
		timee.position.y=20*(Math.random()+0.1);
		timee.position.z=-4200*Math.random();
	}
	}
}
}
function stop(){
	lose.visible=true;
	soundlose.play();	
	a=-1;
	bb=0;
}




















function scenemoveinit(){
	for(var i=0;i<n1;i++){
		var w=10*(Math.random()+0.1);
        var h=35*(Math.random()+0.1);
        var d=10*(Math.random()+0.1);
		var col=10*(Math.random()+0.1);
        var color;
		if(col>=1 &&col<3){
			color=0xff0000;
		}
		if(col>=3 &&col<5){
			color=0xffff00;
		}
		if(col>=5 &&col<7){
			color=0xff00ff;
		}
		if(col>=7 &&col<9){
			color=0x0f0f00;
		}
		if(col>=9 &&col<=11){
			color=0xf0f0f0;
		}
	var box=new TEACHER.ObjBox(w,h,d,color);
	    scene.add(box);
		 box.xx=100*(Math.random()-0.5)-100;
		 box.yy=h/2;
		 box.zz=100*(Math.random()-0.5)-100;
		 if(i===0){
			 box.xx=-100;
			 box.zz=-100;
		 }
		 box.w=w;
		 box.h=h;
		 box.d=d;
		box.position.y=box.yy;
		box.position.x=box.xx;
		box.position.z=box.zz;
	boxarray1.push(box);
}
for(var i=0;i<n2;i++){
	var w=10*(Math.random()+0.1);
	var h=35*(Math.random()+0.1);
	var d=10*(Math.random()+0.1);
	var col=10*(Math.random()+0.1);
	var color;
	if(col>=1 &&col<3){
		color=0xff0000;
	}
	if(col>=3 &&col<5){
		color=0xffff00;
	}
	if(col>=5 &&col<7){
		color=0xff00ff;
	}
	if(col>=7 &&col<9){
		color=0x0f0f00;
	}
	if(col>=9 &&col<=11){
		color=0xf0f0f0;
	}
var box=new TEACHER.ObjBox(w,h,d,color);
	scene.add(box);
	 box.xx=100*(Math.random()-0.5);
	 box.yy=h/2;
	 box.zz=100*(Math.random()-0.5)-100;
	 box.w=w;
	 box.h=h;
	 box.d=d;
	 if(i===0){
		box.xx=0;
		box.zz=-100;
	}
	box.position.y=box.yy;
	box.position.x=box.xx;
	box.position.z=box.zz;
boxarray2.push(box);
}
for(var i=0;i<n3;i++){
	var w=10*(Math.random()+0.1);
	var h=35*(Math.random()+0.1);
	var d=10*(Math.random()+0.1);
	var col=10*(Math.random()+0.1);
	var color;
	if(col>=1 &&col<3){
		color=0xff0000;
	}
	if(col>=3 &&col<5){
		color=0xffff00;
	}
	if(col>=5 &&col<7){
		color=0xff00ff;
	}
	if(col>=7 &&col<9){
		color=0x0f0f00;
	}
	if(col>=9 &&col<=11){
		color=0xf0f0f0;
	}
var box=new TEACHER.ObjBox(w,h,d,color);
	scene.add(box);
	 box.xx=100*(Math.random()-0.5)+100;
	 box.yy=h/2;
	 box.zz=100*(Math.random()-0.5)-100;
	 box.w=w;
	 box.h=h;
	 box.d=d;
	 if(i===0){
		box.xx=100;
		box.zz=-100;
	}
	box.position.y=box.yy;
	box.position.x=box.xx;
	box.position.z=box.zz;
boxarray3.push(box);
}
for(var i=0;i<n4;i++){
	var w=10*(Math.random()+0.1);
	var h=35*(Math.random()+0.1);
	var d=10*(Math.random()+0.1);
	var col=10*(Math.random()+0.1);
	var color;
	if(col>=1 &&col<3){
		color=0xff0000;
	}
	if(col>=3 &&col<5){
		color=0xffff00;
	}
	if(col>=5 &&col<7){
		color=0xff00ff;
	}
	if(col>=7 &&col<9){
		color=0x0f0f00;
	}
	if(col>=9 &&col<=11){
		color=0xf0f0f0;
	}
var box=new TEACHER.ObjBox(w,h,d,color);
	scene.add(box);
	 box.xx=100*(Math.random()-0.5)-100;
	 box.yy=h/2;
	 box.zz=100*(Math.random()-0.5);
	 box.w=w;
	 box.h=h;
	 box.d=d;
	 if(i===0){
		box.xx=-100;
		box.zz=0;
	}
	box.position.y=box.yy;
	box.position.x=box.xx;
	box.position.z=box.zz;
boxarray4.push(box);
}
for(var i=0;i<n5;i++){
	var w=10*(Math.random()+0.1);
	var h=35*(Math.random()+0.1);
	var d=10*(Math.random()+0.1);
	var col=10*(Math.random()+0.1);
	var color;
	if(col>=1 &&col<3){
		color=0xff0000;
	}
	if(col>=3 &&col<5){
		color=0xffff00;
	}
	if(col>=5 &&col<7){
		color=0xff00ff;
	}
	if(col>=7 &&col<9){
		color=0x0f0f00;
	}
	if(col>=9 &&col<=11){
		color=0xf0f0f0;
	}
var box=new TEACHER.ObjBox(w,h,d,color);
	scene.add(box);
	 box.xx=100*(Math.random()-0.5);
	 box.yy=h/2;
	 box.zz=100*(Math.random()-0.5);
	 box.w=w;
	 box.h=h;
	 box.d=d;
	 if(i===0){
		box.xx=0;
		box.zz=0;
	}
	box.position.y=box.yy;
	box.position.x=box.xx;
	box.position.z=box.zz;
boxarray5.push(box);
}
for(var i=0;i<n6;i++){
	var w=10*(Math.random()+0.1);
	var h=35*(Math.random()+0.1);
	var d=10*(Math.random()+0.1);
	var col=10*(Math.random()+0.1);
	var color;
	if(col>=1 &&col<3){
		color=0xff0000;
	}
	if(col>=3 &&col<5){
		color=0xffff00;
	}
	if(col>=5 &&col<7){
		color=0xff00ff;
	}
	if(col>=7 &&col<9){
		color=0x0f0f00;
	}
	if(col>=9 &&col<=11){
		color=0xf0f0f0;
	}
var box=new TEACHER.ObjBox(w,h,d,color);
	scene.add(box);
	 box.xx=100*(Math.random()-0.5)+100;
	 box.yy=h/2;
	 box.zz=100*(Math.random()-0.5);
	 box.w=w;
	 box.h=h;
	 box.d=d;
	 if(i===0){
		box.xx=100;
		box.zz=0;
	}
	box.position.y=box.yy;
	box.position.x=box.xx;
	box.position.z=box.zz;
boxarray6.push(box);
}
for(var i=0;i<n7;i++){
	var w=10*(Math.random()+0.1);
	var h=35*(Math.random()+0.1);
	var d=10*(Math.random()+0.1);
	var col=10*(Math.random()+0.1);
	var color;
	if(col>=1 &&col<3){
		color=0xff0000;
	}
	if(col>=3 &&col<5){
		color=0xffff00;
	}
	if(col>=5 &&col<7){
		color=0xff00ff;
	}
	if(col>=7 &&col<9){
		color=0x0f0f00;
	}
	if(col>=9 &&col<=11){
		color=0xf0f0f0;
	}
var box=new TEACHER.ObjBox(w,h,d,color);
	scene.add(box);
	 box.xx=100*(Math.random()-0.5)-100;
	 box.yy=h/2;
	 box.zz=100*(Math.random()-0.5)+100;
	 box.w=w;
	 box.h=h;
	 box.d=d;
	 if(i===0){
		box.xx=-100;
		box.zz=100;
	}
	box.position.y=box.yy;
	box.position.x=box.xx;
	box.position.z=box.zz;
boxarray7.push(box);
}
for(var i=0;i<n8;i++){
	var w=10*(Math.random()+0.1);
	var h=35*(Math.random()+0.1);
	var d=10*(Math.random()+0.1);
	var col=10*(Math.random()+0.1);
	var color;
	if(col>=1 &&col<3){
		color=0xff0000;
	}
	if(col>=3 &&col<5){
		color=0xffff00;
	}
	if(col>=5 &&col<7){
		color=0xff00ff;
	}
	if(col>=7 &&col<9){
		color=0x0f0f00;
	}
	if(col>=9 &&col<=11){
		color=0xf0f0f0;
	}
var box=new TEACHER.ObjBox(w,h,d,color);
	scene.add(box);
	 box.xx=100*(Math.random()-0.5);
	 box.yy=h/2;
	 box.zz=100*(Math.random()-0.5)+100;
	 box.w=w;
	 box.h=h;
	 box.d=d;
	 if(i===0){
		box.xx=0;
		box.zz=100;
	}
	box.position.y=box.yy;
	box.position.x=box.xx;
	box.position.z=box.zz;
boxarray8.push(box);
}
for(var i=0;i<n9;i++){
	var w=10*(Math.random()+0.1);
	var h=35*(Math.random()+0.1);
	var d=10*(Math.random()+0.1);
	var col=10*(Math.random()+0.1);
	var color;
	if(col>=1 &&col<3){
		color=0xff0000;
	}
	if(col>=3 &&col<5){
		color=0xffff00;
	}
	if(col>=5 &&col<7){
		color=0xff00ff;
	}
	if(col>=7 &&col<9){
		color=0x0f0f00;
	}
	if(col>=9 &&col<=11){
		color=0xf0f0f0;
	}
var box=new TEACHER.ObjBox(w,h,d,color);
	scene.add(box);
	 box.xx=100*(Math.random()-0.5)+100;
	 box.yy=h/2;
	 box.zz=100*(Math.random()-0.5)+100;
	 box.w=w;
	 box.h=h;
	 box.d=d;
	 if(i===0){
		box.xx=100;
		box.zz=100;
	}
	box.position.y=box.yy;
	box.position.x=box.xx;
	box.position.z=box.zz;
boxarray9.push(box);
}
}












function scenemove(){
	for(var y=0;y<9;y++){
		if(y===0){
			for(var i=0;i<n1 ;i++){
			var box=boxarray1[i];
			box.position.x+=-vx*dt;
			box.position.z+=-vz*dt;
			if(i===0){
				if(box.position.x>=150){
					for(var z=0;z<n1;z++){
						var boxx=boxarray1[z];
						boxx.position.x=boxx.position.x-300;
						if(z!=0){
						boxx.position.x=(boxx.position.x+100)*Math.random()-100;
						boxx.position.z=(boxx.position.z+100)*Math.random()-100;
						}
					}
				}
				if(box.position.x<=-150){
					for(var z=0;z<n1;z++){
						var boxx=boxarray1[z];
						boxx.position.x=boxx.position.x+300;
						if(z!=0){
						boxx.position.x=(boxx.position.x+100)*Math.random()-100;
						boxx.position.z=(boxx.position.z+100)*Math.random()-100;
						}
					}
				}
				if(box.position.z>=150){
					for(var z=0;z<n1;z++){
						var boxx=boxarray1[z];
						boxx.position.z=boxx.position.z-300;
						if(z!=0){
							boxx.position.x=(boxx.position.x+100)*Math.random()-100;
							boxx.position.z=(boxx.position.z+100)*Math.random()-100;
							}
					}
				}
				if(box.position.z<=-150){
					for(var z=0;z<n1;z++){
						var boxx=boxarray1[z];
						boxx.position.z=boxx.position.z+300;
						if(z!=0){
							boxx.position.x=(boxx.position.x+100)*Math.random()-100;
							boxx.position.z=(boxx.position.z+100)*Math.random()-100;
							};
					}
				}
			}
		
			}
		}
		if(y===1){
				for(var i=0;i<n2 ;i++){
					var box=boxarray2[i];
					box.position.x+=-vx*dt;
					box.position.z+=-vz*dt;
		
					if(i===0){
						if(box.position.x>=150){
							for(var z=0;z<n2;z++){
								var boxx=boxarray2[z];
								boxx.position.x=boxx.position.x-300;
								if(z!=0){
								boxx.position.x=(0-boxx.position.x)*Math.random();
						        boxx.position.z=(boxx.position.z+100)*Math.random()-100;
								}
							}
						}
						if(box.position.x<=-150){
							for(var z=0;z<n2;z++){
								var boxx=boxarray2[z];
								boxx.position.x=boxx.position.x+300;
								if(z!=0){
									boxx.position.x=(0-boxx.position.x)*Math.random();
									boxx.position.z=(boxx.position.z+100)*Math.random()-100;
									}
							}
						}
						if(box.position.z>=150){
							for(var z=0;z<n2;z++){
								var boxx=boxarray2[z];
								boxx.position.z=boxx.position.z-300;
								if(z!=0){
									boxx.position.x=(0-boxx.position.x)*Math.random();
									boxx.position.z=(boxx.position.z+100)*Math.random()-100;
									}
							}
						}
						if(box.position.z<=-150){
							for(var z=0;z<n2;z++){
								var boxx=boxarray2[z];
								boxx.position.z=boxx.position.z+300;
								if(z!=0){
									boxx.position.x=(0-boxx.position.x)*Math.random();
									boxx.position.z=(boxx.position.z+100)*Math.random()-100;
									}
							}
						}
					}
		
					}	
			
		}
		if(y===2){
				for(var i=0;i<n3 ;i++){
					var box=boxarray3[i];
					box.position.x+=-vx*dt;
					box.position.z+=-vz*dt;
					if(i===0){
						if(box.position.x>=150){
							for(var z=0;z<n3;z++){
								var boxx=boxarray3[z];
								boxx.position.x=boxx.position.x-300;
								if(z!=0){
								boxx.position.x=(boxx.position.x-100)*Math.random()+100;
								boxx.position.z=(boxx.position.z+100)*Math.random()-100;
								}
							}
						}
						if(box.position.x<=-150){
							for(var z=0;z<n3;z++){
								var boxx=boxarray3[z];
								boxx.position.x=boxx.position.x+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x-100)*Math.random()+100;
									boxx.position.z=(boxx.position.z+100)*Math.random()-100;
									}
							}
						}
						if(box.position.z>=150){
							for(var z=0;z<n3;z++){
								var boxx=boxarray3[z];
								boxx.position.z=boxx.position.z-300;
								if(z!=0){
									boxx.position.x=(boxx.position.x-100)*Math.random()+100;
									boxx.position.z=(boxx.position.z+100)*Math.random()-100;
									}
							}
						}
						if(box.position.z<=-150){
							for(var z=0;z<n3;z++){
								var boxx=boxarray3[z];
								boxx.position.z=boxx.position.z+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x-100)*Math.random()+100;
									boxx.position.z=(boxx.position.z+100)*Math.random()-100;
									}
							}
						}
					}
		
					}
			
		}
		if(y===3){
				for(var i=0;i<n4 ;i++){
					var box=boxarray4[i];
					box.position.x+=-vx*dt;
					box.position.z+=-vz*dt;
		
					if(i===0){
						if(box.position.x>=150){
							for(var z=0;z<n4;z++){
								var boxx=boxarray4[z];
								boxx.position.x=boxx.position.x-300;
								if(z!=0){
								boxx.position.x=(boxx.position.x+100)*Math.random()-100;
								boxx.position.z=(0-boxx.position.z)*Math.random();
								}
							}
						}
						if(box.position.x<=-150){
							for(var z=0;z<n4;z++){
								var boxx=boxarray4[z];
								boxx.position.x=boxx.position.x+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x+100)*Math.random()-100;
									boxx.position.z=(0-boxx.position.z)*Math.random();
									}
							}
						}
						if(box.position.z>=150){
							for(var z=0;z<n4;z++){
								var boxx=boxarray4[z];
								boxx.position.z=boxx.position.z-300;
								if(z!=0){
									boxx.position.x=(boxx.position.x+100)*Math.random()-100;
									boxx.position.z=(0-boxx.position.z)*Math.random();
									}
							}
						}
						if(box.position.z<=-150){
							for(var z=0;z<n4;z++){
								var boxx=boxarray4[z];
								boxx.position.z=boxx.position.z+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x+100)*Math.random()-100;
									boxx.position.z=(0-boxx.position.z)*Math.random();
									}
							}
						}
					}
		
					}
			
		}
		if(y===4){
				for(var i=0;i<n5 ;i++){
					var box=boxarray5[i];
					box.position.x+=-vx*dt;
					box.position.z+=-vz*dt;
		
					if(i===0){
						if(box.position.x>=150){
							for(var z=0;z<n5;z++){
								var boxx=boxarray5[z];
								boxx.position.x=boxx.position.x-300;
								if(z!=0){
								boxx.position.x=(0-boxx.position.x)*Math.random();
								boxx.position.z=(0-boxx.position.z)*Math.random();
								}
							}
						}
						if(box.position.x<=-150){
							for(var z=0;z<n5;z++){
								var boxx=boxarray5[z];
								boxx.position.x=boxx.position.x+300;
								if(z!=0){
									boxx.position.x=(0-boxx.position.x)*Math.random();
									boxx.position.z=(0-boxx.position.z)*Math.random();
									}
							}
						}
						if(box.position.z>=150){
							for(var z=0;z<n5;z++){
								var boxx=boxarray5[z];
								boxx.position.z=boxx.position.z-300;
								if(z!=0){
									boxx.position.x=(0-boxx.position.x)*Math.random();
									boxx.position.z=(0-boxx.position.z)*Math.random();
									}
							}
						}
						if(box.position.z<=-150){
							for(var z=0;z<n5;z++){
								var boxx=boxarray5[z];
								boxx.position.z=boxx.position.z+300;
								if(z!=0){
									boxx.position.x=(0-boxx.position.x)*Math.random();
									boxx.position.z=(0-boxx.position.z)*Math.random();
									}
							}
						}
					}
		
					}
		}
		if(y===5){
				for(var i=0;i<n6 ;i++){
					var box=boxarray6[i];
					box.position.x+=-vx*dt;
					box.position.z+=-vz*dt;
		
					if(i===0){
						if(box.position.x>=150){
							for(var z=0;z<n6;z++){
								var boxx=boxarray6[z];
								boxx.position.x=boxx.position.x-300;
								if(z!=0){
								boxx.position.x=(boxx.position.x-100)*Math.random()+100;
								boxx.position.z=(0-boxx.position.z)*Math.random();
								}
							}
						}
						if(box.position.x<=-150){
							for(var z=0;z<n6;z++){
								var boxx=boxarray6[z];
								boxx.position.x=boxx.position.x+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x-100)*Math.random()+100;
									boxx.position.z=(0-boxx.position.z)*Math.random();
									}
							}
						}
						if(box.position.z>=150){
							for(var z=0;z<n6;z++){
								var boxx=boxarray6[z];
								boxx.position.z=boxx.position.z-300;
								if(z!=0){
									boxx.position.x=(boxx.position.x-100)*Math.random()+100;
									boxx.position.z=(0-boxx.position.z)*Math.random();
									}
							}
						}
						if(box.position.z<=-150){
							for(var z=0;z<n6;z++){
								var boxx=boxarray6[z];
								boxx.position.z=boxx.position.z+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x-100)*Math.random()+100;
									boxx.position.z=(0-boxx.position.z)*Math.random();
									}
							}
						}
					}
		
					}
			
		}
		if(y===6){
				for(var i=0;i<n7 ;i++){
					var box=boxarray7[i];
					box.position.x+=-vx*dt;
					box.position.z+=-vz*dt;
		
					if(i===0){
						if(box.position.x>=150){
							for(var z=0;z<n7;z++){
								var boxx=boxarray7[z];
								boxx.position.x=boxx.position.x-300;
								if(z!=0){
								boxx.position.x=(boxx.position.x+100)*Math.random()-100;
								boxx.position.z=(boxx.position.z-100)*Math.random()+100;
								}
							}
						}
						if(box.position.x<=-150){
							for(var z=0;z<n7;z++){
								var boxx=boxarray7[z];
								boxx.position.x=boxx.position.x+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x+100)*Math.random()-100;
									boxx.position.z=(boxx.position.z-100)*Math.random()+100;
									}
							}
						}
						if(box.position.z>=150){
							for(var z=0;z<n7;z++){
								var boxx=boxarray7[z];
								boxx.position.z=boxx.position.z-300;
								if(z!=0){
									boxx.position.x=(boxx.position.x+100)*Math.random()-100;
									boxx.position.z=(boxx.position.z-100)*Math.random()+100;
									}
							}
						}
						if(box.position.z<=-150){
							for(var z=0;z<n7;z++){
								var boxx=boxarray7[z];
								boxx.position.z=boxx.position.z+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x+100)*Math.random()-100;
									boxx.position.z=(boxx.position.z-100)*Math.random()+100;
									}
							}
						}
					}
		
					}
			
		}
		if(y===7){
				for(var i=0;i<n8 ;i++){
					var box=boxarray8[i];
					box.position.x+=-vx*dt;
					box.position.z+=-vz*dt;
		
					if(i===0){
						if(box.position.x>=150){
							for(var z=0;z<n8;z++){
								var boxx=boxarray8[z];
								boxx.position.x=boxx.position.x-300;
                             if(z!=0){
								boxx.position.x=(0-boxx.position.x)*Math.random();
						        boxx.position.z=(boxx.position.z-100)*Math.random()+100;
							 }
							}
						}
						if(box.position.x<=-150){
							for(var z=0;z<n8;z++){
								var boxx=boxarray8[z];
								boxx.position.x=boxx.position.x+300;
								if(z!=0){
									boxx.position.x=(0-boxx.position.x)*Math.random();
									boxx.position.z=(boxx.position.z-100)*Math.random()+100;
								 }
							}
						}
						if(box.position.z>=150){
							for(var z=0;z<n8;z++){
								var boxx=boxarray8[z];
								boxx.position.z=boxx.position.z-300;
								if(z!=0){
									boxx.position.x=(0-boxx.position.x)*Math.random();
									boxx.position.z=(boxx.position.z-100)*Math.random()+100;
								 }
							}
						}
						if(box.position.z<=-150){
							for(var z=0;z<n8;z++){
								var boxx=boxarray8[z];
								boxx.position.z=boxx.position.z+300;
								if(z!=0){
									boxx.position.x=(0-boxx.position.x)*Math.random();
									boxx.position.z=(boxx.position.z-100)*Math.random()+100;
								 }
							}
						}
					}
		
					}
			
		}
		if(y===8){
				for(var i=0;i<n9 ;i++){
					var box=boxarray9[i];
					box.position.x+=-vx*dt;
					box.position.z+=-vz*dt;
		
					if(i===0){
						if(box.position.x>=150){
							for(var z=0;z<n9;z++){
								var boxx=boxarray9[z];
								boxx.position.x=boxx.position.x-300;
								if(z!=0){
								boxx.position.x=(boxx.position.x-100)*Math.random()+100;
								boxx.position.z=(boxx.position.z-100)*Math.random()+100;
								}
							}
						}
						if(box.position.x<=-150){
							for(var z=0;z<n9;z++){
								var boxx=boxarray9[z];
								boxx.position.x=boxx.position.x+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x-100)*Math.random()+100;
									boxx.position.z=(boxx.position.z-100)*Math.random()+100;
									}
							}
						}
						if(box.position.z>=150){
							for(var z=0;z<n9;z++){
								var boxx=boxarray9[z];
								boxx.position.z=boxx.position.z-300;
								if(z!=0){
									boxx.position.x=(boxx.position.x-100)*Math.random()+100;
									boxx.position.z=(boxx.position.z-100)*Math.random()+100;
									}
							}
						}
						if(box.position.z<=-150){
							for(var z=0;z<n9;z++){
								var boxx=boxarray9[z];
								boxx.position.z=boxx.position.z+300;
								if(z!=0){
									boxx.position.x=(boxx.position.x-100)*Math.random()+100;
									boxx.position.z=(boxx.position.z-100)*Math.random()+100;
									}
							}
						}
					}
		
					}
			
		}
		}
}





//resize
MyJS.myResize();














































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































//--以下都是老師幫你寫的，可以參考，不要修改--//
//--以下都是老師幫你寫的，可以參考，不要修改--//
//--以下都是老師幫你寫的，可以參考，不要修改--//
//--以下都是老師幫你寫的，可以參考，不要修改--//


//TEACHER.Obj 老師幫你產生Object3D
//TEACHER.Obj 老師幫你產生Object3D
//TEACHER.Obj 老師幫你產生Object3D
//TEACHER.Obj 老師幫你產生Object3D
var TEACHER={};
//平面
/**
 * 老師幫你寫的平面，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjPlaneX
 * @param {number} _w 寬，預設10
 * @param {number} _h 高，預設10
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {string} _dir 方向，"x","y","z", 預設"z" 
 * @param {number} _side 顯示哪一面，0正面，1背面，2雙面，預設0正面 
 */
TEACHER.ObjPlane=function(_w,_h,_color,_dir,_side){
	let t=this;
	t.mat = new TEACHER.MSMat(_color , _side);
	t.geo = new THREE.PlaneGeometry(_w||10,_h||10,1,1);
	t.mesh=new THREE.Mesh(t.geo , t.mat);
	if(_dir==="x"){
		t.mesh.rotation.y=0.5*Math.PI;
	}else if(_dir==="y"){
		t.mesh.rotation.x=-0.5*Math.PI;
	}
	THREE.Object3D.call(this, t.geo, t.mat );
	t.add(t.mesh);
}
TEACHER.ObjPlane.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjPlane.prototype.constructor = TEACHER.ObjPlane;
//圓柱
/**
 * 老師幫你寫的圓柱，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjCylinder
 * @param {number} _r 半徑，預設10
 * @param {number} _h 柱高，預設10
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {boolean} _openEnd 是否兩端開，預設false
 * @param {string} _dir 方向，"x","y","z", 預設"y" 
 * @param {number} _side 顯示哪一面，0正面，1背面，2雙面，預設0正面 
 */
TEACHER.ObjCylinder=function(_r,_h,_color,_openEnd,_dir,_side){
	let t=this;
	t.mat = new TEACHER.MSMat(_color , _side);
	t.geo = new THREE.CylinderGeometry(_r||10, _r||10, _h||10, 32, 2, _openEnd);
	t.mesh=new THREE.Mesh(t.geo , t.mat);
	if(_dir==="x"){
		t.mesh.rotation.z=-0.5*Math.PI;
	}else if(_dir==="z"){
		t.mesh.rotation.x=0.5*Math.PI;
	}
	THREE.Object3D.call(this,t.geo,t.mat);
	t.add(t.mesh);
}
TEACHER.ObjCylinder.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjCylinder.prototype.constructor = TEACHER.ObjCylinder;
//圓球
/**
 * 老師幫你寫的圓球，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjSphere
 * @param {number} _r 半徑，預設10
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {number} _side 顯示哪一面，0正面，1背面，2雙面，預設0正面 
 */
TEACHER.ObjSphere=function(_r,_color,_side){
	let t=this;
	t.mat = new TEACHER.MSMat(_color , _side);
	t.geo = new THREE.SphereGeometry(_r||10, 32, 16);
	t.mesh=new THREE.Mesh(t.geo , t.mat);
	THREE.Object3D.call(this,t.geo,t.mat);
	t.add(t.mesh);
}
TEACHER.ObjSphere.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjSphere.prototype.constructor = TEACHER.ObjSphere;
//長方體
/**
 * 老師幫你寫的長方體，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjBox
 * @param {number} _w 寬，預設10
 * @param {number} _h 高，預設10
 * @param {number} _d 深，預設10
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {number} _side 顯示哪一面，0正面，1背面，2雙面，預設0正面 
 */
TEACHER.ObjBox=function(_w,_h,_d,_color,_side){
	let t=this;
	t.mat = new TEACHER.MSMat(_color , _side);
	t.geo = new THREE.BoxGeometry(_w||10,_h||10,_d||10);
	t.mesh=new THREE.Mesh(t.geo , t.mat);
	THREE.Object3D.call(this,t.geo,t.mat);
	t.add(t.mesh);
}
TEACHER.ObjBox.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjBox.prototype.constructor = TEACHER.ObjBox;
//---------------------------------------------
//老師的MSMat，繼承自 THREE.MeshStandardMaterial
TEACHER.MSMat=function(_color,_side){
	THREE.MeshStandardMaterial.call(this,{ color: _color||0xFF00FF , roughness: 0.4 , side:_side||0});
}
TEACHER.MSMat.prototype = Object.create(THREE.MeshStandardMaterial.prototype);
TEACHER.MSMat.prototype.constructor = TEACHER.MSMat;







//圖片平面
/**
 * 老師幫你寫的圖片平面，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjPicPlane
 * @param {number} _w 寬，預設10
 * @param {number} _h 高，預設10
 * @param {string} _pic base64 image string，讀取自pics.js，轉檔自https://www.base64-image.de/
 * @param {string} _dir 方向，"x","y","z", 預設"z" 
 * @param {number} _side 顯示哪一面，0正面，1背面，2雙面，預設0正面 
 */
TEACHER.ObjPicPlane=function(_w,_h,_pic,_dir,_side){
	let t=this;
	let texture = new THREE.TextureLoader().load( _pic );
	t.mat = new THREE.MeshBasicMaterial({ map: texture ,transparent:true, side:_side||0 });
	t.geo = new THREE.PlaneGeometry(_w,_h,1,1);	
	t.mesh=new THREE.Mesh(t.geo , t.mat);
	if(_dir==="x"){
		t.mesh.rotation.y=0.5*Math.PI;
	}else if(_dir==="y"){
		t.mesh.rotation.x=-0.5*Math.PI;
	}
	THREE.Object3D.call(this);
	t.add(t.mesh);
}
TEACHER.ObjPicPlane.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjPicPlane.prototype.constructor = TEACHER.ObjPicPlane;
//圖片圓柱
/**
 * 老師幫你寫的圖片圓柱，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjPicCylinder
 * @param {number} _r 半徑，預設10
 * @param {number} _h 柱高，預設10
 * @param {string} _pic base64 image string，讀取自pics.js，轉檔自https://www.base64-image.de/
 * @param {boolean} _openEnd 是否兩端開，預設false
 * @param {string} _dir 方向，"x","y","z", 預設"y" 
 * @param {number} _side 顯示哪一面，0正面，1背面，2雙面，預設0正面 
 */
TEACHER.ObjPicCylinder=function(_r,_h,_pic,_openEnd,_dir,_side){
	let t=this;
	let texture = new THREE.TextureLoader().load( _pic );
	t.mat = new THREE.MeshBasicMaterial({ map: texture , side:_side||0 });
	t.geo = new THREE.CylinderGeometry(_r||10, _r||10, _h||10, 32, 4, _openEnd);
	t.mesh=new THREE.Mesh(t.geo , t.mat);
	if(_dir==="x"){
		t.mesh.rotation.y=0.5*Math.PI;
		t.mesh.rotation.z=-0.5*Math.PI;
	}else if(_dir==="z"){
		t.mesh.rotation.y=0.5*Math.PI;
		t.mesh.rotation.x=0.5*Math.PI;
	}else if(_dir==="y"){
		t.mesh.rotation.y=0.5*Math.PI;
	}
	THREE.Object3D.call(this,t.geo,t.mat);
	t.add(t.mesh);
}
TEACHER.ObjPicCylinder.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjPicCylinder.prototype.constructor = TEACHER.ObjPicCylinder;
//圖片圓球
/**
 * 老師幫你寫的圖片圓球，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjPicSphere
 * @param {number} _r 半徑，預設10
 * @param {string} _pic base64 image string，讀取自pics.js，轉檔自https://www.base64-image.de/
 * @param {number} _side 顯示哪一面，0正面，1背面，2雙面，預設0正面 
 */
TEACHER.ObjPicSphere=function(_r,_pic,_side){
	let t=this;
	let texture = new THREE.TextureLoader().load( _pic );
	t.mat = new THREE.MeshBasicMaterial({ map: texture , side:_side||0 });
	t.geo = new THREE.SphereGeometry(_r||10, 32, 16);
	t.mesh=new THREE.Mesh(t.geo , t.mat);
	THREE.Object3D.call(this,t.geo,t.mat);
	t.add(t.mesh);
}
TEACHER.ObjPicSphere.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjPicSphere.prototype.constructor = TEACHER.ObjPicSphere;




//箭頭
/**
 * 老師幫你寫的箭頭，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjArrow
 * @param {number} _r 半徑，預設10
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 */
TEACHER.ObjArrow=function(_r,_color){
	let ratioHead=0.4;//頭佔全長
	let ratioBody=0.5;//身寬佔全長
	let material = new THREE.MeshStandardMaterial({ color: _color||0xFF00FF , roughness: 0.4 });
	let geometry = new THREE.ConeGeometry( _r||10, 100*ratioHead, 32 );
	this.ArrowHead=new THREE.Mesh(geometry,material);
	this.ArrowHead.position.y=100*(1-0.5*ratioHead);
	geometry = new THREE.CylinderGeometry( (_r||10)*ratioBody,(_r||10)*ratioBody, 100*(1-ratioHead), 32,2 );
	this.ArrowBody=new THREE.Mesh(geometry,material);
	this.ArrowBody.position.y=100*0.5*(1-ratioHead);
	THREE.Object3D.call(this);
	this.rotX=new THREE.Object3D();//in rotation.x for theta
	this.rotY=new THREE.Object3D();//out rotation.y for phi
	this.add(this.rotY);
	this.rotY.add(this.rotX);
	this.rotX.add(this.ArrowBody);
	this.rotX.add(this.ArrowHead);
}
TEACHER.ObjArrow.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjArrow.prototype.constructor = TEACHER.ObjArrow;
TEACHER.ObjArrow.prototype.setArrow = function(_x,_y,_z){
	let len2=_x*_x+_y*_y+_z*_z;
	let len=Math.sqrt(len2);
	if(len2>0){
		this.rotX.visible=true;
		this.rotX.scale.y=len/100;
	}else{
		this.rotX.visible=false;
	}
	this.rotX.rotation.x=Math.acos(_y/len);
	this.rotY.rotation.y=Math.atan2(_x,_z);
}
//彈簧
/**
 * 老師幫你寫的彈簧，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjSpring
 * @param {number} _len 長度，預設20
 * @param {number} _rB 大半徑，預設5
 * @param {number} _rS 小半徑，預設0.5
 * @param {number} _nn 圈數，預設8
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 */
TEACHER.ObjSpring=function(_len,_rB,_rS,_nn,_color){
	//curve
	let dd=_len||20;
	this.L0=dd;
	let arr=[];
	let nn=_nn||5;
	let rB=_rB||5;
	let rS=_rS||0.5;
	arr.push(new THREE.Vector3( 0, 0, 0 ));
	arr.push(new THREE.Vector3( 0, dd*0.05 ,0));
	for(var i=0;i<=nn*16;i++){
		arr.push(new THREE.Vector3( rB*Math.cos(i*2*Math.PI/16), dd*(0.05+0.9*i/nn/16) ,rB*Math.sin(i*2*Math.PI/16)));
	}
	arr.push(new THREE.Vector3( 0, dd*0.95 ,0));
	arr.push(new THREE.Vector3( 0, dd ,0));
	
	let myClosedSpline = new THREE.CatmullRomCurve3( arr );
	let material = new THREE.MeshStandardMaterial({ color: _color||0xFF00FF , roughness: 0.4 });
	let geometry=new THREE.TubeGeometry( myClosedSpline, 500, rS, 12 );
	this.mesh = new THREE.Mesh(geometry, material );
	THREE.Object3D.call(this);
	this.rotX=new THREE.Object3D();//in rotation.x for theta
	this.rotY=new THREE.Object3D();//out rotation.y for phi
	this.add(this.rotY);
	this.rotY.add(this.rotX);
	this.rotX.add(this.mesh);
}
TEACHER.ObjSpring.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjSpring.prototype.constructor = TEACHER.ObjSpring;
TEACHER.ObjSpring.prototype.setSpring = function(_x,_y,_z){
	let len2=_x*_x+_y*_y+_z*_z;
	let len=Math.sqrt(len2);
	if(len2>0){
		this.rotX.visible=true;
		this.rotX.scale.y=len/this.L0;
	}else{
		this.rotX.visible=false;
	}
	this.rotX.rotation.x=Math.acos(_y/len);
	this.rotY.rotation.y=Math.atan2(_x,_z);
}
//粒子系統
/**
 * 老師幫你寫的粒子系統，繼承自 THREE.Points
 * @constructor TEACHER.Points
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {number} _size 半徑，預設1
 * @param {number} _nnMax 最大點數，預設10000 
 */
TEACHER.Points=function(_color,_size,_nnMax){
	let tp=this;
	let ss=_size||1;
	let color=_color||0xFF00FF;
	let tColor=new THREE.Color(color);
	tp.nnMax=_nnMax||10000;
	tp.nnNow=0;
	tp.geometry = new THREE.BufferGeometry();
	tp.positions = [];
	tp.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( tp.positions, 3 ) );
	tp.geometry.computeBoundingSphere();
	let material = new THREE.PointsMaterial({
		size: ss,
    	map: tp.createCanvasMaterial('#'+tColor.getHexString(), 64),
      	transparent: true,
      	depthWrite: false
  	});
	THREE.Points.call(this, tp.geometry, material );
}
TEACHER.Points.prototype = Object.create(THREE.Points.prototype);
TEACHER.Points.prototype.constructor = TEACHER.Points;
TEACHER.Points.prototype.createCanvasMaterial = function(color , size){
	var matCanvas = document.createElement('canvas');
	matCanvas.width = matCanvas.height = size;
	var matContext = matCanvas.getContext('2d');
	matContext.imageSmoothingEnabled= false;
	// create exture object from canvas.
	var texture = new THREE.Texture(matCanvas);
	// Draw a circle
	var center = size / 2;
	matContext.beginPath();
	matContext.arc(center, center, size/2-3, 0, 2 * Math.PI, false);
	matContext.closePath();
	matContext.fillStyle = color;
	matContext.fill();
	// need to set needsUpdate
	texture.needsUpdate = true;
	// return a texture made from the canvas
	return texture;
}
TEACHER.Points.prototype.addPoint = function(_x , _y , _z){
	let tp=this;
	if(tp.nnNow<tp.nnMax){
		tp.nnNow++;
	}else{
		log('TEACHER.Points 到達最大點數');
		tp.positions.shift();
		tp.positions.shift();
		tp.positions.shift();
	}
	tp.positions.push(_x,_y,_z);
	tp.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( tp.positions, 3 ) );
	tp.geometry.computeBoundingSphere();
	tp.geometry.attributes.position.needsUpdate = true;
	
}
TEACHER.Points.prototype.clear = function(){
	let tp=this;
	tp.positions=[];
	tp.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( tp.positions, 3 ) );
	tp.geometry.computeBoundingSphere();
	tp.geometry.attributes.position.needsUpdate = true;
	tp.nnNow=0;	
}


//線條系統
/**
 * 老師幫你寫的線條系統，繼承自 THREE.Line
 * @constructor TEACHER.Line
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {number} _nnMax 最大點數，預設10000 
 */
TEACHER.Line=function(_color,_nnMax){
	let ln=this;
	ln.nnMax=_nnMax||10000;
	ln.nnNow=0;
	let material = new THREE.MeshBasicMaterial({color: _color||0xFF00FF});
	ln.geometry = new THREE.BufferGeometry();
	ln.positions = [];
	
	ln.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( ln.positions, 3 ) );
	ln.geometry.computeBoundingSphere();
	ln.geometry.dynamic = true;

	THREE.Line.call(this, ln.geometry, material );
}
TEACHER.Line.prototype = Object.create(THREE.Line.prototype);
TEACHER.Line.prototype.constructor = TEACHER.Line;
TEACHER.Line.prototype.addPoint = function(_x , _y , _z){
	let ln=this;
	if(ln.nnNow<ln.nnMax){
		ln.nnNow++;
	}else{
		log('TEACHER.Line 到達最大點數');
		ln.positions.shift();
		ln.positions.shift();
		ln.positions.shift();
	}
	ln.positions.push(_x,_y,_z);
	ln.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( ln.positions, 3 ) );
	ln.geometry.computeBoundingSphere();
	ln.geometry.attributes.position.needsUpdate = true;
	
}
TEACHER.Line.prototype.clear = function(){
	let ln=this;
	ln.positions=[];
	ln.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( ln.positions, 3 ) );
	ln.geometry.computeBoundingSphere();
	ln.geometry.attributes.position.needsUpdate = true;
	ln.nnNow=0;
	
}


//文字平面
/**
 * 老師幫你寫的文字平面，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjTextPlane
 * @param {number} _w 寬(最好設為高的1,2,4,8倍)，預設20
 * @param {number} _h 高，預設10
 * @param {string} _text 文字內容
 * @param {string} _dir 方向，"x","y","z", 預設"z" 
 * @param {number} _textColor 文字顏色，預設白色0xffffff
 * @param {number} _bgColor 背景顏色，不輸入則為透明
 */
TEACHER.ObjTextPlane=function(_w,_h,_text,_dir,_textColor,_bgColor){
	let t=this;
	//texture
	let ratio=Math.round(Math.log2(_w/_h));log(ratio)
	let canvas = $("<canvas>").attr('width',String(128*Math.pow(2,ratio))).attr('height','128');
	t.stage = new createjs.Stage(canvas[0]);
	let container = new createjs.Container();
	if(_bgColor){   
		let rectShape = new createjs.Shape();
		let bgColor=new THREE.Color( _bgColor );
		rectShape.graphics.c().f("#"+bgColor.getHexString()).dr(0, 0, 128*Math.pow(2,ratio), 128);
		container.addChild(rectShape);
	}
	t.ctext = new createjs.Text();
	let textColor=new THREE.Color(_textColor||0xffffff);
    t.ctext.color = "#"+textColor.getHexString();
	t.ctext.font = '96px Arial';
	t.ctext.text = _text||"";

	t.ctext.textAlign = 'center';
    t.ctext.textBaseline = 'middle';
    t.ctext.x = 128*Math.pow(2,ratio) / 2;
    t.ctext.y = 128 / 2;

   	container.addChild(t.ctext);
 	t.stage.addChild(container);
	t.stage.update();
	
	//plane
	t.texture = new THREE.Texture(canvas[0]);
   	var material = new THREE.MeshBasicMaterial({ map: t.texture , transparent: true });
   	var geometry = new THREE.PlaneGeometry(_w||10,_h||10,1,1);
   	t.texture.needsUpdate = true;
   	t.plane1 = new THREE.Mesh( geometry, material );
   	t.plane2 = new THREE.Mesh( geometry, material );
	t.plane2.rotation.y=Math.PI;
	let objCon=new THREE.Object3D();
	objCon.add(t.plane1).add(t.plane2);
	if(_dir==="x"){
		objCon.rotation.y=0.5*Math.PI;
	}else if(_dir==="y"){
		objCon.rotation.x=-0.5*Math.PI;
	}
	THREE.Object3D.call(this);
	t.add(objCon);
}
TEACHER.ObjTextPlane.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjTextPlane.prototype.constructor = TEACHER.ObjTextPlane;
TEACHER.ObjTextPlane.prototype.setText = function(_text){
	let t=this;
	t.ctext.text = _text;
	t.stage.update();
	t.texture.needsUpdate = true;
}
	
	

//--老師幫你產生天空盒，地板--//
//--老師幫你產生天空盒，地板--//
//--老師幫你產生天空盒，地板--//
//skyBox天空盒
var skyBox=new THREE.Object3D();
skyBox.wallU=new TEACHER.ObjPicPlane(10000,10000,pics.wallU,'y',1);
skyBox.wallD=new TEACHER.ObjPicPlane(10000,10000,pics.wallD,'y',0);
skyBox.wallS=new TEACHER.ObjPicCylinder(5000,10000,pics.wallSide,true,'y',1);
skyBox.wallU.position.y=5000;
skyBox.wallD.position.y=-5000;
skyBox.add(skyBox.wallU).add(skyBox.wallD).add(skyBox.wallS);
world3D.scene.add(skyBox);

//ground地板
var ground=new TEACHER.ObjPicPlane(100,100,pics.ground,'y');
world3D.scene.add(ground);

var logo=new TEACHER.ObjPicPlane(100,100/8,pics.logo,'z',2);
logo.position.z=-50;
logo.position.y=100/8/2;
world3D.scene.add(logo);


//取得滑鼠3D位置
/**
 * @function getMouse3D 取得滑鼠3D位置
 * @param {string} _plane 平面名稱 "x","y,'z"，預設為"y"
 * @param {number} _c 截距，預設為0 
 */
function getMouse3D(_plane , _c){

	let p=_plane||"y";
	let vecN;
	let vecM=new THREE.Vector3();//mouse3D to return
	if(p==="x"){vecN=new THREE.Vector3(1,0,0);}
	else if(p==="y"){vecN=new THREE.Vector3(0,1,0);}
	else if(p==="z"){vecN=new THREE.Vector3(0,0,1);}
	else{log('錯誤!!');}
	let mouse = new THREE.Vector2();
	mouse.x = ( world2D.stage.mouseX / 1600 ) * 2 - 1;
	mouse.y = - ( world2D.stage.mouseY / 900 ) * 2 + 1;
	world3D.raycaster.setFromCamera( mouse, world3D.camera );
	world3D.raycaster.ray.intersectPlane ( new THREE.Plane(vecN) ,vecM);

	return vecM;
}



//D.執行init，程式開始
init();
