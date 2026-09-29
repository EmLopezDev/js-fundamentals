function Dog(name) {
    this.name = name;
}

Dog.prototype.bark = function () {
    return "Woof!";
};

const max = new Dog("Max");

/*
When the keyword `new` is used a few things are happening:

1. Create a new empty object

2. Connect that object's [[Prototype]] to Dog.prototype

3. Call Dog with `this` pointing to the new object

4. Return the new object
*/
