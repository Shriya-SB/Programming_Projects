const searchBtn = document.getElementById('searchbtn');
searchBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    const searchInput = document.getElementById('searchinput').value;
    const req = await fetch(`/search?word=${searchInput}`);
    const res = await req.json();
    console.log(res);
    document.getElementById('word').innerHTML = `Your word - ${res.word}`
    if (res.definition.length > 0) {
        document.getElementById('definition').innerHTML = res.definition
    } else {

        document.getElementById('definition').innerHTML = `<h3>Sorry! We don't have meaning for this word!</h3>`
    }
    document.getElementById('searchinput').value = '';
});