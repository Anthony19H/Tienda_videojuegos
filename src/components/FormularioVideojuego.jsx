import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FormularioVideojuego.css";

function FormularioVideojuego({ Onguardar }) { 
    const location = useLocation();
    const navigate = useNavigate(); 

    const juegoRecuperado = location.state?.videojuego || null;

    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("PlayStation 5"); 
    const [lanzamiento, setLanzamiento] = useState(""); 
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [sinopsis, setSinopsis] = useState("");
    const [calificacion, setCalificacion] = useState("");
    const [errores, setErrores] = useState({}); 

    const obtenerFechaHoy = () => {
        const hoy = new Date();
        const dia = String(hoy.getDate()).padStart(2, '0');
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const anio = hoy.getFullYear();
        return `${anio}-${mes}-${dia}`;
    };

    const fechaMaxima = obtenerFechaHoy();

    useEffect(() => {
        if (juegoRecuperado) {
            setTitulo(juegoRecuperado.titulo || "");
            setGenero(juegoRecuperado.genero || "");
            setPlataforma(juegoRecuperado.plataforma || "PlayStation 5");
            setPrecio(juegoRecuperado.precio || "");
            setDisponible(juegoRecuperado.disponible || false);
            setProgreso(juegoRecuperado.progreso || 0);
            setSinopsis(juegoRecuperado.sinopsis || "");
            
            if (juegoRecuperado.lanzamiento) {
                if (String(juegoRecuperado.lanzamiento).includes("-")) {
                    setLanzamiento(juegoRecuperado.lanzamiento);
                } else {
                    setLanzamiento(`${juegoRecuperado.lanzamiento}-01-01`);
                }
            } else {
                setLanzamiento("");
            }
            
            if (juegoRecuperado.calificacion) {
                setCalificacion(
                    juegoRecuperado.calificacion <= 10 
                        ? juegoRecuperado.calificacion * 10 
                        : juegoRecuperado.calificacion
                );
            } else {
                setCalificacion("");
            }
        } else {
            setTitulo("");
            setGenero("");
            setPlataforma("PlayStation 5");
            setLanzamiento("");
            setPrecio("");
            setDisponible(false);
            setProgreso(0);
            setSinopsis("");
            setCalificacion("");
        }
        setErrores({}); 
    }, [juegoRecuperado]);

    const validarFormulario = () => {
        const erroresActivos = {};
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); 

        if (!titulo || titulo.trim() === "") {
            erroresActivos.nombre = "El nombre del videojuego es obligatorio.";
        }

        if (!genero || genero.trim() === "") {
            erroresActivos.genero = "El género es obligatorio.";
        }

        if (!lanzamiento) {
            erroresActivos.lanzamiento = "La fecha de lanzamiento es obligatoria.";
        } else {
            const fechaIngresada = new Date(lanzamiento + "T00:00:00");
            if (fechaIngresada > hoy) {
                erroresActivos.lanzamiento = "La fecha no puede ser futura.";
            }
        }

        if (!precio || Number(precio) <= 0) {
            erroresActivos.precio = "El precio debe ser un número mayor a 0.";
        }

        const sinopsisLimpia = sinopsis.trim();
        if (!sinopsisLimpia || sinopsisLimpia.length < 10) {
            erroresActivos.sinopsis = "La sinopsis debe tener al menos 10 caracteres.";
        } else if (sinopsisLimpia.length > 250) {
            erroresActivos.sinopsis = "La sinopsis no puede superar los 250 caracteres.";
        }

        const califNum = Number(calificacion);
        if (!calificacion || isNaN(califNum) || califNum < 1 || califNum > 100) {
            erroresActivos.calificacion = "La calificación debe estar entre 1 y 100.";
        }

        return erroresActivos;
    };

    function manejarGuardar(e) {
        e.preventDefault(); 

        const erroresDetectados = validarFormulario();
        if (Object.keys(erroresDetectados).length > 0) {
            setErrores(erroresDetectados);
            return; 
        }

        const juego = {
            id: juegoRecuperado ? juegoRecuperado.id : Date.now(), 
            titulo: titulo.trim(),
            genero: genero.trim(),
            plataforma: plataforma,
            lanzamiento: lanzamiento, 
            precio: Number(precio),
            disponible: disponible,
            progreso: Number(progreso),
            sinopsis: sinopsis.trim(),
            calificacion: Number(calificacion) 
        };

        Onguardar(juego);
        navigate("/"); 
    }

    function manejarCancelar() {
        navigate("/");
    }

    return (
        <div className="formulario-wrapper">
            <div className="formulario-card">
                <h2 className="retro-title">
                    {juegoRecuperado ? "⚙️ MODIFICAR REGISTRO // PS2" : "💾 GUARDAR REGISTRO // PS2"}
                </h2>
                <div className="retro-subtitle">CONFIGURACIÓN DE DATOS DE MEMORY CARD</div>
                
                <form onSubmit={manejarGuardar} className="retro-form">
                    <div className="form-grid">
                        
                        {/* Título */}
                        <div className="form-group">
                            <label>Título / Nombre</label>
                            <input 
                                type="text" 
                                placeholder="Ej. Silent Hill 2" 
                                value={titulo} 
                                onChange={(e) => {
                                    setTitulo(e.target.value);
                                    if (errores.nombre) setErrores({...errores, nombre: ""});
                                }} 
                            />
                            {errores.nombre && <span className="error-mensaje">{errores.nombre}</span>}
                        </div>

                        {/* Género */}
                        <div className="form-group">
                            <label>Género</label>
                            <input 
                                type="text" 
                                placeholder="Ej. Survival Horror" 
                                value={genero} 
                                onChange={(e) => {
                                    setGenero(e.target.value);
                                    if (errores.genero) setErrores({...errores, genero: ""});
                                }} 
                            />
                            {errores.genero && <span className="error-mensaje">{errores.genero}</span>}
                        </div>

                        {/* Plataforma */}
                        <div className="form-group">
                            <label>Plataforma</label>
                            <select 
                                value={plataforma} 
                                onChange={(e) => setPlataforma(e.target.value)}
                            >
                                <option value="Nintendo Switch">Nintendo Switch</option>
                                <option value="PlayStation 2">PlayStation 2</option>
                                <option value="PlayStation 5">PlayStation 5</option>
                                <option value="GameCube">GameCube</option>
                            </select>
                        </div>

                        {/* Fecha de Lanzamiento */}
                        <div className="form-group">
                            <label>Fecha de Lanzamiento</label>
                            <input 
                                type="date" 
                                max={fechaMaxima} 
                                value={lanzamiento} 
                                onChange={(e) => {
                                    setLanzamiento(e.target.value);
                                    if (errores.lanzamiento) setErrores({...errores, lanzamiento: ""});
                                }} 
                            />
                            {errores.lanzamiento && <span className="error-mensaje">{errores.lanzamiento}</span>}
                        </div>

                        {/* Precio */}
                        <div className="form-group">
                            <label>Precio ($)</label>
                            <input 
                                type="number" 
                                step="0.01"
                                placeholder="0.00" 
                                value={precio} 
                                onChange={(e) => {
                                    setPrecio(e.target.value);
                                    if (errores.precio) setErrores({...errores, precio: ""});
                                }} 
                            />
                            {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
                        </div>

                        {/* Calificación */}
                        <div className="form-group">
                            <label>Calificación de la Crítica (1 a 100)</label>
                            <input 
                                type="number" 
                                placeholder="Puntuación (1-100)" 
                                value={calificacion} 
                                onChange={(e) => {
                                    setCalificacion(e.target.value);
                                    if (errores.calificacion) setErrores({...errores, calificacion: ""});
                                }} 
                            />
                            {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
                        </div>

                        {/* Progreso */}
                        <div className="form-group">
                            <label>Progreso completado (0.00 a 1.00)</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                min="0" 
                                max="1" 
                                placeholder="Ej: 0.5 para 50%" 
                                value={progreso} 
                                onChange={(e) => setProgreso(e.target.value)} 
                            />
                        </div>

                        {/* Disponibilidad */}
                        <div className="form-group checkbox-group">
                            <label className="checkbox-label">
                                <input 
                                    type="checkbox" 
                                    checked={disponible} 
                                    onChange={(e) => setDisponible(e.target.checked)} 
                                />
                                <span className="checkbox-custom"></span>
                                Disponible / En Stock
                            </label>
                        </div>
                    </div>

                    {/* Sinopsis */}
                    <div className="form-group full-width">
                        <label>Sinopsis / Resumen</label>
                        <textarea 
                            placeholder="Resume brevemente de qué trata el videojuego..." 
                            rows="4"
                            value={sinopsis} 
                            onChange={(e) => {
                                setSinopsis(e.target.value);
                                if (errores.sinopsis) setErrores({...errores, sinopsis: ""});
                            }} 
                        />
                        <div className="char-counter">
                            {sinopsis.length}/250 caracteres (Mínimo: 10)
                        </div>
                        {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
                    </div>

                    {/* Botones */}
                    <div className="form-botones">
                        <button type="submit" className="btn-retro btn-guardar">
                            ■ Guardar Cambios
                        </button>
                        <button type="button" className="btn-retro btn-cancelar" onClick={manejarCancelar}>
                            × Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormularioVideojuego;