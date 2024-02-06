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
var ball , bar , center
var r = 5
var thete = 0  , omega = 0.4
var dt = 0.1
var arrow 
var xa , ya , za , vx=0 , vy=0 , vz=0 , dt = 0.1 , g = 0.1
var LR , UD , JU

var TYPE = 0
var TY = Math.random()*1.5

var type1 , ty1c = 0 , ty1s = 3
var type1Array = []
var type2 , ty2 = 0 , ty2th , ty2r
var type2Array = []
var type3 , ty3s = 8
var type3Array = []
var T = 1
var hit = 0
var boost = 100 , boostw = 30 , booston = false 
var nnn = 0
var bh = 0 , bhi = false , bht = 120
var dis = 15
var word01 , word02 , word03 , word04 , word05 , word06 , word07 , word08 , word09 , word10

world2D.sl01.value = 50
world2D.sl01.maximum = 50
world2D.sl01.minimum = 0
world2D.sl01.setLabel(`玩家血量`)

world2D.sl02.value = 5
world2D.sl02.maximum = 5
world2D.sl02.minimum = 0
world2D.sl02.setLabel(`王血量`)

world2D.sl03.value = 100
world2D.sl03.maximum = 100
world2D.sl03.minimum = 0
world2D.sl03.setLabel(`衝刺條`)

world2D.btn01.setLabel(`開始`)
world2D.btn02.setLabel(``)

world2D.ch01.checked = false
world2D.ch01.setLabel(`困難`)
world2D.ch01.checked = false
world2D.ch02.setLabel(`輔助`)

world2D.slCameraRR.value = 150

//B.定義init
function init(){
ball = new TEACHER.ObjSphere(1,0xff0000)
bar = new TEACHER.ObjCylinder(3,7,0x101010,false,`z`)
center = new TEACHER.ObjSphere(5,0x999999)
ball.position.y
scene.add(ball).add(center).add(bar)

var word = new TEACHER.ObjTextPlane(60,10,`157303朱浩鋒`,`y`)
scene.add(word)
word.position.z = 55
word.position.x = -30
word.position.y = 0
/*撞王對王造成傷害
被子彈打到會扣血
球的顏色隨衝刺調變化*/
//---------------------------------------------------------------------------------------//
word01 = new TEACHER.ObjTextPlane(250,10,`規則:`,`y`,0x505050,0xffffff)
scene.add(word01)
word01.position.z = -45
word01.position.x = 0
word01.position.y = 20
word02 = new TEACHER.ObjTextPlane(250,10,`撞王對王(中間的)造成傷害,王隨扣血量強化`,`y`,0x505050,0xffffff)
scene.add(word02)
word02.position.z = -35
word02.position.x = 0
word02.position.y = 20
word03 = new TEACHER.ObjTextPlane(250,10,`被子彈打到會扣血,最普通的-1,會轉的-3,大的-5`,`y`,0x505050,0xffffff)
scene.add(word03)
word03.position.z = -25
word03.position.x = 0
word03.position.y = 20
word04 = new TEACHER.ObjTextPlane(250,10,`球的顏色隨衝刺條變化,王死了就結束`,`y`,0x505050,0xffffff)
scene.add(word04)
word04.position.z = -15
word04.position.x = 0
word04.position.y = 20
word05 = new TEACHER.ObjTextPlane(250,10,`按開始鍵就會開始了`,`y`,0x505050,0xffffff)
scene.add(word05)
word05.position.z = -5
word05.position.x = 0
word05.position.y = 20
word06 = new TEACHER.ObjTextPlane(250,10,``,`y`,0x505050,0xffffff)
scene.add(word06)
word06.position.z = 5
word06.position.x = 0
word06.position.y = 20
word07 = new TEACHER.ObjTextPlane(250,10,`輔助:每秒回一血,衝刺條持續回復`,`y`,0x505050,0xffffff)
scene.add(word07)
word07.position.z = 15
word07.position.x = 0
word07.position.y = 20
word08 = new TEACHER.ObjTextPlane(250,10,`困難:王射速加快,撞擊判定距離縮短`,`y`,0x505050,0xffffff)
scene.add(word08)
word08.position.z = 25
word08.position.x = 0
word08.position.y = 20
word09 = new TEACHER.ObjTextPlane(250,10,`操作:方向按鍵按一次就會持續動,衝刺要長按`,`y`,0x505050,0xffffff)
scene.add(word09)
word09.position.z = 35
word09.position.x = 0
word09.position.y = 20
word10 = new TEACHER.ObjTextPlane(250,10,`小提示:不用手機或鍵盤(WASD+空白鍵)王變紅之後幾乎過不了`,`y`,0x505050,0xffffff)
scene.add(word10)
word10.position.z = 45
word10.position.x = 0
word10.position.y = 20
//---------------------------------------------------------------------------------------//

ball.position.x = 30
ball.position.y = 1
ball.position.z = -30

center.position.y = bar.position.y = 2.5
//center.position.x = center.position.z = -25
ball.vx = ball.vz = ball.vy = ball.xa = ball.ya = ball.za = 0
	
document.addEventListener(`keydown`,keyd)
document.addEventListener(`keyup`,keyU)
world2D.btnUp.on(`mousedown`,clickbtn)
world2D.btnDown.on(`mousedown`,clickbtn)
world2D.btnLeft.on(`mousedown`,clickbtn)
world2D.btnRight.on(`mousedown`,clickbtn)
world2D.btn01.on(`click`,clickbtn)
world2D.btn02.on(`mousedown`,clickbtn)
world2D.btn02.on(`pressup`,clickbtn01)





type2 = new TEACHER.ObjSphere(2,0x009999)
scene.add(type2)
type2.visible = false
type3 = new TEACHER.ObjSphere(7,0xff5025)
scene.add(type3)
type3.visible = false

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
	
    if(boost>100){
		boost = 100
	}
	world3D.cameraTheta = 0
	center.vx = center.vy = center.vz = 0
    world2D.sl02.value = bh
	collision(ball,center,dis)
	if(bhi){
        bht-=1
		if(bht==119){
			bh-=1
			hit-=5
		}
		if(bht%10==5){
			center.visible = false
			bar.visible = false
		}
		if(bht%10==0){
			center.visible = true
			bar.visible = true
		}
		if(bht==0){
			center.visible = true
			bar.visible = true
			
			bht = 120
			bhi = false
		}
	}
	if(hit<0){
		hit = 0
	}

if(hit<=50 || bh > 1){
	if(world2D.ch02.checked){
        hit-=1/60
		boost+=0.25
	}
    if(world2D.ch01.checked === true){
		T-=1/60
		ty3s+=0.005
		dis=10
	}

	world2D.sl03.value = boost
		
	boostw -= 1
	if(boostw<0 && boost <= 100){
		boost += 0.25
	}

	if(boost < 0 ){
		booston = false
	}

    if(booston === true){
		ball.position.x += ball.vx*3
		ball.position.z += ball.vz*3
		boost -= 0.5
		boostw = 30
	}else{
	    ball.position.x += ball.vx
	    ball.position.z += ball.vz
	}
	ball.mat.color.setHSL(0,1,(boost/200))
   
	ball.vx += ball.xa*dt
	ball.vz += ball.za*dt
	
    if(ball.vx>1.25){
		ball.vx = 1.25
	}
	if(ball.vx<-1.25){
		ball.vx = -1.25
	}
	if(ball.vz>1.25){
		ball.vz = 1.25
	}
	if(ball.vz<-1.25){
		ball.vz = -1.25
	}
	
	if(ball.position.x>50-1 && ball.vx>0){
		ball.vx *= -1
	}else if(ball.position.x<-50+1 && ball.vx<0){
		ball.vx *= -1
	}

	if(ball.position.z>50-1 && ball.vz>0){
		ball.vz *= -1
	}else if(ball.position.z<-50+1 && ball.vz<0){
		ball.vz *= -1
	}

    ball.vx -= ball.vx*0.05
	ball.vz -= ball.vz*0.05
	
	if(UD == 38){
		ball.za = -g
		
	   }else  if(UD == 40){
		ball.za = g
		
	   }
	   if(LR == 37){
		ball.xa = -g
		
	   }else  if(LR == 39){
		ball.xa = g
		
	   }
	
		if(JU>0){
			vy = 2
			
			JU -= 0.05
			
		}

thete = Math.atan2(ball.position.x,ball.position.z)
bar.position.x = r*Math.sin(thete)*0.5
bar.position.z = r*Math.cos(thete)*0.5

bar.rotation.y = thete
//-------------------------------------------------------------------------------------------------------------------//	
if(T>0){
	T-=1/60
	if(type3.visible == false){
		TYPE = 3
	}
}else{
	T = 1
	if(TY<=1){
		TYPE = 1
		TY = Math.random()*1.25
		TYPE1()
		if(Math.random()>bh/5){
            TYPE = 2
		}
	}else if(TY>1){
		TYPE = 2
		T = 0.6
		TY = Math.random()*1.25 + 0.75
	}
	if(bh<3){
		T-=0.25*(3-bh)
	}
    
}
if(TY>1){
	bar.mat.color.setHSL(0.67,0.75+(bh/10),bh/10)
}else{
	bar.mat.color.setHex(0x010101)
}
//-----------------------------------------------------------------------------------------//
/*if(TYPE == 1){
	type1 = new TEACHER.ObjSphere(2,0x010101)
    scene.add(type1)
	type1Array.push(type1)
	type1.scale.x = type1.scale.y = type1.scale.z = ty1s/3
	console.log(`1`)
	TYPE = 0
	type1Array[ty1c].position.y = 1
	type1Array[ty1c].position.x = type1.position.z = 0
	type1Array[ty1c].vx = Math.sin(thete)*(ty1s/3)
	type1Array[ty1c].vz = Math.cos(thete)*(ty1s/3)
	type1Array[ty1c].vy = 0
    ty1c += 1
	if(bh<3){
		type1.mat.color.setHSL(0,1,0.35)
		center.mat.color.setHSL(0,1,0.35)
	}else{
		type1.mat.color.setHex(0x010101)
	}
}*/
for (var i=0;i<ty1c;i++){
type1Array[i].position.x += type1Array[i].vx
type1Array[i].position.z += type1Array[i].vz
if(type1Array[i].visible == true){
	collision(ball,type1Array[i],ty1s)
	if(type1Array[i].visible == false){
		hit += 1
	}
}
}
for (var i=0;i<ty1c;i++){
	if(type1Array[i].position.x > 100){
		type1Array[i].visible = false
	}
	if(type1Array[i].position.z > 100){
		type1Array[i].visible = false
	}
	if(type1Array[i].position.x < -100){
		type1Array[i].visible = false
	}
	if(type1Array[i].position.z < -100){
		type1Array[i].visible = false
	}
}
if(bh<3){
	ty1s = 4.5
}


if(TYPE == 2){
	type2 = new TEACHER.ObjSphere(2,0x009999)
    scene.add(type2)
	type2Array.push(type2)
	console.log(`2`)
	TYPE = 0
	//type2.visible = true
	type2Array[nnn].position.y = 1
	type2Array[nnn].position.x = type2.position.z = 0
	type2Array[nnn].ty2 = 0
	type2Array[nnn].vy = 0
	type2Array[nnn].ty2r = (Math.random()*5-2.5)*(5-bh)
	nnn += 1
	type2.mat.color.setHSL(0.67,0.75+(bh/10),bh/10)
}
for(var i=0;i<nnn;i++){
type2Array[i].ty2th = type2Array[i].ty2/9
type2Array[i].vx = Math.sin(type2Array[i].ty2th)*3.5
type2Array[i].vz = Math.cos(type2Array[i].ty2th)*3.5
type2Array[i].position.x = Math.sin(type2Array[i].ty2th)*type2Array[i].ty2/2+type2Array[i].ty2r
type2Array[i].position.z = Math.cos(type2Array[i].ty2th)*type2Array[i].ty2/2+type2Array[i].ty2r
type2Array[i].ty2 += 0.5
if(type2Array[i].visible == true){
collision(ball,type2Array[i],3)
if(type2Array[i].visible == false){
	hit += 3
}
}
}
for (var i=0;i<nnn;i++){
	if(type2Array[i].position.x > 100){
		type2Array[i].visible = false
	}
}

if(TYPE == 3){
	console.log(`3`)
	TYPE = 0
	type3.visible = true
	type3.position.y = 1
	type3.position.x = type3.position.z = 0
	type3.vy = 0
	ty3s = 8
}
var ty3vx = ball.position.x-type3.position.x
var ty3vz = ball.position.z-type3.position.z
type3.vx = ty3vx/Math.abs(ty3vx)
type3.vz = ty3vz/Math.abs(ty3vz)
type3.position.x += type3.vx/25
type3.position.z += type3.vz/25
type3.scale.x = type3.scale.y = type3.scale.z = 1*ty3s/8
if(type3.visible == true){
	collision(ball,type3,ty3s)
}
if(bh<4){
	ty3s+=0.03/bh
}
//-------------------------------------------------------------------------------------------------------------------//
world2D.sl01.value = 50-hit
}
if(hit>=50 || bh <=0){
	T = 1
	type3.visible = true
}
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function keyd(){
	var key = event.keyCode
	//console.log(key)
	if(key == 65){
		LR = 37
	}else if(key == 87){
		UD = 38
	}else if(key == 68){
		LR = 39
	}else if(key == 83){
		UD = 40
	}else if(key == 97){
	    TYPE = 1
	}else if(key == 98){
		TYPE = 2
	}else if(key == 99){
		TYPE = 3
	}else if(key == 32){
        booston = true
	}
}

function keyU(){
	var key = event.keyCode
    
		if(key == 65 || key == 68 ){
			ball.xa = 0
			LR = 0
		}else if(key == 87 || key == 83 ){
			ball.za = 0
			UD = 0
		}else if(key == 32){
			booston = false
		}
	
	
	
}


function clickbtn(e){
	var str = e.target.parent.name
	if(str === `btnUp`){
		ball.za = -g
	}else if(str === `btnDown`){
		ball.za = g
	}else if(str === `btnLeft`){
		ball.xa = -g
	}else if(str === `btnRight`){
		ball.xa = g
	}else if(str === `btn01`){
		world2D.btn01.setLabel(`重新`)
        world2D.btn02.setLabel(`衝刺`)
		word01.position.y = 150
		word02.position.y = 150
		word03.position.y = 150
		word04.position.y = 150
		word05.position.y = 150
		word06.position.y = 150
		word07.position.y = 150
		word08.position.y = 150
		word09.position.y = 150
		word10.position.y = 150
		hit = 0
		ty3s = 8
		ty1s = 3
		type3.visible = false
		bh = 5
		boost = 100
		center.mat.color.setHex(0x999999)
		for(var i = 0;i<nnn;i++){
			type2Array[i].visible = false
		}
		ball.position.x = 30
		ball.position.z = -30
		ball.vx = ball.vz = 0
	}else if(str === `btn02`){
		if(boost>0){
            booston = true
		}
	}
}

function clickbtn01(e){
	var str = e.target.parent.name
	if(str === `btn02`){
		booston = false
	}
}

function collision(ballA,ballB,dis){
	let isCollision=false;
	let mA=ballA.mass||1;
	let mB=ballB.mass||1;
	var r12x=ballA.position.x-ballB.position.x;
	var r12y=ballA.position.y-ballB.position.y;
	var r12z=ballA.position.z-ballB.position.z;
	var rr=Math.sqrt(r12x*r12x+r12y*r12y+r12z*r12z);
	var vcx=(mA*ballA.vx+mB*ballB.vx)/(mA+mB);
	var vcy=(mA*ballA.vy+mB*ballB.vy)/(mA+mB);
	var vcz=(mA*ballA.vz+mB*ballB.vz)/(mA+mB);
	var v1cx=ballA.vx-vcx;
	var v1cy=ballA.vy-vcy;
	var v1cz=ballA.vz-vcz;
	var v2cx=ballB.vx-vcx;
	var v2cy=ballB.vy-vcy;
	var v2cz=ballB.vz-vcz;
	
	if(rr<dis && (v1cx*r12x+v1cy*r12y+v1cz*r12z)<0){
		let isCollision=true;
		var n12x=r12x/rr;
		var n12y=r12y/rr;
		var n12z=r12z/rr;
		var v1c_n12=Math.abs(v1cx*n12x+v1cy*n12y+v1cz*n12z);
		var v2c_n12=Math.abs(v2cx*n12x+v2cy*n12y+v2cz*n12z);
		ballA.vx=vcx+v1cx+2*(v1c_n12*n12x);
		ballA.vy=vcy+v1cy+2*(v1c_n12*n12y);
		ballA.vz=vcz+v1cz+2*(v1c_n12*n12z);
		ballB.vx=vcx+v2cx-2*(v2c_n12*n12x);
		ballB.vy=vcy+v2cy-2*(v2c_n12*n12y);
		ballB.vz=vcz+v2cz-2*(v2c_n12*n12z);
		ballB.visible = false
		
		if(ballB === type3){
			hit+=5
		}
		if(ballB === center){
			bhi = true
			ballB.visible = true
			ballA.vx *=7
			ballA.vz *=7
		}
		
	}
	
	return isCollision;
}

function TYPE1(){
	type1 = new TEACHER.ObjSphere(2,0x010101)
    scene.add(type1)
	type1Array.push(type1)
	type1.scale.x = type1.scale.y = type1.scale.z = ty1s/3
	console.log(`1`)
	TYPE = 0
	type1Array[ty1c].position.y = 1
	type1Array[ty1c].position.x = type1.position.z = 0
	type1Array[ty1c].vx = Math.sin(thete)*(ty1s/3)
	type1Array[ty1c].vz = Math.cos(thete)*(ty1s/3)
	type1Array[ty1c].vy = 0
    ty1c += 1
	if(bh<3){
		type1.mat.color.setHSL(0,1,0.35)
		center.mat.color.setHSL(0,1,0.35)
	}else{
		type1.mat.color.setHex(0x010101)
	}
}



//resize
MyJS.myResize();

/*
變化任務A：太陽系
1. 從新開始做。
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
