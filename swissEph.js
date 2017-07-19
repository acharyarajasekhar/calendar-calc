var http = require('http');
var htmlparser = require('htmlparser2');
var dms2degrees = require('./dms2degrees');

exports = module.exports = function (req, res, next) {

    var date = new Date(req.params.date);
    var arrPlanetNames = ["Sun", "Moon"];

    var formattedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear();
    var url = 'http://www.astro.com/cgi/swetest.cgi?b=' + formattedDate + '&n=1&s=1&p=p&e=-eswe&f=PLBRS&arg='
    var swissephData = '';

    var getTT = function (arr) {
        var item = arr.filter(item => item.startsWith('TT:'));
        return item[0].split(':')[1].trim();
    }

    var getEph = function (arr, name) {

        var item = arr.filter(item => item.startsWith(name));
        var items = item[0].split(' ');
        var eph = '';
        var init = 0;
        for (var i = 0; i < items.length - 1; i++) {

            if (items[i] !== name) {
                if (init > 0 && items[i] === '' && items[i + 1] === '') {
                    break;
                }
                else if (items[i] !== '') {
                    eph += items[i];
                    init++;
                }
            }

        }

        var retVal = {
            d: eph.split('°')[0].trim(),
            m: eph.split('°')[1].split('\'')[0].trim(),
            s: eph.split('°')[1].split('\'')[1].trim()
        }

        return dms2degrees(retVal);
    }

    http.get(url, function (response) {
        parseResponse(response);
    });

    var parseResponse = function (response) {
        var data = "";
        response.on('data', function (chunk) {
            data += chunk;
        });

        var tagName, swissephData = '';

        response.on('end', function (chunk) {
            var parser = new htmlparser.Parser({
                onopentag: function (name, attribs) {
                    tagName = name;
                },
                ontext: function (text) {
                    if (tagName === "font") {
                        swissephData = text;
                    }
                }, onclosetag: function (name) {
                    tagName = '';
                }
            }, { decodeEntities: true });
            parser.write(data);
            parser.end();

            var arr = swissephData.split('\n');

            getTT(arr);
            var retVal = [];
            arrPlanetNames.forEach(function (element) {
                retVal.push({ planet: element, lon: getEph(arr, element) });
            }, this);

            req.params.eph = ({ TT: getTT(arr), DTTM: date, EPH: retVal });
            next();
        });
    };
}