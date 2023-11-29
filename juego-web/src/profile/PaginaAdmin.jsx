import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './PaginaAdmin.css';

const PaginaAdmin = () => {
    const { token } = useContext(AuthContext);
    const [status, setStatus] = useState(null);
    
    const [usuarios, setUsuarios] = useState([]);
    const [partidas, setPartidas] = useState([]);
    const [jugadores, setJugadores] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protectedadmin`,
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

    const fetchUsuarios = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/users`);
        setUsuarios(response.data);
        } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        }
    };

    const fetchPartidas = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/games`);
        setPartidas(response.data);
        } catch (error) {
        console.error('Error al obtener la lista de partidas:', error);
        }
    };

    const fetchJugadores = async () => {
        try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/players`);
        setJugadores(response.data);
        } catch (error) {
        console.error('Error al obtener la lista de jugadores:', error);
        }
    };
    
  useEffect(() => {
      fetchUsuarios();
      fetchPartidas();
      fetchJugadores();
    }, []);

    const handleEliminar = async (tipo, id) => {
        try {
            switch (tipo) {
                case 'usuarios':
                    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/deleteuser`, { user_id: id });
                    break;
                case 'partidas':
                    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/deletegame`, { game_id: id });
                    break;
                case 'jugadores':
                    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/deleteplayer`, { player_id: id });
                    break;
                default:
                    console.error('Tipo no reconocido:', tipo);
                    break;
            }
    
            // Después de eliminar, vuelve a cargar los datos para reflejar los cambios
            fetchUsuarios();
            fetchPartidas();
            fetchJugadores();
            } catch (error) {
            console.error('Error al eliminar:', error);
            }
      };

  return (
    <>
    {status < 300 ? (
    <div className="pagina-admin-container">
      <h1 className="titulo">Bienvenido, Administrad@r!</h1>

        <div className="seccion">
            <h2>Usuarios</h2>
            <div className="instancia-container" id='1'>
            {usuarios.length > 0 ? 
            (usuarios.map((usuario) => (
                <div className="instancia" key={usuario.id}>
                    <div className="atributos-instancia">
                        <div className="att"> <p>Id: {usuario.id}</p> </div>
                        <div className="att"> <p>Nombre: {usuario.nombre_usuario}</p> </div>
                        <div className="att"> <p>Mail: {usuario.mail}</p> </div>
                    </div>
                    <button className="eliminar-btn" onClick={() => handleEliminar('usuarios', usuario.id)}>Eliminar</button>
                </div>))) : 
                (   <div className="instancia">
                <div className="atributos-instancia">
                    <h2>No se encontraron Usuarios registrados</h2>
                </div>
            </div> ) }
            </div>
        </div>

        <div className="seccion">
            <h2>Partidas</h2>
            <div className="instancia-container" id='2'>
            {partidas.length > 0 ? 
            (partidas.map((partida) => (
                <div className="instancia" key={partida.id}>
                    <div className="atributos-instancia">
                    <div className="att2"> <p>Id: {partida.id}</p> </div>
                    <div className="att2"> <p>Nombre: {partida.nombre}</p> </div>
                    </div>
                    <button className="eliminar-btn" onClick={() => handleEliminar('partidas', partida.id)}>Eliminar</button>
                </div>))) : 
                (   <div className="instancia">
                <div className="atributos-instancia">
                    <h2>No se encontraron partidas registrados</h2>
                </div>
            </div> ) }
            </div>
        </div>

      <div className="seccion">
        <h2>Jugadores</h2>
        <div className="instancia-container" id='3'>
          {jugadores.length > 0 ? 
          (jugadores.map((jugador) => (
            <div className="instancia" key={jugador.id}>
                <div className="atributos-instancia">
                    <div className="att"> <p>Id: {jugador.player_id}</p> </div>
                    <div className="att"> <p>Usuario: {jugador.nombre_usuario}</p> </div>
                    <div className="att"> <p>Partida: {jugador.nombre_partida}</p> </div>
                </div>
                <button className="eliminar-btn" onClick={() => handleEliminar('jugadores', jugador.player_id)}>Eliminar</button>
            </div>))) : 
            (<div className="instancia">
                <div className="atributos-instancia">
                    <h2>No se encontraron jugadores registrados</h2>
                </div>
            </div> ) }
        </div>
      </div>
    </div>) : (
                <div className="mensaje-error">
                    <h1><a href="/login" className='link-login'>Debes ser Administrador para acceder a esta página.</a></h1>
                </div>
            )}
    </>
  );
}

export default PaginaAdmin;