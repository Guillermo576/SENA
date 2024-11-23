// src/pages/Escritorios.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Escritorios = () => {
    const [escritorios, setEscritorios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = [
            { id: 1, nombre: 'Escritorio A', estado: 'Disponible' },
            { id: 2, nombre: 'Escritorio B', estado: 'Disponible' },
            { id: 3, nombre: 'Escritorio C', estado: 'Disponible' },
        ];
        setEscritorios(data);
    }, []);

    const irAReservas = (id) => {
        navigate(`/reservas/${id}`);  // Redirige a reservas con el ID del escritorio
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Gestión de Escritorios</h2>
            <ul>
                {escritorios.map((escritorio) => (
                    <li key={escritorio.id} style={{ marginBottom: '10px' }}>
                        {escritorio.nombre} - Estado: {escritorio.estado}
                        <button
                            onClick={() => irAReservas(escritorio.id)}
                            style={{ marginLeft: '10px' }}
                        >
                            Reservar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Escritorios;
