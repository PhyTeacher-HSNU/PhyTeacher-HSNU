'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 認識陣列：
	(1) var tempArray=[1,2,3,4,5,6,7,8,9,10];
	    log(tempArray[5]) 會輸出什麼？
	(2) 用 for迴圈, push 的方式創造一個 20 格的陣列，放 1~20
	(3) tick 時，每個元素都加上自己，再輸出。

2. 產生多球：
	(1)用 for 迴圈 new TEACHER.ObjSphere(rr,0xff0000) 產生20顆球，
	   放在舞台上，也 push 到 ballArray
	(2)讓第8顆向右走
	(3)改成100顆，排成方陣，tick 時，ball 走 10 以內的亂數。

3. 撞牆反彈：
	(1)仿造密室小球，讓每一顆球都，撞牆反彈
	(2)用老師幫你寫好的 new TEACHER.ObjArrow()加入箭頭，
	   用 .setArrow(x,y,z)顯示速度。
	

4. 彼此彈性碰撞：
	老師幫你寫好的function collision(ballA,ballB,distance)，可以判斷兩個 ball 是否太近，
	太近時會彈性碰撞，在最下面。

*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var nm;
var canons=[];
var player;
var rp=2;
var dt=0.1;
var sp=1.5; 
var nn=200;
var ballArray=[];
var tt=0;
var tt2=0;
var rule;
var gm=0;
var bgm;
var mus=0;
var tc=1;
var inv=0;
var Bhp=100;
var Php=100;
var BOSS;
var bb=[];
var k;
var tk=30;
var atkx;
var atkz;
var bc=0;
var skill;
var skcd=100;
var s2=0;
var s2a=0;
var s2cd=0;
//B.定義init
function init(){
	//基礎
	nm=new TEACHER.ObjTextPlane(100,6,"157321 張庭睿","z",0xffffff,);
	scene.add(nm);
	nm.position.z=55;
	nm.position.x=-35;
	nm.rotation.x=-Math.PI/2

	rule=new TEACHER.ObjPicPlane(200,100,pics.rule,"y")
	scene.add(rule);
	rule.position.y=30;

	//玩家
	player=new TEACHER.ObjSphere(rp,0xff0000);
	scene.add(player);
	player.position.x=player.position.z=40;
	player.position.y=rp-1;

	for(var i=0;i<8;i++){
		var canon=new THREE.Object3D();
		var c1=new TEACHER.ObjCylinder(4,2,0x00ffff);
		canon.add(c1);
		var c2=new TEACHER.ObjCylinder(1,8,0x00ffff,false,"x");
		c2.position.x=4+4;
		canon.add(c2);
		scene.add(canon);
		canons.push(canon);

		if(i+1<=4){
			canon.position.z=-46;
			canon.position.x=46+i*-25;
		}else{
			canon.position.z=46+(i-4)*-25;
			canon.position.x=-46;
		}
	}	

	//BOSS
	BOSS= new THREE.Object3D;
	var b1=new TEACHER.ObjCylinder(8,6,0x000090);
	BOSS.add(b1);
	b1.position.y=2;
	var b2=new TEACHER.ObjCylinder(3,3.25,0x000010,false,"x");
	BOSS.add(b2);
	b2.position.x=9;
	b2.position.y=2;
	var b3=new TEACHER.ObjCylinder(3,3.25,0x000010,false,"x");
	BOSS.add(b3);
	b3.position.x=-9;
	b3.position.y=2;
	var b4=new TEACHER.ObjCylinder(3,3.25,0x000010,false,"z");
	BOSS.add(b4);
	b4.position.z=9;
	b4.position.y=2;
	var b5=new TEACHER.ObjCylinder(3,3.25,0x000010,false,"z");
	BOSS.add(b5);
	b5.position.z=-9;
	b5.position.y=2;
	var b6=new TEACHER.ObjCylinder(3,3.75,0x000010,false,"z");
	BOSS.add(b6);
	b6.position.z=-Math.sin(45)*8;
	b6.position.x=-Math.sin(45)*8;
	b6.position.y=2;
	b6.rotation.y=Math.PI/4;
	var b7=new TEACHER.ObjCylinder(3,3.75,0x000010,false,"z");
	BOSS.add(b7);
	b7.position.z=Math.sin(45)*8;
	b7.position.x=Math.sin(45)*8;
	b7.position.y=2;
	b7.rotation.y=Math.PI/4;
	var b8=new TEACHER.ObjCylinder(3,3.75,0x000010,false,"z");
	BOSS.add(b8);
	b8.position.z= Math.sin(45)*8;
	b8.position.x=-Math.sin(45)*8;
	b8.position.y=2;
	b8.rotation.y=Math.PI*3/4;
	var b9=new TEACHER.ObjCylinder(3,3.75,0x000010,false,"z");
	BOSS.add(b9);
	b9.position.z=-Math.sin(45)*8;
	b9.position.x= Math.sin(45)*8;
	b9.position.y=2;
	b9.rotation.y=Math.PI*3/4;
	scene.add(BOSS);

	//按鍵
	document.addEventListener("keydown",x);
	document.addEventListener("keyup",y);

	world2D.btnUp.on("mousedown",clickbtn);
	world2D.btnDown.on("mousedown",clickbtn);
	world2D.btnRight.on("mousedown",clickbtn);
	world2D.btnLeft.on("mousedown",clickbtn);

	world2D.btnUp.on("pressup",clickbtn2);
	world2D.btnDown.on("pressup",clickbtn2);
	world2D.btnRight.on("pressup",clickbtn2);
	world2D.btnLeft.on("pressup",clickbtn2);

	world2D.btn01.setLabel('開始');
	world2D.btn01.on("click",click);

	world2D.btn02.setLabel(' ');
	world2D.btn02.on("click",click);

	world2D.sl01.setLabel("HP(玩家)");
	world2D.sl01.maximum=100;
	world2D.sl01.minimum=0;
	world2D.sl01.value=100;

	world2D.sl02.setLabel("HP(BOSS)");
	world2D.sl02.maximum=100;
	world2D.sl02.minimum=0;
	world2D.sl02.value=100;

	world2D.sl03.setLabel("技能冷卻(%)");
	world2D.sl03.maximum=100;
	world2D.sl03.minimum=0;
	world2D.sl03.value=100;

	world2D.ch01.setLabel("bgm播放");
	world2D.ch02.setLabel("護盾");

	bgm=new Audio('allData/mp3/bgm2.mp3');

	player.vx=player.vz=player.ax=player.az=0;
	world2D.slCameraRR.maximum=300;
	world2D.slCameraRR.value=150;
	world3D.cameraTheta=0;
	ground.position.y=-1;

	//砲塔子彈
	for(var i =0;i<nn;i++){
		var ball=new TEACHER.ObjSphere(1,0xffff00);
		scene.add(ball);
		ballArray.push(ball);
		ball.isActive=false;
		ball.visible=false;
	}
	//BOSS子彈
	for(var i=0;i<40;i++){
		var ball=new TEACHER.ObjSphere(2.5,0x0000ff);
		scene.add(ball);
		bb.push(ball);
		ball.position.x=25;
		ball.position.y=2;
		ball.position.z=25;
		ball.isActive=false;
		ball.visible=false;
	}
	setInterval(tick,1000/fps);
	setInterval(skc,350);
}

//C.定義tick                                                                                                                       
function tick(){
	//鎖視角、按鍵
	world3D.cameraTheta=0;
	world2D.slCameraRR.value=150;
	world2D.sl01.value=Php;
	world2D.sl02.value=Bhp;
	world2D.sl03.value=skcd;

	//計算參數
	k=Math.floor((100-Bhp)/5);
	tk=30-k;
	if(s2===0){
		s2a=1;
	}else{
		s2a=1.75;
	}


	

	//HP
	if(Bhp<0){
		Bhp=0;
	}
	if(Php<0){
		Php=0;
	}


	//bgm
	if(world2D.ch01.checked && mus===0){
		bgm.play();
		mus=1;
	}

	//gamemode
	if(gm!==0){
		world2D.btn01.setLabel('重來');
	}else{
		world2D.btn01.setLabel('開始');
	}
	if(gm!==0){
		world2D.btn02.setLabel('技能');
	}else{
		world2D.btn02.setLabel('請開聲音');
	}
	
	if(gm===1){
		//砲塔攻擊
		for(var i=0;i<8;i++){
			var canon=canons[i];
			var theta=Math.atan2(-player.position.z+canon.position.z,player.position.x-canon.position.x);
			canon.rotation.y=theta;
			canon.theta=theta;
		}

		tt++;
		tt2++;
		if(tt>tk && skill!==1){
			var canon=canons[Math.floor(Math.random()*8)];
			for(var i=0;i<nn;i++){
				var ball=ballArray[i];
				if(ball.isActive===false){
					ball.isActive=true;
					ball.visible=true;
					i=nn+1;
				}
			}
			tt=0;
			ball.position.x=canon.position.x;
			ball.position.z=canon.position.z;
			ball.vx= (5.5+k)*Math.cos(canon.theta);
			ball.vz=-(5.5+k)*Math.sin(canon.theta);
		}
		
		//BOSS攻擊
		if(tt2>tk*4.5){
			for(var i=0;i<40;i++){
				var ball=bb[i];
				if(ball.isActive===false){
					ball.isActive=true;
					ball.visible=true;
					i=nn+1;
				}
			}
			ball.position.x=BOSS.position.x;
			ball.position.z=BOSS.position.z;
			ball.vx=5+k/2;
			ball.vz=0;

			for(var i=0;i<40;i++){
				var ball=bb[i];
				if(ball.isActive===false){
					ball.isActive=true;
					ball.visible=true;
					i=nn+1;
				}
			}
			ball.position.x=BOSS.position.x;
			ball.position.z=BOSS.position.z;
			ball.vx=-(5+k/2);
			ball.vz=0;

			for(var i=0;i<40;i++){
				var ball=bb[i];
				if(ball.isActive===false){
					ball.isActive=true;
					ball.visible=true;
					i=nn+1;
				}
			}
			ball.position.x=BOSS.position.x;
			ball.position.z=BOSS.position.z;
			ball.vx=0;
			ball.vz=5+k/2;

			for(var i=0;i<40;i++){
				var ball=bb[i];
				if(ball.isActive===false){
					ball.isActive=true;
					ball.visible=true;
					i=nn+1;
				}
			}
			ball.position.x=BOSS.position.x;
			ball.position.z=BOSS.position.z;
			ball.vx=0;
			ball.vz=-(5+k/2);



			for(var i=0;i<40;i++){
				var ball=bb[i];
				if(ball.isActive===false){
					ball.isActive=true;
					ball.visible=true;
					i=nn+1;
				}
			}
			ball.position.x=BOSS.position.x;
			ball.position.z=BOSS.position.z;
			ball.vx=Math.sin(45)*(5+k/2);
			ball.vz=Math.sin(45)*(5+k/2);

			for(var i=0;i<40;i++){
				var ball=bb[i];
				if(ball.isActive===false){
					ball.isActive=true;
					ball.visible=true;
					i=nn+1;
				}
			}
			ball.position.x=BOSS.position.x;
			ball.position.z=BOSS.position.z;
			ball.vx= Math.sin(45)*(5+k/2);
			ball.vz=-Math.sin(45)*(5+k/2);

			for(var i=0;i<40;i++){
				var ball=bb[i];
				if(ball.isActive===false){
					ball.isActive=true;
					ball.visible=true;
					i=nn+1;
				}
			}
			ball.position.x=BOSS.position.x;
			ball.position.z=BOSS.position.z;
			ball.vx=-Math.sin(45)*(5+k/2);
			ball.vz= Math.sin(45)*(5+k/2);

			for(var i=0;i<40;i++){
				var ball=bb[i];
				if(ball.isActive===false){
					ball.isActive=true;
					ball.visible=true;
					i=nn+1;
				}
			}
			ball.position.x=BOSS.position.x;
			ball.position.z=BOSS.position.z;
			ball.vx=-Math.sin(45)*(5+k/2);
			ball.vz=-Math.sin(45)*(5+k/2);

			tt2=0;
		}

		for(var i=0;i<40;i++){
			var ball=bb[i];
			if(ball.isActive){
				ball.position.x+=ball.vx*dt;
				ball.position.z+=ball.vz*dt;

				if(ball.position.x>47||ball.position.x<-47||ball.position.z>47||ball.position.z<-47){
					ball.isActive=false;
					ball.visible=false;
				}
				var rrx=Math.abs(ball.position.x-player.position.z);
				var rrz=Math.abs(ball.position.z-player.position.z);
				if(rrz<4 && rrx<4){
					ball.isActive=false;
					ball.visible=false;
					player.vx=player.vx*0.6+ball.vx*0.4;
					player.vz=player.vz*0.6+ball.vz*0.4;
					if(inv===0){
						Php-=5;
						if(Bhp<50){
							Php-=2;
						}
						if(Bhp<10){
							Php-=3;
						}
					}
				}
			}
		}



		//玩家移動
		player.vx+=dt*player.ax;
		player.vz+=dt*player.az;
		player.position.x+=dt*player.vx*s2a;
		player.position.z+=dt*player.vz*s2a;
		if(player.position.x>50-rp && player.vx>0){
			player.vx*=-0.6;
		}else if(player.position.x<-50+rp && player.vx<0){
			player.vx*=-0.6;
		}
		if(player.position.z>50-rp && player.vz>0){
			player.vz*=-0.6;
		}else if(player.position.z<-50+rp && player.vz<0){
			player.vz*=-0.6;
		}

		//攻擊傷判
		for(var i=0;i<nn;i++){
			var ball=ballArray[i];
			if(ball.isActive && skill!==1){
				ball.position.x+=ball.vx*dt;
				ball.position.z+=ball.vz*dt;

				if(ball.position.x>50||ball.position.x<-50||ball.position.z>50||ball.position.z<-50){
					ball.isActive=false;
				}
				var rx=Math.abs(ball.position.x-player.position.z);
				var rz=Math.abs(ball.position.z-player.position.z);
				if(rz<2.5 && rx<2.5){
					ball.isActive=false;
					player.vx=player.vx*0.8+ball.vx*0.2;
					player.vz=player.vz*0.8+ball.vz*0.2;
					if(inv===0){
						Php-=2;
						if(Bhp<50){
							Php-=1;
						}
						if(Bhp<10){
							Php-=2;
						}
					}
				}
			}
			ball.visible=ball.isActive;
		}

		//無敵
		if(inv===1){
			player.mat.color.setHex(0xffffff);
		}else{
			player.mat.color.setHex(0xff0000);
		}

		//攻擊傷判
		atkx=Math.abs(player.position.x-BOSS.position.x);
		atkz=Math.abs(player.position.z-BOSS.position.z);
		if(atkx<13 && atkz<13){
			Bhp-=15;
			player.vx*=-1.3;
			player.vz*=-1.3;
			bc=1;
		}
	}
	//重置
	if(Php===0||Bhp===0){
		gm=2;
		bgm.pause();
		tc=1;
		mus=0;
		tk=30;
		tt=tt2=0;
	}


	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}


//碰撞
/*function collision(ballA,ballB,dis){
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
			ballB.visible = false;
			if(ballB===cb && inv===0){
				Php-=2;
				console.log(2);
			}else if(ballB===bb){
			}else if(ballB===pb){
			}
		}		
	

	return isCollision;
}*/

//移動(world2D)
function clickbtn(e){
	var str=e.target.parent.name;
	if(gm===1){
		if(str==="btnUp"){
			player.az=-sp;
		}
		if(str==="btnDown"){
			player.az=sp;
		}
		if(str==="btnLeft"){
			player.ax=-sp;
		}
		if(str==="btnRight"){
			player.ax=sp;
		}
}
}

function clickbtn2(){
	if(gm===1){
		player.ax=player.az=0;
		player.vx/=1.1;
		player.vz/=1.1;
	}
}

function click(e){
	var str=e.target.parent.name;
	if(str==="btn01"){
		//gamemode
		if(gm===0||gm===2){
			gm=1;
			rule.position.y=150;
			mus=0;
			Bhp=Php=100;
			player.position.x=player.position.z=40;
			for(var i=0;i<nn;i++){
				var ball=ballArray[i];
				ball.isActive=false;
			}
			//技能
			if(world2D.ch02.checked && tc===1){
				setInterval(ch2,25000);
				tc=0;
			}
			setInterval(re3,10000);
		}else{
			//重置
			gm=0;
			rule.position.y=30;
			mus=2;
			bgm.pause();
			player.position.x=player.position.z=40;
			player.vx=player.vz=player.ax=player.az=0
			for(var i=0;i<nn;i++){
				var ball=ballArray[i];
				ball.isActive=false;
			}
			Bhp=Php=100;
			tt=tt2=0;
		}
	}else if(str==="btn02"){
		//技能
		if(gm===1 && skcd===100){
			skill=1;
			skcd=0;
			setTimeout(ski,5000);
			for(var i=0;i<nn;i++){
				var ball=ballArray[i];
				ball.isActive=false;
			}
		}
	}
}

//移動(鍵盤)
function x(e){
	if(gm!==0){
		if(e.keyCode===40){
			player.az=sp;
		}
		if(e.keyCode===39){
			player.ax=sp;
		}
		if(e.keyCode===38){
			player.az=-sp;
		}
		if(e.keyCode===37){
			player.ax=-sp;
		}
		if(e.keyCode===32){
			if(s2cd===0){
				setTimeout(ski,2000);
				s2cd=1;
				s2=1;
			}
		}
	}
}

function y(e){
	if(gm!==0){
		player.ax=player.az=0;
		player.vx/=1.2;
		player.vz/=1.2;
	}
}

//5S計時
function ch2(){
	inv=1;
	setTimeout(ch2_1,5000);
}
function ch2_1(){
	inv=0;
	Php+=10;
}

//每10秒回血
function re3(){
	if(gm===1){
		Bhp+=5;
		Php+=3;
	}
}

//技能&普攻計數器
function ski(){
	if(gm===1 && skill===1){
		skill=0;
	}
	if(gm===1 && s2===1){
		s2=0;
		setTimeout(sk2c,5000)
	}
}

//技能CD
function skc(){
	if(gm===1 && skcd<100){
		skcd+=1;
	}
}

function sk2c(){
	s2cd=0;
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
