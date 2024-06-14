from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/create', methods=['GET'])
def process_json():
    # Parse JSON from request
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
    
    # Process the JSON data (you can add your logic here)
    processed_data = {
        "received": data,
        "message": "JSON processed successfully"
    }
    
    # Return the processed data as JSON response
    return jsonify(processed_data), 200

if __name__ == '__main__':
    app.run(debug=True)