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
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    /**
     * 加载进度界面
     * Process interface loading
     */
    //private loadingView: LoadingUI;
    function Main(_stage) {
        var _this = _super.call(this) || this;
        _this.stageWidth = 640;
        _this.stageHeight = 1236;
        _this.stageX = 0;
        _this.stageY = 0;
        _this.stage = _stage;
        return _this;
        // this.addEventListener(engine.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    Main.prototype.initTaskSystem = function (stageH, stageW) {
        var task02 = new Task("002", "Kill 4 pigs", "Tap button", "npc_1", "npc_1", TaskStatus.UNACCEPTABLE, new KillMonsterTaskCondition("B27"), 4, null);
        var task01 = new Task("001", "Welcome to the World of Warcraft", "Click the whiteMan", "npc_0", "npc_1", TaskStatus.ACCEPTABLE, new NPCTalkTaskCondition(), 1, task02);
        var monster_0 = new KillMonsterButton("B27", 0, stageH / 2);
        this.stage.addChild(monster_0);
        monster_0.scaleX = 0.5;
        monster_0.scaleY = 0.5;
        monster_0.x = 0;
        monster_0.y = stageH / 2;
        TaskService.getInstance().addTask(task01);
        TaskService.getInstance().addTask(task02);
        var missionPanel = new TaskPanel();
        this.stage.addChild(missionPanel);
        var npc_0 = new NPC("npc_0", stageW / 4, stageH / 2);
        this.stage.addChild(npc_0);
        npc_0.scaleX = 0.5;
        npc_0.scaleY = 0.5;
        npc_0.x = stageW / 4;
        npc_0.y = stageH / 2;
        var npc_1 = new NPC("npc_1", stageW / 2.5, stageH / 4);
        this.stage.addChild(npc_1);
        npc_1.scaleX = 0.5;
        npc_1.scaleY = 0.5;
        npc_1.x = stageW / 2.5;
        npc_1.y = stageH / 4; //在myMap 进行监听，如果点击位置位于NPC放置位置的周围，则在添加移动命令后，追加打开面板命令。
        TaskService.getInstance().addObserver(npc_0);
        TaskService.getInstance().addObserver(npc_1);
        TaskService.getInstance().addObserver(missionPanel);
        npc_0.initNpcTask(npc_0);
        npc_1.initNpcTask(npc_1);
        //missionPanel.initTaskPanel(missionPanel);
        //var updateTaskPanel = new engine.Timer(500, 0)
        //updateTaskPanel.start();
        setInterval(function () {
            missionPanel.initTaskPanel(missionPanel);
        }, 500);
        /*
        updateTaskPanel.addEventListener(engine.TimerEvent.TIMER, () => {
            missionPanel.initTaskPanel(missionPanel);
        }, this);
        */
    };
    Main.prototype.initUserPanel = function () {
        var user = new User();
        var skilledTechnician = new Technician(TechnicianQuality.SKILLED, 'Skilled - FireCtrl');
        var SKC34 = new Equipment(EquipmentType.CANNON, 'SKC34');
        var PrinzEugen = new Ship(ShipType.CA, 'PrinzEugen');
        user.ships.push(PrinzEugen);
        PrinzEugen.setInTeam(true);
        user.checkInTeam();
        PrinzEugen.equipments.push(SKC34);
        SKC34.technicians.push(skilledTechnician);
        console.log(user);
        console.log(user.calFightPower());
        var showPanel = new ShowPanel(this.stageWidth, this.stageHeight, PrinzEugen, SKC34, skilledTechnician);
        showPanel.x = 0;
        showPanel.y = 640;
        this.stage.addChild(showPanel);
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    Main.prototype.createGameScene = function () {
        var myscene = new GameScene();
        GameScene.replaceScene(myscene);
        var myGrid = GameScene.sceneGrid;
        var myRoad = GameScene.sceneRoad;
        var myMap = GameScene.sceneMap;
        this.stage.addChild(myMap);
        var player = new Player();
        this.stage.addChild(player);
        player.x = 32;
        player.y = 32;
        GameScene.setPlayer(player);
        this.touchEnabled = true;
        myMap.addEventListener(engine.TouchEventType.CLICK, function (evt) {
            var disNpc_0 = Math.sqrt(Math.pow(evt.offsetX - 640 / 4, 2) + Math.pow(evt.offsetY - 1236 / 2, 2));
            var disNpc_1 = Math.sqrt(Math.pow(evt.offsetX - 640 / 2.5, 2) + Math.pow(evt.offsetY - 1236 / 4, 2));
            function getWalkCommand() {
                console.log("tap_px " + evt.offsetX + "," + this.stageY);
                myMap.grid.setEndPoint(Math.floor(evt.offsetX / Main.TILESIZE), Math.floor(evt.offsetY / Main.TILESIZE));
                myMap.grid.setStartPoint(Math.floor(player.x / Main.TILESIZE), Math.floor(player.y / Main.TILESIZE));
                myRoad = myMap.findPath();
                if (myRoad == null) {
                    console.log("error tap stay");
                    return;
                }
                if (disNpc_0 <= 4) {
                    console.log("NPC_0 around");
                }
                if (disNpc_1 <= 4) {
                    console.log("NPC_1 around");
                }
                for (var i = 0; i < myRoad.length; i++) {
                    GameScene.commandList.addCommand(new WalkCommand(myRoad[i].x * Main.TILESIZE + Main.TILESIZE / 2, myRoad[i].y * Main.TILESIZE + Main.TILESIZE / 2));
                }
                GameScene.commandList.execute();
            }
            if (GameScene.commandList.isFinishedFlag) {
                getWalkCommand();
            }
            else {
                GameScene.commandList.cancel();
                getWalkCommand();
            }
        }, false, this);
        this.initTaskSystem(this.stageWidth, this.stageHeight);
        this.initUserPanel();
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new engine.BitMap();
        var texture = engine.res.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(engine.DisplayObjectContainer));
Main.TILESIZE = 64;
//////Load Game 
var canvas = document.getElementById("app");
var stage = engine.run(canvas);
var game = new Main(stage);
game.createGameScene();
