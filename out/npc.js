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
var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(_id, _npcMapPosX, _npcMapPosY) {
        var _this = _super.call(this) || this;
        _this.id = _id;
        _this.npcMapPosX = _npcMapPosX;
        _this.npcMapPosY = _npcMapPosY;
        _this.emoji = _this.createBitmapByName(_id + "_nullIcon.png");
        console.log("Building " + _id);
        _this.addChild(_this.emoji);
        _this.dialoguePanel = new DialoguePanel(_this.id);
        _this.dialoguePanel.visible = false;
        _this.addChild(_this.dialoguePanel);
        _this.dialoguePanel.x = _this.x; //-108 , 300
        _this.dialoguePanel.y = _this.y + 300;
        _this.onNpcClick();
        return _this;
    }
    NPC.prototype.onChange = function (_task) {
        //var changeTask = _task;  ///changeTask 可以获取外部变化的task
        if (_task.fromNpcId == this.id && _task.toNpcId != this.id) {
            if (_task.status == 2) {
                this.npcStatus = NpcStatus.NULLICON;
                this.removeChild(this.emoji);
                this.changeImage();
            }
        }
        else if (_task.toNpcId == this.id) {
            if (_task.status == TaskStatus.DURING) {
                this.npcStatus = NpcStatus.DURING;
                this.removeChild(this.emoji);
                this.changeImage();
            }
            if (_task.status == TaskStatus.CAN_SUBMIT) {
                this.npcStatus = NpcStatus.READY_FOR_SUBMITTED;
                this.removeChild(this.emoji);
                this.changeImage();
            }
            if (_task.status == TaskStatus.SUBMITTED) {
                this.npcStatus = NpcStatus.NULLICON;
                this.removeChild(this.emoji);
                this.changeImage();
            }
            if (_task.nextTask != null) {
                if (_task.status == TaskStatus.SUBMITTED && _task.nextTask.status == TaskStatus.ACCEPTABLE) {
                    this.npcStatus = NpcStatus.READY_FOR_ACCEPT;
                    this.removeChild(this.emoji);
                    this.changeImage();
                }
            }
        }
        else {
        }
        console.log(this.id + " change");
    };
    NPC.prototype.initNpcTask = function (_npc) {
        var menu = TaskService.getInstance();
        menu.getTaskByCustomRule(function sortForNpc(taskInfo) {
            for (var t in taskInfo) {
                //console.log(taskInfo[t].fromNpcId);
                //console.log(taskInfo[t].toNpcId);
                if (taskInfo[t].fromNpcId == _npc.id || taskInfo[t].toNpcId == _npc.id) {
                    if (taskInfo[t].fromNpcId == _npc.id && taskInfo[t].status == 1) {
                        _npc.npcStatus = NpcStatus.READY_FOR_ACCEPT;
                        _npc.changeImage();
                    }
                }
            }
        });
    };
    NPC.prototype.npcRespendCommand = function () {
        //var isNeed = GameScene.needMovetoNpc(this.npcMapPosX, this.npcMapPosY);
        //  if (isNeed) {
        GameScene.sceneFindRoad(this.npcMapPosX, this.npcMapPosY);
        for (var i = 0; i < GameScene.sceneRoad.length; i++) {
            GameScene.commandList.addCommand(new WalkCommand(GameScene.sceneRoad[i].x * GameScene.TILESIZE + GameScene.TILESIZE / 2, GameScene.sceneRoad[i].y * GameScene.TILESIZE + GameScene.TILESIZE / 2));
        }
        //}
        GameScene.commandList.addCommand(new TalkCommand(this.dialoguePanel));
        GameScene.commandList.execute();
    };
    NPC.prototype.onNpcClick = function () {
        var _this = this;
        this.touchEnabled = true;
        this.addEventListener(engine.TouchEventType.CLICK, function () {
            console.log("Tap_" + _this.id);
            if (GameScene.commandList.isFinishedFlag) {
                _this.npcRespendCommand();
            }
            else {
                GameScene.commandList.cancel();
                _this.npcRespendCommand();
            }
        }, false, this);
    };
    NPC.prototype.changeImage = function () {
        if (this.npcStatus == NpcStatus.NULLICON) {
            this.emoji = this.createBitmapByName(this.id + "_nullIcon.png");
            this.addChild(this.emoji);
        }
        if (this.npcStatus == NpcStatus.READY_FOR_ACCEPT) {
            this.emoji = this.createBitmapByName(this.id + "_taskAcceptable.png");
            this.addChild(this.emoji);
        }
        if (this.npcStatus == NpcStatus.DURING) {
            this.emoji = this.createBitmapByName(this.id + "_taskDuring.png");
            this.addChild(this.emoji);
        }
        if (this.npcStatus == NpcStatus.READY_FOR_SUBMITTED) {
            this.emoji = this.createBitmapByName(this.id + "_taskFinish.png");
            this.addChild(this.emoji);
        }
    };
    NPC.prototype.createBitmapByName = function (name) {
        var result = new engine.BitMap();
        var texture = engine.res.getRes(name);
        result.texture = texture;
        return result;
    };
    return NPC;
}(engine.DisplayObjectContainer));
var NpcStatus;
(function (NpcStatus) {
    NpcStatus[NpcStatus["NULLICON"] = 0] = "NULLICON";
    NpcStatus[NpcStatus["READY_FOR_ACCEPT"] = 1] = "READY_FOR_ACCEPT";
    NpcStatus[NpcStatus["DURING"] = 2] = "DURING";
    NpcStatus[NpcStatus["READY_FOR_SUBMITTED"] = 3] = "READY_FOR_SUBMITTED";
})(NpcStatus || (NpcStatus = {}));
