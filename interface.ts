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
interface Person extends SuperPerson{
    readonly firstName: string;
    optionalValue?: string;
}
// 可通过extends实现接口之间的继承
// 接口属性也可如下设置多种混合类型
interface SuperPerson {
    lastName: number | string;
}

function greeter(a: Person){
	// 只读属性这样修改，也会报错
	// a.firstName += 'aaa'
    return `Hello, ${a.firstName}  ${a.lastName}`;
}

let user = new Student("Jane", "M.", "User");

console.log(user);

class Control {
    private state: any;
}

// 接口可以继承类，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 
// 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// 错误：“Image”类型缺少“state”属性。所以必须要是Control的子类，才能实现SelectableControl接口
// class Image implements SelectableControl {
//     select() { }
// }
