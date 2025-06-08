let pScene, eLayer, eBLayer, pLayer, UILayer;//シーンとレイヤー

let borderX;//右側のボーダーライン
let borderY;//下のボーダー

//文字表示関係
let ScoreBoard;//スコアなどを表示させるとこ
let HPText, HPTFont;//「HP」のテキスト
let tHPText, tHPTFont;//HPのテキスト
let healIcon;//ヒールアイコン
let shieldIcon;//シールド(無敵)アイコン

//プレイヤー関係
let pChara;//プレイヤーのキャラクター
let pColGroup, pColCirc;//プレイヤーの当たり判定
let pInitPos;//プレイヤーの初期位置
let pSpeed;//プレイヤーの速度
let shift;//しゃがんでいるか
let invTime;//無敵時間か
let speedDown;//速度が下がっているか
let nowHP;//現在のHP
let attckCT;//攻撃のクールタイム
let nowACT;//現在の攻撃クールタイム
let pDamage;//プレイヤーの攻撃力

let nowPhase;//現在のフェーズ
let alreadyStarted;//スタートしたか
let finished;//終わったか

let sTimer;//スタートまでのタイマー
let cTime;//タイム

let enemyRHPText, enemyRHPTFont, enemyRHP, enemyRHPFont;//残りの敵の総HP

//strong
let nowStrong = {};//{id:{e:entity,cg:cg,c:c,colId:colId}}


function ResetToPlay() {
        pScene = new Fortis.Scene();
        Fortis.Game.setScene(pScene);

        eLayer = new Fortis.Layer();
        pScene.add(eLayer);
        eBLayer = new Fortis.Layer();
        pScene.add(eBLayer);
        pLayer = new Fortis.Layer();
        pScene.add(pLayer);
        UILayer = new Fortis.Layer();
        pScene.add(UILayer);

        //開発時ののみ
        //charaIndex = 0;
        //stageIndex = 1;

        //初期設定
        //プレイヤー
        pInitPos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y * 4 / 5);
        shift = false;
        speedDown = false;
        invTime = false;
        attckCT = 100;
        nowACT = 0;
        nowHP = pCharaData[charaKey[charaIndex]]["HP"];
        pDamage = 0;
        //その他
        nowPhase = 0;

        //スコアなど文字関係
        //スコアなどを表示させるところ
        ScoreBoard = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
        ScoreBoard.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y / 2);
        //HPの文字
        HPTFont = new Fortis.Font("DotGothic16", 25);
        HPText = new Fortis.Entity(new Fortis.TextShape(HPTFont, "プレイヤーHP"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        HPText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y / 10);
        //HP
        tHPTFont = new Fortis.Font("DotGothic16", 20);
        tHPText = new Fortis.Entity(new Fortis.TextShape(tHPTFont, "100/100"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        tHPText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y * 3 / 20);
        changeHP();
        //ヒール
        healIcon = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 20, Fortis.Game.canvasCfg.size.y / 20)), new Fortis.ImageMaterial("heal"));
        healIcon.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y * 1 / 5);
        healIcon.alpha = 0;
        //シールド
        shieldIcon = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 30, Fortis.Game.canvasCfg.size.y / 20)), new Fortis.ImageMaterial("shield"));
        shieldIcon.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 287 / 320, Fortis.Game.canvasCfg.size.y * 3 / 10);
        shieldIcon.alpha = 0;

        borderX = Fortis.Game.canvasCfg.size.x * 4 / 5;
        borderY = Fortis.Game.canvasCfg.size.y;


        //プレイヤー
        pChara = new Player();
        pSpeed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 4);

        if (charaKey[charaIndex] == "angel") {
                let timer = Fortis.Timer.add(30000, true, HealHP);
                Fortis.Timer.start(timer);
        }


        //敵の残りの総HP
        enemyRHPTFont = new Fortis.Font("DotGothic16", 25);
        enemyRHPText = new Fortis.Entity(new Fortis.TextShape(enemyRHPTFont, "敵全体のHP"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        enemyRHPText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y * 8 / 10);
        enemyRHPFont = new Fortis.Font("DotGothic16", 20);
        enemyRHP = new Fortis.Entity(new Fortis.TextShape(enemyRHPFont, "n/n"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        enemyRHP.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y * 17 / 20);
        enemyRHP.alpha = 0;

        UILayer.addEntities([ScoreBoard, HPText, tHPText, healIcon, shieldIcon, enemyRHPText, enemyRHP]);


        sTimer = Fortis.Timer.add(2000, false, Start);
        Fortis.Timer.start(sTimer);
        alreadyStarted = false;
        finished = false;
        cTime = 0;
}

function pUpdate(delta) {
        if (!finished) {
                keyPush(delta);

                enemyUpdate(delta);

                for (let strong in nowStrong) {
                        nowStrong[strong].update(delta);
                }

                if (charaKey[charaIndex] == "fighter" && nowHP / pCharaData[charaKey[charaIndex]]["HP"] <= 0.5) {
                        attckCT = 66;
                }

                if (alreadyStarted) {
                        cTime += delta;

                        if (Object.keys(nowEnemies).length == 0) {
                                nowPhase++;
                                spawn();
                        }
                        if (nowHP <= 0) {
                                gameOver();
                        }
                        if (nowPhase == 5 && Object.keys(nowEnemies).length == 0) {
                                gameClear();
                        }
                }
        }
}

function keyPush(delta) {
        if (Fortis.InputKey["KeyA"] || Fortis.InputKey["ArrowLeft"]) {//left
                if (pChara.e.pos.x > 0) {
                        pChara.e.pos.x -= pSpeed.x * delta / 1000 * (shift ? 0.5 : 1) * (speedDown ? 0.45 : 1);
                }
        }

        if (Fortis.InputKey["KeyD"] || Fortis.InputKey["ArrowRight"]) {//right
                if (pChara.e.pos.x < Fortis.Game.canvasCfg.size.x * 4 / 5) {
                        pChara.e.pos.x += pSpeed.x * delta / 1000 * (shift ? 0.5 : 1) * (speedDown ? 0.45 : 1);
                }
        }

        if (Fortis.InputKey["KeyW"] || Fortis.InputKey["ArrowUp"]) {//up
                if (pChara.e.pos.y > 0) {
                        pChara.e.pos.y -= pSpeed.y * delta / 1000 * (shift ? 0.5 : 1) * (speedDown ? 0.45 : 1);
                }
        }

        if (Fortis.InputKey["KeyS"] || Fortis.InputKey["ArrowDown"]) {//down
                if (pChara.e.pos.y < Fortis.Game.canvasCfg.size.y) {
                        pChara.e.pos.y += pSpeed.y * delta / 1000 * (shift ? 0.5 : 1) * (speedDown ? 0.45 : 1);
                }
        }

        if (Fortis.InputKey["ShiftLeft"]) {//シフト
                shift = true;
        } else {
                shift = false;
        }

        if (Fortis.InputKey["Space"]) {//攻撃
                nowACT += delta;
                if (nowACT >= attckCT) {
                        nowACT = 0;
                        attack();
                }
        }
}

function enemyUpdate(delta) {
        for (enemy in nowEnemies) {
                nowEnemies[enemy].update(delta);
        }
        for (bullet in nowBullets) {
                nowBullets[bullet].update(delta);
        }
}

function changeHP() {
        tHPText.shape.text = nowHP + "/" + pCharaData[charaKey[charaIndex]]["HP"];
}

function speedDownReset() {
        speedDown = false;
}

function invTimeReset() {
        invTime = false;
        shieldIcon.alpha = 0;
}

function attack() {
        switch (charaIndex) {
                case 0:
                        new ABullet(eBLayer, pChara.e.pos.copy());
                        break;
                case 1:
                        new FBullet(eBLayer, pChara.e.pos.copy());
                        break;
        }
}

function HealHP() {
        if (nowHP == pCharaData[charaKey[charaIndex]]["HP"]) {
                nowHP = pCharaData[charaKey[charaIndex]]["HP"];
        } else {
                nowHP++;
                changeHP();
                healIcon.alpha = 1;
                let timer = Fortis.Timer.add(1000, false, hideHealIcon);
                Fortis.Timer.start(timer);
        }
}

function hideHealIcon() {
        healIcon.alpha = 0;
}

function dropStrong(n, pos) {
        for (let i = 0; i < n; i++) {
                new Strong(pos);
        }
}

class Strong {
        constructor(pos) {
                this.id = Fortis.util.randomID();
                nowStrong[this.id] = this;

                this.e = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.y / 30)), new Fortis.ImageMaterial("strong"));
                eBLayer.add(this.e);
                this.e.pos = pos.copy().add(new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x / 20) - Fortis.Game.canvasCfg.size.x / 40, Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 10) - Fortis.Game.canvasCfg.size.y / 20));

                this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 8 * (Math.floor(Math.random() * 3) / 10 + 0.7));

                this.cg = new Fortis.ColliderGroup();
                this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 50, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 40, 3));
                this.cg.add(this.c);
                this.cg.link(this.e);
                this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
        }
        update(delta) {
                this.e.pos.y += this.speed.y * delta / 1000;

                if (this.e.pos.y < -Fortis.Game.canvasCfg.size.y / 5) {//画面外まで行った
                        //Fortis.CollisionManager.remove(this.colId);
                        for (let key in this.colId) {
                                Fortis.CollisionManager.remove(this.colId[key]);
                        }
                        eBLayer.remove(this.e);
                        delete nowStrong[this.id];
                        return false;
                }

                if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
                        pDamage++;
                        console.log(pDamage)

                        eBLayer.remove(this.e);
                        delete nowStrong[this.id];
                        return false;
                }
        }
}

function spawn() {
        switch (nowPhase) {
                case 0:
                        for (let i = 0; i < 4; i++) {
                                new TreBox(eLayer, new Fortis.Vector2(-80 * (i + 1), 100));
                        }
                        break;
                case 1:
                        for (let i = 0; i < 3; i++) {
                                new Skeleton(eLayer, new Fortis.Vector2(-80 * (i + 1), -80 * i));
                        }
                        for (let i = 0; i < 2; i++) {
                                new Butterfly(eLayer);
                        }
                        break;
                case 2:
                        if (stageIndex == 0) {
                                for (let i = 0; i < 3; i++) {
                                        new Cloud(eLayer);
                                }
                        } else {
                                new Netsu(eLayer);
                        }
                        break;
                case 3:
                        for (let i = 0; i < 2; i++) {
                                new TreBox(eLayer, new Fortis.Vector2(-80 * (i + 1), 100));
                        }
                        for (let i = 0; i < 2; i++) {
                                new Skeleton(eLayer, new Fortis.Vector2(-80 * (i + 1), -80 * i));
                        }
                        for (let i = 0; i < 2; i++) {
                                new Butterfly(eLayer);
                        }
                        break;
                case 4:
                        if (stageIndex == 0) {
                                new Dragon(eLayer);
                        } else {
                                for (let i = 0; i < 2; i++) {
                                        new Bee(eLayer);
                                }
                        }
                        break;
        }
}

function Start() {
        alreadyStarted = true;
        spawn();
}

function changeEnemyHP() {
        let enemyOriHP = 0;
        let enemyHP = 0;
        for (let key in nowEnemies) {
                enemyOriHP += nowEnemies[key].oriHP;
                enemyHP += nowEnemies[key].hp;
        }
        enemyRHP.shape.text = enemyHP + "/" + enemyOriHP;
        enemyRHP.alpha = 1;
}

function gameOver() {
        finished = true;

        let bg = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
        bg.alpha = 0.8;

        let goFont = new Fortis.Font("DotGothic16", 100);
        let go = new Fortis.Entity(new Fortis.TextShape(goFont, "Game Over"), new Fortis.ColorMaterial(new Fortis.Color("#b84840")));
        go.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 3 / 10);

        let thxFont = new Fortis.Font("DotGothic16", 50);
        let thx = new Fortis.Entity(new Fortis.TextShape(thxFont, "Thank you for playing!"), new Fortis.ColorMaterial(new Fortis.Color("#53c951")));
        thx.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 5 / 10);

        let restartFont = new Fortis.Font("DotGothic16", 30);
        let restart = new Fortis.Entity(new Fortis.TextShape(restartFont, "Reload to restart."), new Fortis.ColorMaterial(new Fortis.Color("#53c951")));
        restart.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 7 / 10);

        UILayer.addEntities([bg, go, thx, restart]);
}

function gameClear() {
        finished = true;

        let bg = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
        bg.alpha = 0.8;

        let gcFont = new Fortis.Font("DotGothic16", 100);
        let gc = new Fortis.Entity(new Fortis.TextShape(gcFont, "Game Clear"), new Fortis.ColorMaterial(new Fortis.Color("#d9d934")));
        gc.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 3 / 10);

        let thxFont = new Fortis.Font("DotGothic16", 50);
        let thx = new Fortis.Entity(new Fortis.TextShape(thxFont, "Thank you for playing!"), new Fortis.ColorMaterial(new Fortis.Color("#53c951")));
        thx.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 5 / 10);

        let restartFont = new Fortis.Font("DotGothic16", 30);
        let restart = new Fortis.Entity(new Fortis.TextShape(restartFont, "Reload to restart."), new Fortis.ColorMaterial(new Fortis.Color("#53c951")));
        restart.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 7 / 10);

        let timeFont = new Fortis.Font("DotGothic16", 30);
        let timeText = new Fortis.Entity(new Fortis.TextShape(timeFont, "クリアまでの時間："+Fortis.util.cleanFloat(cTime/1000,2)+"秒"), new Fortis.ColorMaterial(new Fortis.Color("#53c951")));
        timeText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 8 / 10);

        UILayer.addEntities([bg, gc, thx, timeText]);
}
