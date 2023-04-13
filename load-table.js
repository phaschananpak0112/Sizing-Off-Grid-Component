// var input = require(`/Users/phatchananpakjungjariyanon/Desktop/Thesis/Pre-installation/Calculation_Part/usage.json`);
var input = require(`./updated-usage.json`);

console.log(`Load Table Calculation`) ;
/*console.log(JSON.stringify(input.appliances, null, 2));*/

function LoadTable(appArray) {
    var totalACcons = 0;
    var weekACcons = 0;
    var peakload = 0;
    appArray.forEach((elem) => {
        totalACcons = totalACcons + (elem.spec.consumption.power.value * elem.quantity.value * elem.hoursinday.value);
        weekACcons = weekACcons + (elem.spec.consumption.power.value * elem.quantity.value * elem.hoursinday.value * elem.daysinweek.value);
        peakload = peakload + (elem.spec.consumption.power.value * elem.quantity.value);

        
        //weekACcons = weekACcons + (elem.spec.consumption.power.value * elem.quantity.value * elem.hoursinday.value * elem.daysinweek.value);
        //totalACcons = weekACcons/7;
        //peakload = peakload + (elem.spec.consumption.power.value * elem.quantity.value);

    });

    return {_weekly : weekACcons.toFixed(2),
            _daily :  totalACcons.toFixed(2),
            _peak  :  peakload.toFixed(2)
        };

};


var LoadResult = LoadTable(input.appliances);
var daily = LoadResult._daily;


// console.log(`========================`);
// console.log(`Weakly Power Consumptions : ${LoadResult._weekly/1000} kWh/week`);
// console.log(`Daily Power Consumptions : ${daily/1000} kWh/day`);
// console.log(`Peak Load Calculation : ${LoadResult._peak/1000} kW`);
// console.log(`========================`);


module.exports = LoadTable;


/*output -> Total AC power consumption, Peak-Load*/