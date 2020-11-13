let studentPrototype = {
    obligatoryCourses: [
        "NAI",
        "ASD",
        "TAK",
        "PPJ",
        "ZPR",
        "BYT",
        "APBD"
    ]
}

function createStudent(id, firstName, lastName){
    let student = Object.create(studentPrototype);
    student.id = id;
    student.firstName = firstName;
    student.lastName = lastName;
    return student;
}

let student = createStudent(1, "Mariusz", "Pudzianowski");
console.log(student);
console.log(student.obligatoryCourses);
