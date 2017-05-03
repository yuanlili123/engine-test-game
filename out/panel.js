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
var ShowPanel = (function (_super) {
    __extends(ShowPanel, _super);
    function ShowPanel(_width, _height, owner, _equip, _techni) {
        var _this = _super.call(this) || this;
        _this.width = _width;
        _this.height = _height;
        _this.role = _this.createBitmapByName("S_Prinz Eugen.jpg");
        _this.role.setWidth(261);
        _this.role.setHeight(380);
        _this.addChild(_this.role);
        //
        _this.equipment_1 = _this.createBitmapByName("S_SKC34.png");
        _this.equipment_1.setWidth(190);
        _this.addChild(_this.equipment_1);
        _this.equipment_1.x = _this.role.width;
        //console.log("++++" + this.role.width);
        _this.equipment_2 = _this.createBitmapByName("S_Setuper.png");
        _this.equipment_2.setWidth(190);
        _this.addChild(_this.equipment_2);
        _this.equipment_2.x = _this.width - _this.equipment_2.width;
        /*
              this.equipment_3 = this.createBitmapByName("S_Watcher.png");
              this.addChild(this.equipment_3);
              this.equipment_3.x = this.role.width;
              this.equipment_3.y = this.equipment_1.height;
              //
              this.equipment_4 = this.createBitmapByName("S_Setuper.png");
              this.addChild(this.equipment_4);
              this.equipment_4.x = this.width - this.equipment_2.width;
              this.equipment_4.y = this.equipment_1.height;
      */
        _this.onClickEquipment_1(_this.equipment_1, _equip);
        _this.onClickEquipment_2(_this.equipment_2, _techni);
        // this.onClickEquipment_3(this.equipment_3);
        // this.onClickEquipment_4(this.equipment_4);
        _this.allInfo = new engine.TextField();
        //this.allInfo.nextLine = 40;
        _this.allInfo.y = _this.role.height;
        _this.addChild(_this.allInfo);
        _this.allInfo.text = ("All----------------------|");
        _this.equipmentInfo = new engine.TextField();
        _this.equipmentInfo.x = _this.role.width;
        _this.equipmentInfo.y = _this.role.height;
        //this.equipmentInfo.nextLine = 40;
        _this.addChild(_this.equipmentInfo);
        _this.equipmentInfo.text = ("Equiment------------------------|");
        _this.updateAllInfo(owner);
        return _this;
    }
    ShowPanel.prototype.posConfirm = function (_isAll, _container) {
        if (_isAll) {
            _container.y = this.role.height + this.equipmentInfo.height;
        }
        else {
            _container.x = this.role.width;
            _container.y = this.role.height + this.equipmentInfo.height;
        }
    };
    ShowPanel.prototype.updateAllInfo = function (owner) {
        var container = owner.disPlayDetail();
        this.addChild(container);
        this.posConfirm(true, container);
    };
    ShowPanel.prototype.updateEquimentInfo = function (_equipmentNum, Equipment) {
        switch (_equipmentNum) {
            case 1:
                var container = Equipment.disPlayDetail();
                this.addChild(container);
                this.posConfirm(false, container);
                break;
            case 2:
                var container = Equipment.disPlayDetail();
                this.addChild(container);
                this.posConfirm(false, container);
                break;
        }
    };
    ShowPanel.prototype.onClickEquipment_1 = function (Bitmap, _equip) {
        var _this = this;
        Bitmap.touchEnabled = true;
        Bitmap.addEventListener(engine.TouchEventType.CLICK, function () {
            _this.updateEquimentInfo(1, _equip);
            console.log("Tap Equipment_1");
        }, false, this);
    };
    ShowPanel.prototype.onClickEquipment_2 = function (Bitmap, _techni) {
        var _this = this;
        Bitmap.touchEnabled = true;
        Bitmap.addEventListener(engine.TouchEventType.CLICK, function () {
            _this.updateEquimentInfo(2, _techni);
            console.log("Tap Equipment_2");
        }, false, this);
    };
    /*
    private onClickEquipment_3(Bitmap: engine.Bitmap) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(engine.TouchEvent.TOUCH_TAP, () => {


            console.log("Tap Equipment_3");
        }, this);


    }
    private onClickEquipment_4(Bitmap: engine.Bitmap) {

        Bitmap.touchEnabled = true;

        Bitmap.addEventListener(engine.TouchEvent.TOUCH_TAP, () => {


            console.log("Tap Equipment_4");
        }, this);


    }
    */
    ShowPanel.prototype.createBitmapByName = function (name) {
        var result = new engine.BitMap();
        var texture = engine.res.getRes(name);
        result.texture = texture;
        return result;
    };
    return ShowPanel;
}(engine.DisplayObjectContainer));
ShowPanel.all = new engine.TextField();
ShowPanel.detailed = new engine.TextField();
