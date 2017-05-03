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
var PLAYER_SPEED = 0.2;
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.isLeftFacing = false;
        _this.speed = PLAYER_SPEED;
        _this.appearance = new engine.BitMap();
        _this.appearance.height = 93;
        _this.appearance.width = 60;
        _this.appearance.scaleX = 0.55;
        _this.appearance.scaleY = 0.55;
        /*----------------------------------
        this.appearance.anchorOffsetX = 30;
        this.appearance.anchorOffsetY = 42;
        */
        _this.animationList = {
            "idle_left": ["idel1_L.png", "idel2_L.png", "idel3_L.png", "idel4_L.png"],
            "idle_right": ["idel1_R.png", "idel2_R.png", "idel3_R.png", "idel4_R.png"],
            "walk_left": ["move1_L.png", "move2_L.png", "move3_L.png", "move4_L.png"],
            "walk_right": ["move1_R.png", "move2_R.png", "move3_R.png", "move4_R.png"]
        };
        _this.fsm = new StateMachine(new IdleState(_this));
        //engine.startTick(this.fsm.runMachine, this.fsm);
        _this.addChild(_this.appearance);
        return _this;
    }
    Player.prototype.move = function (location) {
        this._moveState = new MoveState(this, location);
        this.fsm.switchState(this._moveState);
    };
    Player.prototype.createBitmapByName = function (name) {
        var result = new engine.BitMap();
        var texture = engine.res.getRes(name);
        result.texture = texture;
        return result;
    };
    return Player;
}(engine.DisplayObjectContainer));
var IdleState = (function () {
    function IdleState(player) {
        this.Onidel = true;
        this.StateName = "Idle";
        this.player = player;
    }
    IdleState.prototype.EnterState = function () {
        this.Onidel = true;
        this.player.curAnimation = new Animation(this.player.animationList[this.player.isLeftFacing ? "idle_left" : "idle_right"], this.player.appearance, 4);
    };
    IdleState.prototype.DuringState = function (pass) {
        this.player.curAnimation.playCurcularly(pass);
    };
    IdleState.prototype.ExitState = function () {
        this.Onidel = false;
    };
    IdleState.prototype.GetState = function () {
        return this;
    };
    return IdleState;
}());
var MoveState = (function () {
    function MoveState(player, location) {
        this.OnMove = false;
        this.StateName = "Move";
        this.isOnposition = false;
        this.player = player;
        this.playerlocation = location;
        this.player.isLeftFacing = ((location.x - this.player.x) > 0 ? false : true);
    }
    MoveState.prototype.EnterState = function () {
        this.isOnposition = false;
        GameScene.canMovetoNext = false;
        console.log("walk from:" + this.player.x.toFixed(1) + "  " + this.player.y.toFixed(1)
            + ", to:" + this.playerlocation.x.toFixed(1) + "  " + this.playerlocation.y.toFixed(1));
        //this.player.curAnimation
        //var nowFacing=this.player.isLeftFacing;
        this.player.curAnimation = new Animation(this.player
            .animationList[this.player.isLeftFacing ? "walk_left" : "walk_right"], this.player.appearance, 4);
        var funcChange = function () {
            //console.log(this.x);
        };
        /*
        var tween = engine.Tween.get(this.player, { onChange: funcChange, onChangeObj: this.player });

        tween.to({
            x: this.playerlocation.x,
            y: this.playerlocation.y
        }, Math.sqrt(
            Math.pow((this.playerlocation.x - this.player.x), 2) +
            Math.pow((this.playerlocation.y - this.player.y), 2)
        ) / this.player.speed, engine.Ease.sineInOut);
        
        while (this.player.x == this.playerlocation.x && this.player.y == this.playerlocation.y) {
            this.player.x += 1;
            this.player.y += 1;
        }



        /*
                if (this.player.x == this.playerlocation.x && this.player.y == this.playerlocation.y) {
                    this.isOnposition = true;
                    console.log("Get Target Location");
                }
                */
    };
    MoveState.prototype.DuringState = function (pass) {
        this.player.curAnimation.playCurcularly(pass);
    };
    MoveState.prototype.ExitState = function () {
        this.OnMove = false;
        this.isOnposition = true;
        console.log("Get Target Location");
        GameScene.canMovetoNext = true;
        // engine.Tween.removeTweens(this.player);
    };
    MoveState.prototype.GetState = function () {
        if (Math.abs(this.player.x - this.playerlocation.x) < 1) {
            return new IdleState(this.player);
        }
        else {
            return this;
        }
    };
    return MoveState;
}());
