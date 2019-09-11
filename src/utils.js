
export function countTasksByDate(tasks) {
  return new Promise((resolve) => {
    const count = {};
    tasks.map((task) => {
      const date = task.completed_at.split('T')[0];
      if (date in count) {
        count[date] += 1;
      } else {
        count[date] = 1;
      }
      return task;
    });
    resolve(count);
  });
}

export function sortYears(calenderData) {
  const years = [];
  calenderData.map((entry) => {
    const year = entry[0].getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return entry;
  });
  return years.sort();
}

export function calenderDataByYears(calenderData) {
  const dataByYears = {};
  calenderData.map((entry) => {
    const year = entry[0].getFullYear();

    if (!dataByYears[year]) {
      dataByYears[year] = [entry];
    } else {
      dataByYears[year].push(entry);
    }
    return entry;
  });
  return dataByYears;
}

export function filterTasksByDate(tasks, date) {
  return tasks.filter((task) => {
    const taskDate = new Date(task.completed_at.split('T')[0].replace(/-/g, '/'));
    return (taskDate.getUTCDate() === date.day
      && taskDate.getUTCMonth() + 1 === date.month
      && taskDate.getUTCFullYear() === date.year);
  });
}