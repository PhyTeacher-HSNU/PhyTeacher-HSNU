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
var allGun;
var gunPosZ=35;

var PINNED= [];
var RUNNING=false;

var NN=100;
var hNN=NN*3/5;
var pts;
var ptsPosZ=-45;
var uNowX=[];
var uOldX=[];
var uNowY=[];
var uOldY=[];
var sMoveDir=0;
var yS=0;
var mouseButtonDown=false;
var cc=0.3;
var dt=1;
var dx=1;
var endMD=0;

var bullet;
var score;
var scoreNum=0;
var timer;
var totalTimeChoice=[30,20,10];
var gameOverText=["沃!加油","不錯嘛!","超強耶!!"];
var totalTime=totalTimeChoice[2];
var timerInterval=0;
var bStart = false;
var targetNum=10;
//var target;
var targetPosZ=ptsPosZ-0.2;
var targetArray=[];
var targetArrayX=[];
var targetArrayY=[];
var bombSize = 5;

var countDown;
var countDownNum=4;//倒數3秒
var countDownInterval=0;

var ball;
var rr=8;
var dt=0.8;
var ballText;
var bGameOver=false;
var bPlaying=false;
var totalTimeIdx = 1;

var sound1,sound2;

var myName;

var Introduction1,Introduction2,Introduction3;

document.addEventListener('mousedown', down);
document.addEventListener('mouseup', up);
function down(e) {
  	mouseButtonDown=true;
	RUNNING = true;

}
function up(e) {
  	mouseButtonDown=false;
	RUNNING=false;
}

function showTimer(){
	totalTime-=1;
	timer.setText("時間"+totalTime);
	if(totalTime==0){
		world2D.btn01.setLabel('遊戲開始');
		clearInterval(timerInterval);
		bStart=false;
		bGameOver=true;
		var endNum=1;
		if (scoreNum<=3) endNum=0;
		else if (scoreNum>=7) endNum=2;
		console.log(scoreNum + " , " + endNum + " , " + gameOverText[endNum]);
		ballText.setText(gameOverText[endNum]);
		ball.visible=true;
		countDown.setText("Time's Up");
		sound2.currentTime=0;
		sound2.play();
		countDown.visible=true;	
	}
}

function clickBtn(e){
	var str=e.target.parent.name;
	if (str=="btn01"){
		if (!bPlaying){

		resetGame();
		world2D.btn01.setLabel('遊戲中');
		bPlaying = true;
		if (countDownInterval==0)
			countDownInterval=setInterval(showCountDown,1000);
		}	
	}else if (str=="btn02"){
		bPlaying=false;
		clearInterval(countDownInterval);
		clearInterval(timerInterval);
		countDown.visible=false;
		resetGame();
	}
}

function showCountDown(){
	countDownNum-=1;
	countDown.visible=true;
	countDown.setText(countDownNum);
	if(countDownNum==-1){
		clearInterval(countDownInterval);
		countDown.visible=false;
		bStart=true;
		if (timerInterval==0)
			timerInterval=setInterval(showTimer,1000);
	}
}

//B.定義init
function init(){
	Introduction1=new TEACHER.ObjTextPlane(30,4,"0~3分 沃!加油","z",0xffffe0);
	scene.add(Introduction1);
	Introduction1.position.y=3;
	Introduction1.position.x=-45;

	Introduction2=new TEACHER.ObjTextPlane(30,4,"4~7分 不錯嘛!","z",0xffffe0);
	scene.add(Introduction2);
	Introduction2.position.y=-1;
	Introduction2.position.x=-45;

	Introduction3=new TEACHER.ObjTextPlane(30,4,"8~10分 超強耶!!","z",0xffffe0);
	scene.add(Introduction3);
	Introduction3.position.y=-5;
	Introduction3.position.x=-45;


	myName=new TEACHER.ObjTextPlane(60,10,"1590簡郁珊(｡◕∀◕｡)","z",0xf5c738);
	scene.add(myName);
	myName.position.y=-20;
	myName.position.x=-35;

	sound1=new Audio('allData/wav/boom!.wav');
	sound2=new Audio('allData/wav/ending.wav');

	ball=new TEACHER.ObjSphere(rr,0x014f7d,2);
	scene.add(ball);
	ball.scale.x=2;
	ball.position.y=30;
	ball.ax=0;
	ball.ay=-5;
	ball.az=0;
	
	ball.vx=0;
	ball.vy=0;
	ball.vz=0;

	ballText=new TEACHER.ObjTextPlane(60,10,"再試試看",'z',0xffc9a7);
	ball.add(ballText);
	ballText.position.z=8.1;
	
	world2D.sl01.visible=world2D.sl02.visible=world2D.sl03.visible=false;
	world2D.btnUp.visible=world2D.btnDown.visible=world2D.btnLeft.visible=world2D.btnRight.visible=false;

	world2D.ch01.setLabel("一塊蛋糕等級");
	world2D.ch02.setLabel("普通等級");
	world2D.ch03.setLabel("大魔王∩(^o^)⊃━.*･");
	
	countDown=new TEACHER.ObjTextPlane(80,20,countDownNum,'z',0x00529b,0xffaf00);
	scene.add(countDown);
	countDown.position.y=10;
	countDown.position.z=1;

	score=new TEACHER.ObjTextPlane(60,10,"000",'z',0xffcc00);
	scene.add(score);
	score.position.x=-45;
	score.position.y=20;
	

	bullet= new TEACHER.ObjSphere(0.8,0xff0000,2);
	scene.add(bullet);
	bullet.position.z=-45;
	
	loader=new THREE.ObjectLoader();
	allGun=loader.parse(objjson);
	allGun.scale.x=6;
	allGun.scale.y=6;
	allGun.scale.z=6;
	allGun.rotation.y=3*Math.PI/2;
	allGun.position.z=gunPosZ;
	scene.add(allGun);

	world2D.btn01.setLabel('遊戲開始');
	world2D.btn02.setLabel('重新載入');
	world2D.btn01.on('click',clickBtn);
	world2D.btn02.on('click',clickBtn);

	world2D.ch01.on('click',checkedBtn01);
	world2D.ch02.on('click',checkedBtn02);
	world2D.ch03.on('click',checkedBtn03);
	
	pts=new TEACHER.Points(0xffffff,1.2);
	scene.add(pts);
	pts.position.z=ptsPosZ;
	var idx=0;
	var xx=0;
	var yy=0;
  	for (var ix=0;ix<NN;ix++) {	
		xx=-50+NN*ix/NN;	
    	for (var iy=0;iy<hNN;iy++) {
			idx=ix*hNN+iy;
     		yy=-30+hNN*iy/hNN;
      		pts.addPoint(xx,yy,0); 

			uOldX[idx] = xx+Math.random(-4,4); 
			uNowX[idx] = xx;
			uOldY[idx] = yy+Math.random(-4,4); 
			uNowY[idx] = yy;
			PINNED[idx] = false;
		}
	}	
	pts.update();	
	world2D.ch02.checked=true;
	totalTime=totalTimeChoice[totalTimeIdx];
	noChange();	
	var strTimeData= "時間" + totalTime;
	timer=new TEACHER.ObjTextPlane(60,10,strTimeData,'z',0xffcc00);
	scene.add(timer);
	timer.position.x=-45;
	timer.position.y=10;	

	scoreNum=0;
	ball.visible=false;
	countDown.visible=false;
	var currTargetX, currTargetY;
	for (var i=0;i<targetNum;i++) {
		var bFind = false;
		var idx=0;
		while (!bFind)
		{
			bFind = true;
			idx=0;
			currTargetX = getRandomInt(-40,40);
			currTargetY = getRandomInt(-25,25);
			
			for (var j=0;j<i;j++) {
				idx++;
				if ((Math.abs(currTargetX - targetArrayX[j])<=bombSize*2) && (Math.abs(currTargetY - targetArrayY[j])<=bombSize*2))
				{
					bFind=false;
					break;
				}
			}
		}
		targetArrayX[i]=currTargetX;
		targetArrayY[i]=currTargetY;
	}
	for (var i=0;i<10;i++) {
		var target=new TEACHER.ObjBox(bombSize*2,bombSize*2,0.1,0xb0e0e6,2);
		targetArray.push(target);
		targetArray[i].mat.color.setHSL(i*0.1,0.3,0.55);
		scene.add(target);
		target.position.x=targetArrayX[i];
		target.position.y=targetArrayY[i];
		target.position.z=targetPosZ;
	}
	setInterval(tick,10000/fps); 	 
}

function resetGame(){
	var idx=0;
	var xx=0;
	var yy=0;
  	for (var ix=0;ix<NN;ix++) {	
		xx=-50+NN*ix/NN;	
    	for (var iy=0;iy<hNN;iy++) {
			idx=ix*hNN+iy;
     		yy=-30+hNN*iy/hNN;
    
			uOldX[idx] = xx+Math.random(-4,4); 
			uNowX[idx] = xx;
			uOldY[idx] = yy+Math.random(-4,4); 
			uNowY[idx] = yy;
			PINNED[idx] = false;
			pts.setPoint(idx,uNowX[idx],uNowY[idx],0);
		}
	}	
	RUNNING=false;
	bStart=false;
	countDownInterval=0;
	timerInterval=0;
	countDownNum=4;
	scoreNum=0;
	totalTime=totalTimeChoice[totalTimeIdx];	
	timer.setText("時間"+totalTime);
	world2D.btn01.setLabel('遊戲開始');
	noChange();
	ball.visible=false;
	countDown.visible=false;
	bGameOver=false;
	bPlaying=false; 
	var currTargetX, currTargetY;
	for (var i=0;i<targetNum;i++) {
		var bFind = false;
		var idx=0;
		while (!bFind)
		{
			bFind = true;
			idx=0;
			currTargetX = getRandomInt(-40,40);
			currTargetY = getRandomInt(-25,25);
			
			for (var j=0;j<i;j++) {
				idx++;
				if ((Math.abs(currTargetX - targetArrayX[j])<=bombSize*2) && (Math.abs(currTargetY - targetArrayY[j])<=bombSize*2))
				{
					bFind=false;
					break;
				}
			}
		}
		targetArrayX[i]=currTargetX;
		targetArrayY[i]=currTargetY;
	}
	for (var i=0;i<10;i++) {
		targetArray[i].mat.color.setHSL(i*0.1,0.3,0.55);
		targetArray[i].position.x=targetArrayX[i];
		targetArray[i].position.y=targetArrayY[i];
		targetArray[i].position.z=targetPosZ;
		targetArray[i].visible=true;
	}
}
//C.定義tick                                                                                                                       
function tick(){
	if (bGameOver){
		ball.vx+=ball.ax*dt;
		ball.vy+=ball.ay*dt;
		ball.vz+=ball.az*dt;

		ball.position.x+=ball.vx*dt;
		ball.position.y+=ball.vy*dt;
		ball.position.z+=ball.vz*dt;

		if(ball.position.y>40-rr && ball.vy>0){
			ball.vy*=-0.8;
			ball.position.y+=ball.vy*dt;

		}else if(ball.position.y<rr && ball.vy<-1){
			ball.vy*=-0.8;
			ball.position.y+=ball.vy*dt;
		}
		if(ball.position.y<-5){
			ball.position.y=-4;
		}
	}

	score.setText("分數"+scoreNum);
	
	var vecM=getMouse3D('z',gunPosZ);
	allGun.position.x=vecM.x;
	allGun.position.y=vecM.y;
	
	bullet.position.x=vecM.x;
	bullet.position.y=vecM.y;

	if ((mouseButtonDown) && RUNNING && bStart && bPlaying) {
		mouseButtonDown = false;
		explosionEffect();
		sound1.currentTime=0;
		sound1.play();
		setTimeout("checkIfSuccess(" + vecM.x + ","+vecM.y+")",0);
	}
	pts.update();
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function checkIfSuccess(currMouseX,currMouseY){
	var xBing=false;
	var yBing=false;
	var currTargetX;
	var currTargetY;
	for (var i=0;i<10;i++) {
		xBing=false;
	    yBing=false;
		currTargetX=parseInt(targetArrayX[i], 10);	
		currTargetY=parseInt(targetArrayY[i], 10);
		if(currMouseX>=currTargetX-4 && currMouseX<=currTargetX+4){
			xBing=true;
		}
		
		if(currMouseY>=currTargetY-4 && currMouseY<=currTargetY+4){
			yBing=true;
		}
		
		if(xBing==true && yBing==true && targetArray[i].visible){
			targetArray[i].visible=false;
			scoreNum++;
		}
	}

}

function explosionEffect() {
	var vecM = getMouse3D("z",ptsPosZ);
	var mouseX, mouseY;
	mouseX = vecM.x;
	mouseY = vecM.y;
	var dista;
	var idx;
	for (var ix=0;ix<NN;ix++) {		
		for (var iy=0;iy<hNN;iy++) {
			idx=ix*hNN+iy;
			var pt=pts.getPoint(idx);
       			dista=Math.sqrt(((mouseX-uNowX[idx])*(mouseX-uNowX[idx]))+((mouseY-uNowY[idx])*(mouseY-uNowY[idx])));
			if (dista<=bombSize && PINNED[idx]==false) {
				var  dx,dy, dist, diff, percent, offx, offy;
  				dx=uNowX[idx]-mouseX;
  				dy=uNowY[idx]-mouseY;
  				dist=Math.sqrt((dx*dx)+(dy*dy));
  				diff=5;
  				percent=diff/dist;
  				offx=dx*percent;
  				offy=dy*percent;
  				uNowX[idx]+=offx;
  				uNowY[idx]+=offy;    
				pts.setPoint(idx,uNowX[idx],uNowY[idx],pt.z);
			} 
     		}
	} 
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function checkedBtn01(){
	if(bPlaying==false){	
		if(world2D.ch01.checked==true){
			totalTimeIdx = 0;
			totalTime=totalTimeChoice[0];
			world2D.ch02.checked=false;
			world2D.ch03.checked=false;
			timer.setText("時間"+totalTime);
		}
	}else{
		noChange();
	}
}
function checkedBtn02(){
	if(bPlaying==false){	
		if(world2D.ch02.checked==true){
			totalTimeIdx = 1;
			totalTime=totalTimeChoice[1];
			world2D.ch01.checked=false;
			world2D.ch03.checked=false;
			timer.setText("時間"+totalTime);
		}
	}else{
		noChange();
	}
}

function checkedBtn03(){
	if(bPlaying==false){	
		if(world2D.ch03.checked==true){
			totalTimeIdx = 2;
			totalTime=totalTimeChoice[2];
			world2D.ch01.checked=false;
			world2D.ch02.checked=false;
			timer.setText("時間"+totalTime);
		}
	}else{
		noChange();
	}
}
function noChange(){
	world2D.ch01.checked=false;
	world2D.ch02.checked=false;
	world2D.ch03.checked=false;
	if (totalTimeIdx==0)
		world2D.ch01.checked=true;
	else if (totalTimeIdx==1)
		world2D.ch02.checked=true;	
	else if (totalTimeIdx==2)
		world2D.ch03.checked=true;	
}

//resize
MyJS.myResize();





var objjson=
{
	"metadata": {
		"version": 4.6,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "2c581af9-99f3-4f27-b588-2fc5178a4eee",
			"type": "BoxGeometry",
			"width": 5,
			"height": 1,
			"depth": 0.7,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "d71c305e-4e23-4bdb-9e12-c2aa6937bac4",
			"type": "BoxGeometry",
			"width": 3,
			"height": 0.5,
			"depth": 0.9,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "cfa57090-04cf-439f-9367-76e5145fddf0",
			"type": "TorusGeometry",
			"radius": 0.12,
			"tube": 0.1,
			"radialSegments": 9,
			"tubularSegments": 5,
			"arc": 6.283185307179586
		},
		{
			"uuid": "d65c060d-5df5-42f6-93d8-929113ac056d",
			"type": "TorusGeometry",
			"radius": 0.6,
			"tube": 0.2,
			"radialSegments": 12,
			"tubularSegments": 48,
			"arc": 6.283185307179586
		},
		{
			"uuid": "d0ee0129-d675-4851-8417-fefa27973b38",
			"type": "BoxGeometry",
			"width": 1,
			"height": 2.5,
			"depth": 0.6,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		}],
	"materials": [
		{
			"uuid": "ee015c0d-a22e-48e8-8bb8-70a31e9bdac4",
			"type": "MeshPhysicalMaterial",
			"color": 5254663,
			"roughness": 1,
			"metalness": 0,
			"sheen": 0,
			"sheenColor": 0,
			"sheenRoughness": 1,
			"emissive": 8077890,
			"specularIntensity": 1,
			"specularColor": 16777215,
			"clearcoat": 0,
			"clearcoatRoughness": 0,
			"iridescence": 0,
			"iridescenceIOR": 1.3,
			"iridescenceThicknessRange": [100,400],
			"anisotropy": 0,
			"anisotropyRotation": 0,
			"envMapIntensity": 1,
			"reflectivity": 0.49999999999999983,
			"transmission": 0,
			"thickness": 0,
			"attenuationColor": 16777215,
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
			"uuid": "2e12e874-39b0-4cdd-8010-20c969d84c21",
			"type": "MeshPhysicalMaterial",
			"color": 5460219,
			"roughness": 1,
			"metalness": 0,
			"sheen": 0,
			"sheenColor": 0,
			"sheenRoughness": 1,
			"emissive": 0,
			"specularIntensity": 1,
			"specularColor": 16777215,
			"clearcoat": 0,
			"clearcoatRoughness": 0,
			"iridescence": 0,
			"iridescenceIOR": 1.3,
			"iridescenceThicknessRange": [100,400],
			"anisotropy": 0,
			"anisotropyRotation": 0,
			"envMapIntensity": 1,
			"reflectivity": 0.49999999999999983,
			"transmission": 0,
			"thickness": 0,
			"attenuationColor": 16777215,
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
			"uuid": "23637566-f84b-421f-b612-6f42993df890",
			"type": "MeshPhysicalMaterial",
			"color": 11250603,
			"roughness": 1,
			"metalness": 0,
			"sheen": 0,
			"sheenColor": 0,
			"sheenRoughness": 1,
			"emissive": 866644,
			"emissiveIntensity": 0.5,
			"specularIntensity": 1,
			"specularColor": 16777215,
			"clearcoat": 0,
			"clearcoatRoughness": 0,
			"iridescence": 0,
			"iridescenceIOR": 1.3,
			"iridescenceThicknessRange": [100,400],
			"anisotropy": 0,
			"anisotropyRotation": 0,
			"envMapIntensity": 1,
			"reflectivity": 0.49999999999999983,
			"transmission": 0,
			"thickness": 0,
			"attenuationColor": 16777215,
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
			"uuid": "2950dbd7-9a79-4322-8ec7-5472a96dda85",
			"type": "MeshPhysicalMaterial",
			"color": 5460219,
			"roughness": 1,
			"metalness": 0,
			"sheen": 0,
			"sheenColor": 0,
			"sheenRoughness": 1,
			"emissive": 0,
			"specularIntensity": 1,
			"specularColor": 16777215,
			"clearcoat": 0,
			"clearcoatRoughness": 0,
			"iridescence": 0,
			"iridescenceIOR": 1.3,
			"iridescenceThicknessRange": [100,400],
			"anisotropy": 0,
			"anisotropyRotation": 0,
			"envMapIntensity": 1,
			"reflectivity": 0.49999999999999983,
			"transmission": 0,
			"thickness": 0,
			"attenuationColor": 16777215,
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
			"uuid": "c4803589-6a92-4e49-aef6-9bd71f574111",
			"type": "MeshPhysicalMaterial",
			"color": 5254663,
			"roughness": 1,
			"metalness": 0,
			"sheen": 0,
			"sheenColor": 0,
			"sheenRoughness": 1,
			"emissive": 0,
			"specularIntensity": 1,
			"specularColor": 16777215,
			"clearcoat": 0,
			"clearcoatRoughness": 0,
			"iridescence": 0,
			"iridescenceIOR": 1.3,
			"iridescenceThicknessRange": [100,400],
			"anisotropy": 0,
			"anisotropyRotation": 0,
			"envMapIntensity": 1,
			"reflectivity": 0.49999999999999983,
			"transmission": 0,
			"thickness": 0,
			"attenuationColor": 16777215,
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
		"uuid": "0baa2a39-56cb-43b7-a582-3bfda4bfa098",
		"type": "Group",
		"name": "gun",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.9981819897856199,2,0,1],
		"up": [0,1,0],
		"children": [
			{
				"uuid": "950fcf12-50c1-4dc5-bcf3-5d496ec699bb",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.999,0.5,0,1],
				"up": [0,1,0],
				"geometry": "2c581af9-99f3-4f27-b588-2fc5178a4eee",
				"material": "ee015c0d-a22e-48e8-8bb8-70a31e9bdac4"
			},
			{
				"uuid": "f0defed6-934c-4595-89ff-5987cc668474",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-1.277,0.103,0,1],
				"up": [0,1,0],
				"geometry": "d71c305e-4e23-4bdb-9e12-c2aa6937bac4",
				"material": "2e12e874-39b0-4cdd-8010-20c969d84c21"
			},
			{
				"uuid": "83a7f1e7-bc9a-4e04-81ec-0e8334aa4e9d",
				"type": "Mesh",
				"name": "Torus",
				"layers": 1,
				"matrix": [1.1102230246251565e-16,0.3255681544571567,-0.9455185755993168,0,-5.551115123125783e-17,0.9455185755993168,0.3255681544571567,0,1,0,1.1102230246251565e-16,0,-3.494,0.599,0.015227458606165423,1],
				"up": [0,1,0],
				"geometry": "cfa57090-04cf-439f-9367-76e5145fddf0",
				"material": "23637566-f84b-421f-b612-6f42993df890"
			},
			{
				"uuid": "6c01175c-3768-448a-8491-4514b0aae9c6",
				"type": "Mesh",
				"name": "Torus",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,-0.26570122795023354,-0.117,0,1],
				"up": [0,1,0],
				"geometry": "d65c060d-5df5-42f6-93d8-929113ac056d",
				"material": "2950dbd7-9a79-4322-8ec7-5472a96dda85"
			},
			{
				"uuid": "53890f2c-5815-47d3-b1ea-3fe7c6655fd7",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0.5,-0.75,0,1],
				"up": [0,1,0],
				"geometry": "d0ee0129-d675-4851-8417-fefa27973b38",
				"material": "c4803589-6a92-4e49-aef6-9bd71f574111"
			}]
	}
}
;











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
	//t.translate( 0, _h/2, 0 );
	t.mesh=new THREE.Mesh(t.geo , t.mat);
	if(_dir==="x"){
		t.mesh.rotation.z=-0.5*Math.PI;
	}else if(_dir==="z"){
		t.mesh.rotation.x=0.5*Math.PI;
	}
	t.geo.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -_h/2, 0 ));
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
skyBox.visible=false;

//ground地板
var ground=new TEACHER.ObjPicPlane(100,100,pics.ground,'y');
ground.visible=false;
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
