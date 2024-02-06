'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//------------老師作的萬用半成品(2020.12.01)-----------//

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var loader;
var rh;
var Ahhhhhh;
var scale_feline=1;
var dx=0.5;
var dt=1;
var gameMD = 0;
var meow = new Audio("allData/mp3/meow.mp3");
var speed=1;
var no_need=0;
var rolllllllll;
var i=1;

//B.定義init
function init(){

	loader= new THREE.ObjectLoader();
	cat =loader.parse(cat);
	scene.add(cat);
	cat.position.y=0;

	Ahhhhhh=loader.parse(cat_01);
	scene.add(Ahhhhhh);
	Ahhhhhh.visible=false;

	rh = loader.parse(hand);
	scene.add(rh);
	rh.position.y=0;


	world2D.sl01.setLabel("貓咪大小");
	world2D.sl01.minimum=1;
	world2D.sl01.maximum=25;
	world2D.sl01.value=10;
	world2D.sl01.digitN=1;

	world2D.sl02.setLabel("速度");
	world2D.sl02.minimum=0.1;
	world2D.sl02.maximum=2;
	world2D.sl02.value=1;
	world2D.sl02.digitN=1;

	world2D.ch01.setLabel("deja vu");
	world2D.ch01.checked=false;

	world2D.btn01.setLabel("Help");
	
	cat.vx=1;
	cat.ax=0;
	
	world2D.slCameraRR.value=150;
	
	ground.visible=false;
	logo.visible=false;
	world2D.btnUp.visible=false;
	world2D.btnDown.visible=false;
	world2D.sl03.visible=false;
	world2D.ch02.visible=false;
	world2D.btn02.visible=false;

	
	world2D.btnRight.on("mousedown", pressBtn);
	world2D.btnLeft.on("mousedown", pressBtn);
	world2D.btn01.on("click",help);
	world2D.on("pressup", stop);

	var Name = new TEACHER.ObjTextPlane(200,20,"156328 程暄雯","z",0x0ffffff)
	scene.add(Name);
	Name.position.x=-70;
	Name.position.y=30;
	Name.position.z=-100;

	skyBox.wallU=new TEACHER.ObjPicPlane(10000,10000,pics.background,'y',1);
	skyBox.wallD=new TEACHER.ObjPicPlane(10000,10000,pics.background,'y',0);
	skyBox.wallS=new TEACHER.ObjPicCylinder(5000,10000,pics.background,true,'y',1);
	skyBox.wallU.position.y=5000;
	skyBox.wallD.position.y=-5000;
	skyBox.add(skyBox.wallU).add(skyBox.wallD).add(skyBox.wallS);
	world3D.scene.add(skyBox);
	

	var skyBox_help=new THREE.Object3D();
	skyBox_help.wallU=new TEACHER.ObjPicPlane(10000,10000,pics.background,'y',1);
	skyBox_help.wallD=new TEACHER.ObjPicPlane(10000,10000,pics.background,'y',0);
	skyBox_help.wallS=new TEACHER.ObjPicPlane(10800*1.5,4000*1.5,pics.help,true,'y',0);
	skyBox_help.wallU.position.y=5000;
	skyBox_help.wallD.position.y=-5000;
	skyBox_help.wallS.position.z=-10000;
	skyBox_help.add(skyBox_help.wallU).add(skyBox_help.wallD).add(skyBox_help.wallS)
	world3D.scene.add(skyBox_help);


	


	setInterval(tick,1000/fps);

	
		
		
	
	}
		


//C.定義tick                                                                                                                       
function tick(){

	scale_feline=world2D.sl01.value;
	cat.scale.x=Ahhhhhh.scale.x=scale_feline;
	cat.scale.y=Ahhhhhh.scale.y=scale_feline;
	cat.scale.z=Ahhhhhh.scale.z=scale_feline;
	Ahhhhhh.rotation.z=cat.rotation.z;
	Ahhhhhh.position.x= cat.position.x;

	rh.scale.x=rh.scale.y=rh.scale.z=scale_feline;
	rh.position.x= cat.position.x;
	
	
	if(world2D.ch01.checked){
		world2D.sl02.maximum=50;
	}
	
	speed= world2D.sl02.value;
	
	
		if(gameMD === 1){
			cat.vx=1*speed;
			dx=0.5*speed;
			cat.vx+= cat.ax*dt;
			cat.position.x+= cat.vx*dt;
			cat.rotation.z-=(dx/scale_feline);
			if(cat.position.x>60 && cat.vx>0){
				cat.position.x=60;
				cat.rotation.z=0;
			}
		}else if(gameMD === 2){
			cat.vx=-1*speed;
			dx=0.5*speed;
			cat.vx+= cat.ax*dt;
			cat.position.x+= cat.vx*dt;
			cat.rotation.z+=(dx/scale_feline);
			if(cat.position.x<-60 && cat.vx<0){
				cat.position.x=-60;
				cat.rotation.z=0;
			}
		}else if(gameMD === 0){
			cat.vx=0;
			dx=0;
			cat.visible=true;
			Ahhhhhh.visible=false;
		}
		
	
	
	
	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function pressBtn(e){
	var str = e.target.parent.name;
	if(str === "btnRight"){
		meow.currentTime=0;
		meow.play();
		cat.visible=false;
		Ahhhhhh.visible=true;
		gameMD = 1;
	}else if(str === "btnLeft"){
		meow.currentTime=0;
		meow.play();
		cat.visible=false;
		Ahhhhhh.visible=true;
		gameMD = 2;
	}
	
}

function stop(e){
	gameMD = 0;
}

function help(e){
	if(no_need===1){
		no_need=0;
		skyBox.visible=true;
	}else if(no_need===0){
		no_need=1;
		skyBox.visible=false;
		}
}




//resize
MyJS.myResize();

















var cat_01={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "e2b4743a-1957-464b-971c-e41a15f384da",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "724d7e11-f31f-412f-b334-4e443228d172",
			"type": "TubeGeometry",
			"path": {
				"metadata": {
					"version": 4.5,
					"type": "Curve",
					"generator": "Curve.toJSON"
				},
				"arcLengthDivisions": 200,
				"type": "CatmullRomCurve3",
				"points": [[4.98,-1.4,-2],[2.68,-2,-0.69],[0.46,-3.2,1.07],[-5.9,2,1.76],[-4.46,3.92,1.22],[-1.42,3.64,1.52],[-1.84,1.32,1.8]],
				"closed": false,
				"curveType": "centripetal",
				"tension": 0.5
			},
			"tubularSegments": 100,
			"radius": 1,
			"radialSegments": 100,
			"closed": false
		},
		{
			"uuid": "755f14b0-f6bc-4548-bd28-a6e67b817b13",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "e418f831-6604-4039-b26b-28f13b0444d6",
			"type": "LatheGeometry",
			"points": [
				{
					"x": 0,
					"y": 0.5
				},
				{
					"x": 0.5,
					"y": 0
				},
				{
					"x": 0,
					"y": -0.5
				}],
			"segments": 12,
			"phiStart": 0,
			"phiLength": 6.283185307179586
		},
		{
			"uuid": "402a16b1-8776-4024-8505-1257d5102419",
			"type": "SphereGeometry",
			"name": "head",
			"radius": 1,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "ca900315-f552-43ad-8a70-a4dd91ca8e39",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "ec047151-aa1b-40fd-9794-75c0bc799fe3",
			"type": "MeshStandardMaterial",
			"color": 0,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "c1d71cf0-f5df-4645-922e-10fc42ea2098",
			"type": "MeshStandardMaterial",
			"color": 0,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "1d2d1b74-c4ce-4178-8acd-91890feb6776",
			"type": "MeshStandardMaterial",
			"color": 15264343,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "1afe3f68-1854-46c8-a03d-cb1050131c70",
			"type": "MeshStandardMaterial",
			"color": 15264343,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "7c931599-bd91-4c91-b7b0-5f53dbfce0ac",
			"type": "MeshStandardMaterial",
			"color": 15264343,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"side": 2,
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
			"uuid": "912a8906-dbf6-4771-91f3-08fe40c237af",
			"type": "MeshStandardMaterial",
			"color": 15264343,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "9e137553-f09b-4345-b06a-470ec45dcca9",
			"type": "MeshStandardMaterial",
			"color": 12990777,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
		"uuid": "5299a968-fdde-453a-b64d-ec89b07aa6eb",
		"type": "Group",
		"name": "Cat",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "f1e317eb-ad09-4075-8838-d8da6b0cb999",
				"type": "Mesh",
				"name": "Box",
				"visible": false,
				"layers": 1,
				"matrix": [0.10741853886680112,-0.12597933640359887,0.018725371652096163,0,0.026922329651607905,0.023658154182520548,0.004725206635457329,0,0.0028300354075798755,0.000009387688299614766,-0.016171407398864367,0,-0.15597767680143676,-0.05041321474377164,3.998304606563428,1],
				"geometry": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
				"material": "ec047151-aa1b-40fd-9794-75c0bc799fe3"
			},
			{
				"uuid": "436e2a2a-044e-4c1a-abd4-53250f802e38",
				"type": "Mesh",
				"name": "Box",
				"visible": false,
				"layers": 1,
				"matrix": [0.13126328695772285,0.09859849808011005,-0.028433447027748537,0,-0.0222118534580116,0.02799030474396722,-0.005479423075579673,0,-0.0006966781732156648,-0.0036818662318962455,-0.015983807630545344,0,0.14625060147354474,-0.08368687205161648,3.998304606563428,1],
				"geometry": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
				"material": "ec047151-aa1b-40fd-9794-75c0bc799fe3"
			},
			{
				"uuid": "5ebbb8bd-9bc7-4d14-9f8a-a3d96c0f3d7b",
				"type": "Mesh",
				"name": "Box",
				"visible": false,
				"layers": 1,
				"matrix": [0.13126328695772285,0.09859849808011005,-0.028433447027748537,0,-0.0222118534580116,0.02799030474396722,-0.005479423075579673,0,-0.0006966781732156648,-0.0036818662318962455,-0.015983807630545344,0,-0.04804921177227246,-0.0620455034819766,3.998304606563428,1],
				"geometry": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
				"material": "ec047151-aa1b-40fd-9794-75c0bc799fe3"
			},
			{
				"uuid": "811f4b25-63cb-4771-963a-855feebdf3d9",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.05450350490769908,0.06892692872574596,-0.0028368691545250604,0,0.0013487606204756382,0.0007104468440309585,0.04317474420136377,0,0.09889896989023363,-0.07827783968915945,-0.0018014881910144883,0,-0.3966282852682672,0.3583438338743374,3.9115591971081516,1],
				"geometry": "e2b4743a-1957-464b-971c-e41a15f384da",
				"material": "c1d71cf0-f5df-4645-922e-10fc42ea2098"
			},
			{
				"uuid": "0ab0ec42-088b-41fa-ab41-d80d8af11132",
				"type": "Mesh",
				"name": "Box",
				"visible": false,
				"layers": 1,
				"matrix": [0.10741853886680112,-0.12597933640359887,0.018725371652096163,0,0.026922329651607905,0.023658154182520548,0.004725206635457329,0,0.0028300354075798755,0.000009387688299614766,-0.016171407398864367,0,0.05510282388906246,-0.0793357070526822,3.998304606563428,1],
				"geometry": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
				"material": "ec047151-aa1b-40fd-9794-75c0bc799fe3"
			},
			{
				"uuid": "8d2bd3a2-a344-446b-8d75-292f2fc329dc",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.05952014274293201,-0.06468503988261301,-0.001673200715185346,0,0.0011357279476191817,-0.00007206080546471841,0.043186657153014826,0,-0.09277932796166768,-0.08543061611603832,0.0022973733847283058,0,0.39034395490614193,0.3583438338743374,3.8960818863514812,1],
				"geometry": "e2b4743a-1957-464b-971c-e41a15f384da",
				"material": "c1d71cf0-f5df-4645-922e-10fc42ea2098"
			},
			{
				"uuid": "fbe43282-c7fb-4c17-854e-3997c4e809e2",
				"type": "Mesh",
				"name": "Tube",
				"layers": 1,
				"matrix": [-0.06398586633918218,0.02096094274932174,0.09932999440191245,0,-0.0075107297719775815,0.1749294844170358,-0.04175241813215567,0,-0.13519196114064785,-0.02531559549738201,-0.08174505653284786,0,-0.11017445244827573,0.008052440546912232,-2.911719157089071,1],
				"geometry": "724d7e11-f31f-412f-b334-4e443228d172",
				"material": "1d2d1b74-c4ce-4178-8acd-91890feb6776"
			},
			{
				"uuid": "d8dc830c-fdaf-4683-a45a-eefd2833edea",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.8188923688530375,0.0036957776876698385,0.0006864262843043534,0,-0.004512208587603997,0.04597847484951834,5.135419546430319,0,0.002841066790847251,-0.6305587240806538,0.005648019146248756,0,0,-0.21786996746924236,0,1],
				"geometry": "755f14b0-f6bc-4548-bd28-a6e67b817b13",
				"material": "1afe3f68-1854-46c8-a03d-cb1050131c70"
			},
			{
				"uuid": "0015eee8-755f-4f9f-89a4-3873c056658c",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [0.8164699060816776,-0.5745328913103006,0.05734848965406898,0,0.5536153030914782,0.8071894892063242,0.20482974563711231,0,-0.16397252405786572,-0.13548832170139108,0.9771161272011802,0,0.5214483116727924,0.700843964717492,3.0181110233332493,1],
				"geometry": "e418f831-6604-4039-b26b-28f13b0444d6",
				"material": "7c931599-bd91-4c91-b7b0-5f53dbfce0ac"
			},
			{
				"uuid": "6281214e-a201-4333-bc68-ff23cc93e5f6",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [0.8316084027072074,0.5553624623133679,0,0,-0.5553624623133679,0.8316084027072074,0,0,0,0,1,0,-0.5234639411594549,0.700843964717492,3.0181110233332493,1],
				"geometry": "e418f831-6604-4039-b26b-28f13b0444d6",
				"material": "7c931599-bd91-4c91-b7b0-5f53dbfce0ac"
			},
			{
				"uuid": "d34c8c38-ed09-4d61-bc28-e9275270ad6f",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0.004255360750348269,2.9961489016621377,1],
				"geometry": "402a16b1-8776-4024-8505-1257d5102419",
				"material": "912a8906-dbf6-4771-91f3-08fe40c237af"
			},
			{
				"uuid": "ac3f3c2d-ec2b-4dde-80c6-7db35c491bc3",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.42163525448432515,0,0,0,0,0.32262611985599293,0,0,0,0,19.255987095974973,0,0,-0.12962050798321556,4.008303587190612,1],
				"geometry": "ca900315-f552-43ad-8a70-a4dd91ca8e39",
				"material": "9e137553-f09b-4345-b06a-470ec45dcca9"
			}]
	}
};
var cat={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "e2b4743a-1957-464b-971c-e41a15f384da",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "724d7e11-f31f-412f-b334-4e443228d172",
			"type": "TubeGeometry",
			"path": {
				"metadata": {
					"version": 4.5,
					"type": "Curve",
					"generator": "Curve.toJSON"
				},
				"arcLengthDivisions": 200,
				"type": "CatmullRomCurve3",
				"points": [[4.98,-1.4,-2],[2.68,-2,-0.69],[0.46,-3.2,1.07],[-5.9,2,1.76],[-4.46,3.92,1.22],[-1.42,3.64,1.52],[-1.84,1.32,1.8]],
				"closed": false,
				"curveType": "centripetal",
				"tension": 0.5
			},
			"tubularSegments": 100,
			"radius": 1,
			"radialSegments": 100,
			"closed": false
		},
		{
			"uuid": "755f14b0-f6bc-4548-bd28-a6e67b817b13",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "e418f831-6604-4039-b26b-28f13b0444d6",
			"type": "LatheGeometry",
			"points": [
				{
					"x": 0,
					"y": 0.5
				},
				{
					"x": 0.5,
					"y": 0
				},
				{
					"x": 0,
					"y": -0.5
				}],
			"segments": 12,
			"phiStart": 0,
			"phiLength": 6.283185307179586
		},
		{
			"uuid": "402a16b1-8776-4024-8505-1257d5102419",
			"type": "SphereGeometry",
			"name": "head",
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
			"uuid": "ec047151-aa1b-40fd-9794-75c0bc799fe3",
			"type": "MeshStandardMaterial",
			"color": 0,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "c1d71cf0-f5df-4645-922e-10fc42ea2098",
			"type": "MeshStandardMaterial",
			"color": 0,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "1d2d1b74-c4ce-4178-8acd-91890feb6776",
			"type": "MeshStandardMaterial",
			"color": 15264343,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "1afe3f68-1854-46c8-a03d-cb1050131c70",
			"type": "MeshStandardMaterial",
			"color": 15264343,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "7c931599-bd91-4c91-b7b0-5f53dbfce0ac",
			"type": "MeshStandardMaterial",
			"color": 15264343,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"side": 2,
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
			"uuid": "912a8906-dbf6-4771-91f3-08fe40c237af",
			"type": "MeshStandardMaterial",
			"color": 15264343,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
		"uuid": "5299a968-fdde-453a-b64d-ec89b07aa6eb",
		"type": "Group",
		"name": "Cat",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "f1e317eb-ad09-4075-8838-d8da6b0cb999",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.10741853886680118,-0.12597933640359887,0.018725371652096166,0,0.026922329651607905,0.023658154182520548,0.004725206635457329,0,0.002830035407579875,0.000009387688299614992,-0.016171407398864367,0,-0.15001640764132773,-0.11708191967389894,3.998304606563428,1],
				"geometry": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
				"material": "ec047151-aa1b-40fd-9794-75c0bc799fe3"
			},
			{
				"uuid": "436e2a2a-044e-4c1a-abd4-53250f802e38",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.13126328695772282,0.09859849808011005,-0.02843344702774854,0,-0.0222118534580116,0.02799030474396722,-0.005479423075579673,0,-0.0006966781732156646,-0.0036818662318962455,-0.015983807630545344,0,0.16147887299892272,-0.11708191967389894,3.998304606563428,1],
				"geometry": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
				"material": "ec047151-aa1b-40fd-9794-75c0bc799fe3"
			},
			{
				"uuid": "5ebbb8bd-9bc7-4d14-9f8a-a3d96c0f3d7b",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.13126328695772282,0.09859849808011005,-0.02843344702774854,0,-0.0222118534580116,0.02799030474396722,-0.005479423075579673,0,-0.0006966781732156646,-0.0036818662318962455,-0.015983807630545344,0,-0.04804921177227246,-0.11708191967389894,3.998304606563428,1],
				"geometry": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
				"material": "ec047151-aa1b-40fd-9794-75c0bc799fe3"
			},
			{
				"uuid": "811f4b25-63cb-4771-963a-855feebdf3d9",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.05450350490769909,0.06892692872574593,-0.00283686915452506,0,0.0013487606204756308,0.0007104468440309632,0.04317474420136376,0,0.09889896989023361,-0.07827783968915948,-0.0018014881910144883,0,-0.3966282852682672,0.3583438338743374,3.9115591971081516,1],
				"geometry": "e2b4743a-1957-464b-971c-e41a15f384da",
				"material": "c1d71cf0-f5df-4645-922e-10fc42ea2098"
			},
			{
				"uuid": "0ab0ec42-088b-41fa-ab41-d80d8af11132",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.10741853886680118,-0.12597933640359887,0.018725371652096166,0,0.026922329651607905,0.023658154182520548,0.004725206635457329,0,0.002830035407579875,0.000009387688299614992,-0.016171407398864367,0,0.045997447496409494,-0.12861348987331994,3.998304606563428,1],
				"geometry": "50912c2e-83dd-4536-8b92-0a5e23f2fd79",
				"material": "ec047151-aa1b-40fd-9794-75c0bc799fe3"
			},
			{
				"uuid": "8d2bd3a2-a344-446b-8d75-292f2fc329dc",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.05952014274293202,-0.064685039882613,-0.0016732007151853217,0,0.0011357279476191862,-0.0000720608054646992,0.04318665715301482,0,-0.09277932796166766,-0.08543061611603835,0.0022973733847283613,0,0.39034395490614193,0.3583438338743374,3.8960818863514812,1],
				"geometry": "e2b4743a-1957-464b-971c-e41a15f384da",
				"material": "c1d71cf0-f5df-4645-922e-10fc42ea2098"
			},
			{
				"uuid": "fbe43282-c7fb-4c17-854e-3997c4e809e2",
				"type": "Mesh",
				"name": "Tube",
				"layers": 1,
				"matrix": [-0.0639858663391822,0.02096094274932174,0.09932999440191247,0,-0.0075107297719775815,0.1749294844170358,-0.04175241813215567,0,-0.13519196114064785,-0.02531559549738201,-0.08174505653284786,0,-0.11017445244827573,0.008052440546912232,-2.911719157089071,1],
				"geometry": "724d7e11-f31f-412f-b334-4e443228d172",
				"material": "1d2d1b74-c4ce-4178-8acd-91890feb6776"
			},
			{
				"uuid": "d8dc830c-fdaf-4683-a45a-eefd2833edea",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.8188923688530375,0.0036957776876698385,0.000686426284304353,0,-0.004512208587603992,0.04597847484951834,5.135419546430319,0,0.0028410667908472507,-0.6305587240806537,0.005648019146248755,0,0,-0.21786996746924236,0,1],
				"geometry": "755f14b0-f6bc-4548-bd28-a6e67b817b13",
				"material": "1afe3f68-1854-46c8-a03d-cb1050131c70"
			},
			{
				"uuid": "0015eee8-755f-4f9f-89a4-3873c056658c",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [0.8164699060816776,-0.5745328913103006,0.057348489654068996,0,0.5536153030914782,0.8071894892063242,0.20482974563711231,0,-0.16397252405786572,-0.13548832170139108,0.9771161272011802,0,0.5214483116727924,0.700843964717492,3.0181110233332493,1],
				"geometry": "e418f831-6604-4039-b26b-28f13b0444d6",
				"material": "7c931599-bd91-4c91-b7b0-5f53dbfce0ac"
			},
			{
				"uuid": "6281214e-a201-4333-bc68-ff23cc93e5f6",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [0.8316084027072075,0.5553624623133678,0,0,-0.5553624623133678,0.8316084027072075,0,0,0,0,1,0,-0.5234639411594549,0.700843964717492,3.0181110233332493,1],
				"geometry": "e418f831-6604-4039-b26b-28f13b0444d6",
				"material": "7c931599-bd91-4c91-b7b0-5f53dbfce0ac"
			},
			{
				"uuid": "d34c8c38-ed09-4d61-bc28-e9275270ad6f",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,2.9961489016621377,1],
				"geometry": "402a16b1-8776-4024-8505-1257d5102419",
				"material": "912a8906-dbf6-4771-91f3-08fe40c237af"
			}]
	}
};

var hand={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "8ca4ac87-b3d3-4b57-871d-9e3304e3a9e6",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "3fbc60e8-77a2-434e-bbe7-a21bede570a3",
			"type": "CylinderGeometry",
			"radiusTop": 0.66,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "a6ab5d99-89ac-4ef4-bfa8-14ed6b08d52c",
			"type": "CylinderGeometry",
			"radiusTop": 0.7,
			"radiusBottom": 1.48,
			"height": 0.98,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "92ed251c-79dd-4847-8e1a-995ccf7acc7c",
			"type": "MeshStandardMaterial",
			"color": 15321012,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "a82eec86-c9d3-46de-b802-e06438ce1aa6",
			"type": "MeshStandardMaterial",
			"color": 15321012,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
			"uuid": "27e9195c-c833-4cee-9b85-807c6f01cd25",
			"type": "MeshStandardMaterial",
			"color": 15321012,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
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
		"uuid": "5f5cbc4d-58a8-458a-b2cb-417ecff41193",
		"type": "Group",
		"name": "Hand",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "bdb51bff-3524-4999-b6c4-261d5b0626aa",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [3.3915648446880486,0,0,0,0,0.8,0,0,0,0,3.2214938928437293,0,2.0710858476356284,0.8529930240105715,-0.1578886962805393,1],
				"geometry": "8ca4ac87-b3d3-4b57-871d-9e3304e3a9e6",
				"material": "92ed251c-79dd-4847-8e1a-995ccf7acc7c"
			},
			{
				"uuid": "ae8d431c-fc15-4f87-ad2f-1d2dc6fe3bc9",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.03732768465144257,0.4649038652867519,0,0,-2.9728329498953885,0.2386922956785213,0,0,0,0,0.4136,0,-0.3402335639915435,0.8888830852986538,0.2001199849534201,1],
				"geometry": "3fbc60e8-77a2-434e-bbe7-a21bede570a3",
				"material": "a82eec86-c9d3-46de-b802-e06438ce1aa6"
			},
			{
				"uuid": "7eaed8cf-298c-4cb9-ad1c-4220e4dcb2eb",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.022776309025313107,0.4658435356932448,0,0,-2.9788416827863067,0.14564336200062997,0,0,0,0,0.4136,0,-1.0603879334769888,0.8888830852986538,-0.6375891874971888,1],
				"geometry": "3fbc60e8-77a2-434e-bbe7-a21bede570a3",
				"material": "a82eec86-c9d3-46de-b802-e06438ce1aa6"
			},
			{
				"uuid": "23e0efd0-5ff2-4859-a685-b73aa5381031",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.030164557888750103,0.4654235269594525,0,0,-2.9761559322552986,0.1928876017311499,0,0,0,0,0.4136,0,0.1803995479148539,0.8888830852986538,1.0476773009632208,1],
				"geometry": "3fbc60e8-77a2-434e-bbe7-a21bede570a3",
				"material": "a82eec86-c9d3-46de-b802-e06438ce1aa6"
			},
			{
				"uuid": "fc922063-935a-43e3-b374-f1b9ba774987",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.01813511090593459,0.4073392647001041,0.22643939848446865,0,-2.972377712858138,0.20564299804326075,-0.13187664486180162,0,-0.029818697234108942,-0.19941882767598218,0.361120390539772,0,0.1803995479148539,0.8888830852986538,-1.51935595402466,1],
				"geometry": "3fbc60e8-77a2-434e-bbe7-a21bede570a3",
				"material": "a82eec86-c9d3-46de-b802-e06438ce1aa6"
			},
			{
				"uuid": "1ac59c22-8b52-448f-82cc-cfac7687bd98",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.022281368290112007,0.43912126727569745,-0.09765353681923582,0,-1.2286064959524428,0.28475272591714534,1.0001270535218088,0,0.2664197054371084,0.055735277427620404,0.31141464224546445,0,1.5981261115072238,0.8888830852986538,1.722924707106438,1],
				"geometry": "3fbc60e8-77a2-434e-bbe7-a21bede570a3",
				"material": "a82eec86-c9d3-46de-b802-e06438ce1aa6"
			},
			{
				"uuid": "5c67a6f7-7cfc-42ec-9ddd-6494163926f3",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [-0.00518155258429119,0.4994990069492314,0.005038574867445225,0,-6.6693904866444305,-0.0699780734544948,0.07862951279749213,0,0.008971518719596068,-0.007515546240630789,0.7542796087913769,0,6.155249662999669,0.7129807267197295,-0.22591256127789006,1],
				"geometry": "a6ab5d99-89ac-4ef4-bfa8-14ed6b08d52c",
				"material": "27e9195c-c833-4cee-9b85-807c6f01cd25"
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
/*skyBox.wallU=new TEACHER.ObjPicPlane(10000,10000,pics.wallU,'y',1);
skyBox.wallD=new TEACHER.ObjPicPlane(10000,10000,pics.wallD,'y',0);
skyBox.wallS=new TEACHER.ObjPicCylinder(5000,10000,pics.wallSide,true,'y',1);
skyBox.wallU.position.y=5000;
skyBox.wallD.position.y=-5000;
skyBox.add(skyBox.wallU).add(skyBox.wallD).add(skyBox.wallS);
world3D.scene.add(skyBox);*/

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