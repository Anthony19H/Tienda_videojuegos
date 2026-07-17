import React, { useEffect } from 'react';
import './AlertaNotificacion.css';

function AlertaNotificacion({ mensaje, onCerrar }) {
  useEffect(() => {
    // Temporizador para desvanecer e informar que se cierre tras exactamente 3 segundos
    const temporizador = setTimeout(() => {
      onCerrar();
    }, 3000);

    // Limpieza del temporizador si el componente se desmonta antes
    return () => clearTimeout(temporizador);
  }, [onCerrar]);

  return (
    <div className="alerta-toast">
      <div className="alerta-contenido">
        <span className="alerta-icono">💾</span>
        <span>{mensaje}</span>
      </div>
    </div>
  );
}

export default AlertaNotificacion;