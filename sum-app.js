var input = require(`/Users/phatchananpakjungjariyanon/Desktop/Thesis/Pre-installation/Calculation_Part/input.json`);

console.log(`start calculation program.`);

function weeksum(appArray) {
	var weeksum = 0;
	appArray.forEach((elem) => {
		weeksum = weeksum + elem.consumption.power * elem.quantity * elem.hoursinday * elem.daysinweek;
	});
	return weeksum;
}

console.log(JSON.stringify(input.appliance, null, 2));

var result = weeksum(input.appliance);

console.log(`===== ===== ===== ===== ====`);
console.log(`weekly power consumption: ${result} Watt`);
console.log(`===== ===== ===== ===== ====`);

module.exports = weeksum;
