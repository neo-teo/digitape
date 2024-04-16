import random
import string
import requests
import urllib.parse
from datetime import datetime

from flask import Flask, redirect, request, jsonify
from flask_cors import CORS

import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '..', '.env.local'))

app.secret_key = os.getenv('SECRET_KEY')

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = 'http://localhost:3000/callback'

AUTH_URL = 'https://accounts.spotify.com/authorize'
TOKEN_URL = 'https://accounts.spotify.com/api/token'
API_BASE_URL = 'https://api.spotify.com/v1/'

# dictionary to store auth info
auth_info = {
}

@app.route('/auth-url')
def auth_url():
    scope = 'streaming user-read-currently-playing user-read-private user-read-email'

    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': REDIRECT_URI,
        'state': ''.join(random.choices(string.ascii_letters + string.digits, k=16))
    }

    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"

    return jsonify({'auth_url': auth_url})

@app.route('/callback')
def callback():
    if 'error' in request.args:
        return jsonify({"error": request.args['error']})
    
    if 'code' in request.args:
        req_body = {
            'code': request.args['code'],
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }

        response = requests.post(TOKEN_URL, req_body)
        token_info = response.json()

        print(token_info)

        auth_info['access_token'] = token_info['access_token']
        auth_info['refresh_token'] = token_info['refresh_token']
        auth_info['expires_at'] = datetime.now().timestamp() + token_info['expires_in']
        
        return redirect('http://localhost:5173/radio')

@app.route('/refresh-token')
def refresh_token():
    if 'refresh_token' not in auth_info:
        return redirect('/login')
    
    if datetime.now().timestamp() > auth_info['expires_at']:
        req_body = {
            'grant_type': 'refresh_token',
            'refresh_token': auth_info['refresh_token'],
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }

        response = requests.post(TOKEN_URL, data=req_body)
        new_token_info = response.json()

        auth_info['access_token'] = new_token_info['access_token']
        auth_info['expires_at'] = datetime.now().timestamp() + new_token_info['expires_in']

        return redirect('http://localhost:5173/radio')

@app.route('/access-token')
def access_token():
    if 'access_token' not in auth_info:
        return jsonify({'access_token': None})
    
    return jsonify({'access_token': auth_info['access_token']})
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port="3000", debug=True)
