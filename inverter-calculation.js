// Inverter Sizing from continuos power or Peal-Load(kW) in load-table.js

var LoadTable = require(`./load-table`);
var input = require(`./updated-usage.json`);


console.log(`Start Inverter Sizing`);


var LoadResult = LoadTable(input.appliances);
//var peakload = LoadResult._peak;


// function InverterSize(appArray){
//     var peakload = LoadResult._peak;
//     var nominalACpower = appArray.spec.consumption.nominal.acpower.value;
//     var effinverter = appArray.spec.consumption.max.eff.value;
//     var title = appArray.title
    
//     if(peakload <= nominalACpower){
//         console.log(`Inverter Size is matching`);
//         console.log(`Inverter Size ${nominalACpower/1000} kW >= Peak Load ${peakload/1000} kW `);
//     }else{
//         console.log(`Inverter Size not match,pls try again!`);
//     }
//     return { _eff : effinverter,
//              _title : title}
// };

function InverterSize(peakload,inverter){
    console.log(`InverterSize()`);
    //var peakload = LoadResult._peak;
    var peak = peakload;
    var nominalACpower = inverter.spec.consumption.nominal.acpower.value;
    var effinverter = inverter.spec.consumption.max.eff.value;
    //var title = inverter.title
    
    console.log(`Peak Load : ${peakload}`)
    console.log(`NominalACpower : ${nominalACpower}`)
    
    if (peakload >= 0 && nominalACpower == 0) {
        var invSize = (peakload/(effinverter/100))*1.5;
        console.log(`I'm form the 1st condition : ${invSize}`)
        

    } else if(peakload <= nominalACpower){
        var invSize = (nominalACpower/(effinverter/100))*1.5;
        console.log(`Inverter Size is matching`);
        console.log(`Inverter Size ${nominalACpower/1000} kW >= Peak Load ${peakload/1000} kW `);
        console.log(`I'm form the 2nd condition : ${invSize}`)
        
    }else{
        console.log(`Inverter Size not match,pls try again!`);
    }
    
    console.log(`I'm form outside condition : ${invSize}`)
    
    return { //_eff : effinverter,
             _eff : effinverter,
             _size : invSize};
};


console.log(`========================`);
var InverterResult = InverterSize(LoadResult._peak,input.inverter);
//console.log(`Title : ${InverterResult._title}`);
console.log(`Size : ${InverterResult._size} Watt`);
console.log(`Inverter Efficiency : ${InverterResult._eff} %`);
console.log(`========================`);

module.exports = InverterSize;



// Show title, Spec and eff of proposed inverter!