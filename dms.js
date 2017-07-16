var D2R = (Math.PI / 180.0)
var R2D = (180.0 / Math.PI)

function toDMS(value) {
    let d = value;
    let m = (d - Math.floor(d)) * 60;
    let s = (m - Math.floor(m)) * 60;
    return Math.floor(d) + " " + Math.floor(m) + "' " + Math.floor(s) + "\"";
}