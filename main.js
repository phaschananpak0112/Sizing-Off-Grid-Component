// Main script for sizing PV sysytem conponents 
var input = require(`./updated-usage.json`);

console.log(`Start Calculation`)

// Calculate total daily consumption
var LoadTable = require(`./load-table`);

// Inverter size
var InverterSize = require(`./inverter-calculation`);

// Dc consumption
var SolarSize = require(`./solar-size.js`);

// Minimum PV watt demand
var DCconsumption = require(`./dc-consumption.js`);

// Module Number
var PVmodule = require(`./pv-module.js`);

// Controller Size
var ConTroller = require(`./controller`);

// Battery Size
var BatterySize = require(`./battery-calculation`);

// SunHour
const SunHour = require(`./sun-hour`);

function Final(inputData) {
    console.log(`main()`);
    //console.log(inputData.location.zipcode)
    var voltLevel = 220;

    return new Promise((resolve, reject) => {
        Promise.resolve()
        .then(() => SunHour(inputData.location.zipcode))
        .then((sh) => inputData.location.SunHour = sh)
        .then(() => {
            var LoadResult = LoadTable(inputData.appliances);
            var InverterResult = InverterSize(LoadResult._peak,inputData.inverter);
            var DCconsumptionResult = DCconsumption(LoadResult._daily,InverterResult._eff);
            var MinPVarrayResult = SolarSize(inputData.location.SunHour.SunHour,inputData.battery,DCconsumptionResult,inputData.pvarray.spec.consumption.eff.value);
            var PVmoduleResult = PVmodule(inputData.pvarray,MinPVarrayResult,LoadResult._daily);
            var ControllerSizeResult = ConTroller(inputData.pvarray,PVmoduleResult._number,inputData.batteryVolt.value,inputData.safetyFac.value);
            var BatterySizeResult = BatterySize(inputData.battery,DCconsumptionResult,inputData.daysautonumy.value,inputData.batteryVolt.value)


            var FinalResult = {
                "SunHour" : inputData.location.SunHour,
                "voltageLevel" : voltLevel,
                "LoadConsumption" : LoadResult,
                "InverterSize" : InverterResult,
                "DCconsumption" : DCconsumptionResult,
                "MinimumPVWatt" : MinPVarrayResult,
                "PVmodule" : PVmoduleResult,
                "ControllerSize" : ControllerSizeResult,
                "BatteryCapacity" : BatterySizeResult
            }
            console.log(JSON.stringify(FinalResult, null, 2));
            return FinalResult;
        })
        .then((ret) => resolve(ret))
        .catch((err) => reject(err));
    });
};


module.exports = Final;

