'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log


//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//
//A.宣告全域變數
var dt=0;
var road1,road2,road3,stage;
var win,lose,victory;
var character;
var bucket1,bucket2,bucket3;
var surface1,surface2;
var vx1=0.4;
var vy1=0.12;
var vx2=0.4;
var vy2=0.12;
var vx3=0.4;
var vy3=0.12;
var life1,life2,life3;
var notice,notice2,notice3,notice4;
var dot1,dot2;
var picture='data:image/jpeg;base64,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'
//B.定義init
function init(){
	world2D.sl01.setLabel('1547')
	world2D.sl02.setLabel('29')
	world2D.sl03.setLabel('黃明遠')
world2D.slCameraRR.value=200;
world2D.btnUp.visible=world2D.btnDown.visible=false
ground.position.y=-19
road1=new TEACHER.ObjBox(100,3,20,0xd2691e,2)
road2=new TEACHER.ObjBox(100,3,20,0xd2691e,2)
road3=new TEACHER.ObjBox(60,3,20,0xd2691e,2)
stage=new TEACHER.ObjBox(30,2,25,0xd2691e,2)
bucket1=new TEACHER.ObjCylinder(4,15,0x8b4513,false,'z',2)
bucket2=new TEACHER.ObjCylinder(4,15,0x8b4513,false,'z',2)
bucket3=new TEACHER.ObjCylinder(4,15,0x8b4513,false,'z',2)

scene.add(road3).add(road2).add(road1).add(stage).add(bucket1).add(bucket2).add(bucket3);

//主角
character=new TEACHER.ObjPicCylinder(3.5,0.5,picture,false,'z');
character.position.x=42
character.position.y=-15
scene.add(character);
world2D.ch02.setLabel('(´・ω・`)')
world2D.btn01.setLabel('vanish')
world2D.btn01.on('click',fff1)
world2D.btn02.setLabel('restart')
world2D.btn02.on('click',clickBtn)
world2D.btnUp.on('click',clickBtn)
world2D.btnLeft.on('click',clickBtn)
world2D.btnRight.on('click',clickBtn)

dot1=new TEACHER.ObjSphere(1)
dot2=new TEACHER.ObjSphere(1)
scene.add(dot1).add(dot2)
dot1.position.x=-59.5
dot1.position.y=10
dot2.position.x=55
dot2.position.y=43
//surface
surface1=new TEACHER.ObjPlane(120,100,0xff00ff,'y',0)
surface2=new TEACHER.ObjPlane(100,100,0xff0000,'y',0)
scene.add(surface1).add(surface2)
surface1.position.y=40
surface2.position.y=11
surface1.visible=surface2.visible=false
//stage
stage.position.y=62
stage.position.x=-30

//road1
road1.rotation.z=50
road1.position.y=-7
road1.position.x=-10
	
//road2
road2.rotation.z=-50
road2.position.y=26
road2.position.x=10

//road3
road3.rotation.z=50
road3.position.y=53
road3.position.x=-7

//bucket
bucket1.position.y=60
bucket1.position.x=-15

bucket2.position.y=34
bucket2.position.x=15

bucket3.position.y=0
bucket3.position.x=-15

//win
win=new TEACHER.ObjSphere(3.14,0xffff00,2)
scene.add(win);
win.position.x=-35
win.position.y=66

//lose
lose=new TEACHER.ObjTextPlane(80,40,'失敗','z',0xffffff,0x000001);
scene.add(lose);
lose.position.z=30
lose.position.y=30
lose.visible=false;

//victory
victory=new TEACHER.ObjTextPlane(80,40,'你贏了','z',0x000001,0xffff00);
scene.add(victory);
victory.position.z=30
victory.position.y=30
victory.visible=false;

//speed
world2D.ch01.setLabel('speed x2')


//life
life1=new TEACHER.ObjSphere(4,0xff0000,0)
life2=new TEACHER.ObjSphere(4,0xffff00,0)
life3=new TEACHER.ObjSphere(4,0x00ff00,0)
life1.position.y=life2.position.y=life3.position.y=60
life1.position.x=40
life2.position.x=50
life3.position.x=60
scene.add(life3).add(life2).add(life1);


notice=new TEACHER.ObjTextPlane(80,10,'小提醒:要走到紅點處才','z')
notice.position.x=-90
notice.position.y=-20
scene.add(notice);
notice2=new TEACHER.ObjTextPlane(80,10,'能進到下一段橋喔','z')
notice2.position.x=-90
notice2.position.y=-30
scene.add(notice2);
notice3=new TEACHER.ObjTextPlane(120,10,'按vanish來消失1秒以躲過木桶','z',0x000001)
notice3.position.x=-90
notice3.position.y=40
scene.add(notice3);
notice4=new TEACHER.ObjTextPlane(100,10,'生命','z',0x000080)
notice4.position.x=50
notice4.position.y=70
scene.add(notice4);
setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
if(world2D.ch01.checked){
if(vx1>0){
	vx1=0.8}
	if(vx1<0){
	vx1=-0.8}
if(vx2>0){
	vx2=0.8}
	if(vx2<0){
	vx2=-0.8}
if(vx3>0){
	vx3=0.8}
	if(vx3<0){
	vx3=-0.8}
if(vy1>0){
	vy1=0.24
  }if(vy1<0){
	vy1=-0.24
}
if(vy2>0){
	vy2=0.24
  }if(vy2<0){
	vy2=-0.24
}
if(vy3>0){
	vy3=0.24
  }if(vy3<0){
	vy3=-0.24
}
}else{
	if(vx1>0){
		vx1=0.4}
		if(vx1<0){
		vx1=-0.4}
	if(vx2>0){
		vx2=0.4}
		if(vx2<0){
		vx2=-0.4}
	if(vx3>0){
		vx3=0.4}
		if(vx3<0){
		vx3=-0.4}
	if(vy1>0){
		vy1=0.12
	  }if(vy1<0){
		vy1=-0.12
	}
	if(vy2>0){
		vy2=0.12
	  }if(vy2<0){
		vy2=-0.12
	}
	if(vy3>0){
		vy3=0.12
	  }if(vy3<0){
		vy3=-0.12
	}
}
	//bucket1
	bucket1.position.x+=vx1
	bucket1.position.y-=vy1
if(bucket1.position.x>=45){
	vx1*=-1
}else if(bucket1.position.x<=-55){
	vx1*=-1
}else if(bucket1.position.y<=-10){
	setTimeout(re1,500)
}
    //bucket2
bucket2.position.x-=vx2
bucket2.position.y-=vy2
if(bucket2.position.x>=45){
	vx2*=-1
}else if(bucket2.position.x<=-55){
	vx2*=-1
}else if(bucket2.position.y<=-10){
	setTimeout(re2,500)
}
    //bucket3
bucket3.position.x+=vx3
bucket3.position.y-=vy3
if(bucket3.position.x>=45){
	vx3*=-1
}else if(bucket3.position.x<=-55){
	vx3*=-1
}else if(bucket3.position.y<=-10){
	setTimeout(re3,500)
}

//主角
//碰撞
if((character.position.x-bucket1.position.x)*(character.position.x-bucket1.position.x) + (character.position.y-bucket1.position.y)*(character.position.y-bucket1.position.y)<55){
	log('touched1')
	bucket1.position.y=60
	bucket1.position.x=-15
	vx1=Math.abs(vx1)
	if((life3.visible===true)&&(life2.visible===true)&&(life1.visible===true)){
		life3.visible=false
		log('l3')
	}else if((life2.visible===true)&&(life1.visible===true )&& (life3.visible===false)){
		life2.visible=false
		log('l2')
	}else if((life1.visible===true)&&(life3.visible===false)&&(life2.visible===false)){
		life1.visible=false
		log('lose')	
	vx1=0;
    vy1=0;
    vx2=0;
    vy2=0;
    vx3=0;
	vy3=0;
	lose.visible=true;
}
};
if((character.position.x-bucket2.position.x)*(character.position.x-bucket2.position.x) + (character.position.y-bucket2.position.y)*(character.position.y-bucket2.position.y)<55){
	log('touched2')
	bucket2.position.y=60
	bucket2.position.x=-15
	vx2=-Math.abs(vx2)
	if((life3.visible===true)&&(life2.visible===true)&&(life1.visible===true)){
		life3.visible=false
		log('l3')
	}else if((life2.visible===true)&&(life1.visible===true )&& (life3.visible===false)){
		life2.visible=false
		log('l2')
	}else if((life1.visible===true)&&(life3.visible===false)&&(life2.visible===false)){
		life1.visible=false
		log('lose')	
	vx1=0;
    vy1=0;
    vx2=0;
    vy2=0;
    vx3=0;
	vy3=0;
	lose.visible=true;
}
};
if((character.position.x-bucket3.position.x)*(character.position.x-bucket3.position.x) + (character.position.y-bucket3.position.y)*(character.position.y-bucket3.position.y)<55){
	log('touched3')
	bucket3.position.y=60
	bucket3.position.x=-15
	vx3=Math.abs(vx3)
	if((life3.visible===true)&&(life2.visible===true)&&(life1.visible===true)){
		life3.visible=false
		log('l3')
	}else if((life2.visible===true)&&(life1.visible===true )&& (life3.visible===false)){
		life2.visible=false
		log('l2')
	}else if((life1.visible===true)&&(life3.visible===false)&&(life2.visible===false)){
		life1.visible=false
		log('lose')	
	vx1=0;
    vy1=0;
    vx2=0;
    vy2=0;
    vx3=0;
	vy3=0;
	lose.visible=true;
}
};
if((character.position.x-win.position.x)*(character.position.x-win.position.x) + (character.position.y-win.position.y)*(character.position.y-win.position.y)<6.64*6.64){
	log('yay')
	vx1=0;
    vy1=0;
    vx2=0;
    vy2=0;
    vx3=0;
	vy3=0;
	victory.visible=true;
};








	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}


function down(){
	character.position.y-=15
}

function fff2(){character.position.x+=1000
}
function fff1(){
	character.position.x-=1000
		setTimeout(fff2,1000);
			
		
}
function clickBtn (e) {
	var str=e.target.parent.name
	log(e.target.parent.name)
	if(str==='btnLeft'){
		if(character.position.x>=-60){character.position.x-=4
		if(character.position.y<surface2.position.y){
			character.position.y+=1
			character.rotation.z+=1/3.5
		}else if(character.position.y>surface1.position.y){
			character.position.y+=1
			character.rotation.z+=1/3.5
	}else{character.position.y-=1
		character.rotation.z-=1/3.5
	}
}
	}else if(str==='btnRight'){
		if(character.position.x<=55){character.position.x+=4
		if(character.position.y<surface2.position.y){
			character.position.y-=1
			character.rotation.z-=1/3.5
		}else if(character.position.y>surface1.position.y){
			character.position.y-=1
			character.rotation.z-=1/3.5
	}else{character.position.y+=1
		character.rotation.z+=1/3.5
	}
}
	}else if(str==='btn02'){
		window.location.reload();
	}
	}
	
	function re3(){
		bucket3.position.y=60
	bucket3.position.x=-15
	vx3=Math.abs(vx3)
	}
	function re2(){
		bucket2.position.y=60
	bucket2.position.x=-15
	vx2=-Math.abs(vx2)
	}
	function re1(){
		bucket1.position.y=60
	bucket1.position.x=-15
	vx1=Math.abs(vx1)
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
//world3D.scene.add(logo);


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
