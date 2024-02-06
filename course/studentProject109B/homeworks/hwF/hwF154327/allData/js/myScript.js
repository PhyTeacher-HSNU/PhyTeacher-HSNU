'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 用 8個 new TEACHER.ObjCylinder(), 在四角做出4跟砲管
2. 新增 ball, 讓 ball 可以點拖放。
3. 讓四周砲管指向ball
	提示： theta = Math.atan2(dy , dx);
		   可以得到 (x,y) 對 (x0,y0)的方位角，單位是弧度。
		   dx = x-x0, dy = y-y0;
(進階)
4. 利用 陣列Array, 迴圈for, 讓砲管不停發射砲彈ball。
5. 利用計時器與碰撞, 紀錄 user 在 60 秒內被擊中幾次。
	提示： tt = new Data();
		   tt.getTime();會傳回由1970-01-01 00:00:00 UTC 開始，到new的時候經過的毫秒數。
*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var canons=[];
var hero,hade;
var nn=100;
var bullets=[];
var bullet;
var tt=0;
var tt3=0;
var v0=5;
var dt=0.1;
var kk;
var gameMD=0;
var num=0;
var target;
var touch=-1;
var zb,zb1;
var pos1=0,pRandom=1;
var yy,yy1;
var point=0;
var point1=0;
var tt1=0;
var tt2=0;
var q;
var win;
var zzz = 4;
var rule,rule1;
var oo;
var wash;
var warn;
var pp;
var sound;
var sound1;





world2D.slCameraRR.value = 200;



//B.定義init
function init(){

	sound=new Audio("allData/mp3/pong.mp3");
	sound1=new Audio("allData/mp3/clap.mp3");

	


	pp = new TEACHER.ObjTextPlane(200,20,"1543 葉家源 期末專題","Z",0x0000FF);
	scene.add(pp);
	pp.position.z = -100;
	pp.position.y = 70;





	warn = new TEACHER.ObjTextPlane(200,10,"請等前一顆子彈消失後，再擊發下一顆","Z",0xffff00);
	scene.add(warn);
	warn.position.z = -100;
	warn.position.y = 47;
	warn.position.x = 0;

	world2D.sl02.visible=false;
	world2D.sl03.visible=false;
	world2D.btnRight.visible=false;
	world2D.btnLeft.visible=false;



	wash = new TEACHER.ObjPicPlane(100,80,pics.wash,"y",2);
	scene.add(wash);
	wash.position.y=0;
	wash.position.z=0;
	wash.visible=false;


	rule = new TEACHER.ObjPicPlane(100,80,pics.rule,"z",0);
	scene.add(rule);
	rule.position.y=40;
	rule.position.z=100;
	rule.visible=true;
	
	oo = new TEACHER.ObjTextPlane(100,20,"📢 得分:","z",0xffffff);
	scene.add(oo);
	oo.position.z = -100;
	oo.position.y = 30;
	oo.position.x = -30;






	yy = new TEACHER.ObjTextPlane(100,20,"z",0xff00ff);
	scene.add(yy);
	yy.position.z = -100;
	yy.position.y = 30;
	yy.position.x = 20;
	yy.visible=true;


	yy1 = new TEACHER.ObjTextPlane(100,20,"z",0xff00ff);
	scene.add(yy1);
	yy1.position.z = -100;
	yy1.position.y = 30;
	yy1.position.x = 20;
	yy1.visible=false;


	zb = new TEACHER.ObjPicPlane(15,20,pics.zb,"z",2);
	scene.add(zb);
	zb.position.y=10;
	zb.position.x=pos1;
	zb.position.z=-30;




	zb1 = new TEACHER.ObjPicPlane(15,20,pics.zb,"z",2);
	scene.add(zb1);
	zb1.position.y=10;
	zb1.position.x=Math.floor(Math.random()*40);
	zb1.position.z=-30;



	win = new TEACHER.ObjPicPlane(150,200,pics.win,"y",2);
	scene.add(win);
	win.position.y=10;
	win.visible=false;
	

	for(var i=0;i<nn;i++){
		bullet=new TEACHER.ObjSphere(1,0xffff00);
		scene.add(bullet);
		bullets.push(bullet);

		bullet.isActive=false;
	}


	world2D.btn01.on('click',clickBtn);


	for(var i=0;i<zzz;i++){
		var canon = new THREE.Object3D();

		var c1 = new TEACHER.ObjCylinder(5,2,0x00ffff);
		canon.add(c1);
		var c2 = new TEACHER.ObjCylinder(1,10,0x00ffff,false,"x");
		c2.position.x=5+5;
		canon.add(c2);
		
		scene.add(canon);
		canons.push(canon);


		if(i==0){
			canon.position.x = -15;
			canon.position.z = 90;
		}else if(i==1){
			canon.position.x = 15;
			canon.position.z = 90;
		}else if(i==2){
			canon.position.x = 40;
			canon.position.z = 90;
			canon.position.y = 0;
		}else if(i==3){
			canon.position.x = -40;
			canon.position.z = 90;
		}
		/*canon.position.x = i<2?-40:+40;
		canon.position.z = i%2===0?-40:+40;
		*/


	}
	
	hero=new TEACHER.ObjBox(7,15,7,0X0000ff);	
	scene.add(hero);

	hade = new TEACHER.ObjSphere(4,0xffff00);
	scene.add(hade);
	
	ground.position.y = -1;

	hero.visible = hade.visible = false;


	world2D.on("mousedown",md);


	world2D.sl01.setLabel("speed");
	world2D.sl01.maximum = 40;
	world2D.sl01.minimum = 1;
	world2D.sl01.value = 10;
	world2D.sl01.digitN=1;


	/*
	world2D.sl02.setLabel("砲台數");
	world2D.sl02.maximum = 4;
	world2D.sl02.minimum = 1;
	world2D.sl02.value = 4;
	*/

	world2D.btn01.on('click',clickBtn);
	world2D.btn01.setLabel('下一關');
	world2D.btn01.visible=false;


	world2D.btn02.on('click',clickBtn);
	world2D.btn02.setLabel('EndGame');
	world2D.btn02.visible=false;

	world2D.btn03.on('click',clickBtn);
	world2D.btn03.setLabel('reset');
	world2D.btn03.visible=false;



	world2D.btnUp.on('click',clickBtn);
	world2D.btnDown.on('click',clickBtn);



	world2D.ch01.setLabel("規則📢記得開聲音");
	world2D.ch01.checked=true;


	world2D.ch02.setLabel("洗分");




	setInterval(tick,1000/fps);
}

	
//C.定義tick                                                                                                                       
function tick(){


	pp.rotation.x += 0.05;


	if(world2D.ch02.checked === true){
		wash.visible=true;
	}else if(world2D.ch02.checked === false){
		wash.visible=false;
	}

	rule1 = world2D.ch01.checked;

	if(rule1===true){
		rule.visible=true;
		logo.visible=false;
		world3D.cameraTheta=20;
		world3D.cameraPhi=0;
	
	}else if(rule1===false){
		rule.visible=false;
		logo.visible=true;
	
	}


	v0=world2D.sl01.value;

	

	tt1++;
	tt3++;

	yy.setText(point);
	yy1.setText(point1);


	if(gameMD===0){
		zb1.position.y=2*Math.sin(2*Math.PI*zb.position.x/50 + 2*Math.PI*tt/10)+10;
		zb.position.y=9999;
	}else if(gameMD===1){
		yy.visible=false;
		yy1.visible=true;
		zb.position.y=2*Math.sin(2*Math.PI*zb.position.x/50 + 2*Math.PI*tt/10)+10;
		zb1.position.y=9999;

		if(tt3>60){
			tt3=0;
			if(world2D.ch02.checked === true){
				point1++;
			}
		}
		
	}else if(gameMD===10){
		
		sound1.play();


		world2D.slCameraRR.value = 200;
		world3D.cameraTheta=0;
		world3D.cameraPhi=Math.PI;
		zb.visible=false;
		world2D.btn03.visible=true;
		world2D.btn02.visible=false;
		win.visible=true;
	}
	
	

	tt++;
	if(tt>60){
		if(world2D.ch02.checked === true){
			point++;
		}

		tt=0;
		pos1=(Math.floor(Math.random()*75)+1)*pRandom;
		zb.position.x=pos1;
	}
	
	if(zb.position.x<0){
		pRandom*=-1;
	}else if(zb.position.x>0){
		pRandom*=-1;
	}
	
	

	var vecM = getMouse3D("y",0);
	hero.position.x = vecM.x;
	hero.position.z = vecM.z;
	hero.position.y = 7.5;

	hade.position.x = vecM.x;
	hade.position.z = vecM.z;
	hade.position.y = hero.position.y + 10;

	for(var i=0;i<zzz;i++){

		var canon = canons[i];
		var theta = Math.atan2(-hero.position.z+canon.position.z , hero.position.x-canon.position.x);
		canon.rotation.y = theta;
		canon.theta=theta;
	}


		
		if(touch===1){
			touch=0;
			var canon=canons[Math.floor(Math.random()*zzz)];
			for(var i=0;i<nn;i++){
				if(!bullets[i].isActive){
				bullet=bullets[i];
				bullet.isActive=true;
				i=nn+1;
				}	
			}
			
			bullet.position.x = canon.position.x;
			bullet.position.z = canon.position.z;
			bullet.vx = v0*Math.cos(canon.theta);
			bullet.vz = -v0*Math.sin(canon.theta);
		}
		

	for(var i=0;i<nn;i++){
		bullet = bullets[i];
		if(bullet.isActive){
			bullet.position.x+=bullet.vx*dt;
			bullet.position.z+=bullet.vz*dt;

			if(bullet.position.x>75||bullet.position.x<-75||bullet.position.z>100||bullet.position.z<-100){
				bullet.isActive = false;
			}
		}
		bullet.visible = bullet.isActive;
		
		//讀球球的位置的值
		if(tt1>300/world2D.sl01.value){
			tt1=0;
			q=bullets[i];
			//var u = bullets[0];
			//log(Math.floor(q.position.z));
			//log(Math.floor(q.position.x));
			//log(Math.floor(u.position.x));
			//log(Math.floor(zb.position.x-q.position.x));

			/*log(zb.position.x);
			log(zb.position.z);
			log(Math.floor(q.position.z));
			log(Math.floor(q.position.x));
*/
			


			

			if(q.position.z<-100||q.position.x<-75||q.position.x>75){
				q.position.x=999;
				q.position.z=999;
			}


			
			if(((bullets[i].position.x < zb.position.x+14 && bullets[i].position.x > zb.position.x-14) && (bullets[i].position.z < zb.position.z+15 && bullets[i].position.z > zb.position.z-15)) && zb.position.y<500){
				point1++;
			}
			
			if(((bullets[i].position.x < zb1.position.x+14 && bullets[i].position.x > zb1.position.x-14) && (bullets[i].position.z < zb1.position.z+15 && bullets[i].position.z > zb1.position.z-15)) && zb1.position.y<500){
				point++;
			}
			
		}
		
	}


	if(point>=20){	
		world2D.btn01.visible=true;
	}
	if(point1>=5){
		world2D.btn01.visible=false;
		world2D.btn02.visible=true;
	}


	





	



	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function md(e){
	sound.currentTime=0;
	sound.play();
	touch=1;
	log(touch);
}





function clickBtn(e){
	var str = e.target.parent.name;

		if(str==="btn01"){
			gameMD=1;
		}else if(str==="btn02"){
			gameMD=10;
		}else if(str==="btn03"){
			history.go(0);
		}else if(str==="btnUp" && zzz<4){
			zzz++;
		}else if(str==="btnDown" && zzz>1){
			zzz--;
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
var ground=new TEACHER.ObjPicPlane(150,200,pics.ground,'y');
world3D.scene.add(ground);

var logo=new TEACHER.ObjPicPlane(150,150/8,pics.logo,'z',2);
logo.position.z=-100;
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
