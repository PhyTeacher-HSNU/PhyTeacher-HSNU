'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log
var ballN=16
var speedchange=0
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 認識陣列：
	(1) var tempArray=[1,2,3,4,5,6,7,8,9,10];
	    log(tempArray[5]) 會輸出什麼？
	(2) 用 for迴圈, push 的方式創造一個 20 格的陣列，放 1~20
	(3) tick 時，每個元素都加上自己，再輸出。

2. 產生多球：
	(1)用 for 迴圈 new TEACHER.ObjSphere(rr,0xff0000) 產生20顆球，
	   放在舞台上，也 push 到 ballArray
	(2)讓第8顆向右走
	(3)改成100顆，排成方陣，tick 時，ball 走 10 以內的亂數。

3. 撞牆反彈：
	(1)仿造密室小球，讓每一顆球都，撞牆反彈
	(2)用老師幫你寫好的 new TEACHER.ObjArrow()加入箭頭，
	   用 .setArrow(x,y,z)顯示速度。
	

4. 彼此彈性碰撞：
	老師幫你寫好的function collision(ballA,ballB,distance)，可以判斷兩個 ball 是否太近，
	太近時會彈性碰撞，在最下面。

*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var gamemd=0
var whiteball
var ballarray=new Array()
var winplane
var wall
var mposition3d=getMouse3D()
var mposition2dx
var mposition2dy
var vvx=0
var vvz=0
var vx=0
var vz=0
var theta=0
var vtheta=0
var rr=25
var shootarrow
var gamemdback=0
var vrr=0
var seemd=0
var vchange=0
var ball1
var loader 
var alltable
var ww1
var ww2
var ww3
var score=0
var shoottimes=0
var scoreplane
var scoreplane1
var shootplane
var shootplane1
var vectorroll

//B.定義init

function init(){
	
	

	whiteball=new TEACHER.ObjSphere(5,0xffffff)	
	loader=new THREE.ObjectLoader();
	alltable = loader.parse(table);
	scene.add(alltable)
	
	
	ballarray.push(whiteball)
	ballarray[0].vx=0
	ballarray[0].vz=0
	ballarray[0].vy=0
	
	scene.add(whiteball)
	
	
	
	
	
	
	
	ballarray[0].position.y=5
	ballarray[0].position.x=70

	logo.position.y=30
	logo.position.z=-140
	logo.position.x=120	
	wall=new TEACHER.ObjBox(2,0xff0000)
	shootarrow=new TEACHER.ObjArrow(2,0xff0000)
	scene.add(shootarrow)
	world2D.slCameraRR.maximum=400
	world2D.slCameraRR.minimum=30
	world2D.slCameraRR.value=400
	setInterval(tick,1000/fps);
	shootarrow.position.y=whiteball.position.y
	world2D.btn02.setLabel('瞄準')
	world2D.btn01.setLabel('開球')
	world2D.sl01.minimum=1
	var name=new TEACHER.ObjTextPlane(200,20,'1545 20張博崴','z')
	scene.add(name)
	name.position.z=-99
	name.position.x=70
	name.position.y=10
	world2D.sl01.maximum=10
	world2D.sl01.value=5
	world2D.sl01.setLabel('轉向靈敏度')
	world2D.ch01.setLabel('跟隨白球')
	world2D.ch01.checked=true
	world2D.ch01.visible=false
	scoreplane=new TEACHER.ObjTextPlane(20,20,'z')
	scene.add(scoreplane)
	scoreplane.position.y=30
	scoreplane.position.z=-140
	scoreplane.position.x=25
	scoreplane1=new TEACHER.ObjTextPlane(70,20,'進洞球數','z')
	scoreplane1.position.y=30
	scoreplane1.position.z=-140
	scoreplane1.position.x=-15
	scene.add(scoreplane1)
	shootplane=new TEACHER.ObjTextPlane(20,20,'z')
	scene.add(shootplane)
	shootplane.position.y=50
	shootplane.position.z=-140
	shootplane.position.x=25
	shootplane1=new TEACHER.ObjTextPlane(70,20,'已用桿數','z')
	shootplane1.position.y=50
	shootplane1.position.z=-140
	shootplane1.position.x=-15
	scene.add(shootplane1)
	winplane=new TEACHER.ObjTextPlane(70,20,'WIN','z')
	winplane.position.y=0
	winplane.position.z=150
	winplane.position.x=0
	scene.add(winplane)
	world2D.sl02.visible=false
	world2D.sl03.visible=false
	world2D.ch02.visible=false
	
	winplane.visible=false
	for(var i=0;i<15;i++){
		var pp=barray[i]
		var ball1=new TEACHER.ObjPicSphere(5,pp)	
		ballarray.push(ball1)
		
		scene.add(ball1)
		
		
	}
	
	var ii=15
	for(var i=0;i<5;i++){
		for(var j=0;j<5-i;j++){

			ballarray[ii].position.x=-(5-i)*12-50
			ballarray[ii].position.z=6*(5-i)-j*12-5
			ballarray[ii].position.y=5
			ballarray[ii].vx=0
			ballarray[ii].vz=0
			ballarray[ii].vy=0		
			ii-=1
		}

	}
	

	setInterval(tick,1000/fps);
}


var tt=0

//C.定義tick                                                                                                                       
function tick(){
	scoreplane.setText(score)
	shootplane.setText(shoottimes)
	
	if(world2D.ch01.checked===true){
		world3D.cameraTarget.x=ballarray[0].position.x
		world3D.cameraTarget.z=ballarray[0].position.z
		world3D.cameraTarget.y=10
	}else{
		world3D.cameraTarget.x=0
		world3D.cameraTarget.y=5
		world3D.cameraTarget.z=0
	}
	
		
	
	if((-theta+Math.PI/2-world3D.cameraPhi-Math.PI)*(-theta+Math.PI/2-world3D.cameraPhi-Math.PI)<0.0001&&seemd===1){
		seemd=2
		world2D.btn02.setLabel('back')
	}
	if(seemd===3){
		seemd=0
		world2D.btn01.visible=true

		
	}	
	
	if(seemd===2){
		world3D.cameraPhi=-theta+Math.PI/2-Math.PI

		shootarrow.visible=true
		world2D.btn02.visible=true
		world2D.btnUp.visible=true
		world2D.btnDown.visible=true
		world2D.btnLeft.visible=true
		world2D.btnRight.visible=true

	}
	if(seemd===1){
		world3D.cameraPhi+=vchange
	}
	if(rr<=100&&vrr>0){
		rr+=vrr
	}
	if(rr>=10&&vrr<0){
		rr+=vrr
	}
	
	theta+=vtheta
	shootarrow.position.x=ballarray[0].position.x
	shootarrow.position.z=ballarray[0].position.z
	shootarrow.position.y=ballarray[0].position.y
	shootarrow.setArrow(vvx,0,vvz)
	world2D.btn01.on('click',clickbtn)	
	world2D.btn02.on('click',clickbtn)	
	world2D.btnLeft.on('mousedown',clickbtn)	
	world2D.btnRight.on('mousedown',clickbtn)
	world2D.btnUp.on('mousedown',clickbtn)
	world2D.btnDown.on('mousedown',clickbtn)
	world2D.on('pressup',up2d)
	gamemdback=0
	for(var i=1;i<ballN;i++){
		if(ballarray[i].vx*ballarray[i].vx+ballarray[i].vz*ballarray[i].vz<0.01){
			ballarray[i].vx=0
			ballarray[i].vz=0
		}else{
			gamemdback+=1
		}
	}
	

	
	if(ballarray[0].vx*ballarray[0].vx+ballarray[0].vz*ballarray[0].vz<0.01&&gamemd===1&&gamemdback===0){
			
			gamemd=0
			world2D.btn02.visible=true
			world2D.btn01.visible=true
			world2D.btnUp.visible=true
			world2D.btnDown.visible=true
			world2D.btnLeft.visible=true
			world2D.btnRight.visible=true
			ballarray[0].vz=0
			ballarray[0].vx=0
			world2D.ch01.checked=true
			world2D.ch01.visible=false

	}
	for(var i=0;i<ballN;i++){
		if(ballarray[i].vx*ballarray[i].vx+ballarray[i].vz*ballarray[i].vz>=0.01){
			var rolltheta=Math.atan2(ballarray[i].vz,ballarray[i].vx)
			var vec1=new THREE.Vector3(0,1,0)
			ballarray[i].rotateOnWorldAxis(vec1,rolltheta)
			var vec2=new THREE.Vector3(0,0,1)
			var rollz=Math.sqrt(ballarray[i].vz*ballarray[i].vz+ballarray[i].vx*ballarray[i].vx)/5
			ballarray[i].rotateOnWorldAxis(vec2,-rollz)
			ballarray[i].rotateOnWorldAxis(vec1,-rolltheta)
			
			
			

			ballarray[i].vx-=ballarray[i].vx/100
			ballarray[i].vz-=ballarray[i].vz/100
		
		
			ballarray[i].position.x+=ballarray[i].vx
		
			ballarray[i].position.z+=ballarray[i].vz
		}
		
		var goalmd=0
		if(ballarray[i].position.x>140&&ballarray[i].position.z>90){
			goalmd=1
		}
		if(ballarray[i].position.x<-140&&ballarray[i].position.z>90){
			goalmd=1
		}
		if(ballarray[i].position.x>140&&ballarray[i].position.z<-90){
			goalmd=1
		}
		if(ballarray[i].position.x<-140&&ballarray[i].position.z<-90){
			goalmd=1
		}
		if(ballarray[i].position.x<5&&ballarray[i].position.x>-5){
			goalmd=1
		}
		if(ballarray[i].position.x<5&&ballarray[i].position.x>-5){
			goalmd=1
		}
		
		if(((ballarray[i].position.x-150)*(ballarray[i].position.x-150)+(ballarray[i].position.z-100)*(ballarray[i].position.z-100))<100){		
			ballarray[i].vx-=ballarray[i].vx/3
			ballarray[i].vz-=ballarray[i].vz/3
			ballarray[i].position.y-=10/3
		}
		if(((ballarray[i].position.x-150)*(ballarray[i].position.x-150)+(ballarray[i].position.z+100)*(ballarray[i].position.z+100))<100){		
			ballarray[i].vx-=ballarray[i].vx/3
			ballarray[i].vz-=ballarray[i].vz/3
			ballarray[i].position.y-=10/3
		}
		if(((ballarray[i].position.x+150)*(ballarray[i].position.x+150)+(ballarray[i].position.z-100)*(ballarray[i].position.z-100))<100){		
			ballarray[i].vx-=ballarray[i].vx/3
			ballarray[i].vz-=ballarray[i].vz/3
			ballarray[i].position.y-=10/3
		}
		if(((ballarray[i].position.x+150)*(ballarray[i].position.x+150)+(ballarray[i].position.z+100)*(ballarray[i].position.z+100))<100){		
			ballarray[i].vx-=ballarray[i].vx/3
			ballarray[i].vz-=ballarray[i].vz/3
			ballarray[i].position.y-=10/3
		}
		if(((ballarray[i].position.x)*(ballarray[i].position.x)+(ballarray[i].position.z+100)*(ballarray[i].position.z+100))<25&&ballarray[i].position.z<-45){		
			ballarray[i].vx-=ballarray[i].vx/2
			ballarray[i].vz-=ballarray[i].vz/2
			ballarray[i].position.y-=10/3
		}
		if(((ballarray[i].position.x)*(ballarray[i].position.x)+(ballarray[i].position.z-100)*(ballarray[i].position.z-100))<25&&ballarray[i].position.z>45){		
			ballarray[i].vx-=ballarray[i].vx/2
			ballarray[i].vz-=ballarray[i].vz/2
			ballarray[i].position.y-=10/3
		}
		if(ballarray[i].position.z*ballarray[i].position.z>100*100||ballarray[i].position.x*ballarray[i].position.x>150*150){
			ballarray[i].vx=0
			ballarray[i].vz=0
			ballarray[i].position.y-=10/3
		}
		
		if(i===0){
			if(ballarray[i].position.y<=-10){
				ballarray[i].vx=0
				ballarray[i].vz=0
				ballarray[i].position.x=70
				ballarray[i].position.z=0
				ballarray[i].position.y=5
				
			}
		}
		if(i>0){
			if(ballarray[i].position.y<=-5){
				ballarray[i].vx=0
				ballarray[i].vz=0
				ballarray[i].vy=0
				ballarray[i].position.x=0
				ballarray[i].position.z=0
				ballarray[i].position.y=100
				ballarray[i].visible=false
				score+=1
			}
		}
		
		
		if(ballarray[i].position.x>150-5&&ballarray[i].vx>0&&goalmd===0&&ballarray[i].position.y===5){
			ballarray[i].vx*=-1
		}
		if(ballarray[i].position.x<-150+5&&ballarray[i].vx<0&&goalmd===0&&ballarray[i].position.y===5){
			ballarray[i].vx*=-1
		}
		if(ballarray[i].position.z>100-5&&ballarray[i].vz>0&&goalmd===0&&ballarray[i].position.y===5){
			ballarray[i].vz*=-1
		}
		if(ballarray[i].position.z<-100+5&&ballarray[i].vz<0&&goalmd===0&&ballarray[i].position.y===5){
			ballarray[i].vz*=-1
		}
	}
	if(gamemd===1){
		shootarrow.visible=false
		world2D.btn02.visible=false
		world2D.btn01.visible=false
		world2D.btnUp.visible=false
		world2D.btnDown.visible=false
		world2D.btnLeft.visible=false
		world2D.btnRight.visible=false
	}
	if(gamemd===0){
		shootarrow.visible=true
		
	}
	vvx=rr*Math.cos(theta)
	vvz=rr*Math.sin(theta)
	for(var i=0;i<15;i++){
		for(var j=i+1;j<16;j++){
			var b1=ballarray[i]
			var b2=ballarray[j]
			collision(b1,b2,10,i,j)
		}
	}
	tt+=1
	if(score>14){
		world3D.cameraTarget.x=0
		world3D.cameraTarget.z=0
		world3D.cameraTarget.y=0
		world2D.slcameraRR=200
		world3D.cameraTheta=Math.PI/2
		world3D.cameraPhi=0
		winplane.visible=true
		shootarrow.visible=false
		world2D.btn02.visible=false
		world2D.btn01.visible=false
		world2D.btnUp.visible=false
		world2D.btnDown.visible=false
		world2D.btnLeft.visible=false
		world2D.btnRight.visible=false
		scoreplane.position.z=150
		scoreplane1.position.z=150
		shootplane.position.z=150
		shootplane1.position.z=150
		alltable.scale.x=1000
		alltable.scale.y=1000
	}
	//3D
	world3D.render();
	//2D
	world2D.stage.update();

}
function clickbtn(e){
	var str=e.target.parent.name;
	if(str==='btnRight'){
		vtheta=world2D.sl01.value/200
	}
	if(str==='btnLeft'){
		vtheta=-world2D.sl01.value/200
	}
	if(str==='btnUp'){
		vrr=1
	}
	if(str==='btnDown'){
		vrr=-1
	}
	if(str==='btn01'){
		ballarray[0].vx=vvx/20
		ballarray[0].vz=vvz/20
		if(gamemd===0){
			shoottimes+=1
		}
		world2D.ch01.visible=true
		
		gamemd=1
	}
	if(str==='btn02'){
		if(seemd===0){
			seemd=1
			vchange=((-theta+Math.PI/2)-world3D.cameraPhi-Math.PI)/25
			world2D.btn01.visible=false
			shootarrow.visible=false
			world2D.btn02.visible=false
			world2D.btnUp.visible=false
			world2D.btnDown.visible=false
			world2D.btnLeft.visible=false
			world2D.btnRight.visible=false

		}
		if(seemd===2){
			seemd=3
			world2D.btn02.setLabel('瞄準')
		}
	}
}
function up2d(){
	vtheta=0
	vrr=0
}


//碰撞
function collision(ballA,ballB,dis,i,j){
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
		
		ballA.vz=vcz+v1cz+2*(v1c_n12*n12z);
		ballB.vx=vcx+v2cx-2*(v2c_n12*n12x);
		
		ballB.vz=vcz+v2cz-2*(v2c_n12*n12z);
		
	}

	return isCollision;
}



//resize
MyJS.myResize();






var table={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "96AF9C6D-70B1-4382-BDA9-AE717149524A",
			"type": "BoxBufferGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "19817A12-0848-41B1-93DC-14AAA9E196CE",
			"type": "BoxBufferGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "9F79AB31-4A1D-4EB9-A9D1-3E5DE3EE8396",
			"type": "BoxBufferGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "FDD142F9-9781-4160-9B79-1A572079FDA7",
			"type": "BoxBufferGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "54CD44B8-F709-43F7-9F8B-D3DF09F8F42C",
			"type": "BoxBufferGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "59CF9A81-5DDA-4D59-B1BF-B041ABB6884E",
			"type": "BoxBufferGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "AEB91FE7-28B2-43E5-AEBF-8095DDBBBB9E",
			"type": "CylinderBufferGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "6906F6AC-B390-4F16-9362-DDB3E8B77851",
			"type": "CylinderBufferGeometry",
			"radiusTop": 10,
			"radiusBottom": 10,
			"height": 10,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false
		}],
	"materials": [
		{
			"uuid": "8FF4E973-C776-435D-A33D-46DC5F0B6D2E",
			"type": "MeshStandardMaterial",
			"color": 0,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
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
			"uuid": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC",
			"type": "MeshStandardMaterial",
			"color": 8654864,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
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
			"uuid": "366BE550-3D97-4358-8945-9B8C869E8E97",
			"type": "MeshStandardMaterial",
			"color": 2515231,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
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
			"uuid": "F2118C09-05B4-46AD-A7EB-6317B1F3AA62",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
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
			"uuid": "59FF235E-3351-4BE8-AB8B-2743DEA7FF44",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
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
			"uuid": "420548AE-8EBE-4FA7-BDFB-0D97596A7D1C",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
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
			"uuid": "491F6EAE-65DA-4702-B1DE-28B5C05CB9D7",
			"type": "MeshStandardMaterial",
			"color": 0,
			"roughness": 1,
			"metalness": 0,
			"emissive": 0,
			"depthFunc": 3,
			"depthTest": true,
			"depthWrite": true,
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
		"uuid": "81953034-9E01-4A28-9167-F9940347753D",
		"type": "Group",
		"name": "allt",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "4A6DE4A9-8E29-48D7-B31A-1727AB07ED25",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [40,0,0,0,0,10,0,0,0,0,40,0,167.512185,-4,113.760511,1],
				"geometry": "96AF9C6D-70B1-4382-BDA9-AE717149524A",
				"material": "8FF4E973-C776-435D-A33D-46DC5F0B6D2E"
			},
			{
				"uuid": "D8F13F1E-4A45-40B5-BEAA-9AD4A0C08B31",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [40,0,0,0,0,10,0,0,0,0,20,0,165.776767,-4,-110.097262,1],
				"geometry": "96AF9C6D-70B1-4382-BDA9-AE717149524A",
				"material": "8FF4E973-C776-435D-A33D-46DC5F0B6D2E"
			},
			{
				"uuid": "4D6FB9C9-8418-4626-9F60-C2A0087C0482",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [17.67767,0,-17.67767,0,0,40,0,0,17.67767,0,17.67767,0,-168.1,0,-89.3,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "E8D6BFDE-ED4C-46E5-9B34-CC36C4F0B1B1",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [40,0,0,0,0,10,0,0,0,0,40,0,-167.401862,-4,113.760511,1],
				"geometry": "96AF9C6D-70B1-4382-BDA9-AE717149524A",
				"material": "8FF4E973-C776-435D-A33D-46DC5F0B6D2E"
			},
			{
				"uuid": "3AE1F142-D7A3-44AE-AD05-DB3AB3107BCE",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [40,0,0,0,0,10,0,0,0,0,40,0,-163.941601,-4,-115.153464,1],
				"geometry": "96AF9C6D-70B1-4382-BDA9-AE717149524A",
				"material": "8FF4E973-C776-435D-A33D-46DC5F0B6D2E"
			},
			{
				"uuid": "DCC49202-01B8-429F-868A-76BE14E368AB",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [17.67767,0,-17.67767,0,0,40,0,0,17.67767,0,17.67767,0,168.1,0,-89.3,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "D5D5F374-5238-4CDD-80E8-7D89DBCF76BA",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [17.67767,0,-17.67767,0,0,40,0,0,17.67767,0,17.67767,0,-168.1,0,89.338391,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "3DD68505-4172-4FB3-9EED-89390508C989",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [300,0,0,0,0,10,0,0,0,0,200,0,0,-8,0,1],
				"geometry": "9F79AB31-4A1D-4EB9-A9D1-3E5DE3EE8396",
				"material": "366BE550-3D97-4358-8945-9B8C869E8E97"
			},
			{
				"uuid": "45CDCEF7-967A-4810-85CB-81655DE8995B",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [130,0,0,0,0,40,0,0,0,0,20,0,75,0,110,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "ED672199-F061-4EF8-956F-D5ABBD52760D",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [17.67767,0,-17.67767,0,0,40,0,0,17.67767,0,17.67767,0,139.8,0,-118.8,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "64723203-6F27-48AA-93E3-822045A56928",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [17.67767,0,-17.67767,0,0,40,0,0,17.67767,0,17.67767,0,168.110521,0,89.338391,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "560BA825-1ED3-4B43-821D-86C7BEE8AFDB",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [17.67767,0,-17.67767,0,0,40,0,0,17.67767,0,17.67767,0,169.5,0,-88.346453,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "32EE0C19-D2E9-4E2A-8E00-BC74D073F4B6",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [17.67767,0,-17.67767,0,0,40,0,0,17.67767,0,17.67767,0,139.8,0,118.8,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "A83A9D57-2702-488C-A793-A9680D779B62",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [17.67767,0,-17.67767,0,0,40,0,0,17.67767,0,17.67767,0,-139.8,0,118.799197,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "BB1AD7B8-0230-49EB-AE3F-4A84C101AD8E",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0,0,-280,0,0,40,0,0,20,0,0,0,-180,0,0,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "E0DBD522-DFDD-4ADD-B14A-CB867AFC9D66",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0,0,-280,0,0,40,0,0,20,0,0,0,180,0,0,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "49194380-E7AB-47FC-B77F-20A7B3A34282",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [340,0,0,0,0,40,0,0,0,0,20,0,0,0,130,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "B090CE28-F911-4EF6-84DA-9DFC93FECE43",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [340,0,0,0,0,40,0,0,0,0,20,0,0,0,-130,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "F50D8B13-6FF1-4AF2-B25A-19B8C1104D2A",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0,0,-180,0,0,40,0,0,20,0,0,0,-160,0,0,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "619D5B18-C8F9-4C07-A19B-0DEE173649E5",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0,0,-180,0,0,40,0,0,20,0,0,0,160,0,0,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "55AAC490-C523-4074-99A0-9FC98AEC22F8",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [130,0,0,0,0,40,0,0,0,0,20,0,-75,0,-110,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "723F630F-28F8-464B-BB9F-EBFA863CB7F2",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [130,0,0,0,0,40,0,0,0,0,20,0,75,0,-110,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "AE26A86B-73EA-4939-9650-5A59D766710B",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [130,0,0,0,0,40,0,0,0,0,20,0,-75,0,110,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
			},
			{
				"uuid": "DADB4098-3808-48E6-80F4-481EFBEE4886",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "FDD142F9-9781-4160-9B79-1A572079FDA7",
				"material": "F2118C09-05B4-46AD-A7EB-6317B1F3AA62"
			},
			{
				"uuid": "3BFF229A-2EBB-4449-8F57-6034ECADB38B",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "54CD44B8-F709-43F7-9F8B-D3DF09F8F42C",
				"material": "59FF235E-3351-4BE8-AB8B-2743DEA7FF44"
			},
			{
				"uuid": "ED275774-425D-4CEE-A0BA-FCEA2CCAF212",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [20,0,0,0,0,10,0,0,0,0,20,0,0,-4,-110,1],
				"geometry": "96AF9C6D-70B1-4382-BDA9-AE717149524A",
				"material": "8FF4E973-C776-435D-A33D-46DC5F0B6D2E"
			},
			{
				"uuid": "BAAFAE2F-D8D2-466D-8217-AEA367C8B9FA",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [20,0,0,0,0,10,0,0,0,0,20,0,0,-4,110,1],
				"geometry": "96AF9C6D-70B1-4382-BDA9-AE717149524A",
				"material": "8FF4E973-C776-435D-A33D-46DC5F0B6D2E"
			},
			{
				"uuid": "64F75939-02F6-417C-A755-35F1B3413257",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
				"geometry": "59CF9A81-5DDA-4D59-B1BF-B041ABB6884E",
				"material": "420548AE-8EBE-4FA7-BDFB-0D97596A7D1C"
			},
			{
				"uuid": "91837B8F-DE98-4C44-BB5C-E9B5A4E61AA3",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [10,0,0,0,0,10,0,0,0,0,10,0,-150,-3.5,-100,1],
				"geometry": "AEB91FE7-28B2-43E5-AEBF-8095DDBBBB9E",
				"material": "491F6EAE-65DA-4702-B1DE-28B5C05CB9D7"
			},
			{
				"uuid": "B86E0802-EC8D-41B4-92FF-511FFFFDD954",
				"type": "Mesh",
				"name": "Cylinder",
				"frustumCulled": false,
				"layers": 1,
				"matrix": [10,0,0,0,0,10,0,0,0,0,10,0,150,-3.5,-100,1],
				"geometry": "AEB91FE7-28B2-43E5-AEBF-8095DDBBBB9E",
				"material": "491F6EAE-65DA-4702-B1DE-28B5C05CB9D7"
			},
			{
				"uuid": "8C0EE8F3-F78A-4BAB-8E0B-539FA6E82C67",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [10,0,0,0,0,10,0,0,0,0,5,0,0,-3.5,-100,1],
				"geometry": "AEB91FE7-28B2-43E5-AEBF-8095DDBBBB9E",
				"material": "491F6EAE-65DA-4702-B1DE-28B5C05CB9D7"
			},
			{
				"uuid": "407B480F-4482-490A-ACAD-AFB3AD9C90EE",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [10,0,0,0,0,10,0,0,0,0,10,0,-150,-3.5,100,1],
				"geometry": "AEB91FE7-28B2-43E5-AEBF-8095DDBBBB9E",
				"material": "491F6EAE-65DA-4702-B1DE-28B5C05CB9D7"
			},
			{
				"uuid": "B182F9A5-80E4-4A7C-B752-1CC24AA1501B",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,0.5,0,0,-3.5,100,1],
				"geometry": "6906F6AC-B390-4F16-9362-DDB3E8B77851",
				"material": "491F6EAE-65DA-4702-B1DE-28B5C05CB9D7"
			},
			{
				"uuid": "3AD8A4DF-A9D8-45EC-A8B1-51A7C0059FAB",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [10,0,0,0,0,10,0,0,0,0,10,0,150,-3.5,100,1],
				"geometry": "AEB91FE7-28B2-43E5-AEBF-8095DDBBBB9E",
				"material": "491F6EAE-65DA-4702-B1DE-28B5C05CB9D7"
			},
			{
				"uuid": "08E806AD-315F-4C08-8E31-EB22F234D353",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [17.67767,0,-17.67767,0,0,40,0,0,17.67767,0,17.67767,0,-140.714049,0,-119.599306,1],
				"geometry": "19817A12-0848-41B1-93DC-14AAA9E196CE",
				"material": "A2DDE8B5-BD56-4725-90E4-E0F8E1485FAC"
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
var ground=new TEACHER.ObjPicPlane(300,200,pics.surface,'y');
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
