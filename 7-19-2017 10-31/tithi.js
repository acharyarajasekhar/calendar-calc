var data = require('./data.json');

exports = module.exports = function(req,res,next){
    var sunLn = req.params.eph.SunLn;
    var moonLn = req.params.eph.MoonLn;

    var sunMoonDiff = moonLn - sunLn;

    if (sunMoonDiff < 0) {
        sunMoonDiff += 360.0;
    }

    var pakshaIndex = sunMoonDiff / 180.0;
    var pakshaName = data.Paksha[Math.floor(pakshaIndex)];
    
    var tithiIndex = sunMoonDiff / 12.0;
    var tithiName = data.Tithi[Math.floor(tithiIndex)];

    var karanaIndex = sunMoonDiff / 6.0;

    var nk = Math.floor(karanaIndex);
    if (nk == 0) karanaIndex = 10;
    if (nk >= 57) karanaIndex = nk - 50;
    if (nk > 0 && nk < 57) karanaIndex = (nk - 1) - (Math.floor((nk - 1) / 7)) * 7;

    var karanaName = data.Karanas[Math.floor(karanaIndex)];

    req.params.pakshaName = pakshaName;
    req.params.tithiName = tithiName;
    req.params.karanaName = karanaName;

    next();
}