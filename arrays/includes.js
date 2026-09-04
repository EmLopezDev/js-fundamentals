// This is if an older browser doesn't natively have the includes method
if (!Array.prototype.includes) {
    Array.prototype.includes = function (element) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === element) {
                return true;
            }
        }
        return false;
    };
}

// Creating own custom includes method
Array.prototype.customIncludes = function (element) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === element) {
            return true;
        }
    }
    return false;
};

// Stand alone pure function
function arrayIncludes(array, element) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            return true;
        }
    }
    return false;
}

const testArray = [1, 2, 3, 4, 5];

console.log(arrayIncludes(testArray, 2));
console.log(arrayIncludes(testArray, 0));

console.log(testArray.customIncludes(5));
console.log(testArray.customIncludes(0));
