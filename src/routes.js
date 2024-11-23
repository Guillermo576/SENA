import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Escritorios from './pages/Escritorios';
import Reservas from './pages/Reservas';
import Estadisticas from './pages/Estadisticas';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/escritorios" element={<Escritorios />} />
        <Route path="/reservas/:id" element={<Reservas />} /> {/* Agregado el parámetro dinámico */}
        <Route path="/estadisticas" element={<Estadisticas />} />
    </Routes>
);

export default AppRoutes;
