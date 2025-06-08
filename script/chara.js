let nowEnemies = {};

//敵キャラ
class TreBox {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowEnemies[this.id] = this;

        this.oriHP = 150;
        this.hp = 150;
        this.drop = Math.floor(Math.random() * 2);

        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, Fortis.Game.canvasCfg.size.y / 15)), new Fortis.ImageMaterial("tre-box"));
        layer.add(this.e);
        this.layer = layer;
        if (pos == null) {
            this.e.pos = new Fortis.Vector2();
        } else {
            this.e.pos = pos.copy();
        }
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, 0);
        this.alreadyInDisplay = false;

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 30, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 30, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);

        this.eTime = 0;//前回弾を発射させてからの経過時間
    }
    update(delta) {
        if (this.hp <= 0) {
            dropStrong(this.drop, this.e.pos.copy());
            eLayer.remove(this.e);
            delete nowEnemies[this.id];
            return false;
        }

        this.eTime += delta;
        if (this.eTime >= 1200) {
            this.eTime = 0;
            new TBBullet(eBLayer, this.e.pos.copy());
        }

        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            if (this.alreadyInDisplay) {
                this.speed.x *= -1;
                this.e.pos.x += this.speed.x * delta / 1000;
            }
        } else {
            this.alreadyInDisplay = true;
        }
    }
}

class Skeleton {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowEnemies[this.id] = this;
        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 25, Fortis.Game.canvasCfg.size.y / 12)), new Fortis.ImageMaterial("skeleton"));
        layer.add(this.e);
        this.layer = layer;

        this.oriHP = 200;
        this.hp = 200;
        this.drop = Math.floor(Math.random() * 3);

        if (pos == null) {
            this.e.pos = new Fortis.Vector2(-Fortis.Game.canvasCfg.size.x / 5, -Fortis.Game.canvasCfg.size.y / 5);
        } else {
            this.e.pos = pos.copy();
        }
        this.alreadyInDisplay = false;
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 8);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 50, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 24, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);

        this.eTime = 0;//前回弾を発射させてからの経過時間
    }
    update(delta) {
        if (this.hp <= 0) {
            dropStrong(this.drop, this.e.pos.copy());
            eLayer.remove(this.e);
            delete nowEnemies[this.id];
            return false;
        }
        this.eTime += delta;
        if (this.eTime >= 2500) {
            this.eTime = 0;
            let length = Fortis.Game.canvasCfg.size.y / 6;
            new SBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(0, length));
            new SBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(45)), length));
            new SBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(135)), length));
        }

        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            if (this.alreadyInDisplay) {
                this.speed.x *= -1;
                this.e.pos.x += this.speed.x * delta / 1000;
            }
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if ((this.e.pos.y + this.e.shape.size.y / 2 > borderY / 3) || (this.e.pos.y - this.e.shape.size.y / 2 < 0)) {
            if (this.alreadyInDisplay) {
                this.speed.y *= -1;
                this.e.pos.y += this.speed.y * delta / 1000;
            }
        }

        if (!((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) && !((this.e.pos.y + this.e.shape.size.y / 2 > borderY / 3) || (this.e.pos.y - this.e.shape.size.y / 2 < 0))) {
            this.alreadyInDisplay = true;
        }
    }
}

class Butterfly {
    constructor(layer) {
        this.id = Fortis.util.randomID();
        nowEnemies[this.id] = this;
        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, Fortis.Game.canvasCfg.size.y / 15)), new Fortis.ImageMaterial("butterfly"));
        layer.add(this.e);
        this.layer = layer;

        this.oriHP = 200;
        this.hp = 200;
        this.drop = Math.floor(Math.random() * 2);

        let randomPos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 2 / 5) + Fortis.Game.canvasCfg.size.x / 5, Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 4) + Fortis.Game.canvasCfg.size.y / 8)
        this.e.pos = randomPos.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 5);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 30, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 30, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);

        this.eTime = 0;//前回弾を発射させてからの経過時間
    }
    update(delta) {
        if (this.hp <= 0) {
            dropStrong(this.drop, this.e.pos.copy());
            eLayer.remove(this.e);
            delete nowEnemies[this.id];
            return false;
        }
        this.eTime += delta;
        if (this.eTime >= 2000) {
            this.eTime = 0;
            new BBullet(eBLayer, this.e.pos.copy());
        }

        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            this.speed.x *= -1;
            this.e.pos.x += this.speed.x * delta / 1000;
        }
        this.e.pos.y += this.speed.y * delta / 1000;
        if ((this.e.pos.y + this.e.shape.size.y / 2 > borderY / 2) || (this.e.pos.y - this.e.shape.size.y / 2 < 0)) {
            this.speed.y *= -1;
            this.e.pos.y += this.speed.y * delta / 1000;
        }
    }
}

class Bee {
    constructor(layer) {
        this.id = Fortis.util.randomID();
        nowEnemies[this.id] = this;
        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, Fortis.Game.canvasCfg.size.y / 15)), new Fortis.ImageMaterial("bee"));
        layer.add(this.e);
        this.layer = layer;

        this.oriHP = 3200;
        this.hp = 3200;
        this.drop = Math.floor(Math.random() * 5)+4;

        this.e.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, -Fortis.Game.canvasCfg.size.y / 50);
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, 0);
        this.status = true;//移動中かどうか
        this.t = Fortis.TransitionManager.add(this.e.pos, "y", 1200, -Fortis.Game.canvasCfg.size.y / 50, Fortis.Game.canvasCfg.size.y / 10);
        Fortis.TransitionManager.start(this.t);
        this.destination = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 10);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 30, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 30, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.twTime = 0;//3wayの時間
    }
    update(delta) {
        if (this.hp <= 0) {
            dropStrong(this.drop, this.e.pos.copy());
            eLayer.remove(this.e);
            delete nowEnemies[this.id];
            return false;
        }
        if (this.status) {
            this.eTime += delta;

            if (this.eTime >= 1400) {
                this.eTime = 0;
                let length = Fortis.Game.canvasCfg.size.y / 6;
                new BHBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(0, length));
                new BHBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(45)), length));
                new BHBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(135)), length));
            }

            if ((this.e.pos.x == this.destination.x) && (this.e.pos.y == this.destination.y)) {
                this.eTime = 3000;//ここから減らす
                this.twTime = 0;
                this.status = false;
            }
        } else {
            this.twTime += delta;
            if (this.twTime >= 1400) {
                this.twTime = 0;
                let length = Fortis.Game.canvasCfg.size.y / 6;
                new BHBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(0, length));
                new BHBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(45)), length));
                new BHBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(135)), length));
            }

            if (this.eTime == 3000) {
                let pPos = pChara.e.pos.copy();
                let distance = pPos.copy().sub(this.e.pos);
                let radian = Math.atan2(distance.y, distance.x);

                let random = Math.floor(Math.random() * 2);
                let tmpSpeed = Fortis.Game.canvasCfg.size.y / 3;
                switch (random) {

                    case 0:
                        for (let i = 1; i <= 16; i++) {
                            let speed = new Fortis.Vector2(tmpSpeed * Math.cos(radian) * (1 + i / 8), tmpSpeed * Math.sin(radian) * (1 + i / 8));
                            speed.cleanFloat(7);
                            new BLBullet(eBLayer, this.e.pos, speed, radian);
                        }
                        break;
                    case 1:
                        for (let i = 1; i < 32; i++) {
                            let randomPos = new Fortis.Vector2(this.e.pos.x + Math.floor(Math.random() * (Fortis.Game.canvasCfg.size.x / 2)) - Fortis.Game.canvasCfg.size.x / 4, this.e.pos.y + Math.floor(Math.random() * (Fortis.Game.canvasCfg.size.y / 5)) - Fortis.Game.canvasCfg.size.y / 10);
                            let distance2 = pPos.copy().add(new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 2)).sub(randomPos);
                            let radian2 = Math.atan2(distance2.y, distance2.x);
                            let speed = new Fortis.Vector2(tmpSpeed * Math.cos(radian2) * 1.5, tmpSpeed * Math.sin(radian2) * 1.5);
                            speed.cleanFloat(7);
                            new BRBullet(eBLayer, randomPos, speed, radian2);
                        }
                        break;
                }
            }
            this.eTime -= delta;
            if (this.eTime < 0) {
                this.eTime = 0;
                this.status = true;
                this.destination = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 2 / 5) + Fortis.Game.canvasCfg.size.x / 5, Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 4) + Fortis.Game.canvasCfg.size.y / 8);
                this.t = Fortis.TransitionManager.add(this.e, "pos", 2000, this.e.pos.copy(), this.destination.copy());
                Fortis.TransitionManager.start(this.t);
            }
        }
    }
}

class Netsu {
    constructor(layer) {
        this.id = Fortis.util.randomID();
        nowEnemies[this.id] = this;
        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 25, Fortis.Game.canvasCfg.size.y / 15)), new Fortis.ImageMaterial("netsu"));
        layer.add(this.e);
        this.layer = layer;

        this.oriHP = 1200;
        this.hp = 1200;
        this.drop = Math.floor(Math.random() * 4)+3;

        this.e.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, -Fortis.Game.canvasCfg.size.y / 50);
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 30, 0);
        this.status = true;//移動中かどうか
        this.t = Fortis.TransitionManager.add(this.e.pos, "y", 1200, -Fortis.Game.canvasCfg.size.y / 50, Fortis.Game.canvasCfg.size.y / 10);
        Fortis.TransitionManager.start(this.t);
        this.destination = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 10);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 50, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 30, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.gTime = 0;//3wayの時間
    }
    update(delta) {
        if (this.hp <= 0) {
            dropStrong(this.drop, this.e.pos.copy());
            eLayer.remove(this.e);
            delete nowEnemies[this.id];
            return false;
        }
        if (this.status) {
            this.eTime += delta;

            if (this.eTime >= 200) {
                this.eTime = 0;
                for (let a = 0; a < 2; a++) {
                    let tmpSpeed = Fortis.Game.canvasCfg.size.y / 6;
                    let pos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 4 / 5), Fortis.Game.canvasCfg.size.y / 3);
                    for (let i = 0; i < 3; i++) {
                        let randomRad = Fortis.util.degreeToRadian(Math.floor(Math.random() * 360));
                        let speed = new Fortis.Vector2(tmpSpeed * Math.cos(randomRad), tmpSpeed * Math.sin(randomRad));
                        new GNBullet(eBLayer, pos.copy(), speed, randomRad);
                    }
                }
            }

            if ((this.e.pos.x == this.destination.x) && (this.e.pos.y == this.destination.y)) {
                this.eTime = 0;
                this.gTime = 0;
                this.status = false;
            }
        } else {
            this.gTime += delta;
            this.eTime += delta;
            if (this.gTime >= 1000) {
                this.gTime = 0;
                for (let i = 0; i < 4; i++) {
                    new NBullet(eBLayer, this.e.pos.copy());
                }

            }

            if (this.eTime >= 3000) {
                this.eTime = 0;
                for (let a = 0; a < 2; a++) {
                    let tmpSpeed = Fortis.Game.canvasCfg.size.y / 6;
                    let pos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 4 / 5), Fortis.Game.canvasCfg.size.y / 3);
                    for (let i = 0; i < 15; i++) {
                        let randomRad = Fortis.util.degreeToRadian(Math.floor(Math.random() * 360));
                        let speed = new Fortis.Vector2(tmpSpeed * Math.cos(randomRad), tmpSpeed * Math.sin(randomRad));
                        new GNBullet(eBLayer, pos.copy(), speed, randomRad);
                    }
                }
            }

            this.e.pos.x += this.speed.x * delta / 1000;
            if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX - Fortis.Game.canvasCfg.size.x / 6) || (this.e.pos.x - this.e.shape.size.x / 2 < Fortis.Game.canvasCfg.size.x / 6)) {
                this.speed.x *= -1;
                this.e.pos.x += this.speed.x * delta / 1000;
            }
        }
    }
}

class Cloud {
    constructor(layer) {
        this.id = Fortis.util.randomID();
        nowEnemies[this.id] = this;
        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, Fortis.Game.canvasCfg.size.y / 15)), new Fortis.ImageMaterial("cloud"));
        layer.add(this.e);
        this.layer = layer;

        this.oriHP = 400;
        this.hp = 400;
        this.drop = Math.floor(Math.random() * 2)+1;

        this.e.pos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 3 / 5) + Fortis.Game.canvasCfg.size.x / 10, Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 3 + Fortis.Game.canvasCfg.size.y / 30));
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10 + Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x / 15), 0);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 30, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 30, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.rTime = 0;//ランダム攻撃の時間
    }
    update(delta) {
        if (this.hp <= 0) {
            dropStrong(this.drop, this.e.pos.copy());
            eLayer.remove(this.e);
            delete nowEnemies[this.id];
            return false;
        }
        this.eTime += delta;
        this.rTime += delta;
        if (this.eTime >= 1200) {
            this.eTime = 0;
            let random = Math.floor(Math.random() * 8);
            if (random == 0) {
                new CLBullet(eBLayer, this.e.pos.copy());
            } else if (random == 1) {
                let length = Fortis.Game.canvasCfg.size.y / 6;
                new CWBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(45)), length));
            } else {
                new CBullet(eBLayer, this.e.pos.copy());
            }
        }

        if (this.rTime >= 3500) {
            this.rTime = 0;

            let random = Math.floor(Math.random() * 3);
            switch (random) {
                case 0://雨
                    for (let i = 1; i <= 7; i++) {
                        let randomPos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 4 / 5), this.e.pos.y + (Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 5) - Fortis.Game.canvasCfg.size.y / 10));
                        new CBullet(eBLayer, randomPos);
                    }
                    break;
                case 1://雷
                case 2:
                    for (let i = 1; i < 5; i++) {
                        let randomPos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 4 / 5), this.e.pos.y + (Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 5) - Fortis.Game.canvasCfg.size.y / 10));
                        new CLBullet(eBLayer, randomPos);
                    }
                    break;
            }
        }

        this.e.pos.x += this.speed.x * delta / 1000;
        if ((this.e.pos.x + this.e.shape.size.x / 2 > borderX) || (this.e.pos.x - this.e.shape.size.x / 2 < 0)) {
            this.speed.x *= -1;
            this.e.pos.x += this.speed.x * delta / 1000;
        }
    }
}

class Dragon {
    constructor(layer) {
        this.id = Fortis.util.randomID();
        nowEnemies[this.id] = this;
        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 7, Fortis.Game.canvasCfg.size.y / 6)), new Fortis.ImageMaterial("dragon"));
        layer.add(this.e);
        this.layer = layer;

        this.oriHP = 6000;
        this.hp = 6000;
        this.drop = Math.floor(Math.random() * 5)+15;

        this.e.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, -Fortis.Game.canvasCfg.size.y / 50);
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, 0);
        this.status = true;//移動中かどうか
        this.t = Fortis.TransitionManager.add(this.e.pos, "y", 1200, -Fortis.Game.canvasCfg.size.y / 50, Fortis.Game.canvasCfg.size.y / 10);
        Fortis.TransitionManager.start(this.t);
        this.destination = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 10);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 14, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 15, 3));
        this.cg.add(this.c);
        this.cg.link(this.e);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.twTime = 0;//3wayの時間
    }
    update(delta) {
        if (this.hp <= 0) {
            dropStrong(this.drop, this.e.pos.copy());
            eLayer.remove(this.e);
            delete nowEnemies[this.id];
            return false;
        }
        if (this.status) {
            this.eTime += delta;

            if (this.eTime >= 400) {
                this.eTime = 0;
                let length = Fortis.Game.canvasCfg.size.y / 6;
                new DFBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(0, length));
                new DFBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(45)), length));
                new DFBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(135)), length));
                let random = Math.floor(Math.random() * 4);
                if (random == 1) {
                    for (let i = 0; i < 2; i++) {
                        let pos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 3 / 5) + Fortis.Game.canvasCfg.size.x / 10, 0);
                        new DMBullet(eBLayer, pos.copy());
                    }
                }
            }

            if ((this.e.pos.x == this.destination.x) && (this.e.pos.y == this.destination.y)) {
                this.eTime = 1200;//ここから減らす
                this.twTime = 0;
                this.status = false;
            }
        } else {
            this.twTime += delta;
            if (this.twTime >= 400) {
                this.twTime = 0;
                let length = Fortis.Game.canvasCfg.size.y / 6;
                new DFBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(0, length));
                new DFBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(45)), length));
                new DFBullet(eBLayer, this.e.pos.copy(), new Fortis.Vector2(length * Math.cos(Fortis.util.degreeToRadian(135)), length));
                let random = Math.floor(Math.random() * 3);
                if (random == 1) {
                    for (let i = 0; i < 2; i++) {
                        let pos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 3 / 5) + Fortis.Game.canvasCfg.size.x / 10, 0);
                        new DMBullet(eBLayer, pos.copy());
                    }
                }
            }

            if (this.eTime == 1200) {
                let pPos = pChara.e.pos.copy();
                let distance = pPos.copy().sub(this.e.pos);
                let radian = Math.atan2(distance.y, distance.x);

                let random = Math.floor(Math.random() * 3);
                let tmpSpeed = Fortis.Game.canvasCfg.size.y / 3;
                switch (random) {
                    case 0://レーザー
                        for (let i = 1; i <= 16; i++) {
                            let speed = new Fortis.Vector2(tmpSpeed * Math.cos(radian) * (1 + i / 8), tmpSpeed * Math.sin(radian) * (1 + i / 8));
                            speed.cleanFloat(7);
                            new DLBullet(eBLayer, this.e.pos, speed, radian);
                        }
                        break;
                    case 1://集中
                        for (let i = 1; i < 20; i++) {
                            let randomPos = new Fortis.Vector2(this.e.pos.x + Math.floor(Math.random() * (Fortis.Game.canvasCfg.size.x / 2)) - Fortis.Game.canvasCfg.size.x / 4, this.e.pos.y + Math.floor(Math.random() * (Fortis.Game.canvasCfg.size.y / 5)) - Fortis.Game.canvasCfg.size.y / 10);
                            let distance2 = pPos.copy().add(new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 2)).sub(randomPos);
                            let radian2 = Math.atan2(distance2.y, distance2.x);
                            let speed = new Fortis.Vector2(tmpSpeed * Math.cos(radian2) * 1.5, tmpSpeed * Math.sin(radian2) * 1.5);
                            speed.cleanFloat(7);
                            new DLBullet(eBLayer, randomPos, speed, radian2);
                        }
                        break;
                    case 2://拡散
                        for (let i = 1; i < 16; i++) {
                            let randomRad = Fortis.util.degreeToRadian(Math.floor(Math.random() * 90) + 45);
                            let speed = new Fortis.Vector2(tmpSpeed * Math.cos(randomRad), tmpSpeed * Math.sin(randomRad));
                            speed.cleanFloat(7);
                            new DSBullet(eBLayer, this.e.pos.copy(), speed, randomRad);
                        }
                        break;
                }
            }
            this.eTime -= delta;
            if (this.eTime < 0) {
                this.eTime = 0;
                this.status = true;
                this.destination = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 2 / 5) + Fortis.Game.canvasCfg.size.x / 5, Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 5));
                this.t = Fortis.TransitionManager.add(this.e, "pos", 1200, this.e.pos.copy(), this.destination.copy());
                Fortis.TransitionManager.start(this.t);
            }
        }
    }
}

//プレイヤー
class Player {
    constructor() {
        this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 20, Fortis.Game.canvasCfg.size.y / 20)), new Fortis.ImageMaterial(charaKey[charaIndex]));
        this.e.pos = pInitPos.copy();
        pLayer.add(this.e);
        this.cg = new Fortis.ColliderGroup();
        this.cc = new Fortis.RectCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 150, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 150, 3));
        this.cc.distance = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 40);
        this.cg.add(this.cc);
        this.cg.link(this.e);
    }
}