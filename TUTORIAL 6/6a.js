function calculate(){
    let input = document.getElementById('celsius'); 
    let celsius = input.value;
    let fahrenheit = celsius * 1.8 + 32;
    let output = document.getElementById('fahrenheit');
    output.innerHTML = fahrenheit;
}