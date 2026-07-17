import { useState, useEffect } from 'react'; 
import './App.css';
import data from './data/videojuegos'; 
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import Navbar from './components/Navbar';
import AlertaNotificacion from './components/AlertaNotificacion'; // 👈 Importamos la nueva alerta
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  // Estado para la lista de videojuegos
  const [videojuegos, setVideojuegos] = useState(() => {
    const guardados = localStorage.getItem('lista_videojuegos');
    return guardados ? JSON.parse(guardados) : data;
  });

  // 1. NUEVOS ESTADOS: Control de la alerta
  const [alerta, setAlerta] = useState({ visible: false, mensaje: "" });

  // Guarda en localStorage de forma automática
  useEffect(() => {
    localStorage.setItem('lista_videojuegos', JSON.stringify(videojuegos));
  }, [videojuegos]);

  // Función para activar una nueva alerta de éxito
  function mostrarAlerta(mensaje) {
    setAlerta({ visible: true, mensaje });
  }

  // Función para cerrar la alerta
  function cerrarAlerta() {
    setAlerta({ visible: false, mensaje: "" });
  }

  // 2. Agregar un videojuego nuevo
  function agregarVideojuego(juegoNuevo) {
    setVideojuegos([...videojuegos, juegoNuevo]);
    mostrarAlerta(`"${juegoNuevo.titulo}" guardado con éxito.`); // 👈 Alerta
  }

  // 3. Eliminar un videojuego por ID
  function eliminarVideojuego(id) {
    const juegoAEliminar = videojuegos.find((j) => j.id === id);
    const confirmar = window.confirm("¿Seguro que deseas eliminar este videojuego de la Memory Card?");
    if (confirmar) {
      const filtrados = videojuegos.filter((juego) => juego.id !== id);
      setVideojuegos(filtrados);
      mostrarAlerta(`"${juegoAEliminar?.titulo || "Videojuego"}" eliminado correctamente.`); // 👈 Alerta
    }
  }

  // 4. Editar un videojuego existente
  function editarVideojuego(juegoEditado) {
    const actualizados = videojuegos.map((juego) => {
      if (juego.id === juegoEditado.id) {
        return juegoEditado;
      } else {
        return juego;
      }
    });
    setVideojuegos(actualizados);
    mostrarAlerta(`"${juegoEditado.titulo}" modificado con éxito.`); // 👈 Alerta
  }

  // Decidir si guardamos un registro nuevo o editamos uno existente
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
      <Navbar />

      {/* 🟢 Si la alerta está activa, la renderizamos flotando en pantalla */}
      {alerta.visible && (
        <AlertaNotificacion 
          mensaje={alerta.mensaje} 
          onCerrar={cerrarAlerta} 
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <TablaVideojuegos 
              videojuegos={videojuegos} 
              onEliminar={eliminarVideojuego} 
            />
          }
        />

        <Route
          path="/nuevo"
          element={<FormularioVideojuego Onguardar={manejarGuardar} />}
        />

        <Route
          path="/editar"
          element={<FormularioVideojuego Onguardar={manejarGuardar} />}
        />

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