// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="navbar">
        <ul style={{ display: 'flex', listStyle: 'none', gap: '15px', padding: '10px' }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/escritorios">Escritorios</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/estadisticas">Estadísticas</Link></li>
        </ul>
    </nav>
);

export default Navbar;
