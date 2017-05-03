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
var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(_npcid) {
        var _this = _super.call(this) || this;
        _this.endTalkFlag = false;
        _this.visible = true;
        _this.dialoguePanelBg = _this.createBitmapByName("DialogueBg.png");
        _this.dialoguePanelBg.x = 100;
        _this.addChild(_this.dialoguePanelBg);
        _this.btn_Accept = _this.createBitmapByName("Accept.png");
        _this.addChild(_this.btn_Accept);
        _this.btn_Accept.x = 140;
        _this.btn_Accept.y = 100;
        _this.btn_Accept.setTouchEnabled(true);
        _this.btn_Finish = _this.createBitmapByName("Finish.png");
        _this.addChild(_this.btn_Finish);
        _this.btn_Finish.x = 0;
        _this.btn_Finish.y = 100;
        _this.btn_Finish.setTouchEnabled(true);
        _this.btn_Close = _this.createBitmapByName("Close_s.png");
        _this.addChild(_this.btn_Close);
        _this.btn_Close.x = 220;
        _this.btn_Close.y = 0;
        _this.btn_Close.setTouchEnabled(true);
        _this.currentTask = new engine.TextField();
        _this.initDialog(_npcid, _this.currentTask);
        _this.onDialogPanelClicked(_npcid);
        return _this;
        //this.dialoguePanelBg.x = this.x - this.width/5;  //-108 , 300
        //this.dialoguePanelBg.y = this.y + 300;
    }
    DialoguePanel.prototype.createBitmapByName = function (name) {
        var result = new engine.BitMap();
        var texture = engine.res.getRes(name);
        result.texture = texture;
        return result;
    };
    DialoguePanel.prototype.initDialog = function (_npcid, _currentText) {
        //_currentText.text = "Wait for init"
        _currentText.text = "";
        this.addChild(_currentText);
        _currentText.x = 0;
        var menu = TaskService.getInstance();
        menu.getTaskByCustomRule(function sortForNpc(taskInfo) {
            for (var t in taskInfo) {
                //console.log(taskInfo[t].fromNpcId);
                //console.log(taskInfo[t].toNpcId);
                if (taskInfo[t].fromNpcId == _npcid || taskInfo[t].toNpcId == _npcid) {
                    _currentText.text += "Task: " + taskInfo[t].id + "\n"; //+ " Status: " + taskInfo[t].status + "\n";
                }
            }
        });
    };
    DialoguePanel.prototype.onDialogPanelClicked = function (_npcid) {
        var _this = this;
        this.dialoguePanelBg.setTouchEnabled(true);
        this.dialoguePanelBg.addEventListener(engine.TouchEventType.CLICK, function () {
            console.log("DialogBGClick");
        }, false, this);
        this.btn_Close.addEventListener(engine.TouchEventType.CLICK, function () {
            console.log("Close");
            _this.visible = false;
            _this.endTalkFlag = true;
        }, false, this);
        this.btn_Accept.addEventListener(engine.TouchEventType.CLICK, function () {
            _this.initDialog(_npcid, _this.currentTask);
            var menu = TaskService.getInstance();
            menu.getTaskByCustomRule(function sortForNpc(taskInfo) {
                for (var t in taskInfo) {
                    //console.log(taskInfo[t].fromNpcId);
                    //console.log(taskInfo[t].toNpcId);
                    if (taskInfo[t].fromNpcId == _npcid && taskInfo[t].status == TaskStatus.ACCEPTABLE) {
                        TaskService.getInstance().accept(t); //////////////////////
                        console.log("Accept Successed");
                    }
                    else {
                        console.log(taskInfo[t].id + " is Unavaliable Now");
                    }
                }
            });
        }, false, this);
        this.btn_Finish.addEventListener(engine.TouchEventType.CLICK, function () {
            _this.initDialog(_npcid, _this.currentTask);
            var menu = TaskService.getInstance();
            menu.getTaskByCustomRule(function sortForNpc(taskInfo) {
                for (var t in taskInfo) {
                    //console.log(taskInfo[t].fromNpcId);
                    //console.log(taskInfo[t].toNpcId);
                    /*
                                        if (taskInfo[t].toNpcId == _npcid && taskInfo[t].status == TaskStatus.DURING) {
                                            console.log("Task Unfinished");
                                        }
                    */
                    if (taskInfo[t].toNpcId == _npcid && taskInfo[t].status == TaskStatus.CAN_SUBMIT) {
                        TaskService.getInstance().finish(t); /////////////////////////
                        console.log("Finish Successed");
                    }
                    else {
                        console.log("Task Unfinished");
                    }
                }
            });
        }, false, this);
    };
    return DialoguePanel;
}(engine.DisplayObjectContainer));
