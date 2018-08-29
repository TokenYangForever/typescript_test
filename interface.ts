class Student {
    fullName: string;
    firstName: string;
    constructor(firstName, public middleInitial, public lastName) {
    	this.firstName = firstName
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
// 带?表示属性是可选属性，实现接口时，必须包含除了可选属性以外的属性
// readonly 表示只读属性
interface Person {
    readonly firstName: string;
    lastName: string;
    optionalValue?: string;
}

function greeter(a: Person){
	// 只读属性这样修改，也会报错
	// a.firstName += 'aaa'
    return `Hello, ${a.firstName}  ${a.lastName}`;
}

let user = new Student("Jane", "M.", "User");

console.log(user);