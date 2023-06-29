/*
1.2
const value = require("./calculator.js");
console.log(value);
*/

/*
1.3
const result = require("./sample.js");
console.log(result);
*/

/*
1.4 & 1.5
Importing default function while and after defining.

const sum = require("./calculator.js");
console.log(sum(2, 6));

*/

/* 
1.6 & 1.7
Importing default class while and after defining.
 
const StudentDetails = require("./calculator.js");
const studentDetails = new StudentDetails("Ram", 15);
console.log(studentDetails);
console.log(studentDetails.name);

*/

/*
2.2

const { value, studentName } = require("./calculator");
console.log(value);
console.log(studentName);

exporting multiple variables after defining.
//method 1
const { add, sub } = calculator;
const calculator = require("./calculator");
// method 2

const { add, sub } = require("./calculator");
console.log(add(6, 3));
console.log(sub(5, 9));

*/

/*
2.3

const { sum, sub } = require("./calculator");
console.log(sum);
console.log(sub);
*/

/*
2.4 & 2.5

const { sum, sub } = require("./calculator");
console.log(sum(2, 6));
console.log(sub(8, 3));
*/

/*
2.6 & 2.7

const { studentDetails, carDetails } = require("./calculator");

const newStudentDetails = new studentDetails("Ram", 15);
console.log(newStudentDetails);
console.log(newStudentDetails.name);

const newCarDetails = new carDetails("Alto", "60kmph");
console.log(newCarDetails);
console.log(newCarDetails.speed);
*/
