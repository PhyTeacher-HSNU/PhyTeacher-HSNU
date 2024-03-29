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
//var dfault;
var walk_1;
var walk_2;
//var jump_1
var dt=0.1;
var ratio=1;
var scale=1;
//var gameMD=0;


//B.定義init
function init(){

	loader = new THREE.ObjectLoader();
	/*dfault = loader.parse(fakirby);
	scene.add(dfault);
	dfault.visible=false;
	dfault.scale.x*=3;
	dfault.scale.y*=3;
	dfault.scale.z*=3;*/


	walk_1 = loader.parse(fakirby_1);
	scene.add(walk_1);
	walk_1.position.x=0;
	walk_1.position.y=1;
	walk_1.scale.x*=3;
	walk_1.scale.y*=3;
	walk_1.scale.z*=3;

	walk_2 = loader.parse(fakirby_2);
	scene.add(walk_2);
	walk_2.position.x=0;
	walk_1.position.x=0;
	walk_2.scale.x*=3;
	walk_2.scale.y*=3;
	walk_2.scale.z*=3;

	/*jump_1 = loader.parse(fakirby_3);
	scene.add(jump_1)
	jump_1.visible=false;
	jump_1.scale.x*=3;
	jump_1.scale.y*=3;
	jump_1.scale.z*=3;*/
	

	//設置速度
	/*dfault.vx=*/walk_1.vx=walk_2.vx=5;
	/*dfault.vy=*/walk_1.vy=walk_2.vy=0;
	/*dfault.vz=*/walk_1.vz=walk_2.vz=8;
	
	//設置加速度
	/*dfault.ax=*/walk_1.ax=walk_2.ax=0;
	/*dfault.ay=*/walk_1.ay=walk_2.ay=0;
	/*dfault.az=*/walk_1.az=walk_2.az=0;
	
	
	//設定左右鍵功能
	world2D.btnLeft.on("click",clickBtn);
	world2D.btnRight.on("click",clickBtn);
	//world2D.btnUp.on("click",clickBtn);
	
	world2D.sl01.setLabel("速度");
	world2D.sl01.minimum=0.1;
	world2D.sl01.maximum=2;
	world2D.sl01.value=1;
	world2D.sl01.digitN=1;

	var Name = new TEACHER.ObjTextPlane(200,20,"156328 程暄雯","z",0x0ffffff)
	scene.add(Name);
	Name.position.x=-70;
	Name.position.y=30;
	Name.position.z=-100;

	world2D.sl02.setLabel("尺寸");
	world2D.sl02.minimum=1;
	world2D.sl02.maximum=8;
	world2D.sl02.value=3;

	logo.visible=false;
	world2D.ch01.visible=false;
	world2D.ch02.visible=false;
	world2D.btnUp.visible=false;
	world2D.btnDown.visible=false;
	world2D.btn01.visible=false;
	world2D.btn02.visible=false;
    //world2D.sl02.visible=false;
    world2D.sl03.visible=false;




	



	setInterval(tick,1000/fps);
	setInterval(moving,1000/5);
}


//C.定義tick                                                                                                                       
function tick(){

	/*jump_1.position.x=walk_1.position.x;
	jump_1.position.z=walk_1.position.z;*/

	//設定walk_1速度
	walk_1.vx += walk_1.ax*dt;
	walk_1.vz += walk_1.az*dt;
	
	//設定walk_1移動
	walk_1.position.x += walk_1.vx*dt;
	walk_1.position.z += walk_1.vz*dt;

	//設定walk_2速度
	walk_2.vx += walk_2.ax*dt;
	walk_2.vz += walk_2.az*dt;
	
	//設定walk_2移動
	walk_2.position.x += walk_2.vx*dt;
	walk_2.position.z += walk_2.vz*dt;

	scale=world2D.sl02.value;
	walk_1.scale.x=walk_2.scale.x=scale;
	walk_1.scale.y=walk_2.scale.y=scale;
	walk_1.scale.z=walk_2.scale.z=scale;

	/*jump_1.vx = walk_1.vx;
	jump_1.vz = walk_1.vz;

	jump_1.position.x=walk_1.position.x;
	jump_1.position.z=walk_1.position.z;
	jump_1.position.y += jump_1.vy*dt;*/

	//撞牆反彈
	ratio=world2D.sl01.value;
	if(walk_1.position.x>50 && walk_1.vx>0){
		walk_1.vx*=-1*ratio;
	}else if(walk_1.position.x<-50 && walk_1.vx<0){
		walk_1.vx*=-1*ratio;
	}
	if(walk_1.position.z>50 && walk_1.vz>0){
		walk_1.vz*=-1*ratio;
	}else if(walk_1.position.z<-50 && walk_1.vz<0){
		walk_1.vz*=-1*ratio;
	}

	if(walk_2.position.x>50 && walk_2.vx>0){
		walk_2.vx*=-1*ratio;
	}else if(walk_2.position.x<-50 && walk_2.vx<0){
		walk_2.vx*=-1*ratio;
	}
	if(walk_2.position.z>50 && walk_2.vz>0){
		walk_2.vz*=-1*ratio;
	}else if(walk_2.position.z<-50 && walk_2.vz<0){
		walk_2.vz*=-1*ratio;
	}


	
	//fakirby正面轉向隨滑鼠位置變更(但移動方向不變)
	var vecM = getMouse3D("y",0);
	walk_1.rotation.y=vecM.x;
	walk_2.rotation.y=vecM.x;

	
	
	

	
	



	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

//移動動畫
var i = 0;
function moving(){

	i++;
	/*if(clickBtn(e)){
		var str = e.target.parent.name;
		if(str === "btnUp"){
			i=0.1;
			jump_1.visible=true;
			jump_1.vy=5;
			for(var k=0; k<4; k++){
				jump_1.vy-=1;
			}
			walk_1.visible=false;
			walk_2.visible=false;
		}
		//if()
	}*/
	if(i%2 === 0){
		walk_1.visible=false;
		return walk_2.visible=true;
	}
	if(i%2 === 1){
		walk_2.visible=false;
		return walk_1.visible=true;
	}
		
}

//可按按鈕更改fakirby方向(click)
function clickBtn(e){
	var str = e.target.parent.name;

	if(str === "btnLeft"){
		if(walk_1.vx>0){
			walk_1.vx*=-1;
			walk_2.vx*=-1;
		}
	}else if(str === "btnRight"){
		if(walk_1.vx<0){
			walk_1.vx*=-1;
			walk_2.vx*=-1;
		}
	}/*else if(str === "btnUp"){
		i=3;
		jump_1.visible=true;
		walk_1.visible=false;
		walk_2.visible=false;
	}*/
}





//resize
MyJS.myResize();





var fakirby_3 = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "77d39070-4cbe-47f5-a468-8ff7ee6de8f5",
			"type": "SphereGeometry",
			"radius": 1.4,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
			"type": "CircleGeometry",
			"radius": 0.08,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "0b3fe7fd-8752-4cdd-ae38-87379d734e24",
			"type": "RingGeometry",
			"innerRadius": 0.46,
			"outerRadius": 0.55,
			"thetaSegments": 100,
			"phiSegments": 1,
			"thetaStart": 3.141592653589793,
			"thetaLength": -3.141592653589793
		},
		{
			"uuid": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "1958595e-528b-4529-b3b6-542e5ceae929",
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
			"uuid": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
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
			"uuid": "d38cb014-ba28-4776-99f6-4d6fe5299aea",
			"type": "MeshStandardMaterial",
			"color": 16364785,
			"roughness": 1,
			"metalness": 0,
			"emissive": 855309,
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
			"uuid": "9a43c432-ec3c-4eb2-8281-f421827e64d2",
			"type": "MeshStandardMaterial",
			"color": 16777215,
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
			"uuid": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce",
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
			"uuid": "6b4c4f83-61a8-460d-9040-85c6c0c29cab",
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
			"uuid": "94fda200-5024-4c51-8eca-ac76206e6537",
			"type": "MeshStandardMaterial",
			"color": 11732229,
			"roughness": 1,
			"metalness": 0,
			"emissive": 12391444,
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
			"uuid": "dce6d969-555d-44eb-a542-9df171cf03a2",
			"type": "MeshStandardMaterial",
			"color": 10773916,
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
			"uuid": "fddf156c-161e-4ac0-a640-a1df5820d533",
			"type": "MeshStandardMaterial",
			"color": 14164514,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"emissiveIntensity": 1.02,
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
		"uuid": "42a79b1d-07de-401d-ba02-c31d9e041c4f",
		"type": "Group",
		"name": "jump_1",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.6476359941830401,0.12505165738102536,7.418779336971383,1],
		"children": [
			{
				"uuid": "1069e99c-32e1-490f-8838-21b7f20b0f41",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1],
				"geometry": "77d39070-4cbe-47f5-a468-8ff7ee6de8f5",
				"material": "d38cb014-ba28-4776-99f6-4d6fe5299aea"
			},
			{
				"uuid": "7808030b-7e99-409a-a711-8d6534f2c0e5",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [1.4920661348363686,0,0,0,0,0.5510469815647123,0,0,0,0,1,0,0.5152396072228606,1.3949384164427503,1.354610732067119,1],
				"geometry": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
				"material": "9a43c432-ec3c-4eb2-8281-f421827e64d2"
			},
			{
				"uuid": "a40e749f-c010-4090-96dc-f204d15a69fd",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.16533660528131242,0,0,0,0,0.06336502219297921,0,0,0,0,1,0,0.4379970608501518,1.3905235871838728,1.3449598197561927,1],
				"geometry": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
				"material": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce"
			},
			{
				"uuid": "5910b0e1-4873-41af-b555-c3d54e6ee65d",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [1.4920661348363686,0,0,0,0,0.5510469815647123,0,0,0,0,1,0,-0.5595676002977671,1.3949384164427503,1.2637263594891746,1],
				"geometry": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
				"material": "9a43c432-ec3c-4eb2-8281-f421827e64d2"
			},
			{
				"uuid": "6f93d2d5-7ac4-4bbb-94e1-d1e4217a584e",
				"type": "Mesh",
				"name": "Ring",
				"layers": 1,
				"matrix": [0.5602550380963718,0,0,0,0,-0.47978599646738546,-0.0593298530139218,0,0,0.07807417665654565,-0.631366752867931,0,-0.09142716250853328,1.4337786385485596,1.43223598256917,1],
				"geometry": "0b3fe7fd-8752-4cdd-ae38-87379d734e24",
				"material": "6b4c4f83-61a8-460d-9040-85c6c0c29cab"
			},
			{
				"uuid": "4720fad8-9763-4098-8e14-13075f53e62f",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.16533660528131242,0,0,0,0,0.06336502219297921,0,0,0,0,1,0,-0.6155971960806927,1.3905235871838728,1.2537371258877883,1],
				"geometry": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
				"material": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce"
			},
			{
				"uuid": "2b6f8eee-af0a-4ebd-a735-17c97e138acb",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.3824074748825458,0,0,0,0,0.08561733362955687,0,0,0,0,1,0,-0.99037086566621,1.2176900281927159,1.2667519138298373,1],
				"geometry": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
				"material": "94fda200-5024-4c51-8eca-ac76206e6537"
			},
			{
				"uuid": "2b84d38f-942c-4abc-9c4f-5edd2186a971",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.3824074748825458,0,0,0,0,0.08561733362955687,0,0,0,0,1,0,0.9359044464111868,1.2176900281927159,1.2667519138298373,1],
				"geometry": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
				"material": "94fda200-5024-4c51-8eca-ac76206e6537"
			},
			{
				"uuid": "938c0120-0d72-4102-831f-75e0a9760cb7",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.45301938434579375,0,0,0,0,0.4199341625135253,0,0,0,0,0.41979030199715006,0,-1.1912224858427165,1.8522408431793085,0,1],
				"geometry": "1958595e-528b-4529-b3b6-542e5ceae929",
				"material": "dce6d969-555d-44eb-a542-9df171cf03a2"
			},
			{
				"uuid": "ce41a335-fdbd-44a1-b690-16cfa59cb43c",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.45301938434579375,0,0,0,0,0.4199341625135253,0,0,0,0,0.41979030199715006,0,1.3750001723392629,1.0874029561020733,0,1],
				"geometry": "1958595e-528b-4529-b3b6-542e5ceae929",
				"material": "dce6d969-555d-44eb-a542-9df171cf03a2"
			},
			{
				"uuid": "c4fbc2ff-25fd-4f3e-bc24-c89f3f19503e",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.48187950196127854,0,0,0,0,0.08995101510265613,-0.30258440520267027,0,0,0.7338571690143684,0.2181579624005731,0,0.6846658542449073,-0.1110149510817488,-0.2805302635753695,1],
				"geometry": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
				"material": "fddf156c-161e-4ac0-a640-a1df5820d533"
			},
			{
				"uuid": "50908daf-481f-45fb-a1c2-1e4499977c72",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.22012752053013984,0.5814634273329172,0.4081197490743857,0,0.10147199053073076,0.14503858448171333,-0.26137282096485137,0,-0.4597998919227892,0.21544687196116974,-0.058952958008711365,0,-0.8866127056147881,0.5663543397371491,1.115044971735107,1],
				"geometry": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
				"material": "fddf156c-161e-4ac0-a640-a1df5820d533"
			}]
	}
};
var fakirby_2 = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "77d39070-4cbe-47f5-a468-8ff7ee6de8f5",
			"type": "SphereGeometry",
			"radius": 1.4,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
			"type": "CircleGeometry",
			"radius": 0.08,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "0b3fe7fd-8752-4cdd-ae38-87379d734e24",
			"type": "RingGeometry",
			"innerRadius": 0.46,
			"outerRadius": 0.55,
			"thetaSegments": 100,
			"phiSegments": 1,
			"thetaStart": 3.141592653589793,
			"thetaLength": -3.141592653589793
		},
		{
			"uuid": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "1958595e-528b-4529-b3b6-542e5ceae929",
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
			"uuid": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
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
			"uuid": "d38cb014-ba28-4776-99f6-4d6fe5299aea",
			"type": "MeshStandardMaterial",
			"color": 16364785,
			"roughness": 1,
			"metalness": 0,
			"emissive": 855309,
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
			"uuid": "9a43c432-ec3c-4eb2-8281-f421827e64d2",
			"type": "MeshStandardMaterial",
			"color": 16777215,
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
			"uuid": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce",
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
			"uuid": "6b4c4f83-61a8-460d-9040-85c6c0c29cab",
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
			"uuid": "94fda200-5024-4c51-8eca-ac76206e6537",
			"type": "MeshStandardMaterial",
			"color": 11732229,
			"roughness": 1,
			"metalness": 0,
			"emissive": 12391444,
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
			"uuid": "dce6d969-555d-44eb-a542-9df171cf03a2",
			"type": "MeshStandardMaterial",
			"color": 10773916,
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
			"uuid": "fddf156c-161e-4ac0-a640-a1df5820d533",
			"type": "MeshStandardMaterial",
			"color": 14164514,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"emissiveIntensity": 1.02,
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
		"uuid": "d400554a-45f9-4d45-85bd-3dacb0495131",
		"type": "Group",
		"name": "walk_2",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-5.28514692835677,0.12505165738102536,0,1],
		"children": [
			{
				"uuid": "0e791ed4-31b9-4899-8745-b8a9bcde7a6e",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1],
				"geometry": "77d39070-4cbe-47f5-a468-8ff7ee6de8f5",
				"material": "d38cb014-ba28-4776-99f6-4d6fe5299aea"
			},
			{
				"uuid": "5213186d-c33b-4e98-a718-a6e18583b2bb",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [1.4920661348363686,0,0,0,0,0.5510469815647123,0,0,0,0,1,0,0.5152396072228606,1.3949384164427503,1.354610732067119,1],
				"geometry": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
				"material": "9a43c432-ec3c-4eb2-8281-f421827e64d2"
			},
			{
				"uuid": "28901bd9-1c84-4953-8feb-192dcd2f8099",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.16533660528131242,0,0,0,0,0.06336502219297921,0,0,0,0,1,0,0.4379970608501518,1.3905235871838728,1.3449598197561927,1],
				"geometry": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
				"material": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce"
			},
			{
				"uuid": "034fc2db-68d3-44df-a781-7cd790eb88c0",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [1.4920661348363686,0,0,0,0,0.5510469815647123,0,0,0,0,1,0,-0.5595676002977671,1.3949384164427503,1.2637263594891746,1],
				"geometry": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
				"material": "9a43c432-ec3c-4eb2-8281-f421827e64d2"
			},
			{
				"uuid": "1b983a08-1186-4c71-8138-d139452e206a",
				"type": "Mesh",
				"name": "Ring",
				"layers": 1,
				"matrix": [0.5602550380963718,0,0,0,0,-0.47978599646738546,-0.0593298530139218,0,0,0.07807417665654565,-0.631366752867931,0,-0.09142716250853328,1.4337786385485596,1.43223598256917,1],
				"geometry": "0b3fe7fd-8752-4cdd-ae38-87379d734e24",
				"material": "6b4c4f83-61a8-460d-9040-85c6c0c29cab"
			},
			{
				"uuid": "0a1e7ac3-f617-441f-b60c-f7e76a8267cd",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.16533660528131242,0,0,0,0,0.06336502219297921,0,0,0,0,1,0,-0.6155971960806927,1.3905235871838728,1.2537371258877883,1],
				"geometry": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
				"material": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce"
			},
			{
				"uuid": "2d387cd6-ce7f-4191-b702-717b14d8e7e0",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.3824074748825458,0,0,0,0,0.08561733362955687,0,0,0,0,1,0,-0.99037086566621,1.2176900281927159,1.2667519138298373,1],
				"geometry": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
				"material": "94fda200-5024-4c51-8eca-ac76206e6537"
			},
			{
				"uuid": "e47f0f81-6c75-4b31-8388-03b15cf234ae",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.3824074748825458,0,0,0,0,0.08561733362955687,0,0,0,0,1,0,0.9359044464111868,1.2176900281927159,1.2667519138298373,1],
				"geometry": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
				"material": "94fda200-5024-4c51-8eca-ac76206e6537"
			},
			{
				"uuid": "c0b4369d-1702-4127-a933-3f0ea0e8d879",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.45301938434579375,0,0,0,0,0.4199341625135253,0,0,0,0,0.41979030199715006,0,-1.3337793117671777,1.0874029561020733,0,1],
				"geometry": "1958595e-528b-4529-b3b6-542e5ceae929",
				"material": "dce6d969-555d-44eb-a542-9df171cf03a2"
			},
			{
				"uuid": "bf813e46-6a2f-4ecd-9a17-d666349c25b1",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.45301938434579375,0,0,0,0,0.4199341625135253,0,0,0,0,0.41979030199715006,0,1.3750001723392629,1.0874029561020733,0,1],
				"geometry": "1958595e-528b-4529-b3b6-542e5ceae929",
				"material": "dce6d969-555d-44eb-a542-9df171cf03a2"
			},
			{
				"uuid": "e234157c-1875-4800-94f9-59d6d1fa91bf",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.7277541399703574,0,0,0,0,0.315671518179661,0,0,0,0,0.7655973099956355,0,0.9397513364164465,0,-0.2805302635753695,1],
				"geometry": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
				"material": "fddf156c-161e-4ac0-a640-a1df5820d533"
			},
			{
				"uuid": "2b103cbd-91d2-4703-82a4-bcbf7f2b0c03",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.22012752053014,0.38005894220097347,0.6001805123155526,0,0.10147199053073076,0.23431933614721048,-0.18559739016245327,0,-0.45979989192278914,0.22156209008075864,0.028338068651115787,0,-0.8866127056147881,0,0.8697492002475375,1],
				"geometry": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
				"material": "fddf156c-161e-4ac0-a640-a1df5820d533"
			}]
	}
};
var fakirby_1 = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "77d39070-4cbe-47f5-a468-8ff7ee6de8f5",
			"type": "SphereGeometry",
			"radius": 1.4,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
			"type": "CircleGeometry",
			"radius": 0.08,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "0b3fe7fd-8752-4cdd-ae38-87379d734e24",
			"type": "RingGeometry",
			"innerRadius": 0.46,
			"outerRadius": 0.55,
			"thetaSegments": 100,
			"phiSegments": 1,
			"thetaStart": 3.141592653589793,
			"thetaLength": -3.141592653589793
		},
		{
			"uuid": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "1958595e-528b-4529-b3b6-542e5ceae929",
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
			"uuid": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
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
			"uuid": "d38cb014-ba28-4776-99f6-4d6fe5299aea",
			"type": "MeshStandardMaterial",
			"color": 16364785,
			"roughness": 1,
			"metalness": 0,
			"emissive": 855309,
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
			"uuid": "9a43c432-ec3c-4eb2-8281-f421827e64d2",
			"type": "MeshStandardMaterial",
			"color": 16777215,
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
			"uuid": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce",
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
			"uuid": "6b4c4f83-61a8-460d-9040-85c6c0c29cab",
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
			"uuid": "94fda200-5024-4c51-8eca-ac76206e6537",
			"type": "MeshStandardMaterial",
			"color": 11732229,
			"roughness": 1,
			"metalness": 0,
			"emissive": 12391444,
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
			"uuid": "dce6d969-555d-44eb-a542-9df171cf03a2",
			"type": "MeshStandardMaterial",
			"color": 10773916,
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
			"uuid": "fddf156c-161e-4ac0-a640-a1df5820d533",
			"type": "MeshStandardMaterial",
			"color": 14164514,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"emissiveIntensity": 1.02,
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
		"uuid": "210a933c-c0aa-44b6-95a9-4520fd003be9",
		"type": "Group",
		"name": "walk_1",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,8.616822223390574,0.12505165738102536,0,1],
		"children": [
			{
				"uuid": "8b703086-2d50-4578-8d45-ed186e9b7bd7",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1],
				"geometry": "77d39070-4cbe-47f5-a468-8ff7ee6de8f5",
				"material": "d38cb014-ba28-4776-99f6-4d6fe5299aea"
			},
			{
				"uuid": "33fe8e77-ca1a-4d87-8ad1-3115fc3da46c",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [1.4920661348363686,0,0,0,0,0.5510469815647123,0,0,0,0,1,0,0.5152396072228606,1.3949384164427503,1.354610732067119,1],
				"geometry": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
				"material": "9a43c432-ec3c-4eb2-8281-f421827e64d2"
			},
			{
				"uuid": "3336bcb8-27bc-44f8-bd39-fb9940ce3b41",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.16533660528131242,0,0,0,0,0.06336502219297921,0,0,0,0,1,0,0.4379970608501518,1.3905235871838728,1.3449598197561927,1],
				"geometry": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
				"material": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce"
			},
			{
				"uuid": "0f2e5bc4-e783-4fe9-8101-398c522bfbcc",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [1.4920661348363686,0,0,0,0,0.5510469815647123,0,0,0,0,1,0,-0.5595676002977671,1.3949384164427503,1.2637263594891746,1],
				"geometry": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
				"material": "9a43c432-ec3c-4eb2-8281-f421827e64d2"
			},
			{
				"uuid": "14495386-cfa4-432b-92c8-22e4224812de",
				"type": "Mesh",
				"name": "Ring",
				"layers": 1,
				"matrix": [0.5602550380963718,0,0,0,0,-0.47978599646738546,-0.0593298530139218,0,0,0.07807417665654565,-0.631366752867931,0,-0.09142716250853328,1.4337786385485596,1.43223598256917,1],
				"geometry": "0b3fe7fd-8752-4cdd-ae38-87379d734e24",
				"material": "6b4c4f83-61a8-460d-9040-85c6c0c29cab"
			},
			{
				"uuid": "521b84f6-9701-4d07-ae56-9be6e0a40291",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.16533660528131242,0,0,0,0,0.06336502219297921,0,0,0,0,1,0,-0.6155971960806927,1.3905235871838728,1.2537371258877883,1],
				"geometry": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
				"material": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce"
			},
			{
				"uuid": "b5e8dbbe-4680-49ca-9c00-3a3a9263c439",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.3824074748825458,0,0,0,0,0.08561733362955687,0,0,0,0,1,0,-0.99037086566621,1.2176900281927159,1.2667519138298373,1],
				"geometry": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
				"material": "94fda200-5024-4c51-8eca-ac76206e6537"
			},
			{
				"uuid": "40ff5196-36d3-4f57-b47c-2ffb96ec29e7",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.3824074748825458,0,0,0,0,0.08561733362955687,0,0,0,0,1,0,0.9359044464111868,1.2176900281927159,1.2667519138298373,1],
				"geometry": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
				"material": "94fda200-5024-4c51-8eca-ac76206e6537"
			},
			{
				"uuid": "3d9006bb-fd15-445b-8ecd-926701aa713d",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.45301938434579375,0,0,0,0,0.4199341625135253,0,0,0,0,0.41979030199715006,0,-1.3337793117671777,1.0874029561020733,0,1],
				"geometry": "1958595e-528b-4529-b3b6-542e5ceae929",
				"material": "dce6d969-555d-44eb-a542-9df171cf03a2"
			},
			{
				"uuid": "b51a1346-46c2-4402-b9af-e199ba6cf2c6",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.45301938434579375,0,0,0,0,0.4199341625135253,0,0,0,0,0.41979030199715006,0,1.3750001723392629,1.0874029561020733,0,1],
				"geometry": "1958595e-528b-4529-b3b6-542e5ceae929",
				"material": "dce6d969-555d-44eb-a542-9df171cf03a2"
			},
			{
				"uuid": "a689f1f8-6242-4940-8b01-ff3d7d42bf43",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.7277541399703574,0,0,0,0,0.315671518179661,0,0,0,0,0.7655973099956355,0,-0.8205489366675756,0,-0.2805302635753695,1],
				"geometry": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
				"material": "fddf156c-161e-4ac0-a640-a1df5820d533"
			},
			{
				"uuid": "9bed5981-6d66-45d8-b591-c182949f3990",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.31532554975103877,0.5233661222130485,0.4239991415072806,0,-0.05072584618029373,0.21400997473000377,-0.22644011710650647,0,-0.45561777787463426,0.10863924348256497,0.2047405718663367,0,0.7209333852854745,0,0.8697492002475375,1],
				"geometry": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
				"material": "fddf156c-161e-4ac0-a640-a1df5820d533"
			}]
	}
}
var fakirby = 
{
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "77d39070-4cbe-47f5-a468-8ff7ee6de8f5",
			"type": "SphereGeometry",
			"radius": 1.4,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
			"type": "CircleGeometry",
			"radius": 0.08,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "0b3fe7fd-8752-4cdd-ae38-87379d734e24",
			"type": "RingGeometry",
			"innerRadius": 0.46,
			"outerRadius": 0.55,
			"thetaSegments": 100,
			"phiSegments": 1,
			"thetaStart": 3.141592653589793,
			"thetaLength": -3.141592653589793
		},
		{
			"uuid": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 100,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "1958595e-528b-4529-b3b6-542e5ceae929",
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
			"uuid": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
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
			"uuid": "d38cb014-ba28-4776-99f6-4d6fe5299aea",
			"type": "MeshStandardMaterial",
			"color": 16364785,
			"roughness": 1,
			"metalness": 0,
			"emissive": 855309,
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
			"uuid": "9a43c432-ec3c-4eb2-8281-f421827e64d2",
			"type": "MeshStandardMaterial",
			"color": 16777215,
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
			"uuid": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce",
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
			"uuid": "6b4c4f83-61a8-460d-9040-85c6c0c29cab",
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
			"uuid": "94fda200-5024-4c51-8eca-ac76206e6537",
			"type": "MeshStandardMaterial",
			"color": 11732229,
			"roughness": 1,
			"metalness": 0,
			"emissive": 12391444,
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
			"uuid": "dce6d969-555d-44eb-a542-9df171cf03a2",
			"type": "MeshStandardMaterial",
			"color": 10773916,
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
			"uuid": "fddf156c-161e-4ac0-a640-a1df5820d533",
			"type": "MeshStandardMaterial",
			"color": 14164514,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"emissiveIntensity": 1.02,
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
		"uuid": "5b7e3429-b9e8-4c72-9ff8-bd341580974d",
		"type": "Group",
		"name": "fault",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.0889793228050908,0.12505165738102536,0,1],
		"children": [
			{
				"uuid": "934b324c-d7d9-4d4a-8fd3-9feedb407fca",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1],
				"geometry": "77d39070-4cbe-47f5-a468-8ff7ee6de8f5",
				"material": "d38cb014-ba28-4776-99f6-4d6fe5299aea"
			},
			{
				"uuid": "41a4071f-fcd5-40c7-b3a4-dca2838708a7",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [1.4920661348363686,0,0,0,0,0.5510469815647123,0,0,0,0,1,0,0.5152396072228606,1.3949384164427503,1.354610732067119,1],
				"geometry": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
				"material": "9a43c432-ec3c-4eb2-8281-f421827e64d2"
			},
			{
				"uuid": "571d02d0-d4f7-4134-a53a-b6c21532dbfd",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.16533660528131242,0,0,0,0,0.06336502219297921,0,0,0,0,1,0,0.4379970608501518,1.3905235871838728,1.3449598197561927,1],
				"geometry": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
				"material": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce"
			},
			{
				"uuid": "84686891-d3da-4437-afc3-431184fab164",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [1.4920661348363686,0,0,0,0,0.5510469815647123,0,0,0,0,1,0,-0.5595676002977671,1.3949384164427503,1.2637263594891746,1],
				"geometry": "11a7dab1-d2ad-4cce-9c10-3a718c641af9",
				"material": "9a43c432-ec3c-4eb2-8281-f421827e64d2"
			},
			{
				"uuid": "34bdeaf7-963c-4c17-8f2d-1b2745514e93",
				"type": "Mesh",
				"name": "Ring",
				"layers": 1,
				"matrix": [0.5602550380963718,0,0,0,0,-0.47978599646738546,-0.0593298530139218,0,0,0.07807417665654565,-0.631366752867931,0,-0.09142716250853328,1.4337786385485596,1.43223598256917,1],
				"geometry": "0b3fe7fd-8752-4cdd-ae38-87379d734e24",
				"material": "6b4c4f83-61a8-460d-9040-85c6c0c29cab"
			},
			{
				"uuid": "eb649f16-e362-494d-80ac-573b74ca9b4c",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.16533660528131242,0,0,0,0,0.06336502219297921,0,0,0,0,1,0,-0.6155971960806927,1.3905235871838728,1.2537371258877883,1],
				"geometry": "b6e12c4a-6a34-4962-9bf2-9465b93987da",
				"material": "e0f98aa3-426b-4a49-9a6f-3767bfcfc8ce"
			},
			{
				"uuid": "5d203c6f-afc3-408f-bb6b-487d01b806f2",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.3824074748825458,0,0,0,0,0.08561733362955687,0,0,0,0,1,0,-0.99037086566621,1.2176900281927159,1.2667519138298373,1],
				"geometry": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
				"material": "94fda200-5024-4c51-8eca-ac76206e6537"
			},
			{
				"uuid": "a7b2512c-773c-45d5-a9ac-e68d0b05bfde",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.3824074748825458,0,0,0,0,0.08561733362955687,0,0,0,0,1,0,0.9359044464111868,1.2176900281927159,1.2667519138298373,1],
				"geometry": "93fa11c5-7f7b-497d-9a38-bf82754291c5",
				"material": "94fda200-5024-4c51-8eca-ac76206e6537"
			},
			{
				"uuid": "0da48954-adb2-45a0-a285-b7654df33463",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.45301938434579375,0,0,0,0,0.4199341625135253,0,0,0,0,0.41979030199715006,0,-1.3337793117671777,1.0874029561020733,0,1],
				"geometry": "1958595e-528b-4529-b3b6-542e5ceae929",
				"material": "dce6d969-555d-44eb-a542-9df171cf03a2"
			},
			{
				"uuid": "80eeec73-c701-43a2-8fe1-c6794efba07c",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.45301938434579375,0,0,0,0,0.4199341625135253,0,0,0,0,0.41979030199715006,0,1.3750001723392629,1.0874029561020733,0,1],
				"geometry": "1958595e-528b-4529-b3b6-542e5ceae929",
				"material": "dce6d969-555d-44eb-a542-9df171cf03a2"
			},
			{
				"uuid": "a67616bf-1c63-4402-a3ce-6c8c5f491521",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.7277541399703574,0,0,0,0,0.315671518179661,0,0,0,0,0.7655973099956355,0,-0.8205489366675756,0,0.16043457073471235,1],
				"geometry": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
				"material": "fddf156c-161e-4ac0-a640-a1df5820d533"
			},
			{
				"uuid": "911ba71e-4258-4eaa-8dbf-9612d294bcd1",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.7277541399703574,0,0,0,0,0.315671518179661,0,0,0,0,0.7655973099956355,0,0.755260593240153,0,0.16043457073471235,1],
				"geometry": "81517f5d-8a7a-43fc-a991-ba34deacbfa7",
				"material": "fddf156c-161e-4ac0-a640-a1df5820d533"
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
