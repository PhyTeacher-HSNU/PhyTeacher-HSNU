'use strict';//嚴格模式
var fps=60;//動畫fps
var log=console.log;//簡化log

//------------老師作的萬用半成品(2020.12.01)-----------//

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var table;
var ball,ball2;
var row,spring,row2;
var bracketA=[],bracket2A=[];
var b1array=[],r1array=[];
var b2array=[],r2array=[];
var alphaarray=[],omegaarray=[],thetaarray=[],periodarray=[],Larray=[];
var alphaarray2=[],omegaarray2=[],thetaarray2=[];
var Tmax=60,n=30;
var bracket,bracket2;
var plate,ceiling;
var line,lineP,lineK;
var arrowz,arrowy,arrowv;
var dt=0.1;
var L=60,L0=55,r;
var alpha=0,alpha2=0,omega=0,omega2=0,theta=30*Math.PI/180;
var thetaP=0;
var theta2=0;
var kD=0.1,h=30;
var springD,thetaD=0;
var omegaP=0.5;
var vy,vz,v;
var m=10;
var g=9.8;
var k=200;
var textplant1,textplant2,text1="",text2="";
var T0,T,omega_c,omega_p;
var rz,ry;
var pause=1,gamemode=0;
var tt=0,N=0;
var camx=0,camtheta=0;
//B.定義init
function init(){
	table=new TEACHER.ObjCylinder(50,3,0xF0F0F0);
	ball=new TEACHER.ObjSphere(3,0x46A3FF);
	row=new TEACHER.ObjCylinder(0.5,40,0xffffff);
	spring=new TEACHER.ObjSpring(L,2,0.5,8,0xF9F900);
	plate=new TEACHER.ObjCylinder(55,1.5,0xFF8000);
	ceiling=new TEACHER.ObjBox(210,110,2,0x9D9D9D);

	line=new TEACHER.Line(0xffff00,2,50);
	lineP=new TEACHER.Line(0x97CBFF,2,100000);
	lineK=new TEACHER.Line(0x97CBFF,2,100000);

	arrowz=new TEACHER.ObjArrow(1,0xFF9D6F);
	arrowy=new TEACHER.ObjArrow(1,0xA8FF24);
	arrowv=new TEACHER.ObjArrow(1,0x80FFFF);

	row2=new TEACHER.ObjCylinder(0.5,40,0xffffff);
	ball2=new TEACHER.ObjSphere(3,0x46A3FF);
	springD=new TEACHER.ObjSpring(50,2,0.5,8,0xF9F900);

	textplant1=new TEACHER.ObjTextPlane(70,10,text1);
	textplant2=new TEACHER.ObjTextPlane(70,10,text2);

	scene.add(row2).add(ball2).add(springD).add(ceiling);
	scene.add(table).add(ball).add(row).add(plate).add(spring);
	scene.add(line).add(lineP).add(lineK);
	scene.add(arrowz).add(arrowy).add(arrowv);
	scene.add(textplant1).add(textplant2);


	row.position.y=120-L/2;
	// spring.position.y=120-L;
	ball.position.y=120-L;
	row.scale.y=L/40;
	spring.rotation.z=Math.PI;
	ceiling.position.y=120;
	ceiling.rotation.x=1/2*Math.PI;
	textplant1.position.y=30;
	textplant2.position.y=50;
	textplant1.position.z=-75;
	textplant2.position.z=-75;

	ceiling.visible=false;
	ball.visible=true;
	row.visible=true;
	arrowz.visible=arrowy.visible=arrowv.visible=true;
	row2.visible=spring.visible=springD.visible=false;
	ball2.visible=false;
	for (var i=0;i<3;i++){
		for (var j=0;j<3;j++){
			var ground=new TEACHER.ObjPicPlane(100,100,pics.ground,'y');
			world3D.scene.add(ground);
			ground.position.x=-100+300*i/3;
			ground.position.z=-100+300*j/3;
		}
	}
	for (var i=0;i<3;i++){
		var bracket=new TEACHER.ObjCylinder(1,100,0xffff00);
		scene.add(bracket);
		if (i===0){
			bracket.rotation.z=1/2*Math.PI;
			bracket.position.y=120;
		}else if (i===1){
			bracket.position.x=-51;
			bracket.position.y=60;
			bracket.scale.y=1.25;
			bracket.scale.x=2;
			bracket.scale.z=2;
		}else if (i===2){
			bracket.position.x=51;
			bracket.position.y=60;
			bracket.scale.y=1.25;
			bracket.scale.x=2;
			bracket.scale.z=2;
		}
		bracketA.push(bracket);
	}

	for (var i=0;i<4;i++){
		bracket2=new TEACHER.ObjCylinder(1,100,0xA6A600);
		scene.add(bracket2);
		if (i===0){
			bracket2.position.x=100;
			bracket2.position.y=60;
			bracket2.position.z=50;
			bracket2.scale.y=1.2;
			bracket2.scale.x=2;
			bracket2.scale.z=2;
		}else if (i===1){
			bracket2.position.x=100;
			bracket2.position.z=-50;
			bracket2.position.y=60;
			bracket2.scale.y=1.2;
			bracket2.scale.x=2;
			bracket2.scale.z=2;
		}else if (i===2){
			bracket2.position.x=-100;
			bracket2.position.z=50;
			bracket2.position.y=60;
			bracket2.scale.y=1.2;
			bracket2.scale.x=2;
			bracket2.scale.z=2;
		}else if (i===3){
			bracket2.position.x=-100;
			bracket2.position.z=-50;
			bracket2.position.y=60;
			bracket2.scale.y=1.2;
			bracket2.scale.x=2;
			bracket2.scale.z=2;
		}
		bracket2.visible=false;
		bracket2A.push(bracket2);
	}

	for (var i=0;i<20;i++){
		var b1=new TEACHER.ObjSphere(3,0x46A3FF);
		var r1=new TEACHER.ObjCylinder(0.5,40,0xffffff);
		scene.add(b1).add(r1);
		b1.position.x=-80+i*8;
		r1.position.x=-80+i*8;
		// b1.position.y=120-Larray[i];
		// r1.position.y=120-(L/2-i);
		// r1.scale.y=(L-i)/40;
		b1.visible=r1.visible=false;
		b1array.push(b1);
		r1array.push(r1);
	}
	for (var i=0;i<7;i++){
		var b2=new TEACHER.ObjSphere(5,0x46A3FF);
		var r2=new TEACHER.ObjCylinder(0.5,40,0xffffff);
		scene.add(b2).add(r2);
		b2.position.x=-35+i*10;
		r2.position.x=-35+i*10;
		b2.position.y=120-L;
		r2.position.y=120-L/2;
		r2.scale.y=L/40;
		b2.visible=r2.visible=false;
		b2array.push(b2);
		r2array.push(r2);
	}
	ball.vz=0;
	ball.vy=0;
	ball.v=0;
	

	world2D.sl01.setLabel("擺長");
	world2D.sl01.maximum=80;
	world2D.sl01.minimum=10;
	world2D.sl01.value=60;
	world2D.sl02.setLabel("擺角");
	world2D.sl02.maximum=60;
	world2D.sl02.minimum=0;
	world2D.sl02.value=30;
	world2D.sl03.setLabel("底盤轉速");
	world2D.sl03.maximum=1;
	world2D.sl03.minimum=-1;
	world2D.sl03.value=0.5;
	world2D.sl03.digitN=2;
	world2D.sl04.setLabel("dt");
	world2D.sl04.maximum=1;
	world2D.sl04.minimum=-1;
	world2D.sl04.value=0.1;
	world2D.sl04.digitN=2;

	world2D.btn01.setLabel("開始/暫停");
	world2D.btn01.on("click",clickbtn);
	world2D.btn02.setLabel("蛇擺");
	world2D.btn02.on("click",clickbtn);
	world2D.btn03.setLabel("單擺");
	world2D.btn03.on("click",clickbtn);
	// world2D.btn04.setLabel("牛頓擺");
	// world2D.btn04.on("click",clickbtn);
	world2D.btn04.visible=false;
	world2D.btn05.setLabel("彈力擺");
	world2D.btn05.on("click",clickbtn);
	world2D.btn06.setLabel("傅科擺");
	world2D.btn06.on("click",clickbtn);
	world2D.btn07.setLabel("耦合擺");
	world2D.btn07.on("click",clickbtn);

	world2D.ch01.setLabel("157401方世燊");
	world2D.ch02.setLabel("跟著擺");
	world2D.ch03.setLabel("按下該模式的按鈕即可更新與重置");
	
	
	world2D.sl03.visible=false;
	world2D.sl05.visible=false;

	world2D.slCameraRR.maximum=400;
	world2D.slCameraRR.value=200;
	world3D.cameraTarget.x=0;
	world3D.cameraTarget.y=60;
	world3D.cameraTarget.z=0;

	world2D.btnUp.visible=world2D.btnDown.visible=world2D.btnLeft.visible=world2D.btnRight.visible=false;
	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){
	if (pause===1){
		if (gamemode===0){
			tt+=dt;
			alpha=(-L*g*Math.sin(theta))/(L*L);
			omega+=alpha*dt;
			theta+=omega*dt;
			// scene.rotation.x=theta;
			if (world2D.ch02.checked){
				world3D.cameraTarget.x=ball.position.x;
				world3D.cameraTarget.y=(world3D.cameraTarget.y*0.9)+((ball.position.y-((world2D.slCameraRR.value+15)*Math.sin(theta)))*0.1);
				world3D.cameraTarget.z=(world3D.cameraTarget.z*0.9)+((ball.position.z-((world2D.slCameraRR.value+15)*Math.cos(theta)))*0.1);
				world2D.slCameraRR.value=(world2D.slCameraRR.value*0.9)+(40*0.1);
				arrowz.visible=arrowy.visible=arrowv.visible=false;
				line.visible=false;

			}else if ((world3D.cameraPhi<0.1||world3D.cameraPhi>-0.1 )&& world3D.cameraTarget.x>-0.5){
				world3D.cameraTarget.x=0;
				world3D.cameraTarget.y=(world3D.cameraTarget.y*0.9)+(60*0.1);
				world3D.cameraTarget.z=world3D.cameraTarget.y*0.1;
				world2D.slCameraRR.value=(world2D.slCameraRR.value*0.9)+(200*0.1);
				arrowz.visible=arrowy.visible=arrowv.visible=true;
				line.visible=true;
			}

			

			ball.position.z=L*Math.sin(theta);
			ball.position.y=120-L*Math.cos(theta);
			row.position.z=ball.position.z/2;
			row.position.y=(120+ball.position.y)/2;
			row.rotation.x=-theta;
			dt=world2D.sl04.value;

			line.addPoint(0,ball.position.y,ball.position.z);
			v=L*omega;
			vz=v*Math.cos(theta);
			vy=v*Math.sin(theta);

			arrowv.position.z=ball.position.z;
			arrowv.position.y=ball.position.y;
			arrowz.position.z=ball.position.z;
			arrowz.position.y=ball.position.y;
			arrowy.position.z=ball.position.z;
			arrowy.position.y=ball.position.y;
			arrowz.setArrow(0,0,vz*2);
			arrowv.setArrow(0,vy*2,vz*2);
			arrowy.setArrow(0,vy*2,0);
			T0=2*Math.PI*Math.sqrt(L/g);
			T0=T0.toFixed(2);
			textplant1.setText("理論週期:"+T0);
			omega_c=omega;
   			if (omega_p>0&&omega_c<0){
        		// N+=1;
				// log(N);
				tt=tt.toFixed(2);
				textplant2.setText("實際週期:"+tt);
				tt=0;
			}
    		omega_p=omega_c;
				
			line.update();

			if (world3D.cameraPhi!==0 && world3D.cameraTarget.x<-0.5){
				camx=camx*0.95;
				camtheta=camtheta*0.95;
				world3D.cameraPhi=camtheta;
				world3D.cameraTarget.x=camx;
			}
		}else if (gamemode===1){
			alpha=(-L*g*Math.sin(theta))/(L*L);
			omega+=alpha*dt;
			theta+=omega*dt;
			
			ball.az=-k*((ball.position.z)-L*Math.sin(theta))/m;
			ball.ay=-g*m+(k*((120-ball.position.y)-L*Math.cos(theta))/m);
			// ball.az=0;
			ball.vz+=ball.az*dt;
			ball.vy+=ball.ay*dt;
			ball.position.z+=ball.vz*dt;
			ball.position.y+=ball.vy*dt;
				
			spring.position.z=0;
			spring.position.y=120;
			spring.setSpring(0,120-ball.position.y,ball.position.z);

			lineK.addPoint(0,ball.position.y,ball.position.z);
			lineK.update();

			dt=world2D.sl04.value;

			if (world2D.ch02.checked){
				world3D.cameraTarget.x=ball.position.x;
				world3D.cameraTarget.y=(world3D.cameraTarget.y*0.9)+((ball.position.y-((world2D.slCameraRR.value+15)*Math.sin(theta)))*0.1);
				world3D.cameraTarget.z=(world3D.cameraTarget.z*0.9)+((ball.position.z-((world2D.slCameraRR.value+15)*Math.cos(theta)))*0.1);
				world2D.slCameraRR.value=(world2D.slCameraRR.value*0.9)+(40*0.1);
				lineK.visible=false;

			}else if ((world3D.cameraPhi<0.1||world3D.cameraPhi>-0.1 )&& world3D.cameraTarget.x>-0.5){
				world3D.cameraTarget.x=0;
				world3D.cameraTarget.y=(world3D.cameraTarget.y*0.9)+(60*0.1);
				world3D.cameraTarget.z=world3D.cameraTarget.y*0.1;
				world2D.slCameraRR.value=(world2D.slCameraRR.value*0.9)+(200*0.1);
				lineK.visible=true;
			}

			if (world3D.cameraPhi!==0 && world3D.cameraTarget.x<-0.5){
				camx=camx*0.95;
				camtheta=camtheta*0.95;
				world3D.cameraPhi=camtheta;
				world3D.cameraTarget.x=camx;
			}
		}else if (gamemode===2){
			alpha=(-L*g*Math.sin(theta))/(L*L);
			omega+=alpha*dt;
			theta+=omega*dt;
			ball.position.z=L*Math.sin(theta);
			ball.position.y=120-L*Math.cos(theta);
			row.position.z=ball.position.z/2;
			row.position.y=(120+ball.position.y)/2;
			row.rotation.x=-theta;
			dt=world2D.sl04.value;

			thetaP+=omegaP*dt;
			table.rotation.y=-thetaP;
			var xx=ball.position.z*Math.sin(thetaP);
			var zz=ball.position.z*Math.cos(thetaP);
			lineP.addPoint(xx,3,zz);
			lineP.update();
			table.add(lineP);

			if (world3D.cameraPhi!==0 && world3D.cameraTarget.x<-0.5){
				camx=camx*0.95;
				camtheta=camtheta*0.95;
				world3D.cameraPhi=camtheta;
				world3D.cameraTarget.x=camx;
			}
			if ((world3D.cameraTarget.z>0.1||world3D.cameraTarget.z<-0.1)&&(world3D.cameraTarget.y>60.1||world3D.cameraTarget.y<59.9)){
				world3D.cameraTarget.z=world3D.cameraTarget.z*0.95;
				world3D.cameraTarget.y=(world3D.cameraTarget.y*0.95)+(60*0.05);
				world2D.slCameraRR.value=(world2D.slCameraRR.value*0.9)+(200*0.1);
			}
		}else if (gamemode===3){
			tt+=dt;
			var t=0;
			for (var i=0;i<20;i++){
				periodarray[i]=Tmax/(n+i);

				Larray[i]=Math.pow(periodarray[i]/2*Math.PI,2)*g;
				alphaarray[i]=(-Larray[i]*g*Math.sin(thetaarray[i]))/Math.pow(Larray[i],2);
				omegaarray[i]+=alphaarray[i]*dt;
				thetaarray[i]+=omegaarray[i]*dt;

				var b1=b1array[i];
				var r1=r1array[i];

				b1.position.z=Larray[i]*Math.sin(thetaarray[i]);
				b1.position.y=120-Larray[i]*Math.cos(thetaarray[i]);

				r1.position.z=b1.position.z/2;
				r1.position.y=(120+b1.position.y)/2;
				r1.rotation.x=-thetaarray[i];

				dt=world2D.sl04.value;

				
				

			}
			t=tt.toFixed(2);
			textplant1.setText("時間:"+t);
			textplant2.setText("循環週期:"+Tmax/dt);


			if (world3D.cameraPhi!==-1/2*Math.PI && world3D.cameraTarget.x>-79.5){
				camx=camx*0.95+(-80)*0.05;
				camtheta=camtheta*0.95+(-1/2*Math.PI)*0.05;
				world3D.cameraPhi=camtheta;
				world3D.cameraTarget.x=camx;
			}
			if ((world3D.cameraTarget.z>0.1||world3D.cameraTarget.z<-0.1)&&(world3D.cameraTarget.y>60.1||world3D.cameraTarget.y<59.9)){
				world3D.cameraTarget.z=world3D.cameraTarget.z*0.95;
				world3D.cameraTarget.y=(world3D.cameraTarget.y*0.95)+(60*0.05);
				world2D.slCameraRR.value=(world2D.slCameraRR.value*0.9)+(200*0.1);
			}
		// }else if (gamemode===4){
		// 	for (var i=0;i<7;i++){
		// 		alphaarray2[i]=(-L*g*Math.sin(thetaarray2[i]))/(L*L);
		// 		omegaarray2[i]+=alphaarray2[i]*dt;
		// 		thetaarray2[i]+=omegaarray2[i]*dt;

		// 		var b2=b2array[i];
		// 		var r2=r2array[i];
		// 		var v2=L*omegaarray2[i];


		// 		b2.vx=v2*Math.cos(thetaarray2[i]);
		// 		b2.vy=v2*Math.sin(thetaarray2[i]);
		// 		b2.vz=0;

		// 		b2.position.x+=b2.vx*dt;
		// 		b2.position.y+=b2.vy*dt;
		// 		b2.position.z+=b2.vz*dt;


		// 		// b2.position.x=(-35+i*10)+L*Math.sin(thetaarray2[i]);
		// 		// b2.position.y=120-L*Math.cos(thetaarray2[i]);

				

		// 		r2.position.x=(b2.position.x+(-35+i*10))/2;
		// 		r2.position.y=(120+b2.position.y)/2;
		// 		r2.rotation.z=thetaarray2[i];
		// 	}
		// 	dt=world2D.sl04.value;
			

		// 	for (var i=0;i<6;i++){
		// 		for (var j=i+1;j<7;j++){
		// 			var b1=b2array[i];
		// 			var b2=b2array[j];
		// 			collision(b1,b2,10);
		// 		}
		// 	}
		
		}else if (gamemode===5){
			tt+=dt;
			alpha=((-L*g*m*Math.sin(theta))-(kD*h*h*(theta-theta2)))/(L*L*m);
			omega+=alpha*dt;
			theta+=omega*dt;

			ball.position.z=L*Math.sin(theta);
			ball.position.y=120-L*Math.cos(theta);
			row.position.z=ball.position.z/2;
			row.position.y=(120+ball.position.y)/2;
			row.rotation.x=-theta;

			alpha2=((-L*g*m*Math.sin(theta2))+(kD*h*h*(theta-theta2)))/(L*L*m);
			omega2+=alpha2*dt;
			theta2+=omega2*dt;

			ball2.position.z=L*Math.sin(theta2);
			ball2.position.y=120-L*Math.cos(theta2);
			row2.position.z=ball2.position.z/2;
			row2.position.y=(120+ball2.position.y)/2;
			row2.rotation.x=-theta2;

			springD.position.x=row.position.x;
			springD.position.y=-h*Math.cos(-theta)+120;
			springD.position.z=-h*Math.sin(-theta);
			springD.setSpring((-h*Math.cos(-theta2))-(-h*Math.cos(-theta)),50,(-h*Math.sin(-theta)-(-h*Math.sin(-theta2))));
			spring.rotation.z=Math.PI;

			t=tt.toFixed(2);
			textplant1.setText("時間:"+t);

			dt=world2D.sl04.value;
			if (world3D.cameraPhi!==0 && world3D.cameraTarget.x<-0.5){
				camx=camx*0.95;
				camtheta=camtheta*0.95;
				world3D.cameraPhi=camtheta;
				world3D.cameraTarget.x=camx;
			}
			if ((world3D.cameraTarget.z>0.1||world3D.cameraTarget.z<-0.1)&&(world3D.cameraTarget.y>60.1||world3D.cameraTarget.y<59.9)){
				world3D.cameraTarget.z=world3D.cameraTarget.z*0.95;
				world3D.cameraTarget.y=(world3D.cameraTarget.y*0.95)+(60*0.05);
				world2D.slCameraRR.value=(world2D.slCameraRR.value*0.9)+(200*0.1);
			}
		}	
	}
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function clickbtn(e){
	var str=e.target.parent.name;
	if (str==="btn01"){
		if (pause===0){
			pause = 1;
		}else if (pause===1){
			pause=0;
		}
	}else if (str==="btn02"){
		
		gamemode=3;
		reset();
		for (var i=0;i<4;i++){
			bracket2A[i].visible=true;
		}	
		for (var i=0;i<20;i++){
			var b1=b1array[i];
			var r1=r1array[i];
			periodarray[i]=Tmax/(n+i);
			Larray[i]=Math.pow(periodarray[i]/2*Math.PI,2)*g;
			b1.visible=true;
			r1.visible=true;
			r1.scale.y=Larray[i]/40;
		}
		ceiling.visible=true;
		// Tmax=2*Math.PI*Math.sqrt(L/g);
		world2D.sl01.visible=false;
		textplant1.visible=true;
		textplant2.visible=true;
		textplant1.position.z=50;
		textplant2.position.z=50;
		textplant1.rotation.y=-1/2*Math.PI;
		textplant2.rotation.y=-1/2*Math.PI;
		

		
	}else if (str==="btn03"){
		gamemode=0;
		reset();
		for (var i=0;i<3;i++){
			bracketA[i].visible=true;
		}
		textplant1.visible=true;
		textplant2.visible=true;
		table.visible=true;
		plate.visible=true;

		arrowz.visible=arrowy.visible=arrowv.visible=true;
		ball.visible=row.visible=true;
		world2D.ch02.visible=true;

		ball.position.x=0;
		row.position.x=0;
		
	// }else if (str==="btn04"){
	// 	gamemode=4;
	// 	reset();
	// 	for (var i=0;i<4;i++){
	// 		bracket2A[i].visible=true;
	// 	}
	// 	ceiling.visible=true;
	// 	for (var i=0;i<7;i++){
	// 		var b2=b2array[i];
	// 		var r2=r2array[i];
	// 		var omegav0=thetaarray2[i]/dt;
	// 		b2.visible=true;
	// 		r2.visible=true;
	// 		b2.vx=L*omegav0*Math.sin(thetaarray2[i]),b2.vy=L*omegav0*Math.cos(thetaarray2[i]),b2.vz=0;
	// 		b2.ax=0,b2.ay=0,b2.az=0;
			
			
	// 		// b2.position.x=(-35+i*10)-(L*Math.sin(thetaarray2[i]));
	// 		// b2.position.y=120-L*Math.cos(thetaarray2[i]);
	// 	}
	// 	// var num=7;
	// 	// world2D.sl03.setLabel("右");
	// 	// world2D.sl03.maximum=5;
	// 	// world2D.sl03.minimum=0;
	// 	// world2D.sl03.digitN=2;
	// 	// kD=world2D.sl03.value;

	// 	// world2D.sl05.setLabel("左");
	// 	// world2D.sl05.maximum=L;
	// 	// world2D.sl05.minimum=10;
	// 	// h=world2D.sl05.value;

		
		
	}else if (str==="btn05"){
		reset();
		spring.visible=true;
		ball.visible=true;
		for (var i=0;i<3;i++){
			bracketA[i].visible=true;
		}
		table.visible=true;
		plate.visible=true;
		world2D.ch02.visible=true;

		gamemode=1;

		world2D.sl03.visible=true;
		ball.position.z=L*Math.sin(theta);
		ball.position.y=120-L*Math.cos(theta);
		ball.position.x=0;
		ball.vz=0;
		ball.vy=0;

		world2D.sl03.setLabel("彈力係數");
		world2D.sl03.maximum=100;
		world2D.sl03.minimum=50;
		world2D.sl03.digitN=1;
		k=world2D.sl03.value;
		
	}else if (str==="btn06"){
		gamemode=2;
		reset();
		world2D.sl03.visible=true;
		row.visible=true;
		ball.visible=true;
		for (var i=0;i<3;i++){
			bracketA[i].visible=true;
		}
		table.visible=true;
		plate.visible=true;

		ball.position.x=0;
		row.position.x=0;

		world2D.sl03.setLabel("底盤轉速");
		world2D.sl03.maximum=1;
		world2D.sl03.minimum=-1;
		world2D.sl03.digitN=2;
		omegaP=world2D.sl03.value;

	}else if (str==="btn07"){
		gamemode=5;
		h=L/2;

		reset();
		
		ball.visible=ball2.visible=true;
		row.visible=row2.visible=true;
		springD.visible=true;
		world2D.sl03.visible=world2D.sl05.visible=true;
		for (var i=0;i<3;i++){
			bracketA[i].visible=true;
		}
		table.visible=true;
		plate.visible=true;
		textplant1.visible=true;

		springD.rotation.z=1/2*Math.PI;
		springD.rotation.y=Math.PI;
		row.position.y=120-L/2;
		row2.position.y=120-L/2;
		ball.position.y=120-L;
		ball2.position.y=120-L;
		row.scale.y=L/40;
		row2.scale.y=L/40;
		row.position.x=-25;
		row2.position.x=25;
		ball.position.x=-25;
		ball2.position.x=25;

		world2D.sl03.setLabel("彈力係數");
		world2D.sl03.maximum=5;
		world2D.sl03.minimum=0;
		world2D.sl03.digitN=2;
		kD=world2D.sl03.value;

		world2D.sl05.setLabel("耦合長度");
		world2D.sl05.maximum=L;
		world2D.sl05.minimum=10;
		h=world2D.sl05.value;
	}

}

function reset(){
	L=world2D.sl01.value;
	theta=world2D.sl02.value*Math.PI/180;
	omegaP=world2D.sl03.value;
	alpha=0,alpha2=0,omega=0,omega2=0;
	thetaP=0,theta2=0;
	tt=0;
	scene.rotation.x=0;

	textplant1.position.z=-75;
	textplant2.position.z=-75;
	textplant1.rotation.y=0;
	textplant2.rotation.y=0;
	world2D.ch02.checked=false;

	for (var i=0;i<20;i++){
		var b1=b1array[i];
		var r1=r1array[i];
		b1.visible=false;
		r1.visible=false;
		omegaarray[i]=0;
		thetaarray[i]=world2D.sl02.value*Math.PI/180;

	}
	for (var i=0;i<7;i++){
		var b2=b2array[i];
		var r2=r2array[i];
		b2.visible=false;
		r2.visible=false;
		omegaarray2[i]=0;
		thetaarray2[i]=0;
		thetaarray2[0]=world2D.sl02.value*Math.PI/180;
		

	}

	row.scale.y=L/40;
	row2.scale.y=L/40;

	arrowz.visible=arrowy.visible=arrowv.visible=false;
	row.visible=row2.visible=spring.visible=springD.visible=false;
	ball.visible=ball2.visible=false;
	for (var i=0;i<3;i++){
		bracketA[i].visible=false;
	}
	for (var i=0;i<4;i++){
		bracket2A[i].visible=false;
	}
	table.visible=false;
	plate.visible=false;
	ceiling.visible=false;

	world2D.sl03.visible=false;
	world2D.sl05.visible=false;
	world2D.sl01.visible=true;
	textplant1.visible=false;
	textplant2.visible=false;
	world2D.ch02.visible=false;

	line.clear();
	lineK.clear();
	lineP.clear();
}




//碰撞
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
		log(1);
	}

	return isCollision;
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
	let color=_color||0xFF00;
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
