var ShipType;
(function (ShipType) {
    ShipType[ShipType["CA"] = 1.2] = "CA";
})(ShipType || (ShipType = {}));
var Ship = (function () {
    //private __cachemaxHp;////flag !
    function Ship(_type, _name) {
        this.isInTeam = false;
        this.equipments = [];
        this.name = _name;
        this.type = _type;
    }
    Ship.prototype.setInTeam = function (_isinTeam) {
        this.isInTeam = _isinTeam;
    };
    //@Cache
    Ship.prototype.getmaxHP = function () {
        var result = 0;
        result += Properties.getInstance().shipProperty[ShipPropertyName.ship_Level].value * 10 * this.type;
        return result;
    };
    //@Cache
    Ship.prototype.getAttack = function () {
        var result = 0;
        this.equipments.forEach(function (e) { return result += e.calFightPower(); });
        return result;
    };
    Ship.prototype.getfightPower = function () {
        return this.calFightPower();
    };
    Ship.prototype.calFightPower = function () {
        return this.getmaxHP() * 1.5 + this.getAttack() * 1.8 + Properties.getInstance().shipProperty[ShipPropertyName.ship_Speed].value * 1.2;
    };
    Ship.prototype.disPlayDetail = function () {
        ShowPanel.all.size = 20;
        ShowPanel.all.y = 30;
        ShowPanel.all.text = "";
        ShowPanel.all.nextLine = 15;
        ShowPanel.all.text =
            "Attack: + " + this.getAttack().toString() + "\n"
                + "FightPower: + " + Math.floor(this.calFightPower()).toString() + "\n"
                + "MaxHP: + " + this.getmaxHP().toString() + "\n";
        return PropertiesDisplayFactory.createAllDescription(Properties.getInstance().shipProperty, ShowPanel.all);
        /*
    var container = new egret.DisplayObjectContainer();
    container.addChild(ShowPanel.all);
    return container;
    */
    };
    return Ship;
}());
