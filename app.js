const server = require("./src/server");
const speed_test = require("./src/speed_test");

// Rerun speed test every 30 min.
const test_interval = 1000 /* s */ 
	* 60 /* min */ 
	* 30 /* every 30 min */;
setInterval(speed_test, test_interval);
speed_test();

server();