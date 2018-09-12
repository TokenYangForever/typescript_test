class Student {
    fullName: string;
    firstName: string;
    constructor(firstName, public middleInitial, public lastName) {
    	this.firstName = firstName
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
// 带?表示属性是可选属性，实现接口时，必须包含除了可选属性以外的属性，同时不能包含没有在接口中定义的属性。 赋值的时候，变量的形状必须和接口的形状保持一致。
// readonly 表示只读属性
interface Person extends SuperPerson{
    readonly firstName: string;
    optionalValue?: string;
}
// 可通过extends实现接口之间的继承
// 接口属性也可如下设置多种混合类型
interface SuperPerson {
    lastName: number | string;
    age?: number;
    [propName: string]: string | number | boolean;
}

// interface Person {
//     name: string;
// }

let tom: Person = {
    firstName: 'Jack',
    lastName: 'Tom',
    age: 25,
    gender: 'male'
};

function greeter(a: Person){
	// 只读属性这样修改，也会报错
	// a.firstName += 'aaa'
    return `Hello, ${a.firstName}  ${a.lastName}`;
}

let user = new Student("Jane", "M.", "User");

console.log(user);

class Control {
    private state: any
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

// - - - - - - - - - - - - - -
// 类型推论
// 如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7; 这句会报错，myFavoriteNumber被视为了string类型
// 1.在声明变量或成员、参数默认值、确定函数返回值时，如果没有明确地指定类型，则会进行类型推导

// 第一种推导就是最简单的，根据声明的值，推导出最普通的类型
let x = [0, 1, null]; // 这种情况，会把x认定为由number、null两种类型组成的数组

// 第二种情况根据上下文环境推导，也就是上下文类型。这种推导发生在，声明时存在上下文关系时
// 如下这种情况，Typescript会对window.onmousedown进行类型检查，得到它是函数类型，进一步能推导出mouseEvent是一个Event类的实例类型，访问Event实例的属性就没问题，访问不属于Event实例的属性或方法就会报错
// 等号右边的表达式，如果不是复制给window.onmousedown，而只是普通函数表达式的话，mouseEvent则会被默认为any，第二句也不会报错
// 如果写的mouseEvent:any，特意声明了mouseEvent的类型为any，则会忽略掉上下文推导出的类型，以any为准。
// 其实这事已经根据上下文推导出了mouseEvent是Event类型，如果声明mouseEvent为string、number之类的也会报错。
window.onmousedown = function(mouseEvent: Event) {
    console.log(mouseEvent.bubbles);
    // console.log(mouseEvent.a); //<- Error
};


// - - - - - - - - - - - - - -
// 联合类型
// 可以使用|分隔每个类型，表示联合类型
let something: string | number // 表示string、number其中之一

// something.length <- error
// 对于联合类型，只能访问此联合类型的所有类型里共有的属性或方法，number没有length属性，所以报错



