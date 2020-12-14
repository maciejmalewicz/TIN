const d = require('./distance');
const t = require('./temperature');

window.getDistance = () => {
    let measure = document.getElementById("measure").value;
    let distance = document.getElementById("distance").value;
    let element = document.getElementById("distanceResult");
    if (measure == "Kilometers"){
        let inMiles = d.kilometersToMiles(distance);
        element.innerHTML = "In miles: " + inMiles;
    } else {
        let inKilometers = d.milesToKilometers(distance);
        element.innerHTML = "In kilometers: " + inKilometers;
    }
}

window.getTemperature = () => {
    let measure = document.getElementById("degreesMeasure").value;
    let degrees = document.getElementById("degrees").value;
    let celsius = degrees;
    if (measure == "Kelvin") {
        celsius = t.kelvinToCelsius(degrees);
    } else if (measure == "Fahrenheit") {
        celsius = t.fahrenheitToCelsius(degrees);
    }
    let k = t.celsiusToKelvin(celsius);
    let f = t.celsiusToFahrenheit(celsius);
    let str = "Celsius: " + celsius + ", Kelvin: " + k + ", Fahrenheit: " + f;
    document.getElementById("temperatureResult").innerHTML = str;
}

