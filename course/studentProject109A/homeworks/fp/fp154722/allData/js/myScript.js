'use strict'; //嚴格模式
var fps = 60; //動畫fps
var log = console.log; //簡化log

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//


//A.宣告全域變數
var ball
var ballarray = [];
var gdarrayL = [];
var gdarrayR = [];
var gdarrayM = [];
var nn = 2
var dt = 0.1
var tt = 1
var aa = 1
var rr = 5
var k = 10
var mm = 5
var dt2 = 0.1
var gd1
var gd2
var gd3
var gd4
var gd5
var gd6
var player
var gamemode=0
var atk=0
var target
var target2
var spd=1
var theta=0
var omega=0.5
var grade
var grade2
var win
var lose
    //B.定義init
function init() {
    for (var i = 0; i < nn; i++) {
        ball = new TEACHER.ObjSphere(1, 0xff0000)
        scene.add(ball)
        ballarray.push(ball)
        ball.position.y=0
        
    
        
        
    }
    player = new TEACHER.ObjSphere(3, 0xffff00)
    target = new TEACHER.ObjSphere(2,0xffffff)
    target2 = new TEACHER.ObjSphere(2,0x0000ff)
    grade = new TEACHER.ObjTextPlane(40,10,'血量/分數','z',0xffffff)
    grade2 = new TEACHER.ObjTextPlane(20,10,k,'z',0xffffff)
    win = new TEACHER.ObjTextPlane(100,10,'you win !','z',0xffff00)
    lose = new TEACHER.ObjTextPlane(100,10,'you lose...','z',0xff0000)
    scene.add(player,target,target2,grade,grade2,win,lose)
    player.position.y=4
    target.position.y=5
    target.position.z=-50
    target.position.x=-30
    target.visible=false
    target2.position.y=5
    target2.position.z=-50
    target2.position.x=0
    target2.visible=false
    grade.position.y=grade2.position.y=20
    grade.position.z=grade2.position.z=-50
    grade.position.x=-20
    grade2.position.x=10
    win.visible=false
    lose.visible=false
    win.position.y=lose.position.y=30
    win.position.z=lose.position.z=-50
    win.position.x=lose.position.x=0
    ball.vx = 0
    ball.vy = 0
    ball.vz = 3

    ball.ax = 0
    ball.ay = 0
    ball.az = 0

    ball.v = 0

    ground.visible = skyBox.visible = false

    world2D.btnLeft.on('click', clickbtn)
    world2D.btnRight.on('click', clickbtn)
    world2D.btn01.on('click', clickbtn)
    world2D.btn02.on('click', clickbtn)
    world2D.sl01.maximum=2
    world2D.sl01.minimum=0.5
    world2D.sl01.value=1
    world2D.btn01.setLabel('開始/繼續')
    world2D.btn02.setLabel('重制血量/分數')
    world2D.sl01.setLabel('速度/難度')
    world2D.sl02.visible=false
    world2D.sl03.visible=false
    world2D.btnUp.visible=false
    world2D.btnDown.visible=false
    world2D.ch01.visible=false
    world2D.ch02.visible=false
    world2D.btn02.visible=false

    for (var q = 0; q < 35; q++) {
        gd1 = new TEACHER.ObjCylinder(1, 2, 0x99ff00, false, 'z')
        gd2 = new TEACHER.ObjCylinder(1, 2, 0xff00ff, false, 'z')
        gd3 = new TEACHER.ObjCylinder(1, 2, 0x99ff00, false, 'z')
        gd4 = new TEACHER.ObjCylinder(1, 2, 0xff00ff, false, 'z')
        gd5 = new TEACHER.ObjCylinder(1, 2, 0x99ff00, false, 'z')
        gd6 = new TEACHER.ObjCylinder(1, 2, 0xff00ff, false, 'z')
        gd1.position.z = 50 - q * 4
        gd1.position.x = -30

        gd2.position.z = 48 - q * 4
        gd2.position.x = -30

        gd3.position.z = 50 - q * 4
        gd3.position.x = 30

        gd4.position.z = 48 - q * 4
        gd4.position.x = 30
        
        gd5.position.z = 50 - q * 4
        gd5.position.x = 0

        gd6.position.z = 48 - q * 4
        gd6.position.x = 0
        
        scene.add(gd1, gd2, gd3, gd4, gd5, gd6)
        gdarrayL.push(gd1, gd2)
        gdarrayR.push(gd3, gd4)
        gdarrayM.push(gd5,gd6)
    }


    setInterval(tick, 1000 / fps);
}




function clickbtn(e) {
    var str = e.target.parent.name
    if (str === 'btnLeft' && player.position.x>-26) {
        player.position.x-=30
        gamemode=3
        for (var i = 0; i < nn; i++) {

            var b1 = ballarray[i]
            b1.position.x-=30
        }
    } else if (str === 'btnRight' && player.position.x<26) {
        player.position.x+=30
        gamemode=4
        for (var i = 0; i < nn; i++) {

            var b1 = ballarray[i]
            b1.position.x+=30
        }
    } else if (str === 'btn01'){
        gamemode=1
    } else if (str === 'btn02') {
        gamemode=2
    }


}

//C.定義tick                                                                                                                       
function tick() {
    tt += dt
    spd=world2D.sl01.value
    theta+=omega*dt
    grade2.setText(k)
   
    for (var i = 0; i < nn; i++) {
    var b1 = ballarray[i]
    b1.position.y=5
    }   
    
    if (gamemode===1) {
    if (k===0) {
        k+=10
    } else if (k===20) {
        k-=10
    }

        win.visible=false
        lose.visible=false
        ballarray[0].position.x+=rr*Math.cos(theta)/25
        ballarray[0].position.z+=rr*Math.sin(theta)/25
        ballarray[1].position.x+=-rr*Math.cos(theta)/25
        ballarray[1].position.z+=-rr*Math.sin(theta)/25
        target.visible=true
        target.position.z+=spd
        target2.visible=true
        target2.position.z+=spd
        for (var q = 0; q < 70; q++) {
            var gdL = gdarrayL[q];
            var gdR = gdarrayR[q];
            var gdM = gdarrayM[q];
    
            gdL.position.z += spd
            gdR.position.z += spd
            gdM.position.z += spd
    
            if (gdL.position.z > 70) {
                gdL.position.z = -70
            } else if (gdR.position.z > 70) {
                gdR.position.z = -70
            }else if (gdM.position.z > 70) {
                gdM.position.z = -70
        }
    if (target.position.z>70) {
        target.position.z=-70
        target.position.x=30
        target.visible=true
       

    }
    }if (target2.position.z>70) {
        target2.position.z=-70
        target2.position.x=0
        target2.visible=true
       

    }
    if (target.position.x===player.position.x && target.position.z===player.position.z) {
        k+=1
        target.visible=false
        gamemode=3
    } else if (target2.position.x===player.position.x && target2.position.z===player.position.z) {
        k-=1
        gamemode=1
        target2.visible=false

    }
}
if (gamemode===3) {
    win.visible=false
    lose.visible=false
    ballarray[0].position.x+=rr*Math.cos(theta)/25
    ballarray[0].position.z+=rr*Math.sin(theta)/25
    ballarray[1].position.x+=-rr*Math.cos(theta)/25
    ballarray[1].position.z+=-rr*Math.sin(theta)/25
    target.visible=true
    target.position.z+=spd
    target2.visible=true
    target2.position.z+=spd
    for (var q = 0; q < 70; q++) {
        var gdL = gdarrayL[q];
        var gdR = gdarrayR[q];
        var gdM = gdarrayM[q];

        gdL.position.z += spd
        gdR.position.z += spd
        gdM.position.z += spd

        if (gdL.position.z > 70) {
            gdL.position.z = -70
        } else if (gdR.position.z > 70) {
            gdR.position.z = -70
        }else if (gdM.position.z > 70) {
            gdM.position.z = -70
    }
if (target.position.z>70) {
    target.position.z=-70
    target.position.x=0
    target.visible=true
}if (target2.position.z>70) {
    target2.position.z=-70
    target2.position.x=-30
    target2.visible=true
   

}
}
if (target.position.x===player.position.x && target.position.z===player.position.z) {
    k+=1
    target.visible=false
    gamemode=4
} else if (target2.position.x===player.position.x && target2.position.z===player.position.z) {
    k-=1
    gamemode=1
    target2.visible=false
}
}
if (gamemode===4) {
    win.visible=false
    lose.visible=false
    ballarray[0].position.x+=rr*Math.cos(theta)/25
    ballarray[0].position.z+=rr*Math.sin(theta)/25
    ballarray[1].position.x+=-rr*Math.cos(theta)/25
    ballarray[1].position.z+=-rr*Math.sin(theta)/25
    target.visible=true
    target.position.z+=spd
    target2.visible=true
    target2.position.z+=spd
    for (var q = 0; q < 70; q++) {
        var gdL = gdarrayL[q];
        var gdR = gdarrayR[q];
        var gdM = gdarrayM[q];

        gdL.position.z += spd
        gdR.position.z += spd
        gdM.position.z += spd
        if (gdL.position.z > 70) {
            gdL.position.z = -70
        } else if (gdR.position.z > 70) {
            gdR.position.z = -70
        }else if (gdM.position.z > 70) {
            gdM.position.z = -70
    }
if (target.position.z>70) {
    target.position.z=-70
    target.position.x=-30
    target.visible=true

}if (target2.position.z>70) {
    target2.position.z=-70
    target2.position.x=30
    target2.visible=true

}
}
if (target.position.x===player.position.x && target.position.z===player.position.z) {
    k+=1
    target.visible=false
    gamemode=1
} else if (target2.position.x===player.position.x && target2.position.z===player.position.z) {
    k-=1
    gamemode=1
    target2.visible=false
}
}
if (k===0) {
    gamemode=5
    lose.visible=true
} else if (k===20) {
    win.visible=true
    gamemode=5
} else if (gamemode===2 && k===0) {
    k+=10
} else if (gamemode===2 && k===20) {
    k-=10
}
    
    //target.position.z===ballarray[0].position.z-3 && target.position.x===ballarray[0].position.x-3
    /*function collision(ballA,ballB,dis){
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
            
        }
    
        return isCollision;
    }
    */
    

        //var zz=aa*Math.sin(2*Math.PI*b1.position.z/ld - 2*Math.PI*tt/pr)

        //b1.position.z=zz+10
        /*b1.a = -k / mm * b1.position.z
        b1.v += b1.a * dt2
        b1.position.z += ball.v * dt2*/


        /*if (ballarray[0].position.x > 50 && ball.vx > 0) {
            ball.vx *= -1 * ratio
        } else if (ballarray[0].position.x < -50 && ball.vx < 0) {
            ball.vx *= -1 * ratio
        }
        if (ballarray[0].position.z > 50 && ball.vz > 0) {
            ball.vz *= -1 * ratio
        } else if (ballarray[0].position.z < -50 && ball.vz < 0) {
            ball.vz *= -1 * ratio
        }
        ratio = 1*/


    



    
    //3D
    world3D.render();
    //2D
    world2D.stage.update();
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
var TEACHER = {};
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
TEACHER.ObjPlane = function(_w, _h, _color, _dir, _side) {
    let t = this;
    t.mat = new TEACHER.MSMat(_color, _side);
    t.geo = new THREE.PlaneGeometry(_w || 10, _h || 10, 1, 1);
    t.mesh = new THREE.Mesh(t.geo, t.mat);
    if (_dir === "x") {
        t.mesh.rotation.y = 0.5 * Math.PI;
    } else if (_dir === "y") {
        t.mesh.rotation.x = -0.5 * Math.PI;
    }
    THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjCylinder = function(_r, _h, _color, _openEnd, _dir, _side) {
    let t = this;
    t.mat = new TEACHER.MSMat(_color, _side);
    t.geo = new THREE.CylinderGeometry(_r || 10, _r || 10, _h || 10, 32, 2, _openEnd);
    t.mesh = new THREE.Mesh(t.geo, t.mat);
    if (_dir === "x") {
        t.mesh.rotation.z = -0.5 * Math.PI;
    } else if (_dir === "z") {
        t.mesh.rotation.x = 0.5 * Math.PI;
    }
    THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjSphere = function(_r, _color, _side) {
    let t = this;
    t.mat = new TEACHER.MSMat(_color, _side);
    t.geo = new THREE.SphereGeometry(_r || 10, 32, 16);
    t.mesh = new THREE.Mesh(t.geo, t.mat);
    THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjBox = function(_w, _h, _d, _color, _side) {
    let t = this;
    t.mat = new TEACHER.MSMat(_color, _side);
    t.geo = new THREE.BoxGeometry(_w || 10, _h || 10, _d || 10);
    t.mesh = new THREE.Mesh(t.geo, t.mat);
    THREE.Object3D.call(this, t.geo, t.mat);
    t.add(t.mesh);
}
TEACHER.ObjBox.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjBox.prototype.constructor = TEACHER.ObjBox;
//---------------------------------------------
//老師的MSMat，繼承自 THREE.MeshStandardMaterial
TEACHER.MSMat = function(_color, _side) {
    THREE.MeshStandardMaterial.call(this, { color: _color || 0xFF00FF, roughness: 0.4, side: _side || 0 });
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
TEACHER.ObjPicPlane = function(_w, _h, _pic, _dir, _side) {
    let t = this;
    let texture = new THREE.TextureLoader().load(_pic);
    t.mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: _side || 0 });
    t.geo = new THREE.PlaneGeometry(_w, _h, 1, 1);
    t.mesh = new THREE.Mesh(t.geo, t.mat);
    if (_dir === "x") {
        t.mesh.rotation.y = 0.5 * Math.PI;
    } else if (_dir === "y") {
        t.mesh.rotation.x = -0.5 * Math.PI;
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
TEACHER.ObjPicCylinder = function(_r, _h, _pic, _openEnd, _dir, _side) {
    let t = this;
    let texture = new THREE.TextureLoader().load(_pic);
    t.mat = new THREE.MeshBasicMaterial({ map: texture, side: _side || 0 });
    t.geo = new THREE.CylinderGeometry(_r || 10, _r || 10, _h || 10, 32, 4, _openEnd);
    t.mesh = new THREE.Mesh(t.geo, t.mat);
    if (_dir === "x") {
        t.mesh.rotation.z = -0.5 * Math.PI;
    } else if (_dir === "z") {
        t.mesh.rotation.y = 0.5 * Math.PI;
        t.mesh.rotation.x = 0.5 * Math.PI;
    } else if (_dir === "y") {
        t.mesh.rotation.y = 0.5 * Math.PI;
    }
    THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjPicSphere = function(_r, _pic, _side) {
    let t = this;
    let texture = new THREE.TextureLoader().load(_pic);
    t.mat = new THREE.MeshBasicMaterial({ map: texture, side: _side || 0 });
    t.geo = new THREE.SphereGeometry(_r || 10, 32, 16);
    t.mesh = new THREE.Mesh(t.geo, t.mat);
    THREE.Object3D.call(this, t.geo, t.mat);
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
TEACHER.ObjArrow = function(_r, _color) {
    let ratioHead = 0.4; //頭佔全長
    let ratioBody = 0.5; //身寬佔全長
    let material = new THREE.MeshStandardMaterial({ color: _color || 0xFF00FF, roughness: 0.4 });
    let geometry = new THREE.ConeGeometry(_r || 10, 100 * ratioHead, 32);
    this.ArrowHead = new THREE.Mesh(geometry, material);
    this.ArrowHead.position.y = 100 * (1 - 0.5 * ratioHead);
    geometry = new THREE.CylinderGeometry((_r || 10) * ratioBody, (_r || 10) * ratioBody, 100 * (1 - ratioHead), 32, 2);
    this.ArrowBody = new THREE.Mesh(geometry, material);
    this.ArrowBody.position.y = 100 * 0.5 * (1 - ratioHead);
    THREE.Object3D.call(this);
    this.rotX = new THREE.Object3D(); //in rotation.x for theta
    this.rotY = new THREE.Object3D(); //out rotation.y for phi
    this.add(this.rotY);
    this.rotY.add(this.rotX);
    this.rotX.add(this.ArrowBody);
    this.rotX.add(this.ArrowHead);
}
TEACHER.ObjArrow.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjArrow.prototype.constructor = TEACHER.ObjArrow;
TEACHER.ObjArrow.prototype.setArrow = function(_x, _y, _z) {
        let len2 = _x * _x + _y * _y + _z * _z;
        let len = Math.sqrt(len2);
        if (len2 > 0) {
            this.rotX.visible = true;
            this.rotX.scale.y = len / 100;
        } else {
            this.rotX.visible = false;
        }
        this.rotX.rotation.x = Math.acos(_y / len);
        this.rotY.rotation.y = Math.atan2(_x, _z);
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
TEACHER.ObjSpring = function(_len, _rB, _rS, _nn, _color) {
    //curve
    let dd = _len || 20;
    this.L0 = dd;
    let arr = [];
    let nn = _nn || 5;
    let rB = _rB || 5;
    let rS = _rS || 0.5;
    arr.push(new THREE.Vector3(0, 0, 0));
    arr.push(new THREE.Vector3(0, dd * 0.05, 0));
    for (var i = 0; i <= nn * 16; i++) {
        arr.push(new THREE.Vector3(rB * Math.cos(i * 2 * Math.PI / 16), dd * (0.05 + 0.9 * i / nn / 16), rB * Math.sin(i * 2 * Math.PI / 16)));
    }
    arr.push(new THREE.Vector3(0, dd * 0.95, 0));
    arr.push(new THREE.Vector3(0, dd, 0));

    let myClosedSpline = new THREE.CatmullRomCurve3(arr);
    let material = new THREE.MeshStandardMaterial({ color: _color || 0xFF00FF, roughness: 0.4 });
    let geometry = new THREE.TubeGeometry(myClosedSpline, 500, rS, 12);
    this.mesh = new THREE.Mesh(geometry, material);
    THREE.Object3D.call(this);
    this.rotX = new THREE.Object3D(); //in rotation.x for theta
    this.rotY = new THREE.Object3D(); //out rotation.y for phi
    this.add(this.rotY);
    this.rotY.add(this.rotX);
    this.rotX.add(this.mesh);
}
TEACHER.ObjSpring.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjSpring.prototype.constructor = TEACHER.ObjSpring;
TEACHER.ObjSpring.prototype.setSpring = function(_x, _y, _z) {
        let len2 = _x * _x + _y * _y + _z * _z;
        let len = Math.sqrt(len2);
        if (len2 > 0) {
            this.rotX.visible = true;
            this.rotX.scale.y = len / this.L0;
        } else {
            this.rotX.visible = false;
        }
        this.rotX.rotation.x = Math.acos(_y / len);
        this.rotY.rotation.y = Math.atan2(_x, _z);
    }
    //粒子系統
    /**
     * 老師幫你寫的粒子系統，繼承自 THREE.Points
     * @constructor TEACHER.Points
     * @param {number} _color 顏色，預設洋紅0xFF00FF 
     * @param {number} _size 半徑，預設1
     * @param {number} _nnMax 最大點數，預設10000 
     */
TEACHER.Points = function(_color, _size, _nnMax) {
    let tp = this;
    let ss = _size || 1;
    let color = _color || 0xFF00FF;
    let tColor = new THREE.Color(color);
    tp.nnMax = _nnMax || 10000;
    tp.nnNow = 0;
    tp.geometry = new THREE.BufferGeometry();
    tp.positions = [];
    tp.geometry.setAttribute('position', new THREE.Float32BufferAttribute(tp.positions, 3));
    tp.geometry.computeBoundingSphere();
    let material = new THREE.PointsMaterial({
        size: ss,
        map: tp.createCanvasMaterial('#' + tColor.getHexString(), 64),
        transparent: true,
        depthWrite: false
    });
    THREE.Points.call(this, tp.geometry, material);
}
TEACHER.Points.prototype = Object.create(THREE.Points.prototype);
TEACHER.Points.prototype.constructor = TEACHER.Points;
TEACHER.Points.prototype.createCanvasMaterial = function(color, size) {
    var matCanvas = document.createElement('canvas');
    matCanvas.width = matCanvas.height = size;
    var matContext = matCanvas.getContext('2d');
    matContext.imageSmoothingEnabled = false;
    // create exture object from canvas.
    var texture = new THREE.Texture(matCanvas);
    // Draw a circle
    var center = size / 2;
    matContext.beginPath();
    matContext.arc(center, center, size / 2 - 3, 0, 2 * Math.PI, false);
    matContext.closePath();
    matContext.fillStyle = color;
    matContext.fill();
    // need to set needsUpdate
    texture.needsUpdate = true;
    // return a texture made from the canvas
    return texture;
}
TEACHER.Points.prototype.addPoint = function(_x, _y, _z) {
    let tp = this;
    if (tp.nnNow < tp.nnMax) {
        tp.nnNow++;
    } else {
        log('TEACHER.Points 到達最大點數');
        tp.positions.shift();
        tp.positions.shift();
        tp.positions.shift();
    }
    tp.positions.push(_x, _y, _z);
    tp.geometry.setAttribute('position', new THREE.Float32BufferAttribute(tp.positions, 3));
    tp.geometry.computeBoundingSphere();
    tp.geometry.attributes.position.needsUpdate = true;

}
TEACHER.Points.prototype.clear = function() {
    let tp = this;
    tp.positions = [];
    tp.geometry.setAttribute('position', new THREE.Float32BufferAttribute(tp.positions, 3));
    tp.geometry.computeBoundingSphere();
    tp.geometry.attributes.position.needsUpdate = true;
    tp.nnNow = 0;
}


//線條系統
/**
 * 老師幫你寫的線條系統，繼承自 THREE.Line
 * @constructor TEACHER.Line
 * @param {number} _color 顏色，預設洋紅0xFF00FF 
 * @param {number} _nnMax 最大點數，預設10000 
 */
TEACHER.Line = function(_color, _nnMax) {
    let ln = this;
    ln.nnMax = _nnMax || 10000;
    ln.nnNow = 0;
    let material = new THREE.MeshBasicMaterial({ color: _color || 0xFF00FF });
    ln.geometry = new THREE.BufferGeometry();
    ln.positions = [];

    ln.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ln.positions, 3));
    ln.geometry.computeBoundingSphere();
    ln.geometry.dynamic = true;

    THREE.Line.call(this, ln.geometry, material);
}
TEACHER.Line.prototype = Object.create(THREE.Line.prototype);
TEACHER.Line.prototype.constructor = TEACHER.Line;
TEACHER.Line.prototype.addPoint = function(_x, _y, _z) {
    let ln = this;
    if (ln.nnNow < ln.nnMax) {
        ln.nnNow++;
    } else {
        log('TEACHER.Line 到達最大點數');
        ln.positions.shift();
        ln.positions.shift();
        ln.positions.shift();
    }
    ln.positions.push(_x, _y, _z);
    ln.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ln.positions, 3));
    ln.geometry.computeBoundingSphere();
    ln.geometry.attributes.position.needsUpdate = true;

}
TEACHER.Line.prototype.clear = function() {
    let ln = this;
    ln.positions = [];
    ln.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ln.positions, 3));
    ln.geometry.computeBoundingSphere();
    ln.geometry.attributes.position.needsUpdate = true;
    ln.nnNow = 0;

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
TEACHER.ObjTextPlane = function(_w, _h, _text, _dir, _textColor, _bgColor) {
    let t = this;
    //texture
    let ratio = Math.round(Math.log2(_w / _h));
    log(ratio)
    let canvas = $("<canvas>").attr('width', String(128 * Math.pow(2, ratio))).attr('height', '128');
    t.stage = new createjs.Stage(canvas[0]);
    let container = new createjs.Container();
    if (_bgColor) {
        let rectShape = new createjs.Shape();
        let bgColor = new THREE.Color(_bgColor);
        rectShape.graphics.c().f("#" + bgColor.getHexString()).dr(0, 0, 128 * Math.pow(2, ratio), 128);
        container.addChild(rectShape);
    }
    t.ctext = new createjs.Text();
    let textColor = new THREE.Color(_textColor || 0xffffff);
    t.ctext.color = "#" + textColor.getHexString();
    t.ctext.font = '96px Arial';
    t.ctext.text = _text || "";

    t.ctext.textAlign = 'center';
    t.ctext.textBaseline = 'middle';
    t.ctext.x = 128 * Math.pow(2, ratio) / 2;
    t.ctext.y = 128 / 2;

    container.addChild(t.ctext);
    t.stage.addChild(container);
    t.stage.update();

    //plane
    t.texture = new THREE.Texture(canvas[0]);
    var material = new THREE.MeshBasicMaterial({ map: t.texture, transparent: true });
    var geometry = new THREE.PlaneGeometry(_w || 10, _h || 10, 1, 1);
    t.texture.needsUpdate = true;
    t.plane1 = new THREE.Mesh(geometry, material);
    t.plane2 = new THREE.Mesh(geometry, material);
    t.plane2.rotation.y = Math.PI;
    let objCon = new THREE.Object3D();
    objCon.add(t.plane1).add(t.plane2);
    if (_dir === "x") {
        objCon.rotation.y = 0.5 * Math.PI;
    } else if (_dir === "y") {
        objCon.rotation.x = -0.5 * Math.PI;
    }
    THREE.Object3D.call(this);
    t.add(objCon);
}
TEACHER.ObjTextPlane.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjTextPlane.prototype.constructor = TEACHER.ObjTextPlane;
TEACHER.ObjTextPlane.prototype.setText = function(_text) {
    let t = this;
    t.ctext.text = _text;
    t.stage.update();
    t.texture.needsUpdate = true;
}



//--老師幫你產生天空盒，地板--//
//--老師幫你產生天空盒，地板--//
//--老師幫你產生天空盒，地板--//
//skyBox天空盒
var skyBox = new THREE.Object3D();
skyBox.wallU = new TEACHER.ObjPicPlane(10000, 10000, pics.wallU, 'y', 1);
skyBox.wallD = new TEACHER.ObjPicPlane(10000, 10000, pics.wallD, 'y', 0);
skyBox.wallS = new TEACHER.ObjPicCylinder(5000, 10000, pics.wallSide, true, 'y', 1);
skyBox.wallU.position.y = 5000;
skyBox.wallD.position.y = -5000;
skyBox.add(skyBox.wallU).add(skyBox.wallD).add(skyBox.wallS);
world3D.scene.add(skyBox);

//ground地板
var ground = new TEACHER.ObjPicPlane(100, 100, pics.ground, 'y');
world3D.scene.add(ground);

var logo = new TEACHER.ObjPicPlane(100, 100 / 8, pics.logo, 'z', 2);
logo.position.z = -50;
logo.position.y = 100 / 8 / 2;
world3D.scene.add(logo);


//取得滑鼠3D位置
/**
 * @function getMouse3D 取得滑鼠3D位置
 * @param {string} _plane 平面名稱 "x","y,'z"，預設為"y"
 * @param {number} _c 截距，預設為0 
 */
function getMouse3D(_plane, _c) {

    let p = _plane || "y";
    let vecN;
    let vecM = new THREE.Vector3(); //mouse3D to return
    if (p === "x") { vecN = new THREE.Vector3(1, 0, 0); } else if (p === "y") { vecN = new THREE.Vector3(0, 1, 0); } else if (p === "z") { vecN = new THREE.Vector3(0, 0, 1); } else { log('錯誤!!'); }
    let mouse = new THREE.Vector2();
    mouse.x = (world2D.stage.mouseX / 1600) * 2 - 1;
    mouse.y = -(world2D.stage.mouseY / 900) * 2 + 1;
    world3D.raycaster.setFromCamera(mouse, world3D.camera);
    world3D.raycaster.ray.intersectPlane(new THREE.Plane(vecN), vecM);

    return vecM;
}



//D.執行init，程式開始
init();