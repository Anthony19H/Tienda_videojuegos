import { useState } from 'react';
import './App.css';
import data from './data/videojuegos'; // <-- Importamos tus datos iniciales de videojuegos
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  // El estado global con la lista de videojuegos vive aquí ahora
  const [videojuegos, setVideojuegos] = useState(data);

  // 1. Agregar un videojuego nuevo
  function agregarVideojuego(juegoNuevo) {
    setVideojuegos([...videojuegos, juegoNuevo]);
  }

  // 2. Eliminar un videojuego por ID
  function eliminarVideojuego(id) {
    const filtrados = videojuegos.filter((juego) => juego.id !== id);
    setVideojuegos(filtrados);
  }

  // 3. Editar un videojuego existente
  function editarVideojuego(juegoEditado) {
    const actualizados = videojuegos.map((juego) => {
      if (juego.id === juegoEditado.id) {
        return juegoEditado;
      } else {
        return juego;
      }
    });
    setVideojuegos(actualizados);
  }

  // 4. Decidir si guardamos un registro nuevo o editamos uno existente
  function manejarGuardar(juego) {
    const existe = videojuegos.find((j) => j.id === juego.id);

    if (existe) {
      editarVideojuego(juego);
    } else {
      agregarVideojuego(juego);
    }
  }

  return (
    <BrowserRouter>
      {/* Tu Navbar con los enlaces de navegación */}
      <Navbar />

      <Routes>
        {/* Ruta Principal: Tabla de Videojuegos */}
        <Route
          path="/"
          element={
            <TablaVideojuegos 
              videojuegos={videojuegos} 
              onEliminar={eliminarVideojuego} 
            />
          }
        />

        {/* Ruta para Registrar un nuevo videojuego */}
        <Route
          path="/nuevo"
          element={<FormularioVideojuego Onguardar={manejarGuardar} />}
        />

        {/* Ruta para Editar un videojuego seleccionado */}
        <Route
          path="/editar"
          element={<FormularioVideojuego Onguardar={manejarGuardar} />}
        />

        {/* Ruta para cualquier otra dirección (Página No Encontrada) */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>
              <h2>404 - Página No Encontrada</h2>
              <p>Inserta un disco válido en la bandeja.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;