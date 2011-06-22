## About

Simple scheduler for node.js. Better documentation will follow.

## Usage mode
<pre>
var schedule = require('simple-schedule');

schedule.add('log');

try
{
	schedule.insert('log', 1, 'LogEntry: foo');
	schedule.insert('log', 2, 'LogEntry: bar');
	schedule.insert('log', 3, 'LogEntry: baz');
	
	// Dispatches 2 tasks every 2 seconds, executing the given callback
	// schedule.dispatch callback, time interval, scheduler, number of tasks, execution callback
	setInterval(schedule.dispatch, 2000, 'log', 2, function (id, item) {
		console.log(id, item);
	});
}
catch (e) {
	console.error(e.message);
}
</pre>

