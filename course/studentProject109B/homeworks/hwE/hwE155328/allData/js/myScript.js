'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 向右橫波：
	(1) 複習 陣列Array與for迴圈，做出 NN=50 個 ball，排一橫排。
	(2) 根據波動方程式，做出向右橫波：
		y = A Math.sin( 2*Math.PI*x/lambda - 2*Math.PI*t/period )
		其中，A是振幅，lambda是波長，period是週期。

2. 向左橫波：
	(1) 把上面的向右橫波改成向左橫波。
	(2) 用 slider 調整向右或向左橫波。

3. 駐波：
	(1) 做三組 陣列Array，分別存放三組波。
	(2) 三組波動，一個向右橫波，一個向左橫波，一個疊加成為駐波。
	(3) 用 checkBox 控制三組波動重合或分開。

[進階]
4. 向右縱波：
	橫波是上下振動，若改成左右振動，就會變成縱波，試著做出縱波的動畫。

*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var nn=300;
var ballArray=[];
var ballyy=[];
var r=0.5;
var rr=2;
var lambda=50;
var period=10;
var tt=0;
var dt=0.1;
var AA=5;
var stop=false;
var vx=0,vy=0,vz=0;
var ax=0,ay=0,az=0;
var rt=0;
var rt1=0;
var rt2=0;
var on_ground=false;
//man
var ground2,surfboard;
var man,man_container;
var head,rhand,lhand,body1,body2,rfoot,lfoot,hair1,haur2;
var rhd,rhd2,lhd,lhd2,rft,rft2,lft,lft2;
var count=0;
var board;

//B.定義init
function init(){

	//r=50/nn;
	for(var i=0;i<nn;i++){

		var b=new TEACHER.ObjCylinder(r,150,0x0000ff,false,'z');
		b.position.x=-nn/2+i*2*r;
		b.position.y=0;
		scene.add(b);
		ballArray.push(b);
	}

	add_man();
	man.rotation.x=man.rotation.z=man.rotation.y=0;



	var t=new TEACHER.ObjTextPlane(100,20,"1553 劉昆泰",'z',0xffffff);
	t.position.y=30;
	t.position.z=-175;
	scene.add(t);
	var ground2 =new TEACHER.ObjBox(nn,50,100,0xAAAAAA);
	ground2.position.z=-125;
	ground2.position.y=-20;
	scene.add(ground2)

	var ground3=new TEACHER.ObjPicPlane(300,100,pics.ground2,'y');
	ground3.position.z=-125;
	ground3.position.y=5.2;
	scene.add(ground3);


	//橫波


	world2D.sl01.setLabel('振幅大小');
	world2D.sl01.minimum=1;
	world2D.sl01.maximum=20;
	world2D.sl01.value=5;

	world2D.sl02.setLabel('波長大小');
	world2D.sl02.minimum=1;
	world2D.sl02.maximum=100;
	world2D.sl02.value=50;

	world2D.sl03.setLabel('流速');
	world2D.sl03.minimum=-0.6;
	world2D.sl03.maximum=0.6;
	world2D.sl03.value=0.1;
	world2D.sl03.digitN=1;


	world2D.ch01.setLabel('視線上岸');
	world2D.btn01.setLabel('step');
	world2D.btn02.setLabel('stop');
	world2D.btn01.on('click',clickBtn);
	world2D.btn02.on('click',clickBtn);
	world2D.btnUp.on('mousedown',clickBtn);
	world2D.btnDown.on('mousedown',clickBtn);
	world2D.btnLeft.on('mousedown',clickBtn);
	world2D.btnRight.on('mousedown',clickBtn);
	world2D.on('pressup',Up2D);

	// world2D.ch01.setLabel('出現箭頭');
	// world2D.ch02.setLabel('隱形盒子');

	world2D.slCameraRR.value = 180;

	//上下左右
	// world2D.btnUp.on('mousedown',clickbtn);
	// world2D.btnDown.on('mousedown',clickbtn);
	// world2D.btnLeft.on('mousedown',clickbtn);
	// world2D.btnRight.on('mousedown',clickbtn);
	// world2D.on('pressup',Up2D);




	setInterval(tick,1000/fps);
}


//C.定義tick
function tick(){

	var place=world2D.ch01.checked;
	if(place==true){
		if(world3D.cameraTarget.z>-150){
			world3D.cameraTarget.z-=1;
		}
	}else if(world3D.cameraTarget.z<0){
		world3D.cameraTarget.z+=1;
	}
	vx+=ax*dt;
	vy+=ay*dt;
	vz+=az*dt;
	man.position.x+=vx*dt;
	man.position.y+=vy*dt;
	man.position.z+=vz*dt;
	if(man.position.x<nn/2+1 && man.position.x>-nn/2){
		manHFmove();
	}else if(man.position.x>nn/2){
		man.position.x=nn/2;
	}else if(man.position.x<-nn/2+1){
		man.position.x=-nn/2+1;
	}
	if(stop==true){
		tt=tt;
	}else{
		tt+=world2D.sl03.value;//dt;
	}
	AA=world2D.sl01.value;
	lambda=world2D.sl02.value;


	for(var i=0;i<nn;i++){
		var b=ballArray[i];
		var yy = AA*Math.sin(2*Math.PI*b.position.x/lambda-2*Math.PI*tt/period);
		var zz = AA*Math.sin(2*Math.PI*b.position.x/lambda-2*Math.PI*tt/period);
		b.position.y=yy;
		ballyy[i]=b.position.y;
		//b.position.z=zz;
	}
	if(stop===true) {
			world2D.btn02.setLabel('play');
	}else {
			world2D.btn02.setLabel('stop');
	}
	//var xxx = nn/100;
	if(on_ground===false){
		man.position.y=ballyy[man.position.x+nn/2-1];
		world2D.btn01.setLabel('step');
	}else{
		man.rotation.x=man.rotation.z=0;
		move();
	}
	go_to_ground();
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function move(e){
	rfoot.rotation.x+=rt*Math.PI/20;
	lfoot.rotation.x-=rt*Math.PI/20;
	rhand.rotation.x+=rt*Math.PI/20;
	lhand.rotation.x-=rt*Math.PI/20;
	if(rfoot.rotation.x>Math.PI/20*5 && rt>0){
		rt=-rt;
	}else if(rfoot.rotation.x<-Math.PI/20*5 && rt<0){
		rt=-rt;
	}
}

function jump(e){
	if(man.position.y>30 && vy>0){
		ay+=-9.8;

	}else if(man.position.y<=20 && vy<0){
		vy=0;
		ay=0;
		man.position.y=20;
	}
}

function clickBtn(e){
	var str = e.target.parent.name;

	if(str=='btn02' && stop==true){
		stop=false;
	}else if(str=='btn02' && stop==false){
		stop=true;
	}else if(str=='btn01'){
		stop=true;
		tt+=1;

	}else if(str==='btnLeft' && man.position.x>-145){

		if(on_ground===false){
			swim();
			man_container.rotation.z=Math.PI/2*3;
			man.rotation.x+=Math.PI/2*3;
			man.rotation.y+=Math.PI;
		}else {
			man.rotation.y=Math.PI/2*3;
			rt++;
		}
		vx=-10;
	}
	else if(str==='btnRight' && man.position.x<145){

		if(on_ground===false){
			swim();
			man_container.rotation.z=Math.PI/2*3;
			man.rotation.x-=Math.PI/2*3;
		}else {
			man.rotation.y=Math.PI/2;
			rt++;
		}
		vx=10;
	}
	else if(str==='btnUp' && man.position.z>-172){
		if(on_ground===false){
			swim();
			man.rotation.x=Math.PI/2*3;
			man.rotation.y=Math.PI;
		}else {
			man.rotation.y=Math.PI;
			rt++;
		}
		vz=-10;
	}
	else if(str==='btnDown' && man.position.z<101){
		if(on_ground===false){
			swim();
			man.rotation.x=Math.PI/2;
			man.rotation.y=0;
		}else {
			man.rotation.y=0;
			rt++;
		}
		vz=10;
	}

}

function Up2D(e) {
	vy=vz=vx=rt=rt2=rt1=0;
	rhand.rotation.x=lhand.rotation.x=0;
	rfoot.rotation.x=lfoot.rotation.x=0;
	man.rotation.x=man.rotation.z=0;
	man.position.y=20;
	if(on_ground===false){
		man.rotation.y=0;
	}

}

function swim(e) {
	rt++;
	rt2++;
	rhand.rotation.x+=Math.PI;

}

function add_man(e) {
	man = new THREE.Object3D();
	man_container = man = new THREE.Object3D();
	rhand = new THREE.Object3D();
	lhand = new THREE.Object3D();
	rfoot = new THREE.Object3D();
	lfoot = new THREE.Object3D();

	//head
	man.head=new TEACHER.ObjBox(7.8,7.8,7.8,0xFFE4B5);
	man.head.position.y=11;
	man.hair1=new TEACHER.ObjBox(8.4,3,8.4,0x704214);
	man.hair1.position.y=15;
	man.hair2=new TEACHER.ObjBox(8.4,4,4.6,0x704214);
	man.hair2.position.y=12;
	man.hair2.position.z=-2;
	//rhand
	rhd=new TEACHER.ObjBox(3,9,3,0xFFE4B5);
	rhd2=new TEACHER.ObjBox(3.2,2,3.2,0xFFE4B5);
	rhd.position.y=-3;
	rhd2.position.y=-6.5;
	rhand.add(rhd).add(rhd2);
	rhand.position.y=5.5;
	rhand.position.x=-5.5;

	//lhand
	lhd=new TEACHER.ObjBox(3,9,3,0xFFE4B5);
	lhd2=new TEACHER.ObjBox(3.2,2,3.2,0xFFE4B5);
	lhd.position.y=-3;
	lhd2.position.y=-6.5;
	lhand.add(lhd).add(lhd2);
	lhand.position.y=5.5;
	lhand.position.x=5.5;
	//rfoot
	rft=new TEACHER.ObjBox(3,12,3,0xFFE4B5);
	rft2=new TEACHER.ObjBox(3.2,2,3.2,0x00ffff);
	rft.position.y=-5;
	rft2.position.y=-10;
	rfoot.add(rft).add(rft2);
	rfoot.position.y=-4;
	rfoot.position.x=-2.2;
	//lfoot
	lft=new TEACHER.ObjBox(3,12,3,0xFFE4B5);
	lft2=new TEACHER.ObjBox(3.2,2,3.2,0x00ffff);
	lft.position.y=-5;
	lft2.position.y=-10;
	lfoot.add(lft).add(lft2);
	lfoot.position.y=-4;
	lfoot.position.x=2.2;
	//body
	man.body1=new TEACHER.ObjBox(8,8,8,0xFFE4A0);
	man.body2=new TEACHER.ObjBox(8,4,8,0x00ffff);
	man.body1.position.y=3;
	man.body2.position.y=-3;
	man_container.add(man.head).add(rhand).add(lhand).add(rfoot).add(lfoot).add(man.body1).add(man.body2).add(man.hair1).add(man.hair2);
	man.add(man_container);
	scene.add(man);
	man.position.y=15;
}

function manHFmove(e){
	if(on_ground===false){
		rhand.rotation.x+=rt*Math.PI/20;
		lhand.rotation.x+=rt*Math.PI/20;
		rfoot.rotation.x+=rt2*Math.PI/20;
		lfoot.rotation.x-=rt2*Math.PI/20;
		if(rfoot.rotation.x>Math.PI/20*5 && rt2>0){
			rt2=-rt2;
		}else if(rfoot.rotation.x<-Math.PI/20*5 && rt2<0){
			rt2=-rt2;
		}
	}
}
function go_to_ground(e) {
	if(man.position.z<-75){
		on_ground=true;
		if(count===0){
			man.position.y=20;
		}
		count++;
	}else {
		on_ground=false;
		count = 0;
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
ground.visible=false;
world3D.scene.add(ground);

var logo=new TEACHER.ObjPicPlane(100,100/8,pics.logo,'z',2);
logo.position.z=-175;
logo.position.y=100/8/2+10;
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
