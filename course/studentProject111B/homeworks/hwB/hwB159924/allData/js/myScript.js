'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 拋體運動：
	(1)做出初速為零的自由落體運動
	(2)做出平拋運動
	(3)做出斜拋運動

2. 撞牆反彈：
	(1)做出等速運動，撞牆反彈
	(2)撞牆反彈時，速度恢復係數可調

3. 控制外力：
	按下箭頭按鈕時，加入外力。放開按鈕時，外力消失。

4. 加入箭頭：
	用老師幫你寫好的 new TEACHER.ObjArraow加入箭頭。
	用箭頭 .setArrow(x,y,z)顯示速度，與加速度。

*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var ball
var v=0
var g=0.5
var dt=1
var ratio 
var ground
var hole
var direction
var strengh
var gameMD=0
var pole
var obstacle1
var obstacle2
var obstacle3
var obstacle4
var text
// var vvx
// var vvz
//B.定義init
function init(){
	
	ball= new TEACHER.ObjSphere(5,0xffffff)
	ground=new TEACHER.ObjBox(400,10,100,0x64A600)
	hole=new TEACHER.ObjCylinder(7,1,0x401500,false,'y')
	pole=new TEACHER.ObjCylinder(2,200,0xff0000,false,'y')
	direction=new TEACHER.ObjArrow(3,0xff0000)
	obstacle1=new TEACHER.ObjBox(60,10,10,0x005B00)
	obstacle2=new TEACHER.ObjBox(20,10,60,0x005B00)
	obstacle3=new TEACHER.ObjBox(20,10,50,0x005B00)
	obstacle4=new TEACHER.ObjBox(20,10,60,0x005B00)
	text=new TEACHER.ObjTextPlane(200,20,'1599 24連振佑','z',0xffff00)
	hole.position.y=10
	pole.position.y=100
	hole.position.x=185
	pole.position.x=185

	text.position.y=60
	text.position.z=-50

	ground.position.y=5

	ball.position.x=-185
	ball.position.z=0
	ball.position.y=15

	obstacle1.position.x=-85
	obstacle1.position.z=0
	obstacle1.position.y=15

	obstacle2.position.x=0
	obstacle2.position.z=20
	obstacle2.position.y=15

	obstacle3.position.x=-105
	obstacle3.position.z=-25
	obstacle3.position.y=15

	obstacle4.position.x=100
	obstacle4.position.z=-20
	obstacle4.position.y=15

	scene.add(ball)
	scene.add(ground)
	scene.add(hole)
	scene.add(direction)
	scene.add(pole)
	scene.add(obstacle1)
	scene.add(obstacle2)
	scene.add(obstacle3)
	scene.add(obstacle4)
	scene.add(text)
	

	ball.vx=0;
	ball.vy=0;
	ball.vz=0;

	ball.ax=0;
	ball.ay=0;
	ball.az=0;


	
	world2D.sl01.setLabel("角度")
	world2D.sl01.maximum=6.3
	world2D.sl01.minimum=0
	world2D.sl01.digitN=1
	world2D.sl01.value=0


	world2D.sl02.setLabel("恢復係數")
	world2D.sl02.maximum=0.9
	world2D.sl02.minimum=0.1
	world2D.sl02.digitN=1
	world2D.sl02.value=0.5
	
	world2D.sl03.setLabel("力道")
	world2D.sl03.maximum=2
	world2D.sl03.minimum=0.1
	world2D.sl03.digitN=1
	world2D.sl03.value=1



	// world2D.btnUp.on("mousedown",mousedown)
	// world2D.btnRight.on("mousedown",mousedown)
	// world2D.btnDown.on("mousedown",mousedown)
	// world2D.btnLeft.on("mousedown",mousedown)

	// world2D.btnUp.on("pressup",pressup)
	// world2D.btnRight.on("pressup",pressup)
	// world2D.btnDown.on("pressup",pressup)
	// world2D.btnLeft.on("pressup",pressup)
	world2D.btn01.setLabel("打擊")
	world2D.btn01.on("mousedown",mousedown)
	world2D.btn01.on("pressup",pressup)
	
	
	world3D.cameraTheta=1
	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
	//  console.log("x"+ball.vx)
	//  console.log('z'+ball.vz)
	if((ball.position.x-185)*(ball.position.x-185)+ball.position.z*ball.position.z<49){
		ball.position.x=-185
		ball.position.z=0
		ball.position.y=15

		ball.vx=0;
		ball.vy=0;
		ball.vz=0;

		ball.ax=0;
		ball.ay=0;
		ball.az=0;
	}

	//摩擦力
	if(ball.vx>0&&gameMD==1){
		// ball.vx-=Math.abs(vvx*0.01)
		// Math.abs(Math.sin(world2D.sl01.value)*(world2D.sl03.value)*0.01);
		if(Math.abs(ball.vx)>Math.abs(Math.sin(world2D.sl01.value)*(world2D.sl03.value)*0.03)){
			ball.vx-=Math.abs(Math.sin(world2D.sl01.value)*(world2D.sl03.value)*0.03);
		}else{
			ball.vx=0
		}
	}
	if(ball.vz>0&&gameMD==1){
		// ball.vz-=Math.abs(vvx*0.01)
		if(	Math.abs(ball.vz)>Math.abs(Math.cos(world2D.sl01.value)*(world2D.sl03.value)*0.03)){
			ball.vz-=Math.abs(Math.cos(world2D.sl01.value)*(world2D.sl03.value)*0.03);
			}else{
				ball.vz=0
			}
	}
	if(ball.vx<0&&gameMD==1){
		// ball.vx+=Math.abs(vvz*0.01)
		if(	Math.abs(ball.vx)>Math.abs(Math.sin(world2D.sl01.value)*(world2D.sl03.value)*0.03)){
			ball.vx+=Math.abs(Math.sin(world2D.sl01.value)*(world2D.sl03.value)*0.03);
		}else{
			ball.vx=0
		}
	}
	if(ball.vz<0&&gameMD==1){
		// ball.vz+=Math.abs(vvz*0.01)
		if(	Math.abs(ball.vz)>Math.abs(Math.cos(world2D.sl01.value)*(world2D.sl03.value)*0.03)){
			ball.vz+=Math.abs(Math.cos(world2D.sl01.value)*(world2D.sl03.value)*0.03);
			//log(Math.abs(Math.cos(world2D.sl01.value)*(world2D.sl03.value)*0.03))
		}else{
			ball.vz=0
		}
	}
	if(ball.vx==0&&ball.vz==0&&gameMD==1){
		gameMD=0
		console.log('1')
		world3D.cameraPhi=world2D.sl01.value+Math.PI
	}
	if(gameMD==0){
		direction.setArrow(Math.sin(world2D.sl01.value)*strengh*20,0,Math.cos(world2D.sl01.value)*strengh*20)
		world3D.cameraPhi=world2D.sl01.value+Math.PI
	}

	//初始設定
	world2D.slCameraRR.value=200

	world3D.cameraTarget.x=ball.position.x
	world3D.cameraTarget.z=ball.position.z

	strengh=world2D.sl03.value
	direction.position.x=ball.position.x
	direction.position.y=ball.position.y
	direction.position.z=ball.position.z
	// if(ball.vx!=0||ball.vz!=0){
	// 	direction.setArrow(0,0,0)
	// }else{
	// 	direction.setArrow(Math.sin(world2D.sl01.value)*strengh*20,0,Math.cos(world2D.sl01.value)*strengh*20)
	// world3D.cameraPhi=world2D.sl01.value+Math.PI
	// }

	ratio=world2D.sl02.value
	ball.vx+=ball.ax
	ball.vz+=ball.az
	ball.position.x+=ball.vx*dt
	ball.position.z+=ball.vz*dt
	// ball.scale.x=world2D.sl01.value*0.2
	// ball.scale.y=world2D.sl01.value*0.2
	// ball.scale.z=world2D.sl01.value*0.2
	
	// hole.scale.x=world2D.sl01.value*0.2
	// hole.scale.z=world2D.sl01.value*0.2


	//邊界
	if(ball.position.x>200&&ball.vx>0){
		ball.vx*=-1*ratio
		// vvx=ball.vx*-1*ratio
		ball.position.x=200
		// world3D.cameraPhi+=Math.PI/2
	}else if(ball.position.x<-200&&ball.vx<0){
		ball.vx*=-1*ratio
		// ball.vx*=-1*ratio
		// vvx=ball.vx*-1*ratio

		ball.position.x=-200
		// world3D.cameraPhi+=Math.PI/2
	}
	// else if(ball.position.x<-200&&ball.vx==0){
	// 	ball.position.x=-200
	// }else if(ball.position.x>200&&ball.vx==0){
	// 	ball.position.x=200
	// }
	
	if(ball.position.z>50&&ball.vz>0){
		ball.vz*=-1*ratio
		ball.position.z=50
		// ball.vz*=-1*ratio
		// vvz=ball.zx*-1*ratio

		// world3D.cameraPhi+=Math.PI/2
	}else if(ball.position.z<-50&&ball.vz<0){
		ball.vz*=-1*ratio
		ball.position.z=-50
		// ball.vz*=-1*ratio
		// vvz=ball.zx*-1*ratio

		// world3D.cameraPhi+=Math.PI/2
	}
	// else if(ball.position.z<-50+world2D.sl01.value&&ball.vz==0){
	// 	ball.position.z=-50+world2D.sl01.value
	// }else if(ball.position.z>50-world2D.sl01.value&&ball.vz==0){
	// 	ball.position.z=50-world2D.sl01.value
	// }

	//障礙
	if(ball.position.x>(-115-5)&&ball.position.z<(5+5)&&ball.position.x<(-95+5)&&ball.vx>0){
		ball.position.x=-115-5
		ball.vx*=-1*ratio
		log('2')
	}
	if(ball.position.x>(-115-5)&&ball.position.z<(-5)&&ball.position.x<(-95+5)&&ball.vx<0){
		ball.position.x=-95+5
		ball.vx*=-1*ratio
		log('3')
    }
	if(ball.position.x>(-115)&&ball.position.z<(5+5)&&ball.vz<0&&ball.position.x<(-55)&&ball.position.z>(-5-5)){
		ball.position.z=5+5
		ball.vz*=-1*ratio
		 log('4')
	}
	if(ball.position.x>(-115)&&ball.position.z<(5+5)&&ball.vz>0&&(-55)>ball.position.x&&ball.position.z>(-5-5)){
		ball.position.z=-5-5
		ball.vz*=-1*ratio
	 	log('5')
	}
	if(ball.position.x>(-115-5)&&ball.position.z<(5)&&ball.vx<0&&(-55+5)>ball.position.x&&ball.position.z>(-5)){
		ball.position.x=-55+5
		ball.vx*=-1*ratio
	 	 log('6')
	}


	if(ball.position.x>(-10-5)&&ball.position.z>(-10)&&ball.vx>0&&ball.position.x<(10+5)){
		ball.position.x=-10-5
		ball.vx*=-1*ratio
	 	log('a')
	}
	if(ball.position.x>(-10-5)&&ball.position.z>(-10)&&ball.vx<0&&ball.position.x<(10+5)){
		ball.position.x=10+5
		ball.vx*=-1*ratio
	 	 log('b')
	}
	if(ball.position.x>(-10)&&ball.position.z>(-10-5)&&ball.vz>0&&ball.position.x<(10)){
		ball.position.z=-10-5
		ball.vz*=-1*ratio
	 	 log('c')
	}
	
	if(ball.position.x>(90-5)&&ball.position.z<(10)&&ball.vx>0&&ball.position.x<(110+5)){
		ball.position.x=90-5
		ball.vx*=-1*ratio
	 	log('a')
	}
	if(ball.position.x>(90-5)&&ball.position.z<(10)&&ball.vx<0&&ball.position.x<(110+5)){
		ball.position.x=110+5
		ball.vx*=-1*ratio
	 	 log('b')
	}
	if(ball.position.x>(90)&&ball.position.z<(10+5)&&ball.vz>0&&ball.position.x<(110)){
		ball.position.z=10+5
		ball.vz*=-1*ratio
	 	 log('c')
	}

	//3D
	world3D.render();
	//2D

	world2D.stage.update();
}


// function mousedown(e){
// 	var str=e.target.parent.name
// 	console.log(str)
// 	if(str==="btnRight"){
// 			ball.ax=g
// 	}else if(str==="btnUp"){
// 			ball.az=-g
// 	}else if(str==="btnDown"){
// 			ball.az=g
// 	}else if(str==="btnLeft"){
// 			ball.ax=-g
		
// 	}
// }
// function pressup(e){
// 	ball.ax=ball.az=0
// }
function mousedown(e){
if(ball.vx==0&&ball.vz==0){
		ball.ax=Math.sin(world2D.sl01.value)*(world2D.sl03.value);
		ball.ay=0;
		ball.az=Math.cos(world2D.sl01.value)*(world2D.sl03.value);
		
}
}
function pressup(e){
	ball.ax=ball.az=0
	gameMD=1
	direction.setArrow(0,0,0)
	// vvx=ball.vx
	// vvz=ball.vz
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
