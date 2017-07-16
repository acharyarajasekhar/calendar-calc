function REV(x) { return ((x) - Math.floor((x) / 360.0) * 360.0); }

function calcSunLong(d) {

    var D2R = (Math.PI / 180.0)
    var R2D = (180.0 / Math.PI)

    var w, a, e, M, L, oblecl, E, x, y, r, v, lon;

    // Keplerian Elements for the Sun (geocentric)
    with (Math) {
        w = 282.9404 + 4.70935e-5 * d; // (longitude of perihelion degrees)
        a = 1.000000; // (mean distance, a.u.)
        e = 0.016709 - 1.151e-9 * d; // (eccentricity)
        M = REV(356.0470 + 0.9856002585 * d); // (mean anomaly degrees)
        L = w + M; // (Sun's mean longitude degrees)
        oblecl = 23.4393 - 3.563e-7 * d; // (Sun's obliquity of the ecliptic)

        // auxiliary angle
        E = M + R2D * e * sin(M * D2R) * (1 + e * cos(M * D2R));

        // rectangular coordinates in the plane of the ecliptic (x axis toward perhilion)
        x = cos(E * D2R) - e;
        y = sin(E * D2R) * sqrt(1 - (e * e));

        // find the distance and true anomaly
        r = sqrt((x * x) + (y * y));
        v = REV(atan2(y, x) * R2D);

        // find the longitude of the sun
        lon = REV(v + w);

        return lon;
    }
}

