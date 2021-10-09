from flask import Flask
from flask import request
from flask.json import jsonify
import model 
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def home():
    return "Hello World"

@app.route("/api/distance", methods=['POST'])
def distance():
    assert request.method == 'POST'
    data = request.get_json(force=True)
    first = data['first']
    second = data['second']
    return jsonify({
        "distance": str(model.run_from_url(first, second)),
    }), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080,debug=True)
