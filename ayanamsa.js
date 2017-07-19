exports = module.exports = function (req, res, next) {

    var date = new Date(req.params.date);

    var d = date.getDay();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var a = -6.92416 + 16.90709 * (y / 1000) - 0.757371 * (y / 1000) * (y / 1000);
    var b = ((m - 1) + (d / 30)) * (1.1574074 / 1000);

    req.params.ayanamsa = (a + b);

    next();

}