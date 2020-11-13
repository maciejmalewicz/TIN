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
        },
        get fullName(){
            return this.firstName + " " + this.lastName;
        },
        set fullName(fullName){
            let names = fullName.split(" ");
            this.firstName = names[0];
            this.lastName = names[names.length - 1];
        },
        get averageGrade(){
            let average = 0;
            for (let grade of this.grades){
                average += grade;
            }
            average /= grades.length;
            return average;
        }
    }
}

let student = createStudent(1, "Mariusz", "Pudzianowski", [4, 2, 4, 5, 4]);
console.log(student);
console.log(student.averageGrade);

student.fullName = "Mariusz Pudzian";
console.log(student);
console.log(student.fullName);