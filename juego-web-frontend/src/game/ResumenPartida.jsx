import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './ResumenPartida.css';

const ResumenPartida = () => {
    const { token, setToken } = useContext(AuthContext);
    const { gameId } = useContext(AuthContext);
    const [status, setStatus] = useState(null);
    const [statusId, setStatusId] = useState(null);
    const [partidaInfo, setPartidaInfo] = useState({});


    const handleVolverAlInicio = async () => {;
      try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/gettoken`, {
              access_token: token
          });
          setToken(response.data.access_token);
          window.location.href = '/'; // Redirige al inicio
      } catch (error) {
          console.error('Error al volver al inicio:', error);
      }
  };

    useEffect(() => { // Verificar que tenga scope "partidaID"
      axios({
          method: 'get',
          url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protectedpartidaid/${gameId}`,
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
          .then(response => {
            setStatusId(response.status);
          })
          .catch(error => {
            setStatusId(error.response.status);
          });
  }, []);

  useEffect(() => { // Request de los datos de la partida
    const fetchPartidaInfo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/postgame/${gameId}`);
        setPartidaInfo(response.data);
        setStatus(response.status);
      } catch (error) {
        setStatus(error.response.status);
      }
    };

    fetchPartidaInfo();
  }, []);

  return (
    <>
      {status < 300 && statusId < 300 ? (
        <div className="resumen-container">
          <div className="partida-info">
            <h2 className="titulo-resumen">Resumen de la Partida</h2>
            <div className="info-partida">
              <h3>Nombre de la Partida: {partidaInfo.nombre_partida}</h3>
              <h3>Cantidad de Rondas: {partidaInfo.rondas}</h3>
              <h1>Ganador: {partidaInfo.ganador}</h1>
            </div>
            <div className="botones">
              <button className="volver-btn" onClick={handleVolverAlInicio}>
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      ) : statusId >= 300 ? (
        <div className="mensaje-error">
          <h1><a href="/login" className='link-login'>Debes pertenecer a la partida y esta debe estar finalizada.</a></h1>
        </div>
      ) : (
        <div className="mensaje-error">
          <h1>Error {status}: Hubo un problema al obtener la información de la partida.</h1>
        </div>
      )}
    </>
  );
};

export default ResumenPartida;