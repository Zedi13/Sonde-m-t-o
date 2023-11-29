from flask import Flask, request, jsonify
import mysql.connector
from env import *
import os 

plop = 'a'

app = Flask(__name__)

db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_DATABASE"),
    port=os.getenv("DB_PORT")
)
cursor = db.cursor()

@app.route('/releves', methods=['GET', 'POST', 'PUT', 'DELETE'])
def receive_data():
    if request.method == 'POST':
        data = request.json
        temperature = data.get('temperature')
        humidity = data.get('humidity')
        # Création de la table si elle n'existe pas déjà
        create_table_query = """
        CREATE TABLE IF NOT EXISTS table_meteo (
            releve_id INT AUTO_INCREMENT PRIMARY KEY,
            temperature FLOAT,
            humidity FLOAT
        );
        """

        cursor.execute(create_table_query)
        db.commit()

        cursor.execute("INSERT INTO table_meteo (temperature, humidity) VALUES (%s, %s)", (temperature, humidity))
        db.commit()
        return jsonify({'message': 'Données reçues et stockées'})

    if request.method == 'GET':
        cursor.execute("SELECT * FROM  table_meteo WHERE  ")
        data = cursor.fetchall()
        response = jsonify(data)
        return response

    if request.method == 'PUT':
        releve_id = request.args.get('releve_id')
        temperature = request.json.get('temperature')
        humidity = request.json.get('humidity')
        cursor.execute("UPDATE table_meteo SET temperature=%s, humidity=%s WHERE releve_id=%s", (temperature, humidity, releve_id))
        db.commit()
        return jsonify({'message': 'Données mises à jour avec succès'})

    if request.method == 'DELETE':
        releve_id = request.args.get('releve_id')
        cursor.execute("DELETE FROM table_meteo WHERE releve_id=%s", (releve_id,))
        db.commit()
        return jsonify({'message': 'Données supprimées avec succès'})

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)
