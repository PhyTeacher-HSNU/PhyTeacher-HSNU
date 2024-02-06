'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log


//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//

/*任務：
1. 圓周運動：
	(1) 用 center, bar, ball 做出圓周運動
	(2) 加入速度箭頭
	(2) 角位置theta, 角速度omega, 速率 vv=rr*omega

2. 互動：
	(1) 利用 slider，讓 角速度omega 可調整，可以正轉反轉。
	(2) 利用 slider，讓 半徑rr 可調整。
	(3) 利用 checkBox，讓 速度箭頭 可顯示或消失。

最下方有變化任務，歡迎挑戰。
*/

//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var num=0;
var sun;
var earth;
var venus;
var dist=180;
var mars;
var moon;
var mercury;
var jupiter;
var io;
var omega=0.0365;
var theta=0;
var dt=0.1;
var baground;
var lin1;
var lin2;
var lin3;
var lin4;
var lin5;
var lin6;
var lin7;
var lin8;
var lin9;
var lin10;
var lin11;
var lin12;
var lin13;
var lin14;
var lin15;
var cha=0;
var theta0=0;
var Class;
var ff=0;
var non;
var a=0;
var tt;
var isplay=true;
var ran=0;
var europa;
var int=0;
var int0=0;
var saturn;
var uranus;
var neptune;

//B.定義init
function init(){

	Class = new TEACHER.ObjTextPlane(600,90,"1552 07 周大禾","z",0xffffff,0x0000f0);
	scene.add(Class);
	Class.position.z=-750;
	Class.position.y=60;
	
	skyBox.visible=false;
	ground.visible=false;
	logo.visible=false;

	lin1=new TEACHER.Line(0xffffff);
	scene.add(lin1);
	lin2=new TEACHER.Line(0xffffff);
	scene.add(lin2);
	lin3=new TEACHER.Line(0xffffff);
	scene.add(lin3);
	lin4=new TEACHER.Line(0xffffff);
	scene.add(lin4);
	lin5=new TEACHER.Line(0xffffff);
	scene.add(lin5);
	lin6=new TEACHER.Line(0xffffff);
	scene.add(lin6);
	lin7=new TEACHER.Line(0xffff00);
	scene.add(lin7);
	lin8=new TEACHER.Line(0x00ffff);
	scene.add(lin8);
	lin9=new TEACHER.Line(0xffffff);
	scene.add(lin9);
	lin10=new TEACHER.Line(0xffffff);
	scene.add(lin10);
	lin11=new TEACHER.Line(0xffffff);
	scene.add(lin11);

	baground=new TEACHER.ObjPicSphere(100000,pics.baground,1);
	scene.add(baground);
	io=new TEACHER.ObjPicSphere(1,pics.io,0);
	jupiter=new TEACHER.ObjPicSphere(12,pics.jupiter,0);
	mercury=new TEACHER.ObjPicSphere(4,pics.mercury,0);
	moon=new TEACHER.ObjPicSphere(0.8,pics.moon,0);
	mars=new TEACHER.ObjPicSphere(4,pics.mars,0);
	venus=new TEACHER.ObjPicSphere(3,pics.venus,0);
	sun=new TEACHER.ObjPicSphere(50,pics.sun,0);
	earth=new TEACHER.ObjPicSphere(4,pics.earth,0);
	europa=new TEACHER.ObjPicSphere(1.5,pics.europa,0);
	saturn=new TEACHER.ObjPicSphere(10,pics.saturn,0);
	uranus=new TEACHER.ObjPicSphere(8,pics.uranus,0);
	neptune=new TEACHER.ObjPicSphere(7.5,pics.neptune,0);

	scene.add(sun).add(earth).add(venus).add(mars).add(mercury).add(jupiter);
	scene.add(moon).add(io).add(europa).add(saturn).add(uranus).add(neptune);
	earth.position.x=dist;
	//earth.rotation.z=23.5/360*2*Math.PI;
	io.position.x=dist*2.5;
	jupiter.position.x=dist*2.45;
	mercury.position.x=dist*0.5;
	moon.position.x=dist*1.05;
	mars.position.x=dist*1.52;
	venus.position.x=dist*0.7;
	europa.position.x=dist*2.8;
	saturn.position.x=dist*3.7;
	uranus.position.x=dist*4.5;
	neptune.position.x=dist*5.3;

	world3D.cameraTarget.x=sun.position.x;
	world3D.cameraTarget.z=sun.position.z;
	//world3D.cameraTarget.x=moon.position.x;
	//world3D.cameraTarget.z=moon.position.z;

	world3D.cameraTheta=0;
	world2D.slCameraRR.maximum=1000;
	world2D.slCameraRR.value=650;

	world2D.sl01.setLabel("運行速度(天/地球)")
	world2D.sl01.minimum=365;
	world2D.sl01.maximum=3650;
	world2D.sl01.value=1000;
	world2D.sl01.digitN=2;

	world2D.sl02.setLabel("星球距離")
	world2D.sl02.minimum=140;
	world2D.sl02.maximum=400;
	world2D.sl02.value=180;

	world2D.ch01.setLabel("逆行");
	world2D.ch02.setLabel("視角回太陽")

	world2D.btn01.setLabel("地球放大");
	world2D.btn02.setLabel("木星放大");
	world2D.btn03.setLabel("stop/play");
	world2D.btn04.setLabel("step");

	world2D.btn01.on("click",clickBtn);
	world2D.btn02.on("click",clickBtn);
	world2D.btn03.on("click",clickBtn);
	world2D.btn04.on("click",clickBtn);
	world2D.btnUp.on("click",clickBtn);
	world2D.btnDown.on("click",clickBtn);
	world2D.btnRight.on("click",clickBtn);
	world2D.btnLeft.on("click",clickBtn);

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
	
	omega=73/world2D.sl01.value;
	
	if(dist!=world2D.sl02.value){
		dist=world2D.sl02.value;
		lin1.clear();
		lin2.clear();
		lin3.clear();
		lin4.clear();
		lin5.clear();
		lin6.clear();
		lin7.clear();
		lin8.clear();
		lin9.clear();
		lin10.clear();
		lin11.clear();
	}

	if(world2D.ch01.checked){
		theta-=omega*dt;
	}else{
		theta+=omega*dt;
	}

	if(world2D.ch02.checked){
		if(ff==50){
			world2D.ch02.checked=false;
			ff=0;
		}
		ff++;
		world3D.cameraTarget.x=sun.position.x*0.1+world3D.cameraTarget.x*0.9;
		world3D.cameraTarget.z=sun.position.z*0.1+world3D.cameraTarget.z*0.9;
		world3D.cameraTheta=0;
		lin7.clear();
		lin8.clear();
		theta0=0;
		cha=0;
		world2D.slCameraRR.value=650;
	}
	
	if(cha==1 && int==1){
		theta0+=omega*dt;
		if(Math.abs(world3D.cameraTarget.x-earth.position.x)>=30 && Math.abs(world3D.cameraTarget.z-earth.position.z)>=30){
			world3D.cameraTarget.x=earth.position.x*0.05+world3D.cameraTarget.x*0.95;
			world3D.cameraTarget.z=earth.position.z*0.05+world3D.cameraTarget.z*0.95;
		}else{
			world3D.cameraTarget.x=earth.position.x;
			world3D.cameraTarget.z=earth.position.z;
		}
		//lin7.addPoint(earth.position.x+9*Math.cos(theta*12),0,9*Math.sin(theta*12)+earth.position.z);
		//lin7.addPoint(moon.position.x+earth.position.x,0,moon.position.z+earth.position.z);
		lin7.addPoint(moon.position.x,0,moon.position.z);
		if(theta0>=2*Math.PI){
			lin7.clear();
			theta0=0;
		}
	}else if(cha==1 && int==2){
		if(Math.abs(world3D.cameraTarget.x-mercury.position.x)>=15 && Math.abs(world3D.cameraTarget.z-mercury.position.z)>=15){
			world3D.cameraTarget.x=mercury.position.x*0.05+world3D.cameraTarget.x*0.95;
			world3D.cameraTarget.z=mercury.position.z*0.05+world3D.cameraTarget.z*0.95;
		}else{
			world3D.cameraTarget.x=mercury.position.x;
			world3D.cameraTarget.z=mercury.position.z;
		}	
	}else if(cha==1 && int==3){
			if(Math.abs(world3D.cameraTarget.x-venus.position.x)>=15 && Math.abs(world3D.cameraTarget.z-venus.position.z)>=15){
				world3D.cameraTarget.x=venus.position.x*0.05+world3D.cameraTarget.x*0.95;
				world3D.cameraTarget.z=venus.position.z*0.05+world3D.cameraTarget.z*0.95;
			}else{
				world3D.cameraTarget.x=venus.position.x;
				world3D.cameraTarget.z=venus.position.z;
			}
	}else if(cha==1 && int==0){
			if(Math.abs(world3D.cameraTarget.x-mars.position.x)>=35 && Math.abs(world3D.cameraTarget.z-mars.position.z)>=35){
				world3D.cameraTarget.x=mars.position.x*0.05+world3D.cameraTarget.x*0.95;
				world3D.cameraTarget.z=mars.position.z*0.05+world3D.cameraTarget.z*0.95;
			}else{
				world3D.cameraTarget.x=mars.position.x;
				world3D.cameraTarget.z=mars.position.z;
			}
	}else if(cha==2 && int0==1){
		theta0+=omega*dt;
		if(Math.abs(world3D.cameraTarget.x-jupiter.position.x)>=10 && Math.abs(world3D.cameraTarget.z-jupiter.position.z)>=10){
			world3D.cameraTarget.x=jupiter.position.x*0.05+world3D.cameraTarget.x*0.95;
			world3D.cameraTarget.z=jupiter.position.z*0.05+world3D.cameraTarget.z*0.95;
		}else{
			world3D.cameraTarget.x=jupiter.position.x;
			world3D.cameraTarget.z=jupiter.position.z;
		}
		lin7.addPoint(io.position.x,io.position.y,io.position.z);
		lin8.addPoint(europa.position.x,europa.position.y,europa.position.z);
		if(theta0>=24*Math.PI){
			lin7.clear();
			lin8.clear();
			theta0=0;
		}
	}else if(cha==2 && int0==2){
		if(Math.abs(world3D.cameraTarget.x-saturn.position.x)>=10 && Math.abs(world3D.cameraTarget.z-saturn.position.z)>=10){
			world3D.cameraTarget.x=saturn.position.x*0.05+world3D.cameraTarget.x*0.95;
			world3D.cameraTarget.z=saturn.position.z*0.05+world3D.cameraTarget.z*0.95;
		}else{
			world3D.cameraTarget.x=saturn.position.x;
			world3D.cameraTarget.z=saturn.position.z;
		}
	}else if(cha==2 && int0==3){
		if(Math.abs(world3D.cameraTarget.x-uranus.position.x)>=10 && Math.abs(world3D.cameraTarget.z-uranus.position.z)>=10){
			world3D.cameraTarget.x=uranus.position.x*0.05+world3D.cameraTarget.x*0.95;
			world3D.cameraTarget.z=uranus.position.z*0.05+world3D.cameraTarget.z*0.95;
		}else{
			world3D.cameraTarget.x=uranus.position.x;
			world3D.cameraTarget.z=uranus.position.z;
		}
	}else if(cha==2 && int0==0){
		if(Math.abs(world3D.cameraTarget.x-neptune.position.x)>=10 && Math.abs(world3D.cameraTarget.z-neptune.position.z)>=10){
			world3D.cameraTarget.x=neptune.position.x*0.05+world3D.cameraTarget.x*0.95;
			world3D.cameraTarget.z=neptune.position.z*0.05+world3D.cameraTarget.z*0.95;
		}else{
			world3D.cameraTarget.x=neptune.position.x;
			world3D.cameraTarget.z=neptune.position.z;
		}
	}
	
	if(theta>=2*Math.PI*72){
		num=theta
		//omega=0.0365;
		theta=0;
		//log(num);
	}

	earth.position.z=dist*Math.cos(theta);
	earth.position.x=dist*Math.sin(theta);
	earth.rotation.y=theta*32*(isplay?1:0);
	
	mercury.position.x=dist*0.5*Math.sin(theta*4);
	mercury.position.z=dist*0.5*Math.cos(theta*4);
	mercury.rotation.y=theta*40*(isplay?1:0);

	venus.position.x=dist*0.7*Math.sin(theta*1.5);
	venus.position.z=dist*0.7*Math.cos(theta*1.5);
	venus.rotation.y=theta*50*(isplay?1:0);

	mars.position.x=dist*1.52*Math.sin(theta*0.5);
	mars.position.z=dist*1.52*Math.cos(theta*0.5);
	mars.rotation.y=theta*16*(isplay?1:0);

	jupiter.position.x=dist*2.45*Math.sin(theta/12);
	jupiter.position.z=dist*2.45*Math.cos(theta/12);
	jupiter.rotation.y=theta*10*(isplay?1:0);

	moon.position.x=earth.position.x+9*Math.cos(theta*12);
	moon.position.z=earth.position.z+9*Math.sin(theta*12);
	moon.rotation.y=theta*32*(isplay?1:0);

	io.position.x=jupiter.position.x+20*Math.cos(theta*24);
	io.position.z=jupiter.position.z+20*Math.sin(theta*24);
	io.position.y=jupiter.position.y+3*Math.cos(theta*24);
	io.rotation.y=theta*40*(isplay?1:0);

	europa.position.x=jupiter.position.x+30*Math.cos(theta*12);
	europa.position.z=jupiter.position.z+30*Math.sin(theta*12);
	//europa.position.y=jupiter.position.y+Math.cos(theta*24);
	europa.rotation.y=theta*40*(isplay?1:0);
	
	saturn.position.x=dist*3.2*Math.sin(theta/18);
	saturn.position.z=dist*3.2*Math.cos(theta/18);
	saturn.rotation.y=theta*8*(isplay?1:0);
	
	uranus.position.x=dist*3.9*Math.sin(theta/24);
	uranus.position.z=dist*3.9*Math.cos(theta/24);
	uranus.rotation.y=theta*15*(isplay?1:0);

	neptune.position.x=dist*4.6*Math.sin(theta/18);
	neptune.position.z=dist*4.6*Math.cos(theta/18);
	neptune.rotation.y=theta*14*(isplay?1:0);

	if(num<=2*Math.PI){
		if(ran>=4 && isplay==true){
			draw_orbit();
			ran=0;
		}
		ran++;
	}
	
	//world3D.cameraTarget.x=earth.position.x;
	//world3D.cameraTarget.z=earth.position.z;

	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function draw_orbit(e){

	lin1.addPoint(earth.position.x,0,earth.position.z);
	lin1.update;

	lin2.addPoint(mars.position.x,0,mars.position.z);
	lin2.update;

	lin3.addPoint(venus.position.x,0,venus.position.z);
	lin3.update;

	lin4.addPoint(mercury.position.x,0,mercury.position.z);
	lin4.update;

	lin5.addPoint(jupiter.position.x,0,jupiter.position.z);
	lin5.update;
	
	lin9.addPoint(saturn.position.x,0,saturn.position.z);
	lin9.update;

	lin10.addPoint(uranus.position.x,0,uranus.position.z);
	lin10.update;

	lin11.addPoint(neptune.position.x,0,neptune.position.z);
	lin11.update;
}

function clickBtn(t){
	var str = t.target.parent.name;
	if(str=="btn01"){
		if(int==0){
			world2D.slCameraRR.value=40;
			world2D.btn01.setLabel("水星放大");
			int++;
		}else if(int==1){
			world2D.btn01.setLabel("金星放大");
			world2D.slCameraRR.value=80;
			int++;
		}else if(int==2){
			world2D.btn01.setLabel("火星放大");
			world2D.slCameraRR.value=70;
			int++;
		}else{
			world2D.btn01.setLabel("地球放大");
			world2D.slCameraRR.value=60;
			int=0;
		}
		lin7.clear();
		lin8.clear();
		theta0=0;
		//world2D.slCameraRR.value=40;
		cha=1;
		//world3D.cameraTarget.x=earth.position.x;
		//world3D.cameraTarget.z=earth.position.z;
	}else if(str=="btn02"){
		if(int0==0){
			world2D.slCameraRR.value=80;
			world2D.btn02.setLabel("土星放大");
			int0++;
		}else if(int0==1){
			world2D.btn02.setLabel("天王星放大");
			world2D.slCameraRR.value=80;
			int0++;
		}else if(int0==2){
			world2D.btn02.setLabel("海王星放大");
			world2D.slCameraRR.value=70;
			int0++;
		}else{
			world2D.btn02.setLabel("木星放大");
			world2D.slCameraRR.value=70;
			int0=0;
		}
		cha=2;
		lin7.clear();
		lin8.clear();
		theta0=0;
		world2D.slCameraRR.value=70;
	}else if(str=="btnUp"){
		/*if(world3D.cameraPhi>=0 && world3D.cameraPhi<=Math.PI/2){
			world3D.cameraTarget.z-=10-10*(world3D.cameraPhi)/(Math.PI/2);
			//world3D.cameraTarget.x-=10*(world3D.cameraPhi)/Math.PI;
		}else{
			world3D.cameraTarget.z+=10-10*(world3D.cameraPhi)/Math.PI;
		}
		//world3D.cameraTarget.x-=10*(world3D.cameraPhi)/Math.PI;*/
		world3D.cameraTarget.z-=10;
	}else if(str=="btnDown"){
		world3D.cameraTarget.z+=10;
	}else if(str=="btnRight"){
		world3D.cameraTarget.x+=10;
	}else if(str=="btnLeft"){
		world3D.cameraTarget.x-=10;
	}else if(str=="btn03"){
		if(a==0){
			dt=0;
			a=1;
			isplay=false;
		}else{
			dt=0.1
			isplay=true;
			a=0;
		}
	}else if(str=="btn04"){
		isplay=true;
		if(world2D.ch01.checked){
			theta-=0.004;
		}else{
			theta+=0.004;
		}
		dt=0;
		a=1;
	}

}

//resize
MyJS.myResize();

/*
變化任務A：太陽系
1. 從新開始做。
2. 只用 ball 分別是：恆星x1，行星x5，其中兩個行星伴有衛星
3. 用 new TEACHER.Line 畫出衛星的軌跡


變化任務B：盪鞦韆
1. 從新開始做。
2. 只用 bar, ball 做出盪鞦韆
	提示： 位置x -> 角位置 theta
		  速度v  -> 角速度 omega
		  加速度a -> 角加速度 alpha
		  alpha = -k* theta

3. 用按鈕做出盪鞦韆上面，蹲下站起的效果。


變化任務C：砲管追蹤
1. 從新開始做。
2. 用 4個bar, 在四角做出4跟砲管
3. 新增 ball, 讓 ball 可以點拖放。
4. 讓四周砲管指向ball
	提示： theta = Math.atan2(dy , dx);
		   可以得到 (x,y) 對 (x0,y0)的方位角，單位是弧度。
		   dx = x-x0, dy = y-y0;
(進階)
5. 利用 陣列Array, 迴圈for, 讓砲管不停發射砲彈ball。
6. 利用計時器與碰撞, 紀錄 user 在 60 秒內被擊中幾次。
	提示： tt = new Data();
		   tt.getTime();會傳回由1970-01-01 00:00:00 UTC 開始，到new的時候經過的毫秒數。

*/





























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































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
