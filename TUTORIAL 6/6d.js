function addToTable() {
    let firstVal = document.getElementById('first').value;
    let secondVal = document.getElementById('second').value;

    let tableElement = document.getElementById('table');
    tableElement.innerHTML = tableElement.innerHTML 
    + "<tr><td>"
    + firstVal 
    + "</td><td>"
    + secondVal 
    + "</td></tr>";
}