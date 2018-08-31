// public修饰符
// 修饰类的成员。不指定修饰符时，默认使用public修饰类的成员。
// private修饰符
// 修饰私有成员，私有成员只有在类内部访问。
// 聊一聊与java中的权限修饰符的区别
// java中有default，即默认访问模式，该模式下的成员，允许在同一个包中访问。而typescript中default就等于public，同样script也没有Java中包的概念
var animal = /** @class */ (function () {
    function animal(theName) {
        this.name = theName;
        this.obj = {
            a: 1,
            b: 2
        };
    }
    animal.prototype.move = function (distance) {
        this.obj.a;
        console.log(this.obj);
        console.log(this.name + " moved " + distance + " meters");
    };
    return animal;
}());
