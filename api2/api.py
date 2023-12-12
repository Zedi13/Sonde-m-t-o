from flask import Flask, request, jsonify
import mysql.connector
from env import *


app = Flask(__name__)

db = mysql.connector.connect(
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASSWORD,
    database=DB_DATABASE,
    
)

cursor = db.cursor()

@app.route('/releves', methods=['GET', 'POST', 'PUT', 'DELETE'])
def receive_data():
    if request.method == 'POST':
        data = request.json
        temperature = data.get('temperature')
        pression = data.get('pression')
        humidity = data.get('humidity')
        #heure = data.get('heure')
        cursor.execute("INSERT INTO releve_meteo (temperature, humidity, pression) VALUES (%s, %s, %s)", (temperature, humidity, pression ))
        db.commit()
        return jsonify({'message': 'Données reçues et stockées'})

    if request.method == 'GET':
        cursor.execute("SELECT * FROM  releve_meteo  ")
        data = cursor.fetchall()
        response = jsonify(data)
        return response

    if request.method == 'PUT':
        releve_id = request.args.get('releve_id')
        temperature = request.json.get('temperature')
        humidity = request.json.get('humidity')
        cursor.execute("UPDATE releve_meteo SET temp=%s, hum=%s, press=%s, heure=%s WHERE releve_id=%s", (temperature, humidity, pression, releve_id))
        db.commit()
        return jsonify({'message': 'Données mises à jour avec succès'})

    if request.method == 'DELETE':
        releve_id = request.args.get('releve_id')
        cursor.execute("DELETE FROM releve_meteo WHERE releve_id=%s", (releve_id,))
        db.commit()
        return jsonify({'message': 'Données supprimées avec succès'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
