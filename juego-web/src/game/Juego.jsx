import React from 'react';
import Board from './Board';
import Toast from '../common/toast/Toast';
import Reforzamiento from './PopUps/Reforzamiento';
import Desplazamiento from './PopUps/Desplazamiento';
import Ataque from './PopUps/Ataque';
import './Juego.css';
import {
  DADO_NEGRO_1, DADO_NEGRO_2, DADO_NEGRO_3, DADO_NEGRO_4, DADO_NEGRO_5, DADO_NEGRO_6, DADO_DEFAULT,
  DADO_AZUL_1, DADO_AZUL_2, DADO_AZUL_3, DADO_AZUL_4, DADO_AZUL_5, DADO_AZUL_6,
  DADO_VERDE_1, DADO_VERDE_2, DADO_VERDE_3, DADO_VERDE_4, DADO_VERDE_5, DADO_VERDE_6,
} from "../common/dados/rutasImagenes.js"
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
const rutas_cartas = [[DADO_VERDE_1, DADO_VERDE_2, DADO_VERDE_3, DADO_VERDE_4, DADO_VERDE_5, DADO_VERDE_6],
                      [DADO_AZUL_1, DADO_AZUL_2, DADO_AZUL_3, DADO_AZUL_4, DADO_AZUL_5, DADO_AZUL_6],
                      [DADO_NEGRO_1, DADO_NEGRO_2, DADO_NEGRO_3, DADO_NEGRO_4, DADO_NEGRO_5, DADO_NEGRO_6],
                      [DADO_DEFAULT]]


function Juego() {
  const {gameId, setGameId} = useContext(AuthContext);
  const {playerId, setPlayerId} = useContext(AuthContext);
  const dimensiones = [17, 23];
  const [fase, setFase] = useState(0);
  const [facultadSeleccionada, setFacultadSeleccionada] = useState(null);
  const [soldadosJugador, setSoldadosJugador] = useState([0, 0, 0]);
  const [showSoldadosPopup, setShowSoldadosPopup] = useState(false);
  const [segundaFacultad, setSegundaFacultad] = useState(null);
  const [json, setJson] = useState(null);
  const [juego, setJuego] = useState([null, null, null, null]);
  const [colorJugador, setColorJugador] = useState(null);
  const [cartasJugador, setCartasJugador] = useState([]);
  const [dadosAtacante, setDadosAtacante] = useState([DADO_DEFAULT, DADO_DEFAULT, DADO_DEFAULT]);
  const [dadosDefensor, setDadosDefensor] = useState([DADO_DEFAULT, DADO_DEFAULT, DADO_DEFAULT]);
  const [index, setIndex] = useState(0);
  const [infoFacultad, setInfoFacultad] = useState(null);
  const [list, setList] = useState([]);
  const [activarAnimacion, setActivarAnimacion] = useState(false);


  const handleToast = async (type, info) => {
    const toastProperties = {
      id: list.length + 1,
      title: info.title,
      description: info.description,
      type: type,
    }
    setList([...list, toastProperties]);
  };

  useEffect(() => {
    const actualizarDatosJuego = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/flujo/${gameId}/${playerId}`);
            setJuego([gameId, playerId, response.data.ronda, response.data.turno]);
            setFase(response.data.nombre_fase);
            setColorJugador(response.data.color);
            setSoldadosJugador([response.data.guerreros_principiantes, response.data.guerreros_intermedios, response.data.guerreros_avanzados]);
            setCartasJugador(response.data.cartas);
            
            if (response.data.id_jugador_ganador) {
              setPlayerId(null);
              window.location.href = "/postgame/resumen";
            }

            if (response.data.nombre_fase === "Ataque") {
                if (response.data.ataques_ronda === 0) {
                    setDadosAtacante([DADO_DEFAULT, DADO_DEFAULT, DADO_DEFAULT]);
                    setDadosDefensor([DADO_DEFAULT, DADO_DEFAULT, DADO_DEFAULT]);
                } else {
                    const listaAtacante = response.data.dados_atacante;
                    let lista = [];
                    let segundaPos = 0;
                    for (let i = 0; i < listaAtacante.length; i++) {
            
                        if (listaAtacante[i][0] === -1) {
                            segundaPos = 1;
                        } else {
                          segundaPos = listaAtacante[i][0];
                        }
                        lista.push(rutas_cartas[listaAtacante[i][1]][segundaPos - 1]);
            
                    }
                    setDadosAtacante(lista);
                    const listaDefensor = response.data.dados_defensor;
                    lista = [];
                    for (let i = 0; i < listaDefensor.length; i++) {
                        if (listaDefensor[i][0] === -1) {
                            segundaPos = 1;
                        } else {
                          segundaPos = listaDefensor[i][0];
                        }
                        lista.push(rutas_cartas[listaDefensor[i][1]][segundaPos - 1]);
                    }
                    setDadosDefensor(lista);
                }
            } else {
                setDadosAtacante([DADO_DEFAULT, DADO_DEFAULT, DADO_DEFAULT]);
                setDadosDefensor([DADO_DEFAULT, DADO_DEFAULT, DADO_DEFAULT]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    actualizarDatosJuego();
    const intervalId = setInterval(actualizarDatosJuego, 1000);
    return () => clearInterval(intervalId);
  }, [fase, gameId, playerId]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setActivarAnimacion(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [activarAnimacion]);


  const cartas = {
    "Carta principiante": "../principiante.png",
    "Carta intermedio": "../intermedio.png",
    "Carta avanzado": "../avanzado.png",
  }

  const actualizarInfoFacultad = (info) => {
    setInfoFacultad(info);
  }


  const actualizarFacultadSeleccionada = (nombreFacultad) => {
    if (fase === "Desplazamiento" || fase === "Ataque"){
      if (facultadSeleccionada === null) {
        setFacultadSeleccionada(nombreFacultad);
      } else if (segundaFacultad === null && nombreFacultad !== null) {
        setSegundaFacultad(nombreFacultad);
      }
      if ((facultadSeleccionada !== null || segundaFacultad !== null)) {
        setShowSoldadosPopup(true);
    }} else {
      setFacultadSeleccionada(nombreFacultad);
      setShowSoldadosPopup(true);
    }
  };

  const updateIndex = (newIndex) => {
    if (newIndex < cartasJugador.length && newIndex >= 0) {
      setActivarAnimacion(true);
    }
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= cartasJugador.length) {
      newIndex = cartasJugador.length - 1;
    }
    setIndex(newIndex);
  };

  const handleAtaque = () => {
    console.log("Atacando");
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/game/attack/${gameId}`, json)
      .then((response) => {
        handleToast("success", {title: "Ataque", description: `Ataque realizado, ${response.data} ha ganado`});
      })
      .catch((error) => {
        console.log(error);
        handleToast("error", {title: "Ataque", description: error.response.data});
      });
  }

  const handleFinalizarAccion = async (dict) => {
    console.log(dict);
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/game/handleTurno/${gameId}`, dict)
      .then((response) => {
        console.log(response.data);
        handleToast("success", {title: "Finalizar Acción", description: "Acción finalizada exitosamente"});
      })
      .catch((error) => {
        console.log(error);
        handleToast("error", {title: "Finalizar Acción", description: error.response.data});
      });
  }

  const handleReforzar = async (dict) => {
    console.log(dict);
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/game/reforzamiento/${gameId}`, dict)
      .then((response) => {
        console.log(response.data);
        handleToast("success", {title: "Reforzamiento", description: "Reforzamiento exitoso"});
      })
      .catch((error) => {
        console.log(error);
        handleToast("error", {title: "Reforzamiento", description: error.response.data});
      });
    console.log("Reforzando");
    console.log(dict);
  }

  const handleDesplazar = async (dict) => {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/game/desplazamiento/${gameId}`, dict)
      .then((response) => {
        handleToast("success", {title: "Desplazamiento", description: "Desplazamiento exitoso"});
      })
      .catch((error) => {
        handleToast("error", {title: "Desplazamiento", description: error.response.data});
      });
    setFacultadSeleccionada(null);
    setSegundaFacultad(null);
  }

  const handleUsarCarta = async (dict) => {
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/game/usar_carta/${gameId}`, dict)
      .then((response) => {
        updateIndex(index - 1);
        handleToast("success", {title: "Carta", description: "Carta usada exitosamente"});
      })
      .catch((error) => {
        handleToast("error", {title: "Carta", description: error.response.data});
      });
  }
  
  return (
    <>
    <div className='fondo'>
      <div className="indicadores">
        <p className="soladados">Principiantes: {soldadosJugador[0] >= 0 ? soldadosJugador[0] : 0}</p>
        <p className="soladados">Intermedios: {soldadosJugador[1] >= 0 ? soldadosJugador[1]: 0}</p>
        <p className="soladados">Avanzados: {soldadosJugador[2] >= 0 ? soldadosJugador[2] : 0}</p>
        <p className="fase">Fase: {fase}</p>
        <p className="color">Color: {colorJugador}</p>
        <p className="ronda">Ronda: {juego[2]}</p>
        <p className="turno">Turno: {juego[3]}</p>
      </div>
      <div className='indicadores'>
        <p className="facultad">Facultad: {infoFacultad !== null ? infoFacultad.nombre : ""}</p>
        <p className="fase">Dueño: {infoFacultad !== null ? infoFacultad.dueno : ""}</p>
        <p className="soladados">Guerreros Principiantes: {infoFacultad !== null ? infoFacultad.guerrero_principiante : ""}</p>
        <p className="color">Guerreros Intermedio: {infoFacultad !== null ? infoFacultad.guerrero_intermedio : ""}</p>
        <p className="ronda">Guerreros Avanzados: {infoFacultad !== null ? infoFacultad.guerrero_avanzado : ""}</p>
      </div>
      <div className='tablero-panel'>
        <div className="tablero">
          <Board filas={dimensiones[0]} columnas={dimensiones[1]} actualizarFacultadSeleccionada={actualizarFacultadSeleccionada} 
          actualizarInfoFacultad = {actualizarInfoFacultad} gameId = {gameId}/>
        </div>
        <div className="panel">
          <p className="titulo-panel">Acciones</p>
          <div className="botones">
            <div className="boton-fase">
              <p className="boton" onClick={() => {handleFinalizarAccion({player_id: parseInt(playerId, 10)}); setFacultadSeleccionada(null); setSegundaFacultad(null)}}>Finalizar Acción</p>
              <p className="boton" onClick={() => handleUsarCarta({
                player_id: parseInt(playerId, 10),
                carta_tipo: cartasJugador[index]
                })}>
                  Utilizar carta
                  </p>
            </div>
            <div className="boton-fase">
              <p className="boton" onClick={() => handleAtaque()}>Atacar</p>
            </div>
          </div>
          <div className="dados-juego">
            <img className='dado-juego' src="../letraA.png" alt="letra Atacante" />
            <img className='dado-juego' src={dadosAtacante[0]} alt="Dado 1" />
            <img className='dado-juego' src={dadosAtacante[1]} alt="Dado 2" />
            <img className='dado-juego' src={dadosAtacante[2]}  alt="Dado 3" />
          </div>
          <div className="dados-juego">
            <img className='dado-juego' src="../letraD.png" alt="letra Atacante" />
            <img className='dado-juego' src={dadosDefensor[0]} alt="Dado 4" />
            <img className='dado-juego' src={dadosDefensor[1]} alt="Dado 5" />
            <img className='dado-juego' src={dadosDefensor[2]} alt="Dado 6" />
          </div>
          <div className="panel-cartas">
          <button onClick={() => { updateIndex(index - 1);}} className='boton-carta'>
          <img className='boton-carta' src="../izquierda.svg" alt="" />
          </button>
            <div className="cartas-juego">
              {cartasJugador.length > 0 ? (
                <img
                  src={cartas[cartasJugador[index]]}
                  alt="carta"
                  className={`carta-juego ${activarAnimacion ? "activar-animacion" : ""}`}
                />
              ) : (
                <img src="../cartavacia.png" alt="carta" className="carta-juego" />
              )}
            </div>
            <button className='boton-carta' onClick={() => { updateIndex(index + 1); }}>
              <img src="../derecha.svg" alt="" className='boton-carta'/>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Toast toastlist={list} position='buttom-right' setList={setList} />
    {(showSoldadosPopup && fase === "Reforzamiento" && facultadSeleccionada !== null) && (
     <Reforzamiento setShowSoldadosPopup = {setShowSoldadosPopup} facultadSeleccionada = {facultadSeleccionada}
     juego = {juego} handleReforzar = {handleReforzar}/> )
    }
    {(showSoldadosPopup && segundaFacultad !== null && fase === "Desplazamiento") && (
      <Desplazamiento setShowSoldadosPopup={setShowSoldadosPopup} facultadSeleccionada={facultadSeleccionada}
      segundaFacultad={segundaFacultad} juego={juego} handleDesplazar={handleDesplazar} setFacultadSeleccionada={setFacultadSeleccionada}
      setSegundaFacultad={setSegundaFacultad}
    />
    )}
    {(showSoldadosPopup && segundaFacultad !== null && fase === "Ataque") && (
      <Ataque setShowSoldadosPopup={setShowSoldadosPopup} facultadSeleccionada={facultadSeleccionada} segundaFacultad={segundaFacultad} 
      juego={juego} setFacultadSeleccionada={setFacultadSeleccionada} setSegundaFacultad={setSegundaFacultad} setJson={setJson} />
    )}
    </>
  );
}

export default Juego;
