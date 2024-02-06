'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//------------老師作的萬用半成品(2020.12.01)-----------//

//-------------------開始做我的動畫-------------------//
//world2D.btn    .setLabel("     ")代表按鈕改名//
/*world2D.btn    .on('事件',執行什麼函數)
並將按鈕名稱作為自變數傳給函數
click   點擊
*/
//world2D.sl   .setLabel('   ')//
//world2D.sl   .minimum =      //
//world2D.sl   .maximum =      //
//world2D.sl   .value =       //
//world2D.ch   .setLabel('     ')//
//world2D.ch   .checked 為 bool//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var chiCountNumber=10000
var dt=1/(fps*chiCountNumber)
var b1;
var b2;
var b3;
var G=100000;
var ram;
var GMmrn=2;

var mod_btn02_st_e='3m';

var resetb1={m:0,xx:0,yy:0,zz:0,vx:0,vy:0,vz:0};
var resetb2={m:0,xx:0,yy:0,zz:0,vx:0,vy:0,vz:0};
var resetb3={m:0,xx:0,yy:0,zz:0,vx:0,vy:0,vz:0};

var L1;
var L2;
var L3;

var allvcx=0;
var allvcy=0;
var allvcz=0;

//B.定義init
function init(){
	//console.log("hello")
	b1=new TEACHER.ObjSphere(3,0xff0000)
	b2=new TEACHER.ObjSphere(3,0x00ff00)
	b3=new TEACHER.ObjSphere(3,0x0000ff)
	L1=new TEACHER.Line(0xff0000,1,100000);
	L2=new TEACHER.Line(0x00ff00,1,100000);
	L3=new TEACHER.Line(0x0000ff,1,100000);

	b1.m=1
	b2.m=1.4
	b3.m=1

	b1.vx=0
	b1.vy=9
	b1.vz=2
	b2.vx=0
	b2.vy=-8
	b2.vz=0
	b3.vx=2
	b3.vy=7
	b3.vz=0

	b1.xx=19
	b1.yy=11
	b1.zz=26
	b2.xx=11
	b2.yy=-23
	b2.zz=10
	b3.xx=10
	b3.yy=50
	b3.zz=-8

	scene.add(b1).add(b2).add(b3);
	scene.add(L1).add(L2).add(L3);

	ground.visible=false
	skyBox.visible=false
	GMmrn++;
	world2D.slCameraRR.value=200
	world2D.btn01.setLabel("restart");
	world2D.btn01.on('click',btn01_20210619_e);

	world2D.btn02.setLabel('切換');
	world2D.btn02.on('click',btn02_20210619_e);
	world2D.sl01.setLabel('紅球質量')
	world2D.sl02.setLabel('綠球質量')
	world2D.sl03.setLabel('藍球質量')

	world2D.sl01.minimum=0.01;
	world2D.sl01.maximum=6;
	world2D.sl02.minimum=0.01;
	world2D.sl02.maximum=6;
	world2D.sl03.minimum=0.01;
	world2D.sl03.maximum=6;

	world2D.sl01.value=resetb1.m=b1.m;
	resetb1.vx=b1.vx;
	resetb1.vy=b1.vy;
	resetb1.vz=b1.vz;
	resetb1.xx=b1.xx;
	resetb1.yy=b1.yy;
	resetb1.zz=b1.zz;

	world2D.sl02.value=resetb2.m=b2.m;
	resetb2.vx=b2.vx;
	resetb2.vy=b2.vy;
	resetb2.vz=b2.vz;
	resetb2.xx=b2.xx;
	resetb2.yy=b2.yy;
	resetb2.zz=b2.zz;

	world2D.sl03.value=resetb3.m=b3.m;
	resetb3.vx=b3.vx;
	resetb3.vy=b3.vy;
	resetb3.vz=b3.vz;
	resetb3.xx=b3.xx;
	resetb3.yy=b3.yy;
	resetb3.zz=b3.zz;

	world2D.ch01.setLabel('路徑');
	//world2D.ch01.visible=false;
	world2D.ch02.setLabel('跟隨');
	//world2D.ch02.visible=false;
	world2D.btnUp.visible=false;
	world2D.btnDown.visible=false;
	world2D.btnRight.visible=false;
	world2D.btnLeft.visible=false;

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
	for(var i=0;i<chiCountNumber;i++){
		ram=dt*(G*b2.m*((b1.xx-b2.xx)**2+(b1.yy-b2.yy)**2+(b1.zz-b2.zz)**2)**(-0.5*GMmrn))
		b1.vx-=ram*(b1.xx-b2.xx)
		b1.vy-=ram*(b1.yy-b2.yy)
		b1.vz-=ram*(b1.zz-b2.zz)
		ram=dt*(G*b3.m*((b1.xx-b3.xx)**2+(b1.yy-b3.yy)**2+(b1.zz-b3.zz)**2)**(-0.5*GMmrn))
		b1.vx-=ram*(b1.xx-b3.xx)
		b1.vy-=ram*(b1.yy-b3.yy)
		b1.vz-=ram*(b1.zz-b3.zz)
		ram=dt*(G*b1.m*((b2.xx-b1.xx)**2+(b2.yy-b1.yy)**2+(b2.zz-b1.zz)**2)**(-0.5*GMmrn))
		b2.vx-=ram*(b2.xx-b1.xx)
		b2.vy-=ram*(b2.yy-b1.yy)
		b2.vz-=ram*(b2.zz-b1.zz)
		ram=dt*(G*b3.m*((b2.xx-b3.xx)**2+(b2.yy-b3.yy)**2+(b2.zz-b3.zz)**2)**(-0.5*GMmrn))
		b2.vx-=ram*(b2.xx-b3.xx)
		b2.vy-=ram*(b2.yy-b3.yy)
		b2.vz-=ram*(b2.zz-b3.zz)
		ram=dt*(G*b1.m*((b3.xx-b1.xx)**2+(b3.yy-b1.yy)**2+(b3.zz-b1.zz)**2)**(-0.5*GMmrn))
		b3.vx-=ram*(b3.xx-b1.xx)
		b3.vy-=ram*(b3.yy-b1.yy)
		b3.vz-=ram*(b3.zz-b1.zz)
		ram=dt*(G*b2.m*((b3.xx-b2.xx)**2+(b3.yy-b2.yy)**2+(b3.zz-b2.zz)**2)**(-0.5*GMmrn))
		b3.vx-=ram*(b3.xx-b2.xx)
		b3.vy-=ram*(b3.yy-b2.yy)
		b3.vz-=ram*(b3.zz-b2.zz)
		b1.xx+=b1.vx*dt
		b1.yy+=b1.vy*dt
		b1.zz+=b1.vz*dt
		b2.xx+=b2.vx*dt
		b2.yy+=b2.vy*dt
		b2.zz+=b2.vz*dt
		b3.xx+=b3.vx*dt
		b3.yy+=b3.vy*dt
		b3.zz+=b3.vz*dt
	}


	if(mod_btn02_st_e==='redballxyz'){
		resetb1.xx=world2D.sl01.value;
		resetb1.yy=world2D.sl02.value;
		resetb1.zz=world2D.sl03.value;
	}else if(mod_btn02_st_e==='redballv'){
		resetb1.vx=world2D.sl01.value;
		resetb1.vy=world2D.sl02.value;
		resetb1.vz=world2D.sl03.value;
	}else if(mod_btn02_st_e==='greenballxyz'){
		resetb2.xx=world2D.sl01.value;
		resetb2.yy=world2D.sl02.value;
		resetb2.zz=world2D.sl03.value;
	}else if(mod_btn02_st_e==='greenballv'){
		resetb2.vx=world2D.sl01.value;
		resetb2.vy=world2D.sl02.value;
		resetb2.vz=world2D.sl03.value;
	}else if(mod_btn02_st_e==='blueballxyz'){
		resetb3.xx=world2D.sl01.value;
		resetb3.yy=world2D.sl02.value;
		resetb3.zz=world2D.sl03.value;
	}else if(mod_btn02_st_e==='blueballv'){
		resetb3.vx=world2D.sl01.value;
		resetb3.vy=world2D.sl02.value;
		resetb3.vz=world2D.sl03.value;
	}else if(mod_btn02_st_e==='3m'){
		resetb1.m=world2D.sl01.value;
		resetb2.m=world2D.sl02.value;
		resetb3.m=world2D.sl03.value;
	}

	var vcx=(b1.xx*b1.m+b2.xx*b2.m+b3.xx*b3.m)/(b1.m+b2.m+b3.m);
	var vcy=(b1.yy*b1.m+b2.yy*b2.m+b3.yy*b3.m)/(b1.m+b2.m+b3.m);
	var vcz=(b1.zz*b1.m+b2.zz*b2.m+b3.zz*b3.m)/(b1.m+b2.m+b3.m);
	if(world2D.ch02.checked){
		b1.xx-=vcx;
		b1.yy-=vcy;
		b1.zz-=vcz;
		b2.xx-=vcx;
		b2.yy-=vcy;
		b2.zz-=vcz;
		b3.xx-=vcx;
		b3.yy-=vcy;
		b3.zz-=vcz;
		L1.position.x-=vcx
		L1.position.y-=vcy
		L1.position.z-=vcz
		L2.position.x-=vcx
		L2.position.y-=vcy
		L2.position.z-=vcz
		L3.position.x-=vcx
		L3.position.y-=vcy
		L3.position.z-=vcz
		allvcx+=vcx;
		allvcy+=vcy;
		allvcz+=vcz;
	}

	b1.position.x=b1.xx
	b1.position.y=b1.yy
	b1.position.z=b1.zz
	b2.position.x=b2.xx
	b2.position.y=b2.yy
	b2.position.z=b2.zz
	b3.position.x=b3.xx
	b3.position.y=b3.yy
	b3.position.z=b3.zz

	L1.addPoint(b1.xx+allvcx,b1.yy+allvcy,b1.zz+allvcz);
	L2.addPoint(b2.xx+allvcx,b2.yy+allvcy,b2.zz+allvcz);
	L3.addPoint(b3.xx+allvcx,b3.yy+allvcy,b3.zz+allvcz);
	L1.update();
	L2.update();
	L3.update();
	L1.visible=L2.visible=L3.visible=world2D.ch01.checked;
	console.log(b2.position)
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function btn01_20210619_e(){
	b1.m=resetb1.m;
	b1.xx=resetb1.xx;
	b1.yy=resetb1.yy;
	b1.zz=resetb1.zz;
	b1.vx=resetb1.vx;
	b1.vy=resetb1.vy;
	b1.vz=resetb1.vz;

	b2.m=resetb2.m;
	b2.xx=resetb2.xx;
	b2.yy=resetb2.yy;
	b2.zz=resetb2.zz;
	b2.vx=resetb2.vx;
	b2.vy=resetb2.vy;
	b2.vz=resetb2.vz;

	b3.m=resetb3.m;
	b3.xx=resetb3.xx;
	b3.yy=resetb3.yy;
	b3.zz=resetb3.zz;
	b3.vx=resetb3.vx;
	b3.vy=resetb3.vy;
	b3.vz=resetb3.vz;
	L1.clear();
	L2.clear();
	L3.clear();
}

function btn02_20210619_e(){
	if(mod_btn02_st_e==='3m'){
		mod_btn02_st_e='redballxyz';
		world2D.sl01.minimum=-80;
		world2D.sl01.maximum=80;
		world2D.sl02.minimum=-80;
		world2D.sl02.maximum=80;
		world2D.sl03.minimum=-80;
		world2D.sl03.maximum=80;
		world2D.sl01.value=resetb1.xx;
		world2D.sl02.value=resetb1.yy;
		world2D.sl03.value=resetb1.zz;
		world2D.sl01.setLabel('reset_紅球_x')
		world2D.sl02.setLabel('reset_紅球_y')
		world2D.sl03.setLabel('reset_紅球_z')
	}else if(mod_btn02_st_e==='redballxyz'){
		mod_btn02_st_e='redballv';
		world2D.sl01.value=resetb1.vx;
		world2D.sl02.value=resetb1.vy;
		world2D.sl03.value=resetb1.vz;
		world2D.sl01.setLabel('reset_紅球_vx')
		world2D.sl02.setLabel('reset_紅球_vy')
		world2D.sl03.setLabel('reset_紅球_vz')
	}else if(mod_btn02_st_e==='redballv'){
		mod_btn02_st_e='greenballxyz';
		world2D.sl01.value=resetb2.xx;
		world2D.sl02.value=resetb2.yy;
		world2D.sl03.value=resetb2.zz;
		world2D.sl01.setLabel('reset_綠球_x')
		world2D.sl02.setLabel('reset_綠球_y')
		world2D.sl03.setLabel('reset_綠球_z')
	}else if(mod_btn02_st_e==='greenballxyz'){
		mod_btn02_st_e='greenballv';
		world2D.sl01.value=resetb2.vx;
		world2D.sl02.value=resetb2.vy;
		world2D.sl03.value=resetb2.vz;
		world2D.sl01.setLabel('reset_綠球_vx')
		world2D.sl02.setLabel('reset_綠球_vy')
		world2D.sl03.setLabel('reset_綠球_vz')
	}else if(mod_btn02_st_e==='greenballv'){
		mod_btn02_st_e='blueballxyz';
		world2D.sl01.value=resetb3.xx;
		world2D.sl02.value=resetb3.yy;
		world2D.sl03.value=resetb3.zz;
		world2D.sl01.setLabel('reset_藍球_x')
		world2D.sl02.setLabel('reset_藍球_y')
		world2D.sl03.setLabel('reset_藍球_z')
	}else if(mod_btn02_st_e==='blueballxyz'){
		mod_btn02_st_e='blueballv';
		world2D.sl01.value=resetb3.vx;
		world2D.sl02.value=resetb3.vy;
		world2D.sl03.value=resetb3.vz;
		world2D.sl01.setLabel('reset_藍球_vx')
		world2D.sl02.setLabel('reset_藍球_vy')
		world2D.sl03.setLabel('reset_藍球_vz')
	}else if(mod_btn02_st_e==='blueballv'){
		mod_btn02_st_e='3m'
		world2D.sl01.minimum=0.01;
		world2D.sl01.maximum=6;
		world2D.sl02.minimum=0.01;
		world2D.sl02.maximum=6;
		world2D.sl03.minimum=0.01;
		world2D.sl03.maximum=6;
		world2D.sl01.value=resetb1.m;
		world2D.sl02.value=resetb2.m;
		world2D.sl03.value=resetb3.m;
		world2D.sl01.setLabel('紅球質量')
		world2D.sl02.setLabel('綠球質量')
		world2D.sl03.setLabel('藍球質量')
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
//addPoint
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
}
//clear
TEACHER.Points.prototype.clear = function(){
	let tp=this;
	tp.positions=[];
	tp.nnNow=0;
	tp.update();
}
//setPoint
TEACHER.Points.prototype.setPoint = function(_n, _x , _y , _z){
	let tp=this;
	if(_n>tp.nnMax){
		log('輸入的n值大於TEACHER.Points 最大點數 nnMax');
	}else if(_n>tp.nnNow){
		log('輸入的n值大於TEACHER.Points 現在點數 nnNow');
	}else{
		tp.positions[_n*3]=_x;	
		tp.positions[_n*3+1]=_y;	
		tp.positions[_n*3+2]=_z;	
	}
}
//getPoint
TEACHER.Points.prototype.getPoint = function(_n){
	let tp=this;
	let pt = new THREE.Vector3();
	if(_n>tp.nnMax){
		log('輸入的n值大於TEACHER.Points 最大點數 nnMax');
	}else if(_n>tp.nnNow){
		log('輸入的n值大於TEACHER.Points 現在點數 nnNow');
	}else{
		pt.x=tp.positions[_n*3];	
		pt.y=tp.positions[_n*3+1];	
		pt.z=tp.positions[_n*3+2];	
	}
	return pt;
}
//update
TEACHER.Points.prototype.update = function(){
	let tp=this;
	tp.geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( tp.positions, 3 ) );
	tp.geometry.computeBoundingSphere();
	tp.geometry.attributes.position.needsUpdate = true;
}

//線條系統
/**
 * 老師幫你寫的線條系統，繼承自 THREE.Line2(可設線寬)
 * @constructor TEACHER.Line
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {number} _lineWidth 線寬，預設1 
 * @param {number} _nnMax 最大點數，預設10000 
 */
TEACHER.Line=function(_color , _lineWidth , _nnMax){
	let ln=this;
	ln.nnMax=_nnMax||10000;
	ln.lineWidth=_lineWidth||1;
	ln.nnNow=0;
	var material = new THREE.LineMaterial( { color: _color||0xFF00FF, linewidth: _lineWidth||1 } );
	material.resolution.set( window.innerWidth, window.innerHeight );
	
	
	ln.geometry = new THREE.LineGeometry();
	ln.positions = new Float32Array(ln.nnMax*3);
	ln.geometry.setPositions( ln.positions);

	THREE.Line2.call(this, ln.geometry, material );
}
TEACHER.Line.prototype = Object.create(THREE.Line2.prototype);
TEACHER.Line.prototype.constructor = TEACHER.Line;
//addPoint
TEACHER.Line.prototype.addPoint = function(_x , _y , _z){
	let ln=this;
	if(ln.nnNow<ln.nnMax){
		ln.nnNow++;
	}else{
		log('TEACHER.Line 到達最大點數');
		for(var i=0;i<ln.nnMax-1;i++){
			ln.positions[i*3]=ln.positions[i*3+3];	
			ln.positions[i*3+1]=ln.positions[i*3+4];	
			ln.positions[i*3+2]=ln.positions[i*3+5];	
		}
	}
	for(var i=ln.nnNow;i<=ln.nnMax;i++){
		ln.positions[(i-1)*3] = _x;
		ln.positions[(i-1)*3+1] = _y;
		ln.positions[(i-1)*3+2] = _z;
	}
	
}
//clear
TEACHER.Line.prototype.clear = function(){
	let ln=this;
	ln.positions=new Float32Array(ln.nnMax*3);;
	ln.nnNow=0;
	ln.update();
}
//setPoint
TEACHER.Line.prototype.setPoint = function(_n , _x , _y , _z){
	let ln=this;
	if(_n>ln.nnMax){
		log('輸入的n值大於TEACHER.Line 最大點數 nnMax');
	}else if(_n>ln.nnNow){
		log('輸入的n值大於TEACHER.Line 現在點數 nnNow');
	}else{
		ln.positions[_n*3]=_x;	
		ln.positions[_n*3+1]=_y;	
		ln.positions[_n*3+2]=_z;	
	}
}
//getPoint
TEACHER.Line.prototype.getPoint = function(_n){
	let ln=this;
	let pt = new THREE.Vector3();
	if(_n>ln.nnMax){
		log('輸入的n值大於TEACHER.Line 最大點數 nnMax');
	}else if(_n>ln.nnNow){
		log('輸入的n值大於TEACHER.Line 現在點數 nnNow');
	}else{
		pt.x=ln.positions[_n*3];	
		pt.y=ln.positions[_n*3+1];	
		pt.z=ln.positions[_n*3+2];	
	}
	return pt;
}
//update
TEACHER.Line.prototype.update = function(){
	let ln=this;
	let pt = ln.getPoint(ln.nnNow-1);
	for(var i=ln.nnNow;i<=ln.nnMax;i++){
		ln.positions[i*3] = pt.x;
		ln.positions[i*3+1] = pt.y;
		ln.positions[i*3+2] = pt.z;
	}
	ln.geometry.setPositions( ln.positions);
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
	let ratio=Math.round(Math.log2(_w/_h));
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

//曲線圖
/**
 * 老師幫你寫的曲線圖，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjGraph
 * @param {number} _xMin x最小值，預設0
 * @param {number} _xMax x最大值，預設10
 * @param {number} _yMin y最小值，預設0
 * @param {number} _yMax y最大值，預設10
 * @param {number} _frameColor 框線顏色，預設 0xffffff
 * @param {number} _lineColor 曲線顏色，預設 0xffff00
 * @param {number} _nnMax 最大點數，預設10000 (TEACHER.Line)
 */
TEACHER.ObjGraph=function(_xMin,_xMax,_yMin,_yMax,_frameColor,_lineColor,_nnMax){
	let t=this;
	t.objCon=new THREE.Object3D();
	
	//var
	t._xMin = _xMin||0;
	t._xMax = _xMax||10;
	t._yMin = _yMin||0;
	t._yMax = _yMax||10;
	t.divXN=5;
	t.divYN=4;

	//frame	
	t.frameMat = new THREE.LineBasicMaterial( { color: _frameColor||0xffffff } );
	var points = [];
	for(var ix=0;ix<=t.divXN;ix++){
		points.push( new THREE.Vector3( -50+ix*20, 0, 0 ) );
		points.push( new THREE.Vector3( -50+ix*20, 50, 0 ) );
	}
	for(var iy=0;iy<=t.divYN;iy++){
		points.push( new THREE.Vector3( -50, iy*12.5, 0 ) );
		points.push( new THREE.Vector3( 50, iy*12.5, 0 ) );
	}
	let geo = new THREE.BufferGeometry().setFromPoints( points );
	t.frame = new THREE.LineSegments(geo, t.frameMat);
	t.objCon.add(t.frame);

	//tick label
	t.labelXMin = new TEACHER.ObjTextPlane(20,5,String(t._xMin),"z",_frameColor||0xffffff);
	t.labelXMin.position.x=-50;
	t.labelXMin.position.y=-3;
	t.objCon.add(t.labelXMin);
	t.labelXMax = new TEACHER.ObjTextPlane(20,5,String(t._xMax),"z",_frameColor||0xffffff);
	t.labelXMax.position.x=50;
	t.labelXMax.position.y=-3;
	t.objCon.add(t.labelXMax);
	t.labelYMin = new TEACHER.ObjTextPlane(20,5,String(t._yMin),"z",_frameColor||0xffffff);
	t.labelYMin.position.x=-53;
	t.labelYMin.position.y=0;
	t.objCon.add(t.labelYMin);
	t.labelYMax = new TEACHER.ObjTextPlane(20,5,String(t._yMax),"z",_frameColor||0xffffff);
	t.labelYMax.position.x=-53;
	t.labelYMax.position.y=50;
	t.objCon.add(t.labelYMax);

	//axes label
	t.labelX = new TEACHER.ObjTextPlane(24,7,"x","z",_frameColor||0xffffff);
	t.labelX.position.x=60;
	t.labelX.position.y=4;
	t.labelX.position.z=1;
	t.labelY = new TEACHER.ObjTextPlane(24,7,"y","z",_frameColor||0xffffff);
	t.labelY.position.x=-60;
	t.labelY.position.y=25;
	t.labelY.position.z=1;
	t.labelY.rotation.z=Math.PI/2;
	t.labelTitle = new TEACHER.ObjTextPlane(40,10,"y-x","z",_frameColor||0xffffff);
	t.labelTitle.position.y=53;
	t.labelTitle.position.z=1;
	t.objCon.add(t.labelX).add(t.labelY).add(t.labelTitle);
	
	//line
	t._lineColor = _lineColor;
	t._nnMax = _nnMax;
	t.line = new TEACHER.Line(t._lineColor||0xffff00 ,2, t._nnMax);
	t.objCon.add(t.line);
	t.changeScale();

	
	THREE.Object3D.call(this);
	t.add(t.objCon);
}
TEACHER.ObjGraph.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjGraph.prototype.constructor = TEACHER.ObjGraph;
//xMin
Object.defineProperty(TEACHER.ObjGraph.prototype, 'xMin', {
    get: function(){
        return this._xMin;
    },
    set: function(value){
		this._xMin = value;
		this.changeScale();
    }
  });
//xMax
Object.defineProperty(TEACHER.ObjGraph.prototype, 'xMax', {
    get: function(){
        return this._xMax;
    },
    set: function(value){
		this._xMax = value;
		this.changeScale();
    }
  });
//yMin
Object.defineProperty(TEACHER.ObjGraph.prototype, 'yMin', {
    get: function(){
        return this._yMin;
    },
    set: function(value){
		this._yMin = value;
		this.changeScale();
    }
  });
//yMax
Object.defineProperty(TEACHER.ObjGraph.prototype, 'yMax', {
    get: function(){
        return this._yMax;
    },
    set: function(value){
		this._yMax = value;
		this.changeScale();
    }
  });
//addPoint
TEACHER.ObjGraph.prototype.addPoint = function(_x , _y){
	let tg=this;
	tg.line.addPoint(_x,_y,0);
	tg.line.update();
}
//clear
TEACHER.ObjGraph.prototype.clear = function(){
	let tg=this;
	tg.line.clear();	
}
//changeScale
TEACHER.ObjGraph.prototype.changeScale = function(){
	let tg=this;
	
	tg.line.scale.x = 100/(tg._xMax-tg._xMin);
	tg.line.scale.y = 50/(tg._yMax-tg._yMin);
	tg.line.position.x=-50-tg._xMin*tg.line.scale.x;
	tg.line.position.y=-tg._yMin*tg.line.scale.y;

	tg.labelXMin.setText(tg._xMin);
	tg.labelXMax.setText(tg._xMax);
	tg.labelYMin.setText(tg._yMin);
	tg.labelYMax.setText(tg._yMax);
}
//setLabel
/**
 * @method TEACHER.ObjGraph
 * @param {string} _title 標題，預設 y-x
 * @param {string} _y 標題，預設 y
 * @param {string} _x 標題，預設 x
 */
TEACHER.ObjGraph.prototype.setLabel=function(_title , _y , _x){
	let tg = this;

	tg.labelTitle.setText(_title||'y-x');
	tg.labelY.setText(_y||'y');
	tg.labelX.setText(_x||'x');
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
