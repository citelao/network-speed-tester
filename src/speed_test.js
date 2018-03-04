const fs = require("fs");
const util = require('util');

//https://stackoverflow.com/questions/31978347/fs-writefile-in-a-promise-asynchronous-synchronous-stuff
const fs_writeFile = util.promisify(fs.writeFile);

const fast_tester = require("./testers/fast");

module.exports = function() {
	return fast_tester()
		.then((result) => {
			const content = JSON.stringify(result);

			const fileName = `test`;
			// fs_writeFile()
		})
}