import React, { useState } from "react";
import Dado from "./Dado";
import './EjemploDado.css';

export default function EjemploDado() {
    const [cantidad_atacante, setCantidadAtacante] = useState([0, 0, 0]); // cantidad de dados de cada tipo
    const [cantidad_defensor, setCantidadDefensor] = useState([0, 0, 0]);
    const [dados_atacante, setDadosAtacante] = useState([[], [], []]); // valor de dados de cada tipo
    const [dados_defensor, setDadosDefensor] = useState([[], [], []]);
    const [resultado, setResultado] = useState("");

    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function calcularResultado(atacante, defensor) {
        if (atacante > defensor) {
            return "Gana Atacante";
        } else {
            return "Gana Defensor";
        }
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

    const handleInputChangeDefensor = (index, value) => {
        const newInputValues = [...cantidad_defensor];
        newInputValues[index] = value < 0 ? 0 : value;
        const sum = newInputValues.reduce((acc, currentValue) => acc + currentValue, 0);
        if (sum <= 3) {
            setCantidadDefensor(newInputValues);
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

    const lanzarDefensor = () => {
        const dadosLanzados = cantidad_defensor.map((cantidad, index) => {
            return lanzarDadosPorTipo(cantidad, ["Maestro", "Intermedio", "Novato"][index]);
        });
        setDadosDefensor(dadosLanzados);
    };

    const calcularResultadoFinal = () => {
        const resultadoAtacante = Math.max(
            ...dados_atacante.flat() // Combina todos los arrays de dados en uno solo
        );
        const resultadoDefensor = Math.max(
            ...dados_defensor.flat() // Combina todos los arrays de dados en uno solo
        );
        setResultado(calcularResultado(resultadoAtacante, resultadoDefensor));
    };

    return (
        <div>
            <div className="container-dados">
                <div className="input-group">
                    <h3>Atacante</h3>
                    {cantidad_atacante.map((cantidad, index) => (
                        <div key={index} className="input-group-item">
                            <label>Guerreros {["Maestro", "Intermedio", "Novato"][index]}:</label>
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => handleInputChangeAtacante(index, parseInt(e.target.value))}
                            />
                        </div>
                    ))}
                </div>
                <div className="input-group">
                    <h3>Defensor</h3>
                    {cantidad_defensor.map((cantidad, index) => (
                        <div key={index} className="input-group-item">
                            <label>Soldados {["Maestro", "Intermedio", "Novato"][index]}:</label>
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => handleInputChangeDefensor(index, parseInt(e.target.value))}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="container-dados">
                <button onClick={lanzarAtacante}>Lanzar Atacante</button>
                <button onClick={calcularResultadoFinal}>Resultado</button>
                <button onClick={lanzarDefensor}>Lanzar Defensor</button>

            </div>
            <p id="texto">Resultado Combate: {resultado}</p>
            <div className="container-dados">
                <div className="input-group">
                    {dados_atacante.map((dadosPorTipo, index) => (
                        <div key={index}>
                            {dadosPorTipo.map((dado, subIndex) => (
                                <Dado key={subIndex} valor={dado} tipo={["Maestro", "Intermedio", "Novato"][index]} />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="input-group">
                    {dados_defensor.map((dadosPorTipo, index) => (
                        <div key={index}>
                            {dadosPorTipo.map((dado, subIndex) => (
                                <Dado key={subIndex} valor={dado} tipo={["Maestro", "Intermedio", "Novato"][index]} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <p id="texto">**Los dados de color negro son los guerreros maestros, los azules intermedio y los rojos principiantes**</p>
        </div>
    )
}