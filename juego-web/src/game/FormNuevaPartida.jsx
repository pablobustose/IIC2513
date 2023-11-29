import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './FormNuevaPartida.css';
import Toast from '../common/toast/Toast';

export default function FormNuevaPartida({ mostrar, handleCloseClick, setRefresh, refresh }) {
    const { token, setToken } = useContext(AuthContext);
    const { setPlayerId } = useContext(AuthContext);
    const { setGameId } = useContext(AuthContext);
    const [nombrePartida, setNombrePartida] = useState("");
    const [list, setList] = useState([]);
    

    const handleToast = (type, info) => {
        const toastProperties = {
          id: list.length + 1,
          title: info.title,
          description: info.description,
          type: type,
        }
        setList([...list, toastProperties]);
      };

    const handleNameChange = (event) => {
        setNombrePartida(event.target.value);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/pregame/newgame`, {
            game_name: nombrePartida,
            user_id: localStorage.user_id,
          }).then((response) => {
            handleToast("success", {title: "Nueva Partida", description: "Partida creada con éxito!"});

            const access_token = response.data.access_token;
            const player_id = response.data.player_id;
            const game_id = response.data.game_id

            setToken(access_token);
            setPlayerId(player_id); 
            setGameId(game_id);
            setRefresh(!refresh);

            setTimeout(() => {
                window.location.href = `/sala-espera/${game_id}`;
            }, 1250);
          }).catch((error) => {
            handleToast("error", {title: "Nueva Partida", description: error.response.data});
          })
    };

    if (!mostrar) {
        return null;
    }

    return (
        <div className="crear-partida">
            <div className="protector-pantalla">
                <div className="form-crear-partida">
                    <h1 className='titulo'>Crear Partida</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="inputs-crear-partida">
                            <div className='input-field' id='nombre-partida'>
                                <input className="inputinicio" type="text" id="nombre" placeholder="Nombre de la Partida" value={nombrePartida} onChange={handleNameChange} required/>
                            </div>
                            <div className="boton">
                                <button id='registro' type='submit'> Crear </button>
                            </div>
                        </div>
                    </form>
                    <button className="cerrar-partidas" onClick={handleCloseClick}>
                        Cerrar
                    </button>
                </div>
            </div>
            <Toast toastlist={list} position='buttom-right' setList={setList} />
        </div>
    );
}
