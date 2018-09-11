// 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都进行约束

function sum(x: number, y: number): number {
    return x + y;
}

// 定义函数时定义了多少个参数，调用时就必须要传入多少个参数，参数多了少了都不行

// sum(1) error
sum(1, 2)
// sum(1, 2, 3) error

// 函数表达式，需要对等号左边的变量也进行类型定义，是用’=>‘符号，不过和es6中的箭头函数还是有区别。

let sum2: (x: string, y: number) => string = function (x: string, y: number): string {
	return x + y
}

// 也可以用接口来定义一个函数需要的形状
interface stringIncluding {
	(a: string, b: string): boolean
}

let stringInclude: stringIncluding = (a: any, b: string): boolean => a.search(b) > -1

// 可选参数： 可使用问号?来表示可选参数，被定义为可选参数后，调用函数的时候可以不传它
// 默认参数： 参数默认值同es6中的语法一样，使用等号表示。默认参数可以出现在必传参数前，这个时候调用需要明确地传递undefined给默认参数作为初始值。
function buildName(firstName = 'tom', lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
// firstName = 'tom', 等同于声明firstName = 'tom', 会根据默认值类型去定义参数的类型
// let toma = buildName(true, 'cat') // error
let tomcat = buildName(undefined, 'Cat');
let tom = buildName('Tom');

// 可选参数必须放在必传参数后面，不然调用的时候也无法实现。当然定义时就会提示错误了
// function buildName2(firstName?: string, lastName: string) {
//     if (firstName) {
//         return firstName + ' ' + lastName;
//     } else {
//         return lastName;
//     }
// }

// rest剩余参数，用来定义复数个参数，同es6语法，使用...
// rest参数就是一个数组，按照定义数组的方式去定义他
// rest参数被视为一个无边界的可选参数
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a)
push(a, 1, 2, 3);

// 重载
// 后端语言比如在JAVA、C#里面，重载的定义就是：在同一个类中，方法名称相同，但参数类型、类型顺序、参数个数不同，与返回值无关。
// 但是java和JavaScript本质上还是有静态语言和动态语言的区别的，以至于我以java中重载的理念去看typescript中官方的重载示例代码时就很困惑，感觉特别奇葩。
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    } else {
    	return false
    }
}
let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
// 上面对pickCard进行了三次定义，前两次规定了函数根据参数返回不同的值类型，但具体的判断还是在于第三个声明返回值为any的定义函数里
// 调用函数时还是会根据前两次的定义类型，进行类型检查

