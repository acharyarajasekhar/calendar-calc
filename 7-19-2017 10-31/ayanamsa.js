var degrees = require('./degrees2dms');

exports = module.exports = function (req, res, next) {

    function jd(d, m, y) {
        var a, j, l;
        var b;
        if (m < 3) {
            m += 12;
            y--
        }
        a = y / 100;
        b = parseFloat(30.6) * parseFloat(m + 1);
        l = parseInt(b);
        j = 365 * y + y / 4 + l + 2 - a + a / 4 + d;
        return j
    }

    function calculateB6(d, m, y) {
        var h, mt, s, h6, b6, timeZone;
        h = 12;
        mt = 0;
        s = 0;
        timeZone = 5.5;
        h6 = (h + mt / 60 + s / 3600 - (12 + timeZone)) / 24;
        b6 = (jd(d, m, y) - 694025 + h6) / 36525;
        return b6
    }

    var date = new Date(req.params.date);

    var d = date.getDay();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var B6 = calculateB6(d, m, y);
    var temp = 22.460148 + 1.396042 * B6 + 3.08E-4 * B6 * B6;

    var a = -6.92416 + 16.90709 * (y / 1000) - 0.757371 * (y / 1000) * (y / 1000);
    var b = ((m - 1) + (d / 30)) * (1.1574074 / 1000);

    req.params.ayanamsa = temp; //(a + b);

    console.log(degrees(req.params.ayanamsa));
    console.log(jd(d, m ,y));

    next();

}