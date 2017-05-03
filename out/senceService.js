var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SenceService = (function () {
    function SenceService() {
        this.observerList = [];
        SenceService.count++;
        if (SenceService.count > 1) {
            throw 'singleton!!';
        }
    }
    SenceService.getInstance = function () {
        if (SenceService.instance == null) {
            SenceService.instance = new SenceService();
        }
        return SenceService.instance;
    };
    SenceService.prototype.addObserver = function (_observer) {
        this.observerList.push(_observer);
    };
    SenceService.prototype.notify = function (_monsterId) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(_monsterId);
        }
    };
    return SenceService;
}());
SenceService.count = 0;
var KillMonsterButton = (function (_super) {
    __extends(KillMonsterButton, _super);
    function KillMonsterButton(_monsterId, _monsterMapPosX, _monsterMapPosY) {
        var _this = _super.call(this) || this;
        _this.monsterId = _monsterId;
        _this.button = _this.createBitmapByName("Kill.png");
        _this.addChild(_this.button);
        _this.onButtonClick(_monsterId);
        _this.monsterMapPosX = _monsterMapPosX;
        _this.monsterMapPosY = _monsterMapPosY;
        return _this;
    }
    KillMonsterButton.prototype.onChange = function () {
    };
    //-----------------
    KillMonsterButton.prototype.onButtonClick = function (_monsterId) {
        var _this = this;
        this.touchEnabled = true;
        this.addEventListener(engine.TouchEventType.CLICK, function () {
            console.log("Monster Kill Tap");
            if (GameScene.commandList.isFinishedFlag) {
                _this.getWalkCommand();
            }
            else {
                GameScene.commandList.cancel();
                _this.getWalkCommand();
            }
        }, false, this);
    };
    KillMonsterButton.prototype.getWalkCommand = function () {
        GameScene.sceneFindRoad(this.monsterMapPosX, this.monsterMapPosY);
        for (var i = 0; i < GameScene.sceneRoad.length; i++) {
            GameScene.commandList.addCommand(new WalkCommand(GameScene.sceneRoad[i].x * GameScene.TILESIZE + GameScene.TILESIZE / 2, GameScene.sceneRoad[i].y * GameScene.TILESIZE + GameScene.TILESIZE / 2));
        }
        GameScene.commandList.addCommand(new FightCommand(this.monsterId));
        GameScene.commandList.execute();
    };
    KillMonsterButton.prototype.createBitmapByName = function (name) {
        var result = new engine.BitMap();
        var texture = engine.res.getRes(name);
        result.texture = texture;
        return result;
    };
    return KillMonsterButton;
}(engine.DisplayObjectContainer));
