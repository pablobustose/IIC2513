import React, { useState } from 'react';

const Ataque = ({ setShowSoldadosPopup, facultadSeleccionada, segundaFacultad, juego, setFacultadSeleccionada,
                setSegundaFacultad, setJson }) => {
  const [soldadosPrincipiantes, setSoldadosPrincipiantes] = useState(0);
  const [soldadosIntermedios, setSoldadosIntermedios] = useState(0);
  const [soldadosAvanzados, setSoldadosAvanzados] = useState(0);


  return (
    <div className="protector-pantalla">
      <div className="desplazamiento-popup">
        <h1 className="titulo-popup">Atacar a {segundaFacultad.nombre}</h1>
        <h3 className="pregunta-popup">Cuántos soldados quieres llevar a la guerra desde {facultadSeleccionada.nombre}</h3>
        <div className="input-popup">
          <label className='input-soldados'>Soldados Principiantes:</label>
          <input
            type="number"
            value={soldadosPrincipiantes}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setSoldadosPrincipiantes(Math.max(0, value));
            }}
          />
        </div>
        <div className="input-popup">
          <label className='input-soldados'>Soldados Intermedios:</label>
          <input
            type="number"
            value={soldadosIntermedios}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setSoldadosIntermedios(Math.max(0, value));
            }}
          />
        </div>
        <div className="input-popup">
          <label className='input-soldados'>Soldados Avanzados:</label>
          <input
            type="number"
            value={soldadosAvanzados}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setSoldadosAvanzados(Math.max(0, value));
            }}
          />
        </div>
        <h4 className="disclaimer-popup">Recuerda que solo puedes llevar a tres guerreros y {segundaFacultad.nombre} se defenderá con lo mejor que tiene.</h4>
        
        <button onClick={() => {
          setShowSoldadosPopup(false);
          setFacultadSeleccionada(null);
          setSegundaFacultad(null);
        }}>
          Cerrar
        </button>
        <button onClick={() => {
          const newSoldados = [soldadosPrincipiantes, soldadosIntermedios, soldadosAvanzados];
          setJson({player_id: parseInt(juego[1], 10), 
                  territorio_atacante_id: facultadSeleccionada.id, 
                  territorio_defensor_id: segundaFacultad.id, 
                  n_guerreros_principiantes: newSoldados[0],
                  n_guerreros_intermedios: newSoldados[1],
                  n_guerreros_avanzados: newSoldados[2]});
          console.log(newSoldados);
          setShowSoldadosPopup(false);
          setFacultadSeleccionada(null);
          setSegundaFacultad(null);
        }}>
          Seleccionar
        </button>
      </div>
    </div>
  );
};

export default Ataque;