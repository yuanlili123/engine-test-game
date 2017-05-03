var TechnicianQuality;
(function (TechnicianQuality) {
    TechnicianQuality[TechnicianQuality["GREEN_HAND"] = 1.2] = "GREEN_HAND";
    TechnicianQuality[TechnicianQuality["SKILLED"] = 1.4] = "SKILLED";
})(TechnicianQuality || (TechnicianQuality = {}));
var Technician = (function () {
    function Technician(_technicianQuality, _name) {
        this.name = _name;
        this.technicianQuality = _technicianQuality;
        // this.attack = this.getAttack();
    }
    //@Cache
    Technician.prototype.getAttack = function () {
        return Properties.getInstance().technicianProperty[TechnicianPropertyName.technician_Status].value * this.technicianQuality;
    };
    //@Cache
    Technician.prototype.calFightPower = function () {
        return this.getAttack() * 1.4 + Properties.getInstance().technicianProperty[TechnicianPropertyName.technician_Level].value * 2;
    };
    Technician.prototype.disPlayDetail = function () {
        ShowPanel.detailed.text = "";
        ShowPanel.detailed.text = "Attack: + " + this.getAttack().toString() + "\n" + "FightPower: + " + this.calFightPower().toString() + "\n";
        return PropertiesDisplayFactory.createAllDescription(Properties.getInstance().technicianProperty, ShowPanel.detailed);
    };
    return Technician;
}());
//return property.name + ": + " + property.value + "\n"; 
