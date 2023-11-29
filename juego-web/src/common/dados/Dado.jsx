import React from 'react';
import './Dado.css';

export default function Dado(props) {
    if (props.tipo === "Maestro") {
        if (props.valor === 1) {
            return (<div className="maestro_cara_1"></div>)
        } else if (props.valor === 2) {
            return (<div className="maestro_cara_2"></div>)
        } else if (props.valor === 3) {
            return (<div className="maestro_cara_3"></div>)
        } else if (props.valor === 4) { 
            return (<div className="maestro_cara_4"></div>)
        } else if (props.valor === 5) { 
            return (<div className="maestro_cara_5"></div>)
        } else if (props.valor === 6) { 
            return (<div className="maestro_cara_6"></div>)
        }
    } else if (props.tipo === "Intermedio") {
        if (props.valor === 1) {
            return (<div className="intermedio_cara_1"></div>)
        } else if (props.valor === 2) {
            return (<div className="intermedio_cara_2"></div>)
        } else if (props.valor === 3) {
            return (<div className="intermedio_cara_3"></div>)
        } else if (props.valor === 4) { 
            return (<div className="intermedio_cara_4"></div>)
        }
    } else if (props.tipo === "Novato") {
        if (props.valor === 1) {
            return (<div className="novato_cara_1"></div>)
        } else if (props.valor === 2) {
            return (<div className="novato_cara_2"></div>)
        } else if (props.valor === 3) {
            return (<div className="novato_cara_3"></div>)
        }
    }
}