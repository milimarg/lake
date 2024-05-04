/*
DATA SAMPLE: https://www.data.gouv.fr/fr/datasets/synthese-des-indicateurs-de-suivi-de-lepidemie-covid-19/
*/

const dpStart = document.querySelector(".dpStart");
const dpEnd = document.querySelector(".dpEnd");
const dpSpeed = document.querySelector(".dpSpeed");
const dpLoop = document.querySelector(".dpLoop");
const refreshedDate = document.querySelector(".refreshedDate");
const currentDisplayedDay = document.querySelector(".currentDisplayedDay");
const playBtn = document.querySelector(".playBtn");

const objectsPromise = extractDataFromFile("./assets/dataset-departements.csv");

objectsPromise.then((objects) => {
  const extremeDays = initValues(objects);
  playBtn.addEventListener("click", function () {
    setValuesLimits(extremeDays[0], extremeDays[1]);
    displayFranceMapAnimation(
        dpStart.value, dpEnd.value, dpSpeed.value, dpLoop.checked, objects
    );
  });
});
