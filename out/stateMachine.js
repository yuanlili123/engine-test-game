var StateMachine = (function () {
    function StateMachine(firstState) {
        this.time = 0;
        this.curState = firstState;
        this.curState.EnterState();
    }
    StateMachine.prototype.runMachine = function (timeStamp) {
        /*if(this.curState.name=="Walk")
            console.log("run machine"+this.curState);*/
        var now = timeStamp;
        var time = this.time;
        var pass = now - time;
        this.time = now;
        this.curState.DuringState(pass);
        var newState = this.curState.GetState();
        if (newState != this.curState) {
            console.log("switch to new state");
            this.curState.ExitState();
            this.curState = newState;
            this.curState.EnterState();
        }
        return false;
    };
    StateMachine.prototype.switchState = function (target) {
        this.curState.ExitState();
        target.EnterState();
        this.curState = target;
    };
    return StateMachine;
}());
