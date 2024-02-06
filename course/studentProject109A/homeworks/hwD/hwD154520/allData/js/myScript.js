'use strict';//嚴格模式
var fps=100;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 簡諧運動SHM：
	(1) 物體質量為m，受到彈簧力 F=-kx 作用而做簡諧運動，做出SHM的動畫。
	(2) 加入空氣阻力 f=-bv，空氣阻力與物體速度成正比，方向相反。
	(3) 加入老師畫的彈簧，new TEACHER.ObjSpring(_len,_rB,_rS,_nn,_color);

2. 互動：
	(1) btn01重新開始，btn02播放/暫停
	(2) 利用 slider，讓質量m、彈力常數k、阻力係數b可調整。
	(3) 利用 checkBox 讓速度箭頭可勾選

3. 畫線：
	(1) 用老師幫你寫好的 new TEACHER.Line(_color,_nnMax)，
		.addPoint(x,y,z) 畫出一條(100,100)->(200,300)的藍直線。
	(2) 用老師幫你寫好的 Line，畫出 SHM 的 y(t)圖。
*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數

var ball,bar,player,arrow;
var rr=20
var theta=0
var omega=0.05
var gamemd=0
var xx
var zz
var handcc=new THREE.Object3D();
var hand1
var hand2
var boxarray=new Array();
var ballrr=2
var score=0
var level=0
var scoreplane
var levelplane
var hp=5
var hpplane
var endscore
var endscoreplane
var endlevel
var endlevelplane
var endbox
var scoreplane1
var levelplane1
//B.定義init
function init(){
	world3D.cameraTheta=0
	world2D.slCameraRR.value=150
	logo.position.z=-60
	player=new TEACHER.ObjCylinder(1,4,0xff00ff)
	hand1=new TEACHER.ObjCylinder(0.5,4,0xff00ff)
	handcc.add(hand1)
	hand1.position.y=4
	hand1.position.x=2
	hand1.position.z=1
	hand1.rotation.z=Math.PI/2
	hand1.rotation.y=Math.PI/8
	hand2=new TEACHER.ObjCylinder(0.5,4,0xff00ff)
	handcc.add(hand2)
	endbox=new TEACHER.ObjBox(200,20,200,0xff0000)
	endbox.position.y=100
	scene.add(endbox)
	endbox.visible=false


	
	hand2.position.y=4
	hand2.position.x=2
	hand2.position.z=-1
	hand2.rotation.z=Math.PI/2
	hand2.rotation.y=-Math.PI/8
	player.head=new TEACHER.ObjSphere(1.5,0xff00ff)
	player.head.position.y=7
	ball=new TEACHER.ObjSphere(3,0x010000)
	world2D.btn02.visible=false
	scoreplane=new TEACHER.ObjTextPlane(20,15,0xff0000,'y')
	scoreplane.position.y=2
	scoreplane.position.z=40
	scoreplane.position.x=-20
	scene.add(scoreplane)
	scoreplane1=new TEACHER.ObjTextPlane(20,5,'score','y')
	scoreplane1.position.y=2
	scoreplane1.position.z=30
	scoreplane1.position.x=-20
	scene.add(scoreplane1)
	hpplane=new TEACHER.ObjTextPlane(20,15,0xff0000,'y')
	hpplane.position.y=2
	hpplane.position.z=40
	hpplane.position.x=20
	scene.add(hpplane)
	var hpplane1=new TEACHER.ObjTextPlane(20,5,'HP','y')
	hpplane1.position.y=2
	hpplane1.position.z=30
	hpplane1.position.x=20
	scene.add(hpplane1)
	levelplane=new TEACHER.ObjTextPlane(20,15,0xff0000,'y')
	levelplane.position.y=2
	levelplane.position.z=40
	scene.add(levelplane)
	levelplane1=new TEACHER.ObjTextPlane(20,5,'Level','y')
	levelplane1.position.y=2
	levelplane1.position.z=30
	scene.add(levelplane1)
	endscoreplane=new TEACHER.ObjTextPlane(100,20,0xff0000,'y')
	endscoreplane.position.y=110
	endscoreplane.position.z=20
	endscoreplane.position.x=-20
	endscoreplane.visible=false
	scene.add(endscoreplane)
	var name=new TEACHER.ObjTextPlane(100,10,'1545張博崴','y')
	name.position.y=4
	name.position.z=-40
	scene.add(name)
	
	endlevelplane=new TEACHER.ObjTextPlane(100,20,0xff0000,'y')
	endlevelplane.position.y=110
	endlevelplane.position.z=20
	endlevelplane.position.x=20
	endlevelplane.visible=false
	scene.add(endlevelplane)
	ball.vx=0
	ball.vy=0
	bar=new TEACHER.ObjCylinder(0.2,rr,0xffffff)
	arrow=new TEACHER.ObjArrow(0.5,0xff0000)
	bar.rotation.z=Math.PI/2
	scene.add(player).add(player.head).add(bar).add(ball).add(arrow)
	scene.add(handcc)
	ball.position.y=bar.position.y=4
	player.position.y=3
	world2D.sl01.minimum=10
	world2D.sl01.maximum=40
	world2D.sl02.minimum=-15
	world2D.sl02.maximum=15
	setInterval(tick,1000/fps);
	world2D.sl02.value=10
	world2D.btn01.on('click',clickbtn)
	world2D.btn02.on('click',speedup)
	world2D.btn01.setLabel('丟出')
	world2D.btn02.setLabel('增強')
	for(var i=0;i<5;i++){
		var box=new TEACHER.ObjBox(4,4,4,0xff0000)
		var xory=Math.random()
		
		if(0.25>xory&&xory>=0){
			box.position.x=150
			box.position.z=(Math.random()-0.5)*300
		}
		if(0.5>xory&&xory>=0.25){
			box.position.x=-150
			box.position.z=(Math.random()-0.5)*300
		}
		if(0.75>xory&&xory>=0.5){
			box.position.x=(Math.random()-0.5)*300
			box.position.z=150
		}
		if(1>=xory&&xory>=0.75){
			box.position.x=(Math.random()-0.5)*300
			box.position.z=-150
		}
		box.position.y=2
		boxarray.push(box)
		scene.add(box)
	}
	
	world2D.sl01.visible=false
	world2D.sl02.visible=false
	world2D.sl03.visible=false
	world2D.btnUp.visible=false
	world2D.btnDown.visible=false
	world2D.btnRight.visible=false
	world2D.btnLeft.visible=false
	world2D.ch01.visible=false
	world2D.ch02.visible=false
	
}


//C.定義tick                                                                                                                       
function tick(){

	if(hp===0){
		endlevel=level
		endscore=score
		endlevelplane.setText(level+1)
		endscoreplane.setText(score)
		endbox.visible=true
		endlevelplane.visible=true
		endscoreplane.visible=true
		scoreplane1.position.y=110
		scoreplane1.position.z=-10
		scoreplane1.position.x=-20
		levelplane1.position.y=110
		levelplane1.position.z=-10
		levelplane1.position.x=20

	}
	if(hp<1){
		hp=-4
	}
	if(score%10===0&&score-10*level>0){
		level+=1
		hp+=3
	}
	scoreplane.setText(score)
	levelplane.setText(level+1)
	hpplane.setText(hp)
	for(var i=0;i<5;i++){
		var thetabox=Math.atan2(boxarray[i].position.z,boxarray[i].position.x)
		var speed=(Math.random()/5+0.01)*(1+level/3)
		boxarray[i].position.x-=Math.cos(thetabox)*speed
		boxarray[i].position.z-=Math.sin(thetabox)*speed
		boxarray[i].rotation.y+=0.1
		if((boxarray[i].position.x-ball.position.x)*(boxarray[i].position.x-ball.position.x)+(boxarray[i].position.z-ball.position.z)*(boxarray[i].position.z-ball.position.z)<(2+ballrr)*(2+ballrr)){
			var xory=Math.random()
			if(0.25>xory&&xory>=0){
				boxarray[i].position.x=150
				boxarray[i].position.z=(Math.random()-0.5)*300
			}
			if(0.5>xory&&xory>=0.25){
				boxarray[i].position.x=-150
				boxarray[i].position.z=(Math.random()-0.5)*300
			}
			if(0.75>xory&&xory>=0.5){
				boxarray[i].position.x=(Math.random()-0.5)*300
				boxarray[i].position.z=150
			}
			if(1>=xory&&xory>=0.75){
				boxarray[i].position.x=(Math.random()-0.5)*300
				boxarray[i].position.z=-150
			}
			score+=1
		}
		if(boxarray[i].position.x*boxarray[i].position.x+boxarray[i].position.z*boxarray[i].position.z<4){
			var xory=Math.random()
			if(0.25>xory&&xory>=0){
				boxarray[i].position.x=150
				boxarray[i].position.z=(Math.random()-0.5)*300
			}
			if(0.5>xory&&xory>=0.25){
				boxarray[i].position.x=-150
				boxarray[i].position.z=(Math.random()-0.5)*300
			}
			if(0.75>xory&&xory>=0.5){
				boxarray[i].position.x=(Math.random()-0.5)*300
				boxarray[i].position.z=150
			}
			if(1>=xory&&xory>=0.75){
				boxarray[i].position.x=(Math.random()-0.5)*300
				boxarray[i].position.z=-150
			}
			hp-=1
		}
	}
	
	
	if(gamemd===0){
		theta+=omega*(1+level/4)
		ball.position.x=Math.cos(theta)*rr
		ball.position.z=Math.sin(theta)*rr
		bar.position.x=Math.cos(theta)*rr/2
		bar.position.z=Math.sin(theta)*rr/2
		bar.rotation.y=-theta
		handcc.rotation.y=-theta
		arrow.setArrow(-Math.sin(theta)*rr*omega*10,0,Math.cos(theta)*rr*omega*10)
	}
	if(gamemd===1){
		ball.position.x+=ball.vx
		ball.position.z+=ball.vz
		if(ball.position.x>50-2&&ball.vx>=0){
			ball.vx*=-1
		}
		if(ball.position.x<-50+2&&ball.vx<=0){
			ball.vx*=-1
		}
		if(ball.position.z>50-2&&ball.vz>=0){
			ball.vz*=-1
		}
		if(ball.position.z<-50+2&&ball.vz<=0){
			ball.vz*=-1
		}
		arrow.setArrow(ball.vx*10,0,ball.vz*10)

	}
	if(gamemd===2){
		ball.position.x+=ball.vx
		ball.position.z+=ball.vz
		arrow.setArrow(ball.vx*10,0,ball.vz*10)

		if((xx-ball.position.x)*(xx-ball.position.x)+(zz-ball.position.z)*(zz-ball.position.z)<1){
			ball.position.x=xx
			ball.position.z=zz
			bar.visible=true

			gamemd=0
		}
	}
	
	arrow.position.x=ball.position.x
	arrow.position.z=ball.position.z
	arrow.position.y=ball.position.y
	
	arrow.visible=world2D.ch01.checked
	if(hp<1){	
		world2D.slCameraRR.value=200
		world3D.cameraTheta=0
		world2D.visible=false
		

	}
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}


function clickbtn(e){
	if(gamemd===0){
		gamemd=1
		ball.vx=-Math.sin(theta)*rr*omega*(1+level/4)
		ball.vz=Math.cos(theta)*rr*omega*(1+level/4)
		bar.visible=false
		zz=ball.position.z
		xx=ball.position.x
		world2D.btn01.setLabel('收回')
		world2D.btn02.visible=true

	}else if(gamemd===1){
		world2D.btn02.visible=false
		ball.scale.x=1
		ball.scale.y=1
		ball.scale.z=1
		ballrr=2
		ball.position.y=4
		gamemd=2
		ball.vx=(xx-ball.position.x)/20
		ball.vz=(zz-ball.position.z)/20
		world2D.btn01.setLabel('丟出')
	}
}
function speedup(e){
	if(gamemd===1){
		ball.vx*=2
		ball.vz*=2
		ball.scale.x=4/3
		ball.scale.y=4/3
		ball.scale.z=4/3
		ballrr=4
		ball.position.y=4
		world2D.btn02.visible=false
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
var ground=new TEACHER.ObjPlane(100,100,0x220088,'y');
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
