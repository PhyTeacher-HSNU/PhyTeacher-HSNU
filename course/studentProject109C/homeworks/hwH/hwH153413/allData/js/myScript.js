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
var ball,bar,center;
var radius=25;
var omega=0.2;
var theta=0;
var dt=0.1;
var arrowRotation;
var arrowVelocity;
var gamemode=1;
var vx=0;
var vz=0;
var ratio=1;
var reverse=1;

//B.定義init
function init(){
	world2D.slCameraRR.value=150;

	ball=new TEACHER.ObjSphere(2,0x00ff00);
	bar=new TEACHER.ObjCylinder(0.2,radius,0xffff00,true,'x');
	center=new TEACHER.ObjCylinder(1,4,0x00ffff);
	
	ball.position.y=bar.position.y=center.position.y=2;
	scene.add(ball).add(bar).add(center);

	arrowRotation=new TEACHER.ObjArrow(0.8,0xff5809);
	ball.add(arrowRotation);

	arrowVelocity=new TEACHER.ObjArrow(0.8,0xffff37);
	scene.add(arrowVelocity);

	world2D.sl01.setLabel('omega')
	world2D.sl01.minimum=-Math.PI;
	world2D.sl01.maximum=Math.PI;
	world2D.sl01.value=0.2;
	world2D.sl01.digitN=1;

	world2D.sl02.setLabel('radius')
	world2D.sl02.minimum=0;
	world2D.sl02.maximum=50;
	world2D.sl02.value=25;
	
	world2D.sl05.setLabel('彈性係數')
	world2D.sl05.minimum=0.1;
	world2D.sl05.maximum=2;
	world2D.sl05.digitN=2;
	world2D.sl05.value=1;

	world2D.sl04.setLabel('x向速度')
	world2D.sl04.minimum=-100;
	world2D.sl04.maximum=100;
	world2D.sl04.digitN=0;

	world2D.sl03.setLabel('z向速度')
	world2D.sl03.minimum=-100;
	world2D.sl03.maximum=100;
	world2D.sl03.digitN=0;
	world2D.sl03.x=150;
	world2D.sl03.y=275;

	world2D.ch01.setLabel('轉動箭頭');
	world2D.ch01.checked=true
	world2D.ch01.x=1450

	world2D.ch02.setLabel('速度箭頭');
	world2D.ch02.checked=false
	world2D.ch02.x=150

	world2D.btn01.setLabel('射出');
	world2D.btn01.on('click',clickBtn);
	world2D.btn01.scaleX=world2D.btn01.scaleY=2;
	world2D.btn01.x=1450

	world2D.btn03.setLabel('拉回');
	world2D.btn03.on('click',clickBtn);
	world2D.btn03.scaleX=world2D.btn03.scaleY=2;
	world2D.btn03.x=150

	world2D.btn02.setLabel('停止');
	world2D.btn02.on('click',clickBtn);
	world2D.btn02.scaleX=world2D.btn02.scaleY=2;
	world2D.btn02.x=800;
	world2D.btn02.y=750;

	world2D.btn04.setLabel('太快了!');
	world2D.btn04.on('click',clickBtn);
	world2D.btn04.scaleX=world2D.btn04.scaleY=8;
	world2D.btn04.x=800;
	world2D.btn04.y=300;

	//world2D.sl01.visible=world2D.sl02.visible=world2D.sl03.visible=world2D.sl05.visible=false
	//world2D.ch01.visible=world2D.ch02.visible=false;
	//world2D.btn02.visible=false;
	world2D.btnUp.visible=false;
	world2D.btnDown.visible=false;
	world2D.btnLeft.visible=false;
	world2D.btnRight.visible=false;
	arrowVelocity.visible=false
	world2D.btn04.visible=false

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
		
	if(gamemode===1){
	//omega=world2D
		arrowVelocity.visible=false;
		arrowRotation.visible=true
		world2D.ch02.checked=false;
		omega=world2D.sl01.value;
		radius=world2D.sl02.value;	
		theta+=omega*dt;
		
		ball.position.x=radius*Math.cos(theta);
		ball.position.z=radius*Math.sin(theta);

		bar.scale.x=radius/25;
		bar.position.x=radius*0.5*Math.cos(theta);
		bar.position.z=radius*0.5*Math.sin(theta);
		bar.rotation.y=-theta;
		
		var velocity=radius*omega;
		arrowRotation.setArrow(-velocity*Math.sin(theta)*2,0,velocity*Math.cos(theta)*2);
		arrowRotation.visible=world2D.ch01.checked;
		world2D.sl04.value=-velocity*Math.sin(theta)*2;
		world2D.sl03.value=velocity*Math.cos(theta)*2;
		world2D.btn04.visible=false
		
	}else if(gamemode===2){
			
		arrowVelocity.position.x=ball.position.x;
		arrowVelocity.position.y=ball.position.y;
		arrowVelocity.position.z=ball.position.z;
		arrowVelocity.visible=world2D.ch02.checked;
		world2D.sl04.value=vx;
		world2D.sl03.value=vz;
		arrowVelocity.setArrow(vx*1.5,0,vz*1.55);
		theta=Math.atan2(ball.position.z,ball.position.x);
		world2D.sl01.value=(-vx*Math.sin(theta)+vz*Math.cos(theta))/radius;
		world2D.sl02.value=Math.sqrt(Math.pow(ball.position.x,2)+Math.pow(ball.position.z,2));
		ratio=world2D.sl05.value
			
		arrowRotation.visible=false
		world2D.ch01.checked=false
		world2D.btn04.visible=false
		
		ball.position.x+=vx*dt;
		ball.position.z+=vz*dt;
		

		if(ball.position.x>50 && vx>0){
				vx*=-ratio
		}else if(ball.position.x<-50 && vx<0){
			vx*=-ratio
		}
		if(ball.position.z>50 && vz>0){
			vz*=-ratio
		}else if(ball.position.z<-50 && vz<0){
			vz*=-ratio
		}
			
		if(Math.abs(vx)>400 || Math.abs(vz)>400){ 
		world2D.btn04.visible=true
		gamemode=3
		}
	}

	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function clickBtn(t){
	
	if(gamemode===1){
		theta=Math.atan2(ball.position.z,ball.position.x);
		var v0=radius*omega;
		vx=-v0*Math.sin(theta);
		vz=v0*Math.cos(theta);
		//gamemode=2;
		//world2D.btn01.setLabel('拉回');
	}else if(gamemode===2){
		radius=Math.sqrt(Math.pow(ball.position.x,2)+Math.pow(ball.position.z,2));
		var vt=radius*omega;
		theta=Math.atan2(ball.position.z,ball.position.x);
		vt=-vx*Math.sin(theta)+vz*Math.cos(theta);
		omega=vt/radius;
		//gamemode=1;
		//world2D.btn01.setLabel('射出');
		}	
	log(gamemode);

	var str=t.target.parent.name;
	if(str==='btn01'){
		gamemode=2;
		reverse=2;
	}
	if(str==='btn03'){
		gamemode=1;
		reverse=1;
	}
	if(str==='btn02'){
		if(gamemode===0 && reverse===1){
			world2D.btn02.setLabel('停止');
			gamemode=1;
		}else if(gamemode===0 && reverse===2){
			world2D.btn02.setLabel('停止');
			gamemode=2;
		}else if(gamemode===1 || gamemode===2){
			world2D.btn02.setLabel('繼續');
			gamemode=0
		}
	}
	if(str==='btn04'){
		world2D.btn04.visible=false;
		gamemode=1;
		omega=0.2;
		vx=0;
		vz=0;
		ratio=1;
		radius=25;
		world2D.sl01.value=0.2;
		world2D.sl02.value=25;
		world2D.sl03.value=0;
		world2D.sl04.value=0;
		world2D.sl05.value=1;
	}
}
//resize
MyJS.myResize();

/*
變化任務A：太陽系
1. 重新開始做。
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


/*var NE,NW,SE,SW
			if(vx>0 && vz>0){
				NE=false;
				NW=false;
				SE=true;
				SW=false;
			}else
			if(vx>0 && vz<0){
				NE=true;
				NW=false;
				SE=false;
				SW=false;
			}else
			if(vx<0 && vz<0){
				NE=false;
				NW=true;
				SE=false;
				SW=false;
			}else
			if(vx<0 && vz>0){
				NE=false;
				NW=false;
				SE=false;
				SW=true;
			}
			
			var Quadrant1;
			var Quadrant2;
			var Quadrant3;
			var Quadrant4;

			if(ball.position.x>0 && ball.position.z>0){
				Quadrant1=true;
				Quadrant2=false;
				Quadrant3=false;
				Quadrant4=false;
			}else if(ball.position.x>0 && ball.position.z<0){
				Quadrant1=false;
				Quadrant2=true;
				Quadrant3=false;
				Quadrant4=false;
			}else if(ball.position.x<0 && ball.position.z<0){
				Quadrant1=false;
				Quadrant2=false;
				Quadrant3=true;
				Quadrant4=false;
			}else if(ball.position.x<0 && ball.position.z>0){
				Quadrant1=false;
				Quadrant2=false;
				Quadrant3=false;
				Quadrant4=true;
			}*/
			


























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































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
