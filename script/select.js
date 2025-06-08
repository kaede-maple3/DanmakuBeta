//0：ミミック,1：スケルトン,2：バタフライ,3：雲,4：ねつ,5：蜂,6：ドラゴン
let stageData = [
        {
            "name": "ステージ１",
            "enemy": [
                {
                    "0": 4,
                },
                {
                    "1": 3,
                    "2": 2
                },
                {
                    "3": 3
                },
                {
                    "0": 2,
                    "1": 2,
                    "2": 2
                },
                {
                    "6": 1
                }
            ]
        },
        {
            "name": "ステージ２",
            "enemy": [
                {
                    "0": 4,
                },
                {
                    "1": 3,
                    "2": 2
                },
                {
                    "4": 1
                },
                {
                    "0": 2,
                    "1": 2,
                    "2": 2
                },
                {
                    "5": 2
                }
            ]
        }
    ]
    
    let stageIndex;
    
    let sSScene;//シーン
    let sSUILayer;//UIのレイヤー
    
    let sSelectRect1, sSelectRect2;//セレクトボックス
    
    let sSTitleRect, sSTitle, sSTFont;//ステージセレクトのタイトル
    
    let stageTitle1, stageTitle2, stageTitleFont;//ステージの名前
    
    let dragonSS, beeSS;//ステージセレクトの画像
    
    let sSButtonR1, sSButtonT1, sSB1ColG, sSB1Col, sSButtonR2, sSButtonT2, sSB2ColG, sSB2Col, sSButtonFont;//ステージセレクトのボタン
    
    let mAndSSB1, mAndSSB2;//当たり判定のkey
    
    function sSelectReset() {
        sSScene = new Fortis.Scene();
        Fortis.Game.setScene(sSScene);
        sSUILayer = sSScene.getUI();
    
        sSTitleRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y * 3 / 40), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
        sSTitleRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 12);
    
        sSTFont = new Fortis.Font("DotGothic16", 20);
        sSTitle = new Fortis.Entity(new Fortis.TextShape(sSTFont, "ステージセレクト"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        sSTitle.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 12);
    
        sSelectRect1 = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 8 / 20, Fortis.Game.canvasCfg.size.y * 15 / 20), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
        sSelectRect1.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y * 11 / 20);
    
        sSelectRect2 = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 8 / 20, Fortis.Game.canvasCfg.size.y * 15 / 20), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
        sSelectRect2.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y * 11 / 20);
    
        stageTitleFont = new Fortis.Font("DotGothic16", 24);
        stageTitle1 = new Fortis.Entity(new Fortis.TextShape(stageTitleFont, "ドラゴンステージ"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        stageTitle1.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 4);
        stageTitle2 = new Fortis.Entity(new Fortis.TextShape(stageTitleFont, "ハチステージ"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        stageTitle2.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y / 4);
    
        dragonSS = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 4)), new Fortis.ImageMaterial("dragon"));
        dragonSS.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 2);
    
        beeSS = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 6, Fortis.Game.canvasCfg.size.y / 6)), new Fortis.ImageMaterial("bee"));
        beeSS.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y / 2);
    
        sSButtonFont = new Fortis.Font("DotGothic16", 24);
        sSButtonR1 = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15), new Fortis.ColorMaterial(new Fortis.Color("#454545")));
        sSButtonR1.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y * 13 / 16);
        sSB1ColG = new Fortis.ColliderGroup();
        sSB1Col = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15);
        sSB1ColG.add(sSB1Col);
        sSB1ColG.link(sSButtonR1);
        sSButtonT1 = new Fortis.Entity(new Fortis.TextShape(sSButtonFont, "次へ"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        sSButtonT1.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y * 13 / 16);
    
        sSButtonR2 = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15), new Fortis.ColorMaterial(new Fortis.Color("#454545")));
        sSButtonR2.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y * 13 / 16);
        sSButtonT2 = new Fortis.Entity(new Fortis.TextShape(sSButtonFont, "次へ"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        sSButtonT2.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y * 13 / 16);
        sSB2ColG = new Fortis.ColliderGroup();
        sSB2Col = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15);
        sSB2ColG.add(sSB2Col);
        sSB2ColG.link(sSButtonR2);
    
        mAndSSB1 = Fortis.CollisionManager.add(mouseCG, sSB1ColG);
        mAndSSB2 = Fortis.CollisionManager.add(mouseCG, sSB2ColG);
    
        sSUILayer.addEntities([sSelectRect1, sSelectRect2, sSTitleRect, sSTitle, stageTitle1, stageTitle2, dragonSS, beeSS, sSButtonR1, sSButtonT1, sSButtonR2, sSButtonT2]);
    }
    
    function sSUpdate() {
        mouseCG.pos = Fortis.Game.mouse.pos.copy();
    
        if (Fortis.CollisionManager.get(mAndSSB1)["result"]) {
            if (Fortis.Game.mouse.fFrameatClick) {
                stageIndex = 0;
                nowScene = "cSelect";
                cSelectReset();
            }
            sSButtonR1.material.fill = new Fortis.Color("#151515");
        } else {
            sSButtonR1.material.fill = new Fortis.Color("#454545");
        }
    
        if (Fortis.CollisionManager.get(mAndSSB2)["result"]) {
            if (Fortis.Game.mouse.fFrameatClick) {
                stageIndex = 1;
                nowScene = "cSelect";
                cSelectReset();
            }
            sSButtonR2.material.fill = new Fortis.Color("#151515");
        } else {
            sSButtonR2.material.fill = new Fortis.Color("#454545");
        }
    }

    let charaKey = ["angel", "fighter", "magician"];
let pCharaData = {
    "angel": {
        "HP": 30,
        "CT": 100,
    },
    "fighter": {
        "HP": 40,
    },
};
let charaIndex;

let cSScene;//シーン
let cSUILayer;//UIのレイヤー

let cSelectRect1, cSelectRect2;//セレクトボックス

let cSTitleRect, cSTitle, cSTFont;//ステージセレクトのタイトル

let charaTitle1, charaTitle2, charaTitleFont;//ステージの名前

let angelCS, fighterCS;//ステージセレクトの画像

let cSButtonR1, cSButtonT1, cSB1ColG, cSB1Col, cSButtonR2, cSButtonT2, cSB2ColG, cSB2Col, cSButtonFont;//ステージセレクトのボタン

let mAndCSB1, mAndCSB2;//当たり判定のkey

function cSelectReset() {
    cSScene = new Fortis.Scene();
    Fortis.Game.setScene(cSScene);
    cSUILayer = cSScene.getUI();

    cSTitleRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y * 3 / 40), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
    cSTitleRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 12);

    cSTFont = new Fortis.Font("DotGothic16", 20);
    cSTitle = new Fortis.Entity(new Fortis.TextShape(cSTFont, "キャラセレクト"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    cSTitle.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 12);

    cSelectRect1 = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 8 / 20, Fortis.Game.canvasCfg.size.y * 15 / 20), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
    cSelectRect1.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y * 11 / 20);

    cSelectRect2 = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 8 / 20, Fortis.Game.canvasCfg.size.y * 15 / 20), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
    cSelectRect2.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y * 11 / 20);

    charaTitleFont = new Fortis.Font("DotGothic16", 24);
    charaTitle1 = new Fortis.Entity(new Fortis.TextShape(charaTitleFont, "天使"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    charaTitle1.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 4);
    charaTitle2 = new Fortis.Entity(new Fortis.TextShape(charaTitleFont, "ファイター"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    charaTitle2.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y / 4);

    angelCS = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x*3 / 16, Fortis.Game.canvasCfg.size.y / 4)), new Fortis.ImageMaterial("angel"));
    angelCS.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 2);

    fighterCS = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y*5 / 16)), new Fortis.ImageMaterial("fighter"));
    fighterCS.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y / 2);

    cSButtonFont = new Fortis.Font("DotGothic16", 24);
    cSButtonR1 = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15), new Fortis.ColorMaterial(new Fortis.Color("#454545")));
    cSButtonR1.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y * 13 / 16);
    cSB1ColG = new Fortis.ColliderGroup();
    cSB1Col = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15);
    cSB1ColG.add(cSB1Col);
    cSB1ColG.link(cSButtonR1);
    cSButtonT1 = new Fortis.Entity(new Fortis.TextShape(cSButtonFont, "スタート"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    cSButtonT1.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y * 13 / 16);

    cSButtonR2 = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15), new Fortis.ColorMaterial(new Fortis.Color("#454545")));
    cSButtonR2.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y * 13 / 16);
    cSButtonT2 = new Fortis.Entity(new Fortis.TextShape(sSButtonFont, "スタート"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    cSButtonT2.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 4, Fortis.Game.canvasCfg.size.y * 13 / 16);
    cSB2ColG = new Fortis.ColliderGroup();
    cSB2Col = new Fortis.RectCollider(Fortis.Game.canvasCfg.size.x / 8, Fortis.Game.canvasCfg.size.y / 15);
    cSB2ColG.add(cSB2Col);
    cSB2ColG.link(cSButtonR2);

    mAndCSB1 = Fortis.CollisionManager.add(mouseCG, cSB1ColG);
    mAndCSB2 = Fortis.CollisionManager.add(mouseCG, cSB2ColG);

    cSUILayer.addEntities([cSelectRect1, cSelectRect2, cSTitleRect, cSTitle, charaTitle1, charaTitle2, angelCS, fighterCS, cSButtonR1, cSButtonT1, cSButtonR2, cSButtonT2]);
}

function cSUpdate(delta) {
    mouseCG.pos = Fortis.Game.mouse.pos.copy();

    if (Fortis.CollisionManager.get(mAndCSB1)["result"]) {
        if (Fortis.Game.mouse.fFrameatClick) {
            charaIndex = 0;
            nowScene = "play";
            ResetToPlay();
        }
        cSButtonR1.material.fill = new Fortis.Color("#151515");
    } else {
        cSButtonR1.material.fill = new Fortis.Color("#454545");
    }

    if (Fortis.CollisionManager.get(mAndCSB2)["result"]) {
        if (Fortis.Game.mouse.fFrameatClick) {
            charaIndex = 1;
            nowScene = "play";
            ResetToPlay();
        }
        cSButtonR2.material.fill = new Fortis.Color("#151515");
    } else {
        cSButtonR2.material.fill = new Fortis.Color("#454545");
    }
}