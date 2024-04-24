from functools import wraps
import random
import string
import requests
import urllib.parse
from datetime import datetime

from flask import Flask, Response, make_response, redirect, request, jsonify
from flask_cors import CORS, cross_origin

import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '..', '.env.local'))

app.secret_key = os.getenv('SECRET_KEY')

SPOTIFY_CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')

REDIRECT_URI = os.getenv('HOST_SERVER_URL') + '/api/callback'

API_BASE_URL = 'https://api.spotify.com/v1/'

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'access_token' not in request.cookies:
            return redirect('/api/login')
        
        if f"{datetime.now().timestamp()}" > request.cookies['expires_at']:
            return redirect('/api/refresh-token')
        
        return f(*args, **kwargs)
    return decorated_function

@app.route('/api/login')
def login():
    params = {
        'client_id': SPOTIFY_CLIENT_ID,
        'response_type': 'code',
        'scope': 'streaming user-read-currently-playing user-read-private user-read-email',
        'redirect_uri': REDIRECT_URI,
        'state': ''.join(random.choices(string.ascii_letters + string.digits, k=16))
    }

    auth_url = f"{'https://accounts.spotify.com/authorize'}?{urllib.parse.urlencode(params)}"

    return redirect(auth_url)

@app.route('/api/callback')
def callback():
    if 'error' in request.args:
        return jsonify({"error": request.args['error']})
    
    if 'code' in request.args:
        req_body = {
            'code': request.args['code'],
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'client_id': SPOTIFY_CLIENT_ID,
            'client_secret': SPOTIFY_CLIENT_SECRET
        }

        token_info_raw = requests.post('https://accounts.spotify.com/api/token', data=req_body)
        token_info = token_info_raw.json()

        response = redirect(os.getenv('HOST_CLIENT_URL') + '/radio')

        response.set_cookie('access_token', token_info['access_token'])
        response.set_cookie('refresh_token', token_info['refresh_token'])
        response.set_cookie('expires_at', f"{datetime.now().timestamp() + token_info['expires_in']}")

        return response

@app.route('/api/refresh-token')
def refresh_token():
    if 'refresh_token' not in request.cookies:
        return redirect('/api/login')
    
    if f"{datetime.now().timestamp()}" > request.cookies['expires_at']:
        req_body = {
            'grant_type': 'refresh_token',
            'refresh_token': request.cookies['refresh_token'],
            'client_id': SPOTIFY_CLIENT_ID,
            'client_secret': SPOTIFY_CLIENT_SECRET
        }

        token_info_raw = requests.post('https://accounts.spotify.com/api/token', data=req_body)
        token_info = token_info_raw.json()

        response = redirect(os.getenv('HOST_CLIENT_URL') + '/radio')

        response.set_cookie('access_token', token_info['access_token'])
        response.set_cookie('expires_at', f"{datetime.now().timestamp() + token_info['expires_in']}")

        return response

@app.route('/api/access-token')
def access_token():
    if 'access_token' not in request.cookies:
        return jsonify({'access_token': None})
    
    return jsonify({'access_token': request.cookies['access_token']})

@app.route('/api/set-playlist')
@login_required
def set_playlist():
    if 'device_id' in request.args and 'playlist_id' in request.args:
        device_id = request.args['device_id']
        playlist_id = request.args['playlist_id']

        headers = {
            'Authorization': f"Bearer {request.cookies['access_token']}"
        }
        
        body = {
            'context_uri': f'https://open.spotify.com/playlist/{playlist_id}'
        }

        response = requests.put(
            API_BASE_URL + f"me/player/play?device_id={device_id}", 
            headers=headers, 
            json=body
        )

        return jsonify({'ok': 'we made it!'})
    
    return jsonify({'error': 'must provide a device_id and playlist_id with the set-playlist endpoint'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port="3000", debug=True)
