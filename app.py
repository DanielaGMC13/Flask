from flask import Flask, jsonify, request, send_file
from psycopg2 import connect, extras




app = Flask(__name__)


host = 'localhost'
port = 5432
database = 'danielaFlask'
user = 'postgres'
password = 'david'


def getConnection():
    conn = connect(host=host, database=database,
                   user=user, password=password, port=port)
    return conn


@app.get('/api/compraBicicleta')
def getBicicleta():
    conn = getConnection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    cur.execute("SELECT * FROM bicicleta")
    bicicleta = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(bicicleta)


@app.post('/api/compraBicicleta')
def newBicicleta():
    
    newBicicleta = request.get_json()

    nombre        =   newBicicleta['nombre']
    apellido    =   newBicicleta['apellido']
    fecha       =   newBicicleta['fecha']
    marca       =   newBicicleta['marca']

    conn = getConnection()
    cur = conn.cursor(cursor_factory=extras.RealDictCursor)
    
    cur.execute("INSERT INTO bicicleta (nombre, apellido, fecha, marca) VALUES (%s, %s, %s,%s) RETURNING *",
                (nombre, apellido, fecha, marca))
    newBicicleta = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return jsonify(newBicicleta)


@app.get('/')
def home():
    return send_file('static/index.html')


if __name__ == '__main__':
    app.run(debug=True)