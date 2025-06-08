let nowBullets = {};

//ミミックの弾
class TBBullet {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.y / 30)), new Fortis.ImageMaterial("tre-box-bullet"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.y += this.speed.y * delta / 1000;

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }

        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
    }
}

//スケルトンの弾
class SBullet {
    constructor(layer, pos, speed) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 30)), new Fortis.ImageMaterial("skeleton-bullet"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 65, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 35, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            this.speed.x *= -1;
            this.e.pos.x += this.speed.x * delta / 1000;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//バタフライの弾
class BBullet {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 45, Fortis.Game.canvasCfg.size.x / 45)), new Fortis.ImageMaterial("butterfly-bullet"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        let pPos = pChara.e.pos.copy();
        let distance = pPos.sub(this.e.pos);
        let radian = Math.atan2(distance.y, distance.x);
        this.layer = layer;

        let tmpSpeed = Fortis.Game.canvasCfg.size.y / 8;
        this.speed = new Fortis.Vector2(tmpSpeed * Math.cos(radian), tmpSpeed * Math.sin(radian));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 45, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 45, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            this.speed.x *= -1;
            this.e.pos.x += this.speed.x * delta / 1000;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1 || this.e.pos.y < -Fortis.Game.canvasCfg.size.y / 5) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//蜂のはちみつ弾
class BHBullet {
    constructor(layer, pos, speed) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 1;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.y / 20)), new Fortis.ImageMaterial("bee-honey"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            this.speed.x *= -1;
            this.e.pos.x += this.speed.x * delta / 1000;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }
            
            speedDown = true;
            let id = Fortis.Timer.add(2000, false, speedDownReset);
            Fortis.Timer.start(id);

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//蜂のレーザー攻撃
class BLBullet {
    constructor(layer, pos, speed, radian) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("bee-needle"));
        this.e.angle = Fortis.util.radianToDegree(radian) - 90;
        layer.add(this.e);
        this.e.pos = pos.copy();

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 70, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 70, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//蜂の針やばい攻撃
class BRBullet {
    constructor(layer, pos, speed, radian) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("bee-needle"));
        this.e.angle = Fortis.util.radianToDegree(radian) - 90;
        layer.add(this.e);
        this.e.pos = pos.copy();

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 70, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 70, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//netsuの弾
class NBullet {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 30, Fortis.Game.canvasCfg.size.y / 22.5)), new Fortis.ImageMaterial("netsu-bullet"));
        layer.add(this.e);
        this.e.pos.y = pos.y + (Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 5) - Fortis.Game.canvasCfg.size.y / 10);
        this.e.pos.x = Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 4 / 5);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 50, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 40, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//gamingNetsuの弾
class GNBullet {
    constructor(layer, pos, speed, radian) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.y / 20)), new Fortis.ImageMaterial("netsu-gaming-bullet"));
        this.e.angle = Fortis.util.radianToDegree(radian) - 90;
        layer.add(this.e);
        this.e.pos = pos.copy();

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 70, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 50, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1 || this.e.pos.y < -Fortis.Game.canvasCfg.size.y / 5) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//雲の通常弾
class CBullet {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.y / 30)), new Fortis.ImageMaterial("cloud-bullet"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 70, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 55, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//雲の雷弾
class CLBullet {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 30, Fortis.Game.canvasCfg.size.y / 20)), new Fortis.ImageMaterial("cloud-lightning"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 2);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 60, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 55, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }
            speedDown = true;
            let id = Fortis.Timer.add(2000, false, speedDownReset);
            Fortis.Timer.start(id);

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//雲の風(天狗から流用)
class CWBullet {
    constructor(layer, pos, speed) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, Fortis.Game.canvasCfg.size.y / 10)), new Fortis.ImageMaterial("tengu-wind"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 40, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 30, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            this.speed.x *= -1;
            this.e.pos.x += this.speed.x * delta / 1000;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//ドラゴンノーマル
class DFBullet {
    constructor(layer, pos, speed) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("dragon-normal-bullet"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 70, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 60, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            this.speed.x *= -1;
            this.e.pos.x += this.speed.x * delta / 1000;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//ドラゴンのレーザー攻撃
class DLBullet {
    constructor(layer, pos, speed, radian) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 1;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("dragon-bullet"));
        this.e.angle = Fortis.util.radianToDegree(radian) - 90;
        layer.add(this.e);
        this.e.pos = pos.copy();

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 65, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 55, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}


//ドラゴンのやばい攻撃
class DRBullet {
    constructor(layer, pos, speed, radian) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("dragon-bullet"));
        this.e.angle = Fortis.util.radianToDegree(radian) - 90;
        layer.add(this.e);
        this.e.pos = pos.copy();

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 70, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 60, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//ドラゴンの拡散攻撃
class DSBullet {
    constructor(layer, pos, speed, radian) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("dragon-bullet"));
        this.e.angle = Fortis.util.radianToDegree(radian) - 90;
        layer.add(this.e);
        this.e.pos = pos.copy();

        this.layer = layer;
        this.speed = speed.copy();

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 70, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 60, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//ドラゴン火の弾
class DMBullet {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 7;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 7, Fortis.Game.canvasCfg.size.x / 7)), new Fortis.ImageMaterial("dragon-fire-bullet"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 2 + (Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 3)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 16, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 16, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.e.pos.y += this.speed.y * delta / 1000;
        if (this.e.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }
        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!invTime) {
                nowHP -= this.damage;
                changeHP();
                invTime = true;
                shieldIcon.alpha = 1;
                let id = Fortis.Timer.add(1500, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            Fortis.CollisionManager.remove(this.colId);
            this.layer.remove(this.e);
            delete nowBullets[this.id];
        }
    }
}

//天使の弾
class ABullet {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 5;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.y / 30)), new Fortis.ImageMaterial("a-bullet"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, -Fortis.Game.canvasCfg.size.y / 3);


        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 50, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 40, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = [];
        this.colEnemy = {};
        for (let key in nowEnemies) {
            let col = Fortis.CollisionManager.add(nowEnemies[key].cg, this.cg);
            this.colId.push(col);
            this.colEnemy[col] = nowEnemies[key];
        }

    }
    update(delta) {
        this.e.pos.y += this.speed.y * delta / 1000;

        if (this.e.pos.y < -Fortis.Game.canvasCfg.size.y / 5) {//画面外まで行った
            //Fortis.CollisionManager.remove(this.colId);
            for (let key in this.colId) {
                Fortis.CollisionManager.remove(this.colId[key]);
            }
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }

        for (let key in this.colId) {
            if (Fortis.CollisionManager.get(this.colId[key])["result"]) {//敵にに当たった
                this.colEnemy[this.colId[key]].hp -= this.damage + pDamage;
                changeEnemyHP();

                for (let key in this.colId) {
                    Fortis.CollisionManager.remove(this.colId[key]);
                }
                this.layer.remove(this.e);
                delete nowBullets[this.id];
                break;
            }
        }
    }
}


//格闘家の弾
class FBullet {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 5;

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.y / 30)), new Fortis.ImageMaterial("f-bullet"));
        layer.add(this.e);
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, -Fortis.Game.canvasCfg.size.y / 3);


        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 50, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 40, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);
        this.colId = [];
        this.colEnemy = {};
        for (let key in nowEnemies) {
            let col = Fortis.CollisionManager.add(nowEnemies[key].cg, this.cg);
            this.colId.push(col);
            this.colEnemy[col] = nowEnemies[key];
        }

    }
    update(delta) {
        this.e.pos.y += this.speed.y * delta / 1000 * (nowHP / pCharaData[charaKey[charaIndex]]["HP"] <= 0.5 ? 1.5 : 1);

        if (this.e.pos.y < -Fortis.Game.canvasCfg.size.y / 5) {//画面外まで行った
            //Fortis.CollisionManager.remove(this.colId);
            for (let key in this.colId) {
                Fortis.CollisionManager.remove(this.colId[key]);
            }
            this.layer.remove(this.e);
            delete nowBullets[this.id];
            return false;
        }

        for (let key in this.colId) {
            if (Fortis.CollisionManager.get(this.colId[key])["result"]) {//敵にに当たった
                this.colEnemy[this.colId[key]].hp -= this.damage + pDamage;
                changeEnemyHP();
                for (let key in this.colId) {
                    Fortis.CollisionManager.remove(this.colId[key]);
                }
                this.layer.remove(this.e);
                delete nowBullets[this.id];
                break;
            }
        }
    }
}