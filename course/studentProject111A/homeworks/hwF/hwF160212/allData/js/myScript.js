'use strict';//嚴格模式
var fps=200;//動畫fps
var log=console.log;//簡化log

//A.宣告全域變數
var myname
var box,boxR,boxL,boxA,boxB,boxD,boxU;
var n=27
var n1,n2,n3,n4,n5,n6,ball
var aa=[]
var theta=0
var omaga=0.2
var dt=0.1
var r=0
var thetar=0
var d=0,u=0,ri=0,le=0
var which=0
var text=0
var newposition=20
var isbroke=0
var change=90
var c1,c2,c3,c4,c5,c6,c7,c8,c9
var ballarray=[]
var ballcircle
var witchball=[]
var balltheta=[]
var testtheta=0
var istesttheta=0
var testnineball=0
var isturn=0
var centern,center
var nineballarray=[]
var nineballtheta=[]
var nineballx=[]
var nineballz=[]
function init(){
	world2D.ch01.visible=false
	world2D.ch02.visible=false
	world2D.sl01.visible=false
	world2D.sl02.visible=false
	world2D.sl03.visible=false
	c1=new TEACHER.Line(0xffff00)//6
	scene.add(c1)
	for(var a=0;a<50;a+=0.1){
		var x=-20+14*Math.cos(a)
		var z=14*Math.sin(a)
		c1.addPoint(x,1,z)
	}
	c2=new TEACHER.Line(0xffff00)//5
	scene.add(c2)
	for(var a=0;a<50;a+=0.1){
		var x=-20+16*Math.cos(a)
		var z=16*Math.sin(a)
		c2.addPoint(x,1,z)
	}
	c3=new TEACHER.Line(0xffff00)//4
	scene.add(c3)
	for(var a=0;a<50;a+=0.1){
		var x=-20+18*Math.cos(a)
		var z=18*Math.sin(a)
		c3.addPoint(x,1,z)
	}
	c4=new TEACHER.Line(0xffff00)//1
	scene.add(c4)
	for(var a=0;a<50;a+=0.1){
		var x=-28+14*Math.cos(a)
		var z=8*Math.pow(3,1/2)+14*Math.sin(a)
		c4.addPoint(x,1,z)
	}
	c5=new TEACHER.Line(0xffff00)//2
	scene.add(c5)
	for(var a=0;a<50;a+=0.1){
		var x=-28+16*Math.cos(a)
		var z=8*Math.pow(3,1/2)+16*Math.sin(a)
		c5.addPoint(x,1,z)
	}
	c6=new TEACHER.Line(0xffff00)//3
	scene.add(c6)
	for(var a=0;a<50;a+=0.1){
		var x=-28+18*Math.cos(a)
		var z=8*Math.pow(3,1/2)+18*Math.sin(a)
		c6.addPoint(x,1,z)
	}
	c7=new TEACHER.Line(0xffff00)//1,4
	scene.add(c7)
	for(var a=0;a<50;a+=0.1){
		var x=-12+14*Math.cos(a)
		var z=8*Math.pow(3,1/2)+14*Math.sin(a)
		c7.addPoint(x,1,z)
	}
	c8=new TEACHER.Line(0xffff00)//2,5
	scene.add(c8)
	for(var a=0;a<50;a+=0.1){
		var x=-12+16*Math.cos(a)
		var z=8*Math.pow(3,1/2)+16*Math.sin(a)
		c8.addPoint(x,1,z)
	}
	c9=new TEACHER.Line(0xffff00)//3,6
	scene.add(c9)
	for(var a=0;a<50;a+=0.1){
		var x=-12+18*Math.cos(a)
		var z=8*Math.pow(3,1/2)+18*Math.sin(a)
		c9.addPoint(x,1,z)
	}

	for(x=-50;x<10;x+=0.5){
		for(z=-20;z<35;z+=0.5){
			if(Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-14)<0.2&&
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-14)<0.2&&
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-14)<0.2&&
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-16)<0.2&&
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-16)<0.2&&
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-16)<0.2&&
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-18)<0.2&&
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-18)<0.2&&
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-18)<0.2&&
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.2){
				if(z>5){
				ballcircle=new TEACHER.ObjSphere(0.5,0x0000f0)
			}else{ballcircle=new TEACHER.ObjSphere(0.5,0xfff000)}
				ballcircle.position.x=x
				ballcircle.position.y=1
				ballcircle.position.z=z
				scene.add(ballcircle)
				ballarray.push(ballcircle)
			}
			if(Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-14)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-14)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-14)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-16)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-16)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-16)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-18)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-18)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.22||
			Math.abs(Math.pow((Math.pow(x+20,2)+Math.pow(z,2)),(1/2))-18)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.2){
				if(z>5){
				ballcircle=new TEACHER.ObjSphere(0.5,0xffffff)
			}else{ballcircle=new TEACHER.ObjSphere(0.5,0xf00000)}
				ballcircle.position.x=x
				ballcircle.position.y=1
				ballcircle.position.z=z
				scene.add(ballcircle)
				ballarray.push(ballcircle)
			}
			if(Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.22||
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.3||
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.22&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.22||
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.15&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.3||
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.22||
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.14&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.5||
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.2&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-14)<0.22||
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.18&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-16)<0.3||
			Math.abs(Math.pow((Math.pow(x+28,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.22&&
			Math.abs(Math.pow((Math.pow(x+12,2)+Math.pow(z-8*Math.pow(3,1/2),2)),(1/2))-18)<0.22){
				if(z>5){
					ballcircle=new TEACHER.ObjSphere(0.5,0x00f000)
				}else{
					ballcircle=new TEACHER.ObjSphere(0.5,0x000f00)
				}
				ballcircle.position.x=x
				ballcircle.position.y=1
				ballcircle.position.z=z
				scene.add(ballcircle)
				ballarray.push(ballcircle)
			}
		}
	}
	myname=new TEACHER.ObjTextPlane(60,10,"1602 12 林柏諭","z",0xffffff)
	myname.position.x=0
	myname.position.y=10
	myname.position.z=-60
	scene.add(myname)
	n1=new TEACHER.ObjTextPlane(4,4,"1","z",0xff00f0)
	n1.position.x=-4.05+newposition
	n1.position.y=2
	n1.position.z=6.5
	scene.add(n1)
	n2=new TEACHER.ObjTextPlane(4,4,"2","z",0xff00f0)
	n2.position.x=0.05+newposition
	n2.position.y=6
	n2.position.z=6.5
	scene.add(n2)
	n3=new TEACHER.ObjTextPlane(4,4,"3","z",0xff00f0)
	n3.position.x=4.1+newposition
	n3.position.y=10
	n3.position.z=6.5
	scene.add(n3)
	n4=new TEACHER.ObjTextPlane(4,4,"4","x",0xff00f0)
	n4.position.x=6.5+newposition
	n4.position.y=2
	n4.position.z=4.1
	scene.add(n4)
	n5=new TEACHER.ObjTextPlane(4,4,"5","x",0xff00f0)
	n5.position.x=6.5+newposition
	n5.position.y=6
	n5.position.z=0.05
	scene.add(n5)
	n6=new TEACHER.ObjTextPlane(4,4,"6","x",0xff00f0)
	n6.position.x=6.5+newposition
	n6.position.y=10
	n6.position.z=-4
	scene.add(n6)
	ball=new TEACHER.ObjSphere(1,0X00ffff)
	ball.visible=false
	scene.add(ball)
	for(var i=0;i<n;i++){
		box=new TEACHER.ObjBox(4,4,4,0x000000);
		boxR=new TEACHER.ObjTextPlane(4,4,"","x",0x000000,0xf00000)
		boxL=new TEACHER.ObjTextPlane(4,4,"","x",0x000000,0xffffff)
		boxA=new TEACHER.ObjTextPlane(4,4,"","z",0x000000,0x00f000)
		boxB=new TEACHER.ObjTextPlane(4,4,"","z",0x000000,0x000f00)
		boxD=new TEACHER.ObjTextPlane(4,4,"","y",0x000000,0x0000f0)
		boxU=new TEACHER.ObjTextPlane(4,4,"","y",0x000000,0xfff000)
		boxR.position.x=2.1
		boxL.position.x=-2.1
		boxA.position.z=2.1
		boxB.position.z=-2.1
		boxD.position.y=-2.1
		boxU.position.y=2.1
		box.add(boxR).add(boxL).add(boxA).add(boxB).add(boxD).add(boxU)
		box.position.x=4.05*(i%3)-4+newposition
		box.position.y=2+4.05*((Math.floor(i/3))%3)
		box.position.z=4.05*(Math.floor(i/9))-4
		aa.push(box)
		world3D.scene.add(box);
	}
	world2D.btnUp.on('click',clickbtnU)
	world2D.btnDown.on('click',clickbtnD)
	world2D.btnLeft.on('click',clickbtnL)
	world2D.btnRight.on('click',clickbtnR)
	world2D.btn01.setLabel("1")
	world2D.btn01.on('click',clickbtn01)
	world2D.btn02.setLabel("2")
	world2D.btn02.on('click',clickbtn02)
	world2D.btn03.setLabel("3")
	world2D.btn03.on('click',clickbtn03)
	world2D.btn04.setLabel("4")
	world2D.btn04.on('click',clickbtn04)
	world2D.btn05.setLabel("5")
	world2D.btn05.on('click',clickbtn05)
	world2D.btn06.setLabel("6")
	world2D.btn06.on('click',clickbtn06)
	world2D.btn07.setLabel("打亂")
	world2D.btn07.on('click',broke)
	world2D.btn08.setLabel("停止打亂")
	world2D.btn08.on('click',stopbroke)
	setInterval(whichside,1000/fps);
	setInterval(breaking,1000/fps);
}

function clickbtn01(e){
	if(u===0&&ri===0&&le===0&&d===0&&isbroke===0){         
	which=1
	ball.visible=true
	ball.position.x=n1.position.x
	ball.position.y=n1.position.y
	ball.position.z=n1.position.z
	isturn=1
}
}
function clickbtn02(e){
	if(u===0&&ri===0&&le===0&&d===0&&isbroke===0){         
	which=2
	ball.visible=true
	ball.position.x=n2.position.x
	ball.position.y=n2.position.y
	ball.position.z=n2.position.z
	isturn=0
}
}
function clickbtn03(e){
	if(u===0&&ri===0&&le===0&&d===0&&isbroke===0){         
	which=3
	ball.visible=true
	ball.position.x=n3.position.x
	ball.position.y=n3.position.y
	ball.position.z=n3.position.z
	isturn=2
}
}        
function clickbtn04(e){
	if(u===0&&ri===0&&le===0&&d===0&&isbroke===0){         
	which=4
	ball.visible=true
	ball.position.x=n4.position.x
	ball.position.y=n4.position.y
	ball.position.z=n4.position.z
	isturn=1
}
}
function clickbtn05(e){
	if(u===0&&ri===0&&le===0&&d===0&&isbroke===0){         
	which=5
	ball.visible=true
	ball.position.x=n5.position.x
	ball.position.y=n5.position.y
	ball.position.z=n5.position.z
	isturn=0
}
}
function clickbtn06(e){
	if(u===0&&ri===0&&le===0&&d===0&&isbroke===0){         
	which=6
	ball.visible=true
	ball.position.x=n6.position.x
	ball.position.y=n6.position.y
	ball.position.z=n6.position.z
	isturn=2
}
}
function clickbtnD(e){   
	if(which!==0){
	if(u===0&&ri===0&&le===0&&d===0&&isbroke===0){                                                                                                                  
d=1
istesttheta=0
testnineball=0
}
}
}
function clickbtnU(e){
	if(which!==0){
	if(d===0&&ri===0&&le===0&&u===0&&isbroke===0){
	u=1
	istesttheta=0
	testnineball=0
	}
}
}
function clickbtnR(e){ 
	if(which!==0){
	if(u===0&&d===0&&le===0&&ri===0&&isbroke===0) {                                                                                                                   
	ri=1
	istesttheta=0
	testnineball=0
	}
	}
	}
	function clickbtnL(e){
		if(which!==0){
		if(u===0&&ri===0&&d===0&&le===0&&isbroke===0){
		le=1
		istesttheta=0
		testnineball=0
	}
}
}

function whichside(){
if (which===1){
	side123(-10,-1,4,-4,-28,8*Math.pow(3,1/2),14,-20,0,-12,8*Math.pow(3,1/2),1,1)
}
if (which===2){
	side123(-2,2,8,4,-28,8*Math.pow(3,1/2),16,50,50,50,50,1,1)
}
if (which===3){
	side123(2,10,20,8,-28,8*Math.pow(3,1/2),18,-20,0,-12,8*Math.pow(3,1/2),-1,-1)
}
if (which===4){
	side456(2,10,4,-4,-20,0,18,14,-12,8*Math.pow(3,1/2),-28,8*Math.pow(3,1/2),-1,1)
}
if (which===5){
	side456(-2,2,8,4,-20,0,16,16,50,50,50,50,1,1)
}
if (which===6){
	side456(-10,-1,20,8,-20,0,14,18,-12,8*Math.pow(3,1/2),-28,8*Math.pow(3,1/2),1,-1)
}
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}
function broke (e){
	if(u===0&&ri===0&&le===0&&d===0){    
	isbroke=1
	ball.visible=true
}
}
function stopbroke (e){
	isbroke=0
}
function breaking(){
	if(isbroke===1){
		if(which===1){
			ball.position.x=n1.position.x
			ball.position.y=n1.position.y
			ball.position.z=n1.position.z
		}
		if(which===2){
			ball.position.x=n2.position.x
			ball.position.y=n2.position.y
			ball.position.z=n2.position.z
		}
		if(which===3){
			ball.position.x=n3.position.x
			ball.position.y=n3.position.y
			ball.position.z=n3.position.z
		}
		if(which===4){
			ball.position.x=n4.position.x
			ball.position.y=n4.position.y
			ball.position.z=n4.position.z
		}
		if(which===5){
			ball.position.x=n5.position.x
			ball.position.y=n5.position.y
			ball.position.z=n5.position.z
		}
		if(which===6){
			ball.position.x=n6.position.x
			ball.position.y=n6.position.y
			ball.position.z=n6.position.z
		}
		if(u===0&&ri===0&&le===0&&d===0){
			which=Math.floor(6*Math.random()+1)
			if(which===1||which===4){
				isturn=1
			}
			if(which===2||which===5){
				isturn=0
			}
			if(which===3||which===6){
				isturn=2
			}
			d=Math.random()
			u=Math.random()
			ri=Math.random()
			le=Math.random()
			if(d>u&&d>ri&&d>le){
				d=1
				u=0
				ri=0
				le=0
			}
			if(u>d&&u>ri&&u>le){
				d=0
				u=1
				ri=0
				le=0
			}
			if(ri>u&&ri>d&&ri>le){
				d=0
				u=0
				ri=1
				le=0
			}
			if(le>u&&le>ri&&le>d){
				d=0
				u=0
				ri=0
				le=1
			}
			istesttheta=0
			testnineball=0
		}
	}
}
function side123(A,B,C,D,M,N,O,W,X,Y,Z,special,way){
	if(d===1){
		for(var i=0;i<n;i++){
			box=aa[i]
			if(box.position.x>A+newposition&&box.position.x<B+newposition){
				theta=Math.atan2(box.position.y-6,box.position.z)
				theta-=Math.PI/change
				r=Math.pow((Math.pow(box.position.z,2)+Math.pow(box.position.y-6,2)),(1/2))
				box.position.z=r*Math.cos(theta)
				box.position.y=r*Math.sin(theta)+6
				box.rotateOnWorldAxis( new THREE.Vector3(1,0,0),Math.PI/change)
			}
		}
		thetar+=Math.PI/change
		ballturn(M,N,O,-1)
		if(which!==2&&which!==5){
		nineballturn(W,X,Y,Z,-1*special,way)
		}
	}
if(u===1){
	for(var i=0;i<n;i++){
		box=aa[i]
		if(box.position.x>A+newposition&&box.position.x<B+newposition){
		theta=Math.atan2(box.position.y-6,box.position.z)
		theta+=Math.PI/change
		r=Math.pow((Math.pow(box.position.z,2)+Math.pow(box.position.y-6,2)),(1/2))
		box.position.z=r*Math.cos(theta)
		box.position.y=r*Math.sin(theta)+6
		box.rotateOnWorldAxis( new THREE.Vector3(1,0,0),-Math.PI/change)
	}
}
	thetar+=Math.PI/change
	ballturn(M,N,O,1)
	if(which!==2&&which!==5){
	nineballturn(W,X,Y,Z,special,way)
	}
}
if(ri===1){
	for(var i=0;i<n;i++){
		box=aa[i]
		if(box.position.y<C&&box.position.y>D){
		theta=Math.atan2(box.position.z,box.position.x-newposition)
		theta-=Math.PI/change
		r=Math.pow((Math.pow(box.position.x-newposition,2)+Math.pow(box.position.z,2)),(1/2))
		box.position.x=r*Math.cos(theta)+newposition
		box.position.z=r*Math.sin(theta)
		box.rotateOnWorldAxis( new THREE.Vector3(0,1,0),Math.PI/change)
	}
}
	thetar+=Math.PI/change
	ballturn(-12,8*Math.pow(3,1/2),O,-1)
	if (isturn===1){
		nineballturn(-28,8*Math.pow(3,1/2),-20,0,-1,1)
	}
	if(isturn===2){
		nineballturn(-28,8*Math.pow(3,1/2),-20,0,1,-1)
	}
}
if(le===1){
	for(var i=0;i<n;i++){
		box=aa[i]
		if(box.position.y<C&&box.position.y>D){
		theta=Math.atan2(box.position.z,box.position.x-newposition)
		theta+=Math.PI/change
		r=Math.pow((Math.pow(box.position.x-newposition,2)+Math.pow(box.position.z,2)),(1/2))
		box.position.x=r*Math.cos(theta)+newposition
		box.position.z=r*Math.sin(theta)
		box.rotateOnWorldAxis( new THREE.Vector3(0,1,0),-Math.PI/change)
	}
}
	thetar+=Math.PI/change
	ballturn(-12,8*Math.pow(3,1/2),O,1)
	if (isturn===1){
		nineballturn(-28,8*Math.pow(3,1/2),-20,0,1,1)
	}
	if(isturn===2){
		nineballturn(-28,8*Math.pow(3,1/2),-20,0,-1,-1)
	}
}
	if(thetar>=Math.PI/2){
		d=0
		u=0
		ri=0
		le=0
		thetar=0
		balltheta.splice(0,balltheta.length)
		witchball.splice(0,witchball.length)
		nineballarray.splice(0,nineballarray.length)
		nineballx.splice(0,nineballx.length)
		nineballz.splice(0,nineballz.length)
		nineballtheta.splice(0,nineballtheta.length)
	}
	
	
	
	


	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}
function side456(E,F,G,H,M,N,O,P,W,X,Y,Z,special,way){
	if(d===1){
	for(var i=0;i<n;i++){
		box=aa[i]
		if(box.position.z>E&&box.position.z<F){
		theta=Math.atan2(box.position.y-6,box.position.x-newposition)
		theta-=Math.PI/change
		r=Math.pow((Math.pow(box.position.x-newposition,2)+Math.pow(box.position.y-6,2)),(1/2))
		box.position.x=r*Math.cos(theta)+newposition
		box.position.y=r*Math.sin(theta)+6
		box.rotateOnWorldAxis( new THREE.Vector3(0,0,1),-Math.PI/change)
	}
}
	thetar+=Math.PI/change
	ballturn(M,N,O,1)
	if(which!==2&&which!==5){
	nineballturn(W,X,Y,Z,special,way)
}
}
if(u===1){
	for(var i=0;i<n;i++){
		box=aa[i]
		if(box.position.z>E&&box.position.z<F){
		theta=Math.atan2(box.position.y-6,box.position.x-newposition)
		theta+=Math.PI/change
		r=Math.pow((Math.pow(box.position.x-newposition,2)+Math.pow(box.position.y-6,2)),(1/2))
		box.position.x=r*Math.cos(theta)+newposition
		box.position.y=r*Math.sin(theta)+6
		box.rotateOnWorldAxis( new THREE.Vector3(0,0,1),Math.PI/change)
	}
}
	thetar+=Math.PI/change
	ballturn(M,N,O,-1)
	if(which!==2&&which!==5){
	nineballturn(W,X,Y,Z,-1*special,way)
	}
}
if(ri===1){
	for(var i=0;i<n;i++){
		box=aa[i]
		if(box.position.y<G&&box.position.y>H){
		theta=Math.atan2(box.position.z,box.position.x-newposition)
		theta-=Math.PI/change
		r=Math.pow((Math.pow(box.position.x-newposition,2)+Math.pow(box.position.z,2)),(1/2))
		box.position.x=r*Math.cos(theta)+newposition
		box.position.z=r*Math.sin(theta)
		box.rotateOnWorldAxis( new THREE.Vector3(0,1,0),Math.PI/change)
	}
}
	thetar+=Math.PI/change
	ballturn(-12,8*Math.pow(3,1/2),P,-1)
	if (isturn===1){
	nineballturn(-28,8*Math.pow(3,1/2),-20,0,-1,1)
	}
	if(isturn===2){
		nineballturn(-28,8*Math.pow(3,1/2),-20,0,1,-1)
	}
}
if(le===1){
	for(var i=0;i<n;i++){
		box=aa[i]
		if(box.position.y<G&&box.position.y>H){
		theta=Math.atan2(box.position.z,box.position.x-newposition)
		theta+=Math.PI/change
		r=Math.pow((Math.pow(box.position.x-newposition,2)+Math.pow(box.position.z,2)),(1/2))
		box.position.x=r*Math.cos(theta)+newposition
		box.position.z=r*Math.sin(theta)
		box.rotateOnWorldAxis( new THREE.Vector3(0,1,0),-Math.PI/change)
		}
	}
	thetar+=Math.PI/change
	ballturn(-12,8*Math.pow(3,1/2),P,1)
	if (isturn===1){
		nineballturn(-28,8*Math.pow(3,1/2),-20,0,1,1)
	}
	if(isturn===2){
		nineballturn(-28,8*Math.pow(3,1/2),-20,0,-1,-1)
	}
}	
	if(thetar>=Math.PI/2){
		d=0
		u=0
		ri=0
		le=0
		thetar=0
		balltheta.splice(0,balltheta.length)
		witchball.splice(0,witchball.length)
		nineballarray.splice(0,nineballarray.length)
		nineballx.splice(0,nineballx.length)
		nineballz.splice(0,nineballz.length)
		nineballtheta.splice(0,nineballtheta.length)
	}
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}
//-------------------------------圓和球-------------------------------------------------------------------

function ballturn(A,B,C,D){
	if (istesttheta===0){
		for(var i=0;i<54;i++){
			var ball=ballarray[i]
			if(Math.abs(Math.pow((Math.pow(ball.position.x-A,2)+Math.pow(ball.position.z-B,2)),(1/2))-C)<0.5){
				testtheta=Math.atan2(ball.position.z-B,ball.position.x-A)
				var j
				if (D*testtheta>=0){
					for (j=0;j<balltheta.length;j++){
						var oldtheta=balltheta[j]
						if (D*oldtheta>D*testtheta||D*oldtheta<0){
							break
						}
					}
					balltheta.splice(j,0,testtheta)
					witchball.splice(j,0,ball)
				}else{
					for(j=balltheta.length;j>0;j-=1){
						var oldtheta=balltheta[j-1]
						if (D*oldtheta<D*testtheta||D*oldtheta>0){
							break
						}
					}
					balltheta.splice(j,0,testtheta)
					witchball.splice(j,0,ball)
				}
			}
		}
		istesttheta=1
	}
	for (var i=0;i<balltheta.length;i++){
		var ball=witchball[i]
		var theta=Math.atan2(ball.position.z-B,ball.position.x-A)
		if(D*(balltheta[(i+3)%12]-balltheta[i%12])<0){
			if(Math.abs(balltheta[(i+3)%12]-balltheta[i%12])>2&&balltheta[(i+3)%12]*balltheta[i%12]>0){
				var dtheta=D*((2*Math.PI-Math.abs(balltheta[(i+3)%12]-balltheta[i%12]))/(change/2))
			}else{
				var dtheta=D*(2*Math.PI-Math.abs(balltheta[(i+3)%12])-Math.abs(balltheta[i%12]))/(change/2)
			}
		}else{
		
			var dtheta=(balltheta[(i+3)%12]-balltheta[i%12])/(change/2)
		}
		theta+=dtheta
		ball.position.x=C*Math.cos(theta)+A
		ball.position.z=C*Math.sin(theta)+B
	}
}
function nineballturn (A,B,C,D,E,F){
		if (testnineball===0){
			for (i=0;i<54;i++){
				centern=ballarray[i]
				if (Math.abs(Math.pow((Math.pow(centern.position.x-A,2)+Math.pow(centern.position.z-B,2)),(1/2))-16)<0.5&&
					Math.abs(Math.pow((Math.pow(centern.position.x-C,2)+Math.pow(centern.position.z-D,2)),(1/2))-16)<0.5&&
					F*centern.position.z>F*5){
					center=ballarray[i]
					break
					}
			}
			for(var i=0;i<54;i++){
				var nineball=ballarray[i]
				if(Math.pow((Math.pow(center.position.x-nineball.position.x,2)+Math.pow(center.position.z-nineball.position.z,2)),(1/2))<5&&nineball!==center){
					testtheta=Math.atan2(nineball.position.z-center.position.z,nineball.position.x-center.position.x)
					var j
					if (E*testtheta>=0){
						for (j=0;j<nineballtheta.length;j++){
							var oldtheta=nineballtheta[j]
							if (E*oldtheta>E*testtheta||E*oldtheta<0){
								break
							}
						}
						nineballtheta.splice(j,0,testtheta)
						nineballarray.splice(j,0,nineball)
						nineballx.splice(j,0,nineball.position.x)
						nineballz.splice(j,0,nineball.position.z)
					}else{
						for(j=nineballtheta.length;j>0;j-=1){
							var oldtheta=nineballtheta[j-1]
							if (E*oldtheta<E*testtheta||E*oldtheta>0){
								break
							}
						}
						nineballtheta.splice(j,0,testtheta)
						nineballarray.splice(j,0,nineball)
						nineballx.splice(j,0,nineball.position.x)
						nineballz.splice(j,0,nineball.position.z)
					}
				}
			}
			testnineball=1
		}
		for (var i=0;i<nineballarray.length;i++){
			var ball=nineballarray[i%8]
			var ballx=nineballx[i%8]
			var ballz=nineballz[i%8]
			var otherballx=nineballx[(i+2)%8]
			var otherballz=nineballz[(i+2)%8]
			var dx=(otherballx-ballx)/(change/2)
			var dz=(otherballz-ballz)/(change/2)
			ball.position.x+=dx
			ball.position.z+=dz
		}
} 
//resize
MyJS.myResize();






























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































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

/*var logo=new TEACHER.ObjPicPlane(100,100/8,pics.logo,'z',2);
logo.position.z=-50;
logo.position.y=100/8/2;
world3D.scene.add(logo);*/


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
