const fast = require("fast-speedtest-api");

// Returns a promise with the final data
module.exports = function() {
	// Use a token I got from opening fast.com in my browser.
	let speedtest = new fast({
		token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
		verbose: false, // default: false
		timeout: 10000, // default: 5000
		https: true, // default: true
		urlCount: 5, // default: 5
		bufferSize: 8, // default: 8
		unit: fast.UNITS.Mbps // default: Bps
	});

	return speedtest.getSpeed().then(s => {
	    return { speed: s, unit: "Mbps" }
	}).catch(e => {
	    console.error(e.message);
	});
}