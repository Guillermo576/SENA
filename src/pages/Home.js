// src/pages/Home.js
import React from 'react';
import './Home.css'; // Importamos los estilos CSS

const Home = () => (
    <div className="home-container">
        <h1>Bienvenido a la Plataforma de Reservas</h1>
        <p>Gestiona tus espacios de trabajo fácilmente.</p>
        <div className="home-buttons">
            <button onClick={() => window.location.href = '/escritorios'}>Reserva tu escritorio</button>
        </div>
    </div>
);

export default Home;