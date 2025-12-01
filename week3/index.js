// Function EmployeeInfo
function EmployeeInfo(name, Salary)
{
    console.log("Wellcome " + name + " Your monthly Salary is " + Salary);
}

const EmpSkills = (skills) => {
    console.log("Expert in " + skills);
}

console.log("This is my first progme");

var EmpName = "John";
var EmpSalary = 50000;

// call function
EmployeeInfo(EmpName,EmpSalary);
EmpSkills("java");

// Import local modules
const student = require('./StudentInfo');
const Person = require('./Person');

// Using StudentInfo.js module
console.log("Student Name: " + student.getName());
console.log(student.Location());
console.log(student.dob);
console.log("Grade is: " + student.Studentgrade(55));

// Using Person.js module
const person1 = new Person("Jim", 25, "myemail@gmail.com");
console.log("Using Person Module", person1.getPersonInfo());

console.log("Programe ended");
