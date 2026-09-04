// The indexOf method searches an array to verify whether it contains an element, if it does it
// returns the index of that element if not it returns -1

// This is if an older browser doesn't natively have the indexOf method
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (element) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] === element) {
                return i;
            }
        }
        return -1;
    };
}

// Creating own custom indexOf method
Array.prototype.customIndexOf = function (element) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === element) {
            return i;
        }
    }
    return -1;
};

// Stand alone pure function
function arrayIndexOf(array, element) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            return i;
        }
    }
    return -1;
}

const testArray = [1, 2, 3, 4, 5];

console.log(testArray.customIndexOf(4));
console.log(testArray.customIndexOf(9));

console.log(arrayIndexOf(testArray, 5));
console.log(arrayIndexOf(testArray, 0));
