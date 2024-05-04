let yearsDiv = document.querySelector(".yearsDiv");
let yearImages = document.querySelector(".yearImages");
const chooseNewDate = document.querySelector(".chooseNewDate");

function getYearParameter() {
    let paramString = window.location.href.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let givenYearParams = queryString.entries();
    let params = [];
    let i = 0;

    for (element of givenYearParams) {
        if (i == 0)
            params[0] = element[1];
        if (i == 1)
            params[1] = element[1];
        i++;
    }
    return (params);
}

function searchImages(year) {
    let img;
    let imgNumber;
    
    fetch('./yearsList.json')
    .then(response => {
        return response.json();
    })
    .then(json => {
        imgNumber = json[year];
        for (let index = 1; index <= imgNumber; index++) {
            img = document.createElement("img");
            img.src = `./timbres/${year}/${index}_${year}_france.jpg`;
            img.width /= 4;
            yearImages.appendChild(img);
        }
        chooseNewDate.style.display = "block";
    });
}

function displayYears() {
    let params = getYearParameter();

    if (params[0] == undefined) {
        fetch('./yearsList.json')
        .then(response => {
        return response.json();
        })
        .then(json => {
            Object.keys(json).forEach(function(key) {
                let a = document.createElement("a");
                a.textContent = key;
                a.href = `?year=${key}`;
                a.classList.add("year");
                yearsDiv.appendChild(a);
            });
        });
    } else {
        searchImages(params[0]);
        if (params[1] == undefined) {
            setTimeout(function() {
                window.location.href += "&isRefreshed=true";
            }, 500);
        }
    }
}

displayYears();