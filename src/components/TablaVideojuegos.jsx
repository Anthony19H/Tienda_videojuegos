import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Importamos para cambiar de página al editar
import './TablaVideojuegos.css';

// Recibimos los videojuegos y la función onEliminar desde App.jsx
function TablaVideojuegos({ videojuegos, onEliminar }) { 
    const navigate = useNavigate();

    // Esta función nos manda al formulario de edición y le envía los datos del juego seleccionado
    const onEditar = (juego) => {
        navigate('/editar', { state: { videojuego: juego } });
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
                        {/* Recorremos la lista de videojuegos que viene de App.jsx */}
                        {videojuegos.map((juego) => (
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
                                        {/* Botón de Editar */}
                                        <button className="ps2-btn btn-square" onClick={() => onEditar(juego)}>
                                            <span className="pad-icon square">■</span> Editar
                                        </button>
                                        {/* Botón de Borrar */}
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