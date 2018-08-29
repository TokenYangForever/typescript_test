var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.firstName = firstName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(a) {
    a.firstName += 'aaa';
    return "Hello, " + a.firstName + "  " + a.lastName;
}
var user = new Student("Jane", "M.", "User");
console.log(user);
