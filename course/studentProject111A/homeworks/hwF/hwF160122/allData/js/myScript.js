'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log
world2D.sl01.visible=false;
world2D.sl02.visible=false;
world2D.sl03.visible=false;
world2D.ch02.visible=false;
world2D.btnUp.visible=false;
world2D.btnDown.visible=false;
world2D.btnLeft.visible=false;
world2D.btnRight.visible=false;


//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//
/*任務：
1. 改變舞台上，按鈕的名稱：
	(1)world2D.btn01：左右滾動，world2D.btn02：原地旋轉
	(2)偵測按鈕按下的動作

2. 按下按鈕時，播放下列動畫
	world2D.btn01：左右滾動
	world2D.btn02：原地旋轉
	world2D.btnUp：停止動畫，向前移動
	world2D.btnDown：停止動畫，向後移動
	world2D.btnRight：停止動畫，向右移動
	world2D.btnLeft：停止動畫，向左移動

3. 改變並使用舞台上的slider
    world2D.sl01：最大50，最小-50，現值0，控制smile.position.x
    world2D.sl02：最大180，最小-180，現值90，控制smile.rotation.z
    world2D.sl03：最大3，最小0.1，現值1.2，控制smile.scale.xyz
    world2D.ch01：控制smile.visible
	world2D.ch02：控制動畫是否播放 isPlay
	提示：world2D.sl01.help()可看到說明

4. 點拖放：
	(1)點拖放smile
	(2)點拖放smile.eye
	提示1：getMouse3D(_plane , _c)
	提示2：isDraging, dragWho, oldMouseX, oldMouseZ
*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var box;
var cha;
var cha2;
var cha3;
var cha4;
var cha5;
var cha6;
var cha7;
var cha8;
var cha9;
var cha10;
var cha11;
var cha12;
var cha13;
var cha14;
var cha15;
var cha16;
var cha17;
var cha18;
var cha19;
var cha20;
var cha21;
var cha22;
var cha23;
var cha24;
var cha25;
var cha26;
var gamemd=0;
var loader;
var kls;
var peopleArray;
var headArray;
var nn=26;
var people;
var head;
var cc;
var ff=50;
var balls=[];
var tt=0;
var v0=5;
var dt=0.1;

//B.定義init
function init(){

	var name= new TEACHER.ObjPicPlane(20,10,pics.name,"z",2);
	name.position.z=-50;
	name.position.y=35;
	scene.add(name);

	for(var i=0;i<ff;i++){
		var ball=new TEACHER.ObjSphere(0.5,0xe872b5);
		scene.add(ball);
		balls.push(ball);

		ball.isActive=false;
	}

	loader = new THREE.ObjectLoader();

    peopleArray=[];
    headArray=[];

	for(var i=0 ; i<nn ; i++){
		people=loader.parse(objpeople);
		peopleArray.push(people);
		head=people.getChildByName('head');
		headArray.push(head);
	};

	for(var i=0 ; i<6 ; i++){
        var pp=peopleArray[i];
		pp.position.x=-40+(i*15);
		pp.position.z=-22;
		pp.position.y=-6;
		scene.add(pp);
	};

	for(var i=0 ; i<6 ; i++){
        var pp=peopleArray[i+6];
		pp.position.x=-40+(i*15);
		pp.position.z=-2;
		pp.position.y=-6;
		scene.add(pp);
	};

	for(var i=0 ; i<6 ; i++){
        var pp=peopleArray[i+12];
		pp.position.x=-40+(i*15);
		pp.position.z=18;
		pp.position.y=-6;
		scene.add(pp);
	};

	for(var i=0 ; i<6 ; i++){
        var pp=peopleArray[i+18];
		pp.position.x=-40+(i*15);
		pp.position.z=33;
		pp.position.y=-6;
		scene.add(pp);
	};
    
    var p1=peopleArray[24];
	p1.position.x=5;
	p1.position.y=-6;
	p1.position.z=48;
	scene.add(p1);

	var p2=peopleArray[25];
	p2.position.x=35;
	p2.position.y=-6;
	p2.position.z=48;
	scene.add(p2);

    cha=loader.parse(objcha);
	cha.position.x=-40;
	cha.position.y=-5.5;
	cha.position.z=-25;
	scene.add(cha);

    cha2=loader.parse(objcha);
	cha2.position.x=-25;
	cha2.position.y=-5.5;
	cha2.position.z=-25;
	scene.add(cha2);

	cha3=loader.parse(objcha);
	cha3.position.x=-10;
	cha3.position.y=-5.5;
	cha3.position.z=-25;
	scene.add(cha3);

	cha4=loader.parse(objcha);
	cha4.position.x=5;
	cha4.position.y=-5.5;
	cha4.position.z=-25;
	scene.add(cha4);

	cha5=loader.parse(objcha);
	cha5.position.x=20;
	cha5.position.y=-5.5;
	cha5.position.z=-25;
	scene.add(cha5);

	cha6=loader.parse(objcha);
	cha6.position.x=35;
	cha6.position.y=-5.5;
	cha6.position.z=-25;
	scene.add(cha6);

	cha7=loader.parse(objcha);
	cha7.position.x=-40;
	cha7.position.y=-5.5;
	cha7.position.z=-5;
	scene.add(cha7);

	cha8=loader.parse(objcha);
	cha8.position.x=-25;
	cha8.position.y=-5.5;
	cha8.position.z=-5;
	scene.add(cha8);

	cha9=loader.parse(objcha);
	cha9.position.x=-10;
	cha9.position.y=-5.5;
	cha9.position.z=-5;
	scene.add(cha9);

	cha10=loader.parse(objcha);
	cha10.position.x=5;
	cha10.position.y=-5.5;
	cha10.position.z=-5;
	scene.add(cha10);

	cha11=loader.parse(objcha);
	cha11.position.x=20;
	cha11.position.y=-5.5;
	cha11.position.z=-5;
	scene.add(cha11);

	cha12=loader.parse(objcha);
	cha12.position.x=35;
	cha12.position.y=-5.5;
	cha12.position.z=-5;
	scene.add(cha12);

	cha13=loader.parse(objcha);
	cha13.position.x=-40;
	cha13.position.y=-5.5;
	cha13.position.z=15;
	scene.add(cha13);

	cha14=loader.parse(objcha);
	cha14.position.x=-25;
	cha14.position.y=-5.5;
	cha14.position.z=15;
	scene.add(cha14);

	cha15=loader.parse(objcha);
	cha15.position.x=-10;
	cha15.position.y=-5.5;
	cha15.position.z=15;
	scene.add(cha15);

	cha16=loader.parse(objcha);
	cha16.position.x=5;
	cha16.position.y=-5.5;
	cha16.position.z=15;
	scene.add(cha16);

	cha17=loader.parse(objcha);
	cha17.position.x=20;
	cha17.position.y=-5.5;
	cha17.position.z=15;
	scene.add(cha17);

	cha18=loader.parse(objcha);
	cha18.position.x=35;
	cha18.position.y=-5.5;
	cha18.position.z=15;
	scene.add(cha18);

	cha19=loader.parse(objcha);
	cha19.position.x=-40;
	cha19.position.y=-5.5;
	cha19.position.z=30;
	scene.add(cha19);

	cha20=loader.parse(objcha);
	cha20.position.x=-25;
	cha20.position.y=-5.5;
	cha20.position.z=30;
	scene.add(cha20);

	cha21=loader.parse(objcha);
	cha21.position.x=-10;
	cha21.position.y=-5.5;
	cha21.position.z=30;
	scene.add(cha21);

	cha22=loader.parse(objcha);
	cha22.position.x=5;
	cha22.position.y=-5.5;
	cha22.position.z=30;
	scene.add(cha22);

	cha23=loader.parse(objcha);
	cha23.position.x=20;
	cha23.position.y=-5.5;
	cha23.position.z=30;
	scene.add(cha23);

	cha24=loader.parse(objcha);
	cha24.position.x=35;
	cha24.position.y=-5.5;
	cha24.position.z=30;
	scene.add(cha24);

	cha25=loader.parse(objcha);
	cha25.position.x=5;
	cha25.position.y=-5.5;
	cha25.position.z=45;
	scene.add(cha25);

	cha26=loader.parse(objcha);
	cha26.position.x=35;
	cha26.position.y=-5.5;
	cha26.position.z=45;
	scene.add(cha26);
	
	kls=loader.parse(objkis);
	kls.position.z=-45;
	kls.position.y=0;
	kls.position.x=0;
	scene.add(kls);

    var front=new TEACHER.ObjBox(80,4,10,0x99540b,2);
	front.position.z=-45;
	front.position.y=-4;
	scene.add(front);

	var board=new TEACHER.ObjBox(74,20,3,0x051f03,2);
	board.position.z=-50;
	board.position.y=15;
	scene.add(board);

    var wall1=new TEACHER.ObjBox(100,40,3,0xb09b5b);
	wall1.position.z=-52;
	wall1.position.y=10;
	scene.add(wall1);

	var wall2=new TEACHER.ObjBox(100,12,3,0x70410a);
	wall2.position.z=-51;
	wall2.position.y=-0.5;
	scene.add(wall2);

	var wall3=new TEACHER.ObjBox(100,12,3,0x70410a);
	wall3.position.x=50;
	wall3.position.y=-0.5;
	wall3.rotation.y=1.57;
	scene.add(wall3);

	var doorf=new TEACHER.ObjBox(4,25,10,0x4f2e07);
	doorf.position.x=50;
	doorf.position.y=5;
	doorf.position.z=-40;
	scene.add(doorf);

	var doorb=new TEACHER.ObjBox(4,25,10,0x4f2e07);
	doorb.position.x=50;
	doorb.position.y=5;
	doorb.position.z=40;
	scene.add(doorb);

	var aa=new TEACHER.ObjBox(3,3,90,0x70410a);
	aa.position.y=18;
	aa.position.x=50;
	scene.add(aa);

	var ab=new TEACHER.ObjBox(3,24.5,6,0xb09b5b,2);
	ab.position.x=50;
	ab.position.y=17.7;
	ab.position.z=-48;
	scene.add(ab);

	var ac=new TEACHER.ObjBox(100,5,3,0x70410a);
	ac.position.z=-52;
	ac.position.y=32.5;
	scene.add(ac)

	var ad=new TEACHER.ObjBox(100,5,3,0x70410a);
	ad.position.x=50;
	ad.position.y=32.5;
	ad.rotation.y=1.57;
	scene.add(ad)

	var ae=new TEACHER.ObjBox(3,24.5,5,0xb09b5b,2);
	ae.position.x=50;
	ae.position.y=17.7;
	ae.position.z=47.5;
	scene.add(ae);

	var af=new TEACHER.ObjBox(3,12,3,0x70410a);
	af.position.x=50;
	af.position.z=-43.5;
	af.position.y=24;
	scene.add(af);

	var ag=new TEACHER.ObjBox(3,12,3,0x70410a);
	ag.position.x=50;
	ag.position.z=43.5;
	ag.position.y=24;
	scene.add(ag);

	var ah=new TEACHER.ObjBox(3,25,3,0x70410a);
	ah.position.x=50;
	ah.position.y=18;
	scene.add(ah);

	var ai=new TEACHER.ObjBox(2,18,2,0x70410a);
	ai.position.x=50;
	ai.position.y=10;
	ai.position.z=18;
	scene.add(ai);

	var aj=new TEACHER.ObjBox(2,18,2,0x70410a);
	aj.position.x=50;
	aj.position.y=10;
	aj.position.z=-18;
	scene.add(aj);

	var ak=new TEACHER.ObjBox(2,15,2,0x70410a);
	ak.position.x=50;
	ak.position.y=25;
	ak.position.z=-22;
	scene.add(ak);

	var al=new TEACHER.ObjBox(2,15,2,0x70410a);
	al.position.x=50;
	al.position.y=25;
	al.position.z=22;
	scene.add(al);

	var am=new TEACHER.ObjBox(2,2,80,0x70410a);
	am.position.x=50;
	am.position.y=11;
	scene.add(am);


	box=new TEACHER.ObjSphere(0.2,0xfc0505,2);
	box.b1=new TEACHER.ObjCylinder(0.3,1,0xe0dede,false,"x",2);//正上
	box.b2=new TEACHER.ObjCylinder(0.3,1,0xe0dede,false,"x",2);
	box.b3=new TEACHER.ObjCylinder(0.3,1,0xe0dede,false,"y",2);
    box.b4=new TEACHER.ObjCylinder(0.3,1,0xe0dede,false,"y",2);//左前
   
	box.add(box.b1).add(box.b2).add(box.b3).add(box.b4);
	scene.add(box);
    box.b1.position.x=-1;
    box.b2.position.x=1;
    box.b3.position.y=-1;
    box.b4.position.y=1;
	
    world2D.btn01.setLabel('殺老師stop!');
	world2D.btn02.setLabel('影分身之術!');
	world2D.btn01.on('click',clickBtn);
	world2D.btn02.on('click',clickBtn);

	world2D.ch01.setLabel('跟隨滑鼠')
	

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){

	var vecM = getMouse3D('y',0);
	box.position.x=vecM.x;
    box.position.z=vecM.z;

	cc=world2D.ch01.checked;
	
	if(gamemd===1){
		kls.position.x=0;
	};
	if(gamemd===2){
		kls.position.x=-40+80*Math.random();
	};

    
	for(var i=0 ; i<26 ; i++){
        var hh=headArray[i];
		var theta=Math.atan2(-box.position.z-hh.position.z,box.position.x-hh.position.x);
		hh.rotation.y=theta+1.5;
	};
	
	if(cc){
		kls.position.x=vecM.x;
	};

	tt++;
	if(tt>2){
		tt=0;

		var pee=peopleArray[Math.floor(Math.random()*26)];
		for(var i=0;i<ff;i++){
			if(!balls[i].isActive){
				var ball=balls[i];
				ball.isActive=true;
				i=nn+1;
			}
		}
		ball.position.x=pee.position.x+3;
		ball.position.z=pee.position.z;
		ball.vx=5*Math.cos(Math.atan2(-box.position.z-hh.position.z,box.position.x-hh.position.x));
		ball.vz=-5*Math.sin(Math.atan2(-box.position.z-hh.position.z,box.position.x-hh.position.x));

	}
	
    for(var i=0;i<ff;i++){
		var ball=balls[i];
		if(ball.isActive){
			ball.position.x+=ball.vx*dt;
			ball.position.z+=ball.vz*dt;
            
			if(ball.position.x>50||ball.position.x<-50||ball.position.z>50||ball.position.z<-50){
				ball.isActive=false;
			}
               
		}
		ball.visible=ball.isActive;
	}






	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

world2D.slCameraRR.value=120;







function clickBtn(e){
	var str=e.target.parent.name;

	if(str==='btn01'){
		gamemd=1;
	}else if(str==='btn02'){
		gamemd=2;
	}
}



//resize
MyJS.myResize();



var objcha={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "23114ef9-6108-4f4f-a901-f742dc1d2de3",
			"type": "BoxGeometry",
			"width": 0.75,
			"height": 2.5,
			"depth": 0.75,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "4b5d2cde-2f54-4d54-b862-f6d619bf350e",
			"type": "BoxGeometry",
			"width": 0.75,
			"height": 2.5,
			"depth": 0.75,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "2c57ccef-3ce1-4add-afc1-20a56075d3c8",
			"type": "BoxGeometry",
			"width": 0.75,
			"height": 2.5,
			"depth": 0.75,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "fe211e38-d335-49e8-9264-ecd95bb4371c",
			"type": "BoxGeometry",
			"width": 0.75,
			"height": 2.5,
			"depth": 0.75,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "03d96eb0-faa1-4ef9-b223-58d016c6fa22",
			"type": "BoxGeometry",
			"width": 3.5,
			"height": 1,
			"depth": 3.5,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "2627254a-6672-4f1d-b9de-7e0b19dc531a",
			"type": "BoxGeometry",
			"width": 1,
			"height": 6,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "6ad6cdf3-7927-4592-887c-0025f5dafbcc",
			"type": "BoxGeometry",
			"width": 6,
			"height": 2,
			"depth": 6,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "801e52e2-c1c7-42d4-8a45-28d3dfff38f7",
			"type": "BoxGeometry",
			"width": 7,
			"height": 1,
			"depth": 7,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		}],
	"materials": [
		{
			"uuid": "db2c604a-7909-40e9-aa7a-b0b6ab09548a",
			"type": "MeshStandardMaterial",
			"color": 12624176,
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
			"uuid": "d4596e21-1d0b-4047-8759-9ca20811c561",
			"type": "MeshStandardMaterial",
			"color": 12624176,
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
			"uuid": "ab3954fe-36ed-4719-945f-b74d7a745c69",
			"type": "MeshStandardMaterial",
			"color": 12624176,
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
			"uuid": "b177fee8-ff01-4e5e-8fa4-359e3c792d5e",
			"type": "MeshStandardMaterial",
			"color": 12624176,
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
		"uuid": "3a764319-faf1-484d-b7ab-58c86db98133",
		"type": "Group",
		"name": "all",
		"layers": 1,
		"matrix": [-1,-1.2246467991473532e-16,1.4997597826618576e-32,0,-1.2246467991473532e-16,1,-1.2246467991473532e-16,0,0,-1.2246467991473532e-16,-1,0,0,0,0,1],
		"children": [
			{
				"uuid": "22371100-accb-4beb-bcab-e81591cf9436",
				"type": "Group",
				"name": "chair",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,-0.25,0,1],
				"children": [
					{
						"uuid": "de4351d3-07c5-4edd-902d-83a6f1d82d03",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,1,1.4797347655161652,-3,1],
						"geometry": "23114ef9-6108-4f4f-a901-f742dc1d2de3",
						"material": "db2c604a-7909-40e9-aa7a-b0b6ab09548a"
					},
					{
						"uuid": "20a5489d-3ebc-4b9d-af8a-4b58d5c3932f",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-1,1.4797347655161652,-3,1],
						"geometry": "4b5d2cde-2f54-4d54-b862-f6d619bf350e",
						"material": "db2c604a-7909-40e9-aa7a-b0b6ab09548a"
					},
					{
						"uuid": "acc8ded4-77b2-4f06-8f14-b8da741c07e6",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-1,1.5,-5,1],
						"geometry": "2c57ccef-3ce1-4add-afc1-20a56075d3c8",
						"material": "db2c604a-7909-40e9-aa7a-b0b6ab09548a"
					},
					{
						"uuid": "fda93df6-eda2-4b6e-bf7f-3998d127df1e",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,1,1.5,-5,1],
						"geometry": "fe211e38-d335-49e8-9264-ecd95bb4371c",
						"material": "db2c604a-7909-40e9-aa7a-b0b6ab09548a"
					},
					{
						"uuid": "7d729292-5ab2-4644-bc2d-2448479de4a8",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,2.5,-4.037014858164805,1],
						"geometry": "03d96eb0-faa1-4ef9-b223-58d016c6fa22",
						"material": "d4596e21-1d0b-4047-8759-9ca20811c561"
					},
					{
						"uuid": "6c3a67d2-ac1f-4884-8af6-881318347a9b",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,-0.001114740430247174,-0.9999993786766938,0,0,0.9999993786766938,-0.001114740430247174,0,0,4.265193146567508,-5.293678148375681,1],
						"geometry": "03d96eb0-faa1-4ef9-b223-58d016c6fa22",
						"material": "d4596e21-1d0b-4047-8759-9ca20811c561"
					}]
			},
			{
				"uuid": "7e8a7152-6d74-4cac-a64e-b6ad4fbbcfa9",
				"type": "Group",
				"name": "table",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"children": [
					{
						"uuid": "48c5395b-84bd-47dc-a468-27b5c2f84508",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,2.5,3,5,1],
						"geometry": "2627254a-6672-4f1d-b9de-7e0b19dc531a",
						"material": "ab3954fe-36ed-4719-945f-b74d7a745c69"
					},
					{
						"uuid": "1022faeb-08d6-4b48-9ac5-816e2f64973e",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-2.5,3,5,1],
						"geometry": "2627254a-6672-4f1d-b9de-7e0b19dc531a",
						"material": "ab3954fe-36ed-4719-945f-b74d7a745c69"
					},
					{
						"uuid": "48f6d036-66ea-4f18-9fb1-5dfeecb8a790",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-2.5,3,0,1],
						"geometry": "2627254a-6672-4f1d-b9de-7e0b19dc531a",
						"material": "ab3954fe-36ed-4719-945f-b74d7a745c69"
					},
					{
						"uuid": "8e35547d-9b36-476a-8057-25d74b9b0d18",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,2.5,3,0,1],
						"geometry": "2627254a-6672-4f1d-b9de-7e0b19dc531a",
						"material": "ab3954fe-36ed-4719-945f-b74d7a745c69"
					},
					{
						"uuid": "173ae2cb-dc0a-46fb-b482-162a1c4de45f",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,5.009735550547312,2.5,1],
						"geometry": "6ad6cdf3-7927-4592-887c-0025f5dafbcc",
						"material": "b177fee8-ff01-4e5e-8fa4-359e3c792d5e"
					},
					{
						"uuid": "658fb971-5d23-41be-9c1e-42e1e10791ae",
						"type": "Mesh",
						"name": "Box",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,6,2.5,1],
						"geometry": "801e52e2-c1c7-42d4-8a45-28d3dfff38f7",
						"material": "d4596e21-1d0b-4047-8759-9ca20811c561"
					}]
			}]
	}
}



var objkis={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "80d40ebb-0533-4db7-9c4c-ed62333a9fcc",
			"type": "CylinderGeometry",
			"radiusTop": 1.5,
			"radiusBottom": 3,
			"height": 12,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "5d0a2190-4881-4576-bb13-7d7882e61f4f",
			"type": "SphereGeometry",
			"radius": 2,
			"widthSegments": 64,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "7f46290f-467f-41ec-9cc9-362d088e13c5",
			"type": "SphereGeometry",
			"radius": 0.1,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "4d449f82-bdad-4e03-a299-ec70671e0c40",
			"type": "CircleGeometry",
			"radius": 0.1,
			"segments": 32,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "6ae38e10-6df4-412f-a2a8-f54e08304b65",
			"type": "CylinderGeometry",
			"radiusTop": 1.2,
			"radiusBottom": 1.18,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "ef3c9656-5e85-4b85-8098-0ab3c2bf8ed7",
			"type": "CylinderGeometry",
			"radiusTop": 1.25,
			"radiusBottom": 1.3,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "10a336b9-0a73-497d-9d6c-53cb32c878af",
			"type": "CylinderGeometry",
			"radiusTop": 1.35,
			"radiusBottom": 1.35,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "c7e3f0dd-f078-47cc-ba18-974c1e98088f",
			"type": "CylinderGeometry",
			"radiusTop": 1.18,
			"radiusBottom": 1.2,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "1f4e7b5e-631f-46d5-b932-e3963594e359",
			"type": "CylinderGeometry",
			"radiusTop": 1.3,
			"radiusBottom": 1.25,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "780a189d-6ac4-4485-a03f-18e853848947",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 1.5,
			"height": 5,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "76348a8e-1880-429a-bc82-862a40cad790",
			"type": "CylinderGeometry",
			"radiusTop": 1,
			"radiusBottom": 2,
			"height": 7,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "770f8bc8-4e2f-4d7b-9945-ef7ff88386f8",
			"type": "CylinderGeometry",
			"radiusTop": 0.8,
			"radiusBottom": 0.9,
			"height": 1,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "a7dc8632-cbc7-4c64-835b-b8b4e6659f23",
			"type": "PlaneGeometry",
			"width": 2,
			"height": 2,
			"widthSegments": 1,
			"heightSegments": 1
		},
		{
			"uuid": "92f87941-c0be-4057-98bb-5eda3b221590",
			"type": "CylinderGeometry",
			"radiusTop": 0.5,
			"radiusBottom": 1.3,
			"height": 1.2,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "63664dea-c120-4be6-a69d-c7dfabc1e7ef",
			"type": "CircleGeometry",
			"radius": 0.5,
			"segments": 32,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "308f6ab0-0595-43a4-b802-79686df5d57b",
			"type": "CircleGeometry",
			"radius": 0.4,
			"segments": 32,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "9e79fc9b-5f06-4f73-b958-a9d52e697d31",
			"type": "PlaneGeometry",
			"width": 1,
			"height": 1,
			"widthSegments": 1,
			"heightSegments": 1
		},
		{
			"uuid": "11dc69f2-c822-400c-9135-371600893d9a",
			"type": "TorusGeometry",
			"radius": 1.44,
			"tube": 0.5,
			"radialSegments": 12,
			"tubularSegments": 48,
			"arc": 1.53588974175501
		},
		{
			"uuid": "7d0b8fef-9cbd-43bf-beea-b66f82b7de11",
			"type": "TorusGeometry",
			"radius": 1.44,
			"tube": 0.5,
			"radialSegments": 12,
			"tubularSegments": 48,
			"arc": 2.251474735072685
		},
		{
			"uuid": "a07cfc4b-8fca-4e14-b3c9-7ce5f2942288",
			"type": "CylinderGeometry",
			"radiusTop": 0.5,
			"radiusBottom": 0.5,
			"height": 4,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "2036dd57-e3e6-47db-baa1-99110804f4ce",
			"type": "SphereGeometry",
			"radius": 0.59,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "131cab26-4bde-40ec-b04d-0f5252b9ce17",
			"type": "SphereGeometry",
			"radius": 0.59,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "e8831cdb-058d-4c40-8ca0-04dd9f6f6252",
			"type": "TorusGeometry",
			"radius": 1,
			"tube": 0.24,
			"radialSegments": 12,
			"tubularSegments": 48,
			"arc": 1.9198621771937625
		},
		{
			"uuid": "fea4bea6-28ae-42a7-9ad1-44ec6b5d2afd",
			"type": "TorusGeometry",
			"radius": 1.78,
			"tube": 0.59,
			"radialSegments": 12,
			"tubularSegments": 48,
			"arc": 2.5830872929516078
		},
		{
			"uuid": "947f4029-f84b-4735-981f-a9f0627d4174",
			"type": "SphereGeometry",
			"radius": 0.59,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		}],
	"materials": [
		{
			"uuid": "0a16d03a-8008-4745-9b12-2132010926f6",
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
			"uuid": "6cd9b4c5-8b13-467b-829e-f1bff60498bf",
			"type": "MeshStandardMaterial",
			"color": 16248097,
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
			"uuid": "d85d41e0-9a6e-4461-9616-39aa182bb247",
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
			"uuid": "976537be-fb77-48c1-864e-055c9cdf7e53",
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
			"uuid": "a1c1a156-fade-4303-83c0-7b34955573fc",
			"type": "MeshStandardMaterial",
			"color": 5327241,
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
			"uuid": "e2dabf17-3281-4ac3-bb54-e6aa86c2de2a",
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
			"uuid": "19b8c9e4-8322-4a5b-af39-b348189a5a1f",
			"type": "MeshStandardMaterial",
			"color": 13246756,
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
			"uuid": "e121a273-b217-45cc-8619-b15c687253a4",
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
			"uuid": "53702e96-bc23-4d6f-a6e4-56aae68fd136",
			"type": "MeshStandardMaterial",
			"color": 0,
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
			"uuid": "f472a10d-9026-49db-bdd4-a089a9d64906",
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
			"uuid": "53e9760a-d13c-4f3c-8ef7-25f121af105d",
			"type": "MeshStandardMaterial",
			"color": 15115607,
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
			"uuid": "00e74b6e-e516-48a2-ba21-1a11b759006f",
			"type": "MeshStandardMaterial",
			"color": 0,
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
			"uuid": "7a15a059-fbb3-4f96-95db-452490763cfa",
			"type": "MeshStandardMaterial",
			"color": 0,
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
			"uuid": "99a42376-fbff-46cd-b607-a340bbd8fcd3",
			"type": "MeshStandardMaterial",
			"color": 16248097,
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
			"uuid": "ab65e725-e0b9-4c14-9464-3f7b022a026e",
			"type": "MeshStandardMaterial",
			"color": 16248097,
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
			"uuid": "ea06f315-ba50-4714-8e39-d68670ec97aa",
			"type": "MeshStandardMaterial",
			"color": 16248097,
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
			"uuid": "427be20b-a456-4b46-93d7-50a4eda1ad14",
			"type": "MeshStandardMaterial",
			"color": 16248097,
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
			"uuid": "7387e203-8055-4d0d-a6e0-e81d5c8d49be",
			"type": "MeshStandardMaterial",
			"color": 16248097,
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
			"uuid": "cda3edd4-fd96-47a7-a83b-36e773d81a7a",
			"type": "MeshStandardMaterial",
			"color": 16248097,
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
		"uuid": "2090ae64-3734-4c9b-baa7-084292a46890",
		"type": "Group",
		"name": "gAll",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "1c8a62ca-f6d4-4847-b833-fc1133dc8e4f",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,6,0,1],
				"geometry": "80d40ebb-0533-4db7-9c4c-ed62333a9fcc",
				"material": "0a16d03a-8008-4745-9b12-2132010926f6"
			},
			{
				"uuid": "24013992-7a0a-4710-a222-07d3f49d8839",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [0.9996050382213573,0,0.028102803462978984,0,0,1,0,0,-0.028102803462978984,0,0.9996050382213573,0,0,13.023311673986361,0,1],
				"geometry": "5d0a2190-4881-4576-bb13-7d7882e61f4f",
				"material": "6cd9b4c5-8b13-467b-829e-f1bff60498bf"
			},
			{
				"uuid": "ddfb1f03-4baf-42e2-87c5-2a02f489ff1a",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.1127690026653978,14.034152644603356,1.6482161806150626,1],
				"geometry": "7f46290f-467f-41ec-9cc9-362d088e13c5",
				"material": "d85d41e0-9a6e-4461-9616-39aa182bb247"
			},
			{
				"uuid": "539a7025-bfb8-4029-8b9b-edca67f18a50",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.9964221580879935,0.0813623733572428,0.02287022240692552,0,-0.05994366751559083,0.8711175948159927,-0.48740218785596384,0,-0.0595788519195017,0.4842874148722807,0.8728780328317798,0,-0.11605386435225137,14.061769587119487,1.698706772047834,1],
				"geometry": "4d449f82-bdad-4e03-a299-ec70671e0c40",
				"material": "976537be-fb77-48c1-864e-055c9cdf7e53"
			},
			{
				"uuid": "7a8d1340-d025-48ea-a170-c2db6b53f284",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.8449915495574181,14.027032072698413,1.4293418123249035,1],
				"geometry": "7f46290f-467f-41ec-9cc9-362d088e13c5",
				"material": "d85d41e0-9a6e-4461-9616-39aa182bb247"
			},
			{
				"uuid": "6a9f041f-508d-40ee-98e5-535dc6588ad0",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.8625600286618031,0.08142232051783707,-0.4993601933238572,0,-0.30609989499543283,0.8698309881419003,-0.38690684453996155,0,0.40285611729094345,0.48658448165716883,0.7752048058233966,0,0.8688796753901477,14.056114760652413,1.4760543457844266,1],
				"geometry": "4d449f82-bdad-4e03-a299-ec70671e0c40",
				"material": "976537be-fb77-48c1-864e-055c9cdf7e53"
			},
			{
				"uuid": "f5d5a1a0-bf1a-4e15-925b-da3ca6397cfa",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [-0.44295461344679965,-0.8860773692883865,0.13659467801187958,0,0.37399225938834385,-0.19027341605544137,-0.021489645842612926,0,0.08101439100051841,0.07477995320428923,0.7478074837670041,0,3.074730393141822,8.998279884295693,-0.12391682245119506,1],
				"geometry": "6ae38e10-6df4-412f-a2a8-f54e08304b65",
				"material": "a1c1a156-fade-4303-83c0-7b34955573fc"
			},
			{
				"uuid": "23fc1f84-2e34-4ad7-b12e-fe0b52a671f5",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.7290301527061728,-0.6694778812617445,-0.1425286039589936,0,0.2643958845499355,0.3098550277782945,-0.10305661459516208,0,0.20357540666785703,0.0673696562632335,0.7248377673268338,0,-2.9016971052833047,8.039851164592356,1.5638244021786911,1],
				"geometry": "ef3c9656-5e85-4b85-8098-0ab3c2bf8ed7",
				"material": "a1c1a156-fade-4303-83c0-7b34955573fc"
			},
			{
				"uuid": "3ba5e355-a588-47fa-9d73-8f417cd26785",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.7290301527061728,-0.6694778812617445,-0.1425286039589936,0,0.2643958845499355,0.3098550277782945,-0.10305661459516208,0,0.20357540666785703,0.0673696562632335,0.7248377673268338,0,-3.4683921756568363,7.348414347770152,1.819410438029574,1],
				"geometry": "10a336b9-0a73-497d-9d6c-53cb32c878af",
				"material": "a1c1a156-fade-4303-83c0-7b34955573fc"
			},
			{
				"uuid": "2aa6f478-c75e-4255-a98b-09d81c5bcc03",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.7290301527061728,-0.6694778812617445,-0.1425286039589936,0,0.2643958845499355,0.3098550277782945,-0.10305661459516208,0,0.20357540666785703,0.0673696562632335,0.7248377673268338,0,-2.273397784645101,8.71744219772922,1.371604314228959,1],
				"geometry": "c7e3f0dd-f078-47cc-ba18-974c1e98088f",
				"material": "a1c1a156-fade-4303-83c0-7b34955573fc"
			},
			{
				"uuid": "9638d77f-ae48-46be-8d8d-bf076cf2e78f",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [-0.44295461344679965,-0.8860773692883865,0.13659467801187958,0,0.37399225938834385,-0.19027341605544137,-0.021489645842612926,0,0.08101439100051841,0.07477995320428923,0.7478074837670041,0,4.699956152508667,8.12654810443412,-0.0783027917195358,1],
				"geometry": "10a336b9-0a73-497d-9d6c-53cb32c878af",
				"material": "a1c1a156-fade-4303-83c0-7b34955573fc"
			},
			{
				"uuid": "a1ed37da-38fa-432c-a2aa-57e73ce823d5",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [-0.44295461344679965,-0.8860773692883865,0.13659467801187958,0,0.37399225938834385,-0.19027341605544137,-0.021489645842612926,0,0.08101439100051841,0.07477995320428923,0.7478074837670041,0,3.9350259566556156,8.559960630978862,-0.09419851130952295,1],
				"geometry": "1f4e7b5e-631f-46d5-b932-e3963594e359",
				"material": "a1c1a156-fade-4303-83c0-7b34955573fc"
			},
			{
				"uuid": "e913de74-a786-430d-bc14-672747305c09",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.6868685777009254,-0.6743080280380337,-0.27114616038322337,0,0.6272068208968702,0.7384501901438292,-0.24759426588066122,0,0.3671827348712741,8.326672684688674e-17,0.9301488263780434,0,-2.4779120914787223,8.498974743270288,0.9793557535750983,1],
				"geometry": "780a189d-6ac4-4485-a03f-18e853848947",
				"material": "e2dabf17-3281-4ac3-bb54-e6aa86c2de2a"
			},
			{
				"uuid": "7a88ad26-e1a3-4afb-99d3-697025873f19",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [-0.4878562607972168,-0.8729148469005812,0.003992350372303882,0,-0.8729089022831915,0.4878696117959351,0.003645572772161179,0,-0.005130021024565256,-0.0017064426799269768,-0.9999853853620415,0,3.0784685538446483,9.00252120008113,-0.5287593705225127,1],
				"geometry": "780a189d-6ac4-4485-a03f-18e853848947",
				"material": "e2dabf17-3281-4ac3-bb54-e6aa86c2de2a"
			},
			{
				"uuid": "722e826e-a240-4b20-ba30-0f13060165b0",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.32146391836772326,3.508020476492762,1.2043132087085322,1],
				"geometry": "76348a8e-1880-429a-bc82-862a40cad790",
				"material": "19b8c9e4-8322-4a5b-af39-b348189a5a1f"
			},
			{
				"uuid": "60c097c8-c2c9-448d-96f2-584e84427081",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,15.01999372815909,0,1],
				"geometry": "770f8bc8-4e2f-4d7b-9945-ef7ff88386f8",
				"material": "e121a273-b217-45cc-8619-b15c687253a4"
			},
			{
				"uuid": "bbf6ddc2-fe5c-4844-8954-7ed2a9c6c6c2",
				"type": "Mesh",
				"name": "Plane",
				"layers": 1,
				"matrix": [1,0,0,0,0,0.0037365729456613206,-0.9999930189869436,0,0,0.9999930189869436,0.0037365729456613206,0,0,15.525719284816567,0,1],
				"geometry": "a7dc8632-cbc7-4c64-835b-b8b4e6659f23",
				"material": "53702e96-bc23-4d6f-a6e4-56aae68fd136"
			},
			{
				"uuid": "c661d36c-a489-43b8-ab53-5721ca5bcb7c",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,-0.9994276553061989,0.03382841718373567,0,0,-0.03382841718373567,-0.9994276553061989,0,0.17927592580764884,12.22352994805173,0.9154741682616555,1],
				"geometry": "92f87941-c0be-4057-98bb-5eda3b221590",
				"material": "f472a10d-9026-49db-bdd4-a089a9d64906"
			},
			{
				"uuid": "6b883f9a-b74e-489b-a81f-74b586e0296d",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.9708700775696083,-0.013545854639782615,-0.23922333143332977,0,1.734723475976807e-18,0.9984006889903803,-0.056533744113883067,0,0.23960653680561986,0.05488692053314603,0.9693173543656408,0,0.5902269075405688,9.64858945193964,1.7370428945245395,1],
				"geometry": "63664dea-c120-4be6-a69d-c7dfabc1e7ef",
				"material": "53e9760a-d13c-4f3c-8ef7-25f121af105d"
			},
			{
				"uuid": "0208417f-80e1-45d0-9f6e-fabff11fe797",
				"type": "Mesh",
				"name": "Circle",
				"layers": 1,
				"matrix": [0.9663222255641261,-0.03637385793263881,-0.25475144521648924,0,1.3877787807814448e-17,0.9899599395677326,-0.14134821559202548,0,0.2573351052242848,0.1365879222704041,0.95662029202242,0,0.49012698853613834,9.663493605594217,1.8096120666546551,1],
				"geometry": "308f6ab0-0595-43a4-b802-79686df5d57b",
				"material": "00e74b6e-e516-48a2-ba21-1a11b759006f"
			},
			{
				"uuid": "f680dba5-cb43-4fba-98c2-ca339ed6abc6",
				"type": "Mesh",
				"name": "Plane",
				"layers": 1,
				"matrix": [0.6558780737833256,0.5997404876805766,-0.45840516987370317,0,-0.6951570337556802,0.7165870671456093,-0.05709355147175729,0,0.294245901841094,0.35610998671241745,0.8869075637367195,0,0.5810938211622441,7.076841361898039,2.152039993900715,1],
				"geometry": "9e79fc9b-5f06-4f73-b958-a9d52e697d31",
				"material": "7a15a059-fbb3-4f96-95db-452490763cfa"
			},
			{
				"uuid": "a2de86c2-ed9f-4de6-9ef7-0feb6e95aeba",
				"type": "Mesh",
				"name": "Torus",
				"layers": 1,
				"matrix": [-0.5631583097464175,-0.8263490292627919,0,0,0.8263490292627919,-0.5631583097464175,0,0,0,0,1,0,5.840921393680965,8.937464708578164,-0.47657070465276846,1],
				"geometry": "11dc69f2-c822-400c-9135-371600893d9a",
				"material": "99a42376-fbff-46cd-b607-a340bbd8fcd3"
			},
			{
				"uuid": "da36bc28-395f-4038-8540-a87300360f4b",
				"type": "Mesh",
				"name": "Torus",
				"layers": 1,
				"matrix": [-0.9305145416075613,-0.1888144399627811,0.31383402479401795,0,0.18409778340714608,-0.9818823379404735,-0.04488964897529683,0,0.31662389992141515,0.016005677183149353,0.9484161134736495,0,-5.169990086067127,7.876547130356045,2.02417582952017,1],
				"geometry": "7d0b8fef-9cbd-43bf-beea-b66f82b7de11",
				"material": "99a42376-fbff-46cd-b607-a340bbd8fcd3"
			},
			{
				"uuid": "3565098e-e5f6-4e92-bd4a-eb4322119d40",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.7541067732594363,-0.6567518363310766,0,0,0.6567518363310766,0.7541067732594363,0,0,0,0,1,0,8.25075265793124,9.511442773174428,-0.4830721205415578,1],
				"geometry": "a07cfc4b-8fca-4e14-b3c9-7ce5f2942288",
				"material": "ab65e725-e0b9-4c14-9464-3f7b022a026e"
			},
			{
				"uuid": "81c3dca1-5149-4e0e-985a-54e3611055dc",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.9065562979742274,0.24617629739710528,-0.3428598973387171,0,-0.23025887423276728,0.9692250670509157,0.08708398381566318,0,0.35374641968551757,-2.0816681711721685e-17,0.935341365790949,0,-6.953636139649913,9.454438852046907,2.6487894488530475,1],
				"geometry": "a07cfc4b-8fca-4e14-b3c9-7ce5f2942288",
				"material": "ab65e725-e0b9-4c14-9464-3f7b022a026e"
			},
			{
				"uuid": "696f5680-be63-458a-ab0c-cd7f3c5c3deb",
				"type": "Group",
				"name": "rheand",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.033469840605216294,0,0,1],
				"children": [
					{
						"uuid": "f00e1a11-addf-47ee-a7e2-e38b05d531e6",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-7.541295500018448,11.732179367077773,2.5831243361993996,1],
						"geometry": "2036dd57-e3e6-47db-baa1-99110804f4ce",
						"material": "ea06f315-ba50-4714-8e39-d68670ec97aa"
					},
					{
						"uuid": "f4407d56-f64c-4187-8d23-7e17547ea0ba",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-7.541295500018448,11.732179367077773,3.228255998488909,1],
						"geometry": "131cab26-4bde-40ec-b04d-0f5252b9ce17",
						"material": "ea06f315-ba50-4714-8e39-d68670ec97aa"
					},
					{
						"uuid": "7e06b18f-ee7c-4bec-a9dd-99b7aa451a8e",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.4719698538621195,0.8703372493867816,-0.1405614789877392,0,-0.8341309854379694,-0.4924561628509194,-0.2484198599195142,0,-0.28542942416235173,2.775557561562891e-17,0.9583997307086162,0,-7.000924148476989,12.730118616952002,2.650702066783633,1],
						"geometry": "e8831cdb-058d-4c40-8ca0-04dd9f6f6252",
						"material": "427be20b-a456-4b46-93d7-50a4eda1ad14"
					},
					{
						"uuid": "14b7f0e1-4190-4ab7-bf32-e44948bd555a",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.46803044265242777,0.8703372493867816,0.1531684598095308,0,-0.8271687082342525,-0.4924561628509194,0.2707006756331184,0,0.3110296334252584,2.7755575615628914e-17,0.9504002141894484,0,-7.000924148476989,12.730118616952002,3.0952518329096415,1],
						"geometry": "e8831cdb-058d-4c40-8ca0-04dd9f6f6252",
						"material": "427be20b-a456-4b46-93d7-50a4eda1ad14"
					}]
			},
			{
				"uuid": "cbb65eb9-ef8a-4100-9f07-ee16b8d8324a",
				"type": "Group",
				"name": "lheand",
				"layers": 1,
				"matrix": [-0.9715600935503287,1.51463474322097e-16,-0.23679312621036352,0,1.1898179587457127e-16,1,1.5146347432209703e-16,0,0.23679312621036352,1.1898179587457124e-16,-0.9715600935503287,0,1.760553776238034,-0.495722979182748,0.559143249814583,1],
				"children": [
					{
						"uuid": "2ef9946c-3cb3-404f-8ba7-a2c58b310e4f",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-7.541295500018448,11.732179367077773,2.5831243361993996,1],
						"geometry": "2036dd57-e3e6-47db-baa1-99110804f4ce",
						"material": "ea06f315-ba50-4714-8e39-d68670ec97aa"
					},
					{
						"uuid": "befe5d98-2ec4-4b1b-a8d6-31f7c3baa78e",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-7.541295500018448,11.732179367077773,3.228255998488909,1],
						"geometry": "131cab26-4bde-40ec-b04d-0f5252b9ce17",
						"material": "ea06f315-ba50-4714-8e39-d68670ec97aa"
					},
					{
						"uuid": "ef419dca-d9a8-4773-8678-53dace85684e",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.4719698538621195,0.8703372493867816,-0.1405614789877392,0,-0.8341309854379694,-0.4924561628509194,-0.2484198599195142,0,-0.28542942416235173,2.775557561562891e-17,0.9583997307086162,0,-7.000924148476989,12.730118616952002,2.650702066783633,1],
						"geometry": "e8831cdb-058d-4c40-8ca0-04dd9f6f6252",
						"material": "427be20b-a456-4b46-93d7-50a4eda1ad14"
					},
					{
						"uuid": "1048c19e-b14b-4174-8057-d34a90dd33f6",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.46803044265242777,0.8703372493867816,0.1531684598095308,0,-0.8271687082342525,-0.4924561628509194,0.2707006756331184,0,0.3110296334252584,2.7755575615628914e-17,0.9504002141894484,0,-7.000924148476989,12.730118616952002,3.0952518329096415,1],
						"geometry": "e8831cdb-058d-4c40-8ca0-04dd9f6f6252",
						"material": "427be20b-a456-4b46-93d7-50a4eda1ad14"
					}]
			},
			{
				"uuid": "8cd56142-2b8c-4523-9f87-e6d1f722678e",
				"type": "Group",
				"name": "teacher's leg1",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"children": [
					{
						"uuid": "16a9e628-bd5a-41c9-9946-42ec856dd1e6",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.08818668910932125,0.1169743754967775,-0.9892118596848072,0,0.003598811001869136,-0.9930370422449887,-0.11774753198558781,0,-0.9960974633153666,-0.013943751520415996,0.08715168024902407,0,0.5422901774312479,0.2919680846430288,4.034619920565162,1],
						"geometry": "fea4bea6-28ae-42a7-9ad1-44ec6b5d2afd",
						"material": "7387e203-8055-4d0d-a6e0-e81d5c8d49be"
					},
					{
						"uuid": "d2a19674-4ccc-4c28-bd0a-5a0396a72be0",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.6571209395415714,-0.8364804659831946,5.4002389247681055,1],
						"geometry": "947f4029-f84b-4735-981f-a9f0627d4174",
						"material": "cda3edd4-fd96-47a7-a83b-36e773d81a7a"
					}]
			},
			{
				"uuid": "79ce8f62-27cc-44f8-bb5e-d4a779855ce2",
				"type": "Group",
				"name": "teacher's leg2",
				"layers": 1,
				"matrix": [0.7813674697369428,0,0.6240712116713026,0,0,1,0,0,-0.6240712116713026,0,0.7813674697369428,0,-0.04916469034455995,0,-0.32945015355479557,1],
				"children": [
					{
						"uuid": "d13859ca-145c-4d2f-bfd4-1fa5f5a614f1",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.08818668910932125,0.1169743754967775,-0.9892118596848072,0,0.003598811001869136,-0.9930370422449887,-0.11774753198558781,0,-0.9960974633153666,-0.013943751520415996,0.08715168024902407,0,0.5422901774312479,0.2919680846430288,4.034619920565162,1],
						"geometry": "fea4bea6-28ae-42a7-9ad1-44ec6b5d2afd",
						"material": "7387e203-8055-4d0d-a6e0-e81d5c8d49be"
					},
					{
						"uuid": "74f93823-eff7-4637-976f-93d8ed7c4598",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.6571209395415714,-0.8364804659831946,5.4002389247681055,1],
						"geometry": "947f4029-f84b-4735-981f-a9f0627d4174",
						"material": "cda3edd4-fd96-47a7-a83b-36e773d81a7a"
					}]
			},
			{
				"uuid": "2d6ac257-ccf3-4229-b8d7-ccc2043603e9",
				"type": "Group",
				"name": "teacher's leg3",
				"layers": 1,
				"matrix": [0.0313333543457156,0,0.9995089899072673,0,0,1,0,0,-0.9995089899072673,0,0.0313333543457156,0,0.26586551483640575,0,-0.31299858297938643,1],
				"children": [
					{
						"uuid": "301b0e09-4540-43cb-94d0-4ac86f20c734",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.08818668910932125,0.1169743754967775,-0.9892118596848072,0,0.003598811001869136,-0.9930370422449887,-0.11774753198558781,0,-0.9960974633153666,-0.013943751520415996,0.08715168024902407,0,0.5422901774312479,0.2919680846430288,4.034619920565162,1],
						"geometry": "fea4bea6-28ae-42a7-9ad1-44ec6b5d2afd",
						"material": "7387e203-8055-4d0d-a6e0-e81d5c8d49be"
					},
					{
						"uuid": "31040eb7-aced-455b-8581-e12eb294ec2c",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.6571209395415714,-0.8364804659831946,5.4002389247681055,1],
						"geometry": "947f4029-f84b-4735-981f-a9f0627d4174",
						"material": "cda3edd4-fd96-47a7-a83b-36e773d81a7a"
					}]
			},
			{
				"uuid": "58142c2e-6be1-40b4-879d-15196a3ffc18",
				"type": "Group",
				"name": "teacher's leg4",
				"layers": 1,
				"matrix": [-0.7399970255475904,-4.0093694252924584e-17,0.6726101413008277,0,-9.062349887154183e-17,1,-4.009369425292456e-17,0,-0.6726101413008277,-9.062349887154184e-17,-0.7399970255475904,0,0.26586551483640575,0,-0.31299858297938643,1],
				"children": [
					{
						"uuid": "93000ba0-1218-4ba1-b6ec-335acaead59e",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.08818668910932125,0.1169743754967775,-0.9892118596848072,0,0.003598811001869136,-0.9930370422449887,-0.11774753198558781,0,-0.9960974633153666,-0.013943751520415996,0.08715168024902407,0,0.5422901774312479,0.2919680846430288,4.034619920565162,1],
						"geometry": "fea4bea6-28ae-42a7-9ad1-44ec6b5d2afd",
						"material": "7387e203-8055-4d0d-a6e0-e81d5c8d49be"
					},
					{
						"uuid": "9a74cb1b-8607-4dbc-a4f2-14f552ca5960",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.6571209395415714,-0.8364804659831946,5.4002389247681055,1],
						"geometry": "947f4029-f84b-4735-981f-a9f0627d4174",
						"material": "cda3edd4-fd96-47a7-a83b-36e773d81a7a"
					}]
			},
			{
				"uuid": "d39002ff-47fb-4b3c-9fa1-052c1f581f1f",
				"type": "Group",
				"name": "teacher's leg5",
				"layers": 1,
				"matrix": [-0.993195944152631,-1.3672633023813103e-16,-0.11645521250147553,0,-1.2163142339326527e-16,1,-1.36726330238131e-16,0,0.11645521250147553,-1.216314233932653e-16,-0.993195944152631,0,0.26586551483640575,0,0.18155893651495703,1],
				"children": [
					{
						"uuid": "7d108211-d064-48ae-8547-c85d23c59e62",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.08818668910932125,0.1169743754967775,-0.9892118596848072,0,0.003598811001869136,-0.9930370422449887,-0.11774753198558781,0,-0.9960974633153666,-0.013943751520415996,0.08715168024902407,0,0.5422901774312479,0.2919680846430288,4.034619920565162,1],
						"geometry": "fea4bea6-28ae-42a7-9ad1-44ec6b5d2afd",
						"material": "7387e203-8055-4d0d-a6e0-e81d5c8d49be"
					},
					{
						"uuid": "2aa2b44b-7490-487d-88c2-1012e296b31e",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.6571209395415714,-0.8364804659831946,5.4002389247681055,1],
						"geometry": "947f4029-f84b-4735-981f-a9f0627d4174",
						"material": "cda3edd4-fd96-47a7-a83b-36e773d81a7a"
					}]
			},
			{
				"uuid": "23876c9d-6ba4-44b6-8c77-d6edcb48693e",
				"type": "Group",
				"name": "teacher's leg6",
				"layers": 1,
				"matrix": [-0.5128308339278376,1.7330015679216133e-17,-0.8584896829740464,0,6.280366392737942e-17,1,-1.7330015679216133e-17,0,0.8584896829740464,-6.280366392737942e-17,-0.5128308339278376,0,0.08504635516573478,0,0.15878237219389746,1],
				"children": [
					{
						"uuid": "a59667bd-fc79-421c-970d-ef4a7e720869",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.08818668910932125,0.1169743754967775,-0.9892118596848072,0,0.003598811001869136,-0.9930370422449887,-0.11774753198558781,0,-0.9960974633153666,-0.013943751520415996,0.08715168024902407,0,0.5422901774312479,0.2919680846430288,4.034619920565162,1],
						"geometry": "fea4bea6-28ae-42a7-9ad1-44ec6b5d2afd",
						"material": "7387e203-8055-4d0d-a6e0-e81d5c8d49be"
					},
					{
						"uuid": "2d01a508-bed7-4e97-a523-db4d69047aef",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.6571209395415714,-0.8364804659831946,5.4002389247681055,1],
						"geometry": "947f4029-f84b-4735-981f-a9f0627d4174",
						"material": "cda3edd4-fd96-47a7-a83b-36e773d81a7a"
					}]
			},
			{
				"uuid": "2309345b-29de-4427-965c-78575996a15d",
				"type": "Group",
				"name": "teacher's leg7",
				"layers": 1,
				"matrix": [0.15528454157106875,1.73300156792231e-17,-0.9878697845106221,0,5.935075840676103e-17,1,2.6872237015997933e-17,0,0.9878697845106221,-6.280366392384735e-17,0.15528454157106875,0,-0.030549458869791213,0,0.07079425216040125,1],
				"children": [
					{
						"uuid": "05acf65c-2a48-4905-adf5-a2ee0aba01ee",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.08818668910932125,0.1169743754967775,-0.9892118596848072,0,0.003598811001869136,-0.9930370422449887,-0.11774753198558781,0,-0.9960974633153666,-0.013943751520415996,0.08715168024902407,0,0.5422901774312479,0.2919680846430288,4.034619920565162,1],
						"geometry": "fea4bea6-28ae-42a7-9ad1-44ec6b5d2afd",
						"material": "7387e203-8055-4d0d-a6e0-e81d5c8d49be"
					},
					{
						"uuid": "c82a69e2-ba15-402d-9ace-d6e226c65ddc",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.6571209395415714,-0.8364804659831946,5.4002389247681055,1],
						"geometry": "947f4029-f84b-4735-981f-a9f0627d4174",
						"material": "cda3edd4-fd96-47a7-a83b-36e773d81a7a"
					}]
			},
			{
				"uuid": "f4001044-6c1e-40ae-8edd-442d8d718644",
				"type": "Group",
				"name": "teacher's leg8",
				"layers": 1,
				"matrix": [0.7292295628391239,1.7330015679223115e-17,-0.6842691317613708,0,3.0337048826848924e-17,1,5.765668317011543e-17,0,0.6842691317613708,-6.280366392384737e-17,0.7292295628391239,0,-0.11898790963066341,0,0.04801613778284164,1],
				"children": [
					{
						"uuid": "32e67e38-4020-4c7b-888e-e047a7d32de8",
						"type": "Mesh",
						"name": "Torus",
						"layers": 1,
						"matrix": [-0.08818668910932125,0.1169743754967775,-0.9892118596848072,0,0.003598811001869136,-0.9930370422449887,-0.11774753198558781,0,-0.9960974633153666,-0.013943751520415996,0.08715168024902407,0,0.5422901774312479,0.2919680846430288,4.034619920565162,1],
						"geometry": "fea4bea6-28ae-42a7-9ad1-44ec6b5d2afd",
						"material": "7387e203-8055-4d0d-a6e0-e81d5c8d49be"
					},
					{
						"uuid": "41b7dce0-074d-446b-8065-db4bc83f1fc4",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.6571209395415714,-0.8364804659831946,5.4002389247681055,1],
						"geometry": "947f4029-f84b-4735-981f-a9f0627d4174",
						"material": "cda3edd4-fd96-47a7-a83b-36e773d81a7a"
					}]
			}]
	}
};

var objpeople={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "62161a5d-5920-446a-b349-2bad7a1fa97a",
			"type": "CylinderGeometry",
			"radiusTop": 1.4,
			"radiusBottom": 1.3,
			"height": 5,
			"radialSegments": 32,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "ce7badf4-f128-48ec-be83-9fc75b56f806",
			"type": "SphereGeometry",
			"radius": 1.3,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "79cf9498-d791-4ff8-9932-1a6d9968dfd8",
			"type": "SphereGeometry",
			"radius": 0.7,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "7c1b711a-8601-4784-a3da-56ec4425fcca",
			"type": "BoxGeometry",
			"width": 0.9,
			"height": 1,
			"depth": 4,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "cec38c8b-6e23-4f43-8d2f-770eab314b9b",
			"type": "BoxGeometry",
			"width": 0.9,
			"height": 1.2,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "a30fdbf8-a699-4993-87c1-5aa86d091e8c",
			"type": "SphereGeometry",
			"radius": 0.7,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		}],
	"materials": [
		{
			"uuid": "2da8cad7-4bd6-4285-af9e-2905de4bdc6f",
			"type": "MeshStandardMaterial",
			"color": 8619153,
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
			"uuid": "c2fc0cde-2e1e-453e-97c7-852b1edc931a",
			"type": "MeshStandardMaterial",
			"color": 8178853,
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
			"uuid": "a926c962-bc27-40c0-b825-ac1e4f795d79",
			"type": "MeshStandardMaterial",
			"color": 8619153,
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
			"uuid": "44fcf2a6-04e1-47c7-a801-80d5b25a924b",
			"type": "MeshStandardMaterial",
			"color": 3026744,
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
			"uuid": "52396e09-2723-4d75-b136-1404d29f3398",
			"type": "MeshStandardMaterial",
			"color": 3026744,
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
		"uuid": "8ec177c3-9ece-4e35-82c8-91b76bcedcb4",
		"type": "Group",
		"name": "Group",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "c57d178d-1948-46c6-8028-b64bda3b7260",
				"type": "Group",
				"name": "head",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"children": [
					{
						"uuid": "82a74bab-1171-4e4c-9cd1-b54921b91195",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,5.753387613809942,0,1],
						"geometry": "62161a5d-5920-446a-b349-2bad7a1fa97a",
						"material": "2da8cad7-4bd6-4285-af9e-2905de4bdc6f"
					},
					{
						"uuid": "bca3a7ef-0a9e-4ef0-8705-a4fb7cf06235",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,10.231667119952286,0,1],
						"geometry": "ce7badf4-f128-48ec-be83-9fc75b56f806",
						"material": "c2fc0cde-2e1e-453e-97c7-852b1edc931a"
					},
					{
						"uuid": "38d2b129-264c-4beb-ada1-93745eca34b0",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,3,5.9577204083060815,0,1],
						"geometry": "79cf9498-d791-4ff8-9932-1a6d9968dfd8",
						"material": "a926c962-bc27-40c0-b825-ac1e4f795d79"
					},
					{
						"uuid": "7ad8259a-2239-4dcf-82ea-eb540fd85093",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-3,5.9577204083060815,0,1],
						"geometry": "79cf9498-d791-4ff8-9932-1a6d9968dfd8",
						"material": "a926c962-bc27-40c0-b825-ac1e4f795d79"
					},
					{
						"uuid": "eadcfe53-2bda-4d8c-af53-c528b8d688f8",
						"type": "Group",
						"name": "gun",
						"layers": 1,
						"matrix": [-1,0,1.2246467991473532e-16,0,0,1,0,0,-1.2246467991473532e-16,0,-1,0,0,0.3127129739041754,0,1],
						"children": [
							{
								"uuid": "95b075d5-15dc-4894-9488-710b329c1e86",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,3,6.7528104885086355,-1.94455252752262,1],
								"geometry": "7c1b711a-8601-4784-a3da-56ec4425fcca",
								"material": "44fcf2a6-04e1-47c7-a801-80d5b25a924b"
							},
							{
								"uuid": "1cb12e12-7ae8-40b7-94e6-7a8fddbe2a56",
								"type": "Mesh",
								"name": "Box",
								"layers": 1,
								"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,3,5.943407966021903,-0.43521623874936344,1],
								"geometry": "cec38c8b-6e23-4f43-8d2f-770eab314b9b",
								"material": "52396e09-2723-4d75-b136-1404d29f3398"
							}]
					}]
			},
			{
				"uuid": "68554cd3-69db-4e1e-a21c-28bcb570d0f9",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.8,1.050443114307209,-3.2186916853969416,1],
				"geometry": "79cf9498-d791-4ff8-9932-1a6d9968dfd8",
				"material": "a926c962-bc27-40c0-b825-ac1e4f795d79"
			},
			{
				"uuid": "0eb5638b-8f53-4638-8204-60922522e9b8",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.8,1.050443114307209,-3.219,1],
				"geometry": "a30fdbf8-a699-4993-87c1-5aa86d091e8c",
				"material": "a926c962-bc27-40c0-b825-ac1e4f795d79"
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
ground.position.y=-5.5;
world3D.scene.add(ground);

var logo=new TEACHER.ObjPicPlane(60,60/8,pics.logo,'z',2);
logo.position.z=-48;
logo.position.y=20;
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
