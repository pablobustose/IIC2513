import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import './SalaEspera.css';


export default function SalaEspera() {
    const { token, setToken } = useContext(AuthContext);
    const { playerId, setPlayerId } = useContext(AuthContext);
    const { gameId, setGameId } = useContext(AuthContext);
    const [status, setStatus] = useState(null);
    const [players, setPlayers] = useState([]);
    const [game, setGame] = useState([]);
    const [startGame, setStartGame] = useState(false);

    useEffect(() => {
        console.log(token);
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/scope-example/protectedpartida`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setStatus(response.status);
                setGameId(response.data.partidaId);
            })
            .catch(error => {
                setStatus(error.response.status);
            });
    }, []);
    
    // useEffect(() => {
    //     // console.log(gameId);
    //     // console.log(status);
    //     console.log(game);
    // }, [game]);

    

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/pregame/getgame/${gameId}`)
            .then((response) => {
                setGame(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const actualizarJugadores = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/pregame/getplayers/${gameId}`);
                setPlayers(response.data.jugadores);
                if (response.data.iniciada) {
                    window.location.href = `/juego/${gameId}`;
                }
                }
            catch (error) {
                console.log(error);
            };
        };
        actualizarJugadores();
        const intervalId = setInterval(actualizarJugadores, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleAbandonar = () => {
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/pregame/leavegame`, {
            player_id: playerId,
            game_id: gameId
            }).then((response) => {
                const access_token = response.data.access_token;

                setToken(access_token);
                setPlayerId(null);
                setGameId(null);

                window.location.href = '/menu-partidas';
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleComenzar = () => {
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/pregame/startgame`, {
            game_id: gameId,
            player_id: playerId
            }).then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        
    };


    return (
        <>
            {status < 300 ? (
            <div className="container-menu-sala-espera">
                <div className="sala-espera">
                    <h1 className="titulo">Tu partida: {game.nombre}</h1>
                    <h2 className="subtitulo-menu">Espera a que el administrador inicie la partida</h2>
                    <div className="players">
                        {players.map((player) => (
                            <div className={`player ${player.rol === 1 ? 'admin-player' : ''}`} key={player.id}>
                                <div className="player-attribute">
                                    <h3>{player.Usuario.nombre_usuario}</h3>
                                </div>
                                <div className="player-attribute">
                                    <h3>{player.nombre_facultad}</h3>
                                </div>
                                <div className={`player-attribute ${player.color.toLowerCase()}-player`} >
                                    <h3>{player.color}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="botones-sala-espera">
                    <button className='abandonar-partida' onClick={handleAbandonar}>
                            Abandonar Partida
                    </button>
                    <button className='comenzar-partida' onClick={handleComenzar}>
                            Comenzar Partida
                    </button>
                </div>
            </div>
            ) : (
                <div className="mensaje-error">
                    <h1><a href="/login" className='link-login'>Debes estar logeado para iniciar una partida.</a></h1>
                </div>
            )}
        </>
    );
}