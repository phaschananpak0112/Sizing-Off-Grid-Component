// Charge Controller Size for the solar system
var PVmodule = require(`./pv-module.js`);
var LoadTable = require(`./load-table.js`);
var InverterSize = require(`./inverter-calculation`);
var SolarSize = require(`./solar-size`);
var DCconsumption = require(`./dc-consumption.js`);
var input = require(`./updated-usage.json`);

console.log(`========================`);
console.log(`Start Controller Size Calculation`);

//var PVmoduleResult = PVmodule(input.pvarray);
var LoadResult = LoadTable(input.appliances);
var InverterResult = InverterSize(LoadResult._peak, input.inverter);
var DCconsumptionResult = DCconsumption(LoadResult._daily,InverterResult._eff);
var MinPVarrayResult = SolarSize(input.location.SunHour,input.battery,DCconsumptionResult);



var PVmoduleResult = PVmodule(input.pvarray,MinPVarrayResult);
var battRating = input.batteryVolt.value;


function ConTroller(PVarray,moduleNum,batteryVolt,safety) {
        console.log(`controller()`);
        // var sf = 1.25;
        var sf = safety;
        var PVrating = PVarray.spec.consumption.data.max.wp.value;
        var controller = ((PVrating*moduleNum)/batteryVolt)*sf;

        return controller.toFixed(2);
};


;
var ControllerSizeResult = ConTroller(input.pvarray,PVmoduleResult._number,battRating,input.safetyFac.value);
console.log(`The Controller Size : ${ControllerSizeResult} Ah`)

module.exports = ConTroller;