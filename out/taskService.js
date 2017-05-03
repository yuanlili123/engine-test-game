var TaskService = (function () {
    function TaskService() {
        this.observerList = [];
        this.taskList = {};
        TaskService.count++;
        if (TaskService.count > 1) {
            throw 'singleton!!';
        }
    }
    TaskService.getInstance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    TaskService.prototype.getTaskByCustomRule = function (rule) {
        return rule(this.taskList);
    };
    TaskService.prototype.onChange = function (task) {
        this.notify(task);
    };
    TaskService.prototype.finish = function (id) {
        if (id == null) {
            return ErrorCode.NULLTASK_ID;
        }
        var task = this.taskList[id];
        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }
        task.onFinish(task);
        console.log(task.name + " TaskService Info Finish!");
        return ErrorCode.SUCCESSED;
    };
    /*
        public readyToSubmit(id: string) {
            if (id == null) {
                return ErrorCode.NULLTASK_ID;
            }
    
            var task = this.taskList[id];
    
            if (task == null) {
                return ErrorCode.MISSING_TASK;
            }
    
            task.status = TaskStatus.CAN_SUBMIT;
            console.log(task.name + " Mission Ready to Submit!");
            this.notify(task);
            return ErrorCode.SUCCESSED;
        }
    */
    TaskService.prototype.accept = function (id) {
        if (id == null) {
            return ErrorCode.NULLTASK_ID;
        }
        var task = this.taskList[id];
        if (task == null) {
            return ErrorCode.MISSING_TASK;
        }
        task.onAccept(task);
        console.log(task.name + " TaskService Info Accept!");
        return ErrorCode.SUCCESSED;
    };
    TaskService.prototype.addTask = function (task) {
        this.taskList[task.id] = task;
    };
    TaskService.prototype.addObserver = function (_observer) {
        this.observerList.push(_observer);
    };
    TaskService.prototype.notify = function (task) {
        for (var i = 0; i < this.observerList.length; i++) {
            this.observerList[i].onChange(task);
        }
    };
    return TaskService;
}());
TaskService.count = 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESSED"] = 0] = "SUCCESSED";
    ErrorCode[ErrorCode["MISSING_TASK"] = 1] = "MISSING_TASK";
    ErrorCode[ErrorCode["NULLTASK_ID"] = 2] = "NULLTASK_ID";
})(ErrorCode || (ErrorCode = {}));
