import React, { useState } from "react";
import Dado from "./Dado";
import './EjemploDado.css';

export default function EjemploDado() {
    const [cantidad_atacante, setCantidadAtacante] = useState([0, 0, 0]); // cantidad de dados de cada tipo
    const [dados_atacante, setDadosAtacante] = useState([[], [], []]); // valor de dados de cada tipo

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleInputChangeAtacante = (index, value) => {
        const newInputValues = [...cantidad_atacante];
        newInputValues[index] = value < 0 ? 0 : value;
        // Calculamos la suma de los valores actuales
        const sum = newInputValues.reduce((acc, currentValue) => acc + currentValue, 0);
        // Si la suma es mayor que 3, no permitimos que el valor cambie
        if (sum <= 3) {
            setCantidadAtacante(newInputValues);
        }
    };

    const lanzarDadosPorTipo = (cantidad, tipo) => {
        const dadosLanzados = [];
        for (let i = 0; i < cantidad; i++) {
            let valor;
            if (tipo === "Maestro") {
                valor = aleatorio(2, 6);
            } else if (tipo === "Intermedio") {
                valor = aleatorio(1, 4);
            } else if (tipo === "Novato") {
                valor = aleatorio(1, 3);
            } else {
                valor = 1; // Valor por defecto en caso de tipo desconocido
            }
            dadosLanzados.push(valor);
        }
        return dadosLanzados;
    };

    const lanzarAtacante = () => {
        const dadosLanzados = cantidad_atacante.map((cantidad, index) => {
            return lanzarDadosPorTipo(cantidad, ["Maestro", "Intermedio", "Novato"][index]);
        });
        setDadosAtacante(dadosLanzados);
    };

    return (
        <div>
            <div className="container">
                <div className="input-group">
                    {cantidad_atacante.map((cantidad, index) => (
                        <div key={index} className="input-group-item">
                            <label>Soldados {["Maestro", "Intermedio", "Novato"][index]}:</label>
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => handleInputChangeAtacante(index, parseInt(e.target.value))}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="container">
                <button onClick={lanzarAtacante}>Lanzar Dados</button>

            </div>
            <div className="container">
                <div className="input-group">
                    {dados_atacante.map((dadosPorTipo, index) => (
                        <div key={index}>
                            {dadosPorTipo.map((dado, subIndex) => (
                                <Dado key={subIndex} valor={dado} tipo={["Maestro", "Intermedio", "Novato"][index]} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}