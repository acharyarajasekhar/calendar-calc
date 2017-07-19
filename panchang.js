var data = require('./data.json');

exports = module.exports = function (req, res) {

    var eph = req.params.eph.EPH.filter((item) => item.planet == "Sun");

    var sunLn = req.params.eph.EPH.filter((item) => item.planet == "Sun")[0].lon;
    var moonLn = req.params.eph.EPH.filter((item) => item.planet == "Moon")[0].lon;
    var ayanamsa = req.params.ayanamsa;

    var sunMoonDiff = moonLn - sunLn;

    if (sunMoonDiff < 0) {
        sunMoonDiff += 360.0;
    }

    var pakshaIndex = sunMoonDiff / 180.0;
    var pakshaName = data.Paksha[Math.floor(pakshaIndex)];
    console.log(pakshaName);

    var tithiIndex = sunMoonDiff / 12.0;
    var tithiName = data.Tithi[Math.floor(tithiIndex)];
    console.log(tithiName);

    var karanaIndex = sunMoonDiff / 6.0;

    var nk = Math.floor(karanaIndex);
    if (nk == 0) karanaIndex = 10;
    if (nk >= 57) karanaIndex = nk - 50;
    if (nk > 0 && nk < 57) karanaIndex = (nk - 1) - (Math.floor((nk - 1) / 7)) * 7;

    var karanaName = data.Karanas[Math.floor(karanaIndex)];

    console.log(karanaName);

    var nirayanaSunLn = sunLn - ayanamsa;
    var nirayanaMoonLn = moonLn - ayanamsa;

    var starIndexCorrection = nirayanaMoonLn;
    if(starIndexCorrection < 0){
        starIndexCorrection += 360.0
    }
    console.log(starIndexCorrection);

    var starIndex = starIndexCorrection / (13 + (20 / 60));
    var starName = data.starNames[Math.floor(starIndex)];
    console.log(Math.floor(starIndex));

    var sumOfSunMoon = nirayanaSunLn + nirayanaMoonLn;

    if (sumOfSunMoon > 360.0) {
        sumOfSunMoon - 360.0;
    }

    var yogaIndex = sumOfSunMoon / (13 + (20 / 60));
    var yogaName = data.Yogas[Math.floor(yogaIndex)];
    console.log(yogaName);

    var panchangam = {
        paksha: pakshaName,
        tithi: tithiName,
        nakshatra: starName,
        yoga: yogaName,
        karana: karanaName
    }

    res.send(panchangam);
}