function reverseStr(str) {
    let reversed = "";
    for (let char of str) {
        reversed = char + reversed;
    }
    return reversed;
}

function reverseStr2(str) {
    let reversed = "";
    const lastIdx = str.length - 1;
    for (let i = lastIdx; i >= 0; i--) {
        reversed = reversed + str[i];
    }
    return reversed;
}

function reverseStr3(str) {
    return str.split("").reverse().join("");
}

console.log(reverseStr("hello"));
console.log(reverseStr2("hello"));
console.log(reverseStr3("hello"));
