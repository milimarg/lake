function displayDayPerIndex(index, objects) {
    if (index < 0 || index > objects.length) {
        console.log(`displayDayPerIndex Error: index out of range. (${index} > ${objects.length})`);
        return;
    }
    for (let i = 0; i < objects[index]["days"].length; i++) {
        const dep = objects[index]["days"][i];
        const depName = dep.departementName;
        colorizeDepartement(document.getElementById(depName), dep.incidenceRate);
    }
}

function displayIncidenteRate(departementName) {
    const hoveredDepartement = document.querySelector(".hoveredDepartement");

    hoveredDepartement.textContent = departementName;
}
