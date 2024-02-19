import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './HistorialPartidas.css';

const HistorialPartida = () => {
    const { token } = useContext(AuthContext);
    const { userId } = useContext(AuthContext);
    const [status, setStatus] = useState(300);
    const [partidasId, setPartidasId] = useState([]);
    const [partidas, setPartidas] = useState([]);

    useEffect(() => { // Proteger solo para un usuario logeado
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

    const fetchPartidas = async () => { // Trae todas las partidas
        try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/historial`);
        setPartidas(response.data);
        } catch (error) {
        console.error('Error al obtener la lista de partidas:', error);
        }
    };

    const fetchPartidasId = async () => { // Trae todas las partidas del userId
        try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/historial/user/${userId}`);
        setPartidasId(response.data);
        console.log(response.data);
        } catch (error) {
        console.error('Error al obtener la lista de partidas:', error);
        }
    };

    useEffect(() => {
        fetchPartidas();
        fetchPartidasId();
    }, []);

    return (
        <>
        {status < 300 ? (
        <div className="historiales">
        <div className="historial-container">
            <h1>Historial del Usuario</h1>

            <div className="partidas-container">
                {partidasId.map((partida) => (
                <div key={partida.id} className="partida-instancia">
                    <div className="atributo">Nombre: {partida.partida}</div>
                    <div className="atributo">Rondas: {partida.ronda}</div>
                    <div className="atributo">Estado: {partida.estado}</div>
                    { partida.estado !== "En curso" && <div className="atributo">Ganador: {partida.ganador}</div> }
                </div>
                ))}
            </div>
        </div>

        <div className="historial-container">
            <h1>Historial General</h1>

            <div className="partidas-container">
                {partidas.map((partida) => (
                <div key={partida.id} className="partida-instancia">
                    <div className="atributo">Nombre: {partida.partida}</div>
                    <div className="atributo">Rondas: {partida.ronda}</div>
                    <div className="atributo">Estado: {partida.estado}</div>
                    { partida.estado !== "En curso" && <div className="atributo">Ganador: {partida.ganador}</div> }
                </div>
                ))}
            </div>
        </div>
        </div>) : (<>
        </>)}
        </>)
};

export default HistorialPartida;
