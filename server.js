// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia esto si tu usuario es diferente
  password: '', // Tu contraseña de MariaDB
  database: 'hoperecords' // Nombre de tu base de datos
});

// Conecta a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Ruta para manejar el envío de datos
app.post('/data', (req, res) => {
  const { nombre_banda, debut, contrato, genero, estado, pais, descripcion } = req.body;
  const query = 'INSERT INTO artista (nombre_banda, debut, contrato, genero, estado, pais, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [nombre_banda, debut, contrato, genero, estado, pais, descripcion], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al guardar los datos' });
    } else {
      res.status(200).json({ message: 'Datos guardados correctamente' });
    }
  });
});

// Ruta para obtener los nombres de los artistas
app.get('/artistas', (req, res) => {
  const query = 'SELECT ID_Artista, nombre_banda AS Nombre FROM artista';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener los artistas');
    }
    res.json(results);
  });
});

// Ruta para obtener los detalles de un artista por su ID
app.get('/artistas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM artista WHERE ID_Artista = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send('Error al obtener los detalles del artista');
    }
    res.json(results[0]);
  });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
