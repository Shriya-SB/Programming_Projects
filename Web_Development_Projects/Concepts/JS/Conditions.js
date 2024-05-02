// Ladder of conditions
let a = 50
let b = 10
// Checks weather the condtion is true or not
if(a>b){
    console.log('success');
    // Else is necessary if there are sub condtions.
}else if (a==b) {
    console.log('Due');
}
// Else is must if output is something else.
else{
    console.log('failure');
}

// Symbolic method
const output = a>b ? true : false
console.log(output);