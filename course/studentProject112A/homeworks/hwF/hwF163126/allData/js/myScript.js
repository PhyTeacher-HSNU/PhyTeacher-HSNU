'use strict';//嚴格模式
var fps=100;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//

//A.宣告全域變數
var dt=0.1,tt=0.1;
var gm;
var name;
var man;
var track;
var loader1;
var loader2,loader3;
var body;
var arm;
var alpha=0 , omega=0 ,beta=0 , theta=Math.PI/4;
var f1,f2;
var isplay=false;
var gm;
var rule;
var nn=20,ballArray1=[];var ballArray2=[];
var ballArray3=[];
var time,mi=30000;//秒
var w,lo,r;
var na;
var t1,t2;
var hh=0,ss,ll;
//B.定義init
function init(){
	world2D.slCameraRR.value=150;
	world3D.cameraTarget.y=20;
	world3D.cameraTarget.x=0;
	world3D.cameraTarget.z=0;
	world3D.cameraTheta=Math.PI/2;
    world3D.cameraPhi=0;
    ground.visible=false;
	
    na=new TEACHER.ObjTextPlane(120,15,'1631 26 陳羿卲','z',);
	scene.add(na);
	na.position.y=30;
	na.position.z=3;
	

	time=new TEACHER.ObjTextPlane(120,15,'TIME','z',0xffffff);
	scene.add(time);
	time.position.x=50;
	time.position.y=50;
	time.position.z=50;

	w=new TEACHER.ObjTextPlane(120,15,'Mission Passed!','z',0xffa500);
	scene.add(w);
	w.position.x=0;
	w.position.y=30;
	w.position.z=70;
	r=new TEACHER.ObjTextPlane(120,15,'Respect +','z',0xf5f5f5);
	scene.add(r);
	r.position.x=0;
	r.position.y=10;
	r.position.z=70;
	lo=new TEACHER.ObjTextPlane(120,15,'wasted','z',0xff0000);
	scene.add(lo);
	lo.position.x=0;
	lo.position.y=20;
	lo.position.z=70;
    
    w.visible=r.visible=lo.visible=false;

	rule=new TEACHER.ObjPicPlane(150,100,pics.rule);
	scene.add(rule);
	rule.position.y=20;
	rule.position.z=80;

    man=new TEACHER.ObjSphere(5,0xf);
	scene.add(man);
    man.position.z=25;
	man.position.y=5;
	man.vx=0;
	man.ax=0;



	track=new TEACHER.ObjBox(100,1,1,0x696969);
	scene.add(track);
	track.position.y=10;
	track.position.z=-5;

	t1=new TEACHER.ObjBox(2,2,2,0x696969);
	scene.add(t1);
	t1.position.x=51;
	t1.position.y=10;
	t1.position.z=-5;
    t2=new TEACHER.ObjBox(2,2,2,0x696969);
	scene.add(t2);
	t2.position.x=-51;
	t2.position.y=10;
	t2.position.z=-5;
    
	world2D.btnLeft.on('mousedown',move);
	world2D.btnLeft.on('pressup',up2D);
	world2D.btnRight.on('mousedown',move);
	world2D.btnRight.on('pressup',up2D);
	world2D.btnDown.on('mousedown',move);
	world2D.btnDown.on('pressup',up2D);
    world2D.btn01.setLabel('start');
	world2D.btn01.on('click',cl);
	world2D.btn02.setLabel('reset');
	world2D.btn02.on('click',re);
	world2D.sl01.visible=world2D.sl02.visible=world2D.sl03.visible=world2D.ch01.visible=false;
	world2D.ch02.setLabel('game rule');
	if(world2D.ch02.checked==true){
        rule.visible=true;
	}else if(world2D.ch02.checked==false){
		rule.visible=false;
	}
	

	
	loader1=new THREE.ObjectLoader();
	body=loader1.parse(body);
	scene.add(body);
	body.vx=(Math.random()*Math.random(1,3)*4+5.55555555555555);
	body.ax=0;
	body.position.y=10;
	body.position.z=-5;

	loader2=new THREE.ObjectLoader();
	arm=loader2.parse(arm);
	scene.add(arm);
    arm.position.y=35;
	arm.rotation.x=0;
	arm.position.z=-5;
   
	
    
    for(var i=0;i<nn;i++){

		var b=new TEACHER.ObjCylinder(5,40,0x8b4513,false,'z');
		scene.add(b);
		
		ballArray1.push(b);
		b.position.x=-47.5+5*i;
		b.position.y=-5;
		b.position.z=25;
	
		
	}	

	
	setInterval(tick,1000/fps);

}


//C.定義tick                                                                                                                       
function tick(){
    ;

	if(world2D.ch02.checked==true){
        rule.visible=true;
	}else if(world2D.ch02.checked==false){
		rule.visible=false;
	}
	
	na.position.x=body.position.x;
	
	hh+=0.001;
	ss=1;
	ll=0.4;
		
    man.mat.color.setHSL(hh,ss,ll);

	
    
	
	if(gm===1){

		console.log(arm.rotation.x);
		log(lo.visible);
	    mi-=10;
		time.setText(mi);
	    if(mi<=10){
		    mi=10;
		    dt=0;
		    tt=0;
		    w.visible=r.visible=true;
			
	    }
	
        man.vx+=man.ax*dt;
	    man.position.x+=man.vx*dt;
	    if(man.position.x>=45 && man.vx>0){
		    man.vx*=0;
	    }else if(man.position.x<= -45 && man.vx<0){
		    man.vx*=0;
	    }

	    body.vx+=body.ax*dt;
	    body.position.x+=body.vx*dt;
	    if(body.position.x>=45 && body.vx>0){
		        body.vx*=-1;
	    }else if(body.position.x<= -45 && body.vx<0){
		    body.vx*=-1;
	    }

		arm.position.x=body.position.x;

	    if(mi<=28500){
		
		    alpha=-0.2*Math.sin(theta)-beta*omega;
	        omega-=alpha*tt;
	        theta-=omega*tt;
	        arm.rotation.x=-theta+45;

	        var a = man.position.x-arm.position.x ;
            var c = Math.sqrt(a * a );
	        var rounded = Math.round((c + Number.EPSILON) * 100) / 100 ;
            if(rounded<20){
			    if(arm.rotation.x>=45.75){
                    lo.visible=true;
			        dt=tt=0;
					mi=mi;
					w.visible=r.visible=false;
					time.setText('TIME');
					

                   
				
			}

		}
	}



	
	
}else if(gm===0){
    man.position.x=body.position.x=arm.position.x=0;
	
	isplay=false;
	arm.rotation.x=0;
	
	mi=30000;
	tt=0;
	w.visible=r.visible=false;
	lo.visible=false;
	time.setText('TIME');
}


    
	

	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function move(e){
	var str=e.target.parent.name;
	
	if(str==='btnLeft'){
		man.vx=-8;
	}else if(str==='btnRight'){
		man.vx=8;
	}else if(str==='btnDown'){
		man.vx=0;}
}
function up2D(e){

}

function cl(e){
	var str=e.target.parent.name;
	if(str==='btn01'){
	
	gm=1;
	dt=0.1;
	tt=0.1;
	}
}

function re(e){
	var str=e.target.parent.name;
	if(str==='btn02'){
	gm=0;
	world2D.ch02.checked=false;
	world2D.slCameraRR.value=150;
	world3D.cameraTarget.y=20;
	world3D.cameraTarget.x=0;
	world3D.cameraTarget.z=0;
	world3D.cameraTheta=Math.PI/2;
    world3D.cameraPhi=0;
    ground.visible=false;
	}
}




//resize
MyJS.myResize();




var body={
	"metadata": {
		"version": 4.6,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "dc21e8ba-a8cd-4263-bfae-ccb96f1b076d",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "1b924085-a8ed-4a33-8bbd-9250f42c6119",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "95882cdf-a368-42a2-a17f-e0ecac764918",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "f6b3bc2f-0c95-4ac4-b9f9-cc76c702a8d6",
			"type": "MeshStandardMaterial",
			"color": 5309701,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"blendColor": 0
		},
		{
			"uuid": "b6f57492-47b4-47af-a1d8-b00d8057d962",
			"type": "MeshStandardMaterial",
			"color": 5309701,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"blendColor": 0
		},
		{
			"uuid": "dd4d6f1a-e9b2-4c76-a971-75b8f5b098b5",
			"type": "MeshStandardMaterial",
			"color": 5309701,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"blendColor": 0
		}],
	"object": {
		"uuid": "7f5afc38-b868-4604-a1f8-822c0b8328ae",
		"type": "Scene",
		"name": "body",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"up": [0,1,0],
		"children": [
			{
				"uuid": "20624a9e-afe4-4dd3-9291-2ac44b890cb1",
				"type": "Group",
				"name": "Group",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,-53.22819506013509,0,1],
				"up": [0,1,0]
			},
			{
				"uuid": "720be219-557e-4de4-ae60-4aead978c962",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [10,0,0,0,0,10,0,0,0,0,10,0,0,0,0,1],
				"up": [0,1,0],
				"geometry": "dc21e8ba-a8cd-4263-bfae-ccb96f1b076d",
				"material": "f6b3bc2f-0c95-4ac4-b9f9-cc76c702a8d6"
			},
			{
				"uuid": "0bec7e69-288c-491f-ba92-860bb200264d",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [20,0,0,0,0,30,0,0,0,0,15,0,0,20,0,1],
				"up": [0,1,0],
				"geometry": "1b924085-a8ed-4a33-8bbd-9250f42c6119",
				"material": "b6f57492-47b4-47af-a1d8-b00d8057d962"
			},
			{
				"uuid": "941c7147-d1b8-449b-bb61-7341c4b240b8",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [8,0,0,0,0,8,0,0,0,0,8,0,0,36.65574200905695,0,1],
				"up": [0,1,0],
				"geometry": "95882cdf-a368-42a2-a17f-e0ecac764918",
				"material": "dd4d6f1a-e9b2-4c76-a971-75b8f5b098b5"
			}]
	}
};

var arm={
	"metadata": {
		"version": 4.6,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "cfea2422-3a9c-462c-8117-eeaf5b462dad",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "5d3c04bb-ad20-42fe-8ad4-9b6082099d5f",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "b517b94c-4bf3-49a2-8e23-be0953521d82",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "5f5b1599-e6a1-4292-8214-392ac6b9ad5b",
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
			"uuid": "f44730f8-803e-4515-8416-81af6a46e18f",
			"type": "MeshStandardMaterial",
			"color": 5309701,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"blendColor": 0
		},
		{
			"uuid": "342c7725-b793-43a6-8bf6-83e5aa420416",
			"type": "MeshStandardMaterial",
			"color": 5309701,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"blendColor": 0
		},
		{
			"uuid": "7ba298b5-bcce-4769-8eb5-205b301361aa",
			"type": "MeshStandardMaterial",
			"color": 5309701,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"blendColor": 0
		},
		{
			"uuid": "100a066d-5374-4590-8921-a458727291f1",
			"type": "MeshStandardMaterial",
			"color": 5309701,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"envMapIntensity": 1,
			"blendColor": 0
		}],
	"object": {
		"uuid": "7f5afc38-b868-4604-a1f8-822c0b8328ae",
		"type": "Scene",
		"name": "body",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"up": [0,1,0],
		"children": [
			{
				"uuid": "20624a9e-afe4-4dd3-9291-2ac44b890cb1",
				"type": "Group",
				"name": "Group",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,-53.22819506013509,0,1],
				"up": [0,1,0]
			},
			{
				"uuid": "46bd1683-a3f9-49de-bf66-eb3d8d30e0a5",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [2.220446049250313e-16,1,0,0,-40,8.881784197001252e-15,0,0,0,0,1,0,0,0,0,1],
				"up": [0,1,0],
				"geometry": "cfea2422-3a9c-462c-8117-eeaf5b462dad",
				"material": "f44730f8-803e-4515-8416-81af6a46e18f"
			},
			{
				"uuid": "20632763-021f-4bf4-a604-4fe4eee36be7",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1.8793852415718169,0.6840402866513373,0,0,-13.680805733026746,37.58770483143634,0,0,0,0,2,0,12,17,0,1],
				"up": [0,1,0],
				"geometry": "5d3c04bb-ad20-42fe-8ad4-9b6082099d5f",
				"material": "342c7725-b793-43a6-8bf6-83e5aa420416"
			},
			{
				"uuid": "dee66088-a332-40c8-9e6a-102f51fe1bce",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1.8793852415718169,-0.6840402866513373,0,0,13.680805733026746,37.58770483143634,0,0,0,0,2,0,-12,17,0,1],
				"up": [0,1,0],
				"geometry": "5d3c04bb-ad20-42fe-8ad4-9b6082099d5f",
				"material": "342c7725-b793-43a6-8bf6-83e5aa420416"
			},
			{
				"uuid": "af17f826-098e-4189-81b0-64ce7d7f87f8",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [16,0,0,0,0,1.1102230246251565e-14,50,0,0,-16,2.220446049250313e-15,0,0,35,0,1],
				"up": [0,1,0],
				"geometry": "b517b94c-4bf3-49a2-8e23-be0953521d82",
				"material": "7ba298b5-bcce-4769-8eb5-205b301361aa"
			},
			]
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
