function date2unix(date, returnsInMs) {
    let o = Date.parse(date, 'yyyy/MM/dd');
    if (!returnsInMs)
        o /= 1000;
    return o;
}

function transformDate(date) {
    return new Date(date2unix(date, true)).toLocaleDateString("fr-FR");
}
