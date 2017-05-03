
class CommandList {



    private _list: Command[] = [];
    private currentCommand: Command;
    private _frozen = false;
    public isFinishedFlag = true;

    addCommand(command: Command) {
        this._list.push(command);
    }

    cancel() {
        this._frozen = true;
        var command = this.currentCommand;
        setTimeout(() => {
            if (this._frozen) {
                this._frozen = false;
            }

        }, this, 2000);
        if (command) {
            command.cancel(() => {
                console.log("cancel");
                this._frozen = false;
            });
            this._list = [];
        }

    }

    execute() {
        this.isFinishedFlag = false;
        if (this._frozen) {
            setTimeout(this.execute, this, 100);
            return;
        }

        var command = this._list.shift();
        this.currentCommand = command;
        if (command) {
            console.log("执行下一命令", command)
            command.execute(() => {
                this.execute()
            })

        }
        else {
            console.log("全部命令执行完毕")
            this.isFinishedFlag = true;
        }
    }

}