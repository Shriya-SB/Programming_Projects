// Loops are the functions in programming which help us to do repeated task shortly

// For Loop
// If the function returns true then only the loop will be executed.
for (let i = 1; i < 11; i++) {
    console.log(i);
}

// For-Of Loop
// This loop will execute only for iterable functions like array
let array = ["Humans", "Animal"]
for (let item of array) {
    console.log(item);
}

// For-In Loop
// This will execute for other functions like object or something
let obj = {
    "Human": "Navneet",
    "Animal": "Jeevithesh"
}
for (let key in obj) {
    console.log(obj[key]) // To get the value of an object
    console.log(key) // To get the key of an object
    console.log(obj) // To get the object
}

// For-Each Loop
// It is used for iterating over an array and performing some operation on each element. However, unlike map, it doesn't create a new array; it simply iterates over the existing one.
let newArr = [5, "Navneet", 420, 840, "Shriya"]
newArr.forEach((element, index, array) => {
    console.log(element, index, array);
});

// While Loop
let i = 0;
while (i < 101) {
    console.log(i);
    i++
}

// Do-While Loops
let c = 0
do {
    console.log(c);
    c++;
} while (c < 10);