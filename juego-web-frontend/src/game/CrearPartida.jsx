import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import './CrearPartida.css';
import ListaPartidas from './ListaPartidas';
import FormNuevaPartida from './FormNuevaPartida';

export default function CrearPartida() {
    const { token } = useContext(AuthContext);
    const [status, setStatus] = useState(null);
    const [mostrarListaPartidas, setMostrarListaPartidas] = useState(false);
    const [mostrarFormNuevaPartida, setmostrarFormNuevaPartida] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        console.log(token);
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protecteduser`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setStatus(response.status);
            })
            .catch(error => {
                setStatus(error.response.status);
            });
    }, []);

    const handleCrearPartidaClick = () => {
        setmostrarFormNuevaPartida(true);
    };

    const handleUnirPartidaClick = () => {
        setMostrarListaPartidas(true);
    };

    const handleCloseClick = () => {
        setMostrarListaPartidas(false);
        setmostrarFormNuevaPartida(false);
    };

    return (
        <>
            {status < 300 ? (
                <div className="container-menu">
                    <div className="menu-partidas">
                        <h1 className="titulo">Conquista el Campus Coliquín!</h1>
                        <h2 className="subtitulo-menu">Elige una opción</h2>
                        <div className="opciones-menu">
                            <div className="crear-partida" onClick={handleCrearPartidaClick}>
                                <h3 className="texto-partida">Crear Partida</h3>
                                <h4 className="texto-partida">
                                    ¿Crees que tienes lo necesario para liderar la invasión? ¡Demuestra tus habilidades estratégicas y crea tu propia partida! Recluta a tus amigos, forma alianzas poderosas y conquista juntos el campus San Coliquin. Solo el líder más astuto podrá reclamar la gloria y el dominio. ¡El desafío te espera, comandante!
                                </h4>
                            </div>
                            <div className="unir-partida" onClick={handleUnirPartidaClick}>
                                <h3 className="texto-partida">Unirse a una partida</h3>
                                <h4 className="texto-unir" >
                                    ¿Prefieres unirte a una expedición ya en marcha? ¡Es hora de apoyar a tus amigos en su búsqueda por el dominio del campus! Únete a la partida de un amigo y demuestra que eres un aliado leal y valioso. Juntos, enfrentarán desafíos, forjarán alianzas y se enfrentarán a adversarios formidables. ¿Estás listo para ser parte de una epopeya que se contará en los pasillos de San Coliquin?
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mensaje-error">
                    <h1><a href="/login" className='link-login'>Debes estar logeado para iniciar una partida.</a></h1>
                </div>
            )}
            {mostrarFormNuevaPartida && <FormNuevaPartida mostrar={mostrarFormNuevaPartida} handleCloseClick={handleCloseClick} refresh={refresh} setRefresh={setRefresh} />}
            {mostrarListaPartidas && <ListaPartidas mostrar={mostrarListaPartidas} handleCloseClick={handleCloseClick} refresh={refresh} setRefresh={setRefresh} />}
        </>
    );
}