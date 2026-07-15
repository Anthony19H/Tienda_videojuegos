import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // <-- Corregido useNavigate

function FormularioVideojuego({ Onguardar }) { // <-- Agregamos el prop de guardado
    const location = useLocation();
    const navigate = useNavigate(); // <-- Corregido el nombre de la variable

    // Recuperamos el videojuego si venimos de la acción "Editar"
    const juegoRecuperado = location.state?.videojuego || null;

    // Estados del formulario
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [plataforma, setPlataforma] = useState("PlayStation 5"); // Valor inicial por defecto
    const [lanzamiento, setLanzamiento] = useState("");
    const [precio, setPrecio] = useState("");
    const [disponible, setDisponible] = useState(false);
    const [progreso, setProgreso] = useState(0);

    // useEffect para precargar los datos al editar
    useEffect(() => {
        if (juegoRecuperado) {
            setTitulo(juegoRecuperado.titulo || "");
            setGenero(juegoRecuperado.genero || "");
            setPlataforma(juegoRecuperado.plataforma || "PlayStation 5");
            setLanzamiento(juegoRecuperado.lanzamiento || "");
            setPrecio(juegoRecuperado.precio || "");
            setDisponible(juegoRecuperado.disponible || false);
            setProgreso(juegoRecuperado.progreso || 0);
        } else {
            // Valores limpios si es un juego nuevo
            setTitulo("");
            setGenero("");
            setPlataforma("PlayStation 5");
            setLanzamiento("");
            setPrecio("");
            setDisponible(false);
            setProgreso(0);
        }
    }, [juegoRecuperado]);

    function manejarGuardar(e) {
        e.preventDefault(); // Evita recargas de página

        const juego = {
            id: juegoRecuperado ? juegoRecuperado.id : Date.now(), // ID único o el existente
            titulo: titulo,
            genero: genero,
            plataforma: plataforma,
            lanzamiento: lanzamiento,
            precio: Number(precio),
            disponible: disponible,
            progreso: Number(progreso)
        };

        Onguardar(juego);
        navigate("/"); // Regresa al catálogo
    }

    function manejarCancelar() {
        navigate("/");
    }

    return (
        <div className="formulario-container">
            <h1>Formulario de Videojuegos</h1>
            <form onSubmit={manejarGuardar}>
                <label>Título</label>
                <input 
                    type="text" 
                    placeholder="Título del juego" 
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)} 
                    required 
                />

                <label>Género</label>
                <input 
                    type="text" 
                    placeholder="Género (Peleas, RPG, etc.)" 
                    value={genero} 
                    onChange={(e) => setGenero(e.target.value)} 
                    required 
                />

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

                <label>Lanzamiento (Año o Fecha)</label>
                <input 
                    type="text" 
                    placeholder="Ej. 2023 o AAAA-MM-DD" 
                    value={lanzamiento} 
                    onChange={(e) => setLanzamiento(e.target.value)} 
                />

                <label>Precio</label>
                <input 
                    type="number" 
                    placeholder="Precio" 
                    value={precio} 
                    onChange={(e) => setPrecio(e.target.value)} 
                    required 
                />

                <label className="checkbox-label">
                    <input 
                        type="checkbox" 
                        checked={disponible} 
                        onChange={(e) => setDisponible(e.target.checked)} // <-- Corregido a .checked
                    />
                    Disponible / En Stock
                </label>
                
                <label>Progreso (0 a 1)</label>
                <input 
                    type="number" 
                    step="0.1" 
                    min="0" 
                    max="1" 
                    placeholder="Progreso del juego (Ej: 0.5 para 50%)" 
                    value={progreso} 
                    onChange={(e) => setProgreso(e.target.value)} 
                />

                <div className="form-botones">
                    <button type="submit" className="btn-guardar">Guardar</button>
                    <button type="button" className="btn-cancelar" onClick={manejarCancelar}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export default FormularioVideojuego;