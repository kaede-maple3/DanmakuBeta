function Init() {
    Fortis.Game.config.debug = true;
    Fortis.Game.canvasCfg.aspect = new Fortis.Vector2(4, 3);
    Fortis.Game.canvasCfg.size = new Fortis.Vector2(880, 660);
    Fortis.Game.canvasCfg.BGColor = new Fortis.Color("#454545");
    Fortis.Game.canvasCfg.autoResize = false;

    Fortis.FontLoader.addFonts({
        "Anton": "https://fonts.googleapis.com/css2?family=Anton&display=swap",
        "Smooch Sans": "https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@450&display=swap",
        "Outfit": "https://fonts.googleapis.com/css2?family=Outfit:wght@450&display=swap",
        "Playwrite DK Loopet": "https://fonts.googleapis.com/css2?family=Playwrite+DK+Loopet&display=swap",
        "Inconsolata": "https://fonts.googleapis.com/css2?family=Inconsolata&display=swap",
        "Kaisei Opti": "https://fonts.googleapis.com/css2?family=Kaisei+Opti&display=swap",
        "Yusei Magic": "https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap",
        "DotGothic16": "https://fonts.googleapis.com/css2?family=DotGothic16&display=swap",
        "Yuji Mai": "https://fonts.googleapis.com/css2?family=Yuji+Mai&display=swap",
        "Shippori Antique": "https://fonts.googleapis.com/css2?family=Shippori+Antique&display=swap",//ひらがな、カタカナのみ
        "Yuji Boku": "https://fonts.googleapis.com/css2?family=Yuji+Boku&display=swap",
        "Reggae One": "https://fonts.googleapis.com/css2?family=Reggae+One&display=swap",
        "Yuji Syuku": "https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap",
        "Kaisei Decol": "https://fonts.googleapis.com/css2?family=Kaisei+Decol&display=swap",
        "Rampart One": "https://fonts.googleapis.com/css2?family=Rampart+One&display=swap",
        "Noto Serif": "https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap",
        "Martian Mono": "https://fonts.googleapis.com/css2?family=Martian+Mono&display=swap",
        "Mochiy Pop One": "https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap",
        "WDXL Lubrifont TC": "https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+TC&display=swap",
    });
    Fortis.ImageLoader.addImages({
        //playable
        //天使
        "angel": "./img/playable/angel.webp",
        "a-bullet": "./img/playable/bullet/a-bullet.webp",

        //格闘家
        "fighter": "./img/playable/fighter.webp",
        "f-bullet": "./img/playable/bullet/f-bullet.webp",

        /*
        //マジシャン
        "magician": "./img/playable/magician.webp",
        "m-card1": "./img/playable/bullet/m-card1.webp",
        "m-card2": "./img/playable/bullet/m-card2.png",
        */

        //enemy
        //ミミック
        "tre-box": "./img/enemy/tre-box/tre-box.webp",
        "tre-box-bullet": "./img/enemy/tre-box/tre-box-bullet.webp",
        //蜂
        "bee-needle": "./img/enemy/bee/bee-poison-needle.webp",
        "bee-honey": "./img/enemy/bee/bee-honey-bullet.png",
        "bee":"./img/enemy/bee/bee.webp",
        //蝶
        "butterfly-bullet": "./img/enemy/butterfly/butterfly-bullet.webp",
        "butterfly":"./img/enemy/butterfly/butterfly.webp",
        //雲
        "cloud-bullet": "./img/enemy/cloud/cloud-bullet.webp",
        "cloud-lightning": "./img/enemy/cloud/cloud-lightning.webp",
        "cloud":"./img/enemy/cloud/cloud.webp",
        "tengu-wind": "./img/enemy/cloud/tengu-wind.webp",//天狗から借用
        //ドラゴン
        "dragon-bullet": "./img/enemy/dragon/dragon-bullet.webp",
        "dragon-fire-bullet": "./img/enemy/dragon/dragon-fire-bullet.webp",
        "dragon-normal-bullet": "./img/enemy/dragon/dragon-normal-bullet.webp",
        "dragon":"./img/enemy/dragon/dragon.webp",
        //ねつ
        "netsu-bullet": "./img/enemy/netsu/netsu-bullet.webp",
        "netsu-gaming-bullet": "./img/enemy/netsu/netsu-gaming-bullet.webp",
        "netsu":"./img/enemy/netsu/netsu.webp",
        //スケルトン
        "skeleton-bullet": "./img/enemy/skeleton/skeleton-bullet.webp",//90度傾ける
        "skeleton":"./img/enemy/skeleton/skeleton.webp",
        /*
        //天狗
        "tengu-bullet": "./img/enemy/tengu/tengu-bullet.webp",
        
        "tengu":"./img/enemy/tengu/tengu.webp",
        //吸血鬼
        "vampire-bullet": "./img/enemy/vampire/vampire-bullet.webp",
        "vampire-bat-bullet": "./img/enemy/vampire/vampire-bat-bullet.webp",
        "vampire":"./img/enemy/vampire/vampire.webp",
    */


        //その他
        //回復
        "heal":"./img/other/heal.png",
        //攻撃力アップ
        "strong":"./img/other/strong.png",
        //無敵
        "shield":"./img/other/shield.webp",
    });
}

let nowScene;
let localStorage;
let highScoreData;

let stage;
let myChara;

function Ready() {
    //ローカルストレージ確認
    if (!window.localStorage) {
        console.log("localstorage非対応");
        localStorage = false;
    } else {
        localStorage = true;
        highScoreData = window.localStorage.getItem("highScore");
        if (highScoreData == null) {//ハイスコアデータが存在しない
            highScoreData = [0, 0, 0];
            window.localStorage.setItem("highScore", JSON.stringify(highScoreData));
        } else {
            highScoreData = JSON.parse(highScoreData);
        }
    }

    //タイトル
    
    nowScene = "title";
    title();
    

    //ステージセレクト
    /*
    nowScene = "sSelect";
    sSelectReset();
    */

    //キャラセレクト
    /*
    nowScene = "cSelect";
    cSelectReset();
    */

    //プレイ
    /*
    nowScene = "play";
    ResetToPlay();
    */
}

function Update(delta) {
    switch (nowScene) {
        case "title":
            tUpdate(delta);
            break;
        case "sSelect":
            sSUpdate(delta);
            break;
        case "cSelect":
            cSUpdate(delta);
            break;
        case "play":
            pUpdate(delta);
    }
}

function EngineLoaded() { }