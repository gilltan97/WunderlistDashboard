
export function countTasksByDate(tasks) {
	return new Promise(resolve => {
		let count = {};
		tasks.map(task => {
			let date = task.completed_at.split("T")[0];

			if (date in count) {
				count[date]++; 
			} else {
				count[date] = 1;
			}
		});
		resolve(count);
	});
} 