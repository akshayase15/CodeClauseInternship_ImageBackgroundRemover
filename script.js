// script.js

function uploadimage() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:8000/uploadimagefile', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        var responseDiv = document.getElementById('response');
        responseDiv.innerHTML = 'File uploaded successfully!';
    })
    .catch(error => {
        var responseDiv = document.getElementById('response');
        responseDiv.innerHTML = 'An error occurred: ' + error;
    });
}

function bgremove() {
    fetch('http://127.0.0.1:8000/removebg', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        var responseDiv = document.getElementById('response');
        responseDiv.innerHTML = 'Background removed successfully!';
    })
    .catch(error => {
        var responseDiv = document.getElementById('response');
        responseDiv.innerHTML = 'An error occurred: ' + error;
    });
}

function showimage() {
    var posterImage = document.getElementById('bgImage');
    var responseDiv = document.getElementById('response');

    fetch('http://127.0.0.1:8000/showimage', {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            return response.blob(); // Fetch the image data as a Blob
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(blob => {
        // Convert the Blob data to an object URL and set it as the src of the poster image
        posterImage.src = URL.createObjectURL(blob);
        posterImage.hidden = false; // Show the image
        responseDiv.innerHTML = 'Poster Created successfully!';
    })
    .catch(error => {
        responseDiv.innerHTML = 'An error occurred:' + error;
    });
}

function downloadfile() {
    fetch('http://127.0.0.1:8000/downloadfile', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        var responseDiv = document.getElementById('response');
        responseDiv.innerHTML = 'File downloaded successfully!';

        // Trigger the download of the poster image
        var link = document.createElement('a');
        link.href = data.poster_path; // Assuming data.poster_path contains the URL of the generated image
        link.download = 'bgremove.jpg';
        link.click();
    })
    .catch(error => {
        var responseDiv = document.getElementById('response');
        responseDiv.innerHTML = 'An error occurred:' + error;
    })
}
