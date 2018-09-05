// 数组

// 类型 + [] 是最简单的表示方法
let arr: number[] = [1, 2];

// 也可以使用联合类型表示数组：(类型1 | 类型2) + []
let fibonacci: (string | number)[] = [1, '1', 2, 3, 5];

// 调用数组的方法时，传入的参数也会根据定义数组时约定的类型进行检查
// arr.push('') <- error 因为arr被定义为数字类型的数组，push传字符串时就报错

// 数组泛型(Array Generic)


// 也可以使用接口来描述数组，[index: number]就是指键值为数字类型，也就是数组中的每一项
interface NumberArray {
    [index: number]: number;
}
let arr2: NumberArray = [1, 1, 2, 3, 5];

// 也可以用any来表示数组成员可以是任意类型
let arr3: any[] = [1, '2', true, {obj: 1}]

// 类数组对象(Array-like Object)不属于数组类型，他们都有自己独有的接口定义，比如IArguments, NodeList, HTMLCollection等
function sum() {
    let args: IArguments = arguments;
}
let domNodeList: NodeList = document.querySelectorAll('div')