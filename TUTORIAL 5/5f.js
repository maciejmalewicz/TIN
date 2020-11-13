class Person {
    
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get fullName() {
        return this.firstName + " " + this.lastName;
    };

    set fullName(fullName){
        let names = fullName.split(" ");
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
    }
}

class Student extends Person {

    constructor(id, firstName, lastName, grades){
        super(firstName, lastName);
        this.id = id;
        this.grades = grades;
    }

    get averageGrade() {
        let average = 0;
        for (let grade of this.grades){
            average += grade;
        }
        average /= this.grades.length;
        return average;
    }
}


let student = new Student(1, "Mariusz", "Pudzianowski", [4, 2, 4, 5, 4]);
console.log(student);
console.log(student.averageGrade);

student.fullName = "Mariusz Pudzian";
console.log(student);
console.log(student.fullName);