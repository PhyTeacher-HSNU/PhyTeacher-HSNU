'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var bomb1;
var bomb2;
var bomb3;
var bomb4;
var ballA;
var groundground;
var ballArray = [];
var ballArray2 = [];
var nn = 100;
var aa;
var uwu = 100;
var rrrule;
var rrrule2;
var rrrule3;
var nice;
var NAME;
var theta;

var dt = 0.1;
var gg = 0.3;

var aaa = 60;
var bbb = 0.5;
var ooo = 0;

var gamemode;
var GO = 0;
var YES = 0;
var WHAT;
var OKAY;
var owo;
//var ouo;
//var ouob = 0;
var GG;

//框架
var a01;
var a02;
var a03;
var a04;
var a05;
var a06;
var a07;
var a08;
var a09;
var a10;
var a11;
var a12;




//B.定義init
function init(){

	a01 = new TEACHER.ObjBox(0.5,0.5,100,0xFFF00F)
	scene.add(a01);
	a01.position.x=-50;
	a01.position.y=0.5;

	a02 = new TEACHER.ObjBox(0.5,0.5,100,0xFFF00F)
	scene.add(a02);
	a02.position.x=50;
	a02.position.y=0.5;

	a03 = new TEACHER.ObjBox(100,0.5,0.5,0xFFF00F)
	scene.add(a03);
	a03.position.z=50;
	a03.position.y=0.5;

	a04 = new TEACHER.ObjBox(100,0.5,0.5,0xFFF00F)
	scene.add(a04);
	a04.position.z=-50;
	a04.position.y=0.5;

	a05 = new TEACHER.ObjBox(0.5,0.5,100,0xFFF00F)
	scene.add(a05);
	a05.position.x=-50;
	a05.position.y=100.5;

	a06 = new TEACHER.ObjBox(0.5,0.5,100,0xFFF00F)
	scene.add(a06);
	a06.position.x=50;
	a06.position.y=100.5;

	a07 = new TEACHER.ObjBox(100,0.5,0.5,0xFFF00F)
	scene.add(a07);
	a07.position.z=50;
	a07.position.y=100.5;

	a08 = new TEACHER.ObjBox(100,0.5,0.5,0xFFF00F)
	scene.add(a08);
	a08.position.z=-50;
	a08.position.y=100.5;

	a09 = new TEACHER.ObjBox(0.5,100,0.5,0xFFF00F)
	scene.add(a09);
	a09.position.x=50;
	a09.position.z=-50;
	a09.position.y=50;

	a10 = new TEACHER.ObjBox(0.5,100,0.5,0xFFF00F)
	scene.add(a10);
	a10.position.x=-50;
	a10.position.z=-50;
	a10.position.y=50;

	a11 = new TEACHER.ObjBox(0.5,100,0.5,0xFFF00F)
	scene.add(a11);
	a11.position.x=-50;
	a11.position.z=50;
	a11.position.y=50;

	a12 = new TEACHER.ObjBox(0.5,100,0.5,0xFFF00F)
	scene.add(a12);
	a12.position.x=50;
	a12.position.z=50;
	a12.position.y=50;

	groundground = new TEACHER.ObjBox(150,4,70,0xffff99)
	scene.add(groundground);
	groundground.position.z = 200;
	groundground.position.y = -2;

	rrrule = new TEACHER.ObjTextPlane(90,6,"用 ⇧ 發射砲彈嘗試打到所有藍色的球 ","z",0x00000F,)
	scene.add(rrrule);
	rrrule.position.z = 220;
	rrrule.position.y = 3;
	rrrule.rotation.x = -1;


	rrrule2 = new TEACHER.ObjTextPlane(90,6,"用 ⇦ ⇨ 移動砲台位置 ","z",0x00000F,)
	scene.add(rrrule2);
	rrrule2.position.z = 225;
	rrrule2.position.y = 3;
	rrrule2.rotation.x = -1;

	rrrule3 = new TEACHER.ObjTextPlane(90,6,"按'發射角度'調整發射角度 ","z",0x00000F,)
	scene.add(rrrule3);
	rrrule3.position.z = 230;
	rrrule3.position.y = 3;
	rrrule3.rotation.x = -1;

	nice = new TEACHER.ObjTextPlane(200,14,"NICE","z",0x00000F,)
	scene.add(nice);
	nice.position.z = 220;
	nice.position.y = 3;
	nice.rotation.x = -1;
	nice.visible = false;

	NAME = new TEACHER.ObjTextPlane(90,6,"1539 38     蘇歆媛 ","z",0x00000F,);
	scene.add(NAME);
	NAME.position.z = 236;
	NAME.position.y = -2;



	bomb1 = new TEACHER.ObjSphere(10,0x111111);
	scene.add(bomb1);
	bomb1.position.y = 10;
	bomb1.position.z = 200;

	bomb2 = new TEACHER.ObjCylinder(5,20,0x111111);
	scene.add(bomb2);
	bomb2.position.y = 20;
	bomb2.position.z = 200;

	bomb3 = new TEACHER.ObjCylinder(5,2,0x996633,false,"x");
	scene.add(bomb3);
	bomb3.position.x = -10;
	bomb3.position.y = 5;
	bomb3.position.z = 200;

	bomb4 = new TEACHER.ObjCylinder(5,2,0x996633,false,"x");
	scene.add(bomb4);
	bomb4.position.x = 10;
	bomb4.position.y = 5;
	bomb4.position.z = 200;

	ballA = new TEACHER.ObjSphere(4,0x00FFFF);
	scene.add(ballA);
	ballA.position.y = 10;
	ballA.position.z = 200;

	ballA.vx = 0;
	ballA.vy = 0;
	ballA.vz = 0;

	ballA.ax = 0;
	ballA.ay = 0;
	ballA.az = 0;

	for(var i=0 ; i<nn ; i++){
		var bb = new TEACHER.ObjSphere(1,0x0033cc);

		bb.position.y=2;
		bb.position.x=-45+(i%10)*10;
		bb.position.z=-45+Math.floor(i/10)*10;

		bb.vx = 5*(Math.random()-0.5);
		bb.vz = 5*(Math.random()-0.5);
		bb.vy = 5*Math.random();

		bb.ax = 0;
		bb.ay = 0;
		bb.az = 0;
		

		scene.add(bb);
		ballArray.push(bb);

	}

	world2D.btn01.on('mousedown',clickBtn);
	world2D.btn02.on('mousedown',clickBtn);
	world2D.btnUp.on('click',clickBtn);
	world2D.btnDown.on('click',clickBtn);
	world2D.btnLeft.on('mousedown',clickBtn);
	world2D.btnRight.on('mousedown',clickBtn);

	world2D.btn01.setLabel('發射角度');
	world2D.btn02.setLabel('規則');
	world2D.sl01.setLabel('球半徑');
	world2D.sl02.setLabel('剩餘球數');
	world2D.ch01.setLabel("紅球消失");
	world2D.ch02.setLabel("框架");

	world2D.sl01.minimum = 1;
	world2D.sl01.maximum = 6;
	world2D.sl01.value = 2;

	world2D.sl02.minimum = 0;
	world2D.sl02.maximum = 100;
	world2D.sl02.value = 100;

	world2D.on('pressup',up2D);

	world2D.slCameraRR.value = 120;
	//world3D.cameraPhi = 10;

	world2D.ch02.checked = true;

	world2D.btnDown.visible = false;
	world2D.sl03.visible = false;

	theta = world3D.cameraTheta;


	
	

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){

	GG = world2D.sl02.value;
	if(GG === 0){
		nice.visible = true;
		world3D.cameraTarget.x = 0;
		world3D.cameraTarget.y = 10;
		world3D.cameraTarget.z = 200;

		world3D.cameraTheta = (20/180)*Math.PI;
		world3D.cameraPhi = 0;
		world2D.slCameraRR.value = 120;
	}else{


	if(owo === 1){
		world3D.cameraTarget.x = 0;
		world3D.cameraTarget.y = 10;
		world3D.cameraTarget.z = 200;

		rrrule.visible = true;
		rrrule2.visible = true;
		rrrule3.visible = true;

		world3D.cameraTheta = (20/180)*Math.PI;
		world3D.cameraPhi = 0;
		world2D.slCameraRR.value = 120;
	}else{

	//if(ouo = 0){
		//world3D.cameraTheta = theta;
		//ouob++;
	//}

	rrrule.visible = false;
	rrrule2.visible = false;
	rrrule3.visible = false;

	world2D.sl02.value = uwu;

	world3D.cameraTarget.x = ballA.position.x;
	world3D.cameraTarget.y = ballA.position.y;
	world3D.cameraTarget.z = ballA.position.z;

	ballA.vx += ballA.ax*dt;
	ballA.vy += ballA.ay*dt;
	ballA.vz += ballA.az*dt;

	ballA.position.x += ballA.vx*dt;
	ballA.position.y += ballA.vy*dt;
	ballA.position.z += ballA.vz*dt;

	bomb2.rotation.x = -(aaa/180)*Math.PI;



	bomb2.position.z = 200-aaa*0.1;	
	bomb2.position.y = 20-aaa*0.1;

	

	if(gamemode === 1){
		aaa += bbb;

		if(aaa<=0){
			bbb = bbb*-1;
		}else if(aaa>=90){
			bbb = bbb*-1;
		}

	}else if(gamemode === 2){
		if(GO === 0){
			if(bomb1.position.x>=-45){
				bomb1.position.x -= 0.5;
				bomb2.position.x -= 0.5;
				bomb3.position.x -= 0.5;
				bomb4.position.x -= 0.5;
				ballA.position.x -= 0.5;
			}
		}

	}else if(gamemode === 3){
		if(GO ===0){
			if(bomb1.position.x<=45){
				bomb1.position.x += 0.5;
				bomb2.position.x += 0.5;
				bomb3.position.x += 0.5;
				bomb4.position.x += 0.5;
				ballA.position.x += 0.5;}
		}
	}

	if(GO === 1){
		ballA.vy = 12*Math.sin(((90-aaa)/180)*Math.PI);
		ballA.vz = -12*Math.cos(((90-aaa)/180)*Math.PI);
		ballA.ay = -gg;

		GO = 2;
	}else if(GO ===2){
		//console.log(ballA.vy,ballA.vz,90-aa);

		if(ballA.position.z<=-70){
			GO = 0;
		}else if(ballA.position.x>=70){
			GO = 0;
		}else if(ballA.position.x<=-70){
			GO = 0;
		}else if(ballA.position.y>120){
			GO = 0;
		}else if(ballA.position.y<-20){
			GO = 0;
		}



	}else if(GO === 0){
		ballA.vx = 0;
		ballA.vy = 0;
		ballA.vz = 0;
		ballA.ax = 0;
		ballA.ay = 0;	
		
		ballA.position.x = bomb1.position.x;
		ballA.position.z = 200;
		ballA.position.y = 10;
	}

	aa = world2D.sl01.value;

	for(var i=0 ; i<nn ; i++){
		var bb=ballArray[i];

		bb.position.x+=bb.vx*dt;
		bb.position.y+=bb.vy*dt;
		bb.position.z+=bb.vz*dt;

		if(bb.position.x > 50-aa && bb.vx>0){
			bb.vx*=-1;
		}else if(bb.position.x < -50+aa && bb.vx<0){
			bb.vx*=-1;
		}
		if(bb.position.y > 100-aa && bb.vy>0){
			bb.vy*=-1;
		}else if(bb.position.y < 0+aa && bb.vy<0){
			bb.vy*=-1;
		}
		if(bb.position.z > 50-aa && bb.vz>0){
			bb.vz*=-1;
		}else if(bb.position.z < -50+aa && bb.vz<0){
			bb.vz*=-1;
		}

		bb.scale.x = world2D.sl01.value;
		bb.scale.y = world2D.sl01.value;
		bb.scale.z = world2D.sl01.value;
	
	}

	for(var i=0 ; i<nn-1 ; i++){
		for(var j=i+1 ; j<nn ; j++){

			var ball1=ballArray[i];
			var ball2=ballArray[j];

			collision(ball1 , ball2 , aa*2);

		}
	}

	for(var i2=0 ; i2<nn ; i2++){
		var b01=ballArray[i2];

		collision2(ballA , b01 , aa+4);

		if(YES === 1){
			//b01.visible = world2D.ch01.checked;
			var oo = i2;
			ballArray2.push(oo);
			ooo++;
			uwu--;
			YES = 0;
		}
	}

	WHAT = world2D.ch01.checked;
	OKAY = world2D.ch02.checked;

	if(WHAT){
		for(var i=0 ; i<ooo ; i++){
			var b02=ballArray2[i];
			ballArray[b02].visible = false;
	
		}
	}else{
		for(var i=0 ; i<ooo ; i++){
			var b02=ballArray2[i];
			ballArray[b02].visible = true;
	
		}
	}

	if(OKAY){
		a01.visible = true;
		a02.visible = true;
		a03.visible = true;
		a04.visible = true;
		a05.visible = true;
		a06.visible = true;
		a07.visible = true;
		a08.visible = true;
		a09.visible = true;
		a10.visible = true;
		a11.visible = true;
		a12.visible = true;
		ground.visible = true;
	}else{
		a01.visible = false;
		a02.visible = false;
		a03.visible = false;
		a04.visible = false;
		a05.visible = false;
		a06.visible = false;
		a07.visible = false;
		a08.visible = false;
		a09.visible = false;
		a10.visible = false;
		a11.visible = false;
		a12.visible = false;
		ground.visible = false;
	}

	
	}
    }
	

	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}




function clickBtn(e){
	var str=e.target.parent.name;

	if(str==='btn01'){
		gamemode = 1;
		
	}else if(str==='btn02'){
		owo = 1;
		
	}else if(str==='btnUp'){
		GO = 1;
		ballA.position.x = bomb1.position.x;
		ballA.position.y = 10;
		ballA.position.z = 200;
		ballA.vx = 0;
		ballA.ax = 0;
		
	}else if(str==='btnLeft'){
		gamemode = 2;	

	}else if(str==='btnRight'){
		gamemode = 3;
		
	}

}

function up2D(e){
	gamemode = 0;
	owo = 0;
	//ouo = ouob;
}


function collision(ballA,ballB,dis){
	if(ballB.visible){
	if(ballA.visible){
	let isCollision=false;
	let mA=ballA.mass||1;
	let mB=ballB.mass||1;
	var r12x=ballA.position.x-ballB.position.x;
	var r12y=ballA.position.y-ballB.position.y;
	var r12z=ballA.position.z-ballB.position.z;
	var rr=Math.sqrt(r12x*r12x+r12y*r12y+r12z*r12z);
	var vcx=(mA*ballA.vx+mB*ballB.vx)/(mA+mB);
	var vcy=(mA*ballA.vy+mB*ballB.vy)/(mA+mB);
	var vcz=(mA*ballA.vz+mB*ballB.vz)/(mA+mB);
	var v1cx=ballA.vx-vcx;
	var v1cy=ballA.vy-vcy;
	var v1cz=ballA.vz-vcz;
	var v2cx=ballB.vx-vcx;
	var v2cy=ballB.vy-vcy;
	var v2cz=ballB.vz-vcz;
	
	if(rr<dis && (v1cx*r12x+v1cy*r12y+v1cz*r12z)<0){
		let isCollision=true;
		var n12x=r12x/rr;
		var n12y=r12y/rr;
		var n12z=r12z/rr;
		var v1c_n12=Math.abs(v1cx*n12x+v1cy*n12y+v1cz*n12z);
		var v2c_n12=Math.abs(v2cx*n12x+v2cy*n12y+v2cz*n12z);
		ballA.vx=vcx+v1cx+2*(v1c_n12*n12x);
		ballA.vy=vcy+v1cy+2*(v1c_n12*n12y);
		ballA.vz=vcz+v1cz+2*(v1c_n12*n12z);
		ballB.vx=vcx+v2cx-2*(v2c_n12*n12x);
		ballB.vy=vcy+v2cy-2*(v2c_n12*n12y);
		ballB.vz=vcz+v2cz-2*(v2c_n12*n12z);
		
	}

	return isCollision;
}}}

function collision2(ballA,ballB,dis){
	if(ballB.visible){
	let isCollision=false;
	let mA=ballA.mass||1;
	let mB=ballB.mass||1;
	var r12x=ballA.position.x-ballB.position.x;
	var r12y=ballA.position.y-ballB.position.y;
	var r12z=ballA.position.z-ballB.position.z;
	var rr=Math.sqrt(r12x*r12x+r12y*r12y+r12z*r12z);
	var vcx=(mA*ballA.vx+mB*ballB.vx)/(mA+mB);
	var vcy=(mA*ballA.vy+mB*ballB.vy)/(mA+mB);
	var vcz=(mA*ballA.vz+mB*ballB.vz)/(mA+mB);
	var v1cx=ballA.vx-vcx;
	var v1cy=ballA.vy-vcy;
	var v1cz=ballA.vz-vcz;
	var v2cx=ballB.vx-vcx;
	var v2cy=ballB.vy-vcy;
	var v2cz=ballB.vz-vcz;
	
	if(rr<dis && (v1cx*r12x+v1cy*r12y+v1cz*r12z)<0){
		let isCollision=true;
		var n12x=r12x/rr;
		var n12y=r12y/rr;
		var n12z=r12z/rr;
		var v1c_n12=Math.abs(v1cx*n12x+v1cy*n12y+v1cz*n12z);
		var v2c_n12=Math.abs(v2cx*n12x+v2cy*n12y+v2cz*n12z);
		ballA.vx=vcx+v1cx+2*(v1c_n12*n12x);
		ballA.vy=vcy+v1cy+2*(v1c_n12*n12y);
		ballA.vz=vcz+v1cz+2*(v1c_n12*n12z);
		ballB.vx=vcx+v2cx-2*(v2c_n12*n12x);
		ballB.vy=vcy+v2cy-2*(v2c_n12*n12y);
		ballB.vz=vcz+v2cz-2*(v2c_n12*n12z);
		
		ballB.mat.color.setHSL(60,1,0.5);
		YES = 1;
	}

	return isCollision;
}}





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
