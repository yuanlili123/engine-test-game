


var canvas = document.getElementById("app") as HTMLCanvasElement;

var stage = engine.run(canvas);
var test01 = createBitmapByName("wander-icon.jpg");
var test02 = createBitmapByName("wander-icon.jpg");//应从缓存中读取


stage.addChild(test01);
stage.addChild(test02);
let speed = 10;

engine.Ticker.getInstance().register((deltaTime) => {
    test01.x += 1;
    test02.y += 1;
});


function createBitmapByName(name: string): engine.BitMap {
    var result = new engine.BitMap();

    var texture = engine.res.getRes(name);
    result.texture = texture;

    return result;
}