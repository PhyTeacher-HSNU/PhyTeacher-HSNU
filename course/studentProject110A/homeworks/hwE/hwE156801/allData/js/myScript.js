'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 向右橫波：
	(1) 複習 陣列Array與for迴圈，做出 NN=50 個 ball，排一橫排。
	(2) 根據波動方程式，做出向右橫波：
		y = A Math.sin( 2*Math.PI*x/lambda - 2*Math.PI*t/period )
		其中，A是振幅，lambda是波長，period是週期。

2. 向左橫波：
	(1) 把上面的向右橫波改成向左橫波。
	(2) 用 slider 調整向右或向左橫波。
	
3. 駐波：
	(1) 做三組 陣列Array，分別存放三組波。
	(2) 三組波動，一個向右橫波，一個向左橫波，一個疊加成為駐波。
	(3) 用 checkBox 控制三組波動重合或分開。

[進階]
4. 向右縱波：
	橫波是上下振動，若改成左右振動，就會變成縱波，試著做出縱波的動畫。

*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var cn=20,cr=30,cm=-15,chh=35;
var carray=[],aarray=[],tarray=[];
var tt=0,dt=0.1,tm=0;
var A=5,lambda=5,period=15;
var loader;
var ca,cb,cc,cd,ce,cf,cg,ch;
var theta,omega=0.5;
var gm=0,y=0.25,y0,yy,yy1;
var x1,y1,z1;
var ccm=0;


//B.定義init
function init(){

	for(var i=0;i<cn;i++){
		loader=new THREE.ObjectLoader();
		cc=loader.parse(ccc);
		scene.add(cc);
		carray.push(cc);

		theta=i*2*Math.PI/cn;
		tarray.push(theta);
		
		cc.position.x=cr*Math.cos(theta);
		cc.position.z=cr*-1*Math.sin(theta)+cm;
		cc.rotation.y=theta+0.5*Math.PI;
		cc.scale.x=cc.scale.y=cc.scale.z=1.25;

		ca=new TEACHER.ObjCylinder(0.25,chh,0xaaaaaa);
		scene.add(ca);
		aarray.push(ca);
		ca.position.x=cr*Math.cos(theta);
		ca.position.z=cr*-1*Math.sin(theta)+cm;
		ca.position.y=15;
	}

	cb=new TEACHER.ObjCylinder(cr+5,6,0xaaaaaa);
	scene.add(cb);
	cb.position.y=3;
	cb.position.z=cm;

	cd=new TEACHER.ObjCylinder(cr+10,5,0xcccccc);
	scene.add(cd);
	cd.position.y=2.5;
	cd.position.z=cm;

	ce=new TEACHER.ObjCylinder(cr-15,chh,0x999999);
	scene.add(ce);
	ce.position.y=15;
	ce.position.z=cm;

	loader=new THREE.ObjectLoader();
	cf=loader.parse(ttt);
	scene.add(cf);
	cf.position.y=37.5;
	cf.position.z=cm;

	loader=new THREE.ObjectLoader();
	cg=loader.parse(ppp);
	scene.add(cg);
	cg.position.z=40;
	cg.scale.x=cg.scale.y=cg.scale.z=1.25;
	cg.rotation.y=-0.5*Math.PI;

	loader=new THREE.ObjectLoader();
	ch=loader.parse(sss);
	scene.add(ch);
	ch.position.z=cm+cr+10;
	ch.rotation.y=0.5*Math.PI;
	ch.scale.y=ch.scale.y*5/6;

	world2D.btn01.on('click',clicked);

	world2D.sl01.visible=world2D.sl02.visible=world2D.sl03.visible=/*world2D.ch01.visible=world2D.ch02.visible=*/world2D.btn02.visible=world2D.btnUp.visible=world2D.btnDown.visible=world2D.btnRight.visible=world2D.btnLeft.visible=false;
	
	world2D.ch01.setLabel('用wasd及空白鍵控制小人');
	world2D.ch02.setLabel('當小人走到樓梯附近');
	world2D.ch03.setLabel('且旋轉木馬是停止的狀態');
	world2D.ch04.setLabel('小人就會上馬');

	

	

	

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){

	tt+=dt;
	theta+=omega*dt;
	tm+=1/60;
	
	x1=cg.position.x;
	y1=cg.position.y;
	z1=cg.position.z;
	
	if(ccm===0){
		world2D.slCameraRR.value=120;
		world3D.cameraTarget=new THREE.Vector3(0,0,0);
		//world3D.cameraPhi=0;
		world2D.btn01.setLabel('主角視角')
	}else if(ccm===1){
		world3D.cameraTarget=new THREE.Vector3(x1,y1,z1);
		world2D.slCameraRR.value=30;
		world3D.cameraPhi=cg.rotation.y+0.5*Math.PI;
		//cg.rotation.y=world3D.cameraPhi-0.5*Math.PI;
		world2D.btn01.setLabel('上帝視角')
	}

	if(tm>=20 && tm<30){
		if(gm===3 && tm<20+1/60){
			gm=4;
		}else if(gm===0){
			collision(cg,ch,12)
		}
		dt=0.75*dt+0.25*0;
		
	}else if(tm>=30){
		tm=0
	}else if(tm<=20){
		dt=0.9*dt+0.1*0.1;
	}

	for(var i=0;i<cn;i++){
		var cc=carray[i]
		var ca=aarray[i]

		yy=A*Math.sin(2*Math.PI*i/lambda-2*Math.PI*tt/period);
		cc.position.y=chh/2+yy-0.25;

		tarray[i]+=omega*dt*-0.25;
		cc.position.x=cr*Math.cos(tarray[i]);
		cc.position.z=cr*-1*Math.sin(tarray[i])+cm;
		cc.rotation.y=tarray[i]+0.5*Math.PI;

		ca.position.x=cr*Math.cos(tarray[i]-0.05);
		ca.position.z=cr*-1*Math.sin(tarray[i]-0.05)+cm;
	}
	cb.rotation.y-=omega*dt;
	ce.rotation.y-=omega*dt;

	if(gm===1){
		if(cg.position.y>5 && y>0){
			y*=-1;
		}else if(cg.position.y<0 && y<0){
			y*=-1;
		}
		cg.position.y+=y;
	}else if(gm===2){
		y0=0.8*y+0.2*0;
		cg.position.y=y0;
	}else if(gm===3){
		cg.position.x=cr*Math.cos(tarray[1]);
		cg.position.z=cr*-1*Math.sin(tarray[1])+cm;
		yy1=A*Math.sin(2*Math.PI*1/lambda-2*Math.PI*tt/period);
		cg.position.y=chh/2+yy1-0.25;
		cg.rotation.y=tarray[1]+0.5*Math.PI;
	}else if(gm===4){
		cg.position.z=40;
		cg.position.y=0;
		cg.position.x=0;
		cg.rotation.y=0.5*Math.PI;
		gm=0;
	}

	
	

	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}






//resize
MyJS.myResize();




function key(){
	//log(event.keyCode);
	if(event.keyCode===32){
		gm=1;
	}else if(event.keyCode===87){
		cg.position.z-=0.25;
		cg.rotation.y=-0.5*Math.PI;
	}else if(event.keyCode===65){
		cg.position.x-=0.25;
		cg.rotation.y=0*Math.PI;
	}else if(event.keyCode===83){
		cg.position.z+=0.25;
		cg.rotation.y=0.5*Math.PI;
	}else if(event.keyCode===68){
		cg.position.x+=0.25;
		cg.rotation.y=1*Math.PI;
	}
}
document.onkeydown=key;

function kk(){
	if(event.keyCode===32){
		gm=2;
	}else{
		
	}
}
document.onkeyup=kk;
//' '=32,'w'=87,'a'=65,'s'=83,'d'=68

function collision(o1,o2,dis){
	let iscollision=false;
	let mA=o1.mass||1;
	let mB=o2.mass||1;
	var r12x=o1.position.x-o2.position.x;
	var r12y=o1.position.y-o2.position.y;
	var r12z=o1.position.z-o2.position.z;
	var rr=Math.sqrt(r12x*r12x+r12y*r12y+r12z*r12z);

	if(rr<dis){
		let iscollision=true;
		gm=3;
	}
	return iscollision;
}

function clicked(e){
	var str=e.target.parent.name;
	
	if(str==='btn01'){
		if(ccm===0){
			ccm=1;
		}else if(ccm===1){
			ccm=0;
		}
	}
}


var ppp={
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
			"stencilFunccmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "2909F491-D5B1-4699-B892-277464E8C4DF",
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
			"stencilFunccmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "69E4D98D-017F-45F6-A319-57E93F602600",
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
			"stencilFunccmask": 255,
			"stencilFail": 7680,
			"stencilZFail": 7680,
			"stencilZPass": 7680
		},
		{
			"uuid": "A8A30E4A-3222-4798-A0B0-C7E2CF435D9D",
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
			"stencilFunccmask": 255,
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
};

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
			"stencilFunccmask": 255,
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
};

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
			"stencilFunccmask": 255,
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
};

var ccc={
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
			"stencilFunccmask": 255,
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
			"stencilFunccmask": 255,
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
			"stencilFunccmask": 255,
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
			"stencilFunccmask": 255,
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
			"stencilFunccmask": 255,
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
			"stencilFunccmask": 255,
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
			"stencilFunccmask": 255,
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
};























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































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
