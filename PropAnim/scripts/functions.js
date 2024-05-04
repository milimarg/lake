function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getIndexFromDate(date, objects) {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].date === date) {
      return (i);
    }
  }
  return (-1);
}

function setValuesLimits(firstDay, lastDay) {
  let dpSpeedValue = dpSpeed.value;
  let unixStart = date2unix(dpStart.value, false); // first given date
  let unixEnd = date2unix(dpEnd.value, false); // second given date
  const unixFirst = date2unix(firstDay, false); // first registered date
  const unixLast = date2unix(lastDay, false); // last registered date

  if (isNaN(unixStart))
    dpStart.value = firstDay;
  if (isNaN(unixEnd))
    dpEnd.value = lastDay;
  if (unixStart > unixEnd) {
    alert("La date du début se situe après la date de fin. Veuillez changer les dates données.");
  }
  if (unixStart < unixFirst)
    dpStart.value = firstDay;
  if (unixStart > unixLast)
    dpStart.value = lastDay;
  if (unixEnd < unixFirst)
    dpEnd.value = firstDay;
  if (unixEnd > unixLast)
    dpEnd.value = lastDay;
  if (dpSpeedValue < 1)
    dpSpeedValue = 1;
  if (dpSpeedValue > 8)
    dpSpeedValue = 8;
  dpSpeed.value = dpSpeedValue;
}

async function displayFranceMapAnimation(startDate, endDate, speed, isLoop, objects) {
  let indexStart = getIndexFromDate(startDate, objects);
  let indexEnd = getIndexFromDate(endDate, objects);
  if (indexStart < 0)
    indexStart = 0;
  if (indexEnd > objects.length - 1)
    indexEnd = objects.length - 1;
  while (1) {
    for (let i = indexStart; i < indexEnd + 1; i++) {
      displayDayPerIndex(i, objects);
      currentDisplayedDay.textContent = transformDate(objects[i].date);
      await sleep(1000 / speed);
    }
    if (!isLoop)
      break;
  }
}
