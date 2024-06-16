from flask import Flask, request, jsonify
from bot import CreateContest
from apiCalls import findMatchingNames, userData
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
@cross_origin()
@app.route('/process', methods=['POST'])
def process_endpoint():
    if request.is_json:
        print("hehe")
        data = request.get_json()
        print("data",data)
        # try:
        #     processed = CreateContest(data)
        #     return jsonify(processed), 200
        # except ValueError as e:
        #     return jsonify({"error": str(e)}), 400
        # except Exception as e:
        #     print("Error",e)
        #     return jsonify({"error": str(e)}), 400
        processed = CreateContest(data)
        return jsonify(processed), 200

    else:
        return jsonify({"error": "Request must be JSON"}), 400


@app.route('/usersearch', methods=['GET'])
def user_search():
    search_term = request.args.get('q')
    # print("search_term",search_term)
    if not search_term:
        return jsonify({"error": "Missing query parameter 'q'"}), 400

    try:
        results = findMatchingNames(search_term)
        result = [{'name': name} for name in results]
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/userinfo', methods=['GET'])
def user_info():
    user_id = request.args.get('id')
    # print("user_id",user_id)
    if not user_id:
        return jsonify({"error": "Missing query parameter 'id'"}), 400

    try:
        user_info = userData(user_id) 
        return jsonify(user_info), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
