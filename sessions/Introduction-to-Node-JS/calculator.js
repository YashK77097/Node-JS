//1.1: We cannot export boolean, number, string, null, undefined, objects, and arrays while defining.

/*
1.2: Exporting a variable after defining
let value = 5;
module.exports = value;
*/

/*
1.3: Exporting value or an Expression directly
module.exports = 5 * 3;
*/

/*
1.4: Exporting single Function After defining

function sum(num1, num2) {
  return num1 + num2;
}
module.exports = sum;
*/
/*
1.5: Exporting single function While defining

module.exports = function (num1, num2) {
  return num1 + num2;
};
*/
/*
1.6: Exporting single class After defining


class studentDetails {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
module.exports = studentDetails;
*/
/*
1.7: Exporting single class While defining

module.exports = class StudentDetails {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};
*/
//2.1: We cannot export boolean, number, string, null, undefined, objects, and arrays while defining.

/*
Named Exports
2.2: Exporting multiple variables after defining

let value = 5;
let studentName = "Rahul";
exports.value = value;
exports.studentName = studentName;

const add = (a, b) => {
  return a + b;
};
const sub = (a, b) => a - b;
//using named exports to export multiple modules.

module.exports.add = add;
exports.sub = sub;
*/

/* 
2.3: 
Exporting multiple values and expressions

let value = 2;
exports.sum = 2 + 3;
exports.sub = 3 - value;
*/

/*
2.4: Exporting multiple functions while defining

exports.sum = function (num1, num2) {
  return num1 + num2;
};

exports.sub = function sub(num1, num2) {
  return num1 - num2;
};
*/

/*
2.5: Exporting multiple functions after defining

function sum(num1, num2) {
  return num1 + num2;
}
exports.sum = sum;

function sub(num1, num2) {
  return num1 - num2;
}
exports.sub = sub;
*/

/*
2.6: Exporting multiple classes while defining

exports.studentDetails = class StudentDetails {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};

exports.carDetails = class CarDetails {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }
};
*/

/*
2.7: Exporting multiple classes after defining

class StudentDetails {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
exports.studentDetails = StudentDetails;

class CarDetails {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }
}
exports.carDetails = CarDetails;
*/
