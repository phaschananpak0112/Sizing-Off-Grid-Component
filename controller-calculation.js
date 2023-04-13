// Charge Controller Size for the solar system
var PVmodule = require(`./pv-module.js`);
var input = require(`./updated-usage.json`);

console.log(`========================`);
console.log(`Start Controller Size Calculation`);


//var module = PVmodule(input.pvarray)._number;
var module = 307;
var vdc = 48;


function ControllerSize(apArray,moduleNum,battVolt){
    var sf = 1.25;
    var PVrating = PVarray.spec.consumption.data.max.wp.value;
    
    var controller = ((PVrating*module)/vdc)*1.25;

    return controller;
};

var ControllerSizeResult = ControllerSize(input.pvarray);
console.log(`The Controller Size : ${ControllerSizeResult} Ah`)
console.log(`The Battery Rating : ${vdc} VDC`)

module.exports = ControllerSize;


// Parameter
// pv module => pv-module.js
// safety factor => 1.25 