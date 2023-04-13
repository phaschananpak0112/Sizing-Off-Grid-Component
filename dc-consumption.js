// Total dc consumption indicate the power demand that drawn from Battery(kW)

var LoadTable = require(`./load-table.js`);
var InverterSize = require(`./inverter-calculation`);
var input = require(`./updated-usage.json`);

var LoadResult = LoadTable(input.appliances);
var InverterResult = InverterSize(LoadResult._peak, input.inverter);



console.log(`Start DC Consumption drawns from Battery`);


// Prepare data

// function DCconsumption(){
//     var daily = LoadResult._daily;
//     var eff = InverterResult._eff;
//     var totalDCconsumption = (daily/eff)*100;
    
//     return totalDCconsumption
// };

function DCconsumption(loadDaily,inverterEff){
    console.log(`DCconsumption()`);
    return ((loadDaily/inverterEff)*100).toFixed(2);
}


console.log(`========================`);
var DCconsumptionResult = DCconsumption(LoadResult._daily,InverterResult._eff);
console.log(`The Power Demand Drawn from Battery : ${(DCconsumptionResult/1000)} kWh/day`);
console.log(`========================`);

module.exports = DCconsumption;