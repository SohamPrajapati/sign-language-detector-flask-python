document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const predictionDiv = document.getElementById('prediction');
    
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
            })
            .catch((error) => {
                console.error('Error accessing webcam:', error);
            });
    }
    
    video.addEventListener('play', () => {
        const context = canvas.getContext('2d');
        const predictionEndpoint = '/predict';
        
        setInterval(() => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const image_data = canvas.toDataURL('image/jpeg');
            
            fetch(predictionEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_data: image_data })
            })
            .then(response => response.json())
            .then(data => {
                predictionDiv.innerHTML = `Predicted sign: ${data.prediction}`;
            })
            .catch(error => {
                console.error('Error predicting sign:', error);
            });
        }, 1000); // Make predictions every 1 second
    });
});
