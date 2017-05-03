var WalkCommand = (function () {
    function WalkCommand(x, y) {
        this.x = x;
        this.y = y;
    }
    WalkCommand.prototype.execute = function (callback) {
        GameScene.getCurrentScene().moveTo(this.x, this.y, function () {
            callback();
        });
    };
    WalkCommand.prototype.cancel = function (callback) {
        GameScene.getCurrentScene().stopMove(function () {
            callback();
        });
    };
    return WalkCommand;
}());
var FightCommand = (function () {
    function FightCommand(_monsterId) {
        this._hasBeenCancelled = false;
        this.monsterId = _monsterId;
    }
    FightCommand.prototype.execute = function (callback) {
        console.log("开始战斗");
        var atkMonsterId = this.monsterId;
        var menu = TaskService.getInstance();
        menu.getTaskByCustomRule(function sortForMonster(taskInfo) {
            for (var t in taskInfo) {
                if (taskInfo[t].condition.tragetMonsterId == atkMonsterId && taskInfo[t].status == TaskStatus.DURING) {
                    SenceService.getInstance().notify(atkMonsterId);
                    taskInfo[t].condition.updateProgress(taskInfo[t]);
                }
            }
        });
        console.log("结束战斗");
        callback();
    };
    FightCommand.prototype.cancel = function (callback) {
        console.log("脱离战斗");
        this._hasBeenCancelled = true;
        setTimeout(function () {
            callback();
        }, this, 100);
    };
    return FightCommand;
}());
var TalkCommand = (function () {
    function TalkCommand(_targetPanel) {
        this.targetPanel = _targetPanel;
    }
    TalkCommand.prototype.execute = function (callback) {
        if (this.targetPanel.endTalkFlag) {
            console.log("结束对话");
            this.targetPanel.endTalkFlag = false;
            callback();
            return;
        }
        console.log("打开对话框");
        this.targetPanel.alpha = 0;
        this.targetPanel.visible = true;
        this.targetPanel.alpha = 1;
        /*
        var panelTw = egret.Tween.get(this.targetPanel);
        panelTw.to({ "alpha": 1 }, 600);
        */
        this.targetPanel.touchEnabled = true;
    };
    TalkCommand.prototype.cancel = function (callback) {
        this.targetPanel.visible = false;
        console.log("关闭对话框");
    };
    return TalkCommand;
}());
