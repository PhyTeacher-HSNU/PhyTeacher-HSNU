'use strict';//嚴格模式
var fps=200;//動畫fps
var log=console.log;//簡化log

//------------老師作的萬用半成品(2020.12.01)-----------//

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數

var house 
var housefrontwall,housefrontwall1,housefrontwall2,housefrontwall3,housefrontwall4,housefrontwall5
var houseNfrontwall,houseNfrontwall1,houseNfrontwall2,houseNfrontwall3,houseNfrontwall4,houseNfrontwall5
var housefronthead,housefronthead1,housefronthead2,housefronthead3,housefronthead4,housefronthead5,housefronthead6
var puting1,puting2,puting3,puting4,housefrontheadputings1,puting5,puting6,puting7,puting8,housefrontheadputings2
var housefrontheadArray = []
var housefloorArray = []
var desk
var chair
var chair
var chairleg1,chairleg2,chairleg3,chairleg4
var chairsit
var chairback
var desk
var deskleg1,deskleg2,deskleg3,deskleg4
var desksit
var deskandchair
var deskandchairArray = []
var FF
var SS
var DD
var draw,draw1,draw2,draw3,draw4,drawpics
var drawArray = []
var houseMass
var TMD
var TMDMass
var TMDLine
var thita
var dt = 0.1
var gg=-0.98
var TMDMassay
var TMDMassax
var TMDMassvy
var TMDMassvx
var alpha
var omega
var beta =0.05
var xx = 0
var TMDRR
var TMDMassPositionX
var TMDMassPositionY
var housethita
var vectur = -1
var UU
var str
var gameMD
var houseTime
var TMDTime
var housePositionX
var damping
var cover,cover1,cover2,cover3
var tt
var AA
var housedampingomega
var houseomega
var OO = 1
var earthquaketime
var TT
var graph
var graph1
var door
var doorhandle
var doorside1,doorside2,doorside3,doorside4
var doorwood
var illustrate,illustrate1,illustrate2,illustrate3
var dampingvalue
var namaie

//B.定義init
function init(){
	TMDMassay = 0
	TMDMassax = 0
	TMDMassvy = 0
	TMDMassvx = 0
	thita = Math.asin(xx/15)
	omega = 0
	alpha = 0
	housethita = 0
	TMDRR = 15
	TMDMassPositionX=TMDRR*Math.sin(thita)
	TMDMassPositionY=40-TMDRR*Math.cos(thita)
	UU = 0
	houseTime = 0.5
	TMDTime = 0
	housePositionX = 0
	damping = 0.05
	AA = 1
	tt = 0
	housedampingomega = 0
	houseomega = 0
	earthquaketime = 0
	TT = 0
	//桌椅
	for(i=0;i<7;i++){
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
	deskandchair.position.y=2
	deskandchair.position.x=20
	deskandchair.position.z=-8
	deskandchairArray.push(deskandchair)
	}
	//桌椅結束
	for(i=0;i<2;i++){
	draw = new THREE.Object3D()
	draw1 = new TEACHER.ObjBox(1,8,1,0XBB3D00,2)
	draw1.position.x = 3.5
	draw2 = new TEACHER.ObjBox(8,1,1,0XBB3D00,2)
	draw2.position.y = -3.5
	draw3 = new TEACHER.ObjBox(1,8,1,0XBB3D00,2)
	draw3.position.x = -3.5
	draw4 = new TEACHER.ObjBox(8,1,1,0XBB3D00,2)
	draw4.position.y = 3.5
	drawpics = new TEACHER.ObjBox(7.5,7.5,0.5,0XCA8EC2,2)
	draw.add(draw1,draw2,draw3,draw4,drawpics)
	draw.position.y = 20
	draw.position.x = -18+12*i
	draw.position.z = -15
	draw.visible = false
	scene.add(draw)
	drawArray.push(draw)
	}
	//質量調節器與質點
	TMD = new THREE.Object3D()
	TMDMass = new TEACHER.ObjSphere(4,0XFFFF37,2)
	TMDMass.position.y =-15
	TMDMass.position.x =0 
	TMDLine = new TEACHER.ObjCylinder(0.2,15,0X000001,false,"y",2)
	TMDLine.position.y =-7.5 
	TMDLine.position.x =0 
	TMDLine.rotation.z =0
	TMD.add(TMDMass,TMDLine)
	TMD.position.z = -4
	TMD.position.y = 40
	scene.add(TMD)  
	houseMass = new TEACHER.ObjSphere(1,0XCC0000,2)
	houseMass.position.z = -4
	houseMass.position.y = 40
	houseMass.visible = false
	scene.add(houseMass)
	//生成房子
	houseNfrontwall = new THREE.Object3D()
	houseNfrontwall1 = new TEACHER.ObjBox(35,35,2,0XCCCCCC,2)
	houseNfrontwall2 = new TEACHER.ObjBox(2,35,17.5,0XCCCCCC,2)
	houseNfrontwall2.position.x = 16.5
	houseNfrontwall2.position.z = 7.75
	houseNfrontwall3 = new TEACHER.ObjBox(2,35,17.5,0XCCCCCC,2)
	houseNfrontwall3.position.x = -16.5
	houseNfrontwall3.position.z = 7.75
	houseNfrontwall4 = new TEACHER.ObjBox(35,2,17.5,0XCCCCCC,2)
	houseNfrontwall4.position.y = -16.5
	houseNfrontwall4.position.z = 7.75
	houseNfrontwall5 = new TEACHER.ObjBox(35,2,17.5,0XCCCCCC,2)
	houseNfrontwall5.position.y = 16.5
	houseNfrontwall5.position.z = 7.75
	
	houseNfrontwall.add(houseNfrontwall1,houseNfrontwall2,houseNfrontwall3,houseNfrontwall4,houseNfrontwall5)  
	scene.add(houseNfrontwall)
	houseNfrontwall.position.y = 17.5
	houseNfrontwall.position.z = -16.5
	
	housefrontwall = new THREE.Object3D()
	housefrontwall1 = new TEACHER.ObjBox(34,35,2,0XCCCCCC,2)
	housefrontwall2 = new TEACHER.ObjBox(2,35,17.5,0XCCCCCC,2)
	housefrontwall2.position.x = 16.5
	housefrontwall2.position.z = -7.75
	housefrontwall3 = new TEACHER.ObjBox(2,35,17.5,0XCCCCCC,2)
	housefrontwall3.position.x = -16.5
	housefrontwall3.position.z = -7.75
	housefrontwall4 = new TEACHER.ObjBox(35,2,17.5,0XCCCCCC,2)
	housefrontwall4.position.y = -16.5
	housefrontwall4.position.z = -7.75
	housefrontwall5 = new TEACHER.ObjBox(35,2,17.5,0XCCCCCC,2)
	housefrontwall5.position.y = 16.5
	housefrontwall5.position.z = -7.75
	
	housefrontwall.add(housefrontwall1,housefrontwall2,housefrontwall3,housefrontwall4,housefrontwall5)  
	scene.add(housefrontwall)
	housefrontwall.position.y = 17.5
	housefrontwall.position.z = 16.5
	
	door = new THREE.Object3D()
	doorhandle = new TEACHER.ObjSphere(0.5,0XEAC100,2)
	doorwood = new TEACHER.ObjBox(5,10,1,0XBB5E00,2)
	doorside1 = new TEACHER.ObjBox(6,1,1.5,0X844200,2)
	doorside2 = new TEACHER.ObjBox(1,11,1.5,0X844200,2)
	doorside3 = new TEACHER.ObjBox(6,1,1.5,0X844200,2)
	doorside4 = new TEACHER.ObjBox(1,11,1.5,0X844200,2)
	doorwood.position.y = 5
	doorside1.position.y = 10
	doorside2.position.x = 2.5 
	doorside2.position.y = 5
	doorside4.position.x = -2.5 
	doorside4.position.y = 5 	
	doorhandle.position.y = 5
	doorhandle.position.x = 1.5
	doorhandle.position.z = 0.5
	door.add(doorwood,doorside1,doorside2,doorside3,doorside4,doorhandle)
	door.scale.x = 2
	door.scale.y = 2
	door.scale.z = 2
	door.position.z = 17.5
	door.position.y = 1
	scene.add(door)
	
	
	//生成屋簷
	for(var i=0;i<2;i++){
	housefronthead = new THREE.Object3D()
	housefronthead1 = new TEACHER.ObjBox(25,2,18,0XCC0000)
	housefronthead1.position.y = 37
	housefronthead1.position.x = 11.5
	housefronthead1.position.z = 8.75
	housefronthead1.rotation.z = -Math.PI*2/18
	housefronthead2 = new TEACHER.ObjBox(25,2,18,0XCC0000)
	housefronthead2.position.y = 37
	housefronthead2.position.x = -11.5
	housefronthead2.position.z = 8.75
	housefronthead2.rotation.z = Math.PI*2/18
	housefronthead3 = new TEACHER.ObjBox(25,3,2,0XCCCCCC)
	housefronthead3.position.y = 36
	housefronthead3.position.z = 16.5
	housefronthead4 = new TEACHER.ObjBox(11,3,2,0XCCCCCC)
	housefronthead4.position.y = 38.7
	housefronthead4.position.z = 16.5
	housefronthead5 = new TEACHER.ObjBox(25,3,2,0XCCCCCC)
	housefronthead5.position.y = 36
	housefronthead5.position.z = 1
	housefronthead6 = new TEACHER.ObjBox(11,3,2,0XCCCCCC)
	housefronthead6.position.y = 38.7
	housefronthead6.position.z = 1
	housefrontheadputings1 = new THREE.Object3D()
	puting1= new TEACHER.ObjBox(2,1,2,0XCCCCCC,2)
	puting1.position.x = 13
	puting1.position.y = 35.5
	puting1.position.z = 16.5
	puting2= new TEACHER.ObjBox(2,1,2,0XCCCCCC,2)
	puting2.position.x = -13
	puting2.position.y = 35.5
	puting2.position.z = 16.5
	puting3= new TEACHER.ObjBox(2,1.1,2,0XCCCCCC,2)
	puting3.position.x = 6
	puting3.position.y = 37.5
	puting3.position.z = 16.5
	puting4= new TEACHER.ObjBox(2,1.1,2,0XCCCCCC,2)
	puting4.position.x = -6
	puting4.position.y = 37.5
	puting4.position.z = 16.5
	housefrontheadputings1.add(puting1,puting2,puting3,puting4)
	housefrontheadputings2 = new THREE.Object3D()
	puting5= new TEACHER.ObjBox(2,1,2,0XCCCCCC,2)
	puting5.position.x = 13
	puting5.position.y = 35.5
	puting5.position.z = 1
	puting6= new TEACHER.ObjBox(2,1,2,0XCCCCCC,2)
	puting6.position.x = -13
	puting6.position.y = 35.5
	puting6.position.z = 1
	puting7= new TEACHER.ObjBox(2,2.1,2,0XCCCCCC,2)
	puting7.position.x = 6
	puting7.position.y = 37.5
	puting7.position.z = 1
	puting8= new TEACHER.ObjBox(2,2.1,2,0XCCCCCC,2)
	puting8.position.x = -6
	puting8.position.y = 37.5
	puting8.position.z = 1
	housefrontheadputings2.add(puting5,puting6,puting7,puting8)
	housefronthead.add(housefronthead1,housefronthead2,housefronthead3,housefronthead4,housefronthead5,housefronthead6,housefrontheadputings1,housefrontheadputings2)

	housefronthead.position.z = -i*17.5
	housefrontheadArray.push(housefronthead)
	scene.add(housefronthead)
	}
	//生成屋簷結束
	for(var j=1;j<8;j++){
		for(var k=1;k<j;k++){
			var housefloor = new TEACHER.ObjBox((0.5+(1.5/j))*35-1,0.5,17.5,0XCCCCCC,2)
			scene.add(housefloor)
			housefloor.position.y = 35*k/j
			housefloor.position.z = -8.25
			housefloor.position.visible = false
			housefloorArray.push(housefloor)
		}
	}
	
	cover = new TEACHER.ObjBox(27,4,2,0XCCCCCC,2)
	scene.add(cover)
	cover.position.x = 14
	cover.position.z = -16.5
	cover.position.y = 34.3
	cover.visible = false
	cover1 = new TEACHER.ObjBox(27,4,2,0XCCCCCC,2)
	scene.add(cover1)
	cover1.position.x = -14
	cover1.position.z = -16.5
	cover1.position.y = 34.3
	cover1.visible = false
	cover2 = new TEACHER.ObjBox(27,5.5,2,0XCCCCCC,2)
	scene.add(cover2)
	cover2.position.x = 14
	cover2.position.z = 16.5
	cover2.position.y = 33
	cover2.visible = false
	cover3 = new TEACHER.ObjBox(27,5.5,2,0XCCCCCC,2)
	scene.add(cover3)
	cover3.position.x = -14
	cover3.position.z = 16.5
	cover3.position.y = 33
	cover3.visible = false

	//生成房子結束
	ground.visible = false
	illustrate = new TEACHER.ObjPicPlane(70,35,pics.illustrate2,"z",2)
	illustrate1 = new TEACHER.ObjPicPlane(70,35,pics.illustrate,"z",2)
	illustrate2 = new TEACHER.ObjPicPlane(70,35,pics.illustrate1,"z",2)
	illustrate3 = new TEACHER.ObjPicPlane(70,35,pics.illustrate3,"z",2)
	illustrate.position.z = 50 
	illustrate1.position.z = 50 
	illustrate2.position.z = 50 
	illustrate3.position.z = 50 
	illustrate1.visible = false
	illustrate2.visible = false
	illustrate3.visible = false
	scene.add(illustrate,illustrate1,illustrate2,illustrate3)

	dampingvalue = new TEACHER.ObjTextPlane(20,5,"阻尼比","z",0X000001,0XFFFFFF)
	scene.add(dampingvalue)
	dampingvalue.position.x = 50
	dampingvalue.position.y = 10
	namaie = new TEACHER.ObjTextPlane(40,5,"153426劉興宸","X",0X000001,0XFFFFFF)
	namaie.position.z = -50
	namaie.position.y = 50
	scene.add(namaie)

	//graph
	graph = new TEACHER.ObjGraph(0,20,-40,40,0Xffffff,0Xffff00,10000)
	graph.labelTitle.setText("振幅歷時");
	graph.position.z = 30
	graph.position.y = -20
	graph.scale.y = 1/2
	graph.labelX.setText("時間(s)");
	graph.labelY.setText("房子振幅cm");
	graph1 = new TEACHER.ObjGraph(0,20,-40,40,0Xffffff,0XFF9224,10000)
	graph1.labelTitle.setText("振幅歷時");
	graph1.position.z = 29.9
	graph1.position.y = -20
	graph1.scale.y = 1/2
	graph1.labelX.setText("時間(s)");
	graph1.labelY.setText("房子振幅cm");
	
	scene.add(graph)
	scene.add(graph1)
	//graph結束

	//作業需要
	//housefrontwall.visible = false
	//housefrontheadArray[0].visible = false
	
	housefrontheadputings1.visible = false
	housefronthead3.visible = false
	housefronthead4.visible = false
	houseNfrontwall5.visible = false
	//到此

	world2D.btn01.setLabel('地震');
	world2D.btn01.on('click', clickBtn);
	world2D.btn02.setLabel('前面隱藏');
	world2D.btn02.on('click', clickBtn);

	world2D.btnRight.on('click', clickBtn);
	world2D.btnLeft.on('click', clickBtn);
	world2D.btnDown.on('click', clickBtn);
	world2D.btnUp.on('click', clickBtn);


	world2D.sl01.setLabel('層樓數')
	world2D.sl01.minimum = 1
	world2D.sl01.maximum = 7
	world2D.sl01.value = 1

	world2D.sl02.setLabel('TMD擺長(公寸)')
	world2D.sl02.minimum = 5
	world2D.sl02.maximum = 30
	world2D.sl02.value = 15

	world2D.sl03.setLabel('震度(級)')
	world2D.sl03.minimum = 3
	world2D.sl03.maximum = 7
	world2D.sl03.value = 5

	world2D.ch01.setLabel('不加TMD歷時')
	world2D.ch02.setLabel('有加TMD歷時')
	world2D.ch01.checked=true
	world2D.ch02.checked=true


	world2D.slCameraRR.value =120

	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
	FF = 0
	SS = 0
	UU = 0
	world2D.sl01.value = Math.floor(world2D.sl01.value)
	world2D.sl02.value = Math.floor(world2D.sl02.value)
	world2D.sl03.value = Math.floor(world2D.sl03.value)

	if(world2D.ch01.checked===true){
		graph1.visible = true
	}
	else{
		graph1.visible = false
		
	}
	if(world2D.ch02.checked===true){
		graph.visible = true
		
	}
	else{
		graph.visible =  false
		
	}

	//改樓層
	for(var j=1;j<8;j++){
		
		if(Math.floor(world2D.sl01.value)===j){
			for(var i=0;i<2;i++){
				housefrontheadArray[i].scale.x = 0.5+(1.5/j) 
				
			}
			housefrontwall.scale.x = 0.5+(1.5/j) 
			houseNfrontwall.scale.x = 0.5+(1.5/j) 
			door.scale.x =2/j
			door.scale.y =2/j
			door.scale.z =2/j

			for(var k=1;k<j;k++){
				housefloorArray[FF].visible = true
				FF+=1
			}
			for(i=0;i<7;i++){
				SS+=j/8
				DD = Math.pow(1/(i+1),10)
				deskandchairArray[i].scale.x = 1/j
				deskandchairArray[i].scale.y = 1/j
				deskandchairArray[i].scale.z = 1/j
				deskandchairArray[i].position.y = Math.floor(SS)*35/j+2*DD
				deskandchairArray[i].position.x = (0.5+(1.5/j))*10.5
				
			}
		}
		else{
			for(var k=1;k<j;k++){
				housefloorArray[FF].visible = false
				FF+=1
			}
		}
	}
	
	if(Math.floor(world2D.sl01.value)===1){
		for(i=0;i<2;i++){
			drawArray[i].visible = true
		}
	}
	else{
		for(i=0;i<2;i++){
			drawArray[i].visible = false
		}
	}	
	//改樓層完畢
	//改TMDRR
	TMDRR = world2D.sl02.value*1/world2D.sl01.value 
	TMD.scale.y = TMDRR/15
	TMDMass.scale.y = 15/Math.pow(world2D.sl01.value,1/2)/TMDRR 
	TMDMass.scale.z = 1/Math.pow(world2D.sl01.value,1/2) 
	TMDMass.scale.x = 1/Math.pow(world2D.sl01.value,1/2) 
	TMDLine.scale.z = 1/Math.pow(world2D.sl01.value,1/2) 
	TMDLine.scale.x = 1/Math.pow(world2D.sl01.value,1/2) 
	

	//改TMDRR完畢

	//房子的運動
	if(vectur===1){
		AA = Math.pow(2,world2D.sl03.value-5)*world2D.sl01.value*(0.5+(1.5/world2D.sl01.value))/2
		tt += 0.01
		TMDTime = 2*Math.PI*Math.sqrt(world2D.sl01.value*TMDRR/10/9.8)
		damping = (28/Math.pow(Math.sqrt(Math.log(houseTime*world2D.sl01.value/TMDTime)*Math.log(houseTime*world2D.sl01.value/TMDTime))+1,4)+2)/100
		houseomega = 2*Math.PI/houseTime
		housedampingomega = houseomega*Math.sqrt(1-damping*damping)
		housePositionX = AA*Math.pow((Math.E),-damping*houseomega*tt)*Math.cos(housedampingomega*tt)
		housethita = Math.asin(housePositionX/35)
		
		dampingvalue.setText(Math.floor(10000*damping)/10000)
		
		cover.visible = true
		cover1.visible = true
		if(OO===1){
			cover2.visible = true
			cover3.visible = true
		}
		
		
		houseNfrontwall1.rotation.z = housethita
		houseNfrontwall1.scale.x = Math.cos(housethita)
		houseNfrontwall1.scale.y = Math.cos(housethita)
		houseNfrontwall1.position.x = -17.5*Math.tan(housethita)
		houseNfrontwall2.rotation.z = housethita
		houseNfrontwall2.position.x = -17.5*Math.tan(housethita)+16.5
		houseNfrontwall3.rotation.z = housethita
		houseNfrontwall3.position.x = -17.5*Math.tan(housethita)-16.5
		houseNfrontwall5.position.x = -35*Math.tan(housethita)
		housefrontwall1.rotation.z = housethita
		housefrontwall1.scale.x = Math.cos(housethita)
		housefrontwall1.scale.y = Math.cos(housethita)
		housefrontwall1.position.x = -17.5*Math.tan(housethita)
		housefrontwall2.rotation.z = housethita
		housefrontwall2.position.x = -17.5*Math.tan(housethita)+16.5
		housefrontwall3.rotation.z = housethita
		housefrontwall3.position.x = -17.5*Math.tan(housethita)-16.5
		housefrontwall5.position.x = -35*Math.tan(housethita)
		cover.position.x = -35*Math.tan(housethita)+14*(0.5+(1.5/world2D.sl01.value))/2
		cover.scale.x = (0.5+(1.5/world2D.sl01.value))/2
		cover1.position.x = -35*Math.tan(housethita)-14*(0.5+(1.5/world2D.sl01.value))/2
		cover1.scale.x = (0.5+(1.5/world2D.sl01.value))/2
		cover2.position.x = -35*Math.tan(housethita)+14*(0.5+(1.5/world2D.sl01.value))/2
		cover2.scale.x = (0.5+(1.5/world2D.sl01.value))/2
		cover3.position.x = -35*Math.tan(housethita)-14*(0.5+(1.5/world2D.sl01.value))/2
		cover3.scale.x = (0.5+(1.5/world2D.sl01.value))/2
		for(var i=0;i<2;i++){
			housefrontheadArray[i].position.x = housefrontwall5.position.x 
		}
		
		for(var j=1;j<8;j++){
			for(var k=1;k<j;k++){
				var housefloor=housefloorArray[UU]
				housefloor.position.x = -housefloor.position.y*Math.tan(housethita)
				
				UU++
				
			}
		}
	
	
		for(var j=1;j<8;j++){
			if(Math.floor(world2D.sl01.value)===j){
				for(i=0;i<7;i++){
					deskandchairArray[i].position.x = (0.5+(1.5/j))*10.5-deskandchairArray[i].position.y*Math.tan(housethita) 			
				}
			}
		}

		doorside1.position.x = -doorside1.position.y*Math.tan(housethita)
		doorside2.position.x = 2.5-doorside2.position.y*Math.tan(housethita)
		doorside2.rotation.z = housethita
		doorside4.position.x = -2.5-doorside4.position.y*Math.tan(housethita)
		doorside4.rotation.z = housethita
		doorhandle.position.x = 1.5-doorhandle.position.y*Math.tan(housethita)
		doorwood.rotation.z = housethita






		earthquaketime +=1
		for(var i=0;i<2;i++){
			drawArray[i].position.x = -18+12*i-drawArray[i].position.y*Math.tan(housethita)
			if(world2D.sl03.value>5 & drawArray[i].position.y>5.5 & earthquaketime>100){
				drawArray[i].position.y-=0.5
			}
			else if(world2D.sl03.value>5 & earthquaketime>100){
				drawArray[i].position.y = 2.5
				drawArray[i].position.z = -10
				drawArray[i].rotation.z = Math.PI/4
				drawArray[i].rotation.x = Math.PI/2
			}
			else if(world2D.sl03.value>4 & earthquaketime%50 === 49 & drawArray[i].rotation.z < Math.PI/8){
				drawArray[i].rotation.z +=0.2 
			}
		} 
		


	//房子的運動結束

	//TMD的運動
	TMD.position.x = housefrontwall5.position.x 
	alpha = gg*Math.sin(thita)/TMDRR -beta*omega
	omega+=alpha*dt
	thita+=omega*dt
	TMD.rotation.z =  thita
	TMDMassPositionX=TMDRR*Math.sin(thita)
	TMDMassPositionY=40-TMDRR*Math.cos(thita)
	
	
	//thita =Math.asin(houseMass.position.x-TMDMass.position.x/15) 
	
	
	//TMD的運動結束
	//graph
	
	
	TT+=0.01
	
	
	graph.addPoint(TT,10*housePositionX);
	
	houseomega = 2*Math.PI/houseTime
	housedampingomega = houseomega*Math.sqrt(1-0.02*0.02)
	housePositionX = AA*Math.pow((Math.E),-0.02*houseomega*tt)*Math.cos(housedampingomega*tt)
	graph1.addPoint(TT,10*housePositionX);
	
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
		if(gameMD===1){
			vectur=-vectur
			tt = 0
			TT = 0
			UU = 0
			alpha = 0
			omega = 0
			earthquaketime = 0
		
			TMDTime = 2*Math.PI*Math.sqrt(world2D.sl01.value*TMDRR/10/9.8)
			damping = (25/Math.pow(Math.sqrt(Math.log(houseTime*world2D.sl01.value/TMDTime)*Math.log(houseTime*world2D.sl01.value/TMDTime))+1,4)+5)/100
			houseomega = 2*Math.PI/houseTime
			housedampingomega = houseomega*Math.sqrt(1-damping*damping)
			housePositionX = AA*Math.pow((Math.E),-damping*2*Math.PI/houseomega*tt)*Math.cos(housedampingomega*tt)
			
			if(housePositionX/TMDRR>1){
				thita = Math.PI/2
			}
			else{
				thita = 2*Math.asin(housePositionX/TMDRR)
			}
			

			housethita = 0
			houseNfrontwall1.rotation.z = housethita
			houseNfrontwall1.scale.x = Math.cos(housethita)
			houseNfrontwall1.scale.y = Math.cos(housethita)
			houseNfrontwall1.position.x = -17.5*Math.tan(housethita)
			houseNfrontwall2.rotation.z = housethita
			houseNfrontwall2.position.x = -17.5*Math.tan(housethita)+16.5
			houseNfrontwall3.rotation.z = housethita
			houseNfrontwall3.position.x = -17.5*Math.tan(housethita)-16.5
			houseNfrontwall5.position.x = -35*Math.tan(housethita)
			housefrontwall1.rotation.z = housethita
			housefrontwall1.scale.x = Math.cos(housethita)
			housefrontwall1.scale.y = Math.cos(housethita)
			housefrontwall1.position.x = -17.5*Math.tan(housethita)
			housefrontwall2.rotation.z = housethita
			housefrontwall2.position.x = -17.5*Math.tan(housethita)+16.5
			housefrontwall3.rotation.z = housethita
			housefrontwall3.position.x = -17.5*Math.tan(housethita)-16.5
			housefrontwall5.position.x = -35*Math.tan(housethita)
			cover.position.x = -35*Math.tan(housethita)+14*(0.5+(1.5/world2D.sl01.value))/2
			cover.scale.x = (0.5+(1.5/world2D.sl01.value))/2
			cover1.position.x = -35*Math.tan(housethita)-14*(0.5+(1.5/world2D.sl01.value))/2
			cover1.scale.x = (0.5+(1.5/world2D.sl01.value))/2
			cover2.position.x = -35*Math.tan(housethita)+14*(0.5+(1.5/world2D.sl01.value))/2
			cover2.scale.x = (0.5+(1.5/world2D.sl01.value))/2
			cover3.position.x = -35*Math.tan(housethita)-14*(0.5+(1.5/world2D.sl01.value))/2
			cover3.scale.x = (0.5+(1.5/world2D.sl01.value))/2
		
		for(var i=0;i<2;i++){
			housefrontheadArray[i].position.x = housefrontwall5.position.x 
		}
		
		for(var j=1;j<8;j++){
			for(var k=1;k<j;k++){
				var housefloor=housefloorArray[UU]
				housefloor.position.x = -housefloor.position.y*Math.tan(housethita)
				
				UU++
				
			}
		}
		for(var i=0;i<2;i++){
			drawArray[i].position.y = 20
			drawArray[i].position.x = -18+12*i
			drawArray[i].position.z = -15
			drawArray[i].rotation.z = 0
			drawArray[i].rotation.x = 0
		}
		


		TMD.position.x = housefrontwall5.position.x 
		TMD.rotation.z =  0
		}
		if(vectur===1){
			graph.clear()
			graph1.clear()
		}
		
	}	
	if(str === 'btn02'){
		gameMD = 2
		OO=-OO
		if(gameMD===2 & housefrontwall.visible === true){
			housefrontwall.visible = false
			housefrontheadArray[0].visible = false
			cover2.visible = false
			cover3.visible = false
			door.visible = false
		}
		else{
			housefrontwall.visible = true
			housefrontheadArray[0].visible = true
			door.visible = true
		}
		
	}
	if(str === 'btnRight'){
		
		if(illustrate.visible===true){
			illustrate.visible =false 
			illustrate1.visible =true
		}
		else if(illustrate1.visible===true){
			illustrate1.visible =false 
			illustrate2.visible =true
		}
		else if(illustrate2.visible===true){
			illustrate2.visible =false 
			illustrate.visible =true
		}
		

		
	}
	if(str === 'btnLeft'){

		if(illustrate.visible===true){
			illustrate.visible =false 
			illustrate2.visible =true
		}
		else if(illustrate1.visible===true){
			illustrate1.visible =false 
			illustrate.visible =true
		}
		else if(illustrate2.visible===true){
			illustrate2.visible =false 
			illustrate1.visible =true
		}
	
	}
	if(str === 'btnUp'){
		if(illustrate.visible===false & illustrate1.visible===false & illustrate2.visible===false){
			illustrate.visible = true
		}
		else{
			illustrate.visible =false 
			illustrate1.visible =false 
			illustrate2.visible =false 
		}

	}
	if(str === 'btnDown'){

		if(illustrate3.visible===false){
			illustrate3.visible = true
		}
		else{
			illustrate3.visible = false
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
