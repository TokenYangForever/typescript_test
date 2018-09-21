// Type Alias 类型别名
// 类型别名用于给一种类型或一组联合类型取一个名字，有时候与接口很类似，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。
type Name = string;
type NameReducer = () => string;
type NameOrNameReducer = Name | NameReducer

function getName (arg: NameOrNameReducer): Name {
	if (typeof arg === 'string') {
		return arg;
	} else {
		return arg();
	}
}
// 起别名不会新建一个类型，他只是新建了一个”名字“来引用原来那个类型。	
// 类型别名与接口的区别：
// 1。类型别名无法被extends、implements的，这种情况下应该使用接口来代替。
// 2。无法使用接口来描述联合类型、或元组类型，这种情况应该使用类型别名。
