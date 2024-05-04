function getObjects(data) {
    let days = [];
    let objects = [];
    let i = 0;

    data.forEach(line => {
        if (i > 0) {
            let lineSplitted = line.split(",");
            let object = new Day(lineSplitted);
            if (days.indexOf(object.date) < 0) {
                days.push(object.date);
                objects.push({
                    date: object.date,
                    days: []
                });
            }
        }
        i++;
    });
    return (objects);
}

async function extractDataFromFile(filepath) {
    const response = await fetch(filepath);
    const content = await response.text();
    let data = content.split("\n");
    let objects = getObjects(data);
    data.forEach(line => {
        let lineSplitted = line.split(",");
        let object = new Day(lineSplitted);
        if (isNaN(object.incidenceRate)) {
            object.incidenceRate = -1;
        }
        for (let i = 0; i < objects.length; i++) {
            if (objects[i]["date"] === object.date) {
                objects[i]["days"].push(object);
                break;
            }
        }
    });
    return (objects);
}

function initValues(objects) {
    const firstDay = objects[0].date;
    const shiftIndex = 5;
    const lastIndex = objects.length - shiftIndex;
    const lastDay = objects[lastIndex].date;

    refreshedDate.innerHTML =
        `Première donnée : ${transformDate(firstDay)} <br>
        Dernière donnée : ${transformDate(lastDay)}`;
    dpStart.min = firstDay;
    dpStart.max = lastDay;
    dpEnd.min = firstDay;
    dpEnd.max = lastDay;
    displayDayPerIndex(lastIndex, objects);
    return ([firstDay, lastDay]);
}
