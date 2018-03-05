const fs = require("fs");
const path = require('path');
const util = require('util');

//https://stackoverflow.com/questions/31978347/fs-writefile-in-a-promise-asynchronous-synchronous-stuff
const fs_appendFile = util.promisify(fs.appendFile);

const fast_tester = require("./testers/fast");

module.exports = function() {
	return fast_tester()
		.then((result) => {
			const content_object = { date: (new Date()).toISOString(), ...result}
			const content = `${JSON.stringify(content_object)}\n`;
			const file_name = `fast_log.json`;
			const file_directory = path.join(process.cwd(), "/results/", file_name);

			return fs_appendFile(file_directory, content);
		})
		.then(() => {
			console.log("logged!");
		})
		.catch((err) => {
			console.error("Could not write file!");
			console.error(err);
		});
}