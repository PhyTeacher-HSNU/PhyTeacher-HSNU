'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var p1,p2,p3,p4,p5,p6,p7,p8,p9,p10,p11,p12,p13,p14,p15,p16,p17,p18,p19,p20,p21,HP,con,says,der;
var rr =25;
var kk=1;
var dx =kk*Math.PI/180;
var gameMD;
var str;
var ss=0.3;
var ww;
var es;
var tt =10;
var aa,oo;

//B.定義init
function init(){
	
	p1=new TEACHER.ObjPicPlane(33.6 ,30 ,pics.mouse,'Z',0)
	p2=new TEACHER.ObjCylinder(25,19.3,0XFF00F0,false,'z')
	p3=new TEACHER.ObjCylinder(23.5,19.8,0XFFFFFF,false,'z')
	p4=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',0)
	p5=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',0)
	p6=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',0)
	p7=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',0)
	p8=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',0)
	p9=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',0)
	p10=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',0)
	p11=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',0)
	p12=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',2)
	p13=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',2)
	p14=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',2)
	p15=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',2)
	p16=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',2)
	p17=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',2)
	p18=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',2)
	p19=new TEACHER.ObjPlane(3,24.5,0XFF00FF,'Z',2)
	p20=new TEACHER.ObjPicPlane(33.6 ,30 ,pics.mouse,'Z',1)
	p21=new TEACHER.ObjCylinder(2,30,0XFF00F0,false,'z')
	HP=new TEACHER.ObjPlane(8 ,2 ,0XFF0F00,'Z',2)
	says=new TEACHER.ObjPicPlane(30 ,50 ,pics.says,'Z',0)
	der=new TEACHER.ObjPicPlane(64 ,36 ,pics.der,'Z',0)
	con=new THREE.Object3D();


	scene.add(p1)
	con.add(p2)
	con.add(p3)
	con.add(p4)
	con.add(p5)
	con.add(p6)
	con.add(p7)
	con.add(p8)
	con.add(p9)
	con.add(p10)
	con.add(p11)
	con.add(p12)
	con.add(p13)
	con.add(p14)
	con.add(p15)
	con.add(p16)
	con.add(p17)
	con.add(p18)
	con.add(p19)
	scene.add(p20)
	con.add(p21)
	scene.add(HP)
	scene.add(says)
	scene.add(der)
	scene.add(con)
	

	says.position.z=100
	says.position.y=-14.7+25+5+10
	says.position.x=0
	
	der.position.z=-50
	der.position.y=-14.7+25+5+20
	der.position.x=0 

	p1.position.z=10.3
	p1.position.y=-14.7+25+5
	p1.position.x=-5.5

	p4.position.y=-12.5
	p4.position.z=10.16

	p5.position.y=-8.8
	p5.position.x=8.8
	p5.position.z=10.16
	p5.rotation.z=0.25*Math.PI

	p6.position.x=12.5
	p6.position.z=10.16
	p6.rotation.z=0.5*Math.PI

	p7.position.y=8.8
	p7.position.x=8.8
	p7.position.z=10.16
	p7.rotation.z=0.75*Math.PI

	p8.position.y=12.5
	p8.position.z=10.16

	p9.position.y=8.8
	p9.position.x=-8.8
	p9.position.z=10.16
	p9.rotation.z=0.25*Math.PI

	p10.position.x=-12.5
	p10.position.z=10.16
	p10.rotation.z=0.5*Math.PI

	p11.position.y=-8.8
	p11.position.x=-8.8
	p11.position.z=10.16
	p11.rotation.z=0.75*Math.PI

	p12.position.y=-12.5
	p12.position.z=-10.3

	p13.position.y=-8.8
	p13.position.x=8.8
	p13.position.z=-10.3
	p13.rotation.z=0.25*Math.PI

	p14.position.x=12.5
	p14.position.z=-10.3
	p14.rotation.z=0.5*Math.PI

	p15.position.y=8.8
	p15.position.x=8.8
	p15.position.z=-10.3
	p15.rotation.z=0.75*Math.PI

	p16.position.y=12.5
	p16.position.z=-10.3

	p17.position.y=8.8
	p17.position.x=-8.8
	p17.position.z=-10.3
	p17.rotation.z=0.25*Math.PI

	p18.position.x=-12.5
	p18.position.z=-10.3
	p18.rotation.z=0.5*Math.PI

	p19.position.y=-8.8
	p19.position.x=-8.8
	p19.position.z=-10.3
	p19.rotation.z=0.75*Math.PI

	p20.position.z=-10
	p20.position.y=-14.7+25+5
	p20.position.x=-5.5

	HP.position.z=10.5
	HP.position.y=-14.7+25+5+2
	HP.position.x=-5.5+2

	con.position.y=25+5

	world2D.btn01.setLabel('跑啊！(加速)');
	world2D.btn01.on('click', clickBtn);
	world2D.btn02.setLabel('休息！');
	world2D.btn02.on('click', clickBtn);
	

	world2D.btnRight.on('click', clickBtn);
	world2D.btnLeft.on('click', clickBtn);
	world2D.btnDown.on('click', clickBtn);
	world2D.btnUp.on('click', clickBtn);

	world2D.sl01.setLabel('倉鼠的速度')
	world2D.sl01.minimum = 0
	world2D.sl01.maximum = 20
	world2D.sl01.value = 10

	world2D.sl02.setLabel('倉鼠的體力好壞')
	world2D.sl02.minimum = 0
	world2D.sl02.maximum = 100
	world2D.sl02.value = 50

	world2D.ch01.setLabel('脫離家裡')
	world2D.ch02.setLabel('燃燒潛能')
	
	world2D.slCameraRR.value =200


	es = true

	setInterval(tick,1000/fps);
	
}

	



//C.定義tick                                                                                                                       
function tick(){
	if(gameMD === 0){
		says.visible = false
	}
	if(gameMD === 1){
		says.visible = false
	}
	if(gameMD === 2){
		says.visible = false
	}
	if(gameMD===1 && dx>=ww && con.position.y <= 25){
		con.rotation.z += dx;
		con.position.x -=rr*dx;
		HP.position.x -=rr*dx;
		p1.position.x -=rr*dx;
		p20.position.x -=rr*dx;
		HP.position.y +=ss;
		p1.position.y +=ss;
		p20.position.y +=ss;
		if(p1.position.y>=-14.7+25+1)
			ss=-ss
		if(p1.position.y<=-14.7+25-1)
			ss=-ss
	}
	else if(gameMD===1 && dx>=ww &&	p1.position.y<=-14.7+25+5 && p1.position.y>=-14.7+25 ){
		con.rotation.z += dx;
		con.position.x -=rr*dx;
		HP.position.x -=rr*dx;
		p1.position.x -=rr*dx;
		p20.position.x -=rr*dx;
		con.position.y -=rr*dx;
		HP.position.y -=rr*dx;
		p1.position.y -=rr*dx;
		p20.position.y -=rr*dx;
		
	}
	else if(gameMD===1 && ww ==! world2D.sl02.value*0.002 ){
		ww = world2D.sl02.value*0.002
	}
	else if(gameMD===1 && kk ==! 0.01*world2D.sl01.value* world2D.sl01.value){
		console.log(kk)
		kk = 0.01*world2D.sl01.value* world2D.sl01.value;
		dx = kk*Math.PI/180;
	}

	else if(gameMD===1){
		HP.scale.x = 1-(dx/ww)
		HP.position.y +=ss;
		p1.position.y +=ss;
		p20.position.y +=ss;
		con.rotation.z += dx;
		dx+=0.0001
		if(p1.position.y>=-14.7+25+5+1)
			ss=-ss
		if(p1.position.y<=-14.7+25+5-1)
			ss=-ss
	}
	else if(gameMD === 2 && dx >= 0){
		HP.position.y +=ss;
		p1.position.y +=ss;
		p20.position.y +=ss;
		con.rotation.z += dx;
		dx-=0.0005
		if(p1.position.y>=-14.7+25+5+1)
			ss=-ss
		if(p1.position.y<=-14.7+25+5-1)
			ss=-ss

	}
	else if(gameMD === 2 && dx <= 0 && HP.scale.x <= 1){
		ss = 0.06
		HP.position.y +=ss;
		p1.position.y +=ss;
		p20.position.y +=ss;
		
		HP.scale.x +=0.01
	
		if(p1.position.y>=-14.7+25+5+1)
			ss=-ss
		if(p1.position.y<=-14.7+25+5-1)
			ss=-ss

	}
	else if(gameMD === 2 &&  HP.scale.x >= 1){
		ss=0.3;
		p20.position.y=con.position.y-14.7
		p1.position.y=con.position.y-14.7
		HP.position.y=con.position.y+2-14.7
		
		
	}
	else if(con.position.y >= 25){
		kk = 0.01*world2D.sl01.value* world2D.sl01.value;
		dx = kk*Math.PI/180;
		ww = world2D.sl02.value*0.002;

	}

	if(world2D.ch01.checked == es && p1.position.y >= -14.7+25+5 &&  p1.position.x <= con.position.x -5.5 && p1.position.x >= con.position.x -15.5){
		p1.position.y +=0.2 
		p20.position.y +=0.2
		HP.position.y +=0.2
		p1.position.x -=1
		p20.position.x -=1
		HP.position.x -=1
	}
	
	else if(world2D.ch01.checked == es && p1.position.y >= 7.5){
		p1.position.y -=0.4 
		p20.position.y -=0.4
		HP.position.y -=0.4
		p1.position.x -=1
		p20.position.x -=1
		HP.position.x -=1
	}

	else if(world2D.ch01.checked == es ){
		p1.position.x -=1
		p20.position.x -=1
		HP.position.x -=1
		HP.position.y +=ss;
		p1.position.y +=ss;
		p20.position.y +=ss;
		if(p1.position.y>=7.5+1)
			ss=-ss
		if(p1.position.y<=7.5-1)
			ss=-ss
	}
	
	if(world2D.ch02.checked == es ){
		dx=ww
	}

	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function clickBtn(e){
	console.log(e.target.parent.name);
	str = e.target.parent.name
	if(str === 'btn01'){
		gameMD = 1
		if(gameMD===1 && dx>=kk*Math.PI/180+0.0001){
			dx=dx+0.01
		}
	}
	else if(str === 'btn02'){
		gameMD = 2
	}
	else if(str === 'btnRight'){
		gameMD = 0
		con.position.x +=1;
		HP.position.x +=1;
		p1.position.x +=1;
		p20.position.x +=1;
	}
	else if(str === 'btnLeft'){
		gameMD = 0
		con.position.x -=1;
		HP.position.x -=1;
		p1.position.x -=1;
		p20.position.x -=1;
	}
	else if(str === 'btnDown'){
		gameMD = 0
		con.position.z +=1;
		HP.position.z +=1;
		p1.position.z +=1;
		p20.position.z +=1;
	}
	else if(str === 'btnUp'){
		gameMD = 0
		con.position.z -=1;
		HP.position.z -=1;
		p1.position.z -=1;
		p20.position.z -=1;
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




