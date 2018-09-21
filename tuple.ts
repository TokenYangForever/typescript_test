// 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为string和number类型的元组。
let x: [string, number] 
x = ['a', 123]; // true
// x = [123, 'a']; // error

// 当访问一个越界的元素，会使用联合类型替代:
x.push(1) // true
x[3] = 'new one'; // true
// x[4] = true error