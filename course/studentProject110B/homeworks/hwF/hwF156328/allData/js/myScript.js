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
var mc;//主角
var vhr;//村民屋頂
var vh;//村民房子
var gameMD = 0;
var mch;//主角房子
var mchr;//主角屋頂
var mchd;//主角房門
var mcw;//主角房牆
var mcb;//主角床
var btn02 = 0;//btn02判定
var btn01 = 0;//btn01判定
var bg = 0;//background, 0=村子,1=藥田,1.5=主角房子,2=岔口,3=隱士,4=村外
var rstc; var lstc;//岔口行道樹
var rtArray=[];//岔口右行道樹
var ltArray=[];//岔口左行道樹
var mountain;//山體
var rsto; var lsto;//村外行道樹
var rtoArray=[];//村外右行道樹
var ltoArray=[];//村外左行道樹
var herb;//藥草
var hArray = [];//藥草
var hc= 0;//計算藥草數量
var vA;//村民A
var vB;//村民B
var hermit;//隱士
var monster;//怪獸
var hn;//藥草不足提示
var chief;//村長
var cp = 0;//檢查點
var mn;//任務提示
var ec = 0;//結局計算
var ed1;//劇情殺結局
var ed1si;//劇情殺結局補充
var ed1c = 0;//劇情殺結局判定
var ed2;//獨善其身結局
//獨善其身結局補充
var ed2si1;
var ed2si2;
var ed2si3;
var ed2c = 0;//獨善其身結局判定
var ed3;//作死結局
var ed3si;//作死結局補充
var ed3c = 0;//作死結局判定
var ed4;//防護罩結局
//防護罩結局補充
var ed4si1;
var ed4si2;
var ed4si3;
var ed4c = 0;//防護罩結局判定
var ed5;//隱士結局
//隱士結局補充
var ed5si1;
var ed5si2;
var ed5si3;
var ed5si4;
var ed5c = 0;//隱士結局判定
var hlc = 0;
//隱士台詞
var hl1
var hl2
var worship = 0;//供奉判定
//藥草台詞
var hml1;
var hml2;
var hml3;
var hlmlc=0;//藥草任務台詞判定
//村長閒聊台詞
var chatc1;
var chatc2;
var chatcc=0;//村長閒聊台詞判定
var process = 0;//離開村子判定
var process2 = 0;
//村民襲擊台詞
var aml1;
var aml2;
var aml3;
var aml4;
var aml5;
var aml6;
var aml7;
var aml8;
var aml9;
var aml10;
var aml11;
var amlc = 0;//村民襲擊台詞判定
//獻祭台詞
var rlc=0;//獻技台詞判定
var rl1;
var rl2;
var rl3;
var rl4;
var rl5;
var rl6;
var rl7;
var chatvA1;//村民A閒聊台詞
var chatvAc = 0;//村民A閒聊台詞判定
var chatvB1;
var chatvBc = 0;
var sleep = 0;
var ed6;//睡死結局
var ed6si1;//睡死結局補充
var ed6si2;
var ed6c = 0;//睡死結局判定

//B.定義init
function init(){

	loader= new THREE.ObjectLoader();

	mc =loader.parse(protagonist);
	scene.add(mc);
	mc.scale.x = mc.scale.y = mc.scale.z *= 3.5;
	mc.position.z = 8; 

	const geometry = new THREE.ConeGeometry(5,1.5,4,26);
	const material = new THREE.MeshBasicMaterial( {color: 0x8C2B2B} );
	vhr = new THREE.Mesh( geometry, material );
	scene.add( vhr );
	vhr.scale.x = vhr.scale.y = vhr.scale.z *= 7.5;
	vhr.position.y = 42;
	vhr.position.z = -23;
	vhr.position.x = -26;
	vhr.rotation.y= -Math.PI*0.25;

	vh = loader.parse(villager_house);
	scene.add(vh);
	vh.scale.z *= 3;
	vh.scale.x = vh.scale.y *=2.5; 
	vh.position.x = -5;
	
	mch = loader.parse(protagonist_house);
	scene.add(mch);
	mch.scale.z *= 3;
	mch.scale.x = mch.scale.y *=2.5;
	mch.position.x = 47;

	mchd = new TEACHER.ObjBox(13,24,1,0x331919)
	scene.add(mchd);
	mchd.position.x = 27;
	mchd.position.z = -0.6;
	mchd.position.y = 12;

	mcw = loader.parse(wall);
	scene.add(mcw);
	mcw.scale.x = mcw.scale.y = mcw.scale.z *= 2.95;
	mcw.position.x = -2;
	mcw.position.y = 21;
	mcw.position.z = 8;
	mcw.visible = false;

	mcb = loader.parse(bed);
	scene.add(mcb);
	mcb.scale.x = mcb.scale.y = mcb.scale.z *=2;
	mcb.position.x = 32;
	mcb.position.z = -20;
	mcb.visible = false;

	mountain = loader.parse(mount);
	scene.add(mountain);
	mountain.scale.x *=5
	mountain.scale.y *= 6; 
	mountain.scale.z *= 9.3;
	mountain.position.z = -5;
	mountain.position.x = -45;
	mountain.visible = false;

	vA = loader.parse(p1);
	scene.add(vA);
	vA.scale.x = vA.scale.y = vA.scale.z *= 3.5;
	
	
	vB = loader.parse(p2);
	scene.add(vB);
	vB.scale.x = vB.scale.y = vB.scale.z *= 3.5;
	

	chief = loader.parse(p3);
	scene.add(chief);
	chief.scale.x = chief.scale.y = chief.scale.z *= 3.5;

	hermit = loader.parse(p4);
	scene.add(hermit);
	hermit.scale.x = hermit.scale.y = hermit.scale.z *= 3.5;
	hermit.visible = false;

	monster = loader.parse(m);
	scene.add(monster);
	monster.scale.x = monster.scale.y = monster.scale.z *= 1.5;
	monster.position.x = 0;
	monster.position.z = 80;
	monster.visible = false;

	mn = loader.parse(mission);
	scene.add(mn);
	mn.scale.x = mn.scale.y = mn.scale.z *=4.5;

	hn = new TEACHER.ObjTextPlane(100,5,"藥草不足無法進行供奉","z",0xffffff)
	scene.add(hn);	
	hn.visible = false;

	ed1si = new TEACHER.ObjTextPlane(200,8,"因為劇情需要，所以你在森林裡迷路掛掉了QQ","z",0xffffff)
	scene.add(ed1si);
	ed1si.visible = false;

	ed2si1 = new TEACHER.ObjTextPlane(200,8,"你害怕了。","z",0xffffff)
	scene.add(ed2si1);
	ed2si1.visible = false;
	ed2si2 = new TEACHER.ObjTextPlane(200,8,"你逃走了。","z",0xffffff)
	scene.add(ed2si2);
	ed2si2.visible = false;
	ed2si3 = new TEACHER.ObjTextPlane(200,8,"丟下了全部人。","z",0xffffff)
	scene.add(ed2si3);
	ed2si3.visible = false;
	
	ed3si = new TEACHER.ObjTextPlane(200,8,"再作死阿哈哈哈哈！","z",0xffffff)
	scene.add(ed3si);
	ed3si.visible = false;

	ed4si1 = new TEACHER.ObjTextPlane(200,8,"村民們用以前流傳下來的祕法把你獻祭成了防護罩。","z",0xffffff)
	scene.add(ed4si1);
	ed4si1.visible = false;
	ed4si2 = new TEACHER.ObjTextPlane(200,8,"但只支撐了一下子，最後怪獸還是衝進了村子","z",0xffffff)
	scene.add(ed4si2);
	ed4si2.visible = false;
	ed4si3 = new TEACHER.ObjTextPlane(200,8,"順帶一提，防護罩是很諷刺的艷紅色","z",0xffffff)
	scene.add(ed4si3);
	ed4si3.visible = false;

	ed5si1= new TEACHER.ObjTextPlane(200,8,"你看著村民心情很複雜。","z",0xffffff)
	scene.add(ed5si1);
	ed5si1.visible = false;
	ed5si2= new TEACHER.ObjTextPlane(200,8,"他們的臉孔突然有點陌生和噁心。","z",0xffffff)
	scene.add(ed5si2);
	ed5si2.visible = false;
	ed5si3= new TEACHER.ObjTextPlane(200,8,"隱士收你為弟子，你和他離開了從小到大生活的環境。","z",0xffffff)
	scene.add(ed5si3);
	ed5si3.visible = false;
	ed5si4= new TEACHER.ObjTextPlane(200,8,"隱士因你出手救了村子，你和他們誰也不欠誰了。","z",0xffffff)
	scene.add(ed5si4);
	ed5si4.visible = false;

	ed6si1 = new TEACHER.ObjTextPlane(200,8,"你睡死了，是真的死的那種。","z",0xffffff)
	scene.add(ed6si1);
	ed6si1.visible = false;
	ed6si2 = new TEACHER.ObjTextPlane(200,8,"別想給我偷懶。","z",0xffffff)
	scene.add(ed6si2);
	ed6si2.visible = false;

	hml1 = new TEACHER.ObjTextPlane(120,10,"村長：小明，村子裡的藥草有點缺了，","z",0xffffff,0xbab6ab)
	scene.add(hml1);
	hml1.position.z = 60;
	hml1.position.y = 10;
	hml1.visible = false;
	hml2 = new TEACHER.ObjTextPlane(120,10,"你去村子右邊的藥田採一點吧。","z",0xffffff,0xbab6ab)
	scene.add(hml2);
	hml2.position.z = 60;
	hml2.visible = false;
	hml3 = new TEACHER.ObjTextPlane(120,10,"你：好噠！","z",0xffffff,0xbab6ab)
	scene.add(hml3);
	hml3.position.z = 60;
	hml3.position.y = 5;
	hml3.visible = false;

	chatc1 = new TEACHER.ObjTextPlane(120,10,"村長：當初把你撿回來的時候還小小一隻的，","z",0xffffff,0xbab6ab)
	scene.add(chatc1);
	chatc1.position.y = 10;
	chatc1.position.z = 60;
	chatc1.visible = false;
	chatc2 = new TEACHER.ObjTextPlane(120,10,"沒想到現在已經長這麼大了。","z",0xffffff,0xbab6ab)
	scene.add(chatc2);
	chatc2.position.z = 60;
	chatc2.visible = false;

	chatvA1 = new TEACHER.ObjTextPlane(130,6,"村民A：嘿嘿，以後我當上了村長，我罩你。","z",0xffffff,0xbab6ab)
	scene.add(chatvA1);
	chatvA1.position.z = 60;
	chatvA1.position.y = 5;
	chatvA1.visible = false;

	chatvB1 = new TEACHER.ObjTextPlane(130,6,"村民B：小明啊，村子對你這麼好，要懂得回報喔。","z",0xffffff,0xbab6ab)
	scene.add(chatvB1);
	chatvB1.position.z = 60;
	chatvB1.position.y = 5;
	chatvB1.visible = false;

	aml1 = new TEACHER.ObjTextPlane(120,10,"村民A：*喘氣*好...痛...","z",0xffffff,0xbab6ab)
	scene.add(aml1);
	aml1.position.y = 5;
	aml1.position.z = 60;
	aml1.visible = false;
	aml2 = new TEACHER.ObjTextPlane(120,10,"你：發生甚麼事了！","z",0xffffff,0xbab6ab)
	scene.add(aml2);
	aml2.position.y = 5;
	aml2.position.z = 60;
	aml2.visible = false;
	aml3 = new TEACHER.ObjTextPlane(120,10,"村長：（臉色有點難看）有怪獸襲擊村子","z",0xffffff,0xbab6ab)
	scene.add(aml3);
	aml3.position.y = 5;
	aml3.position.z = 60;
	aml3.visible = false;
	aml4 = new TEACHER.ObjTextPlane(120,10,"你：我這邊有剛摘的藥草，","z",0xffffff,0xbab6ab)
	scene.add(aml4);
	aml4.position.y = 10;
	aml4.position.z = 60;
	aml4.visible = false;
	aml5 = new TEACHER.ObjTextPlane(120,10,"應該能把血止住一點。","z",0xffffff,0xbab6ab)
	scene.add(aml5);
	aml5.position.z = 60;
	aml5.visible = false;
	aml6 = new TEACHER.ObjTextPlane(120,10,"你：啊！對不起，我還沒摘藥草。","z",0xffffff,0xbab6ab)
	scene.add(aml6);
	aml6.position.y = 10;
	aml6.position.z = 60;
	aml6.visible = false;
	aml7 = new TEACHER.ObjTextPlane(120,10,"不然就可以醫療他的傷勢了...","z",0xffffff,0xbab6ab)
	scene.add(aml7);
	aml7.position.z = 60;
	aml7.visible = false;
	aml8 = new TEACHER.ObjTextPlane(120,10,"村長：謝謝，你先去休息一下。","z",0xffffff,0xbab6ab)
	scene.add(aml8);
	aml8.position.y = 10;
	aml8.position.z = 60;
	aml8.visible = false;
	aml9 = new TEACHER.ObjTextPlane(120,10,"我跟其他村民討論一下對策。","z",0xffffff,0xbab6ab)
	scene.add(aml9);
	aml9.position.z = 60;
	aml9.visible = false;
	aml10 = new TEACHER.ObjTextPlane(120,10,"村長：先別管藥草了，你先去休息一下。","z",0xffffff,0xbab6ab)
	scene.add(aml10);
	aml10.position.y = 10;
	aml10.position.z = 60;
	aml10.visible = false;
	aml11 = new TEACHER.ObjTextPlane(120,10,"村長：還有最近就先不要出村了。","z",0xffffff,0xbab6ab)
	scene.add(aml11);
	aml11.position.y = 5;
	aml11.position.z = 60;
	aml11.visible = false;

	rl1 = new TEACHER.ObjTextPlane(120,10,"（村民逐漸靠近你）","z",0xffffff,0xbab6ab)
	scene.add(rl1);
	rl1.position.z = 60;
	rl1.position.y = 5;
	rl1.visible = false;
	rl2 = new TEACHER.ObjTextPlane(120,10,"你：怎麼了嗎？","z",0xffffff,0xbab6ab)
	scene.add(rl2);
	rl2.position.z = 60;
	rl2.position.y = 5;
	rl2.visible = false;
	rl3 = new TEACHER.ObjTextPlane(120,10,"（你突然被抓住了）","z",0xffffff,0xbab6ab)
	scene.add(rl3);
	rl3.position.z = 60;
	rl3.position.y = 5;
	rl3.visible = false;
	rl4 = new TEACHER.ObjTextPlane(120,10,"你：等等，你們要幹嘛！？","z",0xffffff,0xbab6ab)
	scene.add(rl4);
	rl4.position.z = 60;
	rl4.position.y = 5;
	rl4.visible = false;
	rl5 = new TEACHER.ObjTextPlane(120,10,"村長：對不起...對不起...","z",0xffffff,0xbab6ab)
	scene.add(rl5);
	rl5.position.z = 60;
	rl5.position.y = 5;
	rl5.visible = false;
	rl6 = new TEACHER.ObjTextPlane(120,10,"（村長有點神經質地念念有詞）","z",0xffffff,0xbab6ab)
	scene.add(rl6);
	rl6.position.z = 60;
	rl6.position.y = 5;
	rl6.visible = false;
	rl7 = new TEACHER.ObjTextPlane(120,10,"村民B：你...你就當作為下輩子積德吧！","z",0xffffff,0xbab6ab)
	scene.add(rl7);
	rl7.position.z = 60;
	rl7.position.y = 5;
	rl7.visible = false;

	hl1 = new TEACHER.ObjTextPlane(120,10,"隱士：住手。","z",0xffffff,0xbab6ab)
	scene.add(hl1);
	hl1.position.z = 60;
	hl1.position.y = 5;
	hl1.visible = false;
	hl2 = new TEACHER.ObjTextPlane(120,10,"（隱士幫忙出手消滅了怪物，但主要是為了你。）","z",0xffffff,0xbab6ab)
	scene.add(hl2);
	hl2.position.z = 60;
	hl2.position.y = 5;
	hl2.visible = false;



	for(var i=0;i<4;i++){
		rstc = loader.parse(tree);
		rstc.scale.x = rstc.scale.y*=16;
		rstc.scale.z *=10;
		rstc.position.z=-40;
		rstc.position.x=-45+i*10;
		rstc.visible = false;
		scene.add(rstc);
		rtArray.push(rstc);
	}
	for(var i=0;i<4;i++){
		lstc = loader.parse(tree);
		lstc.scale.x = lstc.scale.y*=16;
		lstc.scale.z *=10;
		lstc.position.z=-40;
		lstc.position.x=45+i*-10;
		lstc.visible = false;
		scene.add(lstc);
		ltArray.push(lstc);
	}
	for(var i=0;i<9;i++){
		lsto = loader.parse(tree);
		lsto.scale.x = lsto.scale.y*=16;
		lsto.scale.z *=10;
		lsto.position.z=-40+i*10;
		lsto.position.x=-45;
		lsto.visible = false;
		scene.add(lsto);
		ltoArray.push(lsto);
	}
	for(var i=0;i<9;i++){
		rsto = loader.parse(tree);
		rsto.scale.x = rsto.scale.y*=16;
		rsto.scale.z *=10;
		rsto.position.z=-40+i*10;
		rsto.position.x=45;
		rsto.visible = false;
		scene.add(rsto);
		rtoArray.push(rsto);
	}

	for(var i=0;i<5;i++){
		herb = loader.parse(grass);
		herb.scale.x =herb.scale.y =herb.scale.z *=0.8;
		herb.visible = false;
		scene.add(herb);
		hArray.push(herb);
	}
	const geometry1 = new THREE.ConeGeometry(5,1.5,4,26);
	const material1 = new THREE.MeshBasicMaterial( {color: 0x8C2B2B} );
	mchr = new THREE.Mesh( geometry1, material1 );
	scene.add( mchr );
	mchr.scale.x = mchr.scale.y = mchr.scale.z *= 7.5;
	mchr.position.y = 42;
	mchr.position.z = -23;
	mchr.position.x = 26;
	mchr.rotation.y= -Math.PI*0.25;

	world2D.btnRight.on("mousedown",move);
	world2D.btnLeft.on("mousedown",move);
	world2D.btnUp.on("mousedown",move);
	world2D.btnDown.on("mousedown",move);
	world2D.on("pressup",stop);
	world2D.btn02.on("click",cs)//chage scene
	world2D.btn01.on("click",interact)

	world2D.slCameraRR.value = 130;
	logo.visible = false;
	world2D.ch02.visible = world2D.sl01.visible =world2D.sl02.visible =world2D.sl03.visible =false;
	world2D.ch01.setLabel("156328程暄雯")

	
	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
	
	if(hlc == 0 && hlmlc == 0 && (amlc == 10||amlc == 0) && (rlc ==0 || rlc == 10) && chatcc == 0 && chatvBc == 0 && chatvAc ==0){
		if(gameMD === 1){
			if(mc.position.x>=12 && mc.position.z<=11.7 && bg == 1.5){
				mc.position.x += 0;
			}else if(mc.position.x>=43 && bg == 1.5){
				mc.position.x += 0;
			}else if(mc.position.x>=34 && bg == 4){
				mc.position.x += 0;
			}else if(mc.position.x>=45 && bg == 1){
				mc.position.x += 0;
			}else{
				mc.position.x += 0.8;
				mc.rotation.y = Math.PI*0.5;
			}
		}else if(gameMD === 2){
			if(mc.position.x<=-42 && bg == 1.5){
				mc.position.x -= 0;
				mc.rotation.y = -Math.PI*0.5;
			}else if(mc.position.x<=-17 && bg == 3){
				mc.position.x -= 0;
			}else if(mc.position.x<=-34 && bg == 4){
				mc.position.x -= 0;
			}else{
				mc.position.x -= 0.8;
				mc.rotation.y = -Math.PI*0.5;
			}
		}else if(gameMD === 3){
			if(mc.position.z<=5.5 && bg == 0){
				mc.position.z -= 0;
				mc.rotation.y = -Math.PI;
			}else if(mc.position.x>=12 && mc.position.z<=14 && bg == 1.5){
				mc.position.z -= 0;
				mc.rotation.y = -Math.PI;
			}else if(mc.position.z<=-45 && bg == 1.5){
				mc.position.z -= 0;
				mc.rotation.y = -Math.PI;
			}else if(mc.position.z<=-45 && bg == 1){
				mc.position.z -= 0;
				mc.rotation.y = -Math.PI;
			}else if(mc.position.z<=-45 && bg == 3){
				mc.position.z -= 0;
				mc.rotation.y = -Math.PI;
			}else if(mc.position.z<=-28 &&(mc.position.x<-7 || mc.position.x>7) && bg == 4){
				mc.position.z -= 0;
				mc.rotation.y = -Math.PI;
			}else if(mc.position.z<=-28 &&(mc.position.x<-7 || mc.position.x>7) && bg == 2){
				mc.position.z -= 0;
				mc.rotation.y = -Math.PI;
			}else{
				mc.position.z -= 0.8;
				mc.rotation.y = -Math.PI;}
		}else if(gameMD === 4){
			if(mc.position.z>=45 && bg == 1.5){
				mc.position.z += 0;
				mc.rotation.y = 0;
			}else if(mc.position.z>=45 && bg == 3){
				mc.position.z += 0;
				mc.rotation.y = 0;
			}else if(mc.position.z>=45 && bg == 0){
				mc.position.z += 0;
				mc.rotation.y = 0;
			}else if(mc.position.z>=45 && bg == 1){
				mc.position.z += 0;
				mc.rotation.y = 0;
			}else if(mc.position.z<=-24&& bg == 0){
				mc.position.z+= 0;
				mc.rotation.y = 0;
			}else if(mc.position.z>=45 && bg == 2){
				mc.position.z += 0;
				mc.rotation.y = 0;
			}else{
				mc.position.z += 0.8;
				mc.rotation.y = 0;}
		}else if(gameMD === 0){
			mc.position.x += 0;
		}
	}
	

	if(Math.abs(mchd.position.z -mc.position.z) <=10 && Math.abs(mchd.position.x - mc.position.x)<=3 && bg == 0 &&(rlc ==0 || rlc == 10)){
		world2D.btn02.setLabel("進入");
		btn02 = 1;
	}else if(Math.abs(mcb.position.z -mc.position.z) <=33 && Math.abs(mcb.position.x - mc.position.x)<=25 && bg == 1.5){
		world2D.btn02.setLabel("睡覺");;
		btn02 = 3;
	}else if(mc.position.z>=42 && bg == 1.5){
		world2D.btn02.setLabel("出門");
		btn02 = 2;
	}else if(mc.position.x<=-5 && mc.position.z>=-10 && mc.position.z<=8 && bg == 3){
		world2D.btn02.setLabel("供奉");
		btn02 = 5;
	}else if(mc.position.z-chief.position.z<=10 && mc.position.x>=-35 && mc.position.x<= -17 && bg == 0 && cp<=1){
		world2D.btn02.setLabel("交談");
		btn02 = 6;
	}else if(mc.position.z>=16 && mc.position.z<= 32 && mc.position.x<=-35 && mc.position.x>= -42 && bg == 0 && cp<=1){
		world2D.btn02.setLabel("交談");
		btn02 = 7;
	}else if(mc.position.z>=36 && mc.position.z<= 45 && mc.position.x<=31 && mc.position.x>=15 && bg == 0 && cp<=1){
		world2D.btn02.setLabel("交談");
		btn02 = 8;
	}else{
		world2D.btn02.setLabel(" ");
		btn02 = 0;
	}
	for(var i=0;i<5;i++){
		var h = hArray[i];
		if(Math.abs(h.position.z -mc.position.z) <=10 && Math.abs(h.position.x - mc.position.x)<=10 && bg == 1){
			world2D.btn02.setLabel("摘採");
			btn02 = 4;
		}
	}

	if(bg == 5){
		world2D.btn01.setLabel("重新");
		btn01 = 1;
	}else if(bg == 0 && hlmlc!=0){
		world2D.btn01.setLabel("繼續");
	}else if(bg == 0 && chatcc!=0){
		world2D.btn01.setLabel("繼續");
	}else if(bg == 0 && chatvAc!=0){
		world2D.btn01.setLabel("繼續");
	}else if(bg == 0 && chatvBc!=0){
		world2D.btn01.setLabel("繼續");
	}else if(bg == 0 && amlc>0 && amlc<10 ){
		world2D.btn01.setLabel("繼續");
	}else if(bg == 0 && rlc>0 && rlc<10 ){
		world2D.btn01.setLabel("繼續");
	}else if(bg == 0 && hlc>0 && hlc<10 ){
		world2D.btn01.setLabel("繼續");
	}else{
		world2D.btn01.setLabel(" ");
		btn01 = 0;
	}

	if(bg == 0&& cp==0){
		amlc = 0;
		rlc = 0;
		process2 = 0;
		process = 0;
		hlc = 0;
		worship = 0;
		sleep = 0;
		monster.visible = false;
		mn.position.x = -27;
		mn.position.z = 5;
		vA.position.x=-50;
		vA.position.z = 25;
		vA.rotation.x =vA.rotation.y =vA.rotation.y =0;
		vB.position.z = 45;
		vB.position.x= 10;
		chief.rotation.z = chief.rotation.x =chief.rotation.y = 0
		chief.position.z = 5;
		chief.position.x = -16;
		vB.rotation.z = 0;
		vB.rotation.x = 0;
		vB.rotation.y = 0;
		vB.position.y = 0;
		skyBox.visible = true;
		ground.visible = true;
		chief.visible = mn.visible =mc.visible = vA.visible = vB.visible =vh.visible = true;
		mch.visible = true;
		mchd.visible = true;
		vhr.visible = true;
		mchr.visible = true;
		ed1si.visible = false;
		ed2si1.visible = ed2si2.visible =ed2si3.visible = false
		ed3si.visible = false;
		ed4si1.visible = ed4si2.visible =ed4si3.visible = false
		ed5si1.visible = ed5si2.visible =ed5si3.visible = ed5si3.visible =  ed5si4.visible =false
		ed6si1.visible = ed6si2.visible= false

	}
	
	if(mc.position.x<=-45 && bg == 0){
		bg = 2;
		vh.visible = false;
		mch.visible = false;
		mchd.visible = false;
		vhr.visible = false;
		mchr.visible = false;
		vA.visible = vB.visible =mn.visible = chief.visible = false;
		mc.position.x = 45;
		mc.position.z = 8;
		for(var i=0;i<5;i++){
			rtArray[i].visible = true;
			ltArray[i].visible = true;
		}
	}else if(mc.position.x>=45 && bg == 2){
		bg = 0;
		vh.visible = true;
		mch.visible = true;
		mchd.visible = true;
		vhr.visible = true;
		mchr.visible = true;
		mc.position.x = -45;
		mc.position.z = 8;
		for(var i=0;i<5;i++){
			rtArray[i].visible = false;
			ltArray[i].visible = false;
		}
	}else if(mc.position.x<=-45 && bg == 2){
		bg = 3;
		mc.position.x = 45;
		mc.position.z = 8;
		mountain.visible = true;
		for(var i=0;i<5;i++){
			rtArray[i].visible = false;
			ltArray[i].visible = false;
		}
	}else if(mc.position.x>=45 && bg == 3){
		bg = 2;
		mountain.visible = false;
		mc.position.x = -45;
		mc.position.z = 8;
		for(var i=0;i<5;i++){
			hArray[i].visible = false;
		}
		for(var i=0;i<5;i++){
			rtArray[i].visible = true;
			ltArray[i].visible = true;
		}
		
	}else if(mc.position.z<=-45 && bg == 2){
		bg = 4;
		mc.position.x = 0;
		mc.position.z = 45;
		for(var i=0;i<10;i++){
			rtoArray[i].visible = true;
			ltoArray[i].visible = true;
		}
		
	}else if(mc.position.z>=45 && bg == 4){
		bg = 2;
		mc.position.x = 0;
		mc.position.z = -45;
		for(var i=0;i<10;i++){
			rtoArray[i].visible = false;
			ltoArray[i].visible = false;
		}
		
	}else if(mc.position.x>=45 && bg == 0){
		bg = 1;
		vh.visible = false;
		mch.visible = false;
		mchd.visible = false;
		vhr.visible = false;
		mchr.visible = false;
		mn.visible = vA.visible = vB.visible =mn.visible = chief.visible = false;
		mc.position.x = -45;
		mc.position.z = 8;
		for(var i=0;i<5;i++){
			var h = hArray[i];
			hArray[i].visible = true;
			hArray[i].position.x =(Math.random()-0.5)*100;
			hArray[i].position.z =(Math.random()-0.5)*100;
			hArray[i].rotation.z = 0;
		}
		if(cp == 1){
			process++;
		}
	}else if(mc.position.x<=-45 && bg == 1){
		bg = 0;
		vh.visible = true;
		mch.visible = true;
		mchd.visible = true;
		vhr.visible = true;
		mchr.visible = true;
		mc.position.x = 43;
		mc.position.z = 8;
		for(var i=0;i<5;i++){
			hArray[i].visible = false;
		}
	}else if(mc.position.z<=-45 && bg == 4 && cp<2){
		bg = 5
		skyBox.visible = false;
		for(var i=0;i<9;i++){
			rtoArray[i].visible = false;
			ltoArray[i].visible = false;
		}
		for(var i=0;i<4;i++){
			rtArray[i].visible = false;
			ltArray[i].visible = false;
		}
		mc.visible = false;
		ground.visible = false;
		if(ed1c==0){
			ec++;
		}else if(ed1c==1){
			ec+=0;
		}
		ed1 = new TEACHER.ObjTextPlane(150,10,"結局達成：劇情殺（"+ec+"/6）","z",0xffffff)
		scene.add(ed1);
		ed1.position.y = 30;
		ed1.visible = true;
		ed1si.visible = true;
		ed1si.position.y =15;
		ed1c = 1;
	}else if(mc.position.x<=-40 && bg == 1 && cp>=2){
		bg = 5;
		monster.visible = true;
		for(var i=0;i<5;i++){
			hArray[i].visible = false;
		}
		vh.visible = false;
		mch.visible = false;
		mchd.visible = false;
		vhr.visible = false;
		mchr.visible = false;
		mn.visible = vA.visible = vB.visible =mn.visible = chief.visible = false;
		skyBox.visible = false;
		mc.visible = false;
		ground.visible = false;
		if(ed3c==0){
			ec++;
		}else if(ed3c==1){
			ec+=0;
		}
		ed3 = new TEACHER.ObjTextPlane(150,10,"結局達成：不作死就不會死（"+ec+"/6）","z",0xffffff)
		scene.add(ed3);
		ed3.position.y = 30;
		ed3.visible = true;
		ed3si.visible = true;
		ed3si.position.y =15;
		ed3c = 1;
	}else if(mc.position.z<=-45 && bg == 4 && cp>=2){
		bg = 5
		skyBox.visible = false;
		for(var i=0;i<9;i++){
			rtoArray[i].visible = false;
			ltoArray[i].visible = false;
		}
		for(var i=0;i<4;i++){
			rtArray[i].visible = false;
			ltArray[i].visible = false;
		}
		mc.visible = false;
		ground.visible = false;
		if(ed2c==0){
			ec++;
		}else if(ed2c==1){
			ec+=0;
		}
		ed2 = new TEACHER.ObjTextPlane(150,10,"結局達成：獨善其身（"+ec+"/6）","z",0xffffff)
		scene.add(ed2);
		ed2.position.y = 30;
		ed2.visible = true;
		ed2si1.visible =ed2si2.visible =ed2si3.visible = true;
		ed2si1.position.y =15;
		ed2si2.position.y =0;
		ed2si3.position.y =-15;
		ed2c = 1;
		
	}else if(rlc==10&&bg==0&& worship ==0){
		bg = 5
		skyBox.visible = false;
		vh.visible = false;
		mch.visible = false;
		mchd.visible = false;
		vhr.visible = false;
		mchr.visible = false;
		mn.visible = vA.visible = mn.visible = chief.visible = false;
		skyBox.visible = false;
		mc.visible = false;
		ground.visible = false;
		if(ed4c==0){
			ec++;
		}else if(ed4c==1){
			ec+=0;
		}
		ed4 = new TEACHER.ObjTextPlane(150,10,"結局達成：一個都不留（"+ec+"/6）","z",0xffffff)
		scene.add(ed4);
		ed4.position.y = 30;
		ed4si1.visible =ed4si2.visible =ed4si3.visible = true;
		ed4si1.position.y =15;
		ed4si2.position.y =0;
		ed4si3.position.y =-15;
		ed4c = 1;
	}else if(hlc==10&&bg==0&&worship!=0){
		bg = 5
		skyBox.visible = false;
		hermit.visible = false;
		vh.visible = false;
		mch.visible = false;
		mchd.visible = false;
		vhr.visible = false;
		mchr.visible = false;
		mn.visible = vA.visible = mn.visible = chief.visible = false;
		skyBox.visible = false;
		mc.visible = false;
		ground.visible = false;
		if(ed5c==0){
			ec++;
		}else if(ed5c==1){
			ec+=0;
		}
		ed5 = new TEACHER.ObjTextPlane(150,10,"結局達成：人性（"+ec+"/6）","z",0xffffff)
		scene.add(ed5);
		ed5.position.y = 30;
		ed5si1.visible =ed5si2.visible =ed5si3.visible =ed5si4.visible = true;
		ed5si1.position.y =20;
		ed5si2.position.y =10;
		ed5si3.position.y =0;
		ed5si4.position.y =-10;
		ed5c = 1;
	}else if(cp <2 && sleep!=0 && bg == 1.5){
		bg = 5
		skyBox.visible = false;
		mcw.visible = false;
		ground.visible = false;
		mcb.visible = mc.visible =false;
		if(ed6c==0){
			ec++;
		}else if(ed6c==1){
			ec+=0;
		}
		ed6 = new TEACHER.ObjTextPlane(150,10,"結局達成：睡死（"+ec+"/6）","z",0xffffff)
		scene.add(ed6);
		ed6.position.y = 30;
		ed6si1.visible =ed6si2.visible= true;
		ed6si1.position.y =15;
		ed6si2.position.y =0;
		ed6c = 1;
	}

	if(worship>=1 && rlc==10 && hlc ==0){
		hermit.visible = true;
		hermit.position.x = -55;
		hermit.position.y = 15;
		hermit.position.z= 15;
		hermit.rotation.y = Math.PI*0.5
		hl1.visible = true;
		hlc++;
	}


	if(bg==2 && cp == 1){
		process++;
	}

	if(bg==1.5 && cp == 1){
		process++;
	}

	if((bg==2||bg==1.5) && cp==2){
		process2++;
	}

	if(hn.position.y<=40 && hn.visible == true){
		hn.position.y+=0.1;
	}else if(hn.position.y>=40){
		hn.visible = false
	}

	if(process!=0 && bg == 0 && amlc==0){
		chief.visible = vB.visible = vA.visible = true
		vB.rotation.z = Math.PI*0.5;
		vB.rotation.x = Math.PI*0.25;
		vB.position.y = -5;
		vB.position.z =30;
		vA.position.z = chief.position.z = 25;
		chief.position.x =5;
		vA.position.x = -5
		aml1.visible = true;
		cp++;
		amlc++;
		
	}

	if(process2!=0 && bg == 0 && rlc==0){
		chief.visible = vA.visible = true;
		vB.visible =false
		if(mc.position.x<-40){
			vA.position.x = -27;
			vA.position.z = 8;
			vA.rotation.y = -Math.PI*0.5
			chief.position.x = -44;
			chief.position.z = 25;
			chief.rotation.y = -Math.PI;
		}else if(mc.position.z<6 && mc.position.x>25&& mc.position.x<28){
			vA.position.x = 18.3;
			vA.position.z = 15.3;
			vA.rotation.y = Math.PI*0.5
			chief.position.x = 36.8;
			chief.position.z = 15.3;
			chief.rotation.y = -Math.PI*0.5
		}
		rl1.visible = true;
		rlc++;
		
	}
	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}


function move(e){
	var str = e.target.parent.name;
	if(str === "btnRight"){
		gameMD = 1;
	}else if(str === "btnLeft"){
		gameMD = 2;
	}else if(str === "btnUp"){
		gameMD = 3;
	}else if(str === "btnDown"){
		gameMD = 4;
	}
}

function stop(e){
	gameMD = 0;
}

function cs(){
	if(btn02 == 1 && Math.abs(mchd.position.z -mc.position.z) <=10 && Math.abs(mchd.position.x - mc.position.x)<=3 && bg == 0){//進門
		mcw.visible = true;
		mcb.visible = true;
		vh.visible = false;
		mch.visible = false;
		mchd.visible = false;
		vhr.visible = false;
		mchr.visible = false;
		mn.visible = vA.visible = vB.visible =mn.visible = chief.visible = false;
		mc.position.x = 0;
		mc.position.z=44.5;
		mc.rotation.y = -Math.PI;
		bg = 1.5;
	}else if(btn02 == 2 && mc.position.z>=42 && bg == 1.5){//出門
		mcw.visible = false;
		mcb.visible = false;
		vh.visible = true;
		mch.visible = true;
		mchd.visible = true;
		vhr.visible = true;
		mchr.visible = true;
		mc.position.x = 26.4;
		mc.position.z=5.3;
		mc.rotation.y = 0;
		bg = 0;
	}else if(btn02 == 5 && hc>=2 && mc.position.x<=-5 && mc.position.z>=-10 && mc.position.z<=8 && bg == 3){
		worship++;
		for(var i = 0;i<2;i++){
			var h = hArray[i];
			hc--;
			h.rotation.z = Math.PI*0.5;
			h.visible = true;
			h.position.x = -10;
			if(i == 0){
				h.position.z = mc.position.z+3;
			}else if(i == 1){
				h.position.z = mc.position.z-3;
			}
		}
	}else if(btn02 == 5 && hc<2 && mc.position.x<=-5 && mc.position.z>=-10 && mc.position.z<=8 && bg == 3){
		hn.position.y=30;
		hn.visible = true;
	}else if(btn02 == 6 &&mc.position.z-chief.position.z<=10 && mc.position.x>=-35 && mc.position.x<= -17 && bg == 0 && cp ==0){
		hml1.visible = true;
		hml2.visible = true;
		hlmlc = 1;
	}else if(btn02 == 6 &&mc.position.z-chief.position.z<=10 && mc.position.x>=-35 && mc.position.x<= -17 && bg == 0 && cp ==1){
		chatc1.visible = true;
		chatc2.visible = true;
		chatcc = 1;
	}else if(btn02 == 7 &&mc.position.z>=16 && mc.position.z<= 32 && mc.position.x<=-35 && mc.position.x>= -42 && bg == 0 && cp<=1){
		chatvB1.visible = true;
		chatvBc = 1;
	}else if(btn02 == 8 &&mc.position.z>=36 && mc.position.z<= 45 && mc.position.x<=31 && mc.position.x>=15 && bg == 0 && cp<=1){
		chatvA1.visible = true;
		chatvAc = 1;
	}else if(btn02 == 3&&Math.abs(mcb.position.z -mc.position.z) <=33 && Math.abs(mcb.position.x - mc.position.x)<=25 && bg == 1.5){
		sleep = 1;
		if(cp>=2){
			skyBox.visible = false;
			mcw.visible = false;
			ground.visible = false;
			mcb.visible = mc.visible =false;
			world2D.ch01.visible = world2D.btn01.visible = world2D.btn02.visible = world2D.btnDown.visible =world2D.btnLeft.visible =world2D.btnRight.visible =world2D.btnUp.visible =world2D.slCameraRR.visible =false
			setTimeout(wake,3000);
		}
		
	}
	for(var i=0;i<5;i++){
		var h = hArray[i];
		if(btn02 == 4 && Math.abs(h.position.z -mc.position.z) <=10 && Math.abs(h.position.x - mc.position.x)<=10 && bg == 1){
			hc++;
			h.visible = false;
		}
	}
}

function wake(){
	skyBox.visible = true;
	mcw.visible = true;
	mcb.visible = mc.visible =true;
	ground.visible = true;
	world2D.ch01.visible = world2D.btn01.visible = world2D.btn02.visible = world2D.btnDown.visible =world2D.btnLeft.visible =world2D.btnRight.visible =world2D.btnUp.visible =world2D.slCameraRR.visible =true
	mc.position.x = 12;
	mc.position.z =-13;
	mc.rotation.y = -Math.PI*0.5
}


function interact(){
	if(btn01 ==1){
		bg=0;
		cp=0;
		mc.position.z = 8; 
		mc.position.x = 0;
		mc.rotation.y = 0;
		if(ed4c==1){
			ed4.visible = false;
		}
		if(ed3c==1){
			ed3.visible = false;
		}
		if(ed2c==1){
			ed2.visible = false;
		}
		if(ed1c==1){
			ed1.visible = false;
			process=0;
		}
		if(ed5c==1){
			ed5.visible = false;
		}
		if(ed6c==1){
			ed6.visible = false;
		}
		
		
	}
	if(hlmlc ==1){
		hml1.visible = false;
		hml2.visible = false;
		hml3.visible = true;
		hlmlc++
	}else if(hlmlc==2){
		hml3.visible = false;
		cp++;		
		mn.visible = false;
		hlmlc = 0;
	}
	if(chatcc ==1){
		chatcc =0;
		chatc1.visible = false;
		chatc2.visible = false;
	}
	if(chatvAc==1){
		chatvA1.visible = false;
		chatvAc =0;
	}
	if(chatvBc==1){
		chatvB1.visible = false;
		chatvBc =0;
	}

	if(amlc == 1){
		
		aml1.visible = false;
		aml2.visible = true;
		amlc++;
	}else if(amlc == 2){
		aml2.visible = false;
		aml3.visible = true;
		amlc++;
	}else if(amlc == 3 && hc>=1){
		aml3.visible = false;
		aml4.visible = true;
		aml5.visible = true;
		amlc++;
	}else if(amlc == 3 && hc<1){
		aml3.visible = false;
		aml6.visible = true;
		aml7.visible = true;
		amlc++;
	}else if(amlc == 4 && hc>=1){
		aml4.visible = false;
		aml5.visible = false;
		aml8.visible = true;
		aml9.visible = true;
		amlc++;
	}else if(amlc == 4 && hc<1){
		aml6.visible = false;
		aml7.visible = false;
		aml10.visible = true;
		aml9.visible = true;
		amlc++;
	}else if(amlc == 5 && hc>=1){
		aml8.visible = false;
		aml9.visible = false;
		aml11.visible = true;
		amlc++
	}else if(amlc == 5 && hc<1){
		aml10.visible = false;
		aml9.visible = false;
		aml11.visible = true;
		amlc++;
	}else if(amlc == 6){
		aml11.visible = false;
		amlc = 10;
		process = 0;
	}

	if(rlc == 1){
		rl1.visible = false;
		rl2.visible = true;
		rlc++;
	}else if(rlc == 2){
		rl2.visible = false;
		rl3.visible = true;
		rlc++;
	}else if(rlc == 3){
		rl3.visible = false;
		rl4.visible = true;
		rlc++;
	}else if(rlc == 4){
		rl4.visible = false;
		rl5.visible = true;
		rlc++;
	}else if(rlc == 5){
		rl5.visible = false;
		rl6.visible = true;
		rlc++;
	}else if(rlc == 6){
		rl6.visible = false;
		rl7.visible = true;
		rlc++;
	}else if(rlc == 7){
		rl7.visible = false;
		rlc = 10;
	}

	if(hlc == 1){
		hl1.visible = false;
		hl2.visible = true;
		hlc++;
	}else if(hlc == 2){
		hl2.visible = false;
		hlc=10;
	}
}




//resize
MyJS.myResize();


var wall = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "3ac649f3-c6a4-439a-8f9f-3ce112c5f0f2",
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
			"uuid": "0e77a794-ae8c-4b31-982b-1f29f8689764",
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
		}],
	"object": {
		"uuid": "236afd58-cf0c-4b3e-84a9-efa4d0d842f2",
		"type": "Group",
		"name": "Group",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "0a6b5963-3a6c-40af-8977-0d48cdff4201",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [7.525294264679678e-15,0,33.89091244626473,0,0,13.756382068087765,0,0,-1,0,2.220446049250313e-16,0,17.218039802212367,0,-3.21051078304992,1],
				"geometry": "3ac649f3-c6a4-439a-8f9f-3ce112c5f0f2",
				"material": "0e77a794-ae8c-4b31-982b-1f29f8689764"
			},
			{
				"uuid": "e65e2bd2-5f57-4dfa-850d-57aa38aa454c",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [7.525294264679678e-15,0,33.89091244626473,0,0,13.756382068087765,0,0,-1,0,2.220446049250313e-16,0,-15.840014580460444,0,-3.21051078304992,1],
				"geometry": "3ac649f3-c6a4-439a-8f9f-3ce112c5f0f2",
				"material": "0e77a794-ae8c-4b31-982b-1f29f8689764"
			},
			{
				"uuid": "51c69164-0b5a-4c05-a483-8593b70c33ca",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [33.89091244626473,0,0,0,0,13.756382068087765,0,0,0,0,1,0,0.6993480495889353,0,-19.662733321976596,1],
				"geometry": "3ac649f3-c6a4-439a-8f9f-3ce112c5f0f2",
				"material": "0e77a794-ae8c-4b31-982b-1f29f8689764"
			}]
	}
};

var door = {
	"metadata": {
		"version": 4.5,
		"type": "BufferGeometry",
		"generator": "BufferGeometry.toJSON"
	},
	"uuid": "588aa5b9-aa67-4b7c-8363-c5476806c40f",
	"type": "BoxGeometry",
	"width": 1,
	"height": 1,
	"depth": 1,
	"widthSegments": 1,
	"heightSegments": 1,
	"depthSegments": 1
}

var protagonist_house = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "b4571ca3-e38e-429e-8fb9-81f5fa4db796",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "61976e4c-c63b-4f31-b71c-4e06feb6da48",
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
			"uuid": "1628b368-0fa0-4ef6-9a57-c53364f73f77",
			"type": "MeshStandardMaterial",
			"color": 3709122,
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
			"uuid": "488b5cea-0f02-48aa-8183-2ba0dc9ec064",
			"type": "MeshStandardMaterial",
			"color": 15197924,
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
		"uuid": "5bfaf948-de92-41be-a521-5c45e63ffc08",
		"type": "Group",
		"name": "Protagonist's house",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,19.83147146256038,0,0,1],
		"children": [
			{
				"uuid": "625397ab-f09e-4526-b0d3-1b556afd7fc6",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [4.314476141605844,0,0,0,0,5.070385491778029,0,0,0,0,0.11359590287113475,0,-14.326073175415665,7.9751045359207975,0,1],
				"geometry": "b4571ca3-e38e-429e-8fb9-81f5fa4db796",
				"material": "1628b368-0fa0-4ef6-9a57-c53364f73f77"
			},
			{
				"uuid": "a9f71629-5094-4da9-b919-1e7cb6c0768e",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [4.314476141605844,0,0,0,0,5.070385491778029,0,0,0,0,0.11359590287113475,0,-2.240088378982195,7.9751045359207975,0,1],
				"geometry": "b4571ca3-e38e-429e-8fb9-81f5fa4db796",
				"material": "1628b368-0fa0-4ef6-9a57-c53364f73f77"
			},
			{
				"uuid": "7e4548cc-443f-4563-980b-fc03d73d328b",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [18.424248490288907,0,0,0,0,14.484438337276186,0,0,0,0,14.77417454083615,0,-8.271601731600429,7.346744366629299,-7.8659481613348134,1],
				"geometry": "61976e4c-c63b-4f31-b71c-4e06feb6da48",
				"material": "488b5cea-0f02-48aa-8183-2ba0dc9ec064"
			}]
	}
};

var villager_house = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "61976e4c-c63b-4f31-b71c-4e06feb6da48",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "588aa5b9-aa67-4b7c-8363-c5476806c40f",
			"type": "BoxGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "b4571ca3-e38e-429e-8fb9-81f5fa4db796",
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
			"uuid": "488b5cea-0f02-48aa-8183-2ba0dc9ec064",
			"type": "MeshStandardMaterial",
			"color": 15197924,
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
			"uuid": "47a947ec-7b2a-46dd-a7fa-15420665a41c",
			"type": "MeshStandardMaterial",
			"color": 3348761,
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
			"uuid": "1628b368-0fa0-4ef6-9a57-c53364f73f77",
			"type": "MeshStandardMaterial",
			"color": 3709122,
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
		"uuid": "3ef2d31f-fbc7-4a80-b8df-8863fafae89e",
		"type": "Group",
		"name": "Protagonist's house",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "6b0017f1-2609-4606-a06a-e2872a5256ef",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [18.424248490288907,0,0,0,0,14.484438337276186,0,0,0,0,14.77417454083615,0,-8.271601731600429,7.346744366629299,-7.8659481613348134,1],
				"geometry": "61976e4c-c63b-4f31-b71c-4e06feb6da48",
				"material": "488b5cea-0f02-48aa-8183-2ba0dc9ec064"
			},
			{
				"uuid": "d3080037-84f9-43e9-9501-1435209f594c",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [5.153381903989694,0,0,0,0,9.394157309005845,0,0,0,0,0.32764833823257594,0,-8.129109531947197,4.860870072662965,0,1],
				"geometry": "588aa5b9-aa67-4b7c-8363-c5476806c40f",
				"material": "47a947ec-7b2a-46dd-a7fa-15420665a41c"
			},
			{
				"uuid": "ae198593-1d2a-4beb-8e22-461f60875d44",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [4.314476141605844,0,0,0,0,5.070385491778029,0,0,0,0,0.11359590287113475,0,-14.326073175415665,7.9751045359207975,0,1],
				"geometry": "b4571ca3-e38e-429e-8fb9-81f5fa4db796",
				"material": "1628b368-0fa0-4ef6-9a57-c53364f73f77"
			},
			{
				"uuid": "2bc1de3a-35dd-470c-92eb-05ffd410de99",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [4.314476141605844,0,0,0,0,5.070385491778029,0,0,0,0,0.11359590287113475,0,-2.240088378982195,7.9751045359207975,0,1],
				"geometry": "b4571ca3-e38e-429e-8fb9-81f5fa4db796",
				"material": "1628b368-0fa0-4ef6-9a57-c53364f73f77"
			}]
	}
};

var protagonist = {
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "d855748f-ccec-467b-b1e8-61ed697b4523",
			"type": "SphereGeometry",
			"radius": 1,
			"widthSegments": 32,
			"heightSegments": 16,
			"phiStart": 0,
			"phiLength": 6.283185307179586,
			"thetaStart": 0,
			"thetaLength": 3.141592653589793
		},
		{
			"uuid": "5395555e-f809-4cfc-93ce-8ae8c8fc6d70",
			"type": "CylinderGeometry",
			"radiusTop": 0.46,
			"radiusBottom": 0.98,
			"height": 1,
			"radialSegments": 100,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185307179586
		},
		{
			"uuid": "34f581ac-9683-4a70-a0ab-734c0068493c",
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
			"uuid": "00d4a1ce-575d-4946-8906-94ed855b2169",
			"type": "MeshStandardMaterial",
			"color": 16770533,
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
			"uuid": "3218aee3-2a31-44fb-8b7d-639d8c4bfea0",
			"type": "MeshStandardMaterial",
			"color": 2539506,
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
			"uuid": "8d7737b7-ed61-447c-8479-f049f134694d",
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
		}],
	"object": {
		"uuid": "adffed4f-0c3e-4f39-b891-87ea74970069",
		"type": "Group",
		"name": "Protagnist",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "ba69e659-a916-4764-9b77-aed3f17b194f",
				"type": "Mesh",
				"name": "Sphere",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,4.395076106744831,0,1],
				"geometry": "d855748f-ccec-467b-b1e8-61ed697b4523",
				"material": "00d4a1ce-575d-4946-8906-94ed855b2169"
			},
			{
				"uuid": "d15592d4-ebf0-4f01-beb9-066ae8972c9f",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [1,0,0,0,0,4.171541134813328,0,0,0,0,1,0,0,2.106132266208523,0,1],
				"geometry": "5395555e-f809-4cfc-93ce-8ae8c8fc6d70",
				"material": "3218aee3-2a31-44fb-8b7d-639d8c4bfea0"
			},
			{
				"uuid": "f37fa4fe-976c-42f8-b0d6-ba1e5492fecc",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.196259423172311,0,0,0,0,0.6020891664362632,0,0,0,0,-0.018446260940702,0,-0.43873838263544007,5.018641629029824,0.8825064713758675,1],
				"geometry": "34f581ac-9683-4a70-a0ab-734c0068493c",
				"material": "8d7737b7-ed61-447c-8479-f049f134694d"
			},
			{
				"uuid": "87267e2a-93d5-475a-a35e-5562b4c8f862",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0.196259423172311,0,0,0,0,0.6020891664362632,0,0,0,0,-0.018446260940702,0,0.2811291025156103,5.018641629029824,0.9308306905394419,1],
				"geometry": "34f581ac-9683-4a70-a0ab-734c0068493c",
				"material": "8d7737b7-ed61-447c-8479-f049f134694d"
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
