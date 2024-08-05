const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json({limit: '25mb'}));

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Función para crear una conexión a la base de datos
async function conexion() {
    try {
        const conex = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        console.log('Conexión con la BD establecida con el ID ' + conex.threadId);
        return conex;
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
}

server.get('/test-db-connection', async (req, res) => {
    try {
        const db = await conexion();
        res.json({ success: true, message: 'Conexión a la base de datos exitosa' });
    } catch (err) {
        console.error('Error al conectar con la base de datos:', err);
        res.status(500).json({ success: false, message: 'Error al conectar con la base de datos' });
    }
});


server.post('/submit-form', async (req, res) => {
    const { name, email, phone, planet, message, radio, privacy } = req.body;
  
    if (!name || !email || !message || privacy === undefined) {
        return res.status(400).json({ success: false, message: 'Faltan datos necesarios' });
    }
  
    const sql = 'INSERT INTO formData (name, email, phone, planet, message, radio, privacy) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [name, email, phone, planet, message, radio, privacy];
  
    try {
        const db = await conexion();
        const [result] = await db.execute(sql, values);
        res.json({ success: true, message: 'Mensaje enviado con éxito' });
    } catch (err) {
        console.error('Error al insertar datos:', err);
        res.status(500).json({ success: false, message: 'Error al enviar el mensaje' });
    }
});

module.exports = server;
