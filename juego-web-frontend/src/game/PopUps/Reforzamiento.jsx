import React, { useState } from 'react';

const Reforzamiento = ({ setShowSoldadosPopup, facultadSeleccionada, juego, handleReforzar }) => {
    
    const [soldadosPrincipiantes, setSoldadosPrincipiantes] = useState(0);
    const [soldadosIntermedios, setSoldadosIntermedios] = useState(0);
    const [soldadosAvanzados, setSoldadosAvanzados] = useState(0);
  
    return (
        <div className="protector-pantalla">
        <div className="reforzar-popup">
          <h1 className="titulo-popup"> Reforzar: {facultadSeleccionada.nombre}</h1>
          <h3 className="pregunta-popup">Cuántos soldados quieres sumar a la facultad de {facultadSeleccionada.nombre}</h3>
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
            <h4 className="disclaimer-popup">Recuerda que solo puedes reforzar tus facultades!</h4>
          
          <button onClick={() => {
            setShowSoldadosPopup(false);
          }}>
            Cerrar
          </button>
          <button onClick={() => {
            const newSoldados = [soldadosPrincipiantes, soldadosIntermedios, soldadosAvanzados];
            let diccionario = { id_jugador: parseInt(juego[1], 10), 
                                id_territorio: facultadSeleccionada.id, 
                                n_guerreros_principiantes: newSoldados[0],
                                n_guerreros_intermedios: newSoldados[1],
                                n_guerreros_avanzados: newSoldados[2]};
            handleReforzar(diccionario);
            
            setShowSoldadosPopup(false);
            setSoldadosPrincipiantes(0);
            setSoldadosIntermedios(0);
            setSoldadosAvanzados(0);
          }}>
            Reforzar
          </button>
                  
        </div>
  
       </div>
    );
  };
  
  export default Reforzamiento;