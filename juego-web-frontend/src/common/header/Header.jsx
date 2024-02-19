import React, { useContext } from "react";
import "../header/Header.css";
import { AuthContext } from '../../auth/AuthContext';

export default function Header() {
    const { token } = useContext(AuthContext);
    const {logout} = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        window.location.reload();
    }


    return (
        <header className="header">
            <div className="logo-header">
                <a href="/">COLIQUIN</a>
            </div>
            {token === "null" ? (
                <nav className="nav-links">
                    <a href="/menu-partidas">Jugar</a>
                    <a href="/instrucciones">Instrucciones</a>
                    <a href="/acerca-de">Acerca de</a>
                    <a href="/sobre-nosotros">Sobre Nosotros</a>
                    <a href="/login">Iniciar Sesión</a>
                </nav>
            ) : (
                <nav className="nav-links">
                    <a href="/menu-partidas">Jugar</a>
                    <a href="/instrucciones">Instrucciones</a>
                    <a href="/acerca-de">Acerca de</a>
                    <a href="/sobre-nosotros">Sobre Nosotros</a>
                    <a href="/" onClick={handleLogout}>Cerrar Sesión</a>
                </nav>
            )}
        </header>
    );
}
