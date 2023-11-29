import './Carta.css';
import React, { useState } from 'react';

const Carta = ({ carta }) => {
  const [volteada, setVolteada] = useState(false);

  const handleMouseEnter = () => {
    setVolteada(true);
  };

  const handleMouseLeave = () => {
    setVolteada(false);
  };

  return (
    <div
      className={`carta ${volteada ? 'volteada' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cara-frontal">
        <img src={carta.imagen} alt={carta.descripcion} />
      </div>
      <div className="cara-trasera">
        <p>{carta.descripcion}</p>
      </div>
    </div>
  );
};

export default Carta;
