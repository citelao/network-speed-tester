const fast = require("fast-cli/api.js");

// Returns a promise with the final data
module.exports = function() {
	let data = {};
	return fast()
		.forEach((result) => data = result)
		.then(() => { return { speed: data.speed, unit: data.unit } });
}