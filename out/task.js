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
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
var Task = (function () {
    function Task(_id, _name, _describe, _fromNpcId, _toNpcId, _status, _condition, _total, _nextTask) {
        this.observerList = [];
        this.id = _id;
        this.name = _name;
        this.describe = _describe;
        this.fromNpcId = _fromNpcId;
        this.toNpcId = _toNpcId;
        this.status = _status;
        this.condition = _condition;
        this.addObserver(TaskService.getInstance());
        this.nextTask = _nextTask;
        this.total = _total;
        this.current = 0;
    }
    Task.prototype.getCurrent = function () {
        return this.current;
    };
    Task.prototype.currentPlus = function () {
        this.current++;
    };
    Task.prototype.checkStatus = function () {
        console.log("Progress: " + this.current + " / " + this.total);
        if (this.current >= this.total) {
            this.onReadyToSubmit(this);
            console.log("Progress is finished !");
        }
        else {
            console.log("Progress is not finished yet ");
        }
    };
    Task.prototype.addObserver = function (_observer) {
        this.observerList.push(_observer);
    };
    Task.prototype.notify = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(task);
        }
    };
    Task.prototype.onAccept = function (task) {
        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }
        task.status = TaskStatus.DURING;
        console.log(task.name + " Mission Accept!");
        this.notify(task);
        this.condition.acceptProgress(this);
        // this.checkStatus();
        return ErrorCode.SUCCESSED;
    };
    Task.prototype.onReadyToSubmit = function (task) {
        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }
        task.status = TaskStatus.CAN_SUBMIT;
        console.log(task.name + " Mission Ready to Submit!");
        this.notify(task);
        return ErrorCode.SUCCESSED;
    };
    Task.prototype.onFinish = function (task) {
        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }
        task.status = TaskStatus.SUBMITTED;
        if (task.nextTask != null) {
            task.nextTask.status = TaskStatus.ACCEPTABLE;
        }
        console.log(task.name + " Mission Successed!");
        this.notify(task);
        return ErrorCode.SUCCESSED;
    };
    return Task;
}());
var TaskCondition = (function () {
    function TaskCondition() {
    }
    TaskCondition.prototype.acceptProgress = function (_taskConditionContext) {
    };
    TaskCondition.prototype.updateProgress = function (_taskConditionContext) {
    };
    return TaskCondition;
}());
var NPCTalkTaskCondition = (function (_super) {
    __extends(NPCTalkTaskCondition, _super);
    function NPCTalkTaskCondition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NPCTalkTaskCondition.prototype.acceptProgress = function (_taskConditionContext) {
        _taskConditionContext.currentPlus();
        _taskConditionContext.checkStatus();
    };
    NPCTalkTaskCondition.prototype.updateProgress = function (_taskConditionContext) {
    };
    return NPCTalkTaskCondition;
}(TaskCondition));
var KillMonsterTaskCondition = (function (_super) {
    __extends(KillMonsterTaskCondition, _super);
    function KillMonsterTaskCondition(_tragetMonsterId) {
        var _this = _super.call(this) || this;
        _this.tragetMonsterId = _tragetMonsterId;
        SenceService.getInstance().addObserver(_this);
        return _this;
    }
    KillMonsterTaskCondition.prototype.acceptProgress = function (_taskConditionContext) {
    };
    KillMonsterTaskCondition.prototype.updateProgress = function (_taskConditionContext) {
        console.log("Kill confirm - updateProgress");
        _taskConditionContext.currentPlus();
        _taskConditionContext.checkStatus();
    };
    KillMonsterTaskCondition.prototype.onChange = function (_monsterId) {
        if (_monsterId == this.tragetMonsterId) {
            console.log("That is one kill");
        }
    };
    return KillMonsterTaskCondition;
}(TaskCondition));
