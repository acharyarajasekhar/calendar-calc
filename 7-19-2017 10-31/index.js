var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var panchang = require('./panchang');

var swissEph = require('./swissEph');
var ayanamsa = require('./ayanamsa');
var tithi = require('./tithi');
var nakshatra = require('./nakshatra');

app.get('/swisseph/:date', function (req, res) {
    var date = new Date();
    if (req.params.date) {
        date = new Date(req.params.date);
    }
    var planets = ["Sun", "Moon"];

    printSwissEph = function (eph) {
        res.send(eph);
    };

    swissEph.getSwissEphemeris(date, planets, printSwissEph);
});

app.get('/swisseph/:from/:n', function (req, res) {

    var result = [];
    if (req.params.from && req.params.n) {

        var from = req.params.from;
        var n = req.params.n;

        for (var i = 0; i < n; i++) {
            var date = new Date(from);
            date = new Date(date.getTime() + (i * 24 * 60 * 60 * 1000));

            var planets = ["Sun", "Moon"];

            printSwissEph = function (eph) {
                result.push(eph);
                if (result.length == n) {
                    res.send(result);
                }
            };

            swissEph.getSwissEphemeris(date, planets, printSwissEph);
        }
    }
});

app.post('/ayanamsa/:date', function (req, res) {

    callback = function (val) {
        res.send(val.toString());
    };

    ayanamsa(new Date(req.params.date), callback);

});

app.get('/panchang/:date', swissEph, ayanamsa, tithi, nakshatra, panchang);

app.listen(3000, '127.0.0.1', null, function () { console.log("App started listening...") });