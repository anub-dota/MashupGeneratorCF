from flask import Flask, request, jsonify
from bot import CreateContest
from apiCalls import findMatchingNames, userData
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


@app.route('/usersearch', methods=['GET'])
def user_search():
    search_term = request.args.get('q')
    if not search_term:
        return jsonify({"error": "Missing query parameter 'q'"}), 400

    try:
        results = findMatchingNames(search_term)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/userinfo', methods=['GET'])
def user_info():
    user_id = request.args.get('id')
    if not user_id:
        return jsonify({"error": "Missing query parameter 'id'"}), 400

    try:
        user_info = userData(user_id) 
        return jsonify(user_info), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
