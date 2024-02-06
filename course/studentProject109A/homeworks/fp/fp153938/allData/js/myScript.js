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
var GM=0;

//characters
var ball;

var player;
var Lhand;
var Rhand;
var Lfeet;
var Rfeet;
var Lwing;
var Rwing;

var gg=10;
var dt=0.1;
var aa=0.03;
var move=0;


//scene
var g1,g2,g3,g4;
var NAME;
var RULEArray=[];
var ru=0;


//GM0
var box;
var hammer;
var tt;

var flat=0;
var hammm=0;


//GM1
var jump=0;
var sps=0;
var sp1,sp2;
var sp3,sp4,sp5;

var go=0;
var FALL=0;


//GM2
var sl;
var bb=1;
var cc=1;
var ff=0;
var off;
var ro=0;
var plus=0;
var ry;
//tt

var END;


//B.定義init
function init(){

	loader = new THREE.ObjectLoader();

	box = loader.parse(gift);
	scene.add(box);
	box.scale.x = 2;
	box.scale.y = 2;
	box.scale.z = 2;

	setTimeout(goflat, 1000);

	ball = new TEACHER.ObjPicSphere(5,pics.ball);
	scene.add(ball);
	ball.visible=false;

	ball.position.y=5;
	ball.position.x=0;

	ball.vx=0;
	ball.vy=0;
	ball.vz=0;

	ball.ax=0;
	ball.ay=0;
	ball.az=0;

	player = loader.parse(player);
	scene.add(player);

	Lhand=player.getChildByName('GRight');
	Rhand=player.getChildByName('GLeft');
	Lhand.rotation.z=Math.PI*0.9;

	Lfeet=player.getChildByName('GRF');
	Rfeet=player.getChildByName('GLF');

	Lwing=player.getChildByName('GRightWing');
	Rwing=player.getChildByName('GLeftWing');
	Lwing.rotation.z=-0.3;
	Rwing.rotation.z=-0.3;
	Lwing.visible=false;
	Rwing.visible=false;

	player.rotation.y=Math.PI*0.5;
	player.scale.x=2;
	player.scale.y=2;
	player.scale.z=2;
	player.position.x=30;
	player.position.y=0;
	player.position.z=30;	

	player.vx=0;
	player.vy=0;
	player.vz=0;

	player.ax=0;
	player.ay=0;
	player.az=0;

	hammer = loader.parse(ham);
	player.add(hammer);
	hammer.position.x = 1;
	hammer.position.y = 6;
	hammer.position.z = -1.3;	
	hammer.rotation.x = (350/180)*Math.PI;
	hammer.rotation.z = 1.9*Math.PI;

	g1 = new TEACHER.ObjBox(100,2,100,0x0698a2);
	scene.add(g1);
	g1.position.y=-1;

	g2 = new TEACHER.ObjBox(100,2,100,0x0698a2);
	scene.add(g2);
	g2.position.y=-1;
	g2.position.z=-200;
	g2.visible=false;

	g3 = new TEACHER.ObjBox(100,2,100,0x0698a2);
	scene.add(g3);
	g3.position.y=-1;
	g3.position.z=-560;
	g3.visible=false;

	g4 = new TEACHER.ObjBox(100,2,100,0xffeb66);
	scene.add(g4);
	g4.position.y=-1;
	g4.position.z=-1700;
	g4.visible=false;

	ground.position.z=-100;
	ground.visible=false;

	sp1 = new TEACHER.ObjBox(10,2,10,0xF1F2AB);
	scene.add(sp1);
	sp1.position.x=15;
	sp1.position.y=-1;
	sp1.position.z=-55;
	sp1.visible=false;

	sp2 = new TEACHER.ObjBox(10,2,10,0xB7F2AB);
	scene.add(sp2);
	sp2.position.x=15;
	sp2.position.y=-1;
	sp2.position.z=-65;
	sp2.visible=false;

	sp3 = new TEACHER.ObjBox(20,2,20,0xB7F2AB);
	scene.add(sp3);
	sp3.visible=false;
	sp3.position.x=-10;
	sp3.position.y=-50;
	sp3.position.z=-300;

	sp4 = new TEACHER.ObjBox(20,2,20,0xB7F2AB);
	scene.add(sp4);
	sp4.visible=false;
	sp4.position.x=20;
	sp4.position.y=-50;
	sp4.position.z=-400;

	sp5 = new TEACHER.ObjBox(20,2,20,0xB7F2AB);
	scene.add(sp5);
	sp5.visible=false;
	sp5.position.x=-30;
	sp5.position.y=-50;
	sp5.position.z=-500;

	sl = new TEACHER.ObjBox(10,2,10,0xFAF4A3);
	scene.add(sl);
	sl.visible=false;
	sl.position.y=-0.9;
	sl.position.z=-560;

	END = new TEACHER.ObjTextPlane(160,40,"YOU WIN");
	g4.add(END);
	END.visible=false;
	END.position.y = 20;

	NAME = new TEACHER.ObjTextPlane(24,4,"1539 38 蘇歆媛");
	logo.add(NAME);
	NAME.position.x=-40;
	NAME.position.y=7;

	
	var rr = new TEACHER.ObjPicPlane(100,60,pics.r1);
	rr.position.y=0;
	rr.position.z=52;
	scene.add(rr);
	rr.visible=false;
	RULEArray.push(rr);

	var rr2 = new TEACHER.ObjPicPlane(100,60,pics.r2);
	rr2.position.y=0;
	rr2.position.z=52;
	scene.add(rr2);
	rr2.visible=false;
	RULEArray.push(rr2);

	var rr3 = new TEACHER.ObjPicPlane(100,60,pics.r3);
	rr3.position.y=0;
	rr3.position.z=52;
	scene.add(rr3);
	rr3.visible=false;
	RULEArray.push(rr3);

	var rr4 = new TEACHER.ObjPicPlane(100,60,pics.r4);
	rr4.position.y=0;
	rr4.position.z=52;
	scene.add(rr4);
	rr4.visible=false;
	RULEArray.push(rr4);

	var rr5 = new TEACHER.ObjPicPlane(100,60,pics.r5);
	rr5.position.y=0;
	rr5.position.z=52;
	scene.add(rr5);
	rr5.visible=false;
	RULEArray.push(rr5);
	
	

	
	world2D.btn01.setLabel('捶');
	world2D.btn02.setLabel('規則');
	world2D.ch01.setLabel('加速');
	world2D.ch02.setLabel('我做不到QwO');

	world2D.btn01.on('click',clickBtn);
	world2D.btn02.on('mousedown',clickBtn);
	world2D.btnUp.on('mousedown',clickBtn);
	world2D.btnDown.on('mousedown',clickBtn);
	world2D.btnLeft.on('mousedown',clickBtn);
	world2D.btnRight.on('mousedown',clickBtn);

	world2D.on('pressup',up2D);

	world2D.sl01.visible=false;
	world2D.sl02.visible=false;
	world2D.sl03.visible=false;
	world2D.ch01.visible=false;
	world2D.ch02.visible=false;

	world3D.cameraTarget.x=30;
	world3D.cameraTarget.y=0;
	world3D.cameraTarget.z=30;


	

	tt = new TEACHER.ObjBox(2,2,2,0x111111);
	scene.add(tt);
	tt.position.x = 30;
	tt.position.z = 30;	
	tt.visible=false;




	setInterval(tick,1000/fps);
}


//C.定義tick                                                                                                                       
function tick(){

	if(ru==1){
		world3D.cameraTarget.x=0;
		world3D.cameraTarget.y=0;
		world3D.cameraTarget.z=52;

		world3D.cameraPhi=0;
		world3D.cameraTheta=0.5*Math.PI;
	
	    if(GM==0 && ball.visible){
		    RULEArray[1].visible=true;

	    }else if(GM==1 && g3.visible===false){
			RULEArray[2].visible=true;
			
	    }else if(GM==1 && g3.visible){
			RULEArray[3].visible=true;

	    }else if(GM==2){
		    RULEArray[4].visible=true;
		
	    }else if(GM==0 && box.visible){
			RULEArray[0].visible=true;
		}


	}else{

	if(GM===0){
		if(hammm==1){
			if(hammer.rotation.z>Math.PI*(250/180)){
				hammer.rotation.z-=0.4;
				hammer.position.x+=0.3;
				hammer.position.y-=0.1;
				Lhand.rotation.z-=0.2;}
	
				if(flat==1){
					if(box.scale.y>0.3){
						box.scale.y-=0.3;
					}else{
						setTimeout(gone, 500);
					}
				}
			world2D.btn01.setLabel('USE');
		}
	
		if(flat==2){
			if(Lhand.rotation.z>0){
				Lhand.rotation.z-=0.2;
			}else{
				Lhand.rotation.z=0;
				flat=0;
			}
		}
		

		
		world3D.cameraTarget.x=player.position.x;
		world3D.cameraTarget.y=player.position.y;
		world3D.cameraTarget.z=player.position.z;
		
		
	
		player.vx += player.ax*dt-0.2*player.vx;
		player.vy += player.ay*dt-0.2*player.vy;
		player.vz += player.az*dt-0.2*player.vz;
	
		player.position.x += player.vx*dt;
		player.position.y += player.vy*dt;
		player.position.z += player.vz*dt;

		if(box.visible){
			if(player.position.x<=8.5 && player.position.x>=-8.5){
				if(player.position.z<=8.5 && player.position.z>=-8.5){
					player.vx=player.vz=0;
					player.ax=player.az=0;
		
					if(player.position.x>8){
						player.position.x=9;
					}else if(player.position.x<-8){
						player.position.x=-9;
					}
		
					if(player.position.z>8){
						player.position.z=9;
					}else if(player.position.z<-8){
						player.position.z=-9;
					}
				}
			}
		}else if(ball.visible){
			if(player.position.x<=5 && player.position.x>=-5){
				if(player.position.z<=5 && player.position.z>=-5){
					player.vx=player.vz=0;
					player.ax=player.az=0;
		
					if(player.position.x>4.9){
						player.position.x=5.1;
					}else if(player.position.x<-4.9){
						player.position.x=-5.1;
					}
		
					if(player.position.z>4.9){
						player.position.z=5.1;
					}else if(player.position.z<-4.9){
						player.position.z=-5.1;
					}
				}
			}
		}
		
	
		if(player.ax!=0 | player.az!=0){
			tt.position.x=player.position.x+player.ax*1.5;
			tt.position.y=player.position.y+1;
			tt.position.z=player.position.z+player.az*1.5;
		}
	
		if(tt.position.x<=8.5 && tt.position.x>=-8.5){
			if(tt.position.z<=8.5 && tt.position.z>=-8.5){
				world2D.btn01.visible=true;
			}
		}else{
			world2D.btn01.visible=false;
		}

		if(player.position.x>g1.position.x+51 | player.position.x<g1.position.x-51 | player.position.z>g1.position.z+51 | player.position.z<g1.position.z-51){
				player.ay=-15;
		}
		

	}else if(GM==1){

		world2D.ch01.visible=true;
		world2D.ch02.visible=true;
		NAME.visible=false;
		logo.visible=false;

		world3D.cameraTarget.x=ball.position.x;
		world3D.cameraTarget.y=ball.position.y;
		world3D.cameraTarget.z=ball.position.z;
		

		player.position.x = ball.position.x;
		player.position.y = ball.position.y+5;
		player.position.z = ball.position.z;

		ball.vx += ball.ax*dt-0.02*ball.vx;
		ball.vy += ball.ay*dt-0.02*ball.vy;
		ball.vz += ball.az*dt-0.02*ball.vz;

		ball.position.x += ball.vx*dt;
		ball.position.y += ball.vy*dt;
		ball.position.z += ball.vz*dt;

		var phi = Math.atan2(ball.vx , ball.vz);
		var phiRot =  phi+Math.PI/2;
		var vv = Math.sqrt(ball.vx*ball.vx+ball.vz*ball.vz);
	
		ball.rotateOnWorldAxis(new THREE.Vector3(Math.sin(phiRot),0,Math.cos(phiRot)),vv*dt/5);

		if(FALL!=1){
			if(jump===1){
				ball.ay=-2;
		
				if(ball.vy<0){
					if(ball.position.y<=5){
						jump=0;
					}
				}
			}else if(jump===0){
				ball.ay = ball.vy = 0;
				ball.position.y=5
			}
		}
		

		if(aa>0){
			aa=0.02+Math.abs(ball.vx)*0.0005+Math.abs(ball.vz)*0.0005;
		}else if(aa<0){
			aa=-0.02-Math.abs(ball.vx)*0.0005-Math.abs(ball.vz)*0.0005;
		}
	
		if(Math.abs(ball.vx)>0.5 | Math.abs(ball.vz)>0.5){
			move=1;
		}else{
			move=0;
			Rfeet.rotation.z=0;
			Lfeet.rotation.z=0;
			
			Rhand.rotation.z=0;
			Lhand.rotation.z=0;
		}

		if(ball.position.y<=5.5){
			if(go%2==1){
				if(ball.position.x<=sp1.position.x+5 && ball.position.x>=sp1.position.x-5){
					if(ball.position.z<=sp1.position.z+5 && ball.position.z>=sp1.position.z-5){
						if(go>0 && go<5 | go==21){
							sp2.position.x-=20;
						}else if(go==5 | go==23){
							sp2.position.x-=10;
							sp2.position.z-=10;
						}else if(go==7 | go==17){
							sp2.position.z-=20;
						}else if(go>=9 && go<15){
							sp2.position.x+=20;
						}else if(go==15){
							sp2.position.x+=10;
							sp2.position.z-=10;
						}else if(go==19){
							sp2.position.x-=10;
							sp2.position.z-=10;
						}
						go+=1;
					}	
				}
			}	
	
			if(go%2==0){
				if(ball.position.x<=sp2.position.x+5 && ball.position.x>=sp2.position.x-5){
					if(ball.position.z<=sp2.position.z+5 && ball.position.z>=sp2.position.z-5){
						if(go<1){
							sp1.position.x-=10;
							sp1.position.z-=10;
						}else if(go>1 && go<6 | go>=20 && go<=22){
							sp1.position.x-=20;
						}else if(go==6 | go>=16 &&go<=18){
							sp1.position.z-=20;
						}else if(go==8){
							sp1.position.x+=10;
							sp1.position.z-=10;
						}else if(go>=10 && go<16){
							sp1.position.x+=20;
						}
						go+=1;
					}	
				}
			}

			if(ball.position.x<=g2.position.x+50 && ball.position.x>=g2.position.x-50){
				if(ball.position.z<=g2.position.z+47 && ball.position.z>=g2.position.z-50){
					sp1.visible=false;
					sp2.visible=false;
				}
			}
		}

		if(ball.position.y<5.5){
			if(ball.position.x>g1.position.x+51 | ball.position.x<g1.position.x-51 | ball.position.z>g1.position.z+51 | ball.position.z<g1.position.z-51){
				if(ball.position.x>sp1.position.x+6 | ball.position.x<sp1.position.x-6 | ball.position.z>sp1.position.z+6 | ball.position.z<sp1.position.z-6){
					if(ball.position.x>sp2.position.x+6 | ball.position.x<sp2.position.x-6 | ball.position.z>sp2.position.z+6 | ball.position.z<sp2.position.z-6){
						if(ball.position.x>g2.position.x+51 | ball.position.x<g2.position.x-51 | ball.position.z>g2.position.z+51 | ball.position.z<g2.position.z-51){
							if(ball.position.x>sp3.position.x+11 | ball.position.x<sp3.position.x-11 | ball.position.z>sp3.position.z+11 | ball.position.z<sp3.position.z-11){
								if(ball.position.x>sp4.position.x+11 | ball.position.x<sp4.position.x-11 | ball.position.z>sp4.position.z+11 | ball.position.z<sp4.position.z-11){
									if(ball.position.x>sp5.position.x+11 | ball.position.x<sp5.position.x-11 | ball.position.z>sp5.position.z+11 | ball.position.z<sp5.position.z-11){
										if(ball.position.x>g3.position.x+51 | ball.position.x<g3.position.x-51 | ball.position.z>g3.position.z+51 | ball.position.z<g3.position.z-51){
											ball.ay=-15;
											FALL=1;
										}
									}
								}
							}	
						}
					}
				}
			}
		}

		if(player.position.z<=-200){
			if(sp3.position.y<-1){
				sp3.position.y+=1;
			}else if(sp3.position.y>-1){
				sp3.position.y=-1;
			}
		}else if(player.position.z>-250){
			if(sp3.position.y>-50){
				sp3.position.y-=1;
			}else if(sp3.position.y<-50){
				sp3.position.y=-50;
			}
		}

		if(sp3.position.y==-50){
			sp3.visible=false;
		}else{
			sp3.visible=true;
		}


		if(player.position.z<=-220){
			if(sp4.position.y<-1){
				sp4.position.y+=1;
			}else if(sp4.position.y>-1){
				sp4.position.y=-1;
			}
		}else if(player.position.z>-250){
			if(sp4.position.y>-50){
				sp4.position.y-=1;
			}else if(sp4.position.y<-50){
				sp4.position.y=-50;
			}
		}

		
		if(sp4.position.y==-50){
			sp4.visible=false;
		}else{
			sp4.visible=true;
		}


		if(player.position.z<=-240){
			if(sp5.position.y<-1){
				sp5.position.y+=1;
			}else if(sp5.position.y>-1){
				sp5.position.y=-1;
			}
		}else if(player.position.z>-250){
			if(sp5.position.y>-50){
				sp5.position.y-=1;
			}else if(sp5.position.y<-50){
				sp5.position.y=-50;
			}
		}

		
		if(sp5.position.y==-50){
			sp5.visible=false;
		}else{
			sp5.visible=true;
			g3.visible=true;
			sl.visible=true;
		}

		if(ball.position.x<sl.position.x+6 && ball.position.x>sl.position.x-6 && ball.position.z<sl.position.z+6 && ball.position.z>sl.position.z-6){
			GM=2;
			gg=10;
			move=0;
			FALL=0;
			sl.visible=false;
			ball.visible=false;
			player.position.y=0;
			tt.position.x = player.position.x;
			tt.position.y = player.position.y+player.rotation.z*15+20;
			tt.position.z = player.position.z;
		}
		

		if(world2D.ch01.checked){
			gg=7;
		}else{
			gg=2;
		}

		if(world2D.ch02.checked){
			ball.position.y=5;
		}
		
			
	}else if(GM==2){
		//tt.visible=true;
		g4.visible=true;
		Lwing.visible=true;
		Rwing.visible=true;
		world2D.ch01.visible=false;
		world2D.ch02.visible=false;
		g1.visible=g2.visible=false;
		sp3.visible=sp4.visible=sp5.visible=false;

		if(player.position.y<0.5){
			if(player.position.x>g3.position.x+51 | player.position.x<g3.position.x-51 | player.position.z>g3.position.z+51 | player.position.z<g3.position.z-51){
				if(player.position.x>g4.position.x+51 | player.position.x<g4.position.x-51 | player.position.z>g4.position.z+51 | player.position.z<g4.position.z-51){
					player.ay=-15;
					FALL=1;
				}
			}
		}

		if(player.position.x<g4.position.x+51 && player.position.x>g4.position.x-51 && player.position.z<g4.position.z+51 && player.position.z>g4.position.z-51){
			END.visible=true;  
		}

		world3D.cameraTarget.x=player.position.x;
		world3D.cameraTarget.y=player.position.y;
		world3D.cameraTarget.z=player.position.z;
		
	
		player.vx += player.ax*dt-0.2*player.vx;
		player.vy += player.ay*dt-0.2*player.vy;
		player.vz += player.az*dt-0.2*player.vz;
	
		player.position.x += player.vx*dt;
		player.position.y += player.vy*dt;
		player.position.z += player.vz*dt;

		if(player.vy>0 && player.position.y>5){
			player.ay=-10;
		}

		if(player.position.y>1 && off==1){
			tt.position.x = player.position.x-Math.sin(player.rotation.y-Math.PI*0.5,world3D.cameraPhi)*20;
			tt.position.z = player.position.z-Math.cos(player.rotation.y-Math.PI*0.5,world3D.cameraPhi)*20;
	
		}else if(player.position.y<=0 && FALL!=1){
			player.position.y=0
			player.ay = player.vy = 0;
			player.rotation.z = 0;
			tt.position.x = player.position.x;
			tt.position.z = player.position.z;
		}

		if(player.position.y>0){
			player.ax=(tt.position.x-player.position.x)*bb;
			player.az=(tt.position.z-player.position.z)*bb;
		}

		tt.position.y = player.position.y+player.rotation.z*15+20;

		if(off==1){
			if(player.position.y<=0.3){
				off=0;
			}
		}

		if(ro==1){
			player.rotation.y+=0.001*cc+0.0002*ff*cc;
			world3D.cameraPhi+=0.001*cc;
			ff++;
			if(player.rotation.y>ry+0.5){
				cc=0;
			}else{
				cc=1;
			}
			
			
	
		}else if(ro==2){
			player.rotation.y-=0.001*cc+0.0002*ff*cc;
			ff++;
			if(player.rotation.y<ry-0.5){
				cc=0;
			}else{
				cc=1;
			}
		}else if(ro==3){
			player.rotation.z+=0.01*cc;
			if(player.rotation.z>-Math.PI*(100/180)+0.5){
				cc=0;
			}else{
				cc=1;
			}
		}
		
		if(plus==1){
			bb+=0.1;
		}
		
	
		if(ff>40){
			ff=40;
		}


	}}
		

	
	
		
		

	
	

	

	if(move===1){
		Rfeet.rotation.z+=aa;
		Lfeet.rotation.z-=aa;

		Rhand.rotation.z-=aa;
		Lhand.rotation.z+=aa;
		if(GM==0){
			hammer.rotation.z+=aa;
			hammer.position.x-=aa*2.2;
		}
		
		Rwing.rotation.z-=aa*0.1;
		Lwing.rotation.z-=aa*0.1;

		if(Rfeet.rotation.z>0.3){
			aa*=-1;
		}if(Rfeet.rotation.z<-0.3){
			aa*=-1;
		}
	}

	if(GM==0){
		if(player.position.y<-50){
			player.vy=0;
			player.ay=0;
			player.position.x = 30;
			player.position.y = 0;
			player.position.z = 30;	
		}
	}else if(GM==1){
		if(ball.position.y<-50){
			ball.vy=0;
			ball.ay=0;
			ball.position.x = 30;
			ball.position.y = 5;
			ball.position.z = 30;

			go=0;
			sp1.position.x=15;
			sp1.position.z=-55;
			sp2.position.x=15;
			sp2.position.z=-65;
			sp1.visible=true;
			sp2.visible=true;

			FALL=0;
		}

	}else if(GM==2){
		if(player.position.y<-50){
			player.vy=0;
			player.ay=0;
			player.position.x = 0;
			player.position.y = 0;
			player.position.z = -560;
			
			FALL=0;
		}
	}
	
	


	


	

	
	//3D
	world3D.render();
	//2D
	world2D.stage.update();
}

function gone(){
	box.visible=false;
	ball.visible=true;
	hammer.visible=false;
	flat=2;
	hammm=0;
}

function goflat(){
	flat=1;
}

function clickBtn(e){
	var str=e.target.parent.name;

	if(GM==0){
		if(str==='btnUp'){
			move=1;
			player.az = -gg*Math.cos(world3D.cameraPhi);
			player.ax = -gg*Math.sin(world3D.cameraPhi);
			player.rotation.y=world3D.cameraPhi+Math.PI*0.5;
			
		}else if(str==='btnDown'){
			move=1;
			player.az = gg*Math.cos(world3D.cameraPhi);
			player.ax = gg*Math.sin(world3D.cameraPhi);
			player.rotation.y=world3D.cameraPhi+Math.PI*1.5;
		
		}else if(str==='btnLeft'){
			move=1;
			player.ax = -gg*Math.cos(world3D.cameraPhi);
			player.az = gg*Math.sin(world3D.cameraPhi);
			player.rotation.y=world3D.cameraPhi+Math.PI*1;
			
		}else if(str==='btnRight'){
			move=1;
			player.ax = gg*Math.cos(world3D.cameraPhi);
			player.az = -gg*Math.sin(world3D.cameraPhi);
			player.rotation.y=world3D.cameraPhi+Math.PI*2;
			
		}else if(str==='btn01'){
			
			if(tt.position.x<=8.5 && tt.position.x>=-8.5){
				if(tt.position.z<=8.5 && tt.position.z>=-8.5){
						if(box.visible){
							hammm=1;
						}else if(ball.visible){
							gg=2;
							world2D.btn01.setLabel('jump');
							g2.visible=true;
							sp1.visible=true;
							sp2.visible=true;
							GM=1;
						}
				}
			}
		}else if(str==='btn02'){
			ru=1;

			world3D.cameraTarget.x=0;
			world3D.cameraTarget.y=0;
			world3D.cameraTarget.z=52;
		}

	}else if(GM==1){
		if(str==='btnUp'){
			ball.az = -gg*Math.cos(world3D.cameraPhi);
			ball.ax = -gg*Math.sin(world3D.cameraPhi);
			player.rotation.y=world3D.cameraPhi+Math.PI*0.5;
	
		}else if(str==='btnDown'){
			ball.az = gg*Math.cos(world3D.cameraPhi);
			ball.ax = gg*Math.sin(world3D.cameraPhi);
			player.rotation.y=world3D.cameraPhi+Math.PI*1.5;
	
		}else if(str==='btnLeft'){
			ball.ax = -gg*Math.cos(world3D.cameraPhi);
			ball.az = gg*Math.sin(world3D.cameraPhi);
			player.rotation.y=world3D.cameraPhi+Math.PI;
	
		}else if(str==='btnRight'){
			ball.ax = gg*Math.cos(world3D.cameraPhi);
			ball.az = -gg*Math.sin(world3D.cameraPhi);
			player.rotation.y=world3D.cameraPhi+Math.PI*2;
	
		}else if(str==='btn01'){
			if(jump===0){
				jump=1;
				ball.vy=15;
			}
		}else if(str==='btn02'){
			ru=1;

			world3D.cameraTarget.x=0;
			world3D.cameraTarget.y=0;
			world3D.cameraTarget.z=52;
	    }

	}else if(GM==2){
		if(str==='btnUp'){
			if(player.position.y==0){
				move=1;
				player.az = -gg*3*Math.cos(world3D.cameraPhi);
				player.ax = -gg*3*Math.sin(world3D.cameraPhi);
				player.rotation.y=world3D.cameraPhi+Math.PI*0.5;
			}else{
				plus=1;
				ro=3;
				off=1;
				player.rotation.z = -1.5;
			}	
			
	
		}else if(str==='btnDown'){
			if(player.position.y==0){
				move=1;
				player.az = gg*3*Math.cos(world3D.cameraPhi);
				player.ax = gg*3*Math.sin(world3D.cameraPhi);
				player.rotation.y=world3D.cameraPhi+Math.PI*1.5;
			}
		}else if(str==='btnLeft'){
			if(player.position.y==0){
				move=1;
				player.ax = -gg*3*Math.cos(world3D.cameraPhi);
				player.az = gg*3*Math.sin(world3D.cameraPhi);
				player.rotation.y=world3D.cameraPhi+Math.PI*1;
			}else{
				ro=1;
				ry=player.rotation.y;
			}
			
		}else if(str==='btnRight'){
			if(player.position.y==0){
				move=1;
				player.ax = gg*3*Math.cos(world3D.cameraPhi);
				player.az = -gg*3*Math.sin(world3D.cameraPhi);
				player.rotation.y=world3D.cameraPhi+Math.PI*2;
			}else{
				ro=2;
				ry=player.rotation.y;
			}
			
		}else if(str==='btn01'){
			player.vy=70;
			
		}else if(str==='btn02'){
			ru=1;

			world3D.cameraTarget.x=0;
			world3D.cameraTarget.y=0;
			world3D.cameraTarget.z=52;
		}
	}

}


function up2D(e){

	if(GM==0){
		player.ax = player.az = 0;
		move=0;
		Rfeet.rotation.z=0;
		Lfeet.rotation.z=0;
		
		Rhand.rotation.z=0;
		if(ball.visible){
			Lhand.rotation.z=0;
		}else{
			Lhand.rotation.z=Math.PI*0.9;
		}
		
		hammer.rotation.z=Math.PI*1.9;
		hammer.position.x = 1;

	}else if(GM==1){
		ball.ax = ball.az = 0;

	}else if(GM==2){
		if(player.position.y==0){
			player.ax = player.az = 0;
			move=0;
			Rfeet.rotation.z=0;
			Lfeet.rotation.z=0;
		
			Rhand.rotation.z=0;
			Lhand.rotation.z=0;  
		}else{
			ro=0;
			plus=0;
			bb=1;
			ff=0;
		}
	}

	for(var i=0 ; i<5 ; i++){
		var rr=RULEArray[i];
		rr.visible=false;
	}
	ru=0;
	
	
}








//resize
MyJS.myResize();



































































var gift={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "35667836-4A17-493A-AB9C-DC7A410546E1",
			"type": "BoxBufferGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		},
		{
			"uuid": "968B30B9-45DD-426D-A82C-80C0C51442CF",
			"type": "BoxBufferGeometry",
			"width": 1,
			"height": 1,
			"depth": 1,
			"widthSegments": 1,
			"heightSegments": 1,
			"depthSegments": 1
		}],
	"materials": [
		{
			"uuid": "1407F611-D785-491C-83C3-B5AC92337579",
			"type": "MeshStandardMaterial",
			"color": 16711680,
			"roughness": 1,
			"metalness": 0,
			"emissive": 2359296,
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
			"uuid": "8B51D8C9-56DC-452D-8785-DA47825DA9AB",
			"type": "MeshStandardMaterial",
			"color": 16772608,
			"roughness": 1,
			"metalness": 0,
			"emissive": 20387,
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
		"uuid": "A6C4A72F-ABDF-48ED-8D91-7444868D0D6A",
		"type": "Group",
		"name": "gift",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "D757FE9A-CC14-41A0-8910-5F1E315094A6",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0,0,1.5,0,5.152888,4.737905,0,0,-0.067684,0.073613,0,0,0.085548,7.118641,0.019996,1],
				"geometry": "35667836-4A17-493A-AB9C-DC7A410546E1",
				"material": "1407F611-D785-491C-83C3-B5AC92337579"
			},
			{
				"uuid": "2A564EAB-6C04-43B4-A51B-E7EC1253B0D1",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0,0,1.5,0,-4.962817,4.936644,0,0,-0.070523,-0.070897,0,0,-0.128701,7.118641,0.019996,1],
				"geometry": "35667836-4A17-493A-AB9C-DC7A410546E1",
				"material": "1407F611-D785-491C-83C3-B5AC92337579"
			},
			{
				"uuid": "7F52FC2F-5462-4F92-8B6D-80185755D121",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [-1.5,0,0,0,0,0,-7,0,0,-0.1,0,0,0,7.004751,0.019996,1],
				"geometry": "35667836-4A17-493A-AB9C-DC7A410546E1",
				"material": "1407F611-D785-491C-83C3-B5AC92337579"
			},
			{
				"uuid": "5D790475-0AF6-450E-B457-3EA1520F5806",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0,0,1.5,0,-7,0,0,0,0,-0.1,0,0,0,7.004751,0.019996,1],
				"geometry": "35667836-4A17-493A-AB9C-DC7A410546E1",
				"material": "1407F611-D785-491C-83C3-B5AC92337579"
			},
			{
				"uuid": "23F3BC09-D334-477D-825E-94153B563075",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0,0,-1.5,0,0,7,0,0,0.1,0,0,0,3.518712,3.5,0.020152,1],
				"geometry": "35667836-4A17-493A-AB9C-DC7A410546E1",
				"material": "1407F611-D785-491C-83C3-B5AC92337579"
			},
			{
				"uuid": "48EBA84F-61B7-487F-B52B-28EB7A64D5A9",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1.5,0,0,0,0,7,0,0,0,0,0.1,0,0,3.5,-3.522197,1],
				"geometry": "35667836-4A17-493A-AB9C-DC7A410546E1",
				"material": "1407F611-D785-491C-83C3-B5AC92337579"
			},
			{
				"uuid": "92DD471C-B8D6-4B77-AC65-C522639F86E7",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [1.5,0,0,0,0,7,0,0,0,0,0.1,0,0,3.5,3.561291,1],
				"geometry": "35667836-4A17-493A-AB9C-DC7A410546E1",
				"material": "1407F611-D785-491C-83C3-B5AC92337579"
			},
			{
				"uuid": "507CD4D4-ACF1-4F65-A468-B0C3AD225EF1",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [0,0,-1.5,0,0,7,0,0,0.1,0,0,0,-3.495597,3.5,0.020152,1],
				"geometry": "35667836-4A17-493A-AB9C-DC7A410546E1",
				"material": "1407F611-D785-491C-83C3-B5AC92337579"
			},
			{
				"uuid": "84BB042E-C0E1-4C65-9E43-8A848FCAE5A9",
				"type": "Mesh",
				"name": "Box",
				"layers": 1,
				"matrix": [7,0,0,0,0,7,0,0,0,0,7,0,0,3.5,0,1],
				"geometry": "968B30B9-45DD-426D-A82C-80C0C51442CF",
				"material": "8B51D8C9-56DC-452D-8785-DA47825DA9AB"
			}]
	}
};

var ham={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "3C7FB218-34FB-4870-B251-00F143CB6420",
			"type": "CylinderBufferGeometry",
			"radiusTop": 1,
			"radiusBottom": 1,
			"height": 1,
			"radialSegments": 20,
			"heightSegments": 10,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		}],
	"materials": [
		{
			"uuid": "38691444-8EE7-41A8-85CC-8BCE80B558A6",
			"type": "MeshStandardMaterial",
			"color": 11096611,
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
		"uuid": "8250233B-002E-4CAA-9011-1C39C28CEAF2",
		"type": "Group",
		"name": "hammer",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "DD095E96-7617-42D4-9167-BBEB5CCDCF91",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0.3,0,0,0,0,5,0,0,0,0,0.3,0,0,2.5,0,1],
				"geometry": "3C7FB218-34FB-4870-B251-00F143CB6420",
				"material": "38691444-8EE7-41A8-85CC-8BCE80B558A6"
			},
			{
				"uuid": "F0A34E90-407C-45ED-8205-EC2F34E205D8",
				"type": "Mesh",
				"name": "Cylinder",
				"layers": 1,
				"matrix": [0,1.5,0,0,-2.760534,0,0,0,0,0,1.5,0,0,5,0,1],
				"geometry": "3C7FB218-34FB-4870-B251-00F143CB6420",
				"material": "38691444-8EE7-41A8-85CC-8BCE80B558A6"
			}]
	}
};

var player={
	"metadata": {
		"version": 4.5,
		"type": "Object",
		"generator": "Object3D.toJSON"
	},
	"geometries": [
		{
			"uuid": "ED52BE38-1838-4D98-8AC7-2A65BAEAEEA0",
			"type": "SphereBufferGeometry",
			"radius": 1,
			"widthSegments": 10,
			"heightSegments": 10,
			"phiStart": 0,
			"phiLength": 6.283185,
			"thetaStart": 0,
			"thetaLength": 3.141593
		},
		{
			"uuid": "9B997159-1D81-4A7B-A2D8-7733B2C4DB11",
			"type": "CylinderBufferGeometry",
			"radiusTop": 0.9,
			"radiusBottom": 1.1,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "93C15289-F81A-43BC-9783-8AB9E21A2774",
			"type": "CylinderBufferGeometry",
			"radiusTop": 0.25,
			"radiusBottom": 0.25,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "C18B30E1-E986-44D9-97FE-CB13CBAFEC2C",
			"type": "CylinderBufferGeometry",
			"radiusTop": 0.4,
			"radiusBottom": 0.6,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "7123B0E0-030D-4302-96FF-9C69B44D28B1",
			"type": "OctahedronBufferGeometry",
			"radius": 1,
			"detail": 0
		},
		{
			"uuid": "923BA4E5-63C0-4F12-9631-6C1CE3A4DD7F",
			"type": "SphereBufferGeometry",
			"radius": 1,
			"widthSegments": 10,
			"heightSegments": 10,
			"phiStart": 0,
			"phiLength": 6.283185,
			"thetaStart": 0,
			"thetaLength": 3.141593
		},
		{
			"uuid": "07EE56C5-CE2D-4CB7-BE34-282DA341C04B",
			"type": "CircleBufferGeometry",
			"radius": 1,
			"segments": 8,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "109BCAC4-A8C8-4415-91E4-CE99B680C9D7",
			"type": "PlaneBufferGeometry",
			"width": 1,
			"height": 1,
			"widthSegments": 1,
			"heightSegments": 1
		},
		{
			"uuid": "74C5327E-D5D4-4070-AC39-CED8888449EC",
			"type": "TubeBufferGeometry",
			"path": {
				"metadata": {
					"version": 4.5,
					"type": "Curve",
					"generator": "Curve.toJSON"
				},
				"arcLengthDivisions": 200,
				"type": "CatmullRomCurve3",
				"points": [[-2,-2,0.666667],[-2,2,2]],
				"closed": false,
				"curveType": "centripetal",
				"tension": 0.5
			},
			"tubularSegments": 64,
			"radius": 1,
			"radialSegments": 8,
			"closed": false
		},
		{
			"uuid": "C858DF47-D352-46F0-A471-1D45AA45DD60",
			"type": "SphereBufferGeometry",
			"radius": 1,
			"widthSegments": 8,
			"heightSegments": 6,
			"phiStart": 0,
			"phiLength": 6.283185,
			"thetaStart": 0,
			"thetaLength": 3.141593
		},
		{
			"uuid": "E8EDF181-7C83-4A64-86C4-ABC66C780194",
			"type": "SphereBufferGeometry",
			"radius": 1,
			"widthSegments": 10,
			"heightSegments": 10,
			"phiStart": 0,
			"phiLength": 6.283185,
			"thetaStart": 0,
			"thetaLength": 3.141593
		},
		{
			"uuid": "D9D25AC0-860B-4E98-980A-5F749518C5A6",
			"type": "CylinderBufferGeometry",
			"radiusTop": 0.3,
			"radiusBottom": 0.15,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "A23A7D94-DCEE-4C5A-B3B3-7C7758A3D081",
			"type": "SphereBufferGeometry",
			"radius": 1,
			"widthSegments": 8,
			"heightSegments": 6,
			"phiStart": 0,
			"phiLength": 6.283185,
			"thetaStart": 0,
			"thetaLength": 3.141593
		},
		{
			"uuid": "3D99F500-8AE9-4625-9F60-FE0A67EF899C",
			"type": "CylinderBufferGeometry",
			"radiusTop": 0.5,
			"radiusBottom": 0.3,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "4EE5B4FB-E7CB-4C54-AC8D-2339C4A4C20F",
			"type": "CylinderBufferGeometry",
			"radiusTop": 1,
			"radiusBottom": 1.3,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "9A231117-4644-47A4-8D4B-2B34A6577343",
			"type": "CylinderBufferGeometry",
			"radiusTop": 0.2,
			"radiusBottom": 0.35,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "F96A358A-3AF6-4CCE-ACF2-FD721A06EEB1",
			"type": "SphereBufferGeometry",
			"radius": 1,
			"widthSegments": 8,
			"heightSegments": 6,
			"phiStart": 0,
			"phiLength": 6.283185,
			"thetaStart": 0,
			"thetaLength": 3.141593
		},
		{
			"uuid": "7544D0C0-6F63-4AAF-BE64-93308BDE54DA",
			"type": "CylinderBufferGeometry",
			"radiusTop": 0.2,
			"radiusBottom": 0.15,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "1D89FE7F-7C2D-446A-97E6-D779E7F66A60",
			"type": "CylinderBufferGeometry",
			"radiusTop": 0.2,
			"radiusBottom": 0.15,
			"height": 1,
			"radialSegments": 8,
			"heightSegments": 1,
			"openEnded": false,
			"thetaStart": 0,
			"thetaLength": 6.283185
		},
		{
			"uuid": "4013FAB0-1646-4C76-B653-8A1D213BBDFA",
			"type": "OctahedronBufferGeometry",
			"radius": 1,
			"detail": 0
		}],
	"materials": [
		{
			"uuid": "9130EA7F-1D4E-4EC0-A21E-222E6FCC64D9",
			"type": "MeshStandardMaterial",
			"color": 9763071,
			"roughness": 1,
			"metalness": 0,
			"emissive": 39835,
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
			"uuid": "6339F7E0-8B18-4B41-B43F-563B2134476A",
			"type": "MeshStandardMaterial",
			"color": 9763071,
			"roughness": 1,
			"metalness": 0,
			"emissive": 39835,
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
			"uuid": "B0F64118-6028-427C-B880-2F3855990BEF",
			"type": "MeshStandardMaterial",
			"color": 5648139,
			"roughness": 1,
			"metalness": 0,
			"emissive": 2165507,
			"vertexColors": true,
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
			"uuid": "BADB8D2F-767B-41FE-8732-6CF548AEFA2F",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 7237230,
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
			"uuid": "6C881AEE-0939-49DA-AB9B-59E2CC47EDDE",
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
			"uuid": "3A864185-BBC6-42B8-8BC9-9AFB1B7169CD",
			"type": "MeshStandardMaterial",
			"color": 11298095,
			"roughness": 1,
			"metalness": 0,
			"emissive": 4991504,
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
			"uuid": "0D0B1AE0-6ED8-469C-A920-8208D203907D",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 16514816,
			"vertexColors": true,
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
			"uuid": "1582FE44-F97A-4DEF-8DE1-800D2A6FE677",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 16514816,
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
			"uuid": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 12105912,
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
			"uuid": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 16777215,
			"vertexColors": true,
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
			"uuid": "71F6C2D3-8FF7-4F81-87A3-9AB134BA6C2A",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 2165507,
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
			"uuid": "FE0FB379-0C7E-4967-8D49-DBB989F0A69B",
			"type": "MeshStandardMaterial",
			"color": 7486989,
			"roughness": 1,
			"metalness": 0,
			"emissive": 2165507,
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
			"uuid": "FFFFF5F6-37E6-486B-9392-91F77E6FE023",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 7237230,
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
			"uuid": "8398B8B2-BA10-442C-9CEC-19D0434888DE",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 7237230,
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
			"uuid": "893848EB-94FA-4754-9911-0C7214480F2C",
			"type": "MeshStandardMaterial",
			"color": 16777215,
			"roughness": 1,
			"metalness": 0,
			"emissive": 7237230,
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
			"uuid": "DFC04EEC-CAB4-415B-A337-33660E22023A",
			"type": "MeshStandardMaterial",
			"color": 9763071,
			"roughness": 1,
			"metalness": 0,
			"emissive": 39835,
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
			"uuid": "3AF1655E-B5FA-49B4-92AE-7083735A2D0E",
			"type": "MeshStandardMaterial",
			"color": 9763071,
			"roughness": 1,
			"metalness": 0,
			"emissive": 39835,
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
			"uuid": "FE0E8D98-7C93-4ADC-B486-675ED20423EB",
			"type": "MeshStandardMaterial",
			"color": 61183,
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
		"uuid": "7E5F4109-4CB6-4DAC-B5FB-7A7FAFF6AB8B",
		"type": "Group",
		"name": "GMan",
		"layers": 1,
		"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		"children": [
			{
				"uuid": "53EEEBC0-D11B-4FF3-8804-7C37C0161FA4",
				"type": "Group",
				"name": "GBody",
				"layers": 1,
				"matrix": [0.892023,0,0,0,0,0.799131,0,0,0,0,0.869701,0,0,3.781186,-0.020773,1],
				"children": [
					{
						"uuid": "7AF8E2CA-1761-449F-B489-0AAF58A12F9C",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.831891,0,0,0,0,0.974471,0,0,0,0,0.906021,0,0,-0.169,-0.052519,1],
						"geometry": "ED52BE38-1838-4D98-8AC7-2A65BAEAEEA0",
						"material": "9130EA7F-1D4E-4EC0-A21E-222E6FCC64D9"
					},
					{
						"uuid": "50047879-594C-453E-AB3A-F61278A49E10",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [0.851561,0,0,0,0,1.542347,0,0,0,0,0.912306,0,0,-1.161,-0.050683,1],
						"geometry": "9B997159-1D81-4A7B-A2D8-7733B2C4DB11",
						"material": "6339F7E0-8B18-4B41-B43F-563B2134476A"
					},
					{
						"uuid": "762F746C-CFDD-4964-B9C9-92D5A9F7D665",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,1.113,0,1],
						"geometry": "93C15289-F81A-43BC-9783-8AB9E21A2774",
						"material": "B0F64118-6028-427C-B880-2F3855990BEF"
					},
					{
						"uuid": "12EC16D3-0858-4CF8-8975-84EF3C0B5A89",
						"type": "Mesh",
						"name": "Cylinder",
						"layers": 1,
						"matrix": [1,0,0,0,0,0.753664,0,0,0,0,1,0,0,0.632,0,1],
						"geometry": "C18B30E1-E986-44D9-97FE-CB13CBAFEC2C",
						"material": "BADB8D2F-767B-41FE-8732-6CF548AEFA2F"
					},
					{
						"uuid": "77E03D07-ACF8-478F-A049-A938366219AC",
						"type": "Mesh",
						"name": "Octahedron",
						"layers": 1,
						"matrix": [-0.100135,-0.003028,-0.010775,0,-0.011194,0.33747,0.009199,0,-0.01503,-0.004339,0.1409,0,0.800995,-0.193,0,1],
						"geometry": "7123B0E0-030D-4302-96FF-9C69B44D28B1",
						"material": "6C881AEE-0939-49DA-AB9B-59E2CC47EDDE"
					}]
			},
			{
				"uuid": "13B5D6B1-FF28-4034-8470-49E7945E8399",
				"type": "Group",
				"name": "GHead",
				"layers": 1,
				"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,4.795518,0,1],
				"children": [
					{
						"uuid": "3E23DE73-95C1-4357-9732-E34F1ADF1B95",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.218946,0,0,0,0,0.921465,0,0,0,0,0.848012,0,0.630704,0.788,0,1],
						"geometry": "923BA4E5-63C0-4F12-9631-6C1CE3A4DD7F",
						"material": "3A864185-BBC6-42B8-8BC9-9AFB1B7169CD"
					},
					{
						"uuid": "B06E08AE-D6FA-4F6B-9702-C4C94E586385",
						"type": "Mesh",
						"name": "Circle",
						"layers": 1,
						"matrix": [0,0,-0.087655,0,0,0.083427,0,0,1,0,0,0,0.827384,0.586,-0.364436,1],
						"geometry": "07EE56C5-CE2D-4CB7-BE34-282DA341C04B",
						"material": "0D0B1AE0-6ED8-469C-A920-8208D203907D"
					},
					{
						"uuid": "3DCE1A6A-8435-45D5-BB78-F0C1E0F5EBE4",
						"type": "Mesh",
						"name": "Circle",
						"layers": 1,
						"matrix": [0,0,-0.089358,0,0,0.085912,0,0,1,0,0,0,0.832336,0.586,0.369813,1],
						"geometry": "07EE56C5-CE2D-4CB7-BE34-282DA341C04B",
						"material": "0D0B1AE0-6ED8-469C-A920-8208D203907D"
					},
					{
						"uuid": "2FA524E2-20B7-4805-AB23-39525E8B6AF8",
						"type": "Mesh",
						"name": "Plane",
						"layers": 1,
						"matrix": [-0.004501,0.095049,-0.095155,0,-0.004731,0.099911,0.100023,0,0.99888,0.0473,0.000002,0,0.842545,1.052,0,1],
						"geometry": "109BCAC4-A8C8-4415-91E4-CE99B680C9D7",
						"material": "1582FE44-F97A-4DEF-8DE1-800D2A6FE677"
					},
					{
						"uuid": "99CB743D-7BFE-468D-9518-C0FB79456CCB",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [0.009035,0.012231,0.156485,0,-0.048835,0.121877,-0.006706,0,0.059563,0.023576,-0.005282,0,0.804496,1.194,0.640303,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "44E081C1-D991-4C10-9027-4F196D5AD03E",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [0.012689,0.026723,0.513259,0,-0.012569,0.000167,0.000302,0,0.002257,0.187689,-0.009828,0,0.880156,1.186,1.056451,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "8BC9AD1D-2B58-4123-95B6-8D1402EB62B6",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [0.010095,-0.776757,0.127696,0,-0.012556,-0.000265,-0.000619,0,-0.008917,0.027669,0.169008,0,0.864838,-0.668,0.617592,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "0B4E51F2-BAB8-46A5-AD83-9EC067A130D1",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [0.004632,0.029215,0.513262,0,-0.012105,-0.003387,0.000302,0,-0.066976,0.238209,-0.012954,0,0.94165,1.199,1.031216,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "B882B9FC-4ACD-4A81-8A87-A8987D320526",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [-0.023509,0.017954,0.51326,0,-0.00277,-0.012261,0.000302,0,-0.184998,0.041549,-0.009927,0,0.422969,1.772,1.037061,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "142C1551-2A5B-4D6C-8BD2-8E38774FECE8",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [-0.019661,0.022102,0.513259,0,-0.005054,-0.011509,0.000302,0,-0.173701,0.076017,-0.009927,0,0.628634,1.702,1.037061,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "8CEF5120-2473-4018-893C-543DEF109A52",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [0.010095,-0.776757,0.127696,0,-0.012556,-0.000265,-0.000619,0,-0.008917,0.027669,0.169008,0,0.864838,-0.874,0.580731,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "9A1CAFDC-23EB-48FE-8C98-3F24AF91260D",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [-0.013042,0.02655,0.513259,0,-0.007945,-0.009741,0.000302,0,-0.147082,0.119655,-0.009927,0,0.80827,1.571,1.037061,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "7C778EB2-6A8E-46B3-A67A-52DCBEE141B0",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [-0.002943,0.029438,0.513254,0,-0.010849,-0.006349,0.000302,0,-0.125248,0.213402,-0.012958,0,0.948966,1.297,1.031216,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "69A19D10-438A-4679-9928-F4252C761C4A",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [0.007979,-0.01619,0.137691,0,-0.048836,0.120866,0.017042,0,0.059563,0.024153,-0.000612,0,0.781218,1.149,-0.021961,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "2288AE3B-85DF-4D00-8B6D-069DD4E12477",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [0.017897,0.779042,0.111952,0,-0.01257,0.000298,-0.000064,0,0.001441,0.02436,-0.169745,0,0.864142,2.412,-0.080973,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "827FEA41-774E-47B8-95EF-2833D6D28AE0",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [0.008306,-0.004981,0.144204,0,-0.048836,0.121859,0.007022,0,0.059563,0.02402,-0.002601,0,0.781218,1.155,0.290033,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "F0F0239B-A2DC-4349-A734-9CA6808D012F",
						"type": "Mesh",
						"name": "Tube",
						"layers": 1,
						"matrix": [0.017897,0.779042,0.111952,0,-0.01257,0.000298,-0.000064,0,0.001441,0.02436,-0.169745,0,0.864142,2.226,-0.074126,1],
						"geometry": "74C5327E-D5D4-4070-AC39-CED8888449EC",
						"material": "EF2FBF13-DF6A-4D41-9A58-747F613DEE8E"
					},
					{
						"uuid": "E8392BE0-1E27-40BC-900A-C734E2B4C0F9",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.88363,0,0,0,0,1,0,0,0,0,0.878383,0,-0.112013,0.973,0.089883,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "611670A2-8574-45C9-85C5-5EA89FD19AAE",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.752124,0.016352,0.16317,0,0,0.951103,-0.095315,0,-0.116411,0.05324,0.531254,0,0.076561,0.924,0.419735,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "75D4E8C2-22C5-4644-896A-E9A390C3A82F",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.979371,0,0,0,0,0.907538,0,0,0,0,0.814762,0,-0.112013,1.11,-0.017707,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "5D5789DC-C8A8-426D-AF12-4B8966CA28D7",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.088862,-0.00476,-0.002331,0,0.008489,0.178956,-0.041855,0,0.005663,0.033993,0.14649,0,-0.56722,-0.714,1.158561,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "A3ED7000-5779-4F9E-B191-4A06AF4B084F",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.088862,-0.00476,-0.002331,0,0.008489,0.178956,-0.041855,0,0.005663,0.033993,0.14649,0,-0.56722,-0.489,0.998446,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "AD526E28-F324-4FF2-92F2-2D935F7979D1",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.088862,-0.00476,-0.002331,0,0.008489,0.178956,-0.041855,0,0.005663,0.033993,0.14649,0,-0.56722,-0.237,0.825274,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "A4BD2F5E-386A-4B54-8AE2-894F84FECE59",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.088862,-0.00476,-0.002331,0,0.008489,0.178956,-0.041855,0,0.005663,0.033993,0.14649,0,-0.56722,0.059,0.685151,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "E90269DB-862D-42F1-A7C9-EF9E1A00FE62",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.074217,-0.002098,-0.003898,0,0.008489,0.169844,0.070215,0,0.005663,-0.057694,0.138874,0,-0.56722,-0.774,-1.217917,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "F3B2A456-5B71-4AE5-8C64-EDD51950823C",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.074217,-0.002098,-0.003898,0,0.008489,0.169844,0.070215,0,0.005663,-0.057694,0.138874,0,-0.56722,-0.516,-1.024855,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "F3F3FB89-FE1C-4D39-8CD0-37B661675B3F",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.08385,-0.00237,-0.004404,0,0.008489,0.169844,0.070215,0,0.005663,-0.057694,0.138874,0,-0.56722,-0.247,-0.850572,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "DCF63E78-0CA8-4C6D-803F-A8956D21A54F",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.088862,-0.003449,-0.004024,0,0.008488,0.180912,0.032371,0,0.005663,-0.026745,0.147985,0,-0.56722,0.059,-0.740406,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "B971EB40-6C9F-40DC-9406-3696B5CA8710",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.88363,0,0,0,0,1,0,0,0,0,0.964961,0,-0.355374,0.872,-0.01223,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "58695C65-2CF3-4C87-8282-A89EB3AEAD40",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.768429,-0.029829,-0.034799,0,0.044102,0.939921,0.168183,0,0.020565,-0.097117,0.537366,0,0.076184,0.966,-0.44686,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "DD0D315D-CC99-48C9-B56F-730EFBA2C0B9",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.177599,0,0.038722,0,0,0.332267,0,0,-0.159753,0,0.732709,0,0.576282,1.545,0.071989,1],
						"geometry": "C858DF47-D352-46F0-A471-1D45AA45DD60",
						"material": "A4BF33F7-1A12-449A-94AD-EEC71CFD23D3"
					},
					{
						"uuid": "997ECAD6-DF1B-4E13-AC65-9D133D5C7A1E",
						"type": "Mesh",
						"name": "Sphere",
						"layers": 1,
						"matrix": [0.796408,0,0,0,0,0.968701,0,0,0,0,0.911955,0,0,0.788,0,1],
						"geometry": "E8EDF181-7C83-4A64-86C4-ABC66C780194",
						"material": "71F6C2D3-8FF7-4F81-87A3-9AB134BA6C2A"
					}]
			},
			{
				"uuid": "747D8F37-4227-4926-98B3-FBDD126C90F2",
				"type": "Group",
				"name": "Gfeet",
				"layers": 1,
				"matrix": [1,0,0,0,0,0.57538,0,0,0,0,0.808488,0,0,0,-0.032895,1],
				"children": [
					{
						"uuid": "CB7E2A1B-34ED-4E18-916C-2C4BC684D230",
						"type": "Group",
						"name": "GLF",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,3.5,0.5,1],
						"children": [
							{
								"uuid": "BF1E8C7D-CD8F-4600-A82D-ECC90191CA49",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,2.376131,0.06977,0,0,-0.02935,0.999569,0,0,-2.2,-0.035,1],
								"geometry": "D9D25AC0-860B-4E98-980A-5F749518C5A6",
								"material": "FE0FB379-0C7E-4967-8D49-DBB989F0A69B"
							},
							{
								"uuid": "18930458-1E22-4074-9092-CF049D36863E",
								"type": "Mesh",
								"name": "Sphere",
								"layers": 1,
								"matrix": [0.823911,0.00058,-0.000102,0,-0.000634,0.873273,-0.153133,0,0,0.118988,0.678556,0,0,-1.048,-0.05,1],
								"geometry": "A23A7D94-DCEE-4C5A-B3B3-7C7758A3D081",
								"material": "FFFFF5F6-37E6-486B-9392-91F77E6FE023"
							},
							{
								"uuid": "C462DE6C-BC18-4CEC-960B-2E6B41E15727",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,-1.556,-0.017,1],
								"geometry": "3D99F500-8AE9-4625-9F60-FE0A67EF899C",
								"material": "8398B8B2-BA10-442C-9CEC-19D0434888DE"
							},
							{
								"uuid": "BE424E01-F752-4C56-8C28-0C71FD64C958",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [0.671528,0,0,0,0,1.462697,-0.108542,0,0,0.037382,0.503757,0,-0.021075,-0.223,-0.092,1],
								"geometry": "4EE5B4FB-E7CB-4C54-AC8D-2339C4A4C20F",
								"material": "893848EB-94FA-4754-9911-0C7214480F2C"
							}]
					},
					{
						"uuid": "0D7E077D-58FB-43E1-91AD-6C35AD6A2683",
						"type": "Group",
						"name": "GRF",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,3.5,-0.5,1],
						"children": [
							{
								"uuid": "683B5867-DE62-4821-8A8B-35A3CA375167",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [0.671528,0,0,0,0,1.650264,0.108556,0,0,-0.033157,0.504053,0,-0.021075,-0.039,0.053,1],
								"geometry": "4EE5B4FB-E7CB-4C54-AC8D-2339C4A4C20F",
								"material": "893848EB-94FA-4754-9911-0C7214480F2C"
							},
							{
								"uuid": "D40658AD-6C7A-4844-9D03-9A4688E67D46",
								"type": "Mesh",
								"name": "Sphere",
								"layers": 1,
								"matrix": [0.85388,0.000583,0.000181,0,-0.000634,0.846874,0.262413,0,0,-0.203902,0.658043,0,0,-1.023,0,1],
								"geometry": "A23A7D94-DCEE-4C5A-B3B3-7C7758A3D081",
								"material": "FFFFF5F6-37E6-486B-9392-91F77E6FE023"
							},
							{
								"uuid": "A7243F2E-2CB3-4345-89DB-3BAE64813959",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,0.998461,-0.05545,0,0,0.05545,0.998461,0,0,-1.536,-0.05,1],
								"geometry": "3D99F500-8AE9-4625-9F60-FE0A67EF899C",
								"material": "8398B8B2-BA10-442C-9CEC-19D0434888DE"
							},
							{
								"uuid": "69675A16-8B3A-4588-8AC7-845B515CCBFA",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,2.376905,-0.034453,0,0,0.014493,0.999895,0,0,-2.203,-0.03,1],
								"geometry": "D9D25AC0-860B-4E98-980A-5F749518C5A6",
								"material": "FE0FB379-0C7E-4967-8D49-DBB989F0A69B"
							}]
					}]
			},
			{
				"uuid": "3C61C5B1-E806-4237-B18B-2F7EEBFB14BF",
				"type": "Group",
				"name": "Ghand",
				"layers": 1,
				"matrix": [1,0,0,0,0,0.692296,0,0,0,0,0.894968,0,0,-0.397432,0,1],
				"children": [
					{
						"uuid": "3BBF423B-8DB9-41A7-8C77-E5C1373138FA",
						"type": "Group",
						"name": "GRight",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,6.5,-0.5,1],
						"children": [
							{
								"uuid": "055FC65D-3DAD-4607-B441-9CE09EAEAEA8",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,1.521524,0.336379,0,0,-0.215868,0.976423,0,0,-1.164,-0.749,1],
								"geometry": "9A231117-4644-47A4-8D4B-2B34A6577343",
								"material": "DFC04EEC-CAB4-415B-A337-33660E22023A"
							},
							{
								"uuid": "7A96D14C-F7D3-4031-B783-1706203C4E27",
								"type": "Mesh",
								"name": "Sphere",
								"layers": 1,
								"matrix": [0.214663,0,0,0,0,0.584108,0.185362,0,0,-0.084315,0.265691,0,0,-0.481,-0.561,1],
								"geometry": "F96A358A-3AF6-4CCE-ACF2-FD721A06EEB1",
								"material": "3AF1655E-B5FA-49B4-92AE-7083735A2D0E"
							},
							{
								"uuid": "A55A0A81-66D0-4F92-8D3D-58D594B95A8D",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,2.337219,0.433904,0,0,-0.182531,0.9832,0,0,-2.02,-0.875,1],
								"geometry": "7544D0C0-6F63-4AAF-BE64-93308BDE54DA",
								"material": "FE0FB379-0C7E-4967-8D49-DBB989F0A69B"
							}]
					},
					{
						"uuid": "A36DE7F0-BA40-44BC-A222-F95D341213FB",
						"type": "Group",
						"name": "GLeft",
						"layers": 1,
						"matrix": [0.99622,0.086865,0,0,-0.086865,0.99622,0,0,0,0,1,0,0,6.5,0.5,1],
						"children": [
							{
								"uuid": "FC9FCC73-05C8-4A7E-8A0B-4B8886EF9F35",
								"type": "Mesh",
								"name": "Sphere",
								"layers": 1,
								"matrix": [0.214663,0,0,0,0,0.576885,-0.206749,0,0,0.094043,0.262406,0,0,-0.481,0.358,1],
								"geometry": "F96A358A-3AF6-4CCE-ACF2-FD721A06EEB1",
								"material": "3AF1655E-B5FA-49B4-92AE-7083735A2D0E"
							},
							{
								"uuid": "84F6571E-57A3-4E88-8298-9AF7ADA1C1A8",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [1,0,0,0,0,1.513556,-0.370586,0,0,0.23782,0.971309,0,0,-1.131,0.592,1],
								"geometry": "9A231117-4644-47A4-8D4B-2B34A6577343",
								"material": "DFC04EEC-CAB4-415B-A337-33660E22023A"
							},
							{
								"uuid": "7CEC3A2D-C1B0-43AF-B353-885BBE1A71AB",
								"type": "Mesh",
								"name": "Cylinder",
								"layers": 1,
								"matrix": [0.999788,0.020265,0.003528,0,-0.035797,1.833124,-0.384966,0,-0.007616,0.205374,0.978654,0,-0.021752,-2.26247,0.757,1],
								"geometry": "1D89FE7F-7C2D-446A-97E6-D779E7F66A60",
								"material": "FE0FB379-0C7E-4967-8D49-DBB989F0A69B"
							}]
					}]
			},
			{
				"uuid": "1F19D84E-7943-4C4C-A8DE-4A76E2F6F24B",
				"type": "Group",
				"name": "Gwing",
				"layers": 1,
				"matrix": [0.979624,-0.200842,0,0,0.200842,0.979624,0,0,0,0,1,0,-1.739056,-2.592366,0,1],
				"children": [
					{
						"uuid": "9F0839BB-1238-4E39-9C61-F52C064FCD96",
						"type": "Group",
						"name": "GLeftWing",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,6.5,0.5,1],
						"children": [
							{
								"uuid": "A2307C1A-618D-4B2C-9751-589A0838AEB2",
								"type": "Mesh",
								"name": "Octahedron",
								"layers": 1,
								"matrix": [0.095298,-0.637475,-0.764555,0,-0.360514,-2.084223,1.692859,0,0.11485,-0.004912,0.018411,0,-0.713044,-1.32,1.676,1],
								"geometry": "4013FAB0-1646-4C76-B653-8A1D213BBDFA",
								"material": "FE0E8D98-7C93-4ADC-B486-675ED20423EB"
							},
							{
								"uuid": "3037626C-EFE7-4207-A74A-6A788DACAF38",
								"type": "Mesh",
								"name": "Octahedron",
								"layers": 1,
								"matrix": [0.095301,-0.389301,-0.916169,0,-0.360507,-2.484545,1.018238,0,0.11485,-0.010023,0.016206,0,-0.713044,-1.844,1.14,1],
								"geometry": "4013FAB0-1646-4C76-B653-8A1D213BBDFA",
								"material": "FE0E8D98-7C93-4ADC-B486-675ED20423EB"
							},
							{
								"uuid": "4FB9BF76-6124-4719-9910-0D037427B7A0",
								"type": "Mesh",
								"name": "Octahedron",
								"layers": 1,
								"matrix": [0.022518,-0.217745,-0.088962,0,-0.093813,-0.272555,0.643366,0,0.11485,0.004292,0.018565,0,-1.098069,-3.855,4.154,1],
								"geometry": "4013FAB0-1646-4C76-B653-8A1D213BBDFA",
								"material": "FE0E8D98-7C93-4ADC-B486-675ED20423EB"
							},
							{
								"uuid": "EED63F6E-FAD3-4556-A05A-54DA9C52C4C2",
								"type": "Mesh",
								"name": "Octahedron",
								"layers": 1,
								"matrix": [0.027523,-0.126728,-0.254663,0,-0.11339,-0.745257,0.358608,0,0.114795,-0.009275,0.017022,0,-1.098069,-5.346,2.572,1],
								"geometry": "4013FAB0-1646-4C76-B653-8A1D213BBDFA",
								"material": "FE0E8D98-7C93-4ADC-B486-675ED20423EB"
							}]
					},
					{
						"uuid": "610ED98A-F09C-4164-A9D1-B01A728EBB47",
						"type": "Group",
						"name": "GRightWing",
						"layers": 1,
						"matrix": [1,0,0,0,0,1,0,0,0,0,1,0,0,6.5,-0.5,1],
						"children": [
							{
								"uuid": "D7748955-A83B-4F6B-A778-D34DA8A1C4F2",
								"type": "Mesh",
								"name": "Octahedron",
								"layers": 1,
								"matrix": [0.0953,0.606999,-0.788966,0,-0.360507,-2.106918,-1.664524,0,0.11485,-0.019039,-0.000775,0,-0.713044,-1.455,-2.003,1],
								"geometry": "4013FAB0-1646-4C76-B653-8A1D213BBDFA",
								"material": "FE0E8D98-7C93-4ADC-B486-675ED20423EB"
							},
							{
								"uuid": "628E3784-B94C-4032-8484-8CB42F82BF9E",
								"type": "Mesh",
								"name": "Octahedron",
								"layers": 1,
								"matrix": [0.095296,0.300172,-0.949113,0,-0.360515,-2.549495,-0.842516,0,0.11485,-0.018154,0.00579,0,-0.714599,-1.866,-1.147,1],
								"geometry": "4013FAB0-1646-4C76-B653-8A1D213BBDFA",
								"material": "FE0E8D98-7C93-4ADC-B486-675ED20423EB"
							},
							{
								"uuid": "750C6929-9AB9-4119-A417-81E29C727BB5",
								"type": "Mesh",
								"name": "Octahedron",
								"layers": 1,
								"matrix": [0.022518,0.204333,-0.116512,0,-0.093811,-0.338271,-0.611372,0,0.11485,-0.01726,-0.008073,0,-1.098069,-3.927,-4.353,1],
								"geometry": "4013FAB0-1646-4C76-B653-8A1D213BBDFA",
								"material": "FE0E8D98-7C93-4ADC-B486-675ED20423EB"
							},
							{
								"uuid": "D9A9E753-23F0-4D4F-B193-01A453385AC1",
								"type": "Mesh",
								"name": "Octahedron",
								"layers": 1,
								"matrix": [0.027524,0.12595,-0.255048,0,-0.113388,-0.736632,-0.376006,0,0.114795,-0.019163,0.002925,0,-1.098069,-5.455,-2.503,1],
								"geometry": "4013FAB0-1646-4C76-B653-8A1D213BBDFA",
								"material": "FE0E8D98-7C93-4ADC-B486-675ED20423EB"
							}]
					}]
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
