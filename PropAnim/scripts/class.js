class Day {
    constructor(dayDataArray) {
        this.date = dayDataArray[1];
        this.departementName = dayDataArray[3];
        this.incidenceRate = parseInt(dayDataArray[6]);
    }
}
