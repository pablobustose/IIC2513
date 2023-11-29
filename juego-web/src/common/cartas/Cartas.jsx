import React from 'react'
import './Cartas.css'

export default function Carta ({instruccion}) {
    return (
        <div className="instruccion-item">
            <div className="instruccion-titulo">
                {instruccion.titulo}
            </div>
            <div className="instruccion-descripcion">
                {instruccion.descripcion}
            </div>
        </div>
    )
}