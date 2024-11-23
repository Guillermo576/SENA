-- Creación de la base de datos y tabla para reservas
CREATE DATABASE IF NOT EXISTS sistemareservasescritorios;
USE sistemareservasescritorios;

CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    escritorio VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    horaInicio TIME NOT NULL,
    horaFin TIME NOT NULL
);

