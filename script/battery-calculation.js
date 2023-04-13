// Calculation of Battery Size Capacity(Ah)
var input = require(`./updated-usage.json`);
var DCconsumption = require(`./dc-consumption.js`);
var LoadTable = require(`./load-table.js`);
var InverterSize = require(`./inverter-calculation`);

console.log(`========================`);
console.log(`Start Calculation of Battery Capacity`);


var LoadResult = LoadTable(input.appliances);
var InverterResult = InverterSize(LoadResult._peak, input.inverter);
var DCconsumptionResult = DCconsumption(LoadResult._daily,InverterResult._eff);


// function BatterySize(array){
//     var DoD = array.battery.spec.ref.DoD;
//     var days = array.daysautonumy.value;
//     var vdc = 48;

//     var BatteryCap = (DCconsumptionResult*(1+(1-(DoD/100)))*days)/vdc;
//     console.log(`${DCconsumptionResult}`)

//     return BatteryCap;

// };


function BatterySize(battArray,DCconsump,autonomy,batteryVolt){
    console.log(`batterysize()`);
    var DoD = battArray.spec.ref.DoD;
    var days = autonomy;
    var vdc = batteryVolt;

    //var BatteryCap = (DCconsump*(1+(1-(DoD/100)))*days)/vdc;
    var BatteryCap = (DCconsump*days)/(vdc*(DoD/100))
    //console.log(`${DCconsumptionResult}`)

    return BatteryCap.toFixed(2);

};
// var BatterySizeResult = BatterySize(input)
var BatterySizeResult = BatterySize(input.battery,DCconsumptionResult,input.daysautonumy.value,input.batteryVolt.value)
console.log(`The Battery Capcity is : ${(BatterySizeResult/1000).toFixed(2)} kAh`)

module.exports = BatterySize;



// Parameters
// dc-consumption => dc-consumption.js
// dc-rating voltage => from user
// Battery Type => Set default DoD
// DoD => from user
// Days of autonomy => from user
