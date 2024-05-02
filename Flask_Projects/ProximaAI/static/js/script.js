  // Example POST method implementation:
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

// Toggle panel visibility
const handleMenu = () => {
    let panel = document.getElementById('panel');
    panel.classList.toggle('hidden');
};

// Send button click event listener
document.getElementById("sendButton").addEventListener("click", async (e) => {
    e.preventDefault();
    questionInput = document.getElementById("questionInput").value;
    document.getElementById("questionInput").value = "";
    document.querySelector(".body2").style.display = "block";
    document.querySelector(".body1").style.display = "none";

    question.innerHTML = questionInput;

    // Get the answer and populate it! 
    let result = await postData("/api", {
        "question": questionInput
    });
    solution.innerHTML = result.answer;
});

// Menu button click event listener
document.querySelector('.menu-button').addEventListener('click', () => {
    handleMenu();
});
