function validateInput(){
    let nameElement = document.getElementById('name');
    let ageElement = document.getElementById('age')

    let name = nameElement.value;
    let age = ageElement.value;

    let nameRegex = /^[A-Z][a-z]+$/;
    let match = name.match(nameRegex);

    let out = true;

    if (name == undefined || name == null || match == null){
        nameElement.setAttribute('style', 'background-color: red;');
        out = false;
    } else {
        nameElement.setAttribute('style', 'background-color: green;');
    }
    //just updating (without it we will have to change the value manually before it becomes red)
    nameElement.value = nameElement.value;

    if (age == undefined || age == null || age > 120 || age < 1){
        ageElement.setAttribute('style', 'background-color: red;');
        out = false;
    } else {
        ageElement.setAttribute('style', 'background-color: green;');
    }

    return out;
}