const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Permitir peticiones del frontend
app.use(express.json()); // Parsear JSON

// Conexión con la base de datos MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root', // Cambia según tu configuración de MySQL
    password: '123456', // Añade tu contraseña si tienes
    database: 'sistemareservasescritorios',
};

// Función para crear una nueva conexión
const getConnection = () => mysql.createConnection(dbConfig);

// RUTAS API

// 1. Obtener todas las reservas
app.get('/api/reservas', (req, res) => {
    const db = getConnection();
    db.query('SELECT * FROM reservas', (err, results) => {
        db.end();
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 2. Crear una nueva reserva
app.post('/api/reservas', (req, res) => {
    const { nombre, rol, departamento, correo, escritorio, fecha, horaInicio, horaFin } = req.body;
    const sql = 'INSERT INTO reservas (nombre, rol, departamento, correo, escritorio, fecha, horaInicio, horaFin) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const db = getConnection();
    db.query(sql, [nombre, rol, departamento, correo, escritorio, fecha, horaInicio, horaFin], (err, result) => {
        db.end();
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: result.insertId });
    });
});

// 3. Actualizar una reserva existente
app.put('/api/reservas/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { nombre, rol, departamento, correo, escritorio, fecha, horaInicio, horaFin } = req.body;
    const db = getConnection();
    db.query(
        'UPDATE reservas SET nombre = ?, rol = ?, departamento = ?, correo = ?, escritorio = ?, fecha = ?, horaInicio = ?, horaFin = ? WHERE id = ?',
        [nombre, rol, departamento, correo, escritorio, fecha, horaInicio, horaFin, id],
        (err, result) => {
            db.end();
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }
            res.json({ message: 'Reserva actualizada exitosamente' });
        }
    );
});

// 4. Eliminar una reserva
app.delete('/api/reservas/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const db = getConnection();
    db.query('DELETE FROM reservas WHERE id = ?', [id], (err, result) => {
        db.end();
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.sendStatus(204);
    });
});

// 5. Obtener estadísticas de uso
app.get('/api/estadisticas', (req, res) => {
    const db = getConnection();
    const sqlTotalReservas = 'SELECT COUNT(*) AS totalReservas FROM reservas';
    const sqlReservasPorEscritorio = `
        SELECT escritorio, COUNT(*) AS totalReservas
        FROM reservas
        GROUP BY escritorio
    `;
    const sqlTiempoPromedioUso = `
        SELECT escritorio, AVG(TIMESTAMPDIFF(HOUR, horaInicio, horaFin)) AS promedioHoras
        FROM reservas
        GROUP BY escritorio
    `;

    const estadisticas = {};

    db.query(sqlTotalReservas, (err, results) => {
        if (err) {
            db.end();
            return res.status(500).json({ error: err.message });
        }
        estadisticas.totalReservas = results[0].totalReservas;

        db.query(sqlReservasPorEscritorio, (err, results) => {
            if (err) {
                db.end();
                return res.status(500).json({ error: err.message });
            }
            estadisticas.reservasPorEscritorio = results;

            db.query(sqlTiempoPromedioUso, (err, results) => {
                db.end();
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                estadisticas.tiempoPromedioUso = results;
                res.json(estadisticas);
            });
        });
    });
});

// Iniciar el servidor en el puerto 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
