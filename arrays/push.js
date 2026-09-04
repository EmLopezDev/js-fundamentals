// This is if an older browser doesn't natively have the push method
if (!Array.prototype.push) {
    Array.prototype.push = function (...elements) {
        const currentLength = this.length;
        for (let i = 0; i < elements.length; i++) {
            this[currentLength + i] = elements[i];
        }
        return this.length;
    };
}

// Creating own custom push method
Array.prototype.customPush = function (...elements) {
    const currentLength = this.length;
    for (let i = 0; i < elements.length; i++) {
        this[currentLength + i] = elements[i];
    }
    return this.length;
};

// Stand alone pure function
function arrayPush(array, ...elements) {
    const currentLength = array.length;
    for (let i = 0; i < elements.length; i++) {
        array[currentLength + i] = elements[i];
    }
    return array.length;
}

const testArray = [1, 2, 3, 4, 5];

console.log(arrayPush(testArray, 6));
console.log(testArray);

console.log(arrayPush(testArray, 7, 8, 9, 10));
console.log(testArray);

console.log(testArray.customPush(11, 12, 13));
console.log(testArray);
