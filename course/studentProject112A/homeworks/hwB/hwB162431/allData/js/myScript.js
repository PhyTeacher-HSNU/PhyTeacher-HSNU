'use strict'; //嚴格模式
const log = console.log;
const fps = 60;

//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//-------------------開始做我的動畫-------------------//
//
/*任務：
1. 改變舞台上，按鈕的名稱：
	(1)world2D.btn01：左右滾動，world2D.btn02：原地旋轉
	(2)偵測按鈕按下的動作

2. 按下按鈕時，播放下列動畫
	world2D.btn01：左右滾動
	world2D.btn02：原地旋轉
	world2D.btnUp：停止動畫，向前移動
	world2D.btnDown：停止動畫，向後移動
	world2D.btnRight：停止動畫，向右移動
	world2D.btnLeft：停止動畫，向左移動

3. 改變並使用舞台上的slider
    world2D.sl01：最大50，最小-50，現值0，控制smile.position.x
    world2D.sl02：最大180，最小-180，現值90，控制smile.rotation.z
    world2D.sl03：最大3，最小0.1，現值1.2，控制smile.scale.xyz
    world2D.ch01：控制smile.visible
	world2D.ch02：控制動畫是否播放 isPlay
	提示：world2D.sl01.help()可看到說明

4. 點拖放：
	(1)點拖放smile
	(2)點拖放smile.eye
	提示1：getMouse3D(_plane , _c)
	提示2：isDraging, dragWho, oldMouseX, oldMouseZ
*/
//--SOP：A.宣告全域變數，B.定義init，C.定義tick，D.執行init--//

//A.宣告全域變數
const CONST_TEXT = '162431 賴境鎰';
const CONST_TEXT2 = '請嘗試用最少的次數將球打入藍圈內，共有5關';
let ball;
const ballRadius = 5;
let arrow;
let hits = 0;
let hitsCurLevel = 0;
let hitsText;

class AxisAlignedBB {
  constructor(minX, maxX, minY, maxY, minZ, maxZ, vx = 0, vz = 0) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.minZ = minZ;
    this.maxZ = maxZ;
    this.vx = vx;
    this.vz = vz;
    this.obj = null;
  }

  tick() {
    this.minX += this.vx;
    this.maxX += this.vx;
    this.minZ += this.vz;
    this.maxZ += this.vz;
    this.obj.position.x += this.vx;
    this.obj.position.z += this.vz;
  }
  // chatgpt generated
  isCollide(x, z, radius) {
    // Calculate the closest point on the AABB to the sphere
    const closestX = Math.max(this.minX, Math.min(x, this.maxX));
    //const closestY = Math.max(this.minY, Math.min(y, this.maxY));
    const closestZ = Math.max(this.minZ, Math.min(z, this.maxZ));

    // Calculate the distance between the sphere's center and the closest point
    const distanceX = x - closestX;
    //const distanceY = y - closestY;
    const distanceZ = z - closestZ;
    const distanceSquared = distanceX * distanceX /* + distanceY * distanceY*/ + distanceZ * distanceZ;

    // Check if the distance is less than or equal to the sphere's radius squared
    return distanceSquared <= radius * radius;
  }

  bounceBallOff(ball) {
    const x = ball.position.x;
    const z = ball.position.z;
    const radius = ballRadius;
    if (!this.isCollide(x, z, radius)) return;
    if (x < this.minX) {
      ball.vx = -Math.abs(ball.vx) + this.vx;
    } else if (x > this.maxX) {
      ball.vx = Math.abs(ball.vx) + this.vx;
    } else if (z < this.minZ) {
      ball.vz = -Math.abs(ball.vz) + this.vz;
    } else if (z > this.maxZ) {
      ball.vz = Math.abs(ball.vz) + this.vz;
    }
  }

  copy() {
    return new AxisAlignedBB(this.minX, this.maxX, this.minY, this.maxY, this.minZ, this.maxZ, this.vx, this.vz);
  }
}

const LEVEL_DEFS = [
  {
    ballX: -75,
    ballZ: 0,
    holeX: 75,
    holeZ: 0,
    obstaclesInitial: [new AxisAlignedBB(-5, 5, 0, 20, -50, 50), new AxisAlignedBB(-100, 100, 0, 20, -100, -90)],
  },
  {
    ballX: -75,
    ballZ: 75,
    holeX: 75,
    holeZ: 75,
    obstaclesInitial: [
      new AxisAlignedBB(-5, 5, 0, 20, -0, 100),
      new AxisAlignedBB(-30, 30, 0, 20, -5, 5),
      new AxisAlignedBB(-100, 100, 0, 20, -100, -90),
      new AxisAlignedBB(-2.5, 2.5, 0, 20, -100, -75),
    ],
  },
  {
    ballX: -75,
    ballZ: -75,
    holeX: 75,
    holeZ: -75,
    obstaclesInitial: [
      new AxisAlignedBB(-100, -80, 0, 20, -25, 100),
      new AxisAlignedBB(80, 100, 0, 20, -25, 100),
      new AxisAlignedBB(-10, 10, 0, 20, -100, 25),
      new AxisAlignedBB(-50, 50, 0, 20, 80, 100),
    ],
  },
  {
    ballX: -75,
    ballZ: -75,
    holeX: 75,
    holeZ: -75,
    obstaclesInitial: [
      new AxisAlignedBB(-100, -80, 0, 20, -25, 100),
      new AxisAlignedBB(80, 100, 0, 20, -25, 100),
      new AxisAlignedBB(-10, 10, 0, 20, -100, 25, 0.5),
      new AxisAlignedBB(-50, 50, 0, 20, 80, 100),
    ],
    updateFn() {
      if (this.obstacles[2].obj.position.x > 20) {
        this.obstacles[2].vx = -0.5;
      } else if (this.obstacles[2].obj.position.x < -20) {
        this.obstacles[2].vx = 0.5;
      }
      this.obstacles[2].tick();
    },
  },
  {
    ballX: -70,
    ballZ: -75,
    holeX: 70,
    holeZ: -75,
    obstaclesInitial: [
      new AxisAlignedBB(-100, -80, 0, 20, -25, 100, 0, 1),
      new AxisAlignedBB(80, 100, 0, 20, -25, 100, 0, 1),
      new AxisAlignedBB(-10, 10, 0, 20, -100, 25, 0.5),
      new AxisAlignedBB(-50, 50, 0, 20, 80, 100, 0, 1),
    ],
    updateFn() {
      if (this.obstacles[2].obj.position.x > 20) {
        this.obstacles[2].vx = -0.5;
      } else if (this.obstacles[2].obj.position.x < -20) {
        this.obstacles[2].vx = 0.5;
      }
      this.obstacles[2].tick();
      if (this.obstacles[0].obj.position.z > 20) {
        this.obstacles[0].vz = -0.5;
        this.obstacles[1].vz = -0.5;
      } else if (this.obstacles[0].obj.position.z < -20) {
        this.obstacles[0].vz = 0.5;
        this.obstacles[1].vz = 0.5;
      }
      this.obstacles[0].tick();
      this.obstacles[1].tick();
      if (this.obstacles[3].obj.position.z > 100) {
        this.obstacles[3].vz = -0.5;
      } else if (this.obstacles[3].obj.position.z < 80) {
        this.obstacles[3].vz = 0.5;
      }
      this.obstacles[3].tick();
    },
  },
];

let levelIndex = 0;
//B.定義init
function init() {
  ball = new TEACHER.ObjSphere(ballRadius, 0xff0000);
  ball.vx = 0;
  ball.vz = 0;
  const ballTexture = new THREE.TextureLoader().load(pics.ball);
  const mat = new THREE.MeshBasicMaterial({ map: ballTexture });
  const geo = ball.geo;
  ball.mesh = new THREE.Mesh(geo, mat);
  ball.add(ball.mesh);

  ball.position.y = ballRadius;
  world3D.scene.add(ball);

  const constText = new TEACHER.ObjTextPlane(160, 20, CONST_TEXT, 'y', 0xffffff);
  constText.position.y = 60;
  constText.position.z = -100;
  constText.rotateX(Math.PI / 2);
  world3D.scene.add(constText);

  hitsText = new TEACHER.ObjTextPlane(160, 20, '', 'y', 0xffffff);
  hitsText.position.y = 40;
  hitsText.position.z = -100;
  hitsText.rotateX(Math.PI / 2);
  world3D.scene.add(hitsText);

  const constText2 = new TEACHER.ObjTextPlane(160, 10, CONST_TEXT2, 'y', 0xffffff);
  constText2.position.y = 80;
  constText2.position.z = -100;
  constText2.rotateX(Math.PI / 2);
  world3D.scene.add(constText2);

  arrow = new TEACHER.ObjArrow(5, 0x87ceeb);
  world3D.scene.add(arrow);

  setupUI();
  initLevel();
  setInterval(tick, 1000 / fps);
}

let levelObjs = [];
function initLevel() {
  hitsCurLevel = 0;
  world3D.scene.remove(...levelObjs);
  const curLevelDef = LEVEL_DEFS[levelIndex];
  ball.position.set(curLevelDef.ballX, ballRadius, curLevelDef.ballZ);
  ball.vx = ball.vz = 0;
  curLevelDef.obstacles = curLevelDef.obstaclesInitial.map((obs) => obs.copy());
  levelObjs = curLevelDef.obstacles.map((obstacle) => {
    const o = new TEACHER.ObjBox(obstacle.maxX - obstacle.minX, obstacle.maxY - obstacle.minY, obstacle.maxZ - obstacle.minZ, 0x00ff00);
    o.position.set((obstacle.maxX + obstacle.minX) / 2, (obstacle.maxY + obstacle.minY) / 2, (obstacle.maxZ + obstacle.minZ) / 2);
    return o;
  });
  curLevelDef.obstacles.forEach((obs, i) => {
    obs.obj = levelObjs[i];
  });
  const hole = new TEACHER.ObjCylinder(10, 1, 0x0000ff);
  hole.position.set(curLevelDef.holeX, 1, curLevelDef.holeZ);
  levelObjs.push(hole);
  world3D.scene.add(...levelObjs);
}

function setupUI() {
  // world2D.btnLeft.on('click', () => {
  //   world3D.camera.position.x -= 0.1;
  // });
  // world2D.btnRight.on('click', () => {
  //   world3D.camera.position.x += 0.1;
  // });
  // world2D.btnUp.on('click', () => {
  //   world3D.camera.position.z -= 0.1;
  // });
  // world2D.btnDown.on('click', () => {
  //   world3D.camera.position.z += 0.1;
  // });
  world2D.ch01.visible = false;
  world2D.ch02.visible = false;
  world2D.sl03.visible = false;
  world2D.btnLeft.visible = false;
  world2D.btnRight.visible = false;
  world2D.btnUp.visible = false;
  world2D.btnDown.visible = false;
  world2D.sl01.setLabel('打擊角度');
  world2D.sl01.minimum = -180;
  world2D.sl01.maximum = 180;
  world2D.sl02.setLabel('打擊強度');
  world2D.sl02.minimum = 1;
  world2D.sl02.maximum = 10;
  world2D.slCameraRR.maximum = 300;
  world2D.slCameraRR.value = 250;
  world2D.btn01.setLabel('打擊');
  world2D.btn01.on('click', () => {
    ball.vx += Math.cos((world2D.sl01.value * Math.PI) / 180) * world2D.sl02.value;
    ball.vz += Math.sin((world2D.sl01.value * Math.PI) / 180) * world2D.sl02.value;
    hits++;
    hitsCurLevel++;
  });
  world2D.btn02.setLabel('重新開始');
  world2D.btn02.on('click', () => {
    hits -= hitsCurLevel;
    initLevel();
  });
}

const Y_AXIS = new THREE.Vector3(0, 1, 0);

//C.定義tick
function tick() {
  //球移動
  let ballVx = ball.vx;
  let ballVz = ball.vz;
  ball.position.x += ballVx;
  ball.position.z += ballVz;
  ball.rotateOnWorldAxis(new THREE.Vector3(ballVx, 0, ballVz).cross(Y_AXIS).normalize(), -Math.sqrt(ballVx ** 2 + ballVz ** 2) / ballRadius);

  ball.vx *= 0.995;
  ball.vz *= 0.995;
  const f1 = Math.cos((world2D.sl01.value * Math.PI) / 180);
  const f2 = Math.sin((world2D.sl01.value * Math.PI) / 180);

  const vx = f1 * world2D.sl02.value * 10;
  const vz = f2 * world2D.sl02.value * 10;
  const pos = ball.position.clone();
  pos.add(new THREE.Vector3(f1 * 10, 0, f2 * 10));
  arrow.position.copy(pos);
  arrow.setArrow(vx, 0, vz);
  hitsText.setText(`第${levelIndex + 1}關 打擊數: ${hits}`);

  doBounce();

  if (LEVEL_DEFS[levelIndex].updateFn) {
    LEVEL_DEFS[levelIndex].updateFn();
  }

  if (ball.position.distanceTo(new THREE.Vector3(LEVEL_DEFS[levelIndex].holeX, 0, LEVEL_DEFS[levelIndex].holeZ)) < 10) {
    levelIndex++;
    if (levelIndex >= LEVEL_DEFS.length) {
      alert('恭喜通過所有關卡! 總打擊數: ' + hits);
      window.location.reload();
    } else {
      alert('恭喜通關!將進入下一關');
      initLevel();
    }
  }
  if (ball.position.x < -100 || ball.position.x > 100 || ball.position.z < -100 || ball.position.z > 100) {
    alert('出界!請重新嘗試這個關卡');
    hits -= hitsCurLevel;
    initLevel();
  }
  //3D
  world3D.render();
  //2D
  world2D.stage.update();
}

function doBounce() {
  const curLevelDef = LEVEL_DEFS[levelIndex];
  const obstacles = curLevelDef.obstacles;
  for (const obs of obstacles) {
    obs.bounceBallOff(ball);
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
TEACHER.ObjPlane = function (_w, _h, _color, _dir, _side) {
  let t = this;
  t.mat = new TEACHER.MSMat(_color, _side);
  t.geo = new THREE.PlaneGeometry(_w || 10, _h || 10, 1, 1);
  t.mesh = new THREE.Mesh(t.geo, t.mat);
  if (_dir === 'x') {
    t.mesh.rotation.y = 0.5 * Math.PI;
  } else if (_dir === 'y') {
    t.mesh.rotation.x = -0.5 * Math.PI;
  }
  THREE.Object3D.call(this, t.geo, t.mat);
  t.add(t.mesh);
};
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
TEACHER.ObjCylinder = function (_r, _h, _color, _openEnd, _dir, _side) {
  let t = this;
  t.mat = new TEACHER.MSMat(_color, _side);
  t.geo = new THREE.CylinderGeometry(_r || 10, _r || 10, _h || 10, 32, 2, _openEnd);
  t.mesh = new THREE.Mesh(t.geo, t.mat);
  if (_dir === 'x') {
    t.mesh.rotation.z = -0.5 * Math.PI;
  } else if (_dir === 'z') {
    t.mesh.rotation.x = 0.5 * Math.PI;
  }
  THREE.Object3D.call(this, t.geo, t.mat);
  t.add(t.mesh);
};
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
TEACHER.ObjSphere = function (_r, _color, _side) {
  let t = this;
  t.mat = new TEACHER.MSMat(_color, _side);
  t.geo = new THREE.SphereGeometry(_r || 10, 32, 16);
  t.mesh = new THREE.Mesh(t.geo, t.mat);
  THREE.Object3D.call(this, t.geo, t.mat);
  t.add(t.mesh);
};
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
TEACHER.ObjBox = function (_w, _h, _d, _color, _side) {
  let t = this;
  t.mat = new TEACHER.MSMat(_color, _side);
  t.geo = new THREE.BoxGeometry(_w || 10, _h || 10, _d || 10);
  t.mesh = new THREE.Mesh(t.geo, t.mat);
  THREE.Object3D.call(this, t.geo, t.mat);
  t.add(t.mesh);
};
TEACHER.ObjBox.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjBox.prototype.constructor = TEACHER.ObjBox;
//---------------------------------------------
//老師的MSMat，繼承自 THREE.MeshStandardMaterial
TEACHER.MSMat = function (_color, _side) {
  THREE.MeshStandardMaterial.call(this, { color: _color || 0xff00ff, roughness: 0.4, side: _side || 0 });
};
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
TEACHER.ObjPicPlane = function (_w, _h, _pic, _dir, _side) {
  let t = this;
  let texture = new THREE.TextureLoader().load(_pic);
  t.mat = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: _side || 0 });
  t.geo = new THREE.PlaneGeometry(_w, _h, 1, 1);
  t.mesh = new THREE.Mesh(t.geo, t.mat);
  if (_dir === 'x') {
    t.mesh.rotation.y = 0.5 * Math.PI;
  } else if (_dir === 'y') {
    t.mesh.rotation.x = -0.5 * Math.PI;
  }
  THREE.Object3D.call(this);
  t.add(t.mesh);
};
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
TEACHER.ObjPicCylinder = function (_r, _h, _pic, _openEnd, _dir, _side) {
  let t = this;
  let texture = new THREE.TextureLoader().load(_pic);
  t.mat = new THREE.MeshBasicMaterial({ map: texture, side: _side || 0 });
  t.geo = new THREE.CylinderGeometry(_r || 10, _r || 10, _h || 10, 32, 4, _openEnd);
  t.mesh = new THREE.Mesh(t.geo, t.mat);
  if (_dir === 'x') {
    t.mesh.rotation.y = 0.5 * Math.PI;
    t.mesh.rotation.z = -0.5 * Math.PI;
  } else if (_dir === 'z') {
    t.mesh.rotation.y = 0.5 * Math.PI;
    t.mesh.rotation.x = 0.5 * Math.PI;
  } else if (_dir === 'y') {
    t.mesh.rotation.y = 0.5 * Math.PI;
  }
  THREE.Object3D.call(this, t.geo, t.mat);
  t.add(t.mesh);
};
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
TEACHER.ObjPicSphere = function (_r, _pic, _side) {
  let t = this;
  let texture = new THREE.TextureLoader().load(_pic);
  t.mat = new THREE.MeshBasicMaterial({ map: texture, side: _side || 0 });
  t.geo = new THREE.SphereGeometry(_r || 10, 32, 16);
  t.mesh = new THREE.Mesh(t.geo, t.mat);
  THREE.Object3D.call(this, t.geo, t.mat);
  t.add(t.mesh);
};
TEACHER.ObjPicSphere.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjPicSphere.prototype.constructor = TEACHER.ObjPicSphere;

//箭頭
/**
 * 老師幫你寫的箭頭，繼承自 THREE.Object3D
 * @constructor TEACHER.ObjArrow
 * @param {number} _r 半徑，預設10
 * @param {number} _color 顏色，預設洋紅0xFF00FF
 */
TEACHER.ObjArrow = function (_r, _color) {
  let ratioHead = 0.4; //頭佔全長
  let ratioBody = 0.5; //身寬佔全長
  let material = new THREE.MeshStandardMaterial({ color: _color || 0xff00ff, roughness: 0.4 });
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
};
TEACHER.ObjArrow.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjArrow.prototype.constructor = TEACHER.ObjArrow;
TEACHER.ObjArrow.prototype.setArrow = function (_x, _y, _z) {
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
};
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
TEACHER.ObjSpring = function (_len, _rB, _rS, _nn, _color) {
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
    arr.push(new THREE.Vector3(rB * Math.cos((i * 2 * Math.PI) / 16), dd * (0.05 + (0.9 * i) / nn / 16), rB * Math.sin((i * 2 * Math.PI) / 16)));
  }
  arr.push(new THREE.Vector3(0, dd * 0.95, 0));
  arr.push(new THREE.Vector3(0, dd, 0));

  let myClosedSpline = new THREE.CatmullRomCurve3(arr);
  let material = new THREE.MeshStandardMaterial({ color: _color || 0xff00ff, roughness: 0.4 });
  let geometry = new THREE.TubeGeometry(myClosedSpline, 500, rS, 12);
  this.mesh = new THREE.Mesh(geometry, material);
  THREE.Object3D.call(this);
  this.rotX = new THREE.Object3D(); //in rotation.x for theta
  this.rotY = new THREE.Object3D(); //out rotation.y for phi
  this.add(this.rotY);
  this.rotY.add(this.rotX);
  this.rotX.add(this.mesh);
};
TEACHER.ObjSpring.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjSpring.prototype.constructor = TEACHER.ObjSpring;
TEACHER.ObjSpring.prototype.setSpring = function (_x, _y, _z) {
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
};
//粒子系統
/**
 * 老師幫你寫的粒子系統，繼承自 THREE.Points
 * @constructor TEACHER.Points
 * @param {number} _color 顏色，預設洋紅0xFF00FF
 * @param {number} _size 半徑，預設1
 * @param {number} _nnMax 最大點數，預設10000
 */
TEACHER.Points = function (_color, _size, _nnMax) {
  let tp = this;
  let ss = _size || 1;
  let color = _color || 0xff00ff;
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
    depthWrite: false,
  });
  THREE.Points.call(this, tp.geometry, material);
};
TEACHER.Points.prototype = Object.create(THREE.Points.prototype);
TEACHER.Points.prototype.constructor = TEACHER.Points;
TEACHER.Points.prototype.createCanvasMaterial = function (color, size) {
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
};
TEACHER.Points.prototype.addPoint = function (_x, _y, _z) {
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
};
TEACHER.Points.prototype.clear = function () {
  let tp = this;
  tp.positions = [];
  tp.geometry.setAttribute('position', new THREE.Float32BufferAttribute(tp.positions, 3));
  tp.geometry.computeBoundingSphere();
  tp.geometry.attributes.position.needsUpdate = true;
  tp.nnNow = 0;
};

//線條系統
/**
 * 老師幫你寫的線條系統，繼承自 THREE.Line
 * @constructor TEACHER.Line
 * @param {number} _color 顏色，預設洋紅0xFF00FF
 * @param {number} _nnMax 最大點數，預設10000
 */
TEACHER.Line = function (_color, _nnMax) {
  let ln = this;
  ln.nnMax = _nnMax || 10000;
  ln.nnNow = 0;
  let material = new THREE.MeshBasicMaterial({ color: _color || 0xff00ff });
  ln.geometry = new THREE.BufferGeometry();
  ln.positions = [];

  ln.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ln.positions, 3));
  ln.geometry.computeBoundingSphere();
  ln.geometry.dynamic = true;

  THREE.Line.call(this, ln.geometry, material);
};
TEACHER.Line.prototype = Object.create(THREE.Line.prototype);
TEACHER.Line.prototype.constructor = TEACHER.Line;
TEACHER.Line.prototype.addPoint = function (_x, _y, _z) {
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
};
TEACHER.Line.prototype.clear = function () {
  let ln = this;
  ln.positions = [];
  ln.geometry.setAttribute('position', new THREE.Float32BufferAttribute(ln.positions, 3));
  ln.geometry.computeBoundingSphere();
  ln.geometry.attributes.position.needsUpdate = true;
  ln.nnNow = 0;
};

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
TEACHER.ObjTextPlane = function (_w, _h, _text, _dir, _textColor, _bgColor) {
  let t = this;
  //texture
  let ratio = Math.round(Math.log2(_w / _h));
  log(ratio);
  let canvas = $('<canvas>')
    .attr('width', String(128 * Math.pow(2, ratio)))
    .attr('height', '128');
  t.stage = new createjs.Stage(canvas[0]);
  let container = new createjs.Container();
  if (_bgColor) {
    let rectShape = new createjs.Shape();
    let bgColor = new THREE.Color(_bgColor);
    rectShape.graphics
      .c()
      .f('#' + bgColor.getHexString())
      .dr(0, 0, 128 * Math.pow(2, ratio), 128);
    container.addChild(rectShape);
  }
  t.ctext = new createjs.Text();
  let textColor = new THREE.Color(_textColor || 0xffffff);
  t.ctext.color = '#' + textColor.getHexString();
  t.ctext.font = '96px Arial';
  t.ctext.text = _text || '';

  t.ctext.textAlign = 'center';
  t.ctext.textBaseline = 'middle';
  t.ctext.x = (128 * Math.pow(2, ratio)) / 2;
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
  if (_dir === 'x') {
    objCon.rotation.y = 0.5 * Math.PI;
  } else if (_dir === 'y') {
    objCon.rotation.x = -0.5 * Math.PI;
  }
  THREE.Object3D.call(this);
  t.add(objCon);
};
TEACHER.ObjTextPlane.prototype = Object.create(THREE.Object3D.prototype);
TEACHER.ObjTextPlane.prototype.constructor = TEACHER.ObjTextPlane;
TEACHER.ObjTextPlane.prototype.setText = function (_text) {
  let t = this;
  t.ctext.text = _text;
  t.stage.update();
  t.texture.needsUpdate = true;
};

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
var ground = new TEACHER.ObjPicPlane(200, 200, pics.ground, 'y');
world3D.scene.add(ground);

var logo = new TEACHER.ObjPicPlane(100, 100 / 8, pics.logo, 'z', 2);
logo.position.z = -100;
logo.position.y = 100 / 8 / 2;
world3D.scene.add(logo);

//取得滑鼠3D位置
/**
 * @function getMouse3D 取得滑鼠3D位置
 * @param {string} _plane 平面名稱 "x","y,'z"，預設為"y"
 * @param {number} _c 截距，預設為0
 */
function getMouse3D(_plane, _c) {
  let p = _plane || 'y';
  let vecN;
  let vecM = new THREE.Vector3(); //mouse3D to return
  if (p === 'x') {
    vecN = new THREE.Vector3(1, 0, 0);
  } else if (p === 'y') {
    vecN = new THREE.Vector3(0, 1, 0);
  } else if (p === 'z') {
    vecN = new THREE.Vector3(0, 0, 1);
  } else {
    log('錯誤!!');
  }
  let mouse = new THREE.Vector2();
  mouse.x = (world2D.stage.mouseX / 1600) * 2 - 1;
  mouse.y = -(world2D.stage.mouseY / 900) * 2 + 1;
  world3D.raycaster.setFromCamera(mouse, world3D.camera);
  world3D.raycaster.ray.intersectPlane(new THREE.Plane(vecN), vecM);

  return vecM;
}

//D.執行init，程式開始
init();
