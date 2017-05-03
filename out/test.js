var canvas = document.getElementById("app");
var stage = engine.run(canvas);
var bitmap = createBitmapByName("S_Setuper.png");
stage.addChild(bitmap);
var speed = 10;
engine.Ticker.getInstance().register(function (deltaTime) {
    console.log("aaa");
    bitmap.x += 1;
});
function createBitmapByName(name) {
    var result = new engine.BitMap();
    //var texture: engine.Texture = RES.getRes(name);
    //  result.texture = texture;
    result.src = "assets/" + name;
    return result;
}
