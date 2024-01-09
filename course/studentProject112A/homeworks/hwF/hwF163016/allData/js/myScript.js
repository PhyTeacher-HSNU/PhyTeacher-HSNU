'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//------------老師作的萬用半成品(2020.12.01)-----------//

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//

//A.宣告全域變數
//文字
var pp
var victory
var defeat
//相機
var upca=5
//粒子
var pts1,pts2
var nn1=100
var tt=0
var dt=0.1
var lambda=25
//底部
var flo1,flo2,flo3,flo4,flo5,flo6,flo7,flo8
//操控
var hero
//敵襲(龍捲)
var balloArray=[]
var balltArray=[]
var baroArray=[]
var bartArray=[]
var ballo_Array=[]
var ballt_Array=[]
var baro_Array=[]
var bart_Array=[]
var ballo__Array=[]
var ballt__Array=[]
var baro__Array=[]
var bart__Array=[]
var X=0
var Z1=-150
var Z2=-150
var n=50
var theta=0
//敵襲(一顆)
var en1,en2,en3,en4,en5,en6
var ball1Array=[]
var ball2Array=[]
var ball3Array=[]
var ball4Array=[]
var ball5Array=[]
var ball6Array=[]
var ball7Array=[]
var ball8Array=[]
var NN=50
var time=0
//振幅
var AA=7.5
//波長
var lambda=25
//週期
var period=5
//特效(btn01,btn02)
var coMoArray=[]
var nn=225
var h1,h2
//時間
var Sp=1
var Start=0
//結局
var Com1=0//撞牆
var Com2A=0//地面
var Com2B=0//主角
var Com3=0//贏(小)
var Com4=0//輸
var Com5=0//贏
//階段
var mo=1
//多點偵測
var mo4o=0
var mo4t=0
var mo5o=0
var mo5t=0
var mo6o=0
var mo6t=0
var mo7o=0
var mo7t=0
var mo7th=0
var mo8o=0
var mo8t=0
var mo8th=0
var mo9o=0
var mo9t=0
var mo9th=0
var mo10o=0
var mo10t=0
var mo10th=0
var mo11o=0
var mo11t=0
var mo11th=0
var mo12o=0
var mo12t=0
var mo12th=0
var mo12f=0
var mo12fi=0
var mo13o=0
var mo13t=0
var mo14o=0
var mo14t=0
var mo15o=0
var mo15t=0

//B.定義init
function init(){
	//地板
	ground.visible=false
	//文字
	pp=new TEACHER.ObjTextPlane(100,12.5,"163016林鼎軒","z",0xFFFF00)
	scene.add(pp)
	pp.position.z=50
	pp.position.y=15
	logo.position.z=50
	//文字後
	victory=new TEACHER.ObjTextPlane(100,12.5,"victory","z",0x000001)
	defeat=new TEACHER.ObjTextPlane(100,12.5,"defeat","z",0x000001)
	scene.add(victory).add(defeat)
	victory.position.z=defeat.position.z=-150
	victory.position.y=defeat.position.y=20
	victory.position.x=-100
	defeat.position.x=100
	victory.visible=defeat.visible=false
	//相機
	world2D.slCameraRR.value=100
	world2D.slCameraRR.visible=false
	//粒子1
	pts1=new TEACHER.Points(0x00FFFF,1.25,10000)
	for(var i=0;i<nn1*nn1;i+=1){
		pts1.addPoint(i%nn1-0.5*nn1 , 0 , Math.floor(i/nn1-0.5*nn1))
	}
	pts1.update()
	scene.add(pts1)
	pts1.position.z=0
	pts1.visible=false
	//粒子2
	pts2=new TEACHER.Points(0xFF00FF,1.25,10000)
	for(var i=0;i<nn1*nn1;i+=1){
		pts2.addPoint(i%nn1-0.5*nn1 , 0 , Math.floor(i/nn1-0.5*nn1))
	}
	pts2.update()
	scene.add(pts2)
	pts2.position.z=-100
	pts2.visible=false

	//底部
	flo1=new TEACHER.ObjPlane(12.5,200,0x000001,"y",2)
	scene.add(flo1)
	flo1.position.x=-43.75
	flo1.position.z=-50
	flo1.visible=false
	flo2=new TEACHER.ObjPlane(12.5,200,0x000001,"y",2)
	scene.add(flo2)
	flo2.position.x=-31.25
	flo2.position.z=-50
	flo2.visible=false
	flo3=new TEACHER.ObjPlane(12.5,200,0x000001,"y",2)
	scene.add(flo3)
	flo3.position.x=-18.75
	flo3.position.z=-50
	flo3.visible=false
	flo4=new TEACHER.ObjPlane(12.5,200,0x000001,"y",2)
	scene.add(flo4)
	flo4.position.x=-6.25
	flo4.position.z=-50
	flo4.visible=false
	flo5=new TEACHER.ObjPlane(12.5,200,0x000001,"y",2)
	scene.add(flo5)
	flo5.position.x=6.25
	flo5.position.z=-50
	flo5.visible=false
	flo6=new TEACHER.ObjPlane(12.5,200,0x000001,"y",2)
	scene.add(flo6)
	flo6.position.x=18.75
	flo6.position.z=-50
	flo6.visible=false
	flo7=new TEACHER.ObjPlane(12.5,200,0x000001,"y",2)
	scene.add(flo7)
	flo7.position.x=31.25
	flo7.position.z=-50
	flo7.visible=false
	flo8=new TEACHER.ObjPlane(12.5,200,0x000001,"y",2)
	scene.add(flo8)
	flo8.position.x=43.75
	flo8.position.z=-50
	flo8.visible=false

	//操控
	hero=new TEACHER.ObjSphere(2.5,0xFFFFFF,2)
	scene.add(hero)
	hero.position.x=0
	hero.position.y=5
	hero.position.z=42.5
	hero.visible=false

	//敵襲(龍捲)
	for(var i=0;i<n;i+=1){
		if(i%2===0){
			var bb1=new TEACHER.ObjSphere(2,0xFF0000)
			var bb3=new TEACHER.ObjSphere(2,0xFF0000)
			var bar1=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFF0000,true,"x")
			var bar3=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFF0000,true,"x")
			bb1.position.y=bb3.position.y=bar1.position.y=bar3.position.y=2+i
			scene.add(bb1).add(bb3).add(bar1).add(bar3)
			balloArray.push(bb1)
			balltArray.push(bb3)
			baroArray.push(bar1)
			bartArray.push(bar3)
			bb1.position.x=bb3.position.x=bar1.position.x=bar3.position.x=-25
			bb1.position.z=bb3.position.z=bar1.position.z=bar3.position.z=-150
			bb1.visible=bb3.visible=bar1.visible=bar3.visible=false
		}else if(i%2===1){
			var bb2=new TEACHER.ObjSphere(2,0xFFFFFF)
			var bb4=new TEACHER.ObjSphere(2,0xFFFFFF)
			var bar2=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFFFFFF,true,"x")
			var bar4=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFFFFFF,true,"x")	
			bb2.position.y=bb4.position.y=bar2.position.y=bar4.position.y=3+i
			scene.add(bb2).add(bb4).add(bar2).add(bar4)
			balloArray.push(bb2)
			balltArray.push(bb4)
			baroArray.push(bar2)
			bartArray.push(bar4)
			bb2.position.x=bb4.position.x=bar2.position.x=bar4.position.x=-25
			bb2.position.z=bb4.position.z=bar2.position.z=bar4.position.z=-150
			bb2.visible=bb4.visible=bar2.visible=bar4.visible=false
		}
	}
	for(var i=0;i<n;i+=1){
		if(i%2===0){
			var bb1=new TEACHER.ObjSphere(2,0xFF0000)
			var bb3=new TEACHER.ObjSphere(2,0xFF0000)
			var bar1=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFF0000,true,"x")
			var bar3=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFF0000,true,"x")
			bb1.position.y=bb3.position.y=bar1.position.y=bar3.position.y=2+i
			scene.add(bb1).add(bb3).add(bar1).add(bar3)
			ballo_Array.push(bb1)
			ballt_Array.push(bb3)
			baro_Array.push(bar1)
			bart_Array.push(bar3)
			bb1.position.x=bb3.position.x=bar1.position.x=bar3.position.x=0
			bb1.position.z=bb3.position.z=bar1.position.z=bar3.position.z=-150
			bb1.visible=bb3.visible=bar1.visible=bar3.visible=false
		}else if(i%2===1){
			var bb2=new TEACHER.ObjSphere(2,0xFFFFFF)
			var bb4=new TEACHER.ObjSphere(2,0xFFFFFF)
			var bar2=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFFFFFF,true,"x")
			var bar4=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFFFFFF,true,"x")	
			bb2.position.y=bb4.position.y=bar2.position.y=bar4.position.y=3+i
			scene.add(bb2).add(bb4).add(bar2).add(bar4)
			ballo_Array.push(bb2)
			ballt_Array.push(bb4)
			baro_Array.push(bar2)
			bart_Array.push(bar4)
			bb2.position.x=bb4.position.x=bar2.position.x=bar4.position.x=0
			bb2.position.z=bb4.position.z=bar2.position.z=bar4.position.z=-150
			bb2.visible=bb4.visible=bar2.visible=bar4.visible=false
		}
	}
	for(var i=0;i<n;i+=1){
		if(i%2===0){
			var bb1=new TEACHER.ObjSphere(2,0xFF0000)
			var bb3=new TEACHER.ObjSphere(2,0xFF0000)
			var bar1=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFF0000,true,"x")
			var bar3=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFF0000,true,"x")
			bb1.position.y=bb3.position.y=bar1.position.y=bar3.position.y=2+i
			scene.add(bb1).add(bb3).add(bar1).add(bar3)
			ballo__Array.push(bb1)
			ballt__Array.push(bb3)
			baro__Array.push(bar1)
			bart__Array.push(bar3)
			bb1.position.x=bb3.position.x=bar1.position.x=bar3.position.x=25
			bb1.position.z=bb3.position.z=bar1.position.z=bar3.position.z=-150
			bb1.visible=bb3.visible=bar1.visible=bar3.visible=false
		}else if(i%2===1){
			var bb2=new TEACHER.ObjSphere(2,0xFFFFFF)
			var bb4=new TEACHER.ObjSphere(2,0xFFFFFF)
			var bar2=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFFFFFF,true,"x")
			var bar4=new TEACHER.ObjCylinder(0.25,i/2+0.00001,0xFFFFFF,true,"x")	
			bb2.position.y=bb4.position.y=bar2.position.y=bar4.position.y=3+i
			scene.add(bb2).add(bb4).add(bar2).add(bar4)
			ballo__Array.push(bb2)
			ballt__Array.push(bb4)
			baro__Array.push(bar2)
			bart__Array.push(bar4)
			bb2.position.x=bb4.position.x=bar2.position.x=bar4.position.x=25
			bb2.position.z=bb4.position.z=bar2.position.z=bar4.position.z=-150
			bb2.visible=bb4.visible=bar2.visible=bar4.visible=false
		}
	}
	//敵襲(一顆)
	en1=new TEACHER.ObjSphere(1.25,0xFF0000,2)
	scene.add(en1)
	en1.position.x=-25
	en1.position.y=25
	en1.position.z=-150
	en2=new TEACHER.ObjSphere(1.25,0x00FF00,2)
	scene.add(en2)
	en2.position.x=0
	en2.position.y=25
	en2.position.z=-150
	en3=new TEACHER.ObjSphere(1.25,0x0000FF,2)
	scene.add(en3)
	en3.position.x=25
	en3.position.y=25
	en3.position.z=-150
	en4=new TEACHER.ObjSphere(1.25,0xFFFF00,2)
	scene.add(en4)
	en4.position.x=-25
	en4.position.y=5
	en4.position.z=-150
	en5=new TEACHER.ObjSphere(1.25,0xFF00FF,2)
	scene.add(en5)
	en5.position.x=0
	en5.position.y=5
	en5.position.z=-150
	en6=new TEACHER.ObjSphere(1.25,0x00FFFF,2)
	scene.add(en6)
	en6.position.x=25
	en6.position.y=5
	en6.position.z=-150
	en1.visible=en2.visible=en3.visible=en4.visible=en5.visible=en6.visible=false
	//敵襲(特殊)
	ball1Array=[]
	ball2Array=[]
	ball3Array=[]
	ball4Array=[]
	ball5Array=[]
	ball6Array=[]
	ball7Array=[]
	ball8Array=[]
	for(var i=0;i<NN;i+=1){
		//橫1白
		var bb1=new TEACHER.ObjCylinder(1.25,2.5,0xFFFFFF,2)
		bb1.position.x=-50+i*2
		bb1.position.y=2.5
		bb1.position.z=-37.5
		scene.add(bb1)
		ball1Array.push(bb1)
		//直2紅
		var bb2=new TEACHER.ObjCylinder(1.25,2.5,0xFF0000,2)
		bb2.position.x=-37.5
		bb2.position.y=2.5
		bb2.position.z=-50+i*2
		scene.add(bb2)
		ball2Array.push(bb2)
		//橫3綠
		var bb3=new TEACHER.ObjCylinder(1.25,2.5,0x00FF00,2)
		bb3.position.x=-50+i*2
		bb3.position.y=2.5
		bb3.position.z=-12.5
		scene.add(bb3)
		ball3Array.push(bb3)
		//直4靛
		var bb4=new TEACHER.ObjCylinder(1.25,2.5,0x0000FF,2)
		bb4.position.x=-12.5
		bb4.position.y=2.5
		bb4.position.z=-50+i*2
		scene.add(bb4)
		ball4Array.push(bb4)
		//橫5黃
		var bb5=new TEACHER.ObjCylinder(1.25,2.5,0xFFFF00,2)
		bb5.position.x=-50+i*2
		bb5.position.y=2.5
		bb5.position.z=12.5
		scene.add(bb5)
		ball5Array.push(bb5)
		//直6藍
		var bb6=new TEACHER.ObjCylinder(1.25,2.5,0x00FFFF,2)
		bb6.position.x=12.5
		bb6.position.y=2.5
		bb6.position.z=-50+i*2
		scene.add(bb6)
		ball6Array.push(bb6)
		//橫7紫
		var bb7=new TEACHER.ObjCylinder(1.25,2.5,0xFF00FF,2)
		bb7.position.x=-50+i*2
		bb7.position.y=2.5
		bb7.position.z=37.5
		scene.add(bb7)
		ball7Array.push(bb7)
		//直8黑
		var bb8=new TEACHER.ObjCylinder(1.25,2.5,0x000001,2)
		bb8.position.x=37.5
		bb8.position.y=2.5
		bb8.position.z=-50+i*2
		scene.add(bb8)
		ball8Array.push(bb8)
		bb1.visible=bb2.visible=bb3.visible=bb4.visible=bb5.visible=bb6.visible=bb7.visible=bb8.visible=false
	}

	//特效
	coMoArray=[]
	//x:-3.75~3.75/y:2.5~7.5/z:38.75~46.25
	for(var i=0;i<nn;i+=1){
		var coMo=new TEACHER.ObjPlane(0.25,2.5,0xFF00FF,"z",2)
		scene.add(coMo)
		coMoArray.push(coMo)
		coMo.position.x=-3.5+(i%15)*0.5
		coMo.position.y=2.5+(i%15)/3
		coMo.position.z=39+Math.floor(i/15)*0.5
		coMo.visible=false
	}
	//互動
	world2D.sl01.setLabel('拉到10000就贏')
	world2D.sl01.value=0
	world2D.sl01.minimum=0
	world2D.sl01.maximum=9999
	world2D.sl01.digitN=0
	world2D.ch01.setLabel('結局1')
	world2D.ch01.checked=false
	world2D.ch02.setLabel('結局2')
	world2D.ch02.checked=false
	world2D.ch03.setLabel('結局3')
	world2D.ch03.checked=false
	world2D.ch04.setLabel('結局4')
	world2D.ch04.checked=false
	world2D.ch05.setLabel('結局5')
	world2D.ch05.checked=false
	world2D.btn01.setLabel("彩虹橋,開")
	world2D.btn02.setLabel("駭客,啟動")
	world2D.btn03.setLabel("時間掌控")
	world2D.btn04.setLabel("遊戲開始")
	world2D.btn05.setLabel("跳第二層")
	world2D.btn06.setLabel("跳第三層")

	world2D.sl01.visible=world2D.ch01.visible=world2D.ch02.visible=world2D.ch03.visible=world2D.ch04.visible=world2D.ch05.visible=world2D.btn01.visible=world2D.btn02.visible=world2D.btn03.visible=world2D.btn04.visible=world2D.btn05.visible=world2D.btn06.visible=world2D.btnUp.visible=world2D.btnDown.visible=world2D.btnLeft.visible=world2D.btnRight.visible=false

	//偵測
	world2D.btnUp.on('click',clickBtn)
	world2D.btnDown.on('click',clickBtn)
	world2D.btnLeft.on('click',clickBtn)
	world2D.btnRight.on('click',clickBtn)
	world2D.btn01.on('click',clickBtn)
	world2D.btn02.on('click',clickBtn)
	world2D.btn03.on('click',clickBtn)
	world2D.btn04.on('click',clickBtn)
	world2D.btn05.on('click',clickBtn)
	world2D.btn06.on('click',clickBtn)

	setInterval(tick,1000/fps);
}


//C.定義tick
function tick(){
	//開場
	if(pp.position.z>-150){
		pp.position.z-=2.5
		logo.position.z-=2.5
	}else if(pp.position.z<=-150){
		pp.position.z=logo.position.z=-150
		flo1.visible=flo2.visible=flo3.visible=flo4.visible=true
		flo5.visible=flo6.visible=flo7.visible=flo8.visible=true
		hero.visible=true
		for(var i=0;i<nn;i+=1){
			var coMo=coMoArray[i]
			coMo.visible=true
		}
		world2D.sl01.visible=world2D.ch01.visible=world2D.ch02.visible=world2D.ch03.visible=world2D.ch04.visible=world2D.ch05.visible=world2D.btn01.visible=world2D.btn02.visible=world2D.btn03.visible=world2D.btn04.visible=world2D.btn05.visible=world2D.btn06.visible=world2D.btnUp.visible=world2D.btnDown.visible=world2D.btnLeft.visible=world2D.btnRight.visible=true
		
	}
	//sl01(假贏)
	if(world2D.sl01.value===9999){
		Com3=1
	}else if(world2D.sl01.value>5000){
		world2D.sl01.value-=4000
	}else if(world2D.sl01.value>3750){
		world2D.sl01.value-=2000
	}else if(world2D.sl01.value>2500){
		world2D.sl01.value-=1000
	}else if(world2D.sl01.value>1250){
		world2D.sl01.value-=500
	}else{
		world2D.sl01.value=0
	}
	
	//btn03控制是否動
	if(Start===1){
		if(Sp===0.1){
			pts1.visible=pts2.visible=true
			tt+=dt
			//粒子1
			for(var i=0;i<nn1*nn1;i+=1){
				var pt1=pts1.getPoint(i)
				var xx=pt1.x
				var zz=pt1.z
				var rr=Math.sqrt(xx*xx+zz*zz)
				var yy=2.5*Math.sin(2.5*Math.PI*rr/lambda - 2.5*Math.PI*tt/10)
				pts1.setPoint(i,xx,yy,zz)
			}
			pts1.update()
			//粒子2
			for(var i=0;i<nn1*nn1;i+=1){
				var pt2=pts2.getPoint(i)
				var xx=pt2.x
				var zz=pt2.z
				var rr=Math.sqrt(xx*xx+zz*zz)
				var yy=2.5*Math.sin(2.5*Math.PI*rr/lambda - 2.5*Math.PI*tt/10)
				pts2.setPoint(i,xx,yy,zz)
			}
			pts2.update()
		}else{
			pts1.visible=pts2.visible=false
		}
		//btn01(彩色)
		if(Com2A===1){
			if(h2<1 && Sp===1){
				h2+=0.01
			}else if(h2<1 && Sp===0.1){
				h2+=0.001
			}else if(h2=1){
				h2=0
			}
			flo1.mat.color.setHSL(h2+0.125,1,0.5)
			flo2.mat.color.setHSL(h2+0.25,1,0.5)
			flo3.mat.color.setHSL(h2+0.375,1,0.5)
			flo4.mat.color.setHSL(h2+0.5,1,0.5)
			flo5.mat.color.setHSL(h2+0.625,1,0.5)
			flo6.mat.color.setHSL(h2+0.75,1,0.5)
			flo7.mat.color.setHSL(h2+0.875,1,0.5)
			flo8.mat.color.setHSL(h2+1,1,0.5)
		}else if(Com2A===0){
			flo1.mat.color.setHex(0x000001)
			flo2.mat.color.setHex(0x000001)
			flo3.mat.color.setHex(0x000001)
			flo4.mat.color.setHex(0x000001)
			flo5.mat.color.setHex(0x000001)
			flo6.mat.color.setHex(0x000001)
			flo7.mat.color.setHex(0x000001)
			flo8.mat.color.setHex(0x000001)
		}
		//btn02(亂碼)
		if(Com2B===1){
			for(var i=0;i<nn;i+=1){
				var coMo=coMoArray[i]
				if(hero.position.y===5){
					if(coMo.position.y<7.5 && Sp===1){
						coMo.position.y+=Math.random()/3.75
					}else if(coMo.position.y<7.5 && Sp===0.1){
						coMo.position.y+=Math.random()/37.5
					}else if(coMo.position.y>=7.5){
						coMo.position.y=2.5
					}
				}else if(hero.position.y===25){
					if(coMo.position.y<27.5 && Sp===1){
						coMo.position.y+=Math.random()/3.75
					}else if(coMo.position.y<27.5 && Sp===0.1){
						coMo.position.y+=Math.random()/37.5
					}else if(coMo.position.y>=27.5){
						coMo.position.y=22.5
					}
				}
				coMo.mat.color.setHSL(h1+(i%15)/15,h1+(i%15)/15,0.5)
				coMo.position.x=hero.position.x-3.5+(i%15)*0.5
			}
			if(h1<1 && Sp===1){
				h1+=0.01
			}else if(h1<1 && Sp===0.1){
				h1+=0.001
			}else if(h1=1){
				h1=0
			}
		}else if(Com2B===0){
			for(var i=0;i<nn;i+=1){
				var coMo=coMoArray[i]
				coMo.visible=false
			}
		}










		//敵襲(龍捲)
		theta+=dt*Sp
		if(mo===1){
			if(Z1<42.5){
				Z1+=2.5
			}
				for(var i=0;i<n;i+=1){//mo1
					var bao=balloArray[i]
					var bat=balltArray[i]
					var baro=baroArray[i]
					var bart=bartArray[i]
					bao.visible=bat.visible=baro.visible=bart.visible=true
					//bao
					bao.position.x=i/2*Math.cos(i*2*theta)-25
					bao.position.z=i/2*Math.sin(i*2*theta)+Z1
					//bat
					bat.position.x=-i/2*Math.cos(i*2*theta)-25
					bat.position.z=-i/2*Math.sin(i*2*theta)+Z1
					//baro
					baro.position.x=0.5*i/2*Math.cos(i*2*theta)-25
					baro.position.z=0.5*i/2*Math.sin(i*2*theta)+Z1
					baro.rotation.y=-theta
					//bart
					bart.position.x=-0.5*i/2*Math.cos(i*2*theta)-25
					bart.position.z=-0.5*i/2*Math.sin(i*2*theta)+Z1
					bart.rotation.y=-theta

					if(Z1>=42.5 && hero.position.x===-25){
						bao.visible=bat.visible=baro.visible=bart.visible=false
						bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
						mo=0
						Com4=1
					}else if(Z1>=42.5 && hero.position.x!==-25){
						bao.visible=bat.visible=baro.visible=bart.visible=false
						bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
						mo=2
						Z1=-150
						Com5=1
					}
				}
		}else if(mo===2){
			if(Z1<42.5){
				Z1+=2.5
			}
			for(var i=0;i<n;i+=1){//mo2
				var bao=ballo_Array[i]
				var bat=ballt_Array[i]
				var baro=baro_Array[i]
				var bart=bart_Array[i]
				bao.visible=bat.visible=baro.visible=bart.visible=true
				//bao
				bao.position.x=i/2*Math.cos(i*2*theta)
				bao.position.z=i/2*Math.sin(i*2*theta)+Z1
				//bat
				bat.position.x=-i/2*Math.cos(i*2*theta)
				bat.position.z=-i/2*Math.sin(i*2*theta)+Z1
				//baro
				baro.position.x=0.5*i/2*Math.cos(i*2*theta)
				baro.position.z=0.5*i/2*Math.sin(i*2*theta)+Z1
				baro.rotation.y=-theta
				//bart
				bart.position.x=-0.5*i/2*Math.cos(i*2*theta)
				bart.position.z=-0.5*i/2*Math.sin(i*2*theta)+Z1
				bart.rotation.y=-theta

				if(Z1>=42.5 && hero.position.x===0){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=0
					Com4=1
				}else if(Z1>=42.5 && hero.position.x!==0){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=3
					Z1=-150
					Com5=1
				}
			}
		}else if(mo===3){
			if(Z1<42.5){
				Z1+=2.5
			}
			for(var i=0;i<n;i+=1){//mo3
				var bao=ballo__Array[i]
				var bat=ballt__Array[i]
				var baro=baro__Array[i]
				var bart=bart__Array[i]
				bao.visible=bat.visible=baro.visible=bart.visible=true
				//bao
				bao.position.x=i/2*Math.cos(i*2*theta)+25
				bao.position.z=i/2*Math.sin(i*2*theta)+Z1
				//bat
				bat.position.x=-i/2*Math.cos(i*2*theta)+25
				bat.position.z=-i/2*Math.sin(i*2*theta)+Z1
				//baro
				baro.position.x=0.5*i/2*Math.cos(i*2*theta)+25
				baro.position.z=0.5*i/2*Math.sin(i*2*theta)+Z1
				baro.rotation.y=-theta
				//bart
				bart.position.x=-0.5*i/2*Math.cos(i*2*theta)+25
				bart.position.z=-0.5*i/2*Math.sin(i*2*theta)+Z1
				bart.rotation.y=-theta

				if(Z1>=42.5 && hero.position.x===25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=0
					Com4=1
				}else if(Z1>=42.5 && hero.position.x!==25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=4
					Z1=-150
					Com5=1
				}
			}
		}else if(mo===4){
			if(Z1<42.5){
				Z1+=2.5
			}
			for(var i=0;i<n;i+=1){//mo2
				var bao=ballo_Array[i]
				var bat=ballt_Array[i]
				var baro=baro_Array[i]
				var bart=bart_Array[i]
				bao.visible=bat.visible=baro.visible=bart.visible=true
				//bao
				bao.position.x=i/2*Math.cos(i*2*theta)
				bao.position.z=i/2*Math.sin(i*2*theta)+Z1
				//bat
				bat.position.x=-i/2*Math.cos(i*2*theta)
				bat.position.z=-i/2*Math.sin(i*2*theta)+Z1
				//baro
				baro.position.x=0.5*i/2*Math.cos(i*2*theta)
				baro.position.z=0.5*i/2*Math.sin(i*2*theta)+Z1
				baro.rotation.y=-theta
				//bart
				bart.position.x=-0.5*i/2*Math.cos(i*2*theta)
				bart.position.z=-0.5*i/2*Math.sin(i*2*theta)+Z1
				bart.rotation.y=-theta

				if(Z1>=42.5 && hero.position.x===0){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=0
					Com4=1
				}else if(Z1>=42.5 && hero.position.x!==0){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo4o=1
				}
			}
			for(var i=0;i<n;i+=1){//mo3
				var bao=ballo__Array[i]
				var bat=ballt__Array[i]
				var baro=baro__Array[i]
				var bart=bart__Array[i]
				bao.visible=bat.visible=baro.visible=bart.visible=true
				//bao
				bao.position.x=i/2*Math.cos(i*2*theta)+25
				bao.position.z=i/2*Math.sin(i*2*theta)+Z1
				//bat
				bat.position.x=-i/2*Math.cos(i*2*theta)+25
				bat.position.z=-i/2*Math.sin(i*2*theta)+Z1
				//baro
				baro.position.x=0.5*i/2*Math.cos(i*2*theta)+25
				baro.position.z=0.5*i/2*Math.sin(i*2*theta)+Z1
				baro.rotation.y=-theta
				//bart
				bart.position.x=-0.5*i/2*Math.cos(i*2*theta)+25
				bart.position.z=-0.5*i/2*Math.sin(i*2*theta)+Z1
				bart.rotation.y=-theta

				if(Z1>=42.5 && hero.position.x===25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=0
					Com4=1
				}else if(Z1>=42.5 && hero.position.x!==25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo4t=1
				}
			}
			if(mo4o===1 && mo4t===1){
				mo=5
				Z1=-150
				Com5=1
			}
		}else if(mo===5){
			if(Z1<42.5){
				Z1+=2.5
			}
			for(var i=0;i<n;i+=1){//mo1
				var bao=balloArray[i]
				var bat=balltArray[i]
				var baro=baroArray[i]
				var bart=bartArray[i]
				bao.visible=bat.visible=baro.visible=bart.visible=true
				//bao
				bao.position.x=i/2*Math.cos(i*2*theta)-25
				bao.position.z=i/2*Math.sin(i*2*theta)+Z1
				//bat
				bat.position.x=-i/2*Math.cos(i*2*theta)-25
				bat.position.z=-i/2*Math.sin(i*2*theta)+Z1
				//baro
				baro.position.x=0.5*i/2*Math.cos(i*2*theta)-25
				baro.position.z=0.5*i/2*Math.sin(i*2*theta)+Z1
				baro.rotation.y=-theta
				//bart
				bart.position.x=-0.5*i/2*Math.cos(i*2*theta)-25
				bart.position.z=-0.5*i/2*Math.sin(i*2*theta)+Z1
				bart.rotation.y=-theta

				if(Z1>=42.5 && hero.position.x===-25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=0
					Com4=1
				}else if(Z1>=42.5 && hero.position.x!==-25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo5o=1
				}
			}
			for(var i=0;i<n;i+=1){//mo2
				var bao=ballo_Array[i]
				var bat=ballt_Array[i]
				var baro=baro_Array[i]
				var bart=bart_Array[i]
				bao.visible=bat.visible=baro.visible=bart.visible=true
				//bao
				bao.position.x=i/2*Math.cos(i*2*theta)
				bao.position.z=i/2*Math.sin(i*2*theta)+Z1
				//bat
				bat.position.x=-i/2*Math.cos(i*2*theta)
				bat.position.z=-i/2*Math.sin(i*2*theta)+Z1
				//baro
				baro.position.x=0.5*i/2*Math.cos(i*2*theta)
				baro.position.z=0.5*i/2*Math.sin(i*2*theta)+Z1
				baro.rotation.y=-theta
				//bart
				bart.position.x=-0.5*i/2*Math.cos(i*2*theta)
				bart.position.z=-0.5*i/2*Math.sin(i*2*theta)+Z1
				bart.rotation.y=-theta

				if(Z1>=42.5 && hero.position.x===0){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=0
					Com4=1
				}else if(Z1>=42.5 && hero.position.x!==0){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo5t=1
				}
			}
			if(mo5o===1 && mo5t===1){
				mo=6
				Z1=-150
				Com5=1
			}
		}else if(mo===6){
			if(Z1<42.5){
				Z1+=2.5
			}
			for(var i=0;i<n;i+=1){//mo1
				var bao=balloArray[i]
				var bat=balltArray[i]
				var baro=baroArray[i]
				var bart=bartArray[i]
				bao.visible=bat.visible=baro.visible=bart.visible=true
				//bao
				bao.position.x=i/2*Math.cos(i*2*theta)-25
				bao.position.z=i/2*Math.sin(i*2*theta)+Z1
				//bat
				bat.position.x=-i/2*Math.cos(i*2*theta)-25
				bat.position.z=-i/2*Math.sin(i*2*theta)+Z1
				//baro
				baro.position.x=0.5*i/2*Math.cos(i*2*theta)-25
				baro.position.z=0.5*i/2*Math.sin(i*2*theta)+Z1
				baro.rotation.y=-theta
				//bart
				bart.position.x=-0.5*i/2*Math.cos(i*2*theta)-25
				bart.position.z=-0.5*i/2*Math.sin(i*2*theta)+Z1
				bart.rotation.y=-theta

				if(Z1===42.5 && hero.position.x===-25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=0
					Com4=1
				}else if(Z1===42.5 && hero.position.x!==-25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo6o=1
				}
			}
			for(var i=0;i<n;i+=1){//mo3
				var bao=ballo__Array[i]
				var bat=ballt__Array[i]
				var baro=baro__Array[i]
				var bart=bart__Array[i]
				bao.visible=bat.visible=baro.visible=bart.visible=true
				//bao
				bao.position.x=i/2*Math.cos(i*2*theta)+25
				bao.position.z=i/2*Math.sin(i*2*theta)+Z1
				//bat
				bat.position.x=-i/2*Math.cos(i*2*theta)+25
				bat.position.z=-i/2*Math.sin(i*2*theta)+Z1
				//baro
				baro.position.x=0.5*i/2*Math.cos(i*2*theta)+25
				baro.position.z=0.5*i/2*Math.sin(i*2*theta)+Z1
				baro.rotation.y=-theta
				//bart
				bart.position.x=-0.5*i/2*Math.cos(i*2*theta)+25
				bart.position.z=-0.5*i/2*Math.sin(i*2*theta)+Z1
				bart.rotation.y=-theta

				if(Z1===42.5 && hero.position.x===25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo=0
					Com4=1
				}else if(Z1===42.5 && hero.position.x!==25){
					bao.visible=bat.visible=baro.visible=bart.visible=false
					bao.position.z=bat.position.z=baro.position.z=bart.position.z=-150
					mo6t=1
				}
			}
			if(mo6o===1 && mo6t===1){
				mo=7
				Z1=-150
				Com5=1
			}
		//敵襲(球)
		}else if(mo===7){
			for(var i=0;i<n;i+=1){//mo1
				var bao=balloArray[i]
				var bat=balltArray[i]
				var baro=baroArray[i]
				var bart=bartArray[i]
				bao.visible=bat.visible=baro.visible=bart.visible=false
			}
			for(var i=0;i<n;i+=1){//mo2
				var bao=ballo_Array[i]
				var bat=ballt_Array[i]
				var baro=baro_Array[i]
				var bart=bart_Array[i]
				bao.visible=bat.visible=baro.visible=bart.visible=false
			}
			for(var i=0;i<n;i+=1){//mo3
				var bao=ballo__Array[i]
				var bat=ballt__Array[i]
				var baro=baro__Array[i]
				var bart=bart__Array[i]
				bao.visible=bat.visible=baro.visible=bart.visible=false
			}
			en1.visible=en2.visible=en3.visible=en4.visible=en5.visible=en6.visible=true
			en4.position.z+=5
			en5.position.z+=5
			en6.position.z+=5
			if(en4.position.z>=42.5 && hero.position.x===-25 && hero.position.y===5){
				en4.position.z=-150
				mo=0
				Com4=1
			}else if(en4.position.z>=42.5){
				en4.position.z=-150
				mo7o=1
			}
			if(en5.position.z>=42.5 && hero.position.x===0 && hero.position.y===5){
				en5.position.z=-150
				mo=0
				Com4=1
			}else if(en5.position.z>=42.5){
				en5.position.z=-150
				mo7t=1
			}
			if(en6.position.z>=42.5 && hero.position.x===25 && hero.position.y===5){
				en6.position.z=-150
				mo=0
				Com4=1
			}else if(en6.position.z>=42.5){
				en6.position.z=-150
				mo7th=1
			}
			if(mo7o===1 && mo7t===1 && mo7th===1){
				mo=8
				Com5=1
			}
		}else if(mo===8){
			en1.position.z+=5
			en2.position.z+=5
			en3.position.z+=5
			if(en1.position.z>=42.5 && hero.position.x===-25 && hero.position.y===25){
				en1.position.z=-150
				mo=0
				Com4=1
			}else if(en1.position.z>=42.5){
				en1.position.z=-150
				mo8o=1
			}
			if(en2.position.z>=42.5 && hero.position.x===0 && hero.position.y===25){
				en2.position.z=-150
				mo=0
				Com4=1
			}else if(en2.position.z>=42.5){
				en2.position.z=-150
				mo8t=1
			}
			if(en3.position.z>=42.5 && hero.position.x===25 && hero.position.y===25){
				en3.position.z=-150
				mo=0
				Com4=1
			}else if(en3.position.z>=42.5){
				en3.position.z=-150
				mo8th=1
			}
			if(mo8o===1 && mo8t===1 && mo8th===1){
				mo=9
				Com5=1
			}
		}else if(mo===9){
			en2.position.z+=5
			en4.position.z+=5
			en5.position.z+=5
			if(en2.position.z>=42.5 && hero.position.x===0 && hero.position.y===25){
				en2.position.z=-150
				mo=0
				Com4=1
			}else if(en2.position.z>=42.5){
				en2.position.z=-150
				mo9o=1
			}
			if(en4.position.z>=42.5 && hero.position.x===-25 && hero.position.y===5){
				en4.position.z=-150
				mo=0
				Com4=1
			}else if(en4.position.z>=42.5){
				en4.position.z=-150
				mo9t=1
			}
			if(en5.position.z>=42.5 && hero.position.x===0 && hero.position.y===5){
				en5.position.z=-150
				mo=0
				Com4=1
			}else if(en5.position.z>=42.5){
				en5.position.z=-150
				mo9th=1
			}
			if(mo9o===1 && mo9t===1 && mo9th===1){
				mo=10
				Com5=1
			}
		}else if(mo===10){
			en2.position.z+=5
			en3.position.z+=5
			en6.position.z+=5
			if(en2.position.z>=42.5 && hero.position.x===0 && hero.position.y===25){
				en2.position.z=-150
				mo=0
				Com4=1
			}else if(en2.position.z>=42.5){
				en2.position.z=-150
				mo10o=1
			}
			if(en3.position.z>=42.5 && hero.position.x===25 && hero.position.y===25){
				en3.position.z=-150
				mo=0
				Com4=1
			}else if(en3.position.z>=42.5){
				en3.position.z=-150
				mo10t=1
			}
			if(en6.position.z>=42.5 && hero.position.x===25 && hero.position.y===5){
				en6.position.z=-150
				mo=0
				Com4=1
			}else if(en6.position.z>=42.5){
				en6.position.z=-150
				mo10th=1
			}
			if(mo10o===1 && mo10t===1 && mo10th===1){
				mo=11
				Com5=1
			}
		}else if(mo===11){
			en1.position.z+=5
			en3.position.z+=5
			en5.position.z+=5
			if(en1.position.z>=42.5 && hero.position.x===-25 && hero.position.y===25){
				en2.position.z=-150
				mo=0
				Com4=1
			}else if(en1.position.z>=42.5){
				en1.position.z=-150
				mo11o=1
			}
			if(en3.position.z>=42.5 && hero.position.x===25 && hero.position.y===25){
				en3.position.z=-150
				mo=0
				Com4=1
			}else if(en3.position.z>=42.5){
				en3.position.z=-150
				mo11t=1
			}
			if(en5.position.z>=42.5 && hero.position.x===0 && hero.position.y===5){
				en5.position.z=-150
				mo=0
				Com4=1
			}else if(en5.position.z>=42.5){
				en5.position.z=-150
				mo11th=1
			}
			if(mo11o===1 && mo11t===1 && mo11th===1){
				mo=12
				Com5=1
			}
		}else if(mo===12){
			en1.position.z+=5
			en2.position.z+=5
			en3.position.z+=5
			en4.position.z+=5
			en6.position.z+=5
			if(en1.position.z>=42.5 && hero.position.x===-25 && hero.position.y===25){
				en2.position.z=-150
				mo=0
				Com4=1
			}else if(en1.position.z>=42.5){
				en1.position.z=-150
				mo12o=1
			}
			if(en2.position.z>=42.5 && hero.position.x===0 && hero.position.y===25){
				en2.position.z=-150
				mo=0
				Com4=1
			}else if(en2.position.z>=42.5){
				en2.position.z=-150
				mo12t=1
			}
			if(en3.position.z>=42.5 && hero.position.x===25 && hero.position.y===25){
				en3.position.z=-150
				mo=0
				Com4=1
			}else if(en3.position.z>=42.5){
				en3.position.z=-150
				mo12th=1
			}
			if(en4.position.z>=42.5 && hero.position.x===-25 && hero.position.y===5){
				en4.position.z=-150
				mo=0
				Com4=1
			}else if(en4.position.z>=42.5){
				en4.position.z=-150
				mo12f=1
			}
			if(en6.position.z>=42.5 && hero.position.x===25 && hero.position.y===5){
				en6.position.z=-150
				mo=0
				Com4=1
			}else if(en6.position.z>=42.5){
				en6.position.z=-150
				mo12fi=1
			}
			if(mo12o===1 && mo12t===1 && mo12th===1 && mo12f===1 && mo12fi===1){
				mo=13
				Com5=1
				en1.visible=en2.visible=en3.visible=en4.visible=en5.visible=en6.visible=false
			}
		}else if(mo===13){
			en1.visible=true
			en1.scale.x=en1.scale.y=en1.scale.z=100
			en1.position.x=-305
			en1.position.z=42.5
			en1.position.x+=10
			if(en1.position.x>=-105 && hero.position.x<=0){
				en1.position.x=-305
				en1.visible=false
				mo=0
				Com4=1
			}else if(en1.position.x>=-105 && hero.position.x===25){
				en1.position.x=-305
				en1.visible=false
				mo13o=1
			}
			en2.visible=true
			en2.scale.x=en2.scale.y=en2.scale.z=100
			en2.position.x=305
			en2.position.z=42.5
			en2.position.x-=10
			if(en2.position.x<=105 && hero.position.x>=0){
				en2.position.x=305
				en2.visible=false
				mo=0
				Com4=1
			}else if(en2.position.x<=105 && hero.position.x===-25){
				en2.position.x=305
				en2.visible=false
				mo13t=1
			}
			if(mo13o===1 && mo13t===1){
				mo=14
				Com5=1
			}
		}else if(mo===14){
			en3.visible=true
			en3.position.x=-200
			en3.position.y=25
			en3.position.z=42.5
			en3.position.x+=25
			if(en3.position.x>=-25 && hero.position.y===25){
				en3.position.x=-200
				en3.visible=false
				mo=0
				Com4=1
			}else if(en3.position.x>=-200 && hero.position.y===5){
				en3.position.x=-200
				en3.visible=false
				mo14o=1
			}
			en4.visible=true
			en4.position.x=200
			en4.position.y=5
			en4.position.z=42.5
			en4.position.x-=25
			if(en4.position.x<=25 && hero.position.y===5){
				en4.position.x=200
				en4.visible=false
				mo=0
				Com4=1
			}else if(en4.position.x<=200 && hero.position.y===25){
				en4.position.x=200
				en4.visible=false
				mo14t=1
			}
			if(mo14o===1 && mo14t===1){
				mo=15
				Com5=1
			}
		}else if(mo===15){
			bb1.visible=bb2.visible=bb3.visible=bb4.visible=bb5.visible=bb6.visible=bb7.visible=bb8.visible=true
			for(var i=0;i<NN;i+=1){
				var bb1=ball1Array[i]
				var yy1= AA * Math.sin ( 2*Math.PI * bb1.position.x/lambda - 2*Math.PI * tt/period )+AA
				bb1.position.y=yy1
	
				var bb2=ball2Array[i]
				var yy2= AA * Math.sin ( 2*Math.PI * bb2.position.z/lambda + 2*Math.PI * tt/period )+AA
				bb2.position.y=yy2
	
				var bb3=ball3Array[i]
				var yy3= AA * Math.sin ( 2*Math.PI * bb3.position.x/lambda + 2*Math.PI * tt/period )+AA
				bb3.position.y=yy3
	
				var bb4=ball4Array[i]
				var yy4= AA * Math.sin ( 2*Math.PI * bb4.position.z/lambda - 2*Math.PI * tt/period )+AA
				bb4.position.y=yy4
	
				var bb5=ball5Array[i]
				var yy5= AA * Math.sin ( 2*Math.PI * bb5.position.x/lambda + 2*Math.PI * tt/period )+AA
				bb5.position.y=yy5
	
				var bb6=ball6Array[i]
				var yy6= AA * Math.sin ( 2*Math.PI * bb6.position.z/lambda - 2*Math.PI * tt/period )+AA
				bb6.position.y=yy6
	
				var bb7=ball7Array[i]
				var yy7= AA * Math.sin ( 2*Math.PI * bb7.position.x/lambda - 2*Math.PI * tt/period )+AA
				bb7.position.y=yy7
	
				var bb8=ball8Array[i]
				var yy8= AA * Math.sin ( 2*Math.PI * bb8.position.z/lambda + 2*Math.PI * tt/period )+AA
				bb8.position.y=yy8
			}
			if(time<1000){
				time+=1
				Com2A=Com2B=1
				Sp=0.1
			}else if(time>=1000){
				mo=16
				Com5=1
			}
		}










	}else{
		for(var i=0;i<nn;i+=1){
			var coMo=coMoArray[i]
			coMo.visible=false
		}
	}
	
	//成就
	if(Com1===5){
		world2D.ch01.setLabel("伊卡洛斯")
		world2D.ch01.checked=true
	}//試圖越過邊界
	if(Com2A===1 && Com2B===1 && Sp===0.1){
		world2D.ch02.setLabel("超極勁爆")
		world2D.ch02.checked=true
		world2D.slCameraRR.value+=upca
		if(world2D.slCameraRR.value>=200 && upca>0){
			upca*=-1
		}else if(world2D.slCameraRR.value<=100 && upca<0){
			upca*=-1
		}
	}//btn01,btn02,btn03
	if(Com3===1 && Start===0){
		world2D.ch03.setLabel("一場騙局")
		world2D.ch03.checked=true
	}//btn04,sl01
	if(Com4===1){
		world2D.ch04.setLabel("致死不虞")
		world2D.ch04.checked=true
		defeat.visible=true
	}//失敗
	if(Com5===1){
		world2D.ch05.checked=true
		if(1<=mo<=7){
			world2D.ch05.setLabel("挺結實的")
		}else if(8<=mo<=13){
			world2D.ch05.setLabel("頂上戰爭")
		}else if(14<=mo<=16){
			world2D.ch05.setLabel("絕滅大師")
			victory.visible=true
			victory.scale+=0.5
			if(victory.scale.x>=10){
				victory.scale-=0.5
			}else if(victory.scale.x<=1){
				victory.scale+=0.5
			}
		}
	}//通關

	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function clickBtn(e){
	var str=e.target.parent.name
	if(str==='btn01'){
		if(Com2A===0){
			Com2A=1
			world2D.btn01.setLabel("彩虹橋,關")
		}else if(Com2A===1){
			Com2A=0
			world2D.btn01.setLabel("彩虹橋,開")
		}
	}else if(str==='btn02'){
		if(Com2B===0){
			Com2B=1
			world2D.btn02.setLabel("駭客,卸載")
		}else if(Com2B===1){
			Com2B=0
			world2D.btn02.setLabel("駭客,啟動")
		}
	}else if(str==='btn03'){
		if(Sp===1){
			Sp=0.1
			world2D.btn03.setLabel("時間放手")
		}else if(Sp===0.1){
			Sp=1
			world2D.btn03.setLabel("時間掌控")
		}
	}else if(str==='btn04'){
		if(Start===1){
			Start=0
			world2D.btn04.setLabel("遊戲開始")
		}else if(Start===0){
			Start=1
			world2D.btn04.setLabel("遊戲暫停")
		}
	}else if(str==='btn05'){
		mo=7
	}else if(str==='btn06'){
		mo=13
	}else if(str==='btnUp'){
		if(hero.position.y===5){
			hero.position.y=25
			for(var i=0;i<nn;i+=1){
				var coMo=coMoArray[i]
				coMo.position.y=22.5+(Math.random())*5
			}
		}else if(hero.position.y===25){
			Com1+=1
		}
	}else if(str==='btnDown'){
		if(hero.position.y===25){
			hero.position.y=5
			for(var i=0;i<nn;i+=1){
				var coMo=coMoArray[i]
				coMo.position.y=2.5+(Math.random())*5
			}
		}else if(hero.position.y===5){
			Com1+=1
		}
	}else if(str==='btnLeft'){
		if(hero.position.x===-25){
			Com1+=1
		}else if(hero.position.x===0){
			hero.position.x=-25
		}else if(hero.position.x===25){
			hero.position.x=0
		}
	}else if(str==='btnRight'){
		if(hero.position.x===-25){
			hero.position.x=0
		}else if(hero.position.x===0){
			hero.position.x=25
		}else if(hero.position.x===25){
			Com1+=1
		}
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
