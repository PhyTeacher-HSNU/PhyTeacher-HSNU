'use strict';//嚴格模式
var fps = 60;//動畫fps
var log = console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 萬有引力：
	(1) 萬有引力 F = -Gmm/r^2 (建議gmm=10000)
	(2) 做出單一小球受萬有引力作用的運動，要有a,v箭頭。
	(3) 觀察小球初速 v0 = a*Math.sqrt(Gm/r)， a = 0~2 有何變化。

2. 克卜勒行星定律：
	(1) 讓小球畫出橢圓軌跡
	(2) 以 100 個 tick 為單位，前50個加畫出與太陽的連線，後50個不畫。
		也就是 0~50, 100~150, 200~250 要畫
		觀察克卜勒第二定律

3. 多行星：
	重新再做，做5個行星，半徑皆不同，繞太陽等速率，v0=Math.sqrt(Gm/r)
	觀察 克卜勒第三定律
[進階]
4. 提高計算精確度：
	tick 一次，計算多次以提高計算精確度。

*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var sun
// var planets=[];
var dt = 0.1;
var G=6.67;
var islinesun = false;
var ticknn = 0;
var nn = 8;
var dtnn=10;
var pp;
var earth;
var sun;
var mercurius;
var venus;
var mars;
var jupiter;
var saturn;
var loader;
var saturnring1;
var saturnring2;
var saturnring3;
var uranus;
var neptunus;
var sunmass;
var line1,line2,line3,line4,line5,line6,line7,line8;
//B.定義init
function init() {
    world2D.sl01.setLabel("dt");
	world2D.sl01.maximum=2;
	world2D.sl01.minimum=0.1;
	world2D.sl01.value=0.1;
	world2D.sl01.digitN=1;

	world2D.slCameraRR.maximum=2000;
	world2D.slCameraRR.value=550;
	world2D.slCameraRR.minimum=1;
	world2D.slCameraRR.digitN=1;


    world2D.ch01.setLabel("線條隱形");
	// world2D.ch01.checked=false;

	sun=new TEACHER.ObjPicSphere(109.25,pics.sun);
    scene.add(sun);
	sunmass=1000;
    
	earth=new TEACHER.ObjPicSphere(10,pics.earth);
	scene.add(earth);
	earth.position.x=225.5;
	earth.vx=0;
	earth.vy=0.55;
    earth.vz=-Math.sqrt(G*sunmass/225.5)*1.2;

	mercurius=new TEACHER.ObjPicSphere(3.83,pics.mercurius);
    scene.add(mercurius);
	mercurius.position.x=180.26;
	mercurius.vx=0;
	mercurius.vy=0.3;
	mercurius.vz=-Math.sqrt(G*sunmass/180.26)*1.18;

	venus=new TEACHER.ObjPicSphere(9.5,pics.venus);
	scene.add(venus);
	venus.position.x=200.3996;
	venus.vx=0;
	venus.vy=0.4;
	venus.vz=-Math.sqrt(G*sunmass/200.3996)*1.19;

    mars=new TEACHER.ObjPicSphere(5.32,pics.mars);
	scene.add(mars);
	mars.position.x=250.5;
	mars.vx=0;
	mars.vy=0.5;
	mars.vz=-Math.sqrt(G*sunmass/250.5)*1.21;

	jupiter=new TEACHER.ObjPicSphere(12.97,pics.jupiter);
	scene.add(jupiter);
	jupiter.position.x=270;
	jupiter.vx=0;
	jupiter.vy=0.55;
	jupiter.vz=-Math.sqrt(G*sunmass/270)*1.22;

	saturn=new TEACHER.ObjPicSphere(10.14,pics.saturn);
	scene.add(saturn);
	saturn.position.x=300;
	saturn.vx=0;
	saturn.vy=0.6;
	saturn.vz=-Math.sqrt(G*sunmass/300)*1.23;

	loader=new THREE.ObjectLoader();
    saturnring1=loader.parse(saturnringdis);
    scene.add(saturnring1);
    
	saturnring2=loader.parse(saturnringdis1);
	scene.add(saturnring2);

	saturnring3=loader.parse(saturnringdis2);
	scene.add(saturnring3);

	uranus=new TEACHER.ObjSphere(10.98,0x46A3FF);
	scene.add(uranus);
    uranus.position.x=350;
	uranus.vx=0;
	uranus.vy=0.7;
    uranus.vz=-Math.sqrt(G*sunmass/350)*1.24;
	
	neptunus=new TEACHER.ObjSphere(10.87,0x2828FF);
	scene.add(neptunus);
	neptunus.position.x=400;
	neptunus.vx=0;
	neptunus.vy=0.75;
	neptunus.vz=-Math.sqrt(G*sunmass/400)*1.25;

    // planets.push[mercurius];
	// planets.push[venus];
	// planets.push[earth];
	// planets.push[mars];
	// planets.push[jupiter];
	// planets.push[saturn];
	// planets.push[uranus];
	// planets.push[neptunus];
    line1=new TEACHER.Line(0xFFFFFF);
	line2=new TEACHER.Line(0xFFFFFF);
	line3=new TEACHER.Line(0xFFFFFF);
	line4=new TEACHER.Line(0xFFFFFF);
	line5=new TEACHER.Line(0xFFFFFF);
	line6=new TEACHER.Line(0xFFFFFF);
	line7=new TEACHER.Line(0xFFFFFF);
	line8=new TEACHER.Line(0xFFFFFF);
	line1.addPoint(mercurius.position.x,mercurius.position.y,mercurius.position.z);
	line2.addPoint(venus.position.x,venus.position.y,venus.position.z);
	line3.addPoint(earth.position.x,earth.position.y,earth.position.z);
	line4.addPoint(mars.position.x,mars.position.y,mars.position.z);
	line5.addPoint(jupiter.position.x,jupiter.position.y,jupiter.position.z);
	line6.addPoint(saturn.position.x,saturn.position.y,saturn.position.z);
	line7.addPoint(uranus.position.x,uranus.position.y,uranus.position.z);
	line8.addPoint(neptunus.position.x,neptunus.position.y,neptunus.position.z);
	scene.add(line1).add(line2).add(line3).add(line4).add(line5).add(line6).add(line7).add(line8);



	pp=new TEACHER.ObjTextPlane(1500,20,"1606陳柏愷","_z",0xffffff);
    pp.position.z=-150;
    pp.position.y=20;
    scene.add(pp);

	// for(var i=0;i<8;i++){
	// 	var line=new TEACHER.Line(0x000000);
	// 	lines.push(line);
	// 	scene.add(line);
	// }
	
	
	
	
	world2D.btn01.visible=false;
	world2D.btn02.visible=false;
	world2D.btnDown.visible=false;
	world2D.btnRight.visible=false;
	world2D.btnLeft.visible=false;
	world2D.btnUp.visible=false;
	world2D.sl02.visible=false;
	world2D.sl03.visible=false;
	world2D.ch02.visible=false;
	ground.visible = false;
	skyBox.visible = false;

	setInterval(tick, 1000 / fps);
}

//C.定義tick                                                                                                                       
function tick() {
    
	        var rr1=Math.sqrt(Math.pow(mercurius.position.x,2)+Math.pow(mercurius.position.y,2)+Math.pow(mercurius.position.z,2));
			mercurius.ax=-G*sunmass*mercurius.position.x/Math.pow(rr1,3);
			mercurius.ay=-G*sunmass*mercurius.position.y/Math.pow(rr1,3);
			mercurius.az=-G*sunmass*mercurius.position.z/Math.pow(rr1,3);
			mercurius.vx+=mercurius.ax*dt;
			mercurius.vy+=mercurius.ay*dt;
			mercurius.vz+=mercurius.az*dt;
			mercurius.position.x+=mercurius.vx*dt;
			mercurius.position.y+=mercurius.vy*dt;
			mercurius.position.z+=mercurius.vz*dt;
			

			var rr6=Math.sqrt(Math.pow(saturn.position.x,2)+Math.pow(saturn.position.y,2)+Math.pow(saturn.position.z,2));
		    saturn.ax=-G*sunmass*saturn.position.x/Math.pow(rr6,3);
			saturn.ay=-G*sunmass*saturn.position.y/Math.pow(rr6,3);
			saturn.az=-G*sunmass*saturn.position.z/Math.pow(rr6,3);
			saturn.vx+=saturn.ax*dt;
			saturn.vy+=saturn.ay*dt;
			saturn.vz+=saturn.az*dt;
			saturn.position.x+=saturn.vx*dt;
			saturn.position.y+=saturn.vy*dt;
			saturn.position.z+=saturn.vz*dt;

			var rr7=Math.sqrt(Math.pow(uranus.position.x,2)+Math.pow(uranus.position.y,2)+Math.pow(uranus.position.z,2));
		    uranus.ax=-G*sunmass*uranus.position.x/Math.pow(rr7,3);
			uranus.ay=-G*sunmass*uranus.position.y/Math.pow(rr7,3);
			uranus.az=-G*sunmass*uranus.position.z/Math.pow(rr7,3);
			uranus.vx+=uranus.ax*dt;
			uranus.vy+=uranus.ay*dt;
			uranus.vz+=uranus.az*dt;
			uranus.position.x+=uranus.vx*dt;
			uranus.position.y+=uranus.vy*dt;
			uranus.position.z+=uranus.vz*dt;

			var rr8=Math.sqrt(Math.pow(neptunus.position.x,2)+Math.pow(neptunus.position.y,2)+Math.pow(neptunus.position.z,2));
		    neptunus.ax=-G*sunmass*neptunus.position.x/Math.pow(rr8,3);
			neptunus.ay=-G*sunmass*neptunus.position.y/Math.pow(rr8,3);
			neptunus.az=-G*sunmass*neptunus.position.z/Math.pow(rr8,3);
			neptunus.vx+=neptunus.ax*dt;
			neptunus.vy+=neptunus.ay*dt;
			neptunus.vz+=neptunus.az*dt;
			neptunus.position.x+=neptunus.vx*dt;
			neptunus.position.y+=neptunus.vy*dt;
			neptunus.position.z+=neptunus.vz*dt;


            var rr5=Math.sqrt(Math.pow(jupiter.position.x,2)+Math.pow(jupiter.position.y,2)+Math.pow(jupiter.position.z,2));
			jupiter.ax=-G*sunmass*jupiter.position.x/Math.pow(rr5,3);
			jupiter.ay=-G*sunmass*jupiter.position.y/Math.pow(rr5,3);
			jupiter.az=-G*sunmass*jupiter.position.z/Math.pow(rr5,3);
			jupiter.vx+=jupiter.ax*dt;
			jupiter.vy+=jupiter.ay*dt;
			jupiter.vz+=jupiter.az*dt;
			jupiter.position.x+=jupiter.vx*dt;
			jupiter.position.y+=jupiter.vy*dt;
			jupiter.position.z+=jupiter.vz*dt;

			var rr3=Math.sqrt(Math.pow(earth.position.x,2)+Math.pow(earth.position.y,2)+Math.pow(earth.position.z,2));
			earth.ax=-G*sunmass*earth.position.x/Math.pow(rr3,3);
			earth.ay=-G*sunmass*earth.position.y/Math.pow(rr3,3);
			earth.az=-G*sunmass*earth.position.z/Math.pow(rr3,3);
			earth.vx+=earth.ax*dt;
			earth.vy+=earth.ay*dt;
			earth.vz+=earth.az*dt;
			earth.position.x+=earth.vx*dt;
			earth.position.y+=earth.vy*dt;
			earth.position.z+=earth.vz*dt;

			var rr2=Math.sqrt(Math.pow(venus.position.x,2)+Math.pow(venus.position.y,2)+Math.pow(venus.position.z,2));
		    venus.ax=-G*sunmass*venus.position.x/Math.pow(rr2,3);
			venus.ay=-G*sunmass*venus.position.y/Math.pow(rr2,3);
			venus.az=-G*sunmass*venus.position.z/Math.pow(rr2,3);
			venus.vx+=venus.ax*dt;
			venus.vy+=venus.ay*dt;
			venus.vz+=venus.az*dt;
			venus.position.x+=venus.vx*dt;
			venus.position.y+=venus.vy*dt;
			venus.position.z+=venus.vz*dt;

			var rr4=Math.sqrt(Math.pow(mars.position.x,2)+Math.pow(mars.position.y,2)+Math.pow(mars.position.z,2));
		    mars.ax=-G*sunmass*mars.position.x/Math.pow(rr4,3);
			mars.ay=-G*sunmass*mars.position.y/Math.pow(rr4,3);
			mars.az=-G*sunmass*mars.position.z/Math.pow(rr4,3);
			mars.vx+=mars.ax*dt;
			mars.vy+=mars.ay*dt;
			mars.vz+=mars.az*dt;
			mars.position.x+=mars.vx*dt;
			mars.position.y+=mars.vy*dt;
			mars.position.z+=mars.vz*dt;


			

			saturnring1.position.x=saturn.position.x;
			saturnring1.position.y=saturn.position.y;
			saturnring1.position.z=saturn.position.z;

			saturnring2.position.x=saturn.position.x;
			saturnring2.position.y=saturn.position.y;
			saturnring2.position.z=saturn.position.z;

			saturnring3.position.x=saturn.position.x;
			saturnring3.position.y=saturn.position.y;
			saturnring3.position.z=saturn.position.z;

			dt=world2D.sl01.value;

			

			line1.addPoint(mercurius.position.x,mercurius.position.y,mercurius.position.z);
			line2.addPoint(venus.position.x,venus.position.y,venus.position.z);
			line3.addPoint(earth.position.x,earth.position.y,earth.position.z);
			line4.addPoint(mars.position.x,mars.position.y,mars.position.z);
			line5.addPoint(jupiter.position.x,jupiter.position.y,jupiter.position.z);
			line6.addPoint(saturn.position.x,saturn.position.y,saturn.position.z);
			line7.addPoint(uranus.position.x,uranus.position.y,uranus.position.z);
			line8.addPoint(neptunus.position.x,neptunus.position.y,neptunus.position.z);
		
			// for(var i=0;i<8;i++){		
			// 	var planet=planets[i]; 
			// 	var line=lines[i];
			// 	line.addPoint(planet.position.x,planet.position.y,planet.position.z);
			// 	scene.add(line);
			// }
			if (world2D.ch01.checked){
				line1.visible=line2.visible=line3.visible=line4.visible=line5.visible=line6.visible=line7.visible=line8.visible=false;
			}else{
				line1.visible=line2.visible=line3.visible=line4.visible=line5.visible=line6.visible=line7.visible=line8.visible=true;

			}


			
		
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}






//resize
MyJS.myResize();
var saturnringdis1={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "65daaefe-ed78-440f-a09a-64e19952b2a2",
			"type": "TorusGeometry",
			"radius": 14.48,
			"tube": 1,
			"radialSegments": 10,
			"tubularSegments": 90,
			"arc": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "4398f760-dfef-4cd2-aa2c-e6c7c5c596f6",
			"type": "MeshStandardMaterial",
			"color": 0,
			"roughness": 1,
			"metalness": 0,
			"emissive": 8484959,
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
		"uuid": "5d4d7a9e-b0ef-4402-8772-68cd23e0ccde",
		"type": "Mesh",
		"name": "Torus",
		"layers": 1,
		"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,0,0,0,1],
		"geometry": "65daaefe-ed78-440f-a09a-64e19952b2a2",
		"material": "4398f760-dfef-4cd2-aa2c-e6c7c5c596f6"
	}
};

var saturnringdis={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "e2d9c8a5-225b-4e4d-98e1-2ef7e848dace",
			"type": "TorusGeometry",
			"radius": 10,
			"tube": 0.4,
			"radialSegments": 2,
			"tubularSegments": 48,
			"arc": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "4398f760-dfef-4cd2-aa2c-e6c7c5c596f6",
			"type": "MeshStandardMaterial",
			"color": 0,
			"roughness": 1,
			"metalness": 0,
			"emissive": 8484959,
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
		"uuid": "5d4d7a9e-b0ef-4402-8772-68cd23e0ccde",
		"type": "Mesh",
		"name": "Torus",
		"layers": 1,
		"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,0,0,0,1],
		"geometry": "e2d9c8a5-225b-4e4d-98e1-2ef7e848dace",
		"material": "4398f760-dfef-4cd2-aa2c-e6c7c5c596f6"
	}
};
var saturnringdis2={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "f13a393b-e27f-4b68-9de9-3abc86bb6f17",
			"type": "TorusGeometry",
			"radius": 12,
			"tube": 1,
			"radialSegments": 10,
			"tubularSegments": 90,
			"arc": 6.283185307179586
		}],
	"materials": [
		{
			"uuid": "4398f760-dfef-4cd2-aa2c-e6c7c5c596f6",
			"type": "MeshStandardMaterial",
			"color": 0,
			"roughness": 1,
			"metalness": 0,
			"emissive": 8484959,
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
		"uuid": "5d4d7a9e-b0ef-4402-8772-68cd23e0ccde",
		"type": "Mesh",
		"name": "Torus",
		"layers": 1,
		"matrix": [1,0,0,0,0,2.220446049250313e-16,1,0,0,-1,2.220446049250313e-16,0,0,-0.4930021195605043,0,1],
		"geometry": "f13a393b-e27f-4b68-9de9-3abc86bb6f17",
		"material": "4398f760-dfef-4cd2-aa2c-e6c7c5c596f6"
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
var TEACHER = {};
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
TEACHER.ObjPlane = function (_w, _h, _color, _dir, _side) {
	let t = this;
	t.mat = new TEACHER.MSMat(_color, _side);
	t.geo = new THREE.PlaneGeometry(_w || 10, _h || 10, 1, 1);
	t.mesh = new THREE.Mesh(t.geo, t.mat);
	if (_dir === "x") {
		t.mesh.rotation.y = 0.5 * Math.PI;
	} else if (_dir === "y") {
		t.mesh.rotation.x = -0.5 * Math.PI;
	}
	THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjCylinder = function (_r, _h, _color, _openEnd, _dir, _side) {
	let t = this;
	t.mat = new TEACHER.MSMat(_color, _side);
	t.geo = new THREE.CylinderGeometry(_r || 10, _r || 10, _h || 10, 32, 2, _openEnd);
	t.mesh = new THREE.Mesh(t.geo, t.mat);
	if (_dir === "x") {
		t.mesh.rotation.z = -0.5 * Math.PI;
	} else if (_dir === "z") {
		t.mesh.rotation.x = 0.5 * Math.PI;
	}
	THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjSphere = function (_r, _color, _side) {
	let t = this;
	t.mat = new TEACHER.MSMat(_color, _side);
	t.geo = new THREE.SphereGeometry(_r || 10, 32, 16);
	t.mesh = new THREE.Mesh(t.geo, t.mat);
	THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjBox = function (_w, _h, _d, _color, _side) {
	let t = this;
	t.mat = new TEACHER.MSMat(_color, _side);
	t.geo = new THREE.BoxGeometry(_w || 10, _h || 10, _d || 10);
	t.mesh = new THREE.Mesh(t.geo, t.mat);
	THREE.Object3D.call(this, t.geo, t.mat);
	t.add(t.mesh);
}
TEACHER.ObjBox.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjBox.prototype.constructor = TEACHER.ObjBox;
//---------------------------------------------
//老師的MSMat，繼承自 THREE.MeshStandardMaterial
TEACHER.MSMat = function (_color, _side) {
	THREE.MeshStandardMaterial.call(this, { color: _color || 0xFF00FF, roughness: 0.4, side: _side || 0 });
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
TEACHER.ObjPicPlane = function (_w, _h, _pic, _dir, _side) {
	let t = this;
	let texture = new THREE.TextureLoader().load(_pic);
	t.mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: _side || 0 });
	t.geo = new THREE.PlaneGeometry(_w, _h, 1, 1);
	t.mesh = new THREE.Mesh(t.geo, t.mat);
	if (_dir === "x") {
		t.mesh.rotation.y = 0.5 * Math.PI;
	} else if (_dir === "y") {
		t.mesh.rotation.x = -0.5 * Math.PI;
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
TEACHER.ObjPicCylinder = function (_r, _h, _pic, _openEnd, _dir, _side) {
	let t = this;
	let texture = new THREE.TextureLoader().load(_pic);
	t.mat = new THREE.MeshBasicMaterial({ map: texture, side: _side || 0 });
	t.geo = new THREE.CylinderGeometry(_r || 10, _r || 10, _h || 10, 32, 4, _openEnd);
	t.mesh = new THREE.Mesh(t.geo, t.mat);
	if (_dir === "x") {
		t.mesh.rotation.y = 0.5 * Math.PI;
		t.mesh.rotation.z = -0.5 * Math.PI;
	} else if (_dir === "z") {
		t.mesh.rotation.y = 0.5 * Math.PI;
		t.mesh.rotation.x = 0.5 * Math.PI;
	} else if (_dir === "y") {
		t.mesh.rotation.y = 0.5 * Math.PI;
	}
	THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjPicSphere = function (_r, _pic, _side) {
	let t = this;
	let texture = new THREE.TextureLoader().load(_pic);
	t.mat = new THREE.MeshBasicMaterial({ map: texture, side: _side || 0 });
	t.geo = new THREE.SphereGeometry(_r || 10, 32, 16);
	t.mesh = new THREE.Mesh(t.geo, t.mat);
	THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjArrow = function (_r, _color) {
	let ratioHead = 0.4;//頭佔全長
	let ratioBody = 0.5;//身寬佔全長
	let material = new THREE.MeshStandardMaterial({ color: _color || 0xFF00FF, roughness: 0.4 });
	let geometry = new THREE.ConeGeometry(_r || 10, 100 * ratioHead, 32);
	this.ArrowHead = new THREE.Mesh(geometry, material);
	this.ArrowHead.position.y = 100 * (1 - 0.5 * ratioHead);
	geometry = new THREE.CylinderGeometry((_r || 10) * ratioBody, (_r || 10) * ratioBody, 100 * (1 - ratioHead), 32, 2);
	this.ArrowBody = new THREE.Mesh(geometry, material);
	this.ArrowBody.position.y = 100 * 0.5 * (1 - ratioHead);
	THREE.Object3D.call(this);
	this.rotX = new THREE.Object3D();//in rotation.x for theta
	this.rotY = new THREE.Object3D();//out rotation.y for phi
	this.add(this.rotY);
	this.rotY.add(this.rotX);
	this.rotX.add(this.ArrowBody);
	this.rotX.add(this.ArrowHead);
}
TEACHER.ObjArrow.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjArrow.prototype.constructor = TEACHER.ObjArrow;
TEACHER.ObjArrow.prototype.setArrow = function (_x, _y, _z) {
	let len2 = _x * _x + _y * _y + _z * _z;
	let len = Math.sqrt(len2);
	if (len2 > 0) {
		this.rotX.visible = true;
		this.rotX.scale.y = len / 100;
	} else {
		this.rotX.visible = false;
	}
	this.rotX.rotation.x = Math.acos(_y / len);
	this.rotY.rotation.y = Math.atan2(_x, _z);
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
TEACHER.ObjSpring = function (_len, _rB, _rS, _nn, _color) {
	//curve
	let dd = _len || 20;
	this.L0 = dd;
	let arr = [];
	let nn = _nn || 5;
	let rB = _rB || 5;
	let rS = _rS || 0.5;
	arr.push(new THREE.Vector3(0, 0, 0));
	arr.push(new THREE.Vector3(0, dd * 0.05, 0));
	for (var i = 0; i <= nn * 16; i++) {
		arr.push(new THREE.Vector3(rB * Math.cos(i * 2 * Math.PI / 16), dd * (0.05 + 0.9 * i / nn / 16), rB * Math.sin(i * 2 * Math.PI / 16)));
	}
	arr.push(new THREE.Vector3(0, dd * 0.95, 0));
	arr.push(new THREE.Vector3(0, dd, 0));

	let myClosedSpline = new THREE.CatmullRomCurve3(arr);
	let material = new THREE.MeshStandardMaterial({ color: _color || 0xFF00FF, roughness: 0.4 });
	let geometry = new THREE.TubeGeometry(myClosedSpline, 500, rS, 12);
	this.mesh = new THREE.Mesh(geometry, material);
	THREE.Object3D.call(this);
	this.rotX = new THREE.Object3D();//in rotation.x for theta
	this.rotY = new THREE.Object3D();//out rotation.y for phi
	this.add(this.rotY);
	this.rotY.add(this.rotX);
	this.rotX.add(this.mesh);
}
TEACHER.ObjSpring.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjSpring.prototype.constructor = TEACHER.ObjSpring;
TEACHER.ObjSpring.prototype.setSpring = function (_x, _y, _z) {
	let len2 = _x * _x + _y * _y + _z * _z;
	let len = Math.sqrt(len2);
	if (len2 > 0) {
		this.rotX.visible = true;
		this.rotX.scale.y = len / this.L0;
	} else {
		this.rotX.visible = false;
	}
	this.rotX.rotation.x = Math.acos(_y / len);
	this.rotY.rotation.y = Math.atan2(_x, _z);
}
//粒子系統
/**
 * 老師幫你寫的粒子系統，繼承自 THREE.Points
 * @constructor TEACHER.Points
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {number} _size 半徑，預設1
 * @param {number} _nnMax 最大點數，預設10000 
 */
TEACHER.Points = function (_color, _size, _nnMax) {
	let tp = this;
	let ss = _size || 1;
	let color = _color || 0xFF00FF;
	let tColor = new THREE.Color(color);
	tp.nnMax = _nnMax || 10000;
	tp.nnNow = 0;
	tp.geometry = new THREE.BufferGeometry();
	tp.positions = [];
	tp.geometry.setAttribute('position', new THREE.Float32BufferAttribute(tp.positions, 3));
	tp.geometry.computeBoundingSphere();
	let material = new THREE.PointsMaterial({
		size: ss,
		map: tp.createCanvasMaterial('#' + tColor.getHexString(), 64),
		transparent: true,
		depthWrite: false
	});
	THREE.Points.call(this, tp.geometry, material);
}
TEACHER.Points.prototype = Object.create(THREE.Points.prototype);
TEACHER.Points.prototype.constructor = TEACHER.Points;
TEACHER.Points.prototype.createCanvasMaterial = function (color, size) {
	var matCanvas = document.createElement('canvas');
	matCanvas.width = matCanvas.height = size;
	var matContext = matCanvas.getContext('2d');
	matContext.imageSmoothingEnabled = false;
	// create exture object from canvas.
	var texture = new THREE.Texture(matCanvas);
	// Draw a circle
	var center = size / 2;
	matContext.beginPath();
	matContext.arc(center, center, size / 2 - 3, 0, 2 * Math.PI, false);
	matContext.closePath();
	matContext.fillStyle = color;
	matContext.fill();
	// need to set needsUpdate
	texture.needsUpdate = true;
	// return a texture made from the canvas
	return texture;
}
TEACHER.Points.prototype.addPoint = function (_x, _y, _z) {
	let tp = this;
	if (tp.nnNow < tp.nnMax) {
		tp.nnNow++;
	} else {
		log('TEACHER.Points 到達最大點數');
		tp.positions.shift();
		tp.positions.shift();
		tp.positions.shift();
	}
	tp.positions.push(_x, _y, _z);
	tp.geometry.setAttribute('position', new THREE.Float32BufferAttribute(tp.positions, 3));
	tp.geometry.computeBoundingSphere();
	tp.geometry.attributes.position.needsUpdate = true;

}
TEACHER.Points.prototype.clear = function () {
	let tp = this;
	tp.positions = [];
	tp.geometry.setAttribute('position', new THREE.Float32BufferAttribute(tp.positions, 3));
	tp.geometry.computeBoundingSphere();
	tp.geometry.attributes.position.needsUpdate = true;
	tp.nnNow = 0;
}


//線條系統
/**
 * 老師幫你寫的線條系統，繼承自 THREE.Line
 * @constructor TEACHER.Line
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {number} _nnMax 最大點數，預設10000 
 */
TEACHER.Line = function (_color, _nnMax) {
	let ln = this;
	ln.nnMax = _nnMax || 10000;
	ln.nnNow = 0;
	let material = new THREE.MeshBasicMaterial({ color: _color || 0xFF00FF });
	ln.geometry = new THREE.BufferGeometry();
	ln.positions = [];

	ln.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ln.positions, 3));
	ln.geometry.computeBoundingSphere();
	ln.geometry.dynamic = true;

	THREE.Line.call(this, ln.geometry, material);
}
TEACHER.Line.prototype = Object.create(THREE.Line.prototype);
TEACHER.Line.prototype.constructor = TEACHER.Line;
TEACHER.Line.prototype.addPoint = function (_x, _y, _z) {
	let ln = this;
	if (ln.nnNow < ln.nnMax) {
		ln.nnNow++;
	} else {
		log('TEACHER.Line 到達最大點數');
		ln.positions.shift();
		ln.positions.shift();
		ln.positions.shift();
	}
	ln.positions.push(_x, _y, _z);
	ln.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ln.positions, 3));
	ln.geometry.computeBoundingSphere();
	ln.geometry.attributes.position.needsUpdate = true;

}
TEACHER.Line.prototype.clear = function () {
	let ln = this;
	ln.positions = [];
	ln.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ln.positions, 3));
	ln.geometry.computeBoundingSphere();
	ln.geometry.attributes.position.needsUpdate = true;
	ln.nnNow = 0;

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
TEACHER.ObjTextPlane = function (_w, _h, _text, _dir, _textColor, _bgColor) {
	let t = this;
	//texture
	let ratio = Math.round(Math.log2(_w / _h)); log(ratio)
	let canvas = $("<canvas>").attr('width', String(128 * Math.pow(2, ratio))).attr('height', '128');
	t.stage = new createjs.Stage(canvas[0]);
	let container = new createjs.Container();
	if (_bgColor) {
		let rectShape = new createjs.Shape();
		let bgColor = new THREE.Color(_bgColor);
		rectShape.graphics.c().f("#" + bgColor.getHexString()).dr(0, 0, 128 * Math.pow(2, ratio), 128);
		container.addChild(rectShape);
	}
	t.ctext = new createjs.Text();
	let textColor = new THREE.Color(_textColor || 0xffffff);
	t.ctext.color = "#" + textColor.getHexString();
	t.ctext.font = '96px Arial';
	t.ctext.text = _text || "";

	t.ctext.textAlign = 'center';
	t.ctext.textBaseline = 'middle';
	t.ctext.x = 128 * Math.pow(2, ratio) / 2;
	t.ctext.y = 128 / 2;

	container.addChild(t.ctext);
	t.stage.addChild(container);
	t.stage.update();

	//plane
	t.texture = new THREE.Texture(canvas[0]);
	var material = new THREE.MeshBasicMaterial({ map: t.texture, transparent: true });
	var geometry = new THREE.PlaneGeometry(_w || 10, _h || 10, 1, 1);
	t.texture.needsUpdate = true;
	t.plane1 = new THREE.Mesh(geometry, material);
	t.plane2 = new THREE.Mesh(geometry, material);
	t.plane2.rotation.y = Math.PI;
	let objCon = new THREE.Object3D();
	objCon.add(t.plane1).add(t.plane2);
	if (_dir === "x") {
		objCon.rotation.y = 0.5 * Math.PI;
	} else if (_dir === "y") {
		objCon.rotation.x = -0.5 * Math.PI;
	}
	THREE.Object3D.call(this);
	t.add(objCon);
}
TEACHER.ObjTextPlane.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjTextPlane.prototype.constructor = TEACHER.ObjTextPlane;
TEACHER.ObjTextPlane.prototype.setText = function (_text) {
	let t = this;
	t.ctext.text = _text;
	t.stage.update();
	t.texture.needsUpdate = true;
}



//--老師幫你產生天空盒，地板--//
//--老師幫你產生天空盒，地板--//
//--老師幫你產生天空盒，地板--//
//skyBox天空盒
var skyBox = new THREE.Object3D();
skyBox.wallU = new TEACHER.ObjPicPlane(10000, 10000, pics.wallU, 'y', 1);
skyBox.wallD = new TEACHER.ObjPicPlane(10000, 10000, pics.wallD, 'y', 0);
skyBox.wallS = new TEACHER.ObjPicCylinder(5000, 10000, pics.wallSide, true, 'y', 1);
skyBox.wallU.position.y = 5000;
skyBox.wallD.position.y = -5000;
skyBox.add(skyBox.wallU).add(skyBox.wallD).add(skyBox.wallS);
world3D.scene.add(skyBox);

//ground地板
var ground = new TEACHER.ObjPicPlane(100, 100, pics.ground, 'y');
world3D.scene.add(ground);

var logo = new TEACHER.ObjPicPlane(100, 100 / 8, pics.logo, 'z', 2);
logo.position.z = -50;
logo.position.y = 100 / 8 / 2;
world3D.scene.add(logo);


//取得滑鼠3D位置
/**
 * @function getMouse3D 取得滑鼠3D位置
 * @param {string} _plane 平面名稱 "x","y,'z"，預設為"y"
 * @param {number} _c 截距，預設為0 
 */
function getMouse3D(_plane, _c) {

	let p = _plane || "y";
	let vecN;
	let vecM = new THREE.Vector3();//mouse3D to return
	if (p === "x") { vecN = new THREE.Vector3(1, 0, 0); }
	else if (p === "y") { vecN = new THREE.Vector3(0, 1, 0); }
	else if (p === "z") { vecN = new THREE.Vector3(0, 0, 1); }
	else { log('錯誤!!'); }
	let mouse = new THREE.Vector2();
	mouse.x = (world2D.stage.mouseX / 1600) * 2 - 1;
	mouse.y = - (world2D.stage.mouseY / 900) * 2 + 1;
	world3D.raycaster.setFromCamera(mouse, world3D.camera);
	world3D.raycaster.ray.intersectPlane(new THREE.Plane(vecN), vecM);

	return vecM;
}



//D.執行init，程式開始
init();
