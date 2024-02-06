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
var about0,about1,about2,about3,about4,about5;
var stopsign,winsign,losesign;
var hero,boss,coin,b1,b2,b3;
var rr=20;
var theta=0;
var omega=0.2;
var dt=0.1;
var bossvx,bossvz;
var disx1 , disz1 ;
var disx2 , disz2 ;
var disx3 , disz3 ;
var disxcoin , diszcoin ;
var d1,d2,d3,dcoin;
var tforcoin=0;
var gameMDforcoin=0;
var gameMD=0;
var score=0;
var chance1=1;
var invinciblemode=0,invincible=300;
var chance2=1;
var freezemode=0,freeze=300;
//B.定義init
function init(){
	
	//物件
	about0 = new TEACHER.ObjTextPlane(200,20,"154706呂育尚 期末專題",'z',0xBB3D00,0x00ffff);
	about1 = new TEACHER.ObjTextPlane(240,20,"方向控制藍圈主角",'z',0xBB3D00,0x00ffff);
	about2 = new TEACHER.ObjTextPlane(240,20,"碰黃圈得一分，得十分贏",'z',0xBB3D00,0x00ffff);
	about3 = new TEACHER.ObjTextPlane(240,20,"碰白圈出局(紅圈可碰)",'z',0xBB3D00,0x00ffff);
	about4 = new TEACHER.ObjTextPlane(240,20,"技能可持續五秒",'z',0xBB3D00,0x00ffff);
	about5 = new TEACHER.ObjTextPlane(240,20,"無敵星可暫停，冰凍術不行",'z',0xBB3D00,0x00ffff);
	stopsign = new TEACHER.ObjTextPlane(100,20,"-已暫停-",'z',0xff0000,0xffdc35);
	winsign = new TEACHER.ObjTextPlane(100,20,'恭喜勝利!🥳','z',0xFFFF6F,0x5151A2);
	losesign = new TEACHER.ObjTextPlane(100,20,'失敗了...','z',0xFFFF6F,0x5151A2);
	hero = new TEACHER.ObjCylinder(5,1,0x0000FF,false,'y',0);
	boss = new TEACHER.ObjCylinder(10,1,0xFF0000,false,'y',0);
	coin = new TEACHER.ObjCylinder(3,1,0xFFFF00,false,'y',0);
	b1   = new TEACHER.ObjCylinder(5,1,0xFFFFFF,false,'y',0);
	b2   = new TEACHER.ObjCylinder(5,1,0xFFFFFF,false,'y',0);
	b3   = new TEACHER.ObjCylinder(5,1,0xFFFFFF,false,'y',0);

	hero.position.y=boss.position.y=coin.position.y=0.5;

	hero.position.x=hero.position.z=45;
	boss.position.x=boss.position.z=-35;

	about0.position.z=-50;
	about1.position.z=about2.position.z=about3.position.z=about4.position.z=about5.position.z=stopsign.position.z=winsign.position.z=losesign.position.z=50;
	about0.position.y=60;
	about1.position.y=40;
	about2.position.y=20;
	about3.position.y=0;
	about4.position.y=-20;
	about5.position.y=-40;
	stopsign.position.y=40;
	winsign.position.y=40;
	losesign.position.y=-30;
	

	

	scene.add(hero).add(boss).add(coin).add(about0).add(about1).add(about2).add(about3).add(about4).add(about5).add(stopsign).add(winsign).add(losesign);
	scene.add(b1).add(b2).add(b3);

	coin.visible=false;
	stopsign.visible=false;
	winsign.visible=false;
	losesign.visible=false;

	//控制
	world2D.sl01.setLabel('得分');
	world2D.sl01.maximum=10;
	world2D.sl01.minimum=0;
	world2D.sl01.value=0;


	world2D.sl02.setLabel('無敵星秒數');
	world2D.sl02.maximum=5;
	world2D.sl02.minimum=0;
	world2D.sl02.vaalue=5;
	world2D.sl02.digitN=1;



	world2D.ch01.setLabel('開始；暫停/繼續');
	world2D.ch01.checked=true;

	
	world2D.btn01.setLabel('無敵星');
	world2D.btn02.setLabel('冰凍術');

	

	

	world2D.btnUp.on('click',clickbtn);
	world2D.btnDown.on('click',clickbtn);
	world2D.btnLeft.on('click',clickbtn);
	world2D.btnRight.on('click',clickbtn);
	world2D.btn01.on('click',clickbtn);
	world2D.btn02.on('click',clickbtn);
	


	//壞人速度
	bossvx = 4/5*(Math.random()-0.5);
	bossvz = 4/5*(Math.random()-0.5);
	


	world3D.cameraTheta=1.3;
	world2D.slCameraRR.value=200;

	

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){

	world2D.sl01.value=score;
	world2D.sl02.value=(invincible/60);


	//暫停/繼續；開始
	if(world2D.ch01.checked===true && world2D.sl01.value!==10 && gameMD!==-1 && gameMD!==0) {
		gameMD=0
	}else if(world2D.ch01.checked===false && world2D.sl01.value!==10 && gameMD!==-1 && gameMD!==1) {
		gameMD=1
	}


	if(gameMD===0) {
		world3D.cameraTheta=1.3;
		world2D.slCameraRR.value=200;
		world3D.cameraPhi=0.025;
		
		if(about1.visible===false) {
			stopsign.visible=true;
		}
			
	}
	if(gameMD===1){
		about1.visible=about2.visible=about3.visible=about4.visible=about5.visible=false;
		world3D.cameraTheta=0;
		world2D.slCameraRR.value=130;
		world3D.cameraPhi=0.025;
		stopsign.visible=false;
	}
	
	//dt
	if(gameMD===1 && freezemode ===0){
		theta+=omega*dt;
	}
	//小羅羅圓周
	b1.position.x=(rr*Math.cos(theta-(2*Math.PI)/3)+boss.position.x);
	b1.position.z=(rr*Math.sin(theta-(2*Math.PI)/3)+boss.position.z);

	b2.position.x=(rr*Math.cos(theta)+boss.position.x);
	b2.position.z=(rr*Math.sin(theta)+boss.position.z);

	b3.position.x=(rr*Math.cos(theta+(2*Math.PI)/3)+boss.position.x);
	b3.position.z=(rr*Math.sin(theta+(2*Math.PI)/3)+boss.position.z);

	//壞人移動&反彈
	if(gameMD===1 && freezemode ===0){
		boss.position.x+=bossvx;
		boss.position.z+=bossvz;
	}
	if(boss.position.x<-40 && bossvx<0) {
		bossvx*=-1	
	}else if(boss.position.x>40 && bossvx>0) {
		bossvx*=-1
	}
	if(boss.position.z<-40 && bossvz<0) {
		bossvz*=-1
	}else if(boss.position.z>40 && bossvz>0) {
		bossvz*=-1
	}
	//冰凍
	if(freezemode===1) {
		if(freeze>0) {
			freeze-=1;
		}else {
			freezemode=0;
		}
	}



	//主角和其他的距離
	if(hero.position.x>b1.position.x) {
		disx1 = hero.position.x-b1.position.x
	}else {
		disx1 = b1.position.x-hero.position.x
	}
	if(hero.position.z>b1.position.z) {
		disz1 = hero.position.z-b1.position.z
	}else {
		disz1 = b1.position.z-hero.position.z
	}
	if(hero.position.x>b2.position.x) {
		disx2 = hero.position.x-b2.position.x
	}else {
		disx2 = b2.position.x-hero.position.x
	}
	if(hero.position.z>b2.position.z) {
		disz2 = hero.position.z-b2.position.z
	}else {
		disz2 = b2.position.z-hero.position.z
	}
	if(hero.position.x>b3.position.x) {
		disx3 = hero.position.x-b3.position.x
	}else {
		disx3 = b3.position.x-hero.position.x
	}
	if(hero.position.z>b3.position.z) {
		disz3 = hero.position.z-b3.position.z
	}else {
		disz3 = b3.position.z-hero.position.z
	}
	if(hero.position.x>coin.position.x) {
		disxcoin = hero.position.x-coin.position.x
	}else {
		disxcoin = coin.position.x-hero.position.x
	}
	if(hero.position.z>coin.position.z) {
		diszcoin = hero.position.z-coin.position.z
	}else {
		diszcoin = coin.position.z-hero.position.z
	}

	
	d1=Math.sqrt(disx1*disx1 + disz1*disz1)
	d2=Math.sqrt(disx2*disx2 + disz2*disz2)
	d3=Math.sqrt(disx3*disx3 + disz3*disz3)
	dcoin=Math.sqrt(disxcoin*disxcoin + diszcoin*diszcoin)
	
	


	//錢錢
	if(gameMD===1){

		if(coin.visible === false) {
			tforcoin+=1
		}
		if(tforcoin%97===0 && coin.visible === false) {
			coin.position.x=100*(Math.random()-0.5);
			coin.position.z=100*(Math.random()-0.5);
			coin.visible = true
			gameMDforcoin = 1
			tforcoin = 0
		}
		if(gameMDforcoin === 1){
			if(dcoin<8 || dcoin===8){
				score+=1
				coin.visible=false
				gameMDforcoin=0
			}
		}
	}

	//變強
	if(score>4) {
		if(dt<0.9) {
			dt+=0.005
		}
		if(rr<30) {
			rr+=0.1875
		}
	}
		
	//贏
	if(world2D.sl01.value===10) {
		gameMD=2
	}

	if(gameMD===2) {
		world3D.cameraTheta=1.3;
		world2D.slCameraRR.value=200;
		world3D.cameraPhi=0.025;
		winsign.visible=true;
	}
	//輸
	if(invinciblemode===0) {
		if(d1<10 || d1===10 || d2<10 || d2===10 || d3<10 || d3===10) {
			gameMD=-1
		}
	}else {
		if(invincible>0) {
			invincible-=1
			world2D.sl02.value-=(1/60)
		}else {
			invinciblemode=0
			chance1=0
		}
		
	}
	if(gameMD===-1) {
		world3D.cameraTheta=1.3;
		world2D.slCameraRR.value=200;
		world3D.cameraPhi=0.025;
		losesign.visible=true;
	}


 

	
	

	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

//監聽
function clickbtn (e){

	
	var str = e.target.parent.name
	if(gameMD===1) {
		if(str === 'btnUp' && hero.position.z>-45){
			hero.position.z-=5;
		}else if(str === 'btnDown' && hero.position.z<45){
			hero.position.z+=5;
		}else if(str === 'btnLeft' && hero.position.x>-45){
			hero.position.x-=5;
		}else if(str === 'btnRight' && hero.position.x<45){
			hero.position.x+=5;
		}else if((str === 'btn01') && chance1 === 1) {
			if(invinciblemode===0) {
				invinciblemode=1;
			}else if(invinciblemode===1) {
				invinciblemode=0;
			}
		}else if((str === 'btn02') && chance2 === 1) {
			freezemode=1;
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
