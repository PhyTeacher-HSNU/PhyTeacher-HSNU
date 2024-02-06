'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數

var ground1;
var wall1;
var wall2;
var wall3;
var wall4;

var ballA;
var ballB;
var score;

var arrowA;
var arrowV;

var gameover;
var gameover2;
var win;
var win2;
var NAME;
var go;
var rule;

var gg = 3;
var dt = 0.1;

var rr;
var rx;
var rz;

var dx;
var dz;

var gameMD = 2;

var scoreA = 0;

var YES;
var ruleA = 0;
var rainbow = 0;
var aaa = 0;
var bbb = 239;



//B.定義init
function init(){

	logo.position.z = 170;
	logo.position.x = -3;
	logo.rotation.x = -1;
	
	ground1 = new TEACHER.ObjBox(500,2,500,0x999FF9);
	scene.add(ground1);

	wall1 = new TEACHER.ObjBox(2,20,500,0xFFFFDD);
	scene.add(wall1);
	wall1.position.x = -250;
	wall1.position.y = 9;

	wall2 = new TEACHER.ObjBox(2,20,500,0xFFFFDD);
	scene.add(wall2);
	wall2.position.x = 250;
	wall2.position.y = 9;

	wall3 = new TEACHER.ObjBox(500,20,2,0xFFFFDD);
	scene.add(wall3);
	wall3.position.z = 250;
	wall3.position.y = 9;

	wall4 = new TEACHER.ObjBox(500,20,2,0xFFFFDD);
	scene.add(wall4);
	wall4.position.z = -250;
	wall4.position.y = 9;

	ballA = new TEACHER.ObjSphere(10,0x66FFFF);
	scene.add(ballA);
	ballA.visible = true;
	ballA.position.z=200;
	ballA.position.y = 11;

	ballA.vx=0;
	ballA.vy=0;
	ballA.vz=0;

	ballA.ax=0;
	ballA.ay=0;
	ballA.az=0;



	ballB = new TEACHER.ObjSphere(10,0x0066FF);
	scene.add(ballB);
	ballB.visible = true;
	ballB.position.y=11;
	ballB.position.x=220;
	ballB.position.z=-220;


	ballB.vx=0;
	ballB.vy=0;
	ballB.vz=0;

	ballB.ax=0;
	ballB.ay=0;
	ballB.az=0;



	score = new TEACHER.ObjBox(5,5,5,0xFF0000);
	scene.add(score);
	score.visible = true;
	score.position.y = 10;
	score.rotation.x = -1;
	score.rotation.y = -1;
	score.position.x = Math.floor(Math.random()*440-220);
	score.position.z = Math.floor(Math.random()*440-220);


	world2D.btn01.setLabel('視角重置');
	world2D.btn02.setLabel('彩色(◔​∀◔)');
	world2D.ch01.setLabel("輔助箭頭");
	world2D.ch02.setLabel("我不想被追(´;ω;`)");
	world2D.sl01.setLabel("獲得方塊");

	world2D.sl01.minimum = 0;
	world2D.sl01.maximum = 7;
	world2D.sl01.value = 0;

	world2D.ch02.checked = false;

	world2D.btn01.on('click',clickBtn);
	world2D.btn02.on('click',clickBtn);
	world2D.btnUp.on('mousedown',clickBtn);
	world2D.btnDown.on('mousedown',clickBtn);
	world2D.btnLeft.on('mousedown',clickBtn);
	world2D.btnRight.on('mousedown',clickBtn);

	world2D.on('pressup',up2D);

	arrowA = new TEACHER.ObjArrow(1,0xFFFF00);
	arrowV = new TEACHER.ObjArrow(1,0x00FFFF);
	scene.add(arrowA);
	scene.add(arrowV);

	gameover = new TEACHER.ObjTextPlane(400,50,"GAME OVER","Z",0xFFFF00,0x00000F);
	scene.add(gameover);
	gameover.position.y=26;
	gameover.visible=false;

	gameover2 = new TEACHER.ObjTextPlane(80,8,"  你輸了σ`∀´)σ  ","Z",0xFFFFFF);
	scene.add(gameover2);
	gameover2.position.y=10;
	gameover2.position.z=30;
	gameover2.visible=false;

	win = new TEACHER.ObjTextPlane(400,50,"Y O U   W I N","Z",0xFFFF00,0x00000F);
	scene.add(win);
	win.position.y=26;
	win.visible=false;

	win2 = new TEACHER.ObjTextPlane(80,8,"  竟...竟然(°ﾛ°٥)  ","Z",0xFFFFFF);
	scene.add(win2);
	win2.position.y=10;
	win2.position.z=30;
	win2.visible=false;

	NAME = new TEACHER.ObjTextPlane(90,6,"1539 38     蘇歆媛 ","z",0x00000F,);
	scene.add(NAME);
	NAME.position.z = 225;
	NAME.position.x = 10;
	NAME.position.y = 10;
	NAME.rotation.x = -1;
	NAME.visible = true;

	go = new TEACHER.ObjTextPlane(90,6,"點擊任一方向鍵開始","z",0x00000F,);
	scene.add(go);
	go.position.z = 235;
	go.position.x = 10;
	go.position.y = 10;
	go.rotation.x = -1;
	go.visible = true;


	rule = new TEACHER.ObjPicPlane(250,150,pics.rule);
	scene.add(rule);
	rule.rotation.x = 1.5*Math.PI;
	rule.position.y = 20;
	rule.position.z = 230;


	world2D.sl02.visible=false;
	world2D.sl03.visible=false;


	

	
	

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){

	if(ruleA === 0){
		rule.visible = true;
		ballA.visible = false;
		world3D.cameraTarget.z=230;
		world3D.cameraTarget.x=0;
		world2D.slCameraRR.value = 200;
		world3D.cameraTheta = 0;
		world3D.cameraPhi = 0;

	}else if(ruleA ===1){

	rule.visible = false;

	world3D.cameraTarget.z=ballA.position.z+30;
	world3D.cameraTarget.x=ballA.position.x;

	arrowA.visible = world2D.ch01.checked;
	arrowV.visible = world2D.ch01.checked;

	if(rainbow === 0){
		ballA.mat.color.setHex(0x66FFFF);
		ground1.mat.color.setHex(0x999FF9);
		wall1.mat.color.setHex(0xFFFFDD);
		wall2.mat.color.setHex(0xFFFFDD);
		wall3.mat.color.setHex(0xFFFFDD);
		wall4.mat.color.setHex(0xFFFFDD);

	}else if(rainbow === 1){
		ground1.mat.color.setHex(0x999FF9);
		wall1.mat.color.setHex(0xFFFFDD);
		wall2.mat.color.setHex(0xFFFFDD);
		wall3.mat.color.setHex(0xFFFFDD);
		wall4.mat.color.setHex(0xFFFFDD);
		ballA.mat.color.setHSL(aaa,1,0.5);
		
		if(aaa<240 && aaa>=0){
			aaa += 0.01;
		}else if(aaa>240){
			aaa -= 0.01;
		}
		
	}else if(rainbow === 2){
		ballA.mat.color.setHex(0x66FFFF);
		ground1.mat.color.setHSL(bbb,1,0.5);
		wall1.mat.color.setHSL(bbb,1,0.5);
		wall2.mat.color.setHSL(bbb,1,0.5);
		wall3.mat.color.setHSL(bbb,1,0.5);
		wall4.mat.color.setHSL(bbb,1,0.5);

		if(bbb<240 && bbb>=0){
			bbb -= 0.01;
		}else if(bbb<0){
			bbb += 0.01;
		}

	}else if(rainbow === 3){
		ballA.mat.color.setHSL(aaa,1,0.5);
		ground1.mat.color.setHSL(bbb,1,0.5);
		wall1.mat.color.setHSL(bbb,1,0.5);
		wall2.mat.color.setHSL(bbb,1,0.5);
		wall3.mat.color.setHSL(bbb,1,0.5);
		wall4.mat.color.setHSL(bbb,1,0.5);

		if(aaa<240 && aaa>=0){
			aaa += 0.01;
		}else if(aaa>240){
			aaa -= 0.01;
		}

		if(bbb<240 && bbb>=0){
			bbb += 0.01;
		}else if(bbb>240){
			bbb -= 0.01;
		}

	}else if(rainbow === 4){
		ballA.mat.color.setHSL(aaa,1,0.5);
		ground1.mat.color.setHSL(bbb,1,0.5);
		wall1.mat.color.setHSL(bbb,1,0.5);
		wall2.mat.color.setHSL(bbb,1,0.5);
		wall3.mat.color.setHSL(bbb,1,0.5);
		wall4.mat.color.setHSL(bbb,1,0.5);

		if(aaa<240 && aaa>=0){
			aaa += 0.01;
		}else if(aaa>240){
			aaa -= 0.01;
		}

		if(bbb<240 && bbb>=0){
			bbb -= 0.01;
		}else if(bbb<0){
			bbb += 0.01;
		}

	}



	//score

	world2D.sl01.value = scoreA;

	dx = ballA.position.x-score.position.x;
	dz = ballA.position.z-score.position.z;

	if(scoreA<7){
		if(dx>-15 && dx<15){
			if(dz>-15 && dz<15){
				scoreA++
				score.position.x = Math.floor(Math.random()*440-220);
				score.position.z = Math.floor(Math.random()*440-220);
			}
		}
	}else if(scoreA === 7){
		gameMD = 3;
		score.visible = false;
	}

	

	if(gameMD === 2){

	//ballA

	ballA.position.y = 11;

	ballA.vx += ballA.ax*dt;
	ballA.vy += ballA.ay*dt;
	ballA.vz += ballA.az*dt;

	ballA.position.x += ballA.vx*dt;
	ballA.position.y += ballA.vy*dt;
	ballA.position.z -= ballA.vz*dt;

	if(ballA.position.x>240 && ballA.vx>0){
		ballA.vx*=-0.8;
	}else if(ballA.position.x<-240 && ballA.vx<0){
		ballA.vx*=-0.8;
	}

	if(ballA.position.z<-240 && ballA.vz>0){
		ballA.vz*=-0.8;
	}else if(ballA.position.z>240 && ballA.vz<0){
		ballA.vz*=-0.8;
	}

	if(ballA.vz > 30){
		ballA.vz = 30
	}else if(ballA.vz < -30){
		ballA.vz = -30}

	if(ballA.vx > 30){
		ballA.vx = 30
	}else if(ballA.vx < -30){
		ballA.vx = -30}




	//ballB

	YES = world2D.ch02.checked;
	if(YES){
		ballB.visible = false;
	}else{
		ballB.visible = true;
	}

	if(ballA.position.z !== 200 | ballA.position.x !== 0){
	
		logo.visible = false;
		NAME.visible = false;
		go.visible = false;


	if(ballB.position.x>240 && ballB.vx>0){
		ballB.vx*=-1;
	}else if(ballB.position.x<-240 && ballB.vx<0){
		ballB.vx*=-1;
	}

	if(ballB.position.z<-240 && ballB.vz>0){
		ballB.vz*=-1;
	}else if(ballB.position.z>240 && ballB.vz<0){
		ballB.vz*=-1;
	}

	ballB.vx += ballB.ax*dt;
	ballB.vy += ballB.ay*dt;
	ballB.vz += ballB.az*dt;

	ballB.position.x += ballB.vx*dt;
	ballB.position.y += ballB.vy*dt;
	ballB.position.z -= ballB.vz*dt;

	if((ballA.position.x-10) > ballB.position.x){
		if(ballA.vx>0){
			ballB.vx = 7 + (0.3*ballA.vx);
		}else if(ballA.vx<0){
		ballB.vx = 7 - (0.3*ballA.vx);}
	}else if((ballA.position.x+10) < ballB.position.x){
		if(ballA.vx>0){
			ballB.vx = -7 -(0.3*ballA.vx);
		}else if(ballA.vx<0){
		ballB.vx = -7 + (0.3*ballA.vx);}
	}else if((ballA.position.x-10)<= ballB.position.x && (ballA.position.x+10) >= ballB.position.x){
		ballB.vx = 0;
	}

	if((ballA.position.z-10) > ballB.position.z){
		if(ballA.vz>0){
			ballB.vz = -7 - (0.3*ballA.vz);
		}else if(ballA.vz<0){
			ballB.vz = -7 + (0.3*ballA.vz);}
	}else if((ballA.position.z+10) < ballB.position.z){
		if(ballA.vz>0){
			ballB.vz = 7 + (0.3*ballA.vz);
		}else if(ballA.vz<0){
			ballB.vz = 7 - (0.3*ballA.vz);}
	}else if((ballA.position.z-10) <= ballB.position.z && (ballA.position.z+10) >=  ballB.position.z){
		ballB.vz = 0;
	}

	if(ballB.position.z<-240 && ballB.vz>0){
		ballB.vz*=-1;
	}else if(ballB.position.z>240 && ballB.vz<0){
		ballB.vz*=-1;
	}}



	//gameover

	rr = Math.pow(rx*rx + rz*rz , 1/2); 
	rx = ballA.position.x - ballB.position.x;
	rz = ballA.position.z - ballB.position.z;

	if(ballB.visible){
	if(rr<20){gameMD = 1;}}



	//arrow

	arrowA.position.x = ballA.position.x;
	arrowA.position.y = ballA.position.y;
	arrowA.position.z = ballA.position.z;

	arrowV.position.x = ballA.position.x;
	arrowV.position.y = ballA.position.y;
	arrowV.position.z = ballA.position.z;

	arrowA.setArrow(ballA.vx*2,ballA.vy*2,ballA.vz*-2);
	arrowV.setArrow(ballA.ax*10,ballA.ay*10,ballA.az*-10);

    }else if(gameMD === 1){
		//console.log(':)');
		gameover.visible=true;
		gameover2.visible=true;
		world2D.slCameraRR.value=200;
		world3D.cameraTheta=80*Math.PI/180;
		world3D.cameraPhi=0;
		world3D.cameraTarget.z=1;
		world3D.cameraTarget.x=0;
		score.visible = false;
		ballA.visible = false;
		ballB.visible = false;
		
	}else if(gameMD === 3){
		win.visible=true;
		win2.visible=true;
		world2D.slCameraRR.value=200;
		world3D.cameraTheta=80*Math.PI/180;
		world3D.cameraPhi=0;
		world3D.cameraTarget.z=1;
		world3D.cameraTarget.x=0;
		score.visible = false;
		ballA.visible = false;
		ballB.visible = false;


	}
    }

	
	


	
	
	
	
	

	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function clickBtn(e){
	var str=e.target.parent.name;

	if(str==='btnUp'){
		ballA.az = gg;
	}else if(str==='btnDown'){
		ballA.az = -gg;
	}else if(str==='btnLeft'){
		ballA.ax = -gg;
	}else if(str==='btnRight'){
		if(ruleA ===0){
			ruleA = 1
			ballA.visible = true;
			world3D.cameraTheta=30*Math.PI/180;
			world2D.slCameraRR.value=145;
		}else if(ruleA === 1){
			ballA.ax = gg;}
	}else if(str==='btn01'){
		world3D.cameraTheta=65*Math.PI/180;
		world3D.cameraPhi=0;
		world2D.slCameraRR.value=200;
	}else if(str ==='btn02'){
		if(rainbow === 0){
			rainbow = 1;
			aaa = 0;
		}else if(rainbow === 1){
			rainbow = 2;
			bbb = 239;
		}else if(rainbow === 2){
			rainbow = 3;
			aaa = 0;
			bbb = 0;
		}else if(rainbow === 3){
			rainbow = 4;
			aaa = 0;
			bbb = 239;
		}else if(rainbow === 4){
			rainbow = 0;
			aaa = 0;
			bbb = 239;
		}
	}

}

function up2D(e){
	ballA.ax = ballA.az = 0;
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
