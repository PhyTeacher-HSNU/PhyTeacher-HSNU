'use strict'; //嚴格模式
const log = console.log;
const fps = 60;

const CONST_TEXT = '162431 賴境鎰';
const CONST_TEXT2 = '使用球擊破方塊';

// class AxisAlignedBB {
//   constructor(minX, maxX, minY, maxY, minZ, maxZ) {
//     this.minX = minX;
//     this.maxX = maxX;
//     this.minY = minY;
//     this.maxY = maxY;
//     this.minZ = minZ;
//     this.maxZ = maxZ;
//   }

//   // chatgpt generated
//   isCollide(x, z, radius) {
//     // Calculate the closest point on the AABB to the sphere
//     const closestX = Math.max(this.minX, Math.min(x, this.maxX));
//     //const closestY = Math.max(this.minY, Math.min(y, this.maxY));
//     const closestZ = Math.max(this.minZ, Math.min(z, this.maxZ));

//     // Calculate the distance between the sphere's center and the closest point
//     const distanceX = x - closestX;
//     //const distanceY = y - closestY;
//     const distanceZ = z - closestZ;
//     const distanceSquared = distanceX * distanceX /* + distanceY * distanceY*/ + distanceZ * distanceZ;

//     // Check if the distance is less than or equal to the sphere's radius squared
//     return distanceSquared <= radius * radius;
//   }

//   bounceBallOff(ball) {
//     const x = ball.position.x;
//     const z = ball.position.z;
//     const radius = ballRadius;
//     if (!this.isCollide(x, z, radius)) return;
//     if (x < this.minX) {
//       ball.vx = -Math.abs(ball.vx) + this.vx;
//     } else if (x > this.maxX) {
//       ball.vx = Math.abs(ball.vx) + this.vx;
//     } else if (z < this.minZ) {
//       ball.vz = -Math.abs(ball.vz) + this.vz;
//     } else if (z > this.maxZ) {
//       ball.vz = Math.abs(ball.vz) + this.vz;
//     }
//   }

//   copy() {
//     return new AxisAlignedBB(this.minX, this.maxX, this.minY, this.maxY, this.minZ, this.maxZ, this.vx, this.vz);
//   }
// }

function sphereBoxCollision(sphere, box) {
  const minX = -box.geo.parameters.width / 2 + box.position.x;
  const maxX = box.geo.parameters.width / 2 + box.position.x;
  const minZ = -box.geo.parameters.depth / 2 + box.position.z;
  const maxZ = box.geo.parameters.depth / 2 + box.position.z;
  // const minY = -box.geo.parameters.height / 2 + box.position.y;
  // const maxY = box.geo.parameters.height / 2 + box.position.y;
  const radius = sphere.geo.parameters.radius;
  const x = sphere.position.x;
  // const y = sphere.position.y;
  const z = sphere.position.z;

  const closestX = Math.max(minX, Math.min(x, maxX));
  //const closestY = Math.max(this.minY, Math.min(y, this.maxY));
  const closestZ = Math.max(minZ, Math.min(z, maxZ));

  const distanceSqr = (x - closestX) * (x - closestX) + (z - closestZ) * (z - closestZ);
  if (distanceSqr < radius * radius) {
    if (x < minX) {
      sphere.vx = -Math.abs(sphere.vx);
    } else if (x > maxX) {
      sphere.vx = Math.abs(sphere.vx);
    } else if (z < minZ) {
      sphere.vz = -Math.abs(sphere.vz);
    } else if (z > maxZ) {
      sphere.vz = Math.abs(sphere.vz);
    }
    box.life--;
    totalCollisions++;
    if (box.life <= 0) {
      world3D.scene.remove(box);
      boxes.delete(box);
    }
    box.mat.color = new THREE.Color(RAINBOW_COLORS[box.life - 1]);
  }
}

function sphereSphereCollision(ballA, ballB, dis) {
  let isCollision = false;
  let mA = ballA.mass || 1;
  let mB = ballB.mass || 1;
  var r12x = ballA.position.x - ballB.position.x;
  var r12y = ballA.position.y - ballB.position.y;
  var r12z = ballA.position.z - ballB.position.z;
  var rr = Math.sqrt(r12x * r12x + r12y * r12y + r12z * r12z);
  var vcx = (mA * ballA.vx + mB * ballB.vx) / (mA + mB);
  var vcy = (mA * ballA.vy + mB * ballB.vy) / (mA + mB);
  var vcz = (mA * ballA.vz + mB * ballB.vz) / (mA + mB);
  var v1cx = ballA.vx - vcx;
  var v1cy = ballA.vy - vcy;
  var v1cz = ballA.vz - vcz;
  var v2cx = ballB.vx - vcx;
  var v2cy = ballB.vy - vcy;
  var v2cz = ballB.vz - vcz;

  if (rr < dis && v1cx * r12x + v1cy * r12y + v1cz * r12z < 0) {
    isCollision = true;
    var n12x = r12x / rr;
    var n12y = r12y / rr;
    var n12z = r12z / rr;
    var v1c_n12 = Math.abs(v1cx * n12x + v1cy * n12y + v1cz * n12z);
    var v2c_n12 = Math.abs(v2cx * n12x + v2cy * n12y + v2cz * n12z);
    ballA.vx = vcx + v1cx + 2 * (v1c_n12 * n12x);
    ballA.vy = vcy + v1cy + 2 * (v1c_n12 * n12y);
    ballA.vz = vcz + v1cz + 2 * (v1c_n12 * n12z);
    ballB.vx = vcx + v2cx - 2 * (v2c_n12 * n12x);
    ballB.vy = vcy + v2cy - 2 * (v2c_n12 * n12y);
    ballB.vz = vcz + v2cz - 2 * (v2c_n12 * n12z);
  }

  return isCollision;
}

function newTexturedBall(radius) {
  const ballTexture = new THREE.TextureLoader().load(pics.ball);
  const mat = new THREE.MeshBasicMaterial({ map: ballTexture });
  const geo = new THREE.SphereGeometry(radius, 32, 16);
  const mesh = new THREE.Mesh(geo, mat);
  const ball = new TEACHER.ObjSphere(radius, 0xff0000);
  ball.vx = 0;
  ball.vy = 0;
  ball.vz = 0;
  ball.mesh = mesh;
  ball.add(ball.mesh);
  ball.position.y = radius;
  return ball;
}
let ballsToAdd = 0;
let hitsText, arrow;
const balls = new Set();
const boxes = new Set();
const RAINBOW_COLORS = [0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x9400d3];
const BOX_GRID = [
  [1, 1, 2, 3, 4, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 4, 3, 2, 1, 1],
  [1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 7, 6, 6, 5, 5, 4, 3, 2, 1],
  [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7, 6, 6, 5, 5, 4, 3, 2],
  [3, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 5, 5, 4, 3],
  [3, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 5, 5, 4, 3],
  [2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 7, 7, 7, 6, 6, 5, 5, 4, 3, 2],
  [1, 2, 3, 4, 5, 5, 6, 6, 7, 7, 7, 7, 6, 6, 5, 5, 4, 3, 2, 1],
  [1, 1, 2, 3, 4, 5, 5, 6, 6, 6, 6, 6, 6, 5, 5, 4, 3, 2, 1, 1],
];
//B.定義init
function init() {
  world2D.sl01.setLabel('連續發射球數');
  world2D.sl01.minimum = 1;
  world2D.sl01.maximum = 20;
  world2D.sl02.setLabel('發射角度');
  world2D.sl02.minimum = -85;
  world2D.sl02.maximum = 85;
  world2D.sl03.setLabel('發射速度');
  world2D.sl03.minimum = 1;
  world2D.sl03.maximum = 3;
  world2D.ch01.visible = world2D.ch02.visible = false;
  world2D.btn01.setLabel('發射');
  world2D.btn02.setLabel('重置');
  world2D.btnUp.visible = world2D.btnDown.visible = world2D.btnLeft.visible = world2D.btnRight.visible = false;
  world2D.slCameraRR.maximum = 300;

  world2D.btn01.on('click', () => {
    if (ballsToAdd <= 0) {
      ballsToAdd = world2D.sl01.value;
    }
  });
  world2D.btn02.on('click', () => location.reload());

  const constText = new TEACHER.ObjTextPlane(160, 20, CONST_TEXT, 'y', 0xffffff);
  constText.position.y = 60;
  constText.position.z = -100;
  constText.rotateX(Math.PI / 2);
  world3D.scene.add(constText);

  const constText2 = new TEACHER.ObjTextPlane(160, 10, CONST_TEXT2, 'y', 0xffffff);
  constText2.position.y = 30;
  constText2.position.z = -100;
  constText2.rotateX(Math.PI / 2);
  world3D.scene.add(constText2);

  hitsText = new TEACHER.ObjTextPlane(200, 10, '', 'y', 0xffffff);
  hitsText.position.y = 40;
  hitsText.position.z = -100;
  hitsText.rotateX(Math.PI / 2);
  world3D.scene.add(hitsText);

  arrow = new TEACHER.ObjArrow(3, 0x87ceeb);
  arrow.position.y = 5;
  arrow.position.z = 100;
  world3D.scene.add(arrow);

  for (let j = 0; j < BOX_GRID.length; j++) {
    for (let i = 0; i < BOX_GRID[j].length; i++) {
      const life = BOX_GRID[j][i];
      const box = new TEACHER.ObjBox(10, 10, 10, RAINBOW_COLORS[life - 1]);
      box.life = life;
      box.position.x = i * 10 - 95;
      box.position.y = 5;
      box.position.z = j * 10 - 95;
      world3D.scene.add(box);
      boxes.add(box);
    }
  }
  setInterval(tick, 1000 / fps);
}

let addBallTickCooldown = 0;
let totalCollisions = 0;
//C.定義tick
function tick() {
  hitsText.setText(`總碰撞數: ${totalCollisions} 剩餘方塊數: ${boxes.size}`);
  const angle = world2D.sl02.value * (Math.PI / 180) - Math.PI / 2;
  arrow.setArrow(world2D.sl03.value * Math.cos(angle) * 5, 0, world2D.sl03.value * Math.sin(angle) * 5);

  if (ballsToAdd > 0) {
    if (addBallTickCooldown <= 0) {
      const ball = newTexturedBall(3);
      ball.position.x = 0;
      ball.position.z = 100;
      ball.vx = world2D.sl03.value * Math.cos(angle);
      ball.vz = world2D.sl03.value * Math.sin(angle);
      world3D.scene.add(ball);
      balls.add(ball);
      addBallTickCooldown = 10;
      ballsToAdd--;
    } else {
      addBallTickCooldown--;
    }
  }

  for (const ball of balls) {
    ball.position.x += ball.vx;
    ball.position.z += ball.vz;
    if (ball.position.x > 97) {
      ball.vx = -Math.abs(ball.vx);
    }
    if (ball.position.x < -97) {
      ball.vx = Math.abs(ball.vx);
    }
    if (ball.position.z > 97) {
      ball.vz = -Math.abs(ball.vz);
    }
    if (ball.position.z < -97) {
      ball.vz = Math.abs(ball.vz);
    }
    if (ball.position.z > 0) continue;
    for (const box of boxes) {
      sphereBoxCollision(ball, box);
    }
  }

  const ballsAsArr = Array.from(balls);
  for (let i = 0; i < ballsAsArr.length; i++) {
    for (let j = i + 1; j < ballsAsArr.length; j++) {
      if (sphereSphereCollision(ballsAsArr[i], ballsAsArr[j], 6)) {
        totalCollisions++;
      }
    }
  }
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
