// show number pv array module

var LoadTable = require(`./load-table.js`);
var DCconsumption = require(`./dc-consumption`);
var SolarSize = require(`./solar-size.js`);
var InverterSize = require(`./inverter-calculation`);
var input = require(`./updated-usage.json`);


console.log(`Start Calculation Number of PV Array Module`);

var LoadResult = LoadTable(input.appliances);
var InverterResult = InverterSize(LoadResult._peak,input.inverter);
var DCconsumptionResult = DCconsumption(LoadResult._daily,InverterResult._eff);


var MinPVarrayResult = SolarSize(input.location.SunHour,input.battery, DCconsumptionResult);


// function PVmodule(pvArray){
//     var PVrating = pvArray.spec.consumption.data.max.wp.value;
//     var number = (MinPVarrayResult/PVrating);
//     var length = pvArray.spec.ref.size.length.value;
//     var weight = pvArray.spec.ref.size.weight.value;


//     var area = length*weight;
//     var module = number + (0.25*number);
//     var totalArea = area*module;

//     return {_area : totalArea,
//             _number : module};
// };

function PVmodule(pvArray,minimumPV,dailyCon){
    console.log(`PVmodule()`);
    var PVrating = Number(pvArray.spec.consumption.data.max.wp.value);
    var eff = Number(pvArray.spec.consumption.eff.value);
    var dialy = Number(dailyCon);
    var number = (minimumPV/PVrating);
    var length = pvArray.spec.ref.size.length.value;
    var width = pvArray.spec.ref.size.width.value;


    var area = length*width;
    var module = number + (0.25*number);
    var totalArea = (area*module);
    //var prod = (module*PVrating)*(1+(eff/100));
    var prod = (module*PVrating);
    var effSys = (1-((prod-dialy)/prod))*100;

    console.log(dialy);
    console.log(prod);
    console.log(effSys);
    // console.log(PVrating);
    return {
        _area : totalArea.toFixed(2),
        _number : module.toFixed(2),
        _rating : PVrating ? PVrating.toFixed(2) : 0,
        _prodwatt : prod.toFixed(2),
        _effsys : effSys.toFixed(2)
    };
};

console.log(`========================`);
var PVmoduleResult = PVmodule(input.pvarray,MinPVarrayResult,LoadResult._daily);
console.log(`The Requried Area of PV Array : ${(PVmoduleResult._area)} m^2`)
console.log(`The PV Array Module Number : ${(PVmoduleResult._number)} modules`)
console.log(`========================`);

module.exports = PVmodule;
// Parameter require 
// PVmin => solar-size.js
// PVwatt => PV Array 