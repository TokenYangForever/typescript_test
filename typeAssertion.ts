// 类型断言(type assertion)可以用来手动指定一个值的类型。

// 例子：将一个联合类型的变量指定为一个更加具体的类型
// 之前提到过，当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：

// 类型断言的作用就是在于，告诉编译器，你很清楚这个变量的类型，不需要编译器进行再次的检测。

function getLen(a: (string | number)): number {
	if ((<string>a).length) {
		return (<string>a).length
	} else {
		// 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：return <boolean>a
		return (<number>a).toString().length
	}
}

// 下面是类型断言的一个常见用法：foo一开始是一个无属性的空对象，后面再给他添加属性，可以事先申明一个接口，然后将foo类型断言为该接口
interface Foo {
    bar: number;
    bas: string;
}

let foo = <Foo> {}; // let foo: any = {} 不然就只能像这样来申明
foo.bar = 123; // Error: property 'bar' does not exist on `{}`
foo.bas = 'hello'; // Error: property 'bas' does not exist on `{}`

// 在JSX中使用<>号会产生歧义，所以要这样写：
let foo2 = {
	bar: 1
} as Foo
foo2.bas = 'right'

// 类型断言同样伴随着危害
// 许多情况下，断言可以让你从老的JavaScript代码轻松地向typescript迁移。
// 但是使用断言的时候也要小心，因为编译器不会帮你检查，比如下面这样：
let foo3 = <Foo> {}; // 定义了foo3后，并忘记给它添加bar、bas属性，编译器也不会抛错，这种情况需要规避

// 双重断言
function handler (event: Event) {
    let mouseEvent = event as MouseEvent;
}

function handler2(event: Event) {
    let element = event as any as HTMLElement; // 先断言为any在断言为其他的，可忽略之前定义的Event类型。
}