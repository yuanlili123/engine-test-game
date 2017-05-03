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
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    //private btn_Accept: engine.Bitmap;
    //private btn_Finish: engine.Bitmap;
    function TaskPanel() {
        var _this = _super.call(this) || this;
        _this.textField = new engine.TextField();
        _this.textField.text = "Wait for Init";
        _this.addChild(_this.textField);
        console.log("Building TaskPanel");
        return _this;
        /*
        this.btn_Accept = this.createBitmapByName("Accept_png");
        this.addChild(this.btn_Accept)
        this.btn_Accept.x = 640 * (1/8);
        this.btn_Accept.y = 70;

        this.btn_Finish = this.createBitmapByName("Finish_png");
        this.addChild(this.btn_Finish)
        this.btn_Finish.x = 640 * (3/8);
        this.btn_Finish.y = 70;
*/
    }
    TaskPanel.prototype.onChange = function () {
        console.log("Panel Change");
    };
    TaskPanel.prototype.initTaskPanel = function (_taskPanel) {
        _taskPanel.textField.text = "";
        var menu = TaskService.getInstance();
        menu.getTaskByCustomRule(function sortForPanel(taskInfo) {
            for (var t in taskInfo) {
                _taskPanel.textField.text += "Task name: " + (taskInfo[t].name + "\n" + "Task describe: " + taskInfo[t].describe) + "\nTask ID: " + taskInfo[t].id
                    + "\nTask Status: " + taskInfo[t].status + "\n";
                //
            }
        });
        this.addChild(this.textField);
    };
    TaskPanel.prototype.onButtonClick = function () {
    };
    TaskPanel.prototype.createBitmapByName = function (name) {
        var result = new engine.BitMap();
        var texture = engine.res.getRes(name);
        result.texture = texture;
        return result;
    };
    return TaskPanel;
}(engine.DisplayObjectContainer));
