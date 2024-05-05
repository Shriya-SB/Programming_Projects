from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generator', methods=['POST'])
def image_generator():
    data = request.json
    prompt = data.get('prompt')
    if prompt:
        url = "https://ai-text-to-image-generator-api.p.rapidapi.com/cyberpunk"
        headers = {
            "content-type": "application/json",
            "X-RapidAPI-Key": "5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30",
            "X-RapidAPI-Host": "ai-text-to-image-generator-api.p.rapidapi.com"
        }
        payloads = [
            {"inputs": prompt},
            {"inputs": prompt + " in a futuristic city"},
            {"inputs": prompt + " in a cybernetic world"},
            {"inputs": "Futuristic " + prompt}
        ]
        image_urls = []

        for payload in payloads:
            response = requests.post(url, json=payload, headers=headers)
            print(response.json())
            if response.status_code == 200:
                image_url = response.json().get('url')
                image_urls.append(image_url)
            else:
                return jsonify({'error': 'Image generation failed.'}), 500

        return jsonify({'image_urls': image_urls})
    else:
        return jsonify({'error': 'Prompt not provided.'}), 400

if __name__ == '__main__':
    app.run(debug=True)
