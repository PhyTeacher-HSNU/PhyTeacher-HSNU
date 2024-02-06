'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//------------老師作的萬用半成品(2020.12.01)-----------//

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var d_default;
var d_spitfire;
var loader;
var angry;
var Name;
var nn = 50;
var ballArray1=[];
var z1 =-30;
var lambda = 50;
var period = 10;
var tt = 0;
var dt = 0.1;
var AA = 5;
var a = 0;
//B.定義init
function init(){
	loader= new THREE.ObjectLoader();
	d_default = loader.parse(d1);
	scene.add(d_default);
	d_default.scale.x = d_default.scale.y =d_default.scale.z*=5;
	d_default.position.x = -45;
	

	d_spitfire = loader.parse(d2);
	scene.add(d_spitfire);
	d_spitfire.scale.x = d_spitfire.scale.y =d_spitfire.scale.z*=5;
	d_spitfire.position.x = -45;
	d_spitfire.visible = false;

	angry = loader.parse(obj);
	scene.add(angry);
	angry.scale.x = angry.scale.y =angry.scale.z*=2;
	angry.position.x = -42;
	angry.position.y = 5;
	angry.visible = false;

	for(var i = 0; i<nn; i++){

		var b = new TEACHER.ObjSphere(1,0xff0000);
		b.position.x = 50+i*2;
		b.position.y = 10;
		b.position.y = 10;
		b.position.z = z1;
		b.visible = 0;
		scene.add(b);
		ballArray1.push(b);
	}
	world2D.sl01.setLabel("波長");
	world2D.sl02.setLabel("振幅");
	world2D.sl03.setLabel("dt");

	world2D.sl03.minimum = 0;
	world2D.sl03.maximum = 0.8;
	world2D.sl03.value = 0.1;
	world2D.sl03.digitN = 1;

	world2D.sl01.minimum = 20;
	world2D.sl01.maximum = 100;
	world2D.sl01.value = 50;

	world2D.sl02.minimum = 0;
	world2D.sl02.maximum = 10;
	world2D.sl02.value = 5;

	world2D.btn01.setLabel("光波");
	world2D.btn01.on("click",count);

	world2D.btnUp.on("click",move);
	world2D.btnDown.on("click",move);

	
	world2D.btn02.visible = false; 
	world2D.btnRight.visible = false; 
	world2D.btnLeft.visible = false; 
	world2D.ch01.visible = false; 
	world2D.ch02.visible = false; 

	Name = new TEACHER.ObjTextPlane(200,20,"156328 程暄雯","z",0x0ffffff)
	scene.add(Name);
	Name.position.x=-50;
	Name.position.y=30;
	Name.position.z=-100;




	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){

	dt = world2D.sl03.value;

	lambda = world2D.sl01.value;

	AA = world2D.sl02.value;

	tt+=dt;

	d_spitfire.position.z = d_default.position.z;
	angry.position.z = d_default.position.z+5;

	for(var i = 0; i<nn ; i++){
		var b=ballArray1[i];
		var yy = AA*Math.sin(2*Math.PI*b.position.x/lambda - 2*Math.PI*tt/period);

		b.position.y =  10+yy
		
		b.position.z = d_default.position.z;
	}
	for(var i = 0; i<nn ; i++){
		var b=ballArray1[i];

		b.position.x+=1;
		if(b.position.x>50 || b.position.x<-40){
			b.visible = false;
		}else if(b.position.x<50 &&　b.position.x>-40){
			b.visible = true;
		}
	}
	
	
	
	

	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function count(){
	
	a++;
	
	if(a%2 == 0 && a%3 != 0){
		angry.visible = true;
		d_default.visible = false;
		d_spitfire.visible = true;
		d_default.rotation.y = -0;
		for(var i = 0; i<nn ; i++){
			var b=ballArray1[i];
	
			b.position.x =-50-i*2;
		}
		setTimeout(style,2000);
	}else if(a%2 !=0 && a%3 != 0){
		angry.visible = false;
		d_default.visible = false;
		d_spitfire.visible = true;
		d_default.rotation.y = 0;
		for(var i = 0; i<nn ; i++){
			var b=ballArray1[i];
	
			b.position.x =-50-i*2;
		}
		setTimeout(style,2000);
	}else if(a%3 == 0){
		d_default.rotation.y = -45;
		angry.visible = false;
		for(var i = 0; i<nn ; i++){
			var b=ballArray1[i];
	
			b.position.x =51
		}
	}

	
	
}

function style(){
	d_default.visible = true;
	d_spitfire.visible = false;
	
}

function move(e){
	var str = e.target.parent.name;
	if(str === "btnUp"){
		d_default.position.z-=1;
	}else if(str === "btnDown"){
		d_default.position.z+=1;
	}
	
}




//resize
MyJS.myResize();




var obj = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "ee5eb73b-a995-4f6e-ac92-4343fc7ebd53",
			"type": "RingGeometry",
			"innerRadius": 0.5,
			"outerRadius": 0.94,
			"thetaSegments": 100,
			"phiSegments": 1,
			"thetaStart": 0,
			"thetaLength": 2.356194490192345
		}],
	"materials": [
		{
			"uuid": "a1de3644-2684-44bb-a107-5f0f7eebb80b",
			"type": "MeshStandardMaterial",
			"color": 16711680,
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
		"uuid": "6fcf45a2-2cab-4852-b30a-19aaed32118f",
		"type": "Group",
		"name": "Group",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "d5630969-9b6c-4216-86de-237c18f27766",
				"type": "Mesh",
				"name": "Ring",
				"layers": 1,
				"matrix": [-0.2539840417370536,-0.9321585302596521,0.25801662932275454,0,0.9658171300295889,-0.23012480816333158,0.11933081751667356,0,-0.05185921214517679,0.27950500376908266,0.9587427053092642,0,-3.9113766979839557,4.285429367163792,0,1],
				"geometry": "ee5eb73b-a995-4f6e-ac92-4343fc7ebd53",
				"material": "a1de3644-2684-44bb-a107-5f0f7eebb80b"
			},
			{
				"uuid": "aaa83541-9fda-41e9-88f9-582c5ae76b68",
				"type": "Mesh",
				"name": "Ring",
				"layers": 1,
				"matrix": [0.4189426474664175,0.8624820568141702,-0.28392210165365356,0,-0.8637190815442903,0.47499226955948926,0.16843898608995872,0,0.28013640661312994,0.1746626621013318,0.9439367288953,0,-1.7765266770054662,2.309389066074847,0.29000981558989825,1],
				"geometry": "ee5eb73b-a995-4f6e-ac92-4343fc7ebd53",
				"material": "a1de3644-2684-44bb-a107-5f0f7eebb80b"
			},
			{
				"uuid": "46d88727-c311-4ace-b56c-f9927f4c5063",
				"type": "Mesh",
				"name": "Ring",
				"layers": 1,
				"matrix": [-0.8399268574706429,0.5081102743939452,0.1906484281466787,0,-0.37535056556425067,-0.7976205673207555,0.47213703891721165,0,0.3919627878129335,0.32500058406443716,0.8606624154264482,0,-1.8109155661815532,4.297474122756524,0,1],
				"geometry": "ee5eb73b-a995-4f6e-ac92-4343fc7ebd53",
				"material": "a1de3644-2684-44bb-a107-5f0f7eebb80b"
			},
			{
				"uuid": "d5983940-3bf2-4024-98d9-b6a89f0ea8dc",
				"type": "Mesh",
				"name": "Ring",
				"layers": 1,
				"matrix": [0.9100326567113352,-0.41431365985712953,-0.013592460215133273,0,0.4069694547930788,0.8991766853429095,-0.1608015901698819,0,0.0788443186560289,0.14080298218265555,0.9868931520808812,0,-3.77976098946525,2.314276361067134,0.30904472725157284,1],
				"geometry": "ee5eb73b-a995-4f6e-ac92-4343fc7ebd53",
				"material": "a1de3644-2684-44bb-a107-5f0f7eebb80b"
			}]
	}
};
var d1 = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "bdd98385-3656-4af8-b9de-470138175265",
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
			"uuid": "6cc1d5d2-d2c4-4ede-9513-2cc6921b41d1",
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
			"uuid": "75a6641d-ab53-4a3e-902d-d7cb194d7345",
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
			"uuid": "dd79f724-134e-4c36-9c89-02dc8242f6ab",
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
			"uuid": "793ff246-d76d-4709-ab48-d73a7b8d0c8d",
			"type": "LatheGeometry",
			"points": [
				{
					"isVector2": true,
					"x": 0,
					"y": 0.5
				},
				{
					"isVector2": true,
					"x": 0.5,
					"y": 0
				},
				{
					"isVector2": true,
					"x": 0,
					"y": -0.5
				}],
			"segments": 12,
			"phiStart": 0,
			"phiLength": 6.283185307179586
		},
		{
			"uuid": "1327feaa-7d06-4fff-a580-aa47ea17564d",
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
			"uuid": "db5e7807-775f-4d39-9fa1-69d13b62bbf6",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "aaab7bdc-2a11-4256-88f5-f32e1d0d43f7",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
			"uuid": "0b517891-7a1b-43fd-acb7-6eda38a0a93b",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
			"uuid": "1052af19-6306-4c6d-ae6b-7ce30844168a",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
			"uuid": "9c1445cb-823a-4d0a-b3ec-e698fa02d2ef",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
			"uuid": "b0157c6f-c16a-4682-b1a3-0a5538432e4b",
			"type": "MeshStandardMaterial",
			"color": 13422170,
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
			"uuid": "a8351e26-bea7-4073-85cf-05967f663ea5",
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
			"uuid": "2e38fb98-969c-4374-988d-db60a21a2945",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
		"uuid": "d006487c-8955-40df-875d-e0402083be0f",
		"type": "Group",
		"name": "Group",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,3.2075973054622233,0.7490486722737695,0,1],
		"children": [
			{
				"uuid": "05c64ddb-9a68-4d61-8ac0-059f6e450349",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,2.137611599714079,0,0,0,0,1,0,0,0.7182279609910376,0,1],
				"geometry": "bdd98385-3656-4af8-b9de-470138175265",
				"material": "aaab7bdc-2a11-4256-88f5-f32e1d0d43f7"
			},
			{
				"uuid": "36695d7a-7a6f-47fc-9579-e80c6013d740",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,1.7681490669117197,0,1],
				"geometry": "6cc1d5d2-d2c4-4ede-9513-2cc6921b41d1",
				"material": "0b517891-7a1b-43fd-acb7-6eda38a0a93b"
			},
			{
				"uuid": "5d94d047-3fac-47ed-860e-dac9a3aeb775",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.3875934553643716,1.741825009288263,0,1],
				"geometry": "75a6641d-ab53-4a3e-902d-d7cb194d7345",
				"material": "1052af19-6306-4c6d-ae6b-7ce30844168a"
			},
			{
				"uuid": "0950d873-07b4-4d9f-b685-6457217278d8",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [7.196994879395178e-17,0.3241238345703149,0,0,-1,2.220446049250313e-16,0,0,0,0,0.33975843170690334,0,0.8038178600011556,-0.03735350591357811,0.5509235743451152,1],
				"geometry": "dd79f724-134e-4c36-9c89-02dc8242f6ab",
				"material": "9c1445cb-823a-4d0a-b3ec-e698fa02d2ef"
			},
			{
				"uuid": "bf050fe9-fbfc-4ef9-bda5-6aae32d0db4e",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [7.196994879395178e-17,0.3241238345703149,0,0,-1,2.220446049250313e-16,0,0,0,0,0.33975843170690334,0,0.8038178600011556,-0.02483867484653568,-0.3557610877043117,1],
				"geometry": "dd79f724-134e-4c36-9c89-02dc8242f6ab",
				"material": "9c1445cb-823a-4d0a-b3ec-e698fa02d2ef"
			},
			{
				"uuid": "afbed649-b9a5-46df-a844-87c216683c16",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [0.2588810914718408,0.9659091988786255,1.3877787807814457e-17,0,-0.9654004269665435,0.258744731420541,-0.03245272831253942,0,-0.031346388805790645,0.008401397726789295,0.9994732714910752,0,-0.8565578044371178,1.9577791168287484,0,1],
				"geometry": "793ff246-d76d-4709-ab48-d73a7b8d0c8d",
				"material": "b0157c6f-c16a-4682-b1a3-0a5538432e4b"
			},
			{
				"uuid": "ad006940-3fde-453b-b1af-98e3218463c8",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [-0.056681749502170975,0.9983922972826732,-1.0408340855860843e-17,0,-0.9978664155966034,-0.05665189360877232,-0.032452728312539425,0,-0.032400553973046683,-0.0018394774168733544,0.9994732714910752,0,-0.9442384979321403,1.0620020764950258,0,1],
				"geometry": "793ff246-d76d-4709-ab48-d73a7b8d0c8d",
				"material": "b0157c6f-c16a-4682-b1a3-0a5538432e4b"
			},
			{
				"uuid": "ee3ae0cd-1bdb-48c1-9b69-e9a20b745966",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [-0.056681749502170975,0.9983922972826732,-1.0408340855860843e-17,0,-0.9978664155966034,-0.05665189360877232,-0.032452728312539425,0,-0.032400553973046683,-0.0018394774168733544,0.9994732714910752,0,-0.9442384979321403,0.12590794286977758,0,1],
				"geometry": "793ff246-d76d-4709-ab48-d73a7b8d0c8d",
				"material": "b0157c6f-c16a-4682-b1a3-0a5538432e4b"
			},
			{
				"uuid": "ca5ba9d6-f495-4a89-ac60-3f4955c72b6a",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.1,0,0,0,0,1.0169965543229114e-17,0.04580145303085742,0,0,-0.1,2.2204460492503132e-17,0,0.030301361428556106,2.1322149470446115,0.944962509923477,1],
				"geometry": "1327feaa-7d06-4fff-a580-aa47ea17564d",
				"material": "a8351e26-bea7-4073-85cf-05967f663ea5"
			},
			{
				"uuid": "61cd373a-080f-40e7-a3c0-3eefbd8129d7",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.1,0,0,0,0,1.0169965543229114e-17,0.04580145303085742,0,0,-0.1,2.2204460492503132e-17,0,0.030301361428556106,2.1322149470446115,-0.9434779593786448,1],
				"geometry": "1327feaa-7d06-4fff-a580-aa47ea17564d",
				"material": "a8351e26-bea7-4073-85cf-05967f663ea5"
			},
			{
				"uuid": "dfd05c7b-ace1-4db9-8b02-f6c499ecb431",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1.1102230246251566e-17,0.05,0,0,-0.04580145303085742,1.0169965543229114e-17,0,0,0,0,0.057411451925942575,0,1.2557544122860431,2.057106415677623,0.39513559176728785,1],
				"geometry": "1327feaa-7d06-4fff-a580-aa47ea17564d",
				"material": "a8351e26-bea7-4073-85cf-05967f663ea5"
			},
			{
				"uuid": "2dd10713-8031-4d10-befe-ae7c2d42507a",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1.1102230246251566e-17,0.05,0,0,-0.04580145303085742,1.0169965543229114e-17,0,0,0,0,0.057411451925942575,0,1.2873908707935149,2.057106415677623,-0.29316442627547246,1],
				"geometry": "1327feaa-7d06-4fff-a580-aa47ea17564d",
				"material": "a8351e26-bea7-4073-85cf-05967f663ea5"
			},
			{
				"uuid": "756c3e1f-ad88-440c-b707-d3efcc162d85",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [2.220446049250313e-16,1,0,0,-0.43327271052936994,9.62058678342914e-17,0,0,0,0,1,0,0.14727642945670605,1.738921129006178,0,1],
				"geometry": "db5e7807-775f-4d39-9fa1-69d13b62bbf6",
				"material": "2e38fb98-969c-4374-988d-db60a21a2945"
			}]
	}
};

var d2 = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "bdd98385-3656-4af8-b9de-470138175265",
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
			"uuid": "98afbb38-0b93-472d-b614-2b0ee85307d7",
			"type": "SphereGeometry",
			"radius": 1,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 1.5707963267948966
		},
		{
			"uuid": "428c7431-b6d7-4755-8cd8-51624a96b212",
			"type": "SphereGeometry",
			"radius": 1,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 1.5707963267948966
		},
		{
			"uuid": "dd79f724-134e-4c36-9c89-02dc8242f6ab",
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
			"uuid": "793ff246-d76d-4709-ab48-d73a7b8d0c8d",
			"type": "LatheGeometry",
			"points": [
				{
					"isVector2": true,
					"x": 0,
					"y": 0.5
				},
				{
					"isVector2": true,
					"x": 0.5,
					"y": 0
				},
				{
					"isVector2": true,
					"x": 0,
					"y": -0.5
				}],
			"segments": 12,
			"phiStart": 0,
			"phiLength": 6.283185307179586
		},
		{
			"uuid": "1327feaa-7d06-4fff-a580-aa47ea17564d",
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
			"uuid": "f482cb42-f5fc-447d-b620-526411dbae90",
			"type": "SphereGeometry",
			"radius": 1,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 1.5707963267948966
		},
		{
			"uuid": "4e77b6be-6c32-4a0f-a619-df42d285b3a4",
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
			"uuid": "db5e7807-775f-4d39-9fa1-69d13b62bbf6",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "aaab7bdc-2a11-4256-88f5-f32e1d0d43f7",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
			"uuid": "0b517891-7a1b-43fd-acb7-6eda38a0a93b",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
			"uuid": "1052af19-6306-4c6d-ae6b-7ce30844168a",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
			"uuid": "9c1445cb-823a-4d0a-b3ec-e698fa02d2ef",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
			"uuid": "b0157c6f-c16a-4682-b1a3-0a5538432e4b",
			"type": "MeshStandardMaterial",
			"color": 13422170,
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
			"uuid": "a8351e26-bea7-4073-85cf-05967f663ea5",
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
			"uuid": "ff59f019-4f55-4115-acbd-0afad0a17507",
			"type": "MeshStandardMaterial",
			"color": 13519691,
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
			"uuid": "2e38fb98-969c-4374-988d-db60a21a2945",
			"type": "MeshStandardMaterial",
			"color": 1064225,
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
		"uuid": "df7fccf6-8d20-4fcb-8cc5-a5dbc3160172",
		"type": "Group",
		"name": "Group",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.477615383363327,0.7490486722737695,0,1],
		"children": [
			{
				"uuid": "00088717-aa07-465b-bae8-1c111ba77242",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1.8413657520158633,0,0,0,0,1,0,0,0.5743095650686998,0,1],
				"geometry": "bdd98385-3656-4af8-b9de-470138175265",
				"material": "aaab7bdc-2a11-4256-88f5-f32e1d0d43f7"
			},
			{
				"uuid": "24b4c35f-baa8-4657-8ee0-3d2f3c5b3ee6",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1.3452628345373439,0,0,0,0,1,0,0,1.4059918517257148,0,1],
				"geometry": "98afbb38-0b93-472d-b614-2b0ee85307d7",
				"material": "0b517891-7a1b-43fd-acb7-6eda38a0a93b"
			},
			{
				"uuid": "7524349e-7fe9-4d16-a304-b39a8b9434ca",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.9296448623641339,0.36845682227361537,3.469446951953614e-18,0,-0.367267718637641,0.9266446625600409,-0.0802751032119588,0,-0.02957790943716483,0.07462733727674808,0.9967727463189939,0,0.4395636306431818,1.741825009288263,0,1],
				"geometry": "428c7431-b6d7-4755-8cd8-51624a96b212",
				"material": "1052af19-6306-4c6d-ae6b-7ce30844168a"
			},
			{
				"uuid": "a83363eb-0a02-4403-af41-7c1f0cecf31a",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [7.196994879395178e-17,0.3241238345703149,0,0,-1,2.220446049250313e-16,0,0,0,0,0.33975843170690334,0,0.8038178600011556,-0.03735350591357811,0.5509235743451152,1],
				"geometry": "dd79f724-134e-4c36-9c89-02dc8242f6ab",
				"material": "9c1445cb-823a-4d0a-b3ec-e698fa02d2ef"
			},
			{
				"uuid": "2f15c9e7-1a36-484d-8286-29ab2c093670",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [7.196994879395178e-17,0.3241238345703149,0,0,-1,2.220446049250313e-16,0,0,0,0,0.33975843170690334,0,0.8038178600011556,-0.02483867484653568,-0.3557610877043117,1],
				"geometry": "dd79f724-134e-4c36-9c89-02dc8242f6ab",
				"material": "9c1445cb-823a-4d0a-b3ec-e698fa02d2ef"
			},
			{
				"uuid": "87c43ae6-c64f-4982-b92e-1758327616c3",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [0.2588810914718408,0.9659091988786255,1.3877787807814457e-17,0,-0.9654004269665435,0.258744731420541,-0.03245272831253942,0,-0.031346388805790645,0.008401397726789295,0.9994732714910752,0,-0.8565578044371178,1.9577791168287484,0,1],
				"geometry": "793ff246-d76d-4709-ab48-d73a7b8d0c8d",
				"material": "b0157c6f-c16a-4682-b1a3-0a5538432e4b"
			},
			{
				"uuid": "ebc37402-c491-4a85-8ff3-04404b1092e3",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [-0.056681749502170975,0.9983922972826732,-1.0408340855860843e-17,0,-0.9978664155966034,-0.05665189360877232,-0.032452728312539425,0,-0.032400553973046683,-0.0018394774168733544,0.9994732714910752,0,-0.9442384979321403,1.0620020764950258,0,1],
				"geometry": "793ff246-d76d-4709-ab48-d73a7b8d0c8d",
				"material": "b0157c6f-c16a-4682-b1a3-0a5538432e4b"
			},
			{
				"uuid": "f97c505b-4e89-4658-8651-0980d58b4932",
				"type": "Mesh",
				"name": "Lathe",
				"layers": 1,
				"matrix": [-0.056681749502170975,0.9983922972826732,-1.0408340855860843e-17,0,-0.9978664155966034,-0.05665189360877232,-0.032452728312539425,0,-0.032400553973046683,-0.0018394774168733544,0.9994732714910752,0,-0.9442384979321403,0.12590794286977758,0,1],
				"geometry": "793ff246-d76d-4709-ab48-d73a7b8d0c8d",
				"material": "b0157c6f-c16a-4682-b1a3-0a5538432e4b"
			},
			{
				"uuid": "90a6edba-dbc4-4b30-8854-7bcece7b7919",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.1,0,0,0,0,1.0169965543229114e-17,0.04580145303085742,0,0,-0.1,2.2204460492503132e-17,0,0.030301361428556106,2.1322149470446115,0.944962509923477,1],
				"geometry": "1327feaa-7d06-4fff-a580-aa47ea17564d",
				"material": "a8351e26-bea7-4073-85cf-05967f663ea5"
			},
			{
				"uuid": "205df85c-91ef-4da1-b503-2e67e7a837b2",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.1,0,0,0,0,1.0169965543229114e-17,0.04580145303085742,0,0,-0.1,2.2204460492503132e-17,0,0.030301361428556106,2.1322149470446115,-0.9434779593786448,1],
				"geometry": "1327feaa-7d06-4fff-a580-aa47ea17564d",
				"material": "a8351e26-bea7-4073-85cf-05967f663ea5"
			},
			{
				"uuid": "3f369969-0b7d-4d11-97c3-04f43055bd7d",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [-0.03064459076721462,0.039507355103626046,0.0002791942440970528,0,-0.03618454979130569,-0.028059785603258655,-0.0010487554707917827,0,-0.0008423277419602782,-0.001058974541914211,0.05739550391049387,0,1.1045538874331846,2.369183882418729,0.39513559176728785,1],
				"geometry": "1327feaa-7d06-4fff-a580-aa47ea17564d",
				"material": "a8351e26-bea7-4073-85cf-05967f663ea5"
			},
			{
				"uuid": "5b9da46f-3133-4e9c-98a5-0a5fb540da99",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [-0.9697147061983391,0.20491108772364278,-3.954466832988415e-17,0,-0.20607806517103916,-0.9752372731082775,-0.08027510321195883,0,-0.01659649906402217,-0.07854074365899877,0.9967727463189939,0,0.3875934553643716,1.741825009288263,0,1],
				"geometry": "f482cb42-f5fc-447d-b620-526411dbae90",
				"material": "1052af19-6306-4c6d-ae6b-7ce30844168a"
			},
			{
				"uuid": "89ffc239-347e-4b24-9cc6-e6736cb38054",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1.0477822266236556,0,0,0,0,1,0,0,0,0,0.918075729004373,0,0.3037840905554894,1.7277615104113329,0,1],
				"geometry": "4e77b6be-6c32-4a0f-a619-df42d285b3a4",
				"material": "ff59f019-4f55-4115-acbd-0afad0a17507"
			},
			{
				"uuid": "23bf5172-e666-4d0f-9a78-c8306395028e",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [-0.03064459076721462,0.039507355103626046,0.0002791942440970528,0,-0.03618454979130569,-0.028059785603258655,-0.0010487554707917827,0,-0.0008423277419602782,-0.001058974541914211,0.05739550391049387,0,1.1352868745806983,2.3707137680975956,-0.3423367065610389,1],
				"geometry": "1327feaa-7d06-4fff-a580-aa47ea17564d",
				"material": "a8351e26-bea7-4073-85cf-05967f663ea5"
			},
			{
				"uuid": "859dceba-00c4-4cba-9966-de4cab0ac5a3",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [2.220446049250313e-16,1,0,0,-0.43327271052936994,9.62058678342914e-17,0,0,0,0,1,0,0.14727642945670605,1.738921129006178,0,1],
				"geometry": "db5e7807-775f-4d39-9fa1-69d13b62bbf6",
				"material": "2e38fb98-969c-4374-988d-db60a21a2945"
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
