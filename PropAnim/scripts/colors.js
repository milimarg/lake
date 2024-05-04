function colorizeDepartement(regionSelec, tauxIncidence) {
    let color;
    const values = [0, 50, 100, 200, 500, 1000, 2000, 3000, 4000];
    const colors = ["#ACD1AF", "#EEEE9B", "#F5CA7B", "#F47174", "#8B0000", "#AF8FE9", "#3F0F4E", "#AAAAAA"];

    if (regionSelec === null || isNaN(tauxIncidence))
        return;
    if (tauxIncidence < values[0]) {
        regionSelec.style = `fill: #FAFAFA;`;
        return;
    }
    if (tauxIncidence > values[values.length - 1]) {
        regionSelec.style = `fill: #000000;`;
        return;
    }
    for (let i = 0; i < values.length - 1; i++) {
        if (tauxIncidence >= values[i] && tauxIncidence < values[i + 1]) {
            color = colors[i];
            break;
        }
    }
    regionSelec.style = `fill: ${color};`;
}
