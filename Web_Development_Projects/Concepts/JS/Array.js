// All array methods are explained!!
// Array are the variable which can store multiple values

// Javascript modern array methods (map, filter, reduce)
// Map method
// Creates a new array by applying a function to each element in the existing array.
const iterator = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
let newArray = iterator.map(e => {
    return e + e
})

console.log(newArray);

// Filter method
// Creates a new array with all elements that pass the test implemented by the provided function
newArray = iterator.filter(e => {
    return e > 8
})

console.log(newArray);

// Reduce method
// Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value
newArray = iterator.reduce((index, value) => {
    return index + value
})

console.log(newArray);

// Other methods of array

// Push method
// It adds the element end of the array
const arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
let newArr = arr.push("Navneet")
console.log(arr);

// Unshift method
// It adds the element in starting of array
newArr = arr.unshift("Shriya")
console.log(arr);

// Pop method
// It removes the last element of an array
newArr = arr.pop()
console.log(arr);

// Shift method
// It removes the first element of an array
newArr = arr.shift()
console.log(arr);

// indexOf
// Tells at what index the element is placed off
newArr = arr.indexOf("3")
console.log(newArr);

// Slice method
// Helps us to slice out array
newArr = arr.slice(1, 4)
console.log(newArr, arr);

// Splice method
// Helps us to add and remove elements
newArr = arr.splice(1, 3, 400)
console.log(arr);


// Concat method
// Help us to concatenate two array

const newA = [1, 2, 3]
const newA2 = [4, 5, 6]
console.log(newA.concat(newA2))

// Join method
// Help us to join an symbol in each element of an array
const additionalArray = [5, 6, 7, 8, 9]
console.log(additionalArray.join("_"));

// At method
// Help us to locate and target an element of an array.
let newMethod = additionalArray.at(2)
console.log(newMethod);

// Includes method
// Help us to find an element and get boolean value or an condition
let extraArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let response = extraArray.includes('4') ? "success" : "failure"
console.log(response);

// Length method
// Help us to get the length of an array
console.log(extraArray.length);


// Keys method
const keys = extraArray.keys();
for (let x of keys) {
    console.log(x);
}

// toString method
// Help us to convert an array to an string
console.log(extraArray.toString());

// Sort & Reverse method
// Sort method arranges an array alphabetically.
// Reverse method just reverse the array.
const fruits = [1, 2, 3, 4, 5, 6, 7, 8];
let compare = (a, b) => {
    return b - a
}
console.log(fruits.sort(compare));
console.log(fruits.reverse());