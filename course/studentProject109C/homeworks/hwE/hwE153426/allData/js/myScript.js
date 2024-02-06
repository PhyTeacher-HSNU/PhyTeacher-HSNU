'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
/*任務：
1. 向右橫波：
	(1) 複習 陣列Array與for迴圈，做出 NN=50 個 ball，排一橫排。
	(2) 根據波動方程式，做出向右橫波：
		y = A Math.sin( 2*Math.PI*x/lambda - 2*Math.PI*t/period )
		其中，A是振幅，lambda是波長，period是週期。

2. 向左橫波：
	(1) 把上面的向右橫波改成向左橫波。
	(2) 用 slider 調整向右或向左橫波。
	
3. 駐波：
	(1) 做三組 陣列Array，分別存放三組波。
	(2) 三組波動，一個向右橫波，一個向左橫波，一個疊加成為駐波。
	(3) 用 checkBox 控制三組波動重合或分開。

[進階]
4. 向右縱波：
	橫波是上下振動，若改成左右振動，就會變成縱波，試著做出縱波的動畫。

*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var Head
var Body
var HandL,HandR
var LegL,LegR
var Sword
var ne,neC
var con,con1,con2
var ballarrayminus1=[]
var lamda=50 
var nn = 30
var AA =5
var tt =0
var period = 3
var dt 
var kk=3
var str
var gameMD
var cc
var dd
var der
var saying
var chair
var chairleg1,chairleg2,chairleg3,chairleg4
var chairsit
var chairback
var desk
var deskleg1,deskleg2,deskleg3,deskleg4
var desksit
var deskandchair
var dx
var dz
var oldDate
var nowDate
var timePass
var timecounter
var timedowncounter
var PlaneTimedowncounter
var classroomwall
var classroomwallArray=[]
var deskandchairArray=[]
var classroomdoor
var classroomdoorArray=[]
var classroomwindow
var classroomwindowArray=[]
var backboard
var flame
var timer
var ee
var classroomground
var classroomgrounddot
var classroomgroundArray=[]
var Gooditem
var GooditemArray=[]
var Baditem
var BaditemArray=[]
var Bravetime
var Bravetimeball
var stoptimer
var debug
var timestopsaying
var starsaying
var playsaying
var normalsaying
var ll



//B.定義init
function init(){
	dx=0
	dz=0
	timecounter=0
	timedowncounter=0
	flame=0
	timer=0
	ee=0
	Bravetime=0
	stoptimer=0
	debug=0
	ll=0


for(var k=1;k<4;k++){

	for(var i=-3;i<6;i++){
	chair=new THREE.Object3D()
	chairleg1=new TEACHER.ObjBox(1,5,1,0XAAFFFF,2)
	chairleg2=new TEACHER.ObjBox(1,5,1,0XAAFFFF,2)
	chairleg3=new TEACHER.ObjBox(1,5,1,0XAAFFFF,2)
	chairleg4=new TEACHER.ObjBox(1,5,1,0XAAFFFF,2)
	chairsit=new TEACHER.ObjBox(6,1,6,0XAAFFFF,2)
	chairback=new TEACHER.ObjBox(1,7,6,0XAAFFFF,2)
	chair.add(chairleg1,chairleg2,chairleg3,chairleg4,chairsit,chairback)
	scene.add(chair)
	chairleg1.position.x=2.5
	chairleg1.position.z=2.5
	chairleg2.position.x=2.5
	chairleg2.position.z=-2.5
	chairleg3.position.x=-2.5
	chairleg3.position.z=-2.5
	chairleg4.position.x=-2.5
	chairleg4.position.z=2.5
	chairsit.position.y=2.5
	chairback.position.y=5.5
	chairback.position.x=-2.5

	desk=new THREE.Object3D()
	deskleg1=new TEACHER.ObjBox(1,9,1,0XAAFFFF,2)
	deskleg2=new TEACHER.ObjBox(1,9,1,0XAAFFFF,2)
	deskleg3=new TEACHER.ObjBox(1,9,1,0XAAFFFF,2)
	deskleg4=new TEACHER.ObjBox(1,9,1,0XAAFFFF,2)
	desksit=new TEACHER.ObjBox(11,1,11,0XAAFFFF,2)
	desk.add(deskleg1,deskleg2,deskleg3,deskleg4,desksit)
	scene.add(desk)
	deskleg1.position.x=5
	deskleg1.position.z=5
	deskleg2.position.x=5
	deskleg2.position.z=-5
	deskleg3.position.x=-5
	deskleg3.position.z=-5
	deskleg4.position.x=-5
	deskleg4.position.z=5
	desksit.position.y=4.5

	desk.position.y=4.5
	chair.position.y=2.5
	desk.position.x=4
		
	deskandchair=new THREE.Object3D()
	deskandchair.add(desk,chair)
	scene.add(deskandchair)
	deskandchair.position.x=30*((i+3)%3)-30
	deskandchair.position.z=30*Math.floor(i/3)
	deskandchairArray.push(deskandchair)
	}
}
	for(var i=-1;i<2;i++){
		classroomground = new TEACHER.ObjBox(100,2,100,0x9999CC,2)
		classroomground.position.x=100*i
		classroomground.position.y=-1
		for(var h=0;h<4;h++){
			classroomgrounddot =  new TEACHER.ObjCylinder(5,0.2,0x339933,false,'y',2)
			classroomgrounddot.position.x = -5+10*(h%2)+100*i
			classroomgrounddot.position.z = -5+10*Math.floor(h/2)
			scene.add(classroomgrounddot)
			classroomgroundArray.push(classroomgrounddot)
	
		}
		
		scene.add(classroomground)
		classroomgroundArray.push(classroomground)
	
	}
	
	Bravetimeball = new TEACHER.ObjSphere(2,0XCCCCCC,2)
	
	Head= new TEACHER.ObjSphere(4,0X00FF00,2)
	Head.position.y=10
	Body= new TEACHER.ObjCylinder(3,12,0X00FFFF,false,'y',2)
	Body.position.y=1.5
	HandL=new TEACHER.ObjBox(2,10,2,0XFF00FF,2)
	HandL.position.y=2.5
	HandL.position.x=2.5
	HandL.position.z=3
	HandL.rotation.x = -1
	HandL.rotation.z = -0.2
	HandR=new TEACHER.ObjBox(2,10,2,0XFF00FF,2)
	HandR.position.y=2.5
	HandR.position.x=-2.5
	HandR.position.z=3
	HandR.rotation.x = -1
	HandR.rotation.z = 0.2
	LegL=new TEACHER.ObjBox(2,10,2,0X00FFFF,2)
	LegL.position.y=-5
	LegL.position.x=-1.5
	LegL.position.z=2
	LegL.rotation.x = -0.5
	LegR=new TEACHER.ObjBox(2,10,2,0X00FFFF,2)
	LegR.position.y=-5
	LegR.position.x=1.5
	LegR.position.z=-2
	LegR.rotation.x = 0.5
	Sword=new TEACHER.ObjBox(2,15,2,0XFFFF00,2)
	Sword.position.y=6
	Sword.rotation.x = 0.2
	Sword.position.z=7.5
	ne=new TEACHER.ObjPicPlane(50,50,pics.ne,'z',0)
	ne.position.y=25
	ne.position.z=-30
	neC=new TEACHER.ObjPicPlane(50,50,pics.neC,'z',0)
	neC.position.y=25
	neC.position.z=-30
	der=new TEACHER.ObjPicPlane(50,50,pics.der,'z',0)
	der.position.z=-100
	der.position.y=30
	saying=new TEACHER.ObjPicPlane(50,50,pics.saying,'z',0)
	saying.position.z=60
	saying.position.y=30
	timestopsaying=new TEACHER.ObjPicPlane(70,35,pics.timestopsaying,'z',0)
	timestopsaying.position.z=60
	timestopsaying.position.y=30
	starsaying=new TEACHER.ObjPicPlane(70,35,pics.starsaying,'z',0)
	starsaying.position.z=60
	starsaying.position.y=30
	playsaying=new TEACHER.ObjPicPlane(70,35,pics.playsaying,'z',0)
	playsaying.position.z=60
	playsaying.position.y=30
	normalsaying=new TEACHER.ObjPicPlane(70,35,pics.normalsaying,'z',0)
	normalsaying.position.z=60
	normalsaying.position.y=30

	con=new THREE.Object3D()
	con1=new THREE.Object3D()
	con2=new THREE.Object3D()
	scene.add(con)
	scene.add(Bravetimeball)
	con1.add(Head)
	con1.add(Body)
	con2.add(HandL)
	con2.add(HandR)
	con1.add(LegL)
	con1.add(LegR)
	con2.add(Sword)
	scene.add(ne)
	scene.add(neC)
	scene.add(der)
	scene.add(saying)
	scene.add(timestopsaying)
	scene.add(starsaying)
	scene.add(playsaying)
	scene.add(normalsaying)
	con.add(con1)
	con.add(con2)
	con.position.y=10
	con.rotation.y=Math.PI/2
	dd=0
	cc=0
	dt=-0.1
	ne.visible=false
	neC.visible=false
	normalsaying.visible=true
	timestopsaying.visible=false
	starsaying.visible=false
	playsaying.visible=false
	saying.visible=false
	ground.visible=false
	Bravetimeball.visible=false

	PlaneTimedowncounter = new TEACHER.ObjPlane(10,3,0XFF00FF,'z')
	scene.add(PlaneTimedowncounter)
	PlaneTimedowncounter.position.x=-30
	PlaneTimedowncounter.position.y=30


	world2D.btn01.setLabel('斬');
	world2D.btn01.on('click', clickBtn);
	world2D.btn02.setLabel('說明');
	world2D.btn02.on('click', clickBtn);
	world2D.btn03.setLabel('暫停時間');
	world2D.btn03.on('click', clickBtn);
	world2D.btn04.setLabel('無敵星星');
	world2D.btn04.on('click', clickBtn);
	world2D.btn05.setLabel('探索');
	world2D.btn05.on('click', clickBtn);


	world2D.btnRight.on('click', clickBtn);
	world2D.btnLeft.on('click', clickBtn);
	world2D.btnDown.on('click', clickBtn);
	world2D.btnUp.on('click', clickBtn);
	

	world2D.sl01.setLabel('分數')
	world2D.sl01.minimum = 0
	world2D.sl01.maximum = 10000
	world2D.sl01.value = 0


	world2D.btn03.visible=false	
	world2D.btn04.visible=false
	world2D.btn05.visible=false

	oldDate =new Date()
	nowDate =new Date()



	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){

	dx=con.position.x
	dz=con.position.z
	if(flame==0){
		oldDate =new Date()
		nowDate =new Date()
	}
	if(timecounter%5 == 0 && timer==0.1){
		nowDate =new Date()
		timePass = nowDate-oldDate
		timedowncounter=60-(Math.floor(timePass/100)/10)
		debug+=1
	}
	timecounter+=1

	PlaneTimedowncounter.scale.x=(timedowncounter/30)
	if(timePass>60000 && debug>5){
		timer=0
		flame=0
	}
	
if(flame==1){
	backboard.position.x-=timer
	if(ee==1){
		for(i=0;i<3;i++){
			Gooditem = new TEACHER.ObjSphere(2,0X66AA88,2)
			Baditem = new TEACHER.ObjBox(2,20,20,0XAA2299,2)
			Gooditem.position.z = Math.floor(40*Math.random())+5
			Gooditem.position.x = Math.floor(50*Math.random())
			Gooditem.position.y = 10
			Baditem.position.z = Math.floor(25*Math.random())+15
			Baditem.position.x = Math.floor(50*Math.random())
			Baditem.position.y = 5
			scene.add(Gooditem)
			GooditemArray.push(Gooditem)
			scene.add(Baditem)
			BaditemArray.push(Baditem)
		}
	}
	
	if(Math.floor(ee/90)%2==0){
		LegL.position.z-=0.5*timer
		LegL.rotation.x+=0.1*timer
		LegR.position.z+=0.5*timer
		LegR.rotation.x-=0.1*timer
	}
	if(Math.floor(ee/90)%2==1){
		LegL.position.z+=0.5*timer
		LegL.rotation.x-=0.1*timer
		LegR.position.z-=0.5*timer
		LegR.rotation.x+=0.1*timer
	}
	if(timer==0.1){
		ee+=1
	}
	
	for(i=0;i<3;i++){
		Gooditem = GooditemArray[i]
		Baditem = BaditemArray[i]
		Gooditem.position.x-=timer
		Baditem.position.x-=timer

	}

	if(con.position.z<5){
		con.position.z=6
	}
	if(con.position.z>45){
		con.position.z=44
	}
	if(backboard.position.x<-50){
		backboard.position.x+=100
		for(i=0;i<3;i++){
			Gooditem=GooditemArray[i]
			Baditem=BaditemArray[i]
			Gooditem.visible=false
			Gooditem.position.y=-500
			Gooditem.position.z=-500
			Baditem.visible=false
			Baditem.position.y=-500
			Baditem.position.z=-500
		}

		for(i=0;i<3;i++){
			Gooditem = new TEACHER.ObjSphere(2,0X66AA88,2)
			Baditem = new TEACHER.ObjBox(2,20,20,0XAA2299,2)
			Gooditem.position.z = Math.floor(40*Math.random())+5
			Gooditem.position.x = Math.floor(100*Math.random())
			Gooditem.position.y = 10
			Baditem.position.z = Math.floor(25*Math.random())+15
			Baditem.position.x = Math.floor(100*Math.random())
			Baditem.position.y = 10
			scene.add(Gooditem)
			GooditemArray[i]=Gooditem
			scene.add(Baditem)
			BaditemArray[i]=Baditem
		}
		
	}
	for(var i=0;i<3;i++){
		Gooditem=GooditemArray[i]
		
		if(con.position.x-Gooditem.position.x<4 && con.position.x-Gooditem.position.x>-4 && con.position.z-Gooditem.position.z<4 && con.position.z-Gooditem.position.z>-4){
			Gooditem.visible=false
			Gooditem.position.y=-500
			Gooditem.position.z=-500
			world2D.sl01.value+=200
		}
	}
	for(i=0;i<3;i++){
		Baditem=BaditemArray[i]
	
		if(con.position.x-Baditem.position.x<4 && con.position.x-Baditem.position.x>-4 && con.position.z-Baditem.position.z<12 && con.position.z-Baditem.position.z>-12){
			Baditem.visible=false
			Baditem.position.y=-500
			Baditem.position.z=-500
			world2D.sl01.value-=100
			if(Bravetimeball.visible==true){
				world2D.sl01.value+=100
			}
		}
	}
	Bravetimeball.position.x=con.position.x
	Bravetimeball.position.z=con.position.z
	Bravetimeball.position.y=con.position.y+15
	if(Bravetime!==0){
		Bravetime-=1
		Bravetimeball.visible=true
	}
	else{
		Bravetimeball.visible=false
	}
	
	
	if(stoptimer!==0){
		stoptimer-=1
	}
	else{
		timer=0.1	
	}
	
		
	
	
		
	
	







}

if(con.position.x>25 && con.position.x<40 && con.position.z<-25 && con.position.z>-40){
	world2D.btn05.visible=true	
}
else if(con.position.x>-30 && con.position.x<-15 && con.position.z<-25 && con.position.z>-40){
	world2D.btn05.visible=true	
}
else if(con.position.x>-5 && con.position.x<5 && con.position.z<5 && con.position.z>-5){
	world2D.btn05.visible=true	
}
else{
	world2D.btn05.visible=false	
}

if(gameMD===1){
	tt+=dt
	cc++
	for(var i=0;i<nn;i++){
		var bb=ballarrayminus1[i]
		bb.position.x=10+2*i-kk*tt+dx
		bb.position.z=dz
		var yy=-AA*Math.sin(2*Math.PI*bb.position.x/lamda+2*Math.PI*tt/period)
		bb.position.y=10+yy
	

	}
}
if(cc>0){
	ne.visible=true
	con2.position.y=5
	con2.position.z=5
	con2.rotation.x=-1.5
}
if(cc>30){
	ne.visible=false
	neC.visible=true
}
if(cc>60){
	con2.position.y=1.5
	con2.position.z=-2.5
	con2.rotation.x=0.75
	neC.visible=false
	dt=-0.1
	for(var i=0;i<nn;i++){
		var bb=ballarrayminus1[i]
		bb.visible=true
	}
	if(flame==1){
		for(i=0;i<nn;i++){
			for(var h=0;h<3;h++){
				if(gameMD == 1){
					var bb=ballarrayminus1[i]
					Baditem=BaditemArray[h]
					if(bb.position.x-Baditem.position.x<2 && bb.position.x-Baditem.position.x>-2 && bb.position.z-Baditem.position.z<11 && bb.position.z-Baditem.position.z>-11){
						Baditem.visible=false
						Baditem.position.y=-500
						Baditem.position.z=-500
					}
				}
			}
		}
	}	
	


}	
if(cc>100){
	con2.position.y=0
	con2.position.z=0
	con2.rotation.x=0
}

	


	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function clickBtn(e){
	console.log(e.target.parent.name);
	str = e.target.parent.name
	if(str === 'btn01'){
		gameMD = 1
		if(dd>0){
			for(var i=0;i<nn;i++){
				var ball=ballarrayminus1[i]
				ball.visible=false
				ball.position.y=-500
			}
		}
		if(gameMD===1 ){
			for(var i=0;i<nn;i++){
				var ball =new TEACHER.ObjSphere(1,0x00ff00)
				ball.position.z=dz
				scene.add(ball)
				ballarrayminus1[i]=ball
				ball.visible=false
				tt=0
				cc=0
				}
				dd++
				dt=0
		}
	}	
	if(str === 'btn02'){
		gameMD = 2
		if(gameMD===2 ){
		
			if(timestopsaying.visible==false && starsaying.visible==false && normalsaying.visible==false){
				ll+=1
			}
			else{
				ll=0
			}
			if(ll==1){
				
				playsaying.visible=true
			}
			if(ll==2){
				playsaying.visible=false
				saying.visible=true
			}
			if(ll==3){
				saying.visible=false
				ll=0
			}
			timestopsaying.visible=false
			starsaying.visible=false
			normalsaying.visible=false
			log(normalsaying.visible)
		}
		
	}
	if(str === 'btn03'){
		gameMD = 3
		if(gameMD===3 ){

			timer=0
			stoptimer=50
			
		}
		
	}
	if(str === 'btn04'){
		gameMD = 4
		if(gameMD===4 ){
			Bravetime=200
		
		}
		
	}
	if(str === 'btn05'){
		gameMD = 5
		if(gameMD===5 &&con.position.x>25 && con.position.x<40 && con.position.z<-25 && con.position.z>-40){
			world2D.btn03.visible=true
			timestopsaying.visible=true
		}
		if(gameMD===5 && con.position.x>-30 && con.position.x<-15 && con.position.z<-25 && con.position.z>-40){
			world2D.btn04.visible=true
			starsaying.visible=true
		}
		if(gameMD===5 && con.position.x>-5 && con.position.x<5 && con.position.z<5 && con.position.z>-5){
			//生成第二場景
			for(var i=0;i<27;i++){
				deskandchair=deskandchairArray[i]
				deskandchair.position.x=30*(((i%3)+3)%3)-30+100*(Math.floor(i/9)-1)
				deskandchair.position.z=30*Math.floor((i/3)%3)-70
				deskandchairArray[i]=deskandchair
		
			
			}
			
			
			for(var i=-1;i<2;i++){
				classroomwall = new TEACHER.ObjBox(80,10,2,0xAAAAAA,2)
				classroomwall.position.x = i*100
				classroomwall.position.y = 5
				classroomwallArray.push(classroomwall)
				con.position.z = 10
				scene.add(classroomwall)
				classroomwindow = new THREE.Object3D()
				var classroomwindowfront = new TEACHER.ObjBox(80,2,2,0xAAAAAA,2)
				classroomwindowfront.position.x = i*100
				classroomwindowfront.position.y = 29
				for(var g=0;g<3;g++){
					var classroomwindowBar = new TEACHER.ObjBox(2,30,2,0xAAAAAA,2)
					classroomwindowBar.position.x = i*100+22*g-40+22
					classroomwindowBar.position.y = 15
					classroomwindow.add(classroomwindowBar)
				}
				scene.add(classroomwindow)
				classroomwindow.add(classroomwindowfront)
				classroomwindowArray.push(classroomwindow)


				for(var h=-1;h<1;h++){
					classroomdoor=new THREE.Object3D()
					var classroomdoorfront = new TEACHER.ObjBox(10,2,2,0XAAAAAA,2)
					classroomdoorfront.position.y=29
					classroomdoorfront.position.x=45+90*h
					var classroomdoorLeft = new TEACHER.ObjBox(2,30,2,0XAAAAAA,2)
					classroomdoorLeft.position.y=15
					classroomdoorLeft.position.x=40+90*h
					var classroomdoorRight = new TEACHER.ObjBox(2,30,2,0XAAAAAA,2)
					classroomdoorRight.position.y=15
					classroomdoorRight.position.x=50+90*h
					scene.add(classroomdoor)
					classroomdoor.add(classroomdoorfront,classroomdoorRight,classroomdoorLeft)
					classroomdoor.position.x=100*i
					log(i)
					classroomdoorArray.push(classroomdoor)
				
				}
			}
			//生成結束
			backboard = new THREE.Object3D()
			for(i=0;i<3;i++){
				backboard.add(classroomwallArray[i])
			}
			for(i=0;i<6;i++){
				backboard.add(classroomdoorArray[i])
			}
			for(i=0;i<3;i++){
				backboard.add(classroomwindowArray[i])
			}
			for(i=0;i<27;i++){
				backboard.add(deskandchairArray[i])
			}
			for(i=0;i<15;i++){
				backboard.add(classroomgroundArray[i])
			}
			scene.add(backboard)
			flame = 1
			timer=0.1
			con.rotation.y=1*Math.PI/2
			world2D.btnRight.visible=false
			world2D.btnLeft.visible=false
			
		}
		
	}
	
	if(str === 'btnRight'){
		
		con.position.x+=3
		
		con.rotation.y=1*Math.PI/2
		
		

		
	}
	if(str === 'btnLeft'){

		con.position.x-=3
		con.rotation.y=3*Math.PI/2
	
	}
	if(str === 'btnUp'){

		con.position.z-=3
		if(flame==0){
		con.rotation.y=2*Math.PI/2
		}
		
		
	}
	if(str === 'btnDown'){

		con.position.z+=3
		if(flame==0){
		con.rotation.y=4*Math.PI/2
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
