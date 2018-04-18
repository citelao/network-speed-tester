const fs = require("fs");
const path = require("path");
const util = require("util");

const express = require("express");

const fs_readFile = util.promisify(fs.readFile);

function render_speed_chart(req, res) {
	const template_file = path.join(process.cwd(), "src/templates/speed_chart.htm");
	const log_file = path.join(process.cwd(), "results/fast_log.json");
	return Promise.all([
		fs_readFile(template_file, 'utf8'),
		fs_readFile(log_file, 'utf8')
	]).then((vals) => {
			const template = vals[0];
			const log = vals[1];

			const results = log.split("\n")
				.filter((line) => line.length > 1)
				.map((line) => JSON.parse(line));

			const dates = results.map((item) => item.date);
			const speeds = results.map((item) => item.speed);

			const final_template = template
				.replace("{{SPEEDS}}", JSON.stringify(speeds))
				.replace("{{LABELS}}", JSON.stringify(dates));

			res.send(final_template);
		})
		.catch((err) => {
			console.error(err);
		});
}

module.exports = function() {
	const app = express();
	app.get('/', render_speed_chart);

	// 404 errors
	app.use(function (req, res, next) {
	  res.status(404).send("Sorry can't find that!");
	})

	// other errors
	app.use(function (err, req, res, next) {
	  console.error(err.stack);
	  res.status(500).send('Something broke!');
	})

	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`Speed observer server listening on port ${port}!`));
}