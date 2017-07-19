exports = module.exports = function (x) {

    // var dms = parseFloat(dms);

    // var sign = '';

    // if(dms < 0){
    //     sign = '-';
    // }

    // var d = Math.floor(dms);
    // var m = (dms - d) * 60.0;
    // var s = (m - Math.floor(m) * 60.0);

    // return sign + " " + d + "-" + Math.floor(m) + "-" + Math.floor(s);

    var parts = "";
    var temp;
    var negative;
    if (x < 0) {
        negative = true;
        x = x * (-1);
    }
    var deg, min, sec; 
    deg = parseInt(x); 
    parts = parts + deg + ":"; 
    temp = x - parseFloat(parseInt(x)); 
    min = parseInt(temp * 60); 
    parts = parts + min + ":"; 
    temp = temp * 60; 
    temp = temp - parseFloat(parseInt(temp)); 
    sec = parseInt(temp * 60 + 0.5);
    parts = parts + sec;
    if (negative == true)
        parts = "-" + parts;
    return parts 
}