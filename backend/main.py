from flask import Flask, request, jsonify
from bot import CreateContest
app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_endpoint():
    if request.is_json:
        data = request.get_json()
        try:
            processed = CreateContest(data)
            return jsonify(processed), 200
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    else:
        return jsonify({"error": "Request must be JSON"}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
