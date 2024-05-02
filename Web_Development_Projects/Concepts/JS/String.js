// Strings are the functions which is used to integrate text in our output and written in '', "", """
// There are many string methods

// Escape Sequence
let oldString = `Navneet is a good boy!! \nUniveral Truth` // \n - newline
console.log(oldString);
oldString = `Shriya is sister of Navneet!! \tEveryone knows` // \t - tab
console.log(oldString);
oldString = `My father name is Santosh.\r Worlds best father` // \r - returns carriage
console.log(oldString);

// endsWith
// This method returns true if the parameter is given correct
// This method takes a parameter which means if put the correct ending character of string, this returns true else false.
let string = "Navneet"
let newStr = string.endsWith("t")
console.log(newStr);

// startsWith
// This method returns true if the parameter is given correct
// This method takes a parameter which means if put the correct starting character of string, this returns true else false.
newStr = string.startsWith("N")
console.log(newStr);

// concat
// This method help us to merge or concatenate to strings
let string2 = " is is a good boy!!"
console.log(string.concat(string2));

// substring
// slice out the string with a specific index given.
console.log(string.substring(2, 5));

// length
// Calculates the length of string.
console.log(string.length)

// includes
// It help us to confirm the character present in string and we can implement conditions too.
console.log(string.includes("v") ? true : false);

// indexOf
// It takes the arguement as character of string and returns the index of the character present.
console.log(string.indexOf("N"))

// replace
// It help us to replace string characters.
console.log(string.replace("t", "th"))

// split
// Converts an string to array.
let integratedStr = string.split()
console.log(integratedStr);

// toUpperCase
// This method help us to capitalize the string
console.log(string.toUpperCase());

// toLowerCase
// This method help us to uncapitalize the string
console.log(string.toLowerCase());

// charAt
// Retrives the character of index.
// This method also help us to edit strings
let capitalize = string.charAt(0).toUpperCase() + string.slice(1)
console.log(capitalize);

// trim
// Help us to remove spaces
string = "           Navneet                "
console.log(string.trim());