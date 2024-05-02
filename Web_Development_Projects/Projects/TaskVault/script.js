function getAndUpdate() {
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    if (title === "" || desc === "") {
        alert("You cannot add black title or description!!")
        return;
    }
    if (localStorage.getItem('todos') == null) {
        itemsJson = []
        itemsJson.push([title, desc])
        localStorage.setItem('todos', JSON.stringify(itemsJson))
    } else {
        itemsJsonArray = localStorage.getItem('todos')
        itemsJson = JSON.parse(itemsJsonArray)
        itemsJson.push([title, desc])
        localStorage.setItem('todos', JSON.stringify(itemsJson))
    }
    updateTodo()
}

function updateTodo() {
    if (localStorage.getItem('todos') == null) {
        itemsJson = []
        localStorage.setItem('todos', JSON.stringify(itemsJson))
    } else {
        itemsJsonArray = localStorage.getItem('todos')
        itemsJson = JSON.parse(itemsJsonArray)
    }
    // Populate the Table
    let str = ''
    let tableBody = document.getElementById('tableBody')
    itemsJson.forEach((element, index) => {
        str += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td><button class="btn btn-danger" onclick="deleteTodo(${index})">Delete</button></td>
        </tr>
        `
    });
    tableBody.innerHTML = str
}

function deleteTodo(itemIndex) {
    itemsJsonArray = localStorage.getItem('todos')
    itemsJson = JSON.parse(itemsJsonArray)
    itemsJson.splice(itemIndex, 1)
    localStorage.setItem('todos', JSON.stringify(itemsJson))
    updateTodo()
}

let add = document.getElementById('add');
add.addEventListener('click', getAndUpdate)
updateTodo()

function clearTodo() {
    if (confirm("Do you really want to clear todos??")) {
        localStorage.removeItem('todos')
        updateTodo()
    }
}