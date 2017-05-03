/*
var Cache: MethodDecorator = (target: any, propertyKey, descriptor: PropertyDescriptor) => {

    const method = descriptor.value;

    descriptor.value = function () {
        console.log(target, propertyKey);

        var cacheKey = "__cache" + propertyKey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this);
        }

        return target[cacheKey];
    }
    return descriptor;
}
*/
var EquipmentType;
(function (EquipmentType) {
    EquipmentType[EquipmentType["CANNON"] = 1.4] = "CANNON";
    EquipmentType[EquipmentType["RADAR"] = 1.1] = "RADAR";
})(EquipmentType || (EquipmentType = {}));
var Equipment = (function () {
    function Equipment(_equipmentType, _name) {
        this.technicians = [];
        this.name = _name;
        this.equipmentType = _equipmentType;
    }
    //@Cache
    Equipment.prototype.getAttack = function () {
        var result = 0;
        this.technicians.forEach(function (t) { return result += t.calFightPower(); });
        return result;
    };
    //@Cache
    Equipment.prototype.getStatus = function () {
        return Properties.getInstance().equipmentProperty[EquipmentPropertyName.equipment_Status].value
            + Properties.getInstance().equipmentProperty[EquipmentPropertyName.equipment_Strengthen].value;
    };
    Equipment.prototype.calFightPower = function () {
        return this.getAttack() + this.getStatus() * this.equipmentType;
    };
    Equipment.prototype.disPlayDetail = function () {
        ShowPanel.detailed.nextLine = 25;
        ShowPanel.detailed.y = 30;
        ShowPanel.detailed.text = "";
        ShowPanel.detailed.text = "Attack: + " + this.getAttack().toString() + "\n"
            + "Current_Status: + " + this.getStatus().toString() + "\n"
            + "FightPower: + " + this.calFightPower().toString() + "\n";
        return PropertiesDisplayFactory.createAllDescription(Properties.getInstance().equipmentProperty, ShowPanel.detailed);
    };
    return Equipment;
}());
