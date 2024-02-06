'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//------------老師作的萬用半成品(2020.12.01)-----------//

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var p1,p2,p3,p4
var gg
var you
var gamemd=0
var bg1,bg2,bg3,bg4
var g1,g2,g3,g4
var l1,l2,l3
var pic1,pic2,pic3,pic4,pic5,pic6,pic7,pic8,pic9,pic10,pic11,pic12,pic13,pic14
var dt
var w1,w2
var love1,love2,love3
var rr=5
var blank
var wo1,word1,word2,word3,word4,word5
var word6,word7,word8,word9,word10
var word11,word12,word13,word14,word15
var hajime
var aa
var z,zz,zzz
//B.定義init
function init(){

	

	world2D.slCameraRR.maximum=600
	world2D.slCameraRR.value=500
	
	p1 = new TEACHER.ObjCylinder(6,1,0x272727,false,"y",0)
	p1.position.z=-46
	p1.position.y=1
	scene.add(p1)

	/*p2 = new TEACHER.ObjCylinder(6,1,0x272727,false,"y",0)
	p2.position.z=46
	scene.add(p2)*/

	p3 = new TEACHER.ObjCylinder(6,1,0x272727,false,"y",0)
	p3.position.x=46
	p3.position.y=1
	scene.add(p3)

	p4 = new TEACHER.ObjCylinder(6,1,0x272727,false,"y",0)
	p4.position.x=-46
	p4.position.y=1
	scene.add(p4)

	gg = new TEACHER.ObjBox(120,0.5,100,0xFFF8D7,0)
	scene.add(gg)
	gg.position.y=-1
	gg.position.z=-5

	you = new TEACHER.ObjSphere(rr,0xFFE0E0,0)
	scene.add(you)
	you.position.y=rr

	bg1 = new TEACHER.ObjBox(2000,300,500,0xF4EBEB,0)
	bg1.position.z=-500
	scene.add(bg1)

	bg2 = new TEACHER.ObjBox(500,300,300,0xEFE0FF,0)
	bg2.position.x=-500
	scene.add(bg2)

	bg3 = new TEACHER.ObjBox(500,300,300,0xB8F0FF,0)
	bg3.position.x=500
	scene.add(bg3)

	g1 = new TEACHER.ObjBox(50,0.5,50,0xF4EBEB,2)
	g1.position.z=-500
	g1.position.y=-1
	scene.add(g1)

	g2 = new TEACHER.ObjBox(50,0.5,50,0xB8F0FF,2)
	g2.position.x=500
	g2.position.y=-1
	scene.add(g2)

	g3 = new TEACHER.ObjBox(50,0.5,50,0xEFE0FF,2)
	g3.position.x=-500
	g3.position.y=-1
	scene.add(g3)

	//vtuber中照片
	pic1 = new TEACHER.ObjPicPlane(170,100,pics.minase,"z",0)
	scene.add(pic1)
	pic1.position.z=-600
	pic1.position.y=50
	pic1.position.x=-300

	pic2 = new TEACHER.ObjPicPlane(200,100,pics.minasee,"z",0)
	pic2.position.z=-598
	pic2.position.y=50
	scene.add(pic2)

	pic3 = new TEACHER.ObjPicPlane(200,100,pics.raise,"z",0)
	pic3.position.z=-600
	pic3.position.y=50
	pic3.position.x=-500
	scene.add(pic3)

	pic4 = new TEACHER.ObjPicPlane(200,100,pics.raisee,"z",0)
	pic4.position.z=-598
	pic4.position.y=50
	scene.add(pic4)

	pic5 = new TEACHER.ObjPicPlane(200,100,pics.rio,"z",0)
	pic5.position.z=-600
	pic5.position.y=50
	pic5.position.x=-700
	scene.add(pic5)

	pic6 = new TEACHER.ObjPicPlane(200,100,pics.rioo,"z",0)
	pic6.position.z=-598
	pic6.position.y=50
	scene.add(pic6)

	pic7 = new TEACHER.ObjPicPlane(200,100,pics.yui,"z",0)
	pic7.position.z=-600
	pic7.position.y=50
	pic7.position.x=-900
	scene.add(pic7)

	pic8 = new TEACHER.ObjPicPlane(200,100,pics.yuii,"z",0)
	pic8.position.z=-598
	pic8.position.y=50
	scene.add(pic8)

	pic9 = new TEACHER.ObjPicPlane(200,100,pics.salome,"z",0)
	pic9.position.z=-600
	pic9.position.y=50
	pic9.position.x=-1100
	scene.add(pic9)

	pic10 = new TEACHER.ObjPicPlane(200,100,pics.salomee,"z",0)
	pic10.position.z=-598
	pic10.position.y=50
	scene.add(pic10)

	pic11 = new TEACHER.ObjPicPlane(200,100,pics.ike,"z",0)
	pic11.position.z=-600
	pic11.position.y=50
	pic11.position.x=-1300
	scene.add(pic11)

	pic12 = new TEACHER.ObjPicPlane(200,100,pics.ikee,"z",0)
	pic12.position.z=-598
	pic12.position.y=50
	scene.add(pic12)

	pic13 = new TEACHER.ObjPicPlane(200,100,pics.hana,"z",0)
	pic13.position.z=-600
	pic13.position.y=50
	pic13.position.x=-1500
	scene.add(pic13)

	pic14 = new TEACHER.ObjPicPlane(200,100,pics.hanaa,"z",0)
	pic14.position.z=-598
	pic14.position.y=50
	scene.add(pic14)

	w1 = new TEACHER.ObjTextPlane(400,30,"Welcome to my strange world!","z",0xffffff)
	scene.add(w1)
	w1.position.z=-100
	w1.position.y=200

	w2 = new TEACHER.ObjTextPlane(200,30,"156327游奕萱","z",0xffffff)
	scene.add(w2)
	w2.position.z=-100
	w2.position.y=160

	love1 = new TEACHER.ObjTextPlane(20,20,"❤️","z")
	scene.add(love1)
	love1.position.z=-550
	love1.position.y=10
	love1.position.x=40

	love2 = new TEACHER.ObjTextPlane(25,25,"❤️","z")
	scene.add(love2)
	love2.position.z=-550
	love2.position.y=25
	love2.position.x=42

	love3 = new TEACHER.ObjTextPlane(30,30,"❤️","z")
	scene.add(love3)
	love3.position.z=-550
	love3.position.y=45
	love3.position.x=55

	


	//word中文字和空白
	blank = new TEACHER.ObjBox(5,90,50,0x97CBFF)
	scene.add(blank)
	blank.position.x=-550
	blank.position.z=110
	blank.position.y=30

	word1 = new TEACHER.ObjTextPlane(15,15,"我","x",0xffffff)
	scene.add(word1)
	word1.position.x=-550
	word1.position.y=20

	word2 = new TEACHER.ObjTextPlane(30,15,"老師","x",0xffffff)
	scene.add(word2)
	word2.position.x=-550
	word2.position.z=-40
	word2.position.y=45

	word3 = new TEACHER.ObjTextPlane(60,15,"喜歡的人","x",0xffffff)
	scene.add(word3)
	word3.position.x=-550
	word3.position.z=-35
	word3.position.y=-50

	word4 = new TEACHER.ObjTextPlane(15,15,"創","x",0xA6A6D2)
	scene.add(word4)
	word4.position.x=-550
	word4.position.y=30
	word4.position.z=-85

	word5 = new TEACHER.ObjTextPlane(30,15,"好友","x")
	scene.add(word5)
	word5.position.x=-550
	word5.position.y=-60

	wo1 = new TEACHER.ObjTextPlane(15,15,"在","x",0x272727)
	scene.add(wo1)
	wo1.position.x=-540
	wo1.position.y=50
	wo1.position.z=120
	
	//
	word6 = new TEACHER.ObjTextPlane(30,15,"教室","x")
	scene.add(word6)
	word6.position.z=-70
	word6.position.x=-550
	word6.position.y=50

	word7 = new TEACHER.ObjTextPlane(30,15,"廁所","x")
	scene.add(word7)
	word7.position.x=-550
	word7.position.z=-40
	word7.position.y=-20

	word8 = new TEACHER.ObjTextPlane(50,15,"舞台上","x",0xA6A6D2)
	scene.add(word8)
	word8.position.x=-550
	word8.position.z=5
	

	word9 = new TEACHER.ObjTextPlane(50,15,"咖啡廳","x")
	scene.add(word9)
	word9.position.x=-550
	word9.position.z=-70
	word9.position.y=15

	word10 = new TEACHER.ObjTextPlane(30,15,"社辦","x")
	scene.add(word10)
	word10.position.x=-550
	word10.position.y=70

	//
	word11 = new TEACHER.ObjTextPlane(30,15,"讀書","x")
	scene.add(word11)
	word11.position.x=-550
	word11.position.y=20
	word11.position.z=-50

	word12 = new TEACHER.ObjTextPlane(30,15,"唱歌","x",0xA6A6D2)
	scene.add(word12)
	word12.position.x=-550
	word12.position.y=45
	word12.position.z=-20

	word13 = new TEACHER.ObjTextPlane(30,15,"追番","x")
	scene.add(word13)
	word13.position.x=-550
	word13.position.y=60
	word13.position.z=-5

	word14 = new TEACHER.ObjTextPlane(30,15,"敲琴","x")
	scene.add(word14)
	word14.position.x=-550
	word14.position.z=-30

	word15 = new TEACHER.ObjTextPlane(60,15,"打遊戲","x")
	scene.add(word15)
	word15.position.x=-550
	word15.position.y=-50

	hajime = new TEACHER.ObjPicPlane(200,100,pics.hajime,"x",0)
	scene.add(hajime)
	hajime.position.x=-570
	hajime.position.z=-30
	hajime.position.y=20

	aa = new TEACHER.ObjTextPlane(300,15,"提示：選擇有特別顏色的字塊有彩蛋！","x")
	aa.position.x=-550
	aa.position.y=85
	scene.add(aa)

	z = new TEACHER.ObjTextPlane(50,50,"Z","x")
	scene.add(z)
	z.position.x=540
	z.position.y=30
	

	

	

	

	
	

	

	

	



	



	





	l1 = new TEACHER.ObjTextPlane(100,20,"My love","z",0x272727)
	scene.add(l1)
	l1.position.z=-245
	l1.position.y=100

	l2 = new TEACHER.ObjTextPlane(100,20,"word","x",0x272727)
	scene.add(l2)
	l2.position.x=-245
	l2.position.y=100

	l3 = new TEACHER.ObjTextPlane(300,20,"Take a break！","x",0x272727)
	scene.add(l3)
	l3.position.y=100
	l3.position.x=245
	

	world2D.btnUp.on("click",clickbtn)
	world2D.btnDown.on("click",clickbtn)
	world2D.btnRight.on("click",clickbtn)
	world2D.btnLeft.on("click",clickbtn)
	world2D.btn01.on("mousedown",clickbtn)
	world2D.btn02.on("mousedown",clickbtn)

	world2D.btn02.setLabel("回復原狀")

	world2D.ch02.setLabel("地板們")

	world2D.sl02.setLabel("球大小")
	world2D.sl02.maximum=5
	world2D.sl02.minimum=1
	world2D.sl02.value=1

	world2D.sl03.setLabel("左右")
	world2D.sl03.minimum=-100
	world2D.sl03.maximum=10
	world2D.sl03.value=0
	
	

	world2D.sl04.setLabel("上下")
	world2D.sl04.minimum=-75
	world2D.sl04.maximum=75
	world2D.sl04.value=5
	you.position.y=world2D.sl04.value
	

	


	

	

	world2D.on("pressup",up2D)
	
	


	
	



	ground.visible=false
	logo.visible=false
	skyBox.visible=false
	pic2.visible=pic4.visible=pic6.visible=pic8.visible=pic10.visible=pic12.visible=pic14.visible=false
	love1.visible=love2.visible=love3.visible=false
	world2D.sl01.visible=world2D.sl03.visible=world2D.sl04.visible=false
	world2D.ch01.visible=false
	word6.visible=word7.visible=word8.visible=word9.visible=word10.visible=false

	word11.visible=word12.visible=word13.visible=word14.visible=word15.visible=false
	hajime.visible=false
	


	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
	
	dt=world2D.sl01.value
	gg.visible=g1.visible=g2.visible=g3.visible=world2D.ch02.checked
	you.scale.x=you.scale.y=you.scale.z=world2D.sl02.value
	you.position.y=you.scale.x*rr
	you.position.y=world2D.sl04.value
	
	
	

	if(gamemd==3){
		world3D.cameraPhi=0
		world2D.slCameraRR.value=200
		if(you.position.z>-46){
			you.position.z-=0.5
		}else{
			you.position.z-=3
		}
	}else if(gamemd==4){
		you.position.z+=2
	}else if(gamemd==5){
		world3D.cameraPhi=-90*Math.PI/180
		world2D.slCameraRR.value=200
		if(you.position.x<46){
			you.position.x+=0.5
		}else{
			you.position.x+=3
		}
	}else if(gamemd==6){
		world2D.slCameraRR.value=200
		world3D.cameraPhi=90*Math.PI/180
		if(you.position.x>-46){
			you.position.x-=0.5
		}else{
			you.position.x-=3
		}
	}else if(gamemd==2){
		//照片返回
		if(you.position.z<=-500 && you.position.x==0){
			if(pic1.visible==false){
				pic1.position.x+=dt
				pic1.visible=true
				pic2.visible=false
				love1.visible=love2.visible=love3.visible=false
			}if(pic3.visible==false){
				pic3.position.x+=dt
				pic3.visible=true
				pic4.visible=false
				love1.visible=love2.visible=love3.visible=false
			}if(pic5.visible==false){
				pic5.position.x+=dt
				pic5.visible=true
				pic6.visible=false
				love1.visible=love2.visible=love3.visible=false
			}if(pic7.visible==false){
				pic7.position.x+=dt
				pic7.visible=true
				pic8.visible=false
				love1.visible=love2.visible=love3.visible=false
			}if(pic9.visible==false){
				pic9.position.x+=dt
				pic9.visible=true
				pic10.visible=false
				love1.visible=love2.visible=love3.visible=false
			}if(pic11.visible==false){
				pic11.position.x+=dt
				pic11.visible=true
				pic12.visible=false
				love1.visible=love2.visible=love3.visible=false
			}if(pic13.visible==false){
				pic13.position.x+=dt
				pic13.visible=true
				pic14.visible=false
				love1.visible=love2.visible=love3.visible=false
		}

		}

		if(you.position.x>=-60 && you.position.x<=60 && you.position.z>=-20){
			world2D.slCameraRR.value=500
			world3D.cameraPhi=0
			you.position.x=you.position.z=0
			
		}
		//刪除重來word
		if(you.position.x<=-500){
			if(word11.visible==true){
				word11.position.x=-550
				word11.position.y=20
				word11.position.z=-50
				word11.visible=word12.visible=word13.visible=word14.visible=word15.visible=false
				if(word6.visible==true){
					word6.position.z=-70
					word6.position.x=-550
					word6.position.y=50
					word6.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word7.visible==true){
					word7.position.x=-550
					word7.position.z=-40
					word7.position.y=-20
					word7.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word8.visible==true){
					word8.position.x=-550
   					word8.position.z=5
    				word8.position.y=20
					word8.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word9.visible==true){
					word9.position.x=-550
    				word9.position.z=-70
    				word9.position.y=15
					word9.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word10.visible==true){
					word10.position.x=-550
    				word10.position.y=70
					word10.position.z=0
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}
			
			}else if(word12.visible==true){
				word12.position.x=-550
				word12.position.y=45
				word12.position.z=-20
				word11.visible=word12.visible=word13.visible=word14.visible=word15.visible=false
				if(word6.visible==true){
					word6.position.z=-70
					word6.position.x=-550
					word6.position.y=50
					word6.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word7.visible==true){
					word7.position.x=-550
					word7.position.z=-40
					word7.position.y=-20
					word7.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word8.visible==true){
					word8.position.x=-550
   					word8.position.z=5
    				word8.position.y=20
					word8.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word9.visible==true){
					word9.position.x=-550
    				word9.position.z=-70
    				word9.position.y=15
					word9.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word10.visible==true){
					word10.position.x=-550
    				word10.position.y=70
					word10.position.z=0
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}
			}else if(word13.visible==true){
				word13.position.x=-550
				word13.position.y=60
				word13.position.z=-5
				word11.visible=word12.visible=word13.visible=word14.visible=word15.visible=false
				if(word6.visible==true){
					word6.position.z=-70
					word6.position.x=-550
					word6.position.y=50
					word6.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word7.visible==true){
					word7.position.x=-550
					word7.position.z=-40
					word7.position.y=-20
					word7.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word8.visible==true){
					word8.position.x=-550
   					word8.position.z=5
    				word8.position.y=20
					word8.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word9.visible==true){
					word9.position.x=-550
    				word9.position.z=-70
    				word9.position.y=15
					word9.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word10.visible==true){
					word10.position.x=-550
    				word10.position.y=70
					word10.position.z=0
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}
			}else if(word14.visible==true){
				word14.position.x=-550
				word14.position.z=-30
				word14.position.y=0
				word11.visible=word12.visible=word13.visible=word14.visible=word15.visible=false
				if(word6.visible==true){
					word6.position.z=-70
					word6.position.x=-550
					word6.position.y=50
					word6.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word7.visible==true){
					word7.position.x=-550
					word7.position.z=-40
					word7.position.y=-20
					word7.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word8.visible==true){
					word8.position.x=-550
   					word8.position.z=5
    				word8.position.y=20
					word8.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word9.visible==true){
					word9.position.x=-550
    				word9.position.z=-70
    				word9.position.y=15
					word9.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word10.visible==true){
					word10.position.x=-550
    				word10.position.y=70
					word10.position.z=0
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}
			}else if(word15.visible==true){
				word15.position.x=-550
				word15.position.y=-50
				word15.position.z=0
				word11.visible=word12.visible=word13.visible=word14.visible=word15.visible=false
				if(word6.visible==true){
					word6.position.z=-70
					word6.position.x=-550
					word6.position.y=50
					word6.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word7.visible==true){
					word7.position.x=-550
					word7.position.z=-40
					word7.position.y=-20
					word7.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word8.visible==true){
					word8.position.x=-550
   					word8.position.z=5
    				word8.position.y=20
					word8.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word9.visible==true){
					word9.position.x=-550
    				word9.position.z=-70
    				word9.position.y=15
					word9.visible=false
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}else if(word10.visible==true){
					word10.position.x=-550
    				word10.position.y=70
					word10.position.z=0
					if(word1.visible==true){
						word1.position.x=-550
   						word1.position.y=20
						word1.position.z=0
						word2.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word2.visible==true){
						word2.position.x=-550
   						word2.position.z=-40
    					word2.position.y=45
						word1.visible=word3.visible=word4.visible=word5.visible=true
					}else if(word3.visible==true){
						word3.position.x=-550
   						word3.position.z=-35
    					word3.position.y=-20
						word1.visible=word2.visible=word4.visible=word5.visible=true
					}else if(word4.visible==true){
						word4.position.x=-550
   						word4.position.y=30
    					word4.position.z=-85
						word1.visible=word2.visible=word3.visible=word5.visible=true
					}else if(word5.visible==true){
						word5.position.x=-550
    					word5.position.y=-60
						word5.position.z=0
						word1.visible=word2.visible=word3.visible=word4.visible=true
					}
				}
			}
		}


		
	}else if(gamemd==1){
		//照片轉換
		if(pic1.position.x<=85 && pic1.position.x>=-85 && you.position.z<=-500){
			pic2.visible=true
			pic1.visible=false
			love1.visible=love2.visible=love3.visible=true
		}if(pic3.position.x<=100 && pic3.position.x>=-100 && you.position.z<=-500){
			pic4.visible=true
			pic3.visible=false
			love1.visible=love2.visible=love3.visible=true
		}if(pic5.position.x<=100 && pic5.position.x>=-100 && you.position.z<=-500){
			pic6.visible=true
			pic5.visible=false
			love1.visible=love2.visible=love3.visible=true
		}if(pic7.position.x<=100 && pic7.position.x>=-100 && you.position.z<=-500){
			pic8.visible=true
			pic7.visible=false
			love1.visible=love2.visible=love3.visible=true
		}if(pic9.position.x<=100 && pic9.position.x>=-100 && you.position.z<=-500){
			pic10.visible=true
			pic9.visible=false
			love1.visible=love2.visible=love3.visible=true
		}if(pic11.position.x<=100 && pic11.position.x>=-100 && you.position.z<=-500){
			pic12.visible=true
			pic11.visible=false
			love1.visible=love2.visible=love3.visible=true
		}if(pic13.position.x<=100 && pic13.position.x>=-100 && you.position.z<=-500){
			pic14.visible=true
			pic13.visible=false
			love1.visible=love2.visible=love3.visible=true
		}
		//文字選擇(first)
		if(you.position.z<=10 && you.position.z>=-10 && you.position.y<=35 && you.position.y>=15 && word1.visible==true){
			word2.visible=word3.visible=word4.visible=word5.visible=false
			if(word2.visible==false){
				word1.position.x=-540
				word1.position.y=65
				word1.position.z=120
			}

		}if(you.position.z>=-50 && you.position.z<=-30 && you.position.y>=40 && you.position.y<=60 && word2.visible==true){
			word1.visible=word3.visible=word4.visible=word5.visible=false
			if(word1.visible==false){
				word2.position.x=-540
				word2.position.y=65
				word2.position.z=115
			}
			
		}if(you.position.z>=-45 && you.position.z<=-25 && you.position.y>=-65 && you.position.y<=-35 && word3.visible==true){
			word1.visible=word2.visible=word4.visible=word5.visible=false
			if(word1.visible==false){
				word3.position.x=-540
				word3.position.y=65
				word3.position.z=105
			}
			
			
		}if(you.position.z<=-75 && you.position.z>=-95 && you.position.y>=20 && you.position.y<=45 && word4.visible==true){
			word1.visible=word2.visible=word3.visible=word5.visible=false
			word4.position.x=-540
			word4.position.y=65
			word4.position.z=120
			if(word1.visible==false){
				word4.position.x=-540
				word4.position.y=65
				word4.position.z=120
			}
		}if(you.position.z<=10 && you.position.z>=-10 && you.position.y>=-65 && you.position.y<=-45 && word5.visible==true){
			word1.visible=word2.visible=word3.visible=word4.visible=false
			if(word1.visible==false){
				word5.position.x=-540
				word5.position.y=65
				word5.position.z=115
			}
		}

		
		//文字選擇(second)
		if(word1.visible==false || word2.visible==false || word3.visible==false || word4.visible==false || word5.visible==false){
			word6.visible=word7.visible=word8.visible=word9.visible=word10.visible=true
		}

		if(you.position.z>=-80 && you.position.z<=-60 && you.position.y>=40 && you.position.y<=60 && word6.visible==true){
			word7.visible=word8.visible=word9.visible=word10.visible=false
			if(word7.visible==false){
				word6.position.x=-540
				word6.position.y=35
				word6.position.z=115
			}
		}if(you.position.z>=-50 && you.position.z<=-30 && you.position.y>=-35 && you.position.y<=-5 && word7.visible==true){
			word6.visible=word8.visible=word9.visible=word10.visible=false
			if(word6.visible==false){
				word7.position.x=-540
				word7.position.y=35
				word7.position.z=115
			}
		}if(you.position.z>=-5 && you.position.z<=15 && you.position.y>=-15 && you.position.y<=15 && word8.visible==true){
			word6.visible=word7.visible=word9.visible=word10.visible=false
			if(word6.visible==false){
				word8.position.x=-540
				word8.position.y=35
				word8.position.z=105
			}
		}if(you.position.z<=-55 && you.position.z>=-85 && you.position.y<=30 && you.position.y>=0 && word9.visible==true){
			word6.visible=word7.visible=word8.visible=word10.visible=false
			if(word6.visible==false){
				word9.position.x=-540
				word9.position.y=35
				word9.position.z=105
			}
		}if(you.position.z>=-10 && you.position.z<=10 && you.position.y>=55 && you.position.y<=85 && word10.visible==true){
			word6.visible=word8.visible=word9.visible=word7.visible=false
			if(word6.visible==false){
				word10.position.x=-540
				word10.position.y=35
				word10.position.z=115
			}
		}
		
		//文字選擇(third)
		if(word6.visible==false || word7.visible==false ||word8.visible==false ||word9.visible==false || word10.visible==false){
			word11.visible=word12.visible=word13.visible=word14.visible=word15.visible=true
			/*if(word6.visible==true){
				word10.visible=word8.visible=word9.visible=word7.visible=false
			}else if(word7.visible==true){
				word6.visible=word8.visible=word9.visible=word10.visible=false
			}else if(word8.visible==true){
				word6.visible=word10.visible=word9.visible=word7.visible=false
			}else if(word9.visible==true){
				word6.visible=word8.visible=word10.visible=word7.visible=false
			}else if(word10.visible==true){
				word6.visible=word8.visible=word9.visible=word7.visible=false
			}*/
		}
		if(you.position.y<=35 && you.position.y>=5 && you.position.z<=-40 && you.position.z>=-60 && word11.visible==true){
			word12.visible=word13.visible=word14.visible=word15.visible=false
			if(word12.visible==false){
				word11.position.x=-540
				word11.position.z=115
				word11.position.y=15
			}
		}if(you.position.y>=30 && you.position.y<-60 && you.position.z>=-30 && you.position.z<=-10 && word12.visible==true){
			word11.visible=word13.visible=word14.visible=word15.visible=false
			if(word11.visible==false){
				word12.position.x=-540
				word12.position.z=115
				word12.position.y=15
			}
		}if(you.position.y<=75 && you.position.y>=45 && you.position.z>=-15 && you.position.z<=5 && word13.visible==true){
			word12.visible=word11.visible=word14.visible=word15.visible=false
			if(word11.visible==false){
				word13.position.x=-540
				word13.position.z=115
				word13.position.y=15
			}
		}if(you.position.y<=15 && you.position.y>=-15 && you.position.z>=-40 && you.position.z<=-20 && word14.visible==true){
			word12.visible=word13.visible=word11.visible=word15.visible=false
			if(word11.visible==false){
				word14.position.x=-540
				word14.position.z=115
				word14.position.y=15
			}
		}if(you.position.z>=-10 && you.position.z<=10 && you.position.y>=-65 && you.position.y<=-35 && word15.visible==true){
			word12.visible=word13.visible=word14.visible=word11.visible=false
			if(word11.visible==false){
				word15.position.x=-540
				word15.position.z=105
				word15.position.y=15
			}
		}
	}
	
	//選鍵轉換
	if(you.position.z<-500){
		you.position.z=-500
		world2D.btn01.setLabel("選擇")
		world2D.btn02.setLabel("返回")
	
	}else if(you.position.x<-500){
		you.position.x=-500
		world2D.btn01.setLabel("pick")
		world2D.btn02.setLabel("delete")
	}else if(you.position.x>=-60 && you.position.x<=60 && you.position.z>=-20){
		world2D.btn01.setLabel("nothing")
		world2D.btn02.setLabel("初始狀態")
	}else if(you.position.x>=500){
		world2D.btn01.setLabel("sleep")
		world2D.btn02.setLabel("sleep")
		you.position.x=500
	}

	if(you.position.z>0){
		you.position.z=0
	}

	//鏡頭移動
	world3D.cameraTarget.x=you.position.x
	world3D.cameraTarget.z=you.position.z
	world3D.cameraTarget.y=you.position.y

	//vtuberpic移動
	pic1.position.x+=dt
	pic3.position.x+=dt
	pic5.position.x+=dt
	pic7.position.x+=dt
	pic9.position.x+=dt
	pic11.position.x+=dt
	pic13.position.x+=dt

	//愛心冒泡
	if(you.position.z<=-500){
		love1.position.y+=1
		love1.position.x+=0.4
		love2.position.y+=1.2
		love2.position.x+=0.4
		love3.position.y+=1.5
		if(love1.position.y>=100){
			love1.position.y=10
		}if(love1.position.x>=100){
			love1.position.x=30
		}
	}
	

	//圖片來回
	if(pic1.position.x>=1100){
		pic1.position.x=-300
	}if(pic3.position.x>=1100){
		pic3.position.x=-300
	}if(pic5.position.x>=1100){
		pic5.position.x=-300
	}if(pic7.position.x>=1100){
		pic7.position.x=-300
	}if(pic9.position.x>=1100){
		pic9.position.x=-300
	}if(pic11.position.x>=1100){
		pic11.position.x=-300
	}if(pic13.position.x>=1100){
		pic13.position.x=-300
	}

	//滑桿變動
	if(you.position.z<=-500){
		world2D.sl01.setLabel("速度")
		world2D.sl01.maximum=5
		world2D.sl01.minimum=0.5
		world2D.sl01.digitN=1
		world2D.sl01.visible=true
	}else if(you.position.x>=-60 && you.position.x<=60 && you.position.z>=-20){
		world2D.sl01.visible=false
	}else if(you.position.x<=-500){
		world2D.sl03.visible=true
		world2D.sl04.visible=true
		you.position.z=world2D.sl03.value
	}

	//字詞不重複
	if(word1.visible==true && word2.visible==false){
		word2.visible=word3.visible=word4.visible=word5.visible=false
	}else if(word2.visible==true && word1.visible==false){
		word1.visible=word3.visible=word4.visible=word5.visible=false
	}else if(word3.visible==true && word1.visible==false){
		word1.visible=word2.visible=word4.visible=word5.visible=false
	}else if(word4.visible==true && word1.visible==false){
		word1.visible=word2.visible=word3.visible=word5.visible=false
	}else if(word5.visible==true && word1.visible==false){
		word1.visible=word2.visible=word3.visible=word4.visible=false
	}

	if(word6.visible==true && word7.visible==false){
		word7.visible=word8.visible=word9.visible=word10.visible=false
	}else if(word7.visible==true && word6.visible==false){
		word6.visible=word8.visible=word9.visible=word10.visible=false
	}else if(word8.visible==true && word6.visible==false){
		word7.visible=word6.visible=word9.visible=word10.visible=false
	}else if(word9.visible==true && word6.visible==false){
		word7.visible=word8.visible=word6.visible=word10.visible=false
	}else if(word10.visible==true && word6.visible==false){
		word7.visible=word8.visible=word9.visible=word6.visible=false
	}

	if(word6.position.z>=50){
		word7.visible=word8.visible=word9.visible=word10.visible=false
	}else if(word7.position.z>=50){
		word6.visible=word8.visible=word9.visible=word10.visible=false
	}else if(word8.position.z>=50){
		word7.visible=word6.visible=word9.visible=word10.visible=false
	}else if(word9.position.z>=50){
		word7.visible=word8.visible=word6.visible=word10.visible=false
	}else if(word10.position.z>=50){
		word7.visible=word8.visible=word9.visible=word6.visible=false
	}

	if(word11.position.z>=50){
		word12.visible=word13.visible=word14.visible=word15.visible=false
	}else if(word12.position.z>=50){
		word11.visible=word13.visible=word14.visible=word15.visible=false
	}else if(word13.position.z>=50){
		word12.visible=word11.visible=word14.visible=word15.visible=false
	}else if(word14.position.z>=50){
		word12.visible=word13.visible=word11.visible=word15.visible=false
	}else if(word15.position.z>=50){
		word12.visible=word13.visible=word14.visible=word11.visible=false
	}

	if(you.position.x<=-500 && word4.visible==true && word8.visible==true && word12.visible==true && word12.position.z>=50){
		hajime.visible=true
	}

	
	z.position.z+=0.5
	if(z.position.z>=50){
		z.position.z=-50
	}

	

	
	







	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function clickbtn(e){
	var str = e.target.parent.name;

	if(str==="btn01"){
		gamemd=1
	}else if(str==="btn02"){
		gamemd=2
	}else if(str==="btnUp"){
		gamemd=3
	}else if(str==="btnDown"){
		gamemd=4
	}else if(str==="btnRight"){
		gamemd=5
	}else if(str==="btnLeft"){
		gamemd=6
	}

	



}

function up2D(e){
	
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
