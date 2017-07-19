var data = require('./data.json');

exports = module.exports = function (req, res, next) {

    var sunLn = req.params.eph.SunLn;
    var moonLn = req.params.eph.MoonLn;
    var ayanamsa = req.params.ayanamsa;

    var nirayanaSunLn = sunLn - ayanamsa;
    var nirayanaMoonLn = moonLn - ayanamsa;

    var starIndexCorrection = nirayanaMoonLn;
    if (starIndexCorrection < 0) {
        starIndexCorrection += 360.0
    }

    var starIndex = starIndexCorrection / (13 + (20 / 60));
    var starName = data.starNames[Math.floor(starIndex)];

    var sumOfSunMoon = nirayanaSunLn + nirayanaMoonLn;

    if (sumOfSunMoon > 360.0) {
        sumOfSunMoon - 360.0;
    }

    var yogaIndex = sumOfSunMoon / (13 + (20 / 60));
    var yogaName = data.Yogas[Math.floor(yogaIndex)];

    req.params.starName = starName;
    req.params.yogaName = yogaName;

    next();

}