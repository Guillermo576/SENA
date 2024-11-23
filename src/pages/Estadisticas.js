import React, { useEffect, useState } from 'react';

const Estadisticas = () => {
    const [estadisticas, setEstadisticas] = useState({
        totalReservas: 0,
        reservasPorEscritorio: [],
        tiempoPromedioUso: [],
    });

    useEffect(() => {
        const usarDatosSimulados = false; // Cambia a true para usar datos simulados
        if (usarDatosSimulados) {
            // Datos simulados
            const datosSimulados = {
                totalReservas: 15,
                reservasPorEscritorio: [
                    { id: 1, nombre: 'Escritorio A', totalReservas: 5 },
                    { id: 2, nombre: 'Escritorio B', totalReservas: 7 },
                    { id: 3, nombre: 'Escritorio C', totalReservas: 3 },
                ],
                tiempoPromedioUso: [
                    { id: 1, nombre: 'Escritorio A', promedioHoras: 4 },
                    { id: 2, nombre: 'Escritorio B', promedioHoras: 3 },
                    { id: 3, nombre: 'Escritorio C', promedioHoras: 5 },
                ],
            };
            setTimeout(() => setEstadisticas(datosSimulados), 500); // Simula un retraso
        } else {
            // Llamada al backend
            fetch('http://localhost:5000/api/estadisticas')
                .then((res) => res.json())
                .then((data) => setEstadisticas(data))
                .catch((err) => console.error('Error al obtener estadísticas:', err));
        }
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Estadísticas de Uso</h2>

            <div style={{ marginBottom: '20px' }}>
                <h3>Total de Reservas: {estadisticas.totalReservas}</h3>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Reservas por Escritorio:</h3>
                <ul>
                    {estadisticas.reservasPorEscritorio.map((escritorio) => (
                        <li key={escritorio.id}>
                            {escritorio.nombre}: {escritorio.totalReservas} reservas
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Tiempo Promedio de Uso por Escritorio:</h3>
                <ul>
                    {estadisticas.tiempoPromedioUso.map((escritorio) => (
                        <li key={escritorio.id}>
                            {escritorio.nombre}: {escritorio.promedioHoras} horas
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Estadisticas;
