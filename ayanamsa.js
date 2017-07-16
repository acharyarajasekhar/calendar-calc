function calcAyanamsa(date) {
    var yearPart = date.getFullYear() / 1000.0;
    var A = -6.92416 + 16.90709 * yearPart - 0.757371 * yearPart * yearPart;

    var monthPart = date.getMonth() + 1;
    var datePart = date.getDate();
    var B = ((((monthPart - 1) + (datePart / 30.0)) * 1.1574074) / 1000.0);

    return A + B;
}

// function ayan(d) {
//     var t, o, l, ayan;

//     t = (d + 36523.5) / 36525;
//     o = 259.183275 - 1934.142008333206 * t + 0.0020777778 * t * t;
//     l = 279.696678 + 36000.76892 * t + 0.0003025 * t * t;
//     ayan = 17.23 * Math.sin((o) * D2R) + 1.27 * Math.sin((l * 2) * D2R) - (5025.64 + 1.11 * t) * t;
//     //Based on Lahiri
//     ayan = (ayan - 80861.27) / 3600.0;

//     return ayan;
// }

// function calcayan(jd) {

//     var t = (jd - 2415020) / 36525;
//     print(t);
//     // avg node len moon
//     var om = 259.183275 - 1934.142008333206 * t + 0.0020777778 * t * t;// + 0.0000022222222 * t * t * t;
//     // avg len sun
//     print(om);
//     var ls = 279.696678 + 36000.76892 * t + 0.0003025 * t * t;
//     print(ls);
//     var aya = 17.23 * Math.sin(D2R * om) + 1.27 * Math.sin(D2R * ls * 2) - (5025.64 + 1.11 * t) * t;
//     print(aya);
//     aya = (aya - 80861.27) / 3600.0; // 84038.27 = Fagan-Bradley, 80861.27 = Lahiri
//     print(aya);
//     return aya;
// }