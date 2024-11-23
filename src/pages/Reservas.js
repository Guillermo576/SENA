import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Reservas = () => {
    const { id: escritorioId } = useParams(); // Obtener el ID del escritorio de la URL
    const [reservas, setReservas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [rol, setRol] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [correo, setCorreo] = useState('');
    const [escritorio, setEscritorio] = useState('');
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [reservaEditandoId, setReservaEditandoId] = useState(null);

    // Obtener todas las reservas al cargar la página
    useEffect(() => {
        fetch('http://localhost:5000/api/reservas')
            .then((res) => res.json())
            .then((data) => setReservas(data))
            .catch((err) => console.error('Error al obtener reservas:', err));
    }, []);

    // Pre-llenar el campo de escritorio si hay un ID proporcionado en la URL
    useEffect(() => {
        if (escritorioId) {
            setEscritorio(`Escritorio ${escritorioId}`);
        }
    }, [escritorioId]);

    const manejarEnvio = (e) => {
        e.preventDefault();
        const nuevaReserva = {
            nombre, rol, departamento, correo, escritorio, fecha, horaInicio, horaFin,
        };

        if (reservaEditandoId) {
            console.log('ID de la reserva a actualizar:', reservaEditandoId);
            if (!reservaEditandoId) {
                console.error('Error: ID de la reserva a editar no válido');
                return;
            }

            // Editar reserva existente
            fetch(`http://localhost:5000/api/reservas/${reservaEditandoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaReserva),
            })
                .then((res) => {
                    console.log('Estado de la respuesta del servidor:', res.status);
                    if (!res.ok) {
                        throw new Error('Error al actualizar la reserva, estado: ' + res.status);
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log('Respuesta del servidor después de actualizar la reserva:', data);
                    return fetch('http://localhost:5000/api/reservas')
                        .then((res) => res.json())
                        .then((data) => setReservas(data));
                })
                .then(() => {
                    alert('Reserva actualizada con éxito');
                    setReservaEditandoId(null);
                    limpiarFormulario();
                })
                .catch((err) => console.error('Error al actualizar la reserva:', err));
        } else {
            // Crear nueva reserva
            fetch('http://localhost:5000/api/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaReserva),
            })
                .then((res) => {
                    console.log('Estado de la respuesta del servidor:', res.status);
                    if (!res.ok) {
                        throw new Error('Error al crear la reserva, estado: ' + res.status);
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log('Respuesta del servidor después de crear la reserva:', data);
                    return fetch('http://localhost:5000/api/reservas')
                        .then((res) => res.json())
                        .then((data) => setReservas(data));
                })
                .then(() => {
                    alert('Reserva realizada con éxito');
                    limpiarFormulario();
                })
                .catch((err) => console.error('Error al crear la reserva:', err));
        }
    };

    const manejarEditar = (reserva) => {
        console.log('Reserva seleccionada para editar:', reserva);
        setReservaEditandoId(reserva.id);
        setNombre(reserva.nombre);
        setRol(reserva.rol);
        setDepartamento(reserva.departamento);
        setCorreo(reserva.correo);
        setEscritorio(reserva.escritorio);

        // Convertir la fecha al formato "yyyy-MM-dd" para evitar errores con el input de tipo date
        const fechaFormateada = new Date(reserva.fecha).toISOString().split('T')[0];
        setFecha(fechaFormateada);

        setHoraInicio(reserva.horaInicio);
        setHoraFin(reserva.horaFin);
    };

    const eliminarReserva = (id) => {
        fetch(`http://localhost:5000/api/reservas/${id}`, { method: 'DELETE' })
            .then(() => {
                setReservas(reservas.filter((reserva) => reserva.id !== id));
                alert('Reserva eliminada');
            })
            .catch((err) => console.error('Error al eliminar reserva:', err));
    };

    const limpiarFormulario = () => {
        setNombre('');
        setRol('');
        setDepartamento('');
        setCorreo('');
        setEscritorio('');
        setFecha('');
        setHoraInicio('');
        setHoraFin('');
        setReservaEditandoId(null);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Reservar Escritorio</h2>
            <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="text" placeholder="Rol" value={rol} onChange={(e) => setRol(e.target.value)} required />
                <input type="text" placeholder="Departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} required />
                <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                <input type="text" placeholder="Escritorio" value={escritorio} onChange={(e) => setEscritorio(e.target.value)} required />
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} required />
                <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} required />
                <button type="submit">{reservaEditandoId ? 'Actualizar Reserva' : 'Reservar'}</button>
            </form>

            <h3>Mis Reservas</h3>
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>
                        {reserva.nombre} - Escritorio {reserva.escritorio} - {reserva.fecha}
                        <button onClick={() => manejarEditar(reserva)}>Editar</button>
                        <button onClick={() => eliminarReserva(reserva.id)}>Cancelar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reservas;
