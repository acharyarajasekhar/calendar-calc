exports = module.exports = function (dms) {

    var d = parseFloat(dms.d);
    var m = parseFloat(dms.m / 60.0);
    var s = parseFloat(dms.s / (3600.0));

    return d + m + s;

}