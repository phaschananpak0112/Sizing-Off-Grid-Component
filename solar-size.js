// The minimum PV array Watt(kW)

var LoadTable = require(`./load-table.js`);
var InverterSize = require(`./inverter-calculation`);
var DCconsumption = require(`./dc-consumption.js`);
var input = require(`./updated-usage.json`);

var LoadResult = LoadTable(input.appliances);
var InverterResult = InverterSize(LoadResult._peak, input.inverter);

console.log(`Minmum PV Array Watt Calculation`);

var DCconsumptionResult = DCconsumption(LoadResult._daily,InverterResult._eff);
var energycap = input.battery.spec.ref.Crate.energycap;
var current = input.battery.spec.ref.Crate.amp.value;


// Assume Sun-Hour per Day
// function SolarSize(SunHour,battery,consumptionDC){
//     console.log(`solarsize()`);

//     energycap = battery.spec.ref.Crate.energycap;
//     current = battery.spec.ref.Crate.amp.value;
//     var Crate = energycap/current;
    
//     //PVmin = (consumptionDC*Crate)/SunHour;
//     PVmin = (consumptionDC)/(SunHour*0.67)
//     //console.log(PVmin);

//     return PVmin.toFixed(2);
// }

function SolarSize(SunHour,battery,consumptionDC,panelEff){
    console.log(`solarsize()`);

    energycap = battery.spec.ref.Crate.energycap;
    current = battery.spec.ref.Crate.amp.value;
    var Crate = energycap/current;
    
    //PVmin = (consumptionDC*Crate)/SunHour;
    PVmin = (consumptionDC*(1+(panelEff/100)))/(SunHour*0.67)
    //console.log(PVmin);

    return PVmin.toFixed(2);
}

// function SolarSize(SunHour,battery){

//     energycap = battery.spec.ref.Crate.energycap;
//     current = battery.spec.ref.Crate.amp.value;
//     var Crate = energycap/current;
    
//     PVmin = (DCconsumptionResult*Crate)/SunHour;
//     //console.log(PVmin);

//     return PVmin
// }

console.log(`========================`);
//var MinPVarrayResult = SolarSize(input.location.SunHour,input.battery);
var MinPVarrayResult = SolarSize(input.location.SunHour,input.battery,DCconsumptionResult,input.pvarray.spec.consumption.eff.value);
console.log(`The Minimum Watt of PV Array : ${(MinPVarrayResult/1000).toFixed()} kW`);
console.log(`========================`);

module.exports = SolarSize;


// Need to Choose Battery Type First for the correct C-rate!

// Sunhour => API
// Crate => Battery
// totaldcconsumption => DC-Consumption