let mouseCG, mouseCR;//マウスの当たり判定

let tScene, tUILayer;//シーンとレイヤー

let titleText,titleTFont;

let startFont, startText;

//説明ボタン
let eBRect, eBText,eBTFont;
let eBColG,eBCol;
let mAndEB;

function title() {
    tScene = new Fortis.Scene();
    Fortis.Game.setScene(tScene);
    tUILayer = tScene.getUI();

    //マウスの当たり判定
    mouseCG = new Fortis.ColliderGroup();
    mouseCR = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.y / 250, Fortis.Game.canvasCfg.size.y / 250);
    mouseCG.add(mouseCR);

    titleTFont = new Fortis.Font("DotGothic16", 100);
    titleText = new Fortis.Entity(new Fortis.TextShape(titleTFont, "弾幕ゲーム(Beta)"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    titleText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 3);

    startFont = new Fortis.Font("DotGothic16", 20);
    startText = new Fortis.Entity(new Fortis.TextShape(startFont, "Press space key to start."), new Fortis.ColorMaterial(new Fortis.Color("white")));
    startText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 2 / 3);
    startText.alpha = 0.8;

    eBRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
    eBRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x*9/10, Fortis.Game.canvasCfg.size.y*14 / 15);
    eBTFont= new Fortis.Font("DotGothic16", 25);
    eBText = new Fortis.Entity(new Fortis.TextShape(eBTFont, "説明"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    eBText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x*9/10, Fortis.Game.canvasCfg.size.y*14 / 15);
    eBColG = new Fortis.ColliderGroup();
    eBColG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x*9/10, Fortis.Game.canvasCfg.size.y*14 / 15);
    eBCol = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15);
    eBColG.add(eBCol);
    mAndEB = Fortis.CollisionManager.add(mouseCG, eBColG);

    tUILayer.addEntities([titleText,startText,eBRect,eBText]);
}

function tUpdate() {
    mouseCG.pos = Fortis.Game.mouse.pos.copy();

    if (Fortis.CollisionManager.get(mAndEB)["result"]) {
        if (Fortis.Game.mouse.fFrameatClick) {
            location.href = "https://kaede-maple3.github.io/DanmakuBeta/explain/explain.html";
        }
        eBRect.material.fill = new Fortis.Color("#151515");
    } else {
        eBRect.material.fill = new Fortis.Color("#252525");
    }
}