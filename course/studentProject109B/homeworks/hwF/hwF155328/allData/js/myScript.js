'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 盪鞦韆：
	(1) 建模： https://threejs.org/editor/
	(2) 載入： var loader = new THREE.ObjectLoader();
			  allSwing = loader.parse(objjson);
			  swing=allSwing.getChildByName('gSwing');
	(3)做出盪鞦韆的動畫
	提示：(1) alpha 角加速度, omega 角速度, theta 角位置
		  (2) 恢復力矩 tau = -k*sin(theta), 人站時k大, 人蹲時k小。

2. 互動：
	(1) 按鈕1, 按下蹲，放開站。
	(2) 按鈕2 可以重來。
*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var man;
var head,rhand,lhand,body1,body2,rfoot,lfoot,hair1,haur2;
var rhd,rhd2,lhd,lhd2,rft,rft2,lft,lft2;
var vx=0,vy=0,vz=0;
var dt=0.1;

var moving = false;

var ax=0,ay=0,az=0;
var rt=0;
var rt1=0,rt2=0;
var ball,rr=2;
var holdball=false;
var throwbal=false;
var bvx=0,bvy=0,bvz=0,bax=0,bay=0,baz=0;
var box,box1,box2,box3,box4,box5;
var wingame=false;
var t1,t2,t3;
var bm=0.5;


//B.定義init
function init(){

	//名字
	t1=new TEACHER.ObjTextPlane(100,20,"1553 劉昆泰",'z',0xffffff);
	t1.position.z=-60;
	t1.position.y=45;
	t2=new TEACHER.ObjTextPlane(85,7,"撿起球，將它丟到白色桶子裡",'z',0x272727);
	t2.position.z=-60;
	t2.position.y=30;
	t2.position.x=-20;
	t2.visible=!wingame;
	t3=new TEACHER.ObjTextPlane(100,20,"YOU WIN",'z',0xffffff);
	t3.position.y=10;
	t3.visible=wingame;
	scene.add(t1).add(t2).add(t3);
	world2D.slCameraRR.maximum=300;

	add_man();

	//ball
	ball = new TEACHER.ObjSphere(rr,0xff0000);
	ball.position.x=30;
	ball.position.y=rr;
	ball.visible=!holdball;
	scene.add(ball);

	//botton
	world2D.btn01.setLabel('停下');
	world2D.btn02.setLabel('跳躍');
	world2D.sl01.setLabel('右手擺動');
	world2D.sl01.minimum=0;
	world2D.sl01.maximum=1;
	world2D.sl01.value=0.5;
	world2D.sl01.digitN=1;

	world2D.sl02.setLabel('左手擺動');
	world2D.sl02.minimum=0;
	world2D.sl02.maximum=1;
	world2D.sl02.value=0.5;
	world2D.sl01.digitN=1;

	world2D.sl03.setLabel('丟球力道');
	world2D.sl03.minimum=0;
	world2D.sl03.maximum=50;
	world2D.sl03.value=25;

	world2D.ch01.setLabel('視線跟人');
	world2D.ch02.setLabel('箱子移動');

	world2D.slCameraRR.value = 100;

	//上下左右
	world2D.btnUp.on('mousedown',clickbtn);
	world2D.btnDown.on('mousedown',clickbtn);
	world2D.btnLeft.on('mousedown',clickbtn);
	world2D.btnRight.on('mousedown',clickbtn);
	world2D.btn01.on('mousedown',clickbtn);
	world2D.btn02.on('mousedown',clickbtn);
	world2D.on('pressup',Up2D);


	setInterval(tick,1000/fps);
}



//C.定義tick
function tick(){

	var followman=world2D.ch01.checked;
	var boxmove=world2D.ch02.checked;
	if(followman===true){
		if(moving===true){
			if(world3D.cameraTarget.x>man.position.x){
				world3D.cameraTarget.x-=0.1;
			}
			else if(world3D.cameraTarget.x<man.position.x){
				world3D.cameraTarget.x+=0.1;
			}
			if(world3D.cameraTarget.y>man.position.y){
				world3D.cameraTarget.y-=0.1;
			}
			else if(world3D.cameraTarget.y<man.position.y){
				world3D.cameraTarget.y+=0.1;
			}
			if(world3D.cameraTarget.z>man.position.z){
				world3D.cameraTarget.z-=0.1;
			}
			else if(world3D.cameraTarget.z<man.position.z){
				world3D.cameraTarget.z+=0.1;
			}
		}
	}else {
		if(world3D.cameraTarget.x!=0){
			world3D.cameraTarget.x=0;
		}
		else if(world3D.cameraTarget.x!=0){
			world3D.cameraTarget.x=0;
		}
	}

	if(boxmove === true){
		box.position.z+=bm;
		if(box.position.z>45 && bm>0){
			bm=-bm;
		}else if(box.position.z<-45 && bm<0){
			bm=-bm;
		}
	}
	log(box.position.z);
	t2.visible=!wingame;
	t3.visible=wingame;
	vx+=ax*dt;
	vy+=ay*dt;
	vz+=az*dt;
	if(wingame===false){
		//ball
		totalThrowballFunction();
		move();
		jump();
		manHFmove();
		man_ground();
		pickUpBall();
		wingameF();
	}else{
		world2D.btn01.setLabel('再來一次');
		world2D.btn02.setLabel('沒有東西');
		dance();
	}

	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}
//遊戲勝利
function wingameF(e){
	if(ball.position.x<box.position.x+4 && ball.position.x>box.position.x-4 && ball.position.z<box.position.z+4 && ball.position.z>box.position.z-4 && ball.position.y<8){
		if(bvx<1 && bvx>-1){
			if(bvy<1 && bvy>-1){
				if(bvz<1 && bvz>-1){
					wingame=true;

				}
			}
		}
	}
}

//人的手腳移動函式
function manHFmove(e){
	man.position.x+=vx*dt;
	man.position.y+=vy*dt;
	man.position.z+=vz*dt;
	rfoot.rotation.x=rt*Math.PI*2;
	lfoot.rotation.x=-rt*Math.PI*2;
}

function add_man(e) {
	man = new THREE.Object3D();
	rhand = new THREE.Object3D();
	lhand = new THREE.Object3D();
	rfoot = new THREE.Object3D();
	lfoot = new THREE.Object3D();
	box = new THREE.Object3D();
	//box
	box1=new TEACHER.ObjBox(10,1,10,0xffffff);
	box2=new TEACHER.ObjBox(10,10,1,0xffffff);
	box3=new TEACHER.ObjBox(10,10,1,0xffffff);
	box4=new TEACHER.ObjBox(1,10,10,0xffffff);
	box5=new TEACHER.ObjBox(1,10,10,0xffffff);
	box1.position.y=0.5;
	box2.position.y=box3.position.y=box4.position.y=box5.position.y=6;
	box2.position.z=-4.5;
	box3.position.z=4.5;
	box4.position.x=-4.5;
	box5.position.x=4.5;
	box.add(box1).add(box2).add(box3).add(box4).add(box5);
	scene.add(box);
	box.position.x=-45;

	//head
	man.head=new TEACHER.ObjBox(8,8,8,0xFFE4B5);
	man.head.position.y=11;
	man.hair1=new TEACHER.ObjBox(8.2,3,8.4,0x704214);
	man.hair1.position.y=15;
	man.hair2=new TEACHER.ObjBox(8.2,4,4.5,0x704214);
	man.hair2.position.y=12;
	man.hair2.position.z=-2;
	//rhand
	rhd=new TEACHER.ObjBox(3,9,3,0xFFE4B5);
	rhd2=new TEACHER.ObjSphere(rr,0xff0000);
	rhd2.visible=holdball;
	rhd.position.y=-3;
	rhd2.position.y=-6.5;
	rhand.add(rhd).add(rhd2);
	rhand.position.y=5.5;
	rhand.position.x=-5.5;

	//lhand
	lhd=new TEACHER.ObjBox(3,9,3,0xFFE4B5);
	lhd2=new TEACHER.ObjBox(3,2,3,0xFFE4B5);
	lhd.position.y=-3;
	lhd2.position.y=-6.5;
	lhand.add(lhd).add(lhd2);
	lhand.position.y=5.5;
	lhand.position.x=5.5;
	//rfoot
	rft=new TEACHER.ObjBox(3,12,3,0xFFE4B5);
	rft2=new TEACHER.ObjBox(3.2,2,3.2,0x0000ff);
	rft.position.y=-5;
	rft2.position.y=-10;
	rfoot.add(rft).add(rft2);
	rfoot.position.y=-4;
	rfoot.position.x=-2.2;
	//lfoot
	lft=new TEACHER.ObjBox(3,12,3,0xFFE4B5);
	lft2=new TEACHER.ObjBox(3.2,2,3.2,0x0000ff);
	lft.position.y=-5;
	lft2.position.y=-10;
	lfoot.add(lft).add(lft2);
	lfoot.position.y=-4;
	lfoot.position.x=2.2;
	//body
	man.body1=new TEACHER.ObjBox(8,8,8,0x00ffff);
	man.body2=new TEACHER.ObjBox(8,4,8,0x0000ff);
	man.body1.position.y=3;
	man.body2.position.y=-3;
	man.add(man.head).add(rhand).add(lhand).add(rfoot).add(lfoot).add(man.body1).add(man.body2).add(man.hair1).add(man.hair2);
	scene.add(man);
	man.position.y=15;
}

//丟球的總函式
function totalThrowballFunction(e){
	if(holdball===true){
		if(throwbal===true){
			ball.visible=true;
			rhd2.visible=false;
			world2D.btn02.setLabel('丟球');
			throwball();
			rhand.rotation.x=(world2D.sl01.value+0.5)*Math.PI*2;
			lhand.rotation.x=(world2D.sl02.value+0.5)*Math.PI*2;

		}else{
			ball.visible=false;
			rhd2.visible=true;
			rhand.rotation.x=-rt*Math.PI*2;
			lhand.rotation.x=rt*Math.PI*2;
			world2D.btn02.setLabel('跳躍');
		}
	}else if(holdball===false){
		ball.visible=true;
		rhd2.visible=false;
		world2D.btn02.setLabel('跳躍');
		rhand.rotation.x=-rt*Math.PI*2;
		lhand.rotation.x=rt*Math.PI*2;
		bvx+=bax*dt;
		bvz+=baz*dt;
		bvy+=bay*dt;
		ball.position.x+=bvx*dt;
		ball.position.y+=bvy*dt;
		ball.position.z+=bvz*dt;
		ball_ground();
		ball_box();
	}
}

//人的跳躍
function jump(e){
	if(man.position.y>25 && vy>0){
		ay+=-9.8;

	}else if(man.position.y<=15 && vy<0){
		vy=0;
		ay=0;
		man.position.y=15;
	}
}
//丟球動作
function throwball(e){
	if(man.rotation.y===0){//front
		ball.position.y=7*Math.sin(rhand.rotation.x-Math.PI*2/4)+man.position.y+5.5;
		ball.position.x=man.position.x-5.5;
		ball.position.z=7*Math.cos(rhand.rotation.x+Math.PI*2/4)+man.position.z;
	}else if(man.rotation.y===Math.PI){//back
		ball.position.y=7*Math.sin(rhand.rotation.x-Math.PI*2/4)+man.position.y+5.5;
		ball.position.x=man.position.x+5.5;
		ball.position.z=7*Math.cos(rhand.rotation.x+Math.PI*2*3/4)+man.position.z;
	}else if(man.rotation.y===Math.PI/2){//right
		ball.position.y=7*Math.sin(rhand.rotation.x-Math.PI*2/4)+man.position.y+5.5;
		ball.position.z=man.position.z+5.5;
		ball.position.x=7*Math.cos(rhand.rotation.x+Math.PI*2/4)+man.position.x;
	}else if(man.rotation.y===Math.PI/2*3){//left
		ball.position.y=7*Math.sin(rhand.rotation.x-Math.PI*2/4)+man.position.y+5.5;
		ball.position.z=man.position.z-5.5;
		ball.position.x=7*Math.cos(rhand.rotation.x+Math.PI*2*3/4)+man.position.x;
	}
}
//人的移動
function move(e){
	rt1+=rt2*dt;
	rt+=rt1*dt;
	if(rt>0.125 && rt>0){
		rt1=-rt1;
		rt2=0;
	}else if(rt<-0.125 && rt<0){
		rt1=-rt1;
		rt2=0;
	}
}
//撿球
function pickUpBall(e){
	if(ball.position.x+3>man.position.x && ball.position.z+3>man.position.z &&ball.position.x-3<man.position.x && ball.position.z-3<man.position.z && ball.position.y<man.position.y+17){
		holdball=true;
	}
}

//按按鈕
function clickbtn(e){

	var str=e.target.parent.name;


	if(str==='btn01'){
		if(wingame===false){
			vx=vz=rt1=0
			ax=az=rt2=0;
			rt=0;
			moving = false;
			if(holdball===true){
				throwbal=true;
			}
		}else {
			wingame=false;
			world2D.btn01.setLabel('停止');
			ball.position.x=30;
			moving = false;
			ball.position.y=0;
			ball.position.z=0;
			rhand.rotation.z=0;
			lhand.rotation.z=0;
			man.rotation.y=0;
		}
	}
	else if(str==='btn02'){
		if(wingame===false){
			if(throwbal===false){
				ay+=5;
			}else if(throwbal === true && holdball===true){
				holdball = false;
				throwbal = false;
				var bvv = world2D.sl03.value;
				bay=-10;
				if(man.rotation.y===0){//front
					baz=bvv*-Math.cos(rhand.rotation.x);
					bvy=bvv*Math.sin(rhand.rotation.x);
				}else if(man.rotation.y===Math.PI){//back
					baz=bvv*Math.cos(rhand.rotation.x);
					bvy=bvv*Math.sin(rhand.rotation.x);
				}else if(man.rotation.y===Math.PI/2){//right
					bax=bvv*-Math.cos(rhand.rotation.x);
					bvy=bvv*Math.sin(rhand.rotation.x);
				}else if(man.rotation.y===Math.PI/2*3){//left
					bax=bvv*Math.cos(rhand.rotation.x);
					bvy=bvv*Math.sin(rhand.rotation.x);
				}
			}
		}
	}
	else if(str==='btnLeft' && man.position.x>-101){
		vx=vy=vz=rt1=rt=0
		rt1=0;
		man.rotation.y=Math.PI/2*3;
		ax--;
		rt2+=0.1*ax;
		moving=true;
		throwbal=false;
	}
	else if(str==='btnRight' && man.position.x<101){
		vx=vy=vz=rt1=rt=0
		rt1=0;
		man.rotation.y=Math.PI/2;
		ax++;
		rt2+=0.1*ax;
		moving=true;
		throwbal=false;
	}
	else if(str==='btnUp' && man.position.z>-101){
		vx=vy=vz=rt1=rt=0
		rt1=0;
		man.rotation.y=Math.PI;
		az--;
		rt2+=0.1*az;
		moving=true;
		throwbal=false;
	}
	else if(str==='btnDown' && man.position.z<101){
		vx=vy=vz=rt1=rt=0
		rt1=0;
		man.rotation.y=0;
		az++;
		rt2+=0.1*az;
		moving=true;
		throwbal=false;
	}
}
//放開按鈕
function Up2D(e){
	ax=ay=az=bax=baz=rt2=0;

}
//桶子撞球
function ball_box(e){
	if(ball.position.x<box.position.x+5+rr && bvx<0){
		if(ball.position.x>box.position.x+4-rr){
			if(ball.position.z<box.position.z+5+rr && ball.position.z>box.position.z-5-rr){
				if(ball.position.y<11+rr){
					bvx=-bvx*0.6;
					if(bvy<0 && ball.position.y>10){
						bvy=-bvy*0.6;
					}
				}
			}
		}
	}
	else if(ball.position.x<box.position.x+5+rr && bvx>0){
		if(ball.position.x>box.position.x+5-rr){
			if(ball.position.z<box.position.z+5+rr && ball.position.z>box.position.z-5-rr){
				if(ball.position.y<11+rr){
					bvx=-bvx*0.6;
					if(bvy<0 && ball.position.y>10){
						bvy=-bvy*0.6;
					}
				}
			}
		}
	}
	if(ball.position.x<box.position.x+5+rr ){
		if(ball.position.z>box.position.z+4-rr && ball.position.z<box.position.z+6+rr && bvz>0){
			if(ball.position.y<11+rr){
				bvz=-bvz*0.6;
				if(bvy<0 && ball.position.y>10){
					bvy=-bvy*0.6;
				}
			}
		}
		else if(ball.position.z<box.position.z-4+rr && ball.position.z>box.position.z-6-rr && bvz>0){
			if(ball.position.y<11+rr){
				bvz=-bvz*0.6;
				if(bvy<0 && ball.position.y>10){
					bvy=-bvy*0.6;
				}
			}
		}
		else if(ball.position.z>box.position.z+4-rr && ball.position.z<box.position.z+6+rr && bvz<0){
			if(ball.position.y<11+rr){
				bvz=-bvz*0.6;
				if(bvy<0 && ball.position.y>10){
					bvy=-bvy*0.6;
				}
			}
		}
		else if(ball.position.z<box.position.z-4+rr && ball.position.z>box.position.z-6-rr && bvz<0){
			if(ball.position.y<11+rr){
				bvz=-bvz*0.6;
				if(bvy<0 && ball.position.y>10){
					bvy=-bvy*0.6;
				}
			}
		}
	}
}
//球撞牆
function ball_ground(e){
	if(ball.position.y<rr && bvy<0 && bay!=0){
		bvy=-bvy*0.6;
		bay=0;
	}else if(ball.position.y>2 && bvy>0 && bay===0){
		bay=-9.8;
	}
	if(ball.position.x<-50 && bvx<0){
		bvx=-bvx*0.6;
	}
	else if(ball.position.x>50 && bvx>0){
		bvx=-bvx*0.6;
	}
	if(ball.position.z<-50 && bvz<0){
		bvz=-bvz*0.6;
	}
	else if(ball.position.z>50 && bvz>0){
		bvz=-bvz*0.6;
	}
}
//人撞牆
function man_ground(e){
	if(man.position.x>51 && vx>0){
		vx=0;
		ax=0;
	}else if(man.position.z>51 && vz>0){
		vz=0;
		az=0;
	}else if(man.position.x<-51 && vx<0){
		vx=0;
		ax=0;
	}else if(man.position.z<-51 && vz<0){
		vz=0;
		az=0;
	}
}

function dance(e){
	rhand.rotation.z+=0.1;
	lhand.rotation.z-=0.1;
	man.rotation.y+=0.1;
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
var ground=new TEACHER.ObjPicPlane(100,100,pics.ground2,'y');
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
