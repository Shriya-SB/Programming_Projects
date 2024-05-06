document.getElementById('imageForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var prompt = document.getElementById('prompt').value; // Get the prompt from the input field

    // Hide previous images
    document.getElementById('imageContainer').innerHTML = '';

    // Show loading indicator
    var loadingIndicator = document.createElement('p');
    document.getElementById('generate').innerHTML = "Generated Images"
    loadingIndicator.innerText = 'Loading...';
    loadingIndicator.classList.add('text-center');
    document.getElementById('imageContainer').appendChild(loadingIndicator);

    fetch('/generator', {
        method: 'POST',
        body: JSON.stringify({ prompt: prompt }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            var imageContainer = document.getElementById('imageContainer');
            imageContainer.innerHTML = ''; // Clear loading indicator and previous images
            document.getElementById('prompt').value = ''
            data.image_urls.forEach(image_url => {
                var imgElement = document.createElement('img');
                imgElement.src = image_url;
                imgElement.classList.add('col-md-3', 'my-2');
                imageContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error:', error));
});