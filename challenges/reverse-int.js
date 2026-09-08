// Could be positive or negative
function reverseInt(num) {
    const reversed = num.toString().split("").reverse().join("");
    return parseInt(reversed) * Math.sign(num);
}

console.log(reverseInt(90));
console.log(reverseInt(-108));
