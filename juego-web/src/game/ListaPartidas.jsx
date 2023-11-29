import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './ListaPartidas.css';
import Toast from '../common/toast/Toast';

export default function ListaPartidas({ mostrar, handleCloseClick, refresh, setRefresh }) {
    const { token, setToken } = useContext(AuthContext);
    const { userId } = useContext(AuthContext);
    const { gameId, setGameId } = useContext(AuthContext);
    const { playerId, setPlayerId } = useContext(AuthContext);
    const [partidas, setPartidas] = useState([]);
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

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/pregame/getgames`)
            .then((response) => {
                setPartidas(response.data);
            })
            .catch((error) => {
            });
    }, [refresh]);

    const handleUnirseClick = async (event, game_id) => {
        event.preventDefault();
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/pregame/joingame`, {
            user_id: userId,
            game_id: game_id
          }).then((response) => {
                handleToast("success", {title: "Unirse a Partida", description: "Te has unido a la partida!"});

                const access_token = response.data.access_token;
                const player_id = response.data.player_id;

                setToken(access_token);
                setPlayerId(player_id)
                setGameId(game_id)
                setRefresh(!refresh);

                setTimeout(() => {
                    window.location.href = `/sala-espera/${game_id}`;
                }, 1250);
            })
            .catch((error) => {
                handleToast("error", {title: "Unirse a Partida", description: error.response.data});
            });

    };

    if (!mostrar) {
        return null;
    }

    return (
        <div className="lista-partidas">
            <div className="protector-pantalla">
                <div className="menu-partidas">
                    <h1>Partidas:</h1>
                    <div className="partidas">
                        {partidas.length > 0 ? 
                        (partidas.map((partida) => (
                            <div className="partida" key={partida.id}>
                                <h3>{partida.nombre}</h3>
                                <h3>{partida.n_jugadores} / 4</h3>
                                <button className='escoger-partida' onClick={(event) => handleUnirseClick(event, partida.id)}>
                                    Unirse
                                </button>
                            </div>
                        ))) : 
                        (<div className="no-partida">
                            <h2>No se encontraron partidas registradas</h2>
                        </div> )}
                    </div>
                    <button className="cerrar-partidas" onClick={handleCloseClick}>
                        Cerrar
                    </button>
                </div>
            </div>
            <Toast toastlist={list} position='buttom-right' setList={setList} />
        </div>
    );
}