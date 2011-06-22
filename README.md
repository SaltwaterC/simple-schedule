## About

Simple scheduler for node.js. I wrote this as I have to process several thounsand batch jobs sitting between three different network services. I had not to send too many tasks to a certain service due to various reasons, while if there was a temporary downtime / error, the task needed to be rescheduled. The simple-schedule module is the result of this challenge.

## Usage mode
<pre>
var schedule = require('simple-schedule');

schedule.add('log'); // Declare a new scheduler

try
{
	// Push entries to the scheduler
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
	// Throws an error if the scheduler name is invalid
	console.error(e.message);
}
</pre>

## Reference

 * add('scheduler') - adds a new scheduler, referenced by the name 'scheduler'.
 * remove('scheduler') - removes a scheduler. returns bool.
 * insert('scheduler', taskId, taskItem) - inserts a new task, referenced by taskId and taskItem. It supports both numeric and string keys for the taskId.
 * dispatch('scheduler', count, callback) - dispatches the number of tasks given by count, executing the callback argument for each task. The intended usage is by pairing the dispatch() method with the setInterval() function. The callback function receives exactly a couple of parameters: the id and the item of the task.
 * count('scheduler') - returns the number of remaining tasks.
 * items('scheduler') - returns the items of the scheduler.
