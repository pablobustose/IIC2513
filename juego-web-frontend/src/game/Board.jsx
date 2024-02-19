import React, { useState, useEffect } from 'react';
import './Board.css';
import axios from 'axios';

function Board(props) {
  const { filas, columnas, actualizarFacultadSeleccionada, actualizarInfoFacultad, gameId } = props;

  const generarTablero = (filas, columnas) => {
    const board = [];
    for (let i = 0; i < filas; i++) {
      const fila = [];
      for (let j = 0; j < columnas; j++) {
        fila.push(`${i}${j}`);
      }
      board.push(fila);
    }
    return board;
  };

  const coloresIniciales = Array.from({ length: filas }, () => Array(columnas).fill('black'));

  const [board] = useState(generarTablero(filas, columnas));
  const [facultades, setFacultades] = useState({});
  const [colorCelda, setColorCelda] = useState(coloresIniciales);
  const [destacarFacultad, setDestacarFacultad] = useState(null);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/flujo/map/${parseInt(gameId, 10)}`);
        setFacultades(response.data);
      } catch (error) {
        console.error("Error al cargar las facultades:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const actualizarColorCelda = Array.from({ length: filas }, () => Array(columnas).fill('black'));

    for (const key in facultades) {
      if (facultades.hasOwnProperty(key)) {
        const facultad = facultades[key];
        const { celdas, color } = facultad;

        celdas.forEach(([fila, columna]) => {
          actualizarColorCelda[fila][columna] = color;
        });
      }
    }

    setColorCelda(actualizarColorCelda);
  }, [facultades, filas, columnas]);

  const handleCeldaClick = (filaIndex, columnaIndex) => {
    const facultad = obtenerFacultad(filaIndex, columnaIndex);

    if (facultad) {
      actualizarFacultadSeleccionada(facultad);
    } else {
      actualizarFacultadSeleccionada(null);
    }
  };

  const obtenerFacultad = (fila, columna) => {
    for (const key in facultades) {
      if (facultades.hasOwnProperty(key)) {
        const facultad = facultades[key];
        const { celdas } = facultad;

        for (const [facultadFila, facultadColumna] of celdas) {
          if (fila === facultadFila && columna === facultadColumna) {
            return facultad;
          }
        }
      }
    }

    return null;
  };

  return (
    <div className="board">
      {board.map((fila, filaIndex) => (
        <div key={filaIndex} className="fila">
          {fila.map((columna, columnaIndex) => {
            const facultad = obtenerFacultad(filaIndex, columnaIndex);

            return (
              <div
                key={columnaIndex}
                className={`celda ${
                  colorCelda[filaIndex][columnaIndex] || 'black'
                } ${colorCelda[filaIndex][columnaIndex] === destacarFacultad ? 'destacar' : ''}`}
                onMouseEnter={() => {
                  const facultadColor = colorCelda[filaIndex][columnaIndex];
                  if (facultadColor && facultadColor !== 'black') {
                    setDestacarFacultad(facultadColor);
                    actualizarInfoFacultad(facultad);
                  }
                }}
                onMouseLeave={() => {
                  setDestacarFacultad(null);
                  actualizarInfoFacultad(null);
                }}
                onClick={() => handleCeldaClick(filaIndex, columnaIndex)}
              >
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;


