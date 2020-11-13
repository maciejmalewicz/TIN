function createStudent(id, firstName, lastName, grades){
    return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        grades: grades,
        printInfo: function() {
            let average = 0;
            for (let grade of this.grades){
                average += grade;
            }
            average /= grades.length;
            console.log(firstName + " " + lastName + " " + average);
        }
    }
}

let student = createStudent(2, "Arnold", "Szfarceneger", [4, 2, 4, 5, 4]);
student.printInfo();