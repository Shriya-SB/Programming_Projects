// This block of code is an asynchronous code
// There are two types of languages. 1) synchronous and 2) asynchronous
// synchronous languges are blocking code which means if step of code takes time to resolve then code execution will be paused for sometime
// asynchronous means the language which will not stop which is non-blocking. Is the step of code takes time then it will be compiled in background and other step of code will be executed and if the time is up then we can see the output.

async function getData() {
    // Simulate getting data from a server
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(455)
        }, 3500);
    })
}

// settle means resolve or reject
// resolve means promise has settled successfully
// reject means promise has not settled successfully

async function getDatas() {
    // Simulate getting data from a server
    // let x = await fetch('https://jsonplaceholder.typicode.com/todos/1')

    let x = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
    let data = await x.json() 
    return data
}

async function main(){
    console.log("Loading modules")

    console.log("Do something else")

    console.log("Load data")

    let data = await getDatas()

    console.log(data)

    console.log("process data")

    console.log("task 2")

}

main()

 

// data.then((v) => { 
//     console.log(data)

//     console.log("process data")

//     console.log("task 2")
 
// })