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
var loader;
var theta,omega=0.2;
var t=0,dt=0.1,tchange=0;
var m=75;
var gm=0,pm=0;
var vec1,vec2,vec3,vec4;

//摩天輪(ferris wheel)
var fa,faarray=[],ftarray=[];
var ffr=30,fr=7.2;
var ferris,wheel;

//旋轉木馬(carousel)
var A=5,lambda=4,period=15,yy;
var ca,cb,cc,cd,ce,cf,ch;
var cr=40,cn=20;
var ccarray=[],ctarray=[],caarray=[];
//var tt=0,dt=0.1,tm=0;
//var gm=0,y=0.25,y0,yy,yy1;
//var x1,y1,z1;
//var cm=0;

//碰碰車(bumper)
var ba,baarray=[],bma,bw;
var bn=16,br=3,bnn,bm=75;
var bphi;
var bx,by,bz,brot;

//咖啡杯(teacup)
var ta,tb,tc,td;
var taarray=[],tbarray=[],ttay=[],tcay=[];
var tn=6,ttr=30,tr=1,tcr=7.5,tcn=2,tm=-75;
var ctheta,comega;
var tx,tz,ty,trot;
//var theta,ctheta,omega=0.2,dt=0.1,comega;

//人(未完成)
var person;
var px,py,pz;
var pyc=0.25;


//B.定義init
function init(){

	logo.visible=false;

	vec1=new THREE.Vector3(m,m,0);
	vec2=new THREE.Vector3(-m,m,0);
	vec3=new THREE.Vector3(-m,-m,0);
	vec4=new THREE.Vector3(m,-m,0);

	carousel();
	ferris_wheel();
	bumper();
	teacup();
	man();

	world2D.btn01.on('click',clicked);
	world2D.ch01.setLabel('用wasd及空白鍵控制小人');
	world2D.ch02.setLabel('當小人走到遊樂設施旁邊');
	world2D.ch03.setLabel('就會上去遊玩');
	//world2D.ch04.setLabel('享受這趟遊樂園之旅吧');
	world2D.sl01.visible=world2D.sl02.visible=world2D.sl03.visible=/*world2D.ch01.visible=world2D.ch02.visible=*/world2D.btn02.visible=world2D.btnUp.visible=world2D.btnDown.visible=world2D.btnRight.visible=world2D.btnLeft.visible=false;
	world2D.ch04.visible=false;


	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){

	t+=dt;

	/*if(world2D.ch01.checked===false){
		dt=0;
	}else{
		dt=0.1;
	}*/

	ferris_action();
	carousel_action();
	bupmer_action();
	teacup_action();

	play1(person,25)
	play2(person,50)
	play3(person,50)
	play4(person,50)

	px=person.position.x;
	py=person.position.y;
	pz=person.position.z;
	if(pm===0){
		world2D.slCameraRR.value=250;
		world3D.cameraTarget=new THREE.Vector3(0,0,0);
		//world3D.cameraPhi=0;
		world2D.btn01.setLabel('主角視角')
	}else if(pm===1){
		world3D.cameraTarget=new THREE.Vector3(px,py,pz);
		world2D.slCameraRR.value=50;
		world3D.cameraPhi=person.rotation.y+0.5*Math.PI;
		//cg.rotation.y=world3D.cameraPhi-0.5*Math.PI;
		world2D.btn01.setLabel('上帝視角')
	}

	if(gm===1){
		person.position.y=(45-fr)+ffr*Math.sin(ftarray[1])-4;
		person.position.x=ffr*Math.cos(ftarray[1])+m;
		person.position.z=-m;

		dt=0.1;

		tchange+=1;
		if(tchange>=1200){
			gm=0;
			person.position.x=75;
			person.position.z=-25;
			person.position.y=0;
		}
	}else if(gm===2){
		yy=A*Math.sin(2*Math.PI*1/lambda-2*Math.PI*t/period);
		person.position.y=15+yy;

		person.position.x=cr*Math.cos(ctarray[1])-m;
		person.position.z=cr*-1*Math.sin(ctarray[1])-m;
		person.rotation.y=ctarray[1]+0.5*Math.PI;

		dt=0.1;

		tchange+=1;
		if(tchange>=1200){
			gm=0;
			person.position.x=-25;
			person.position.z=-25;
			person.position.y=0;
		}
	}else if(gm===3){
		person.position.x=tx;
		person.position.z=tz;
		person.position.y=ty;
		person.rotation.y=trot+0.5*Math.PI;

		dt=0.1;

		tchange+=1;
		if(tchange>=1200){
			gm=0;
			person.position.x=-25;
			person.position.z=25;
			person.position.y=0;
		}
	}else if(gm===4){
		person.position.x=bx;
		person.position.z=bz;
		person.position.y=by;
		person.rotation.y=brot+0.5*Math.PI;

		dt=0.1;

		tchange+=1;
		if(tchange>=1200){
			gm=0;
			person.position.x=75;
			person.position.z=0;
			person.position.y=0;
		}
	}else if(gm===0){
		dt=0;
		tchange=0;
	}
	

	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}


//resize
MyJS.myResize();


function keyFunction() {
	//console.log("Key code = "+event.keyCode);
	if(event.keyCode===87){
		//w
		person.position.z-=1;
		person.rotation.y=0.85*person.rotation.y+0.15*-0.5*Math.PI;
	}else if(event.keyCode===65){
		//a
		person.position.x-=1;
		person.rotation.y=0.85*person.rotation.y+0.15*0;
	}else if(event.keyCode===83){
		//s
		person.position.z+=1;
		person.rotation.y=0.85*person.rotation.y+0.15*0.5*Math.PI;
	}else if(event.keyCode===68){
		//d
		person.position.x+=1;
		person.rotation.y=0.85*person.rotation.y+0.15*Math.PI;
	}else if(event.keyCode===32){
		if(person.position.y>5 && pyc>0){
			pyc*=-1;
		}else if(person.position.y<0 && pyc<0){
			pyc*=-1;
		}
		person.position.y+=pyc;
	}
};
document.onkeydown=keyFunction;

function kk(){
	if(event.keyCode===32){
		person.position.y=0;
	}
};
document.onkeyup=kk;
/*'w'=87 'a'=65 's'=83 'd'=68 ' '=32*/

function clicked(e){
	var str=e.target.parent.name;

	if(str==='btn01'){
		if(pm===0){
			pm=1;
		}else if(pm===1){
			pm=0;
		}
	}
};

//碰撞
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
		
	}

	return isCollision;
};

function play1(playera,dis){
	let isCollision=false;
	var r12x=playera.position.x-m;
	var r12z=playera.position.z+m;
	var rr=Math.sqrt(r12x*r12x+r12z*r12z);

	if(rr<dis){
		let isCollision=true;
		gm=1;
		//log(1)
	}
	return isCollision;
};
function play2(playera,dis){
	let isCollision=false;
	var r12x=playera.position.x+m;
	var r12z=playera.position.z+m;
	var rr=Math.sqrt(r12x*r12x+r12z*r12z);

	if(rr<dis){
		let isCollision=true;
		gm=2;
		//log(2)
	}
	return isCollision;
};
function play3(playera,dis){
	let isCollision=false;
	var r12x=playera.position.x+m;
	var r12z=playera.position.z-m;
	var rr=Math.sqrt(r12x*r12x+r12z*r12z);

	if(rr<dis){
		let isCollision=true;
		gm=3;
		//log(3)
	}
	return isCollision;
};
function play4(playera,dis){
	let isCollision=false;
	var r12x=playera.position.x-m;
	var r12z=playera.position.z-m;
	var rr=Math.sqrt(r12x*r12x+r12z*r12z);

	if(rr<dis){
		let isCollision=true;
		gm=4;
		//log(4)
	}
	return isCollision;
};


function man(){
	loader=new THREE.ObjectLoader();
	person=loader.parse(mmm);
	scene.add(person);

	person.scale.x=person.scale.y=person.scale.z=1.75;
	person.rotation.y=-0.5*Math.PI;
};

/*function man_action(){

};*/

function carousel(){
	for(var i=0;i<cn;i++){
		loader=new THREE.ObjectLoader();
		cc=loader.parse(hhh);
		scene.add(cc);
		ccarray.push(cc);

		theta=i*2*Math.PI/cn;
		ctarray.push(theta);
		
		cc.position.x=cr*Math.cos(theta)-m;
		cc.position.z=cr*-1*Math.sin(theta)-m;
		cc.rotation.y=theta+0.5*Math.PI;
		cc.scale.x=cc.scale.y=cc.scale.z=1.5;

		ca=new TEACHER.ObjCylinder(0.25,40,0xaaaaaa);
		scene.add(ca);
		caarray.push(ca);
		ca.position.x=cr*Math.cos(theta)-m;
		ca.position.z=cr*-1*Math.sin(theta)-m;
		ca.position.y=15;
	}

	cb=new TEACHER.ObjCylinder(cr+5,6,0xaaaaaa);
	scene.add(cb);
	cb.position.y=3;
	cb.position.z=-m;
	cb.position.x=-m;

	cd=new TEACHER.ObjCylinder(cr+10,5,0xcccccc);
	scene.add(cd);
	cd.position.y=2.5;
	cd.position.z=-m;
	cd.position.x=-m;

	ce=new TEACHER.ObjCylinder(cr-15,40,0x999999);
	scene.add(ce);
	ce.position.y=15;
	ce.position.z=-m;
	ce.position.x=-m;

	loader=new THREE.ObjectLoader();
	cf=loader.parse(ttt);
	scene.add(cf);
	cf.position.y=45;
	cf.position.z=-m;
	cf.position.x=-m;
	cf.scale.x=cf.scale.z=cf.scale.y=1.5;

	loader=new THREE.ObjectLoader();
	ch=loader.parse(sss);
	scene.add(ch);
	ch.position.z=34-m;
	ch.position.x=-m;
	ch.rotation.y=0.5*Math.PI;
	ch.scale.y=ch.scale.y*5/6;
};

function carousel_action(){
	for(var i=0;i<cn;i++){
		var cc=ccarray[i]
		var ca=caarray[i]

		yy=A*Math.sin(2*Math.PI*i/lambda-2*Math.PI*t/period);
		cc.position.y=15+yy;

		ctarray[i]+=omega*dt*-0.25;
		cc.position.x=cr*Math.cos(ctarray[i])-m;
		cc.position.z=cr*-1*Math.sin(ctarray[i])-m;
		cc.rotation.y=ctarray[i]+0.5*Math.PI;

		ca.position.x=cr*Math.cos(ctarray[i]-0.05)-m;
		ca.position.z=cr*-1*Math.sin(ctarray[i]-0.05)-m;
	};
	cb.rotation.y-=omega*dt*0.25;
	ce.rotation.y-=omega*dt*0.25;
};

function ferris_wheel(){
	loader=new THREE.ObjectLoader();
	ferris=loader.parse(fff);
	scene.add(ferris);
	wheel=ferris.getChildByName('wheel');

	ferris.position.x=m;
	ferris.position.z=-m;
	ferris.scale.x=ferris.scale.y=3
	ferris.scale.z=6;

	ffr=ffr-fr;
	for(var i=0;i<6;i++){
		loader=new THREE.ObjectLoader();
		fa=loader.parse(rrr)
		scene.add(fa);
		faarray.push(fa);

		theta=i*2*Math.PI/6;
		ftarray.push(theta);
		fa.position.y=(45-fr)+ffr*Math.sin(theta);
		fa.position.x=ffr*Math.cos(theta)+m;
		fa.position.z=-m;
	};
};

function ferris_action(){
	wheel.rotation.z=ftarray[1];

	for(var i=0;i<6;i++){
		var fa=faarray[i];
		
		fa.position.y=(45-fr)+ffr*Math.sin(ftarray[i]);
		fa.position.x=ffr*Math.cos(ftarray[i])+m;
		fa.position.z=-m;
		ftarray[i]+=omega*dt;
	};
};

function bumper(){
	for(var i=0;i<bn;i++){
		loader=new THREE.ObjectLoader();
		ba=loader.parse(bbb);
		scene.add(ba);
		baarray.push(ba);

		bnn=Math.sqrt(bn);
		ba.position.x=(-(bm/2)+(bm/2)/bnn)+(i%bnn)*(bm/bnn)+m;
		ba.position.z=(-(bm/2)+(bm/2)/bnn)+Math.floor(i/bnn)*(bm/bnn)+m;

		ba.vx=5*(Math.random()-0.5);
		ba.vz=5*(Math.random()-0.5);
		ba.vy=0;
	};

	loader=new THREE.ObjectLoader();
	bw=loader.parse(www);
	scene.add(bw);

	bw.position.x=m;
	bw.position.z=m;
	bw.scale.x=bw.scale.y=bw.scale.z=2.75;
	bw.rotation.y=0.5*Math.PI;
};

function bupmer_action(){
	
	for(var i=0;i<bn;i++){
		var ba=baarray[i];

		bphi=Math.atan2(baarray[i].vx,baarray[i].vz);

		ba.position.x+=ba.vx*dt;
		ba.position.z+=ba.vz*dt;
		ba.rotation.y=0.95*ba.rotation.y+0.05*bphi;

		if(ba.position.x>(bm/2)-br+m && ba.vx>0){
			ba.vx*=-1;
		}else if(ba.position.x<-(bm/2)+br+m && ba.vx<0){
			ba.vx*=-1;
		}
		if(ba.position.z>(bm/2)-br+m && ba.vz>0){
			ba.vz*=-1;
		}else if(ba.position.z<-(bm/2)+br+m && ba.vz<0){
			ba.vz*=-1;
		}
		bx=baarray[1].position.x;
		by=baarray[1].position.y;
		bz=baarray[1].position.z;
		brot=baarray[1].rotation.y;
	};

	for(var i=0;i<bn-1;i++){
		for(var j=i+1;j<bn;j++){
			var ball1=baarray[i];
			var ball2=baarray[j];

			collision(ball1,ball2,br*2)
		}
	};
};

function teacup(){
	td=new TEACHER.ObjCylinder(45,5,0xffffff);
	scene.add(td);
	td.position.y=2.5;
	td.position.x=-m;
	td.position.z=m;

	for(var i=0;i<tn;i++){
		tb=new TEACHER.ObjCylinder(12.5,2,0xcccccc);
		scene.add(tb);
		tbarray.push(tb);

		theta=2*Math.PI/tn*i;
		ttay.push(theta);

		tb.position.x=ttr*Math.cos(theta)-m;
		tb.position.z=ttr*Math.sin(theta)+m;
		tb.position.y=4.75;

		tb.vx=(Math.random()+1)*0.0625;

		for(var j=0;j<tcn;j++){
			loader=new THREE.ObjectLoader();
			ta=loader.parse(ccc);
			scene.add(ta);
			taarray.push(ta);

			ctheta=2*Math.PI/tcn*j;
			tcay.push(ctheta);
	
			ta.position.x=tcr*Math.cos(ctheta)-m;
			ta.position.z=tcr*Math.sin(ctheta)+m;
			ta.position.y=6.25;
			ta.scale.x=ta.scale.y=ta.scale.z=2.75;

			ta.vx=(Math.random()+1)*0.25;
		}
	}

	loader=new THREE.ObjectLoader();
	tc=loader.parse(kkk);
	td.add(tc);
	tc.scale.x=tc.scale.y=tc.scale.z=1.75;
	tc.position.y=1.75;
};

function teacup_action(){
	td.rotation.y-=omega*dt;

	for(var i=0;i<tn;i++){
		var tb=tbarray[i];

		tb.rotation.y+=tb.vx*dt;
		tb.position.x=ttr*Math.cos(ttay[i])-m;
		tb.position.z=ttr*Math.sin(ttay[i])+m;

		ttay[i]-=omega*dt;

		for(var j=0;j<tcn;j++){
			var ta=taarray[i*2+j];

			ta.rotation.y+=ta.vx*dt;
			ta.position.x=tcr*Math.cos(tcay[i*2+j])+tbarray[i].position.x;
			ta.position.z=tcr*Math.sin(tcay[i*2+j])+tbarray[i].position.z;
			
			tcay[i*2+j]+=tb.vx*dt;
			tx=taarray[1].position.x;
			ty=taarray[1].position.y+2.5;
			tz=taarray[1].position.z;
			trot=taarray[1].rotation.y;
		}
	}
};


var fff={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "8E86B52E-93CE-43DD-BD7B-E32CFBD94F0C",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 3,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "C208B157-4214-4D71-95D0-D27DAA112ED9",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 3,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "1B5BBA3A-80CC-418F-8A44-D7D01E4931D0",
			"type": "CylinderGeometry",
			"radiusTop": 2.828,
			"radiusBottom": 2.83,
			"height": 2,
			"radialSegments": 4,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "CE717771-17CC-4D0F-82FC-F41F68B3F8A4",
			"type": "CylinderGeometry",
			"radiusTop": 1.25,
			"radiusBottom": 1.25,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "31B003CF-EFDB-4AF5-93A2-D77334C2739C",
			"type": "TorusGeometry",
			"radius": 8,
			"tube": 0.25,
			"radialSegments": 8,
			"tubularSegments": 100,
			"arc": 6.283185307179586
		},
		{
			"uuid": "A497803D-BC76-4DFF-B30D-601B1FB1906B",
			"type": "TorusGeometry",
			"radius": 8,
			"tube": 0.25,
			"radialSegments": 8,
			"tubularSegments": 100,
			"arc": 6.283185307179586
		},
		{
			"uuid": "FE303739-1B89-43E5-9CE6-69D201E04C37",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 4,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
			"type": "BoxGeometry",
			"width": 8,
			"height": 0.5,
			"depth": 0.5,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "CC0CD06D-8641-4162-A80F-3E63387C9E1D",
			"type": "CylinderGeometry",
			"radiusTop": 0.25,
			"radiusBottom": 0.25,
			"height": 3,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "1EE7EEFC-BEAE-421A-AD32-DCB1BAEF1B76",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"reffractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "FDA326A7-1192-4E2B-853E-C1CE3B0DF57B",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"reffractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "78D2C8C1-E9D6-4127-973E-84DD840F1C38",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"reffractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "CD300E99-0BDE-4ACE-B791-44EB054CCB27",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"reffractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "7F25E0C7-105A-484C-90B4-484B26054494",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"reffractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "2CF1D940-5FE1-4C69-81D1-E088F467E01B",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"reffractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "ECA66C83-8AB5-4927-BD51-177B4BCCA979",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"reffractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"reffractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "238E8164-0E1E-41C3-84BD-4B0583504D87",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"reffractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "6113B391-A403-484F-8A69-165B21C3AB85",
		"type": "Group",
		"name": "ferris wheel",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "E7971A34-AE10-4515-A235-46D0F88CB2B9",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [4,0,0,0,0,8.881784197001253e-17,-0.4,0,0,10,2.220446049250313e-15,0,0,5,2.2,1],
				"geometry": "8E86B52E-93CE-43DD-BD7B-E32CFBD94F0C",
				"material": "1EE7EEFC-BEAE-421A-AD32-DCB1BAEF1B76"
			},
			{
				"uuid": "C95DEF51-FB32-4057-9DE3-7EC9C2FE4BFF",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [4,0,0,0,0,6.661338147750939e-17,-0.3,0,0,10,2.220446049250313e-15,0,0,5,-2.2,1],
				"geometry": "C208B157-4214-4D71-95D0-D27DAA112ED9",
				"material": "FDA326A7-1192-4E2B-853E-C1CE3B0DF57B"
			},
			{
				"uuid": "8C8CF1A3-6BDF-402E-93D1-D967B6937F92",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.7071067811865475,0,-0.7071067811865476,0,0,1,0,0,0.7071067811865476,0,0.7071067811865475,0,0,1,0,1],
				"geometry": "1B5BBA3A-80CC-418F-8A44-D7D01E4931D0",
				"material": "78D2C8C1-E9D6-4127-973E-84DD840F1C38"
			},
			{
				"uuid": "BD5B5C12-8AAA-4E70-9746-6D09A3B66128",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,0,15,2.2,1],
				"geometry": "CE717771-17CC-4D0F-82FC-F41F68B3F8A4",
				"material": "CD300E99-0BDE-4ACE-B791-44EB054CCB27"
			},
			{
				"uuid": "7467B868-014A-45AA-A3AF-667324B7E24B",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,0,15,-2.2,1],
				"geometry": "CE717771-17CC-4D0F-82FC-F41F68B3F8A4",
				"material": "CD300E99-0BDE-4ACE-B791-44EB054CCB27"
			},
			{
				"uuid": "4FAFB1DD-EF3A-4C2F-AFBC-6EC59BA662A4",
				"type": "Group",
				"name": "wheel",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,15,0,1],
				"children": [
					{
						"uuid": "B108CA87-89E7-49D6-B163-55C8F89F68E2",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,1.5,1],
						"geometry": "31B003CF-EFDB-4AF5-93A2-D77334C2739C",
						"material": "7F25E0C7-105A-484C-90B4-484B26054494"
					},
					{
						"uuid": "0E0D7114-7E54-4530-88A1-CC80B22CC3E9",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,-1.5,1],
						"geometry": "A497803D-BC76-4DFF-B30D-601B1FB1906B",
						"material": "2CF1D940-5FE1-4C69-81D1-E088F467E01B"
					},
					{
						"uuid": "9B5E6F4F-270E-4625-9D0F-2CA5B54246DB",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [1,0,0,0,0,2.220446049250313e-16,-1,0,0,1,2.220446049250313e-16,0,0,0,0,1],
						"geometry": "FE303739-1B89-43E5-9CE6-69D201E04C37",
						"material": "ECA66C83-8AB5-4927-BD51-177B4BCCA979"
					},
					{
						"uuid": "6C969F9E-7805-4707-A09C-B9C908137F4A",
						"type": "Group",
						"name": "Group",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,-1.5,1],
						"children": [
							{
								"uuid": "2A7AA833-38C8-4A9F-9D13-DF4201FC04DC",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,4,0,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "D90FBA0A-33C8-402B-85A6-CA232918E01C",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [0.49999999999999956,-0.8660254037844384,0,0,0.8660254037844384,0.49999999999999956,0,0,0,0,1,0,2,-3.464,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "A45252BB-A44A-4165-9204-9AD71A7E58BF",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [-0.4999999999999998,-0.8660254037844388,0,0,0.8660254037844388,-0.4999999999999998,0,0,0,0,1,0,-2,-3.464,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "89E1BA2D-FCF4-4AC7-8BDD-EB4F08E8078C",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-4,0,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "2A4EE428-E3C2-4CA8-91EF-5508ABB01FF6",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [0.49999999999999956,0.8660254037844384,0,0,-0.8660254037844384,0.49999999999999956,0,0,0,0,1,0,2,3.464,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "023423E0-9D53-4488-B087-F8F0FA0D5585",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [-0.500000000000001,0.8660254037844385,0,0,-0.8660254037844385,-0.500000000000001,0,0,0,0,1,0,-2,3.464,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							}]
					},
					{
						"uuid": "ADEC2EE8-68E7-41F2-AE0B-028DB4AC3325",
						"type": "Group",
						"name": "Group",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,1.5,1],
						"children": [
							{
								"uuid": "ADB94276-2788-4DA4-865D-C011366EBDAE",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,4,0,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "67883D76-5DE6-4AB1-8041-9B07FE9F4449",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [0.49999999999999956,-0.8660254037844384,0,0,0.8660254037844384,0.49999999999999956,0,0,0,0,1,0,2,-3.464,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "D2E7FDBD-9C39-46E1-B84C-5040854FA763",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [-0.4999999999999998,-0.8660254037844388,0,0,0.8660254037844388,-0.4999999999999998,0,0,0,0,1,0,-2,-3.464,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "B5C0AECE-A55C-45B9-9324-647DD07E16AC",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-4,0,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "6F241367-9F0F-487B-8F11-329BA8CA74B4",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [0.49999999999999956,0.8660254037844384,0,0,-0.8660254037844384,0.49999999999999956,0,0,0,0,1,0,2,3.464,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							},
							{
								"uuid": "8EFC1C45-9872-4003-A704-8275F2A1468F",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [-0.500000000000001,0.8660254037844385,0,0,-0.8660254037844385,-0.500000000000001,0,0,0,0,1,0,-2,3.464,0,1],
								"geometry": "DA5B0490-8940-4404-876A-A7F0A3F81DA6",
								"material": "F9A0C0F2-C082-4C7F-8BBB-6308FA4A170A"
							}]
					},
					{
						"uuid": "356A797C-D1FD-4F80-8118-F6FD1CA7F6F3",
						"type": "Group",
						"name": "Group",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
						"children": [
							{
								"uuid": "C6115961-1DE8-49E9-819D-D4082F98F2F9",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,8,0,0,1],
								"geometry": "CC0CD06D-8641-4162-A80F-3E63387C9E1D",
								"material": "238E8164-0E1E-41C3-84BD-4B0583504D87"
							},
							{
								"uuid": "6FCACBB9-66F2-4FC7-B218-EE470FA45988",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,4,-6.928,0,1],
								"geometry": "CC0CD06D-8641-4162-A80F-3E63387C9E1D",
								"material": "238E8164-0E1E-41C3-84BD-4B0583504D87"
							},
							{
								"uuid": "407C4629-2EF4-454B-9CA5-7E8CEA978932",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,-4,-6.928,0,1],
								"geometry": "CC0CD06D-8641-4162-A80F-3E63387C9E1D",
								"material": "238E8164-0E1E-41C3-84BD-4B0583504D87"
							},
							{
								"uuid": "19D1AEAD-A9DA-428E-AEEA-0D742BB4C6EC",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,-8,0,0,1],
								"geometry": "CC0CD06D-8641-4162-A80F-3E63387C9E1D",
								"material": "238E8164-0E1E-41C3-84BD-4B0583504D87"
							},
							{
								"uuid": "F5E8C714-C496-4499-8A46-4E88792A9D2C",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,4,6.928,0,1],
								"geometry": "CC0CD06D-8641-4162-A80F-3E63387C9E1D",
								"material": "238E8164-0E1E-41C3-84BD-4B0583504D87"
							},
							{
								"uuid": "30407391-E443-4A13-8390-A1A3569FBB1B",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,-4,6.928,0,1],
								"geometry": "CC0CD06D-8641-4162-A80F-3E63387C9E1D",
								"material": "238E8164-0E1E-41C3-84BD-4B0583504D87"
							}]
					}]
			}]
	}
};//ferris_wheel

var rrr={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "122F3563-B107-4E19-95D5-5FF1EDDD8B1E",
			"type": "SphereGeometry",
			"radius": 7.2,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 1.5707963267948966
		},
		{
			"uuid": "AF48C460-2D96-4D73-989E-405FC18783CD",
			"type": "CircleGeometry",
			"radius": 7.2,
			"segments": 30,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "EC1CE8A9-FD97-4314-9826-87B18AD0C5E0",
			"type": "TorusGeometry",
			"radius": 6.8,
			"tube": 0.4,
			"radialSegments": 30,
			"tubularSegments": 30,
			"arc": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "53B004ED-2F6E-424A-BB2F-BD5AA50D15C2",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "5D2EECAA-B32C-4BCE-B0EA-3B1CEC1214A4",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "7F69AD30-04C5-497B-A916-475FEE6DD6D3",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "4CB46AAE-D316-45F0-8160-B35E3DBC8AB1",
		"type": "Group",
		"name": "wheel",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "03670519-DA2C-4DB6-9F0F-B720F89D7C6A",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [-1,1.2246467991473532e-16,0,0,-1.2246467991473532e-16,-1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "122F3563-B107-4E19-95D5-5FF1EDDD8B1E",
				"material": "53B004ED-2F6E-424A-BB2F-BD5AA50D15C2"
			},
			{
				"uuid": "58895914-A487-4562-8D18-B910D666F419",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [1,0,0,0,0,2.220446049250313e-16,-1,0,0,1,2.220446049250313e-16,0,0,0,0,1],
				"geometry": "AF48C460-2D96-4D73-989E-405FC18783CD",
				"material": "5D2EECAA-B32C-4BCE-B0EA-3B1CEC1214A4"
			},
			{
				"uuid": "CC6DFC6A-8DC6-42FE-9BB7-7519D5F6658C",
				"type": "Mesh",
				"name": "Torus",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "EC1CE8A9-FD97-4314-9826-87B18AD0C5E0",
				"material": "7F69AD30-04C5-497B-A916-475FEE6DD6D3"
			},
			{
				"uuid": "DB8F72B9-113D-459C-A8A1-294337E1B144",
				"type": "Mesh",
				"name": "Torus",
				"layers": 1,
				"matrix": [0.5000000000000001,0,-0.8660254037844386,0,0,1,0,0,0.8660254037844386,0,0.5000000000000001,0,0,0,0,1],
				"geometry": "EC1CE8A9-FD97-4314-9826-87B18AD0C5E0",
				"material": "7F69AD30-04C5-497B-A916-475FEE6DD6D3"
			},
			{
				"uuid": "30978663-D2E0-43C6-BF45-F6A518E742EF",
				"type": "Mesh",
				"name": "Torus",
				"layers": 1,
				"matrix": [0.5000000000000001,0,0.8660254037844386,0,0,1,0,0,-0.8660254037844386,0,0.5000000000000001,0,0,0.02,0,1],
				"geometry": "EC1CE8A9-FD97-4314-9826-87B18AD0C5E0",
				"material": "7F69AD30-04C5-497B-A916-475FEE6DD6D3"
			}]
	}
};//ferris_room

var mmm={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "8797A240-96BE-45D7-91BA-FDFE4EA1968E",
			"type": "CylinderGeometry",
			"radiusTop": 0.1,
			"radiusBottom": 0.4,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "D842F958-4FA7-4EB0-B9C4-23D5F74A6B1E",
			"type": "CylinderGeometry",
			"radiusTop": 0.1,
			"radiusBottom": 0.4,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "6D22FCCF-61F3-47C2-BBAB-5993C01A8231",
			"type": "CylinderGeometry",
			"radiusTop": 0.5,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 2,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "EC1DDCB0-5A9F-4B7C-B2F3-8E55C38D0CCB",
			"type": "SphereGeometry",
			"radius": 1,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		}],
	"materials": [
		{
			"uuid": "84A8F708-6C4F-4FD1-B463-A163B49484E8",
			"type": "MeshStandardMaterial",
			"color": 16711680,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "2909F491-D5B1-4699-B892-277464E8C4DF",
			"type": "MeshStandardMaterial",
			"color": 16711680,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "69E4D98D-017F-45F6-A319-57E93F602600",
			"type": "MeshStandardMaterial",
			"color": 16711680,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "A8A30E4A-3222-4798-A0B0-C7E2CF435D9D",
			"type": "MeshStandardMaterial",
			"color": 16711680,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "890727ED-2F11-4547-ACEC-B39C8BD8AB9E",
		"type": "Group",
		"name": "Group",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "4F73EE2C-055A-4EC7-82ED-A46AC4260BCF",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,2.883785087814957,0.8269120674509974,0,0,-0.2756373558169991,0.9612616959383189,0,0,1.5,-1.2,1],
				"geometry": "8797A240-96BE-45D7-91BA-FDFE4EA1968E",
				"material": "84A8F708-6C4F-4FD1-B463-A163B49484E8"
			},
			{
				"uuid": "4AB7D60E-D8ED-4A3D-AC4E-C905567AED13",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,2.883785087814957,-0.8269120674509974,0,0,0.2756373558169991,0.9612616959383189,0,0,1.5,1.2,1],
				"geometry": "D842F958-4FA7-4EB0-B9C4-23D5F74A6B1E",
				"material": "2909F491-D5B1-4699-B892-277464E8C4DF"
			},
			{
				"uuid": "AC614230-A6F7-4ED7-A139-1E5610670909",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,3.2,0,0,0,0,1,0,0,1.6,0,1],
				"geometry": "6D22FCCF-61F3-47C2-BBAB-5993C01A8231",
				"material": "69E4D98D-017F-45F6-A319-57E93F602600"
			},
			{
				"uuid": "038199FD-BA06-453D-A297-4B31722B5DB5",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,4.4,0,1],
				"geometry": "EC1DDCB0-5A9F-4B7C-B2F3-8E55C38D0CCB",
				"material": "A8A30E4A-3222-4798-A0B0-C7E2CF435D9D"
			}]
	}
};//man

var sss={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "13EE28F3-5C99-4C9A-B04F-5991CE1308EC",
			"type": "CylinderGeometry",
			"radiusTop": 6,
			"radiusBottom": 6,
			"height": 2,
			"radialSegments": 30,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "45231E09-BBB8-4F09-AA15-8ED567CE65E8",
			"type": "CylinderGeometry",
			"radiusTop": 3,
			"radiusBottom": 3,
			"height": 4,
			"radialSegments": 30,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "3253C545-C489-4DEB-BA75-F8733BB12F05",
			"type": "MeshStandardMaterial",
			"color": 13421772,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "F2C688A2-DF0D-490F-9B7D-5F4042F7D7EE",
		"type": "Group",
		"name": "stair",
		"layers": 1,
		"matrix": [1.5,0,0,0,0,1,0,0,0,0,2,0,0,0,0,1],
		"children": [
			{
				"uuid": "258A6564-B826-403D-B30C-794026853AEE",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1],
				"geometry": "13EE28F3-5C99-4C9A-B04F-5991CE1308EC",
				"material": "3253C545-C489-4DEB-BA75-F8733BB12F05"
			},
			{
				"uuid": "6673E788-3FA8-4108-A6AB-877322DD56EA",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,2,0,1],
				"geometry": "45231E09-BBB8-4F09-AA15-8ED567CE65E8",
				"material": "3253C545-C489-4DEB-BA75-F8733BB12F05"
			}]
	}
};//carousel_stair

var ttt={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "8768A99D-5BBA-4232-ABA4-0899D2750D42",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 35,
			"height": 12.5,
			"radialSegments": 30,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "C476C302-11A3-4A55-8CE1-B8912E5F6653",
			"type": "MeshStandardMaterial",
			"color": 12303291,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "6342BDF0-1DE0-42AC-947A-5736AF41684D",
		"type": "Mesh",
		"name": "Cylinder",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"geometry": "8768A99D-5BBA-4232-ABA4-0899D2750D42",
		"material": "C476C302-11A3-4A55-8CE1-B8912E5F6653"
	}
};//carousel_top

var hhh={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "9EDC1DB7-DA78-4810-8D3B-A821CBFAA057",
			"type": "SphereGeometry",
			"radius": 1,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "82171B6B-A923-44BD-8BDE-55B361FBB5BF",
			"type": "CylinderGeometry",
			"radiusTop": 0.25,
			"radiusBottom": 0.25,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "D119072D-1259-47DB-9EF9-F4598FEF4F45",
			"type": "CylinderGeometry",
			"radiusTop": 1.25,
			"radiusBottom": 1.25,
			"height": 2.5,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "790E2D20-0379-47E7-9775-C74CCB82F8CD",
			"type": "SphereGeometry",
			"radius": 1.25,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "71E5A468-C752-4ED4-845D-CB5E7936CFB7",
			"type": "SphereGeometry",
			"radius": 1.25,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "89F6DE6E-D7A3-4F55-B1CB-D4839947F61A",
			"type": "CylinderGeometry",
			"radiusTop": 0.5,
			"radiusBottom": 0.5,
			"height": 3,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "43F5278D-BE9C-4C98-A4F8-D1673875CB63",
			"type": "CylinderGeometry",
			"radiusTop": 0.375,
			"radiusBottom": 0.375,
			"height": 2,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "B73CDA2D-15C8-4070-A932-89293AF7C6C4",
			"type": "MeshStandardMaterial",
			"color": 13421772,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "FEDBD181-ACEF-4A51-BB78-52CDE90CCDE8",
			"type": "MeshStandardMaterial",
			"color": 13421772,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "A9BE1FF7-F7D0-46AC-9668-E970BD6D3C02",
			"type": "MeshStandardMaterial",
			"color": 13421772,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "77618F4D-AD0E-4744-A6EB-FEFA5EA96811",
			"type": "MeshStandardMaterial",
			"color": 13421772,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "F5815CD7-934F-45BB-9359-E58549BDAB9B",
			"type": "MeshStandardMaterial",
			"color": 13421772,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "6E51FF8B-ACA7-4D8F-8125-C0E53436C270",
			"type": "MeshStandardMaterial",
			"color": 13421772,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "6A7FE11A-F685-47E1-8BB5-BB5EAB31F86A",
			"type": "MeshStandardMaterial",
			"color": 13421772,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFunpmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "74E905BE-A02D-4FE6-B09B-6AE067C67D35",
		"type": "Group",
		"name": "carousel",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,5,0,1],
		"children": [
			{
				"uuid": "0B59D73B-3896-4827-BF43-FFFC280D844F",
				"type": "Group",
				"name": "head",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-3.25,-0.25,0,1],
				"children": [
					{
						"uuid": "23F5507F-8F14-4FF3-8579-464E69190709",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1.1258330249197703,0.6499999999999999,0,0,-0.49999999999999994,0.8660254037844387,0,0,0,0,1,0,0,2,0,1],
						"geometry": "9EDC1DB7-DA78-4810-8D3B-A821CBFAA057",
						"material": "B73CDA2D-15C8-4070-A932-89293AF7C6C4"
					},
					{
						"uuid": "7899E0F4-9456-408A-BF17-8FBE6884B400",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [0.9063077870366499,-0.32374437096706465,0.2716537822741844,0,0.4226182617406995,0.694272044014884,-0.5825634160695854,0,0,0.6427876096865393,0.7660444431189781,0,1,3,-0.75,1],
						"geometry": "82171B6B-A923-44BD-8BDE-55B361FBB5BF",
						"material": "FEDBD181-ACEF-4A51-BB78-52CDE90CCDE8"
					},
					{
						"uuid": "30F7F5AC-FD1F-4FB0-90A2-1554DFEB480B",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [0.9063077870366499,-0.32374437096706465,-0.2716537822741844,0,0.4226182617406995,0.694272044014884,0.5825634160695854,0,0,-0.6427876096865393,0.7660444431189781,0,1,3,0.75,1],
						"geometry": "82171B6B-A923-44BD-8BDE-55B361FBB5BF",
						"material": "FEDBD181-ACEF-4A51-BB78-52CDE90CCDE8"
					}]
			},
			{
				"uuid": "F561EDF7-A2F0-4719-B711-3E15AE43B4DB",
				"type": "Group",
				"name": "body",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"children": [
					{
						"uuid": "F9812B8E-5207-4325-A66A-79B86CA71A2B",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,0,0,0,1,0,0,0,0,1],
						"geometry": "D119072D-1259-47DB-9EF9-F4598FEF4F45",
						"material": "A9BE1FF7-F7D0-46AC-9668-E970BD6D3C02"
					},
					{
						"uuid": "3F6CC7CB-3AD3-4147-873F-D92F425A6549",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,1,0,0,1],
						"geometry": "790E2D20-0379-47E7-9775-C74CCB82F8CD",
						"material": "77618F4D-AD0E-4744-A6EB-FEFA5EA96811"
					},
					{
						"uuid": "C12F3FFF-7E4A-415B-ADC9-4332467185CA",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-1,0,0,1],
						"geometry": "71E5A468-C752-4ED4-845D-CB5E7936CFB7",
						"material": "F5815CD7-934F-45BB-9359-E58549BDAB9B"
					}]
			},
			{
				"uuid": "2AD53200-0D47-4C0B-BCE1-E1CB06C0C3C3",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.8660254037844387,0.49999999999999994,0,0,-0.49999999999999994,0.8660254037844387,0,0,0,0,1,0,-1.9,0.6,0,1],
				"geometry": "89F6DE6E-D7A3-4F55-B1CB-D4839947F61A",
				"material": "6E51FF8B-ACA7-4D8F-8125-C0E53436C270"
			},
			{
				"uuid": "243F36B7-95D0-4115-B8FA-87FE1EDC56E4",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.6427876096865393,-0.766044443118978,0,0,0.766044443118978,0.6427876096865393,0,0,0,0,1,0,2,1,0,1],
				"geometry": "82171B6B-A923-44BD-8BDE-55B361FBB5BF",
				"material": "FEDBD181-ACEF-4A51-BB78-52CDE90CCDE8"
			},
			{
				"uuid": "BCE4DA90-4F0B-4AE3-A508-4B61C2AFA663",
				"type": "Group",
				"name": "leg",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,-1.25,0,1],
				"children": [
					{
						"uuid": "03B92B7A-991F-4475-944B-BFA535EB944A",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [0.8660254037844387,-0.4531538935183249,0.2113091308703497,0,0.4999999999999999,0.7848855672213959,-0.36599815077066683,0,-1.3877787807814457e-17,0.42261826174069944,0.9063077870366499,0,-1.75,0,0.75,1],
						"geometry": "43F5278D-BE9C-4C98-A4F8-D1673875CB63",
						"material": "6A7FE11A-F685-47E1-8BB5-BB5EAB31F86A"
					},
					{
						"uuid": "0C3C6B2C-A293-42FA-B93F-880A8C876236",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [0.8660254037844387,-0.4531538935183249,-0.21130913087034967,0,0.4999999999999999,0.7848855672213959,0.36599815077066683,0,0,-0.42261826174069944,0.9063077870366499,0,-1.75,0,-0.75,1],
						"geometry": "43F5278D-BE9C-4C98-A4F8-D1673875CB63",
						"material": "6A7FE11A-F685-47E1-8BB5-BB5EAB31F86A"
					},
					{
						"uuid": "73D53FD0-4E41-489D-8AED-92A8A9A6A161",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [0.8660254037844386,0.45315389351832497,-0.2113091308703497,0,-0.49999999999999994,0.7848855672213958,-0.36599815077066683,0,0,0.42261826174069944,0.9063077870366499,0,1.75,0,0.75,1],
						"geometry": "43F5278D-BE9C-4C98-A4F8-D1673875CB63",
						"material": "6A7FE11A-F685-47E1-8BB5-BB5EAB31F86A"
					},
					{
						"uuid": "FDC29B4A-C8C4-4B44-B4DF-6DB4294F8164",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [0.8660254037844386,0.45315389351832497,0.2113091308703497,0,-0.49999999999999994,0.7848855672213958,0.36599815077066683,0,0,-0.42261826174069944,0.9063077870366499,0,1.75,0,-0.75,1],
						"geometry": "43F5278D-BE9C-4C98-A4F8-D1673875CB63",
						"material": "6A7FE11A-F685-47E1-8BB5-BB5EAB31F86A"
					}]
			}]
	}
};//carousel_horse

var bbb={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "F391C503-D4C9-4C9E-8176-9FBC142176A8",
			"type": "SphereGeometry",
			"radius": 3,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "1AED2C75-4AB8-46B0-BFB8-CAE5981A7F19",
			"type": "CylinderGeometry",
			"radiusTop": 4,
			"radiusBottom": 4,
			"height": 1.5,
			"radialSegments": 30,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "00DFDD7C-DB5A-477E-A23B-9FD38C2DF16B",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "397DE23D-81D3-4E75-8605-E9CBB5BDC664",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "0E0A0C46-C11F-4964-8091-2EA2977EBA8D",
		"type": "Group",
		"name": "bumper",
		"layers": 1,
		"matrix": [0.8,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "530A7592-BA2F-4524-B6C4-DB8DBDD5CA77",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,0.66666,0,0,0,0,1,0,0,2,0,1],
				"geometry": "F391C503-D4C9-4C9E-8176-9FBC142176A8",
				"material": "00DFDD7C-DB5A-477E-A23B-9FD38C2DF16B"
			},
			{
				"uuid": "0B0C0CA9-7C5C-43F3-96AA-BD7144023CA0",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0.75,0,1],
				"geometry": "1AED2C75-4AB8-46B0-BFB8-CAE5981A7F19",
				"material": "397DE23D-81D3-4E75-8605-E9CBB5BDC664"
			}]
	}
};//bumper

var www={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "7F04AF88-C094-4A64-B223-232CB464AA21",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "F29F8C8A-161C-45D0-96F2-3EA9F1302DE3",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "DA36AC9B-7119-40EE-81C4-5F0E0C193CCA",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "396CA0B1-A49B-40D4-823B-703586C40A74",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "36FFDC55-46C9-4CC6-9BD6-67EA657D57D7",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		}],
	"materials": [
		{
			"uuid": "C898C6FA-00D4-43CA-9669-49CDBFBDD862",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "F646A0C7-2A57-41B2-A709-BC6F9BF4F1CA",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "F98CE4A3-6261-4360-B45D-5EBDC59E0A20",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "11163CAC-400A-4949-9775-9C9788773289",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "A7893679-FCA5-48BC-9336-223776DCCD57",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "74AF5495-A505-467F-B82D-8A63D289BA62",
		"type": "Group",
		"name": "Group",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "3C9E7318-8E06-436C-972E-FC623B4F7714",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,2.5,0,0,0,0,12,0,14.5,1.25,-9,1],
				"geometry": "7F04AF88-C094-4A64-B223-232CB464AA21",
				"material": "C898C6FA-00D4-43CA-9669-49CDBFBDD862"
			},
			{
				"uuid": "6F1E63B3-C18E-47FA-95C6-5E1367908E7D",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,2.5,0,0,0,0,12,0,14.5,1.25,9,1],
				"geometry": "F29F8C8A-161C-45D0-96F2-3EA9F1302DE3",
				"material": "F646A0C7-2A57-41B2-A709-BC6F9BF4F1CA"
			},
			{
				"uuid": "D85D5371-5698-4370-B98B-FF14EF6BDD5C",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,2.5,0,0,0,0,30,0,-14.5,1.25,0,1],
				"geometry": "DA36AC9B-7119-40EE-81C4-5F0E0C193CCA",
				"material": "F98CE4A3-6261-4360-B45D-5EBDC59E0A20"
			},
			{
				"uuid": "B2B9959A-2F62-4C21-9302-D3122B5006B9",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [30,0,0,0,0,2.5,0,0,0,0,1,0,0,1.25,14.5,1],
				"geometry": "396CA0B1-A49B-40D4-823B-703586C40A74",
				"material": "11163CAC-400A-4949-9775-9C9788773289"
			},
			{
				"uuid": "BF5F8524-AE22-43D9-BF22-652184026C7E",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [30,0,0,0,0,2.5,0,0,0,0,1,0,0,1.25,-14.5,1],
				"geometry": "36FFDC55-46C9-4CC6-9BD6-67EA657D57D7",
				"material": "A7893679-FCA5-48BC-9336-223776DCCD57"
			}]
	}
};//bumper_wall

var ccc={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "17CED9A7-088C-40B2-8ABA-EF3000ED9E02",
			"type": "CylinderGeometry",
			"radiusTop": 2,
			"radiusBottom": 1,
			"height": 2.5,
			"radialSegments": 30,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "A2D639A8-5DED-46FF-9A55-E0BAA9880B11",
			"type": "TorusGeometry",
			"radius": 0.75,
			"tube": 0.2,
			"radialSegments": 30,
			"tubularSegments": 30,
			"arc": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "09EEBD24-C5CB-471F-A492-5A69B6F8312D",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "E3EB1042-FB7B-436E-BB3D-31B1D6816334",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "CDA1C7DA-7914-4CAA-B6D7-FBCBCEAF0386",
		"type": "Group",
		"name": "teacup",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "154C6E4F-F575-4A98-B263-9A4EE581FC24",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1],
				"geometry": "17CED9A7-088C-40B2-8ABA-EF3000ED9E02",
				"material": "09EEBD24-C5CB-471F-A492-5A69B6F8312D"
			},
			{
				"uuid": "C00FF265-808F-4291-B92A-6EE911968C71",
				"type": "Mesh",
				"name": "Torus",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,1.5,0.9,0,1],
				"geometry": "A2D639A8-5DED-46FF-9A55-E0BAA9880B11",
				"material": "E3EB1042-FB7B-436E-BB3D-31B1D6816334"
			}]
	}
};//teacup_cup

var kkk={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "86AF8FCD-ECDC-4896-9222-D912D8535568",
			"type": "CylinderGeometry",
			"radiusTop": 3,
			"radiusBottom": 4,
			"height": 5,
			"radialSegments": 30,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "9E66DA90-5B4B-4E1D-9351-FF67E18C320A",
			"type": "CylinderGeometry",
			"radiusTop": 3,
			"radiusBottom": 2,
			"height": 15,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "1C0B7773-EC2E-40C2-BE7C-4AEEA688497F",
			"type": "SphereGeometry",
			"radius": 5,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "0B604E86-54D1-42A9-A44A-B55D04E55D76",
			"type": "TorusGeometry",
			"radius": 4,
			"tube": 0.75,
			"radialSegments": 30,
			"tubularSegments": 30,
			"arc": 6.283185307179586
		},
		{
			"uuid": "1C61812A-30D2-4886-BE7E-66B36B132183",
			"type": "SphereGeometry",
			"radius": 3,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "16D033DE-97BF-4483-89DA-3D1983BEF5D8",
			"type": "SphereGeometry",
			"radius": 1,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "50F53419-E8A1-49FD-B105-C97CB512E5DA",
			"type": "CylinderGeometry",
			"radiusTop": 0.75,
			"radiusBottom": 1.25,
			"height": 4,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "8C7C64E2-61E0-4F16-B2FC-F88D77EC8FA7",
			"type": "TorusGeometry",
			"radius": 2,
			"tube": 1.25,
			"radialSegments": 30,
			"tubularSegments": 30,
			"arc": 2.0943951023931953
		}],
	"materials": [
		{
			"uuid": "76B28800-249D-4EF2-B7A4-D2897A05C9C6",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "A4953F64-8626-4561-BF1D-9FC581D439E5",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "A9F58EA5-EEA9-4022-A6CF-125417F0FC7A",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "F72A8D0C-D1DA-4AD6-A43C-97E8701A3506",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "28EAD0C3-07E9-433C-819E-15FE6BC0FAF4",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "D1895D29-8F07-4736-AB93-43C942677D5E",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "F52D11D6-31E8-4366-A13A-1CE1E73D5273",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "39BC9DBD-5937-4816-B38F-7971E78F4D94",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"refractionRatio": 0.98,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
			"colorWrite": true,
			"stencilWrite": false,
			"stencilWriteMask": 255,
			"stencilFunc": 519,
			"stencilRef": 0,
			"stencilFuncMask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		}],
	"object": {
		"uuid": "269A0C8C-E53A-422B-A8E5-FD5305D329FB",
		"type": "Group",
		"name": "pot",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "1D59FAC1-2979-4E92-8801-07F707763961",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,2.5,0,1],
				"geometry": "86AF8FCD-ECDC-4896-9222-D912D8535568",
				"material": "76B28800-249D-4EF2-B7A4-D2897A05C9C6"
			},
			{
				"uuid": "2DA86A36-004E-45D3-A264-1CB461263557",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,12.5,0,1],
				"geometry": "9E66DA90-5B4B-4E1D-9351-FF67E18C320A",
				"material": "A4953F64-8626-4561-BF1D-9FC581D439E5"
			},
			{
				"uuid": "66BEDA1D-236B-4BF5-A74F-5F1BC33F8F0F",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1.8,0,0,0,0,1,0,0,9,0,1],
				"geometry": "1C0B7773-EC2E-40C2-BE7C-4AEEA688497F",
				"material": "A9F58EA5-EEA9-4022-A6CF-125417F0FC7A"
			},
			{
				"uuid": "FBA17D13-83DC-4554-9E18-7968EEB85C4B",
				"type": "Mesh",
				"name": "Torus",
				"layers": 1,
				"matrix": [2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,0,0,0,1,0,-4,10.5,0,1],
				"geometry": "0B604E86-54D1-42A9-A44A-B55D04E55D76",
				"material": "F72A8D0C-D1DA-4AD6-A43C-97E8701A3506"
			},
			{
				"uuid": "8F7E0C4D-A65C-4CEA-A003-5B771C573013",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,20,0,1],
				"geometry": "1C61812A-30D2-4886-BE7E-66B36B132183",
				"material": "28EAD0C3-07E9-433C-819E-15FE6BC0FAF4"
			},
			{
				"uuid": "8C94FDD1-44AF-482D-921A-CBB5642CE5AA",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,23.75,0,1],
				"geometry": "16D033DE-97BF-4483-89DA-3D1983BEF5D8",
				"material": "D1895D29-8F07-4736-AB93-43C942677D5E"
			},
			{
				"uuid": "DB095868-6FBA-486D-80DA-F345E2C25959",
				"type": "Group",
				"name": "mouth",
				"layers": 1,
				"matrix": [0.9961946980917455,-0.08715574274765818,0,0,0.08715574274765818,0.9961946980917455,0,0,0,0,1,0,-0.5,19,0,1],
				"children": [
					{
						"uuid": "275E6F86-DB91-411B-A8FC-9BE96E080FC5",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [0.8660254037844387,-0.49999999999999994,0,0,0.49999999999999994,0.8660254037844387,0,0,0,0,1,0,5.1,-0.2,0,1],
						"geometry": "50F53419-E8A1-49FD-B105-C97CB512E5DA",
						"material": "F52D11D6-31E8-4366-A13A-1CE1E73D5273"
					},
					{
						"uuid": "862DB326-8980-4FF7-9436-C8BBE3C6843D",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.8660254037844388,-0.49999999999999994,0,0,0.49999999999999994,-0.8660254037844388,0,0,0,0,1,0,2.4,-0.8,0,1],
						"geometry": "8C7C64E2-61E0-4F16-B2FC-F88D77EC8FA7",
						"material": "39BC9DBD-5937-4816-B38F-7971E78F4D94"
					}]
			}]
	}
};//teacup_kettle


































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































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
	// create exture object ffrom canvas.
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
	// return a texture made ffrom the canvas
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
var ground=new TEACHER.ObjPicPlane(250,250,pics.ground,'y');
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
	world3D.raycaster.setffromCamera( mouse, world3D.camera );
	world3D.raycaster.ray.intersectPlane ( new THREE.Plane(vecN) ,vecM);

	return vecM;
}



//D.執行init，程式開始
init();
