import React from "react";
import HistorialPartidas from './HistorialPartidas';
import './LandingPage.css';
import { useContext } from "react";
import { AuthContext } from '../auth/AuthContext';

export default function LandingPage() {
    const { token } = useContext(AuthContext);

    return (
        <>
        <div className="landing">
            <div className="titulo-landing">
                <h1 className="titulo-lan">Bienvenido a Coliquin!</h1>
                <p className="info-landing">Conquista la totalidad del campus San Coliquin e impone tu facultad sobre otras.</p>
                <button className="jugar-landing" onClick={() => window.location.href = '/menu-partidas'}>Jugar!</button>
            </div>
            <div className="imagenes-landing">
                <img src="../colibri.png" alt="Imagen colibri" />
            </div>
        </div>
        {token !== "null" ? (<div className="historial-partidas"> <HistorialPartidas /> </div>) : (<></>)}
        </>
    );
}
