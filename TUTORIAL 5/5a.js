let dinosaur = {
    species: "Diplodok",
    food: "Plants",
    length: 25,

    makeNoise: function(){
        console.log("Roar!");
    },

    eatStuff: function(){
        console.log("Yum! Yum! Yum!");
    }
}

function getProperties(object){
    let acc = [];
    let properties = Object.getOwnPropertyNames(dinosaur);
    for (let propertyName of properties){
        let type = typeof object[propertyName];
        let property = {
            name: propertyName,
            type: type
        };
        acc.push(property);
    }
    return acc;
}

properties = getProperties(dinosaur);
console.log(properties);