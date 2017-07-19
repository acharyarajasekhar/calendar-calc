var data = require('./data.json');

exports = module.exports = function (req, res) {

    var panchangam = {
        eph: req.params.eph,
        ayanamsa: req.params.ayanamsa,
        paksha: req.params.pakshaName,
        tithi: req.params.tithiName,
        nakshatra: req.params.starName,
        yoga: req.params.yogaName,
        karana: req.params.karanaName
    }

    res.send(panchangam);
}