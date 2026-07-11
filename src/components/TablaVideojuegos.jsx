// src/components/TablaVideojuegos.jsx
import React, { useState } from 'react'; // <-- Agregamos useState aquí
import data  from '../data/videojuegos'; // <-- Importamos los datos aquí
import './TablaVideojuegos.css';

function TablaVideojuegos() { // <-- Ahora la función no necesita recibir nada por fuera
    // El estado con los 10 videojuegos vive felizmente aquí adentro
    const [listaJuegos, setListaJuegos] = useState(data);

    // Las funciones de editar y eliminar ahora manejan el estado interno directamente
    const onEditar = (juego) => {
        alert(`Modificando archivo de guardado: ${juego.titulo}`);
    };

    const onEliminar = (id) => {
        const filtrados = listaJuegos.filter((juego) => juego.id !== id);
        setListaJuegos(filtrados);
    };

    return (
        <div className="ps2-container">
            <div className="ps2-header">
                <h2>Navegador de Datos // PS2</h2>
                <div className="ps2-sub">
                    <span className="cube-icon">■</span>
                    <p>TIENDA DE VIDEOJUEGOS (MEMORY CARD 1 / 8MB)</p>
                </div>
            </div>
            
            <div className="tabla-responsiva">
                <table className="ps2-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Género</th>
                            <th>Plataforma</th>
                            <th>Año</th>
                            <th>Precio</th>
                            <th>Progreso</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ahora recorremos el estado local "listaJuegos" */}
                        {listaJuegos.map((juego) => (
                            <tr key={juego.id} className="ps2-row">
                                <td className="font-highlight">{juego.titulo}</td>
                                <td>{juego.genero}</td>
                                <td>{juego.plataforma}</td>
                                <td>{juego.lanzamiento}</td>
                                <td className="ps2-crypto">${juego.precio}</td>
                                <td>
                                    <div className="progreso-container">
                                        <progress value={juego.progreso} max="1"></progress>
                                        <span>{Math.round(juego.progreso * 100)}%</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`ps2-status ${juego.disponible ? 'online' : 'offline'}`}>
                                        {juego.disponible ? "💡 DISPONIBLE" : "❌ AGOTADO"}
                                    </span>
                                </td>
                                <td>
                                    <div className="ps2-actions">
                                        <button className="ps2-btn btn-square" onClick={() => onEditar(juego)}>
                                            <span className="pad-icon square">■</span> Editar
                                        </button>
                                        <button className="ps2-btn btn-cross" onClick={() => onEliminar(juego.id)}>
                                            <span className="pad-icon cross">×</span> Borrar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="ps2-footer">
                <span><span className="pad-icon cross">×</span> Seleccionar juego</span>
                <span><span className="pad-icon square">■</span> Modificar archivo</span>
                <span><span className="pad-icon triangle">▲</span> Atrás</span>
            </div>
        </div>
    );
}

export default TablaVideojuegos;