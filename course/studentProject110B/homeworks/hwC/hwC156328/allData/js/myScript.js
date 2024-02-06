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
var bodyArray = [];
var headArray = [];
var rightArray = [];
var leftArray = [];
var nn = 40;
var dt = 0.1;
var head;
var body;
var leftleg;
var rightleg;
var bb;
var ap;
var Name;
var tip;
var ballArray=[];
var bmp3 = new Audio("allData/mp3/bang.mp3");
var paper;

//B.定義init
function init(){

	loader = new THREE.ObjectLoader();

	world2D.slCameraRR.value = 130;	

	
	for(var i = 0; i<nn; i++){
		
		bb = new TEACHER.ObjSphere(1,0xff0000);
		bb.position.y = 10;
		bb.position.x=-45+(i%10)*10;
		bb.position.z=-20+Math.floor(i/10)*10;
		scene.add(bb);
		ballArray.push(bb);
		bb.vx=5*(Math.random()-0.5);
		bb.vz=5*(Math.random()-0.5);	
		bb.vy=0;
		bb.ax=0;
		bb.ay=0;
		bb.az=0;

		head = loader.parse(zombie_1);
		scene.add(head);
		head.scale.x = head.scale.y = head.scale.z *= 4; 
		head.position.y = 3;
		
	
		body = loader.parse(zombie_2);
		scene.add(body);
		body.scale.x = body.scale.y = body.scale.z *= 4;
		body.position.y = 3;
		

		rightleg = loader.parse(zombie_3);
		scene.add(rightleg);
		rightleg.scale.x *= 4;
		rightleg.scale.y *= 4;
		rightleg.scale.z *= 4;
		rightleg.position.y = 3;
		

		leftleg = loader.parse(zombie_4);
		scene.add(leftleg);
		leftleg.scale.x *= 4;
		leftleg.scale.y *= 4;
		leftleg.scale.z *= 4;
		leftleg.position.y = 3;
		leftleg.rotation.x = 0.01;
		
		
		headArray.push(head);
		bodyArray.push(body);
		rightArray.push(rightleg);
		leftArray.push(leftleg);
	}
	ap =  new TEACHER.ObjSphere(0.3,0xff0000);
	scene.add(ap);
	ap.visible = false;

	paper = new TEACHER.ObjBox(6,9,1,0xffffff);
	paper.rotation.x = 0.5*Math.PI;
	paper.position.x = -45;
	paper.position.z = 60;
	scene.add(paper);
	paper.visible = false;

	Name = new TEACHER.ObjTextPlane(200,20,"156328 程暄雯","z",0x0ffffff)
	scene.add(Name);
	Name.position.x=-70;
	Name.position.y=30;
	Name.position.z=-100;
	tip = new TEACHER.ObjTextPlane(425,20,"可再點按一次退出瞄準模式，且推薦開啟音量","z",0x0ffffff)
	scene.add(tip);
	tip.position.x=-20;
	tip.position.y=10;	tip.position.z=-250;

	world2D.btn01.setLabel("瞄準");
	world2D.btn02.setLabel("餵食");
	world2D.btn02.on("click",feed);
	world2D.btn01.on("click",count);
	world2D.btnRight.on("click",clickBtn);
	world2D.btnLeft.on("click",clickBtn);
	world2D.btnUp.visible = false;
	world2D.btnDown.visible = false;
	world2D.btn03.setLabel("射擊");
	world2D.btn03.on("click",bang);
	world2D.sl01.visible = 0;
	world2D.sl02.visible = 0;
	world2D.sl03.visible = 0;
	world2D.ch01.visible = 0;
	world2D.ch02.visible = 0;
	
	world2D.btn04.setLabel("閱讀");
	world2D.btn04.on("click",count2);
	world2D.btn04.visible = 0;

	var skyBox_read=new THREE.Object3D();
	skyBox_read.wallU=new TEACHER.ObjPicPlane(10000,10000,pics.background,'y',1);
	skyBox_read.wallD=new TEACHER.ObjPicPlane(10000,10000,pics.background,'y',0);
	skyBox_read.wallS=new TEACHER.ObjPicPlane(10320*1.5,14570*1.5,pics.dia,true,'y',0);
	skyBox_read.wallU.position.y=5000;
	skyBox_read.wallD.position.y=-5000;
	skyBox_read.wallS.position.z=-20000;
	skyBox_read.add(skyBox_read.wallU).add(skyBox_read.wallD).add(skyBox_read.wallS)
	world3D.scene.add(skyBox_read);

	


	


	setInterval(tick,1000/fps);
}



//C.定義tick                                                                                                                       
function tick(){

	for(var i = 0 ; i<nn ; i++){
		var head = headArray[i];
		var body = bodyArray[i];
		var rightleg = rightArray[i];
		var leftleg = leftArray[i];
		var bb = ballArray[i];

		bb.position.x+=bb.vx*dt;
		bb.position.z+=bb.vz*dt;

		head.position.x = bb.position.x
		head.position.z = bb.position.z;
		head.position.y = bb.position.y-7;

		body.position.x = bb.position.x
		body.position.z = bb.position.z;
		body.position.y = bb.position.y-7;
		
		rightleg.position.x = bb.position.x -1;
		rightleg.position.z = bb.position.z;
		rightleg.position.y = bb.position.y-7;


		leftleg.position.x = bb.position.x +1;
		leftleg.position.z = bb.position.z;
		leftleg.position.y = bb.position.y-7;


		var htheta = Math.atan2(head.position.x, head.position.z);
		var btheta = Math.atan2(body.position.x, body.position.z);
		leftleg.rotation.y = rightleg.rotation.y = body.rotation.y = btheta;
		head.rotation.y = htheta;		

		
			
		
		//反彈
		if(bb.position.x>50 && bb.vx>0){
			bb.vx*=-1;
		}else if(bb.position.x<-50 && bb.vx<0){
			bb.vx*=-1;
		}
		if(bb.position.z>50 && bb.vz>0){
			bb.vz*=-1;
		}else if(bb.position.z<-50 && bb.vz<0){
			bb.vz*=-1;
		}


	}
	
	for(var i =0; i<nn-1; i++){
		for(var j=i+1 ; j<nn; j++){
			
			var ball1=ballArray[i];
			var ball2=ballArray[j];

			collision(ball1,ball2,5);
		}
	}

	

	
	

	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
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
		
	}

	return isCollision;
}

function feed(){
	for(var i = 0 ; i<nn ; i++){
		var head = headArray[i];
		var body = bodyArray[i];
		var rightleg = rightArray[i];
		var leftleg = leftArray[i];
		var bb = ballArray[i];

		head.scale.x=head.scale.y=head.scale.z*=1.2;
		body.scale.x=body.scale.y=body.scale.z*=1.2;
		rightleg.scale.x *= 1.2;
		rightleg.scale.y *= 1.2;
		rightleg.scale.z *= 1.2;
		leftleg.scale.x *= 1.2;
		leftleg.scale.y *= 1.2;
		leftleg.scale.z *= 1.2;
		bb.position.y+=1;
		
	}

}


function aim(){
	if(i%2 != 0){
		ap.position.x=0;
		ap.position.y=18;
		ap.position.z=60;
		world3D.cameraTheta = 1.3;
		world2D.slCameraRR.value = 85;
		world3D.cameraPhi = 0;
		ap.visible = true;
	}else if(i%2 == 0){
		world3D.cameraTheta = 1.3;
		world2D.slCameraRR.value = 130;
		world3D.cameraPhi = 0;
		ap.visible = false;
		if(k>1){
			world2D.btn04.visible = 1;
			paper.visible = 1
		}
	}
	

		
}

var i = 0;
function count(){
	i++;
	aim();
}

function clickBtn(e){
	var str = e.target.parent.name;
	if(str == "btnRight"){
		if(world3D.cameraPhi >= 0.7){
			world3D.cameraPhi += 0;
		}else{
			world3D.cameraPhi += 0.1;
			ap.position.x+=5.5;
			if(world3D.cameraPhi > -0.7 && world3D.cameraPhi < -0){
				ap.position.z+=2;
			}else if(world3D.cameraPhi < 0.7 && world3D.cameraPhi > -0){
				ap.position.z-=2;
			}
		}
	}else if(str == "btnLeft"){
		if(world3D.cameraPhi <= -0.7){
			world3D.cameraPhi -= 0;
		}else{
			world3D.cameraPhi -= 0.1;
			ap.position.x-=5.5;
			if(world3D.cameraPhi > -0.7 && world3D.cameraPhi < -0){
				ap.position.z-=2;
			}else if(world3D.cameraPhi < 0.7 && world3D.cameraPhi > -0){
				ap.position.z+=2;
			}
		}
	}
}

var k = 1;
function bang(){
	bmp3.currentTime = 0;
	bmp3.play();
	k++;
	
}

var a = 0;
function count2(){
	a++;
	read();
}
function read(){
	

	if(a%2 != 0){
		skyBox.visible = false;
		logo.visible = false;
		ground.visible = false;
		paper.visible = false;
		ap.visible = false;
		Name.visible = false;
		tip.visible = false;
		for(var i = 0 ; i<nn ; i++){
			var head = headArray[i];
			var body = bodyArray[i];
			var rightleg = rightArray[i];
			var leftleg = leftArray[i];
			var bb = ballArray[i];

			head.visible = false;
			body.visible = false;
			rightleg.visible = false;
			leftleg.visible = false;
			bb.visible = false;
		}
		
	}else if(a%2 == 0){
		logo.visible = true;
		ground.visible = true;
		paper.visible = true;
		skyBox.visible = true;
		Name.visible = true;
		tip.visible = true;
		for(var i = 0 ; i<nn ; i++){
			var head = headArray[i];
			var body = bodyArray[i];
			var rightleg = rightArray[i];
			var leftleg = leftArray[i];
			var bb = ballArray[i];

			head.visible = true;
			body.visible = true;
			rightleg.visible = true;
			leftleg.visible = true;
			bb.visible = true;
		}
		
	}
}

//resize
MyJS.myResize();





var zombie_1={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "cff58eed-3406-4f3f-9889-6c3e7fee003e",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "7bd78ac1-0152-4f48-abcf-927c3e664a2b",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "33d3ae0a-282d-4108-99d9-5a8fff73c187",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "2f5e0849-0abb-4ef3-ae81-576d236f3016",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "96adbe70-0ada-4bc7-a143-5466d7bd634a",
			"type": "TorusKnotGeometry",
			"radius": 1,
			"tube": 0.4,
			"tubularSegments": 64,
			"radialSegments": 8,
			"p": 2,
			"q": 3
		},
		{
			"uuid": "27bb8f44-800b-4e41-8f1c-ee22b2910fba",
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
			"uuid": "a3af6bd2-cb9d-4e09-8a43-db3ea138c767",
			"type": "MeshStandardMaterial",
			"color": 859161,
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
			"uuid": "f2ad4eae-ca8b-4f60-b653-a675d3db81ff",
			"type": "MeshStandardMaterial",
			"color": 11908533,
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
			"uuid": "9fffa1d8-7687-49e4-b78f-67a705a784c1",
			"type": "MeshStandardMaterial",
			"color": 7998219,
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
			"uuid": "a08a7b37-1c6e-472f-a6ab-d8eb368fc85f",
			"type": "MeshStandardMaterial",
			"color": 3497787,
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
			"uuid": "ee5bb3db-327b-4d08-8a9e-8df65df475d1",
			"type": "MeshStandardMaterial",
			"color": 11949140,
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
			"uuid": "ef02ece0-0a48-485f-89a0-c1da20d7c215",
			"type": "MeshStandardMaterial",
			"color": 7939365,
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
		"uuid": "6c911b7b-c8d0-42a8-b01a-5dabb6c1d7d8",
		"type": "Group",
		"name": "Head",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "98ae3815-0cee-4774-b726-727a73cd2bb7",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1.345543193657424,0,0,0,0,1.352334108329968,0,0,0,0,1.324451435430625,0,0,3.461468203439074,0,1],
				"geometry": "cff58eed-3406-4f3f-9889-6c3e7fee003e",
				"material": "a3af6bd2-cb9d-4e09-8a43-db3ea138c767"
			},
			{
				"uuid": "c48ee1e8-5a43-44ba-a4d6-752072fa7da3",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.22757462029571665,0,0,0,0,0.2519336842124841,0,0,0,0,0.006557786511173608,0,-0.35516108656584255,3.6667203671328927,0.6636752764388298,1],
				"geometry": "7bd78ac1-0152-4f48-abcf-927c3e664a2b",
				"material": "f2ad4eae-ca8b-4f60-b653-a675d3db81ff"
			},
			{
				"uuid": "58bbc4f0-402c-4701-b6e0-2d8a67e2bfbf",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.22757462029571665,0,0,0,0,0.2519336842124841,0,0,0,0,0.006557786511173608,0,0.3389864457117657,3.6667203671328927,0.6683150734989249,1],
				"geometry": "7bd78ac1-0152-4f48-abcf-927c3e664a2b",
				"material": "f2ad4eae-ca8b-4f60-b653-a675d3db81ff"
			},
			{
				"uuid": "2c749870-6b0a-4184-b45f-1e6eabbd143f",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.8209888622014383,0,0,0,0,0.4274100830491953,0,0,0,0,-0.004133699402822535,0,-0.00007304576980143862,3.1644938948158576,0.6719025506295451,1],
				"geometry": "33d3ae0a-282d-4108-99d9-5a8fff73c187",
				"material": "9fffa1d8-7687-49e4-b78f-67a705a784c1"
			},
			{
				"uuid": "75f7f00e-0f98-4356-9428-0612aa4f4e91",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,0.40038468570104746,0,0,0,0,0.009365686337028969,0,-0.16922472929106958,2.9844576066814366,0.660228704993967,1],
				"geometry": "2f5e0849-0abb-4ef3-ae81-576d236f3016",
				"material": "a08a7b37-1c6e-472f-a6ab-d8eb368fc85f"
			},
			{
				"uuid": "041b2e9b-9c40-4db7-bd46-c7331034a38c",
				"type": "Mesh",
				"name": "TorusKnot",
				"layers": 1,
				"matrix": [0.13671367803520326,0,-0.2119560508297261,0,0,0.1920043314621107,0,0,0.3853010904919492,0,0.24852288493734026,0,0.22911196249307386,4.105597075061376,-0.18360740585647906,1],
				"geometry": "96adbe70-0ada-4bc7-a143-5466d7bd634a",
				"material": "ee5bb3db-327b-4d08-8a9e-8df65df475d1"
			},
			{
				"uuid": "3c8989b9-7daa-4656-bcf6-5cb1b3e0aabe",
				"type": "Mesh",
				"name": "TorusKnot",
				"layers": 1,
				"matrix": [0.25222211886598417,0,0,0,0,0.1920043314621107,0,0,0,0,0.4584981512196791,0,0.17475328673340884,4.031879781292761,0,1],
				"geometry": "96adbe70-0ada-4bc7-a143-5466d7bd634a",
				"material": "ee5bb3db-327b-4d08-8a9e-8df65df475d1"
			},
			{
				"uuid": "8b5fd5ef-8cd2-4a42-a4e8-9ddfce029afa",
				"type": "Mesh",
				"name": "TorusKnot",
				"layers": 1,
				"matrix": [-0.0871724703599741,5.987312126085754e-17,-0.23667901820099324,0,8.126771737992745e-18,0.1920043314621107,4.557847135662624e-17,0,0.43024336154793624,1.9406384162689087e-17,-0.15846515237046768,0,0.19774408938866816,4.006935528995116,0.1820705807301164,1],
				"geometry": "96adbe70-0ada-4bc7-a143-5466d7bd634a",
				"material": "ee5bb3db-327b-4d08-8a9e-8df65df475d1"
			},
			{
				"uuid": "c4d9522d-fc14-4b46-9d2c-4605aa370a96",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.8375281272873194,0,0,0,0,0.6185804626941214,0,0,0,0,0.006899041382611218,0,0.24242805033662607,3.8308187388857324,0.665417937625927,1],
				"geometry": "27bb8f44-800b-4e41-8f1c-ee22b2910fba",
				"material": "ef02ece0-0a48-485f-89a0-c1da20d7c215"
			}]
	}
};

var zombie_2 = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "dbcbd1e4-82e6-4851-89ca-7cb0106a43e9",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "6cc8cc47-28cc-4916-b53d-11ca9c1fed12",
			"type": "CircleGeometry",
			"radius": 1,
			"segments": 9,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "23e69dd0-7c4e-4f54-bb69-6139c9b8ce09",
			"type": "TubeGeometry",
			"path": {
				"metadata": {
					"version": 4.5,
					"type": "Curve",
					"generator": "Curve.toJSON"
				},
				"arcLengthDivisions": 200,
				"type": "CatmullRomCurve3",
				"points": [[2,2,-2],[2,-2,-0.6666666666666667],[-2,-2,0.6666666666666667],[-2,2,2]],
				"closed": false,
				"curveType": "centripetal",
				"tension": 0.5
			},
			"tubularSegments": 64,
			"radius": 1,
			"radialSegments": 8,
			"closed": false
		}],
	"materials": [
		{
			"uuid": "f20593a0-13dc-4d40-ad21-5e361eb99ff9",
			"type": "MeshStandardMaterial",
			"color": 859161,
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
			"uuid": "fbb79e47-1fc9-41a2-95c1-1c2f62aae5bc",
			"type": "MeshStandardMaterial",
			"color": 9317934,
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
			"uuid": "398db9ad-02c3-4b25-9644-8d83a9473072",
			"type": "MeshStandardMaterial",
			"color": 9317934,
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
		"uuid": "7f98a21a-f585-421a-b0a5-9ad83bdde55f",
		"type": "Group",
		"name": "UpperBody",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "f824afb3-a10c-4c1a-962b-f622953716f3",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1.0606872199587016,0,0,0,0,2.2408226624421457,0,0,0,0,1,0,0.013602953116155891,1.8002610640062158,0,1],
				"geometry": "dbcbd1e4-82e6-4851-89ca-7cb0106a43e9",
				"material": "f20593a0-13dc-4d40-ad21-5e361eb99ff9"
			},
			{
				"uuid": "34c5b857-fb5d-454b-9d48-5712dd30b437",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [-0.38068067699189784,0,0,0,0,0.3497137899103882,-1.369080478212934,0,0,0.36720935105889985,0.09379884958769322,0,-0.6951017131277715,2.3402041691353186,0.5277339275159074,1],
				"geometry": "dbcbd1e4-82e6-4851-89ca-7cb0106a43e9",
				"material": "f20593a0-13dc-4d40-ad21-5e361eb99ff9"
			},
			{
				"uuid": "06bd8fdb-fc6f-4016-b020-fcd5888eef87",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [-0.38068067699189784,0,0,0,0,0.3497137899103882,-1.369080478212934,0,0,0.36720935105889985,0.09379884958769322,0,0.7360988003908036,2.3402041691353186,0.5277339275159074,1],
				"geometry": "dbcbd1e4-82e6-4851-89ca-7cb0106a43e9",
				"material": "f20593a0-13dc-4d40-ad21-5e361eb99ff9"
			},
			{
				"uuid": "c4b7a271-751a-4ef6-ac0f-c171e5dd49dd",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.31108563717847043,0,0,0,0,0.4045135790207653,0,0,0,0,1,0,0.1743046149956753,1.632368718326501,0.5284329715867706,1],
				"geometry": "6cc8cc47-28cc-4916-b53d-11ca9c1fed12",
				"material": "fbb79e47-1fc9-41a2-95c1-1c2f62aae5bc"
			},
			{
				"uuid": "60b1df41-4acb-4c96-b65b-ad4c56333771",
				"type": "Mesh",
				"name": "Tube",
				"layers": 1,
				"matrix": [-0.07725519008292052,0.08606600238767882,0.02539098033092064,0,-0.019395714984498446,-0.009938519658032031,-0.02532596153919686,0,-0.06512210938090954,-0.08274889202202916,0.08234598949204974,0,0.34914489102400204,1.234975990057665,0.4992648723555858,1],
				"geometry": "23e69dd0-7c4e-4f54-bb69-6139c9b8ce09",
				"material": "398db9ad-02c3-4b25-9644-8d83a9473072"
			}]
	}
};

var zombie_3 = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "4bf87318-036e-486b-bc4d-adcda6a622f5",
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
			"uuid": "59bf8895-7d43-40df-87f0-a20918395d5a",
			"type": "MeshStandardMaterial",
			"name": "RightLeg",
			"color": 859161,
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
		"uuid": "84528611-564a-4260-82d7-a990f95f310c",
		"type": "Mesh",
		"name": "Box",
		"layers": 1,
		"matrix": [0.45450548275353864,0,0,0,0,1.4892945137539546,0,0,0,0,0.44790115472117376,0,-0.2713258899166111,0,0,1],
		"geometry": "4bf87318-036e-486b-bc4d-adcda6a622f5",
		"material": "59bf8895-7d43-40df-87f0-a20918395d5a"
	}
};
var zombie_4 = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "47164a0d-395a-4b16-a789-75ef90668eb1",
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
			"uuid": "0e4747d9-de40-4d07-8fbb-f936fb38514f",
			"type": "MeshStandardMaterial",
			"name": "LeftLeg",
			"color": 859161,
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
		"uuid": "3daa7f67-c58e-4b4a-8690-9a2ef51d46b0",
		"type": "Mesh",
		"name": "Box",
		"layers": 1,
		"matrix": [0.455,0,0,0,0,1.489,0,0,0,0,0.448,0,0.30787755693333674,0,0,1],
		"geometry": "47164a0d-395a-4b16-a789-75ef90668eb1",
		"material": "0e4747d9-de40-4d07-8fbb-f936fb38514f"
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
