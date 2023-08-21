import requests

predicted_character = "A"  # Replace with your actual predicted character

url = 'http://127.0.0.1:5000/send_prediction'  # Replace with the correct URL
data = {'predicted_character': predicted_character}

try:
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Prediction sent successfully to the web application.")
    else:
        print("Failed to send prediction to the web application.")
except Exception as e:
    print("An error occurred:", e)
