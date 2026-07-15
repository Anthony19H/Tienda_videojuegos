import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importación de sus estilos correspondientes

function Navbar() {
    return (
        <nav className="navbar">
            <span className="navbar-logo">🎮 RetroGame Store</span>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Catálogo</Link>
                <Link to="/nuevo" className="nav-link btn-add">Añadir Juego</Link>
            </div>
        </nav>
    );
}

export default Navbar;