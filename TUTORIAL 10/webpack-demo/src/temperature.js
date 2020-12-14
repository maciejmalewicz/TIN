exports.celsiusToFahrenheit = (c) => {
    return ((c*9)/5) + 32;
}

exports.celsiusToKelvin = (c) => {
    return 273.15 + c;
}

exports.fahrenheitToCelsius = (f) => {
    return ((f-32)*5)/9;
}

exports.kelvinToCelsius = (k) => {
    return k - 273.15;
}