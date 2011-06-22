/**
 * Scheduler for batch running a controlled amount of tasks per interval
 */

var schedulers = {};

var validate = function (scheduler) {
	if ( ! schedulers[scheduler]) {
		throw new Error('Invalid scheduler: ' + scheduler);
	}
};
/**
 * Adds a scheduler
 * 
 * @param scheduler
 */
exports.add = function (scheduler) {
	if ( ! schedulers[scheduler]) {
		schedulers[scheduler] = {
			count: 0,
			items: {}
		};
	}
};
/**
 * Removes a scheduler
 * 
 * @param scheduler
 */
exports.remove = function (scheduler) {
	if (schedulers[scheduler]) {
		delete(schedulers[scheduler]);	
		return true;
	}
	return false;
};
/**
 * Adds a new scheduler task
 * 
 * @param scheduler
 * @param id
 * @param item
 */
exports.insert = function (scheduler, id, item) {
	validate(scheduler);
	
	if ( ! schedulers[scheduler].items[id]) {
		schedulers[scheduler].count++;
	}
	
	schedulers[scheduler].items[id] = item;
};
/**
 * Dispatches a scheduler task to the callback argument
 * 
 * @param scheduler
 * @param count
 * @param callback
 */
exports.dispatch = function (scheduler, count, callback) {
	validate(scheduler);
	
	if (schedulers[scheduler].count > 0) {
		var index = 0;
		
		for (id in schedulers[scheduler].items) {
			callback(id, schedulers[scheduler].items[id]);
			delete(schedulers[scheduler].items[id]);
			schedulers[scheduler].count--;
			
			index++;
			if (index == count) {
				break;
			}
		}
	}
};
/**
 * Returns the count parameter of a given scheduler
 * 
 * @param scheduler
 */
exports.count = function (scheduler) {
	validate(scheduler);
	return schedulers[scheduler].count;
};
/**
 * Returns the items of a given scheduler
 * 
 * @param scheduler
 */
exports.items = function (scheduler) {
	validate(scheduler);
	return schedulers[scheduler].items;
};

