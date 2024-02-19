import React, { useState } from 'react';
import axios from 'axios';
import './Registro.css'
import Toast from '../common/toast/Toast';

export default function Registro () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [list, setList] = useState([]);
    

    const handleToast = (type, info) => {
        const toastProperties = {
          id: list.length + 1,
          title: info.title,
          description: info.description,
          type: type,
        }
        setList([...list, toastProperties]);
      };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
    
    const handleNameChange = (event) => {
        setName(event.target.value);
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, {
            nombre_usuario: name,
            mail: email,
            contrasena: password
          }).then((response) => {
            handleToast("success", {title: "Sign Up", description: "Sign Up exitoso"});
          }).catch((error) => {
            handleToast("error", {title: "Sign Up", description: error.response.data});
          })
    };

    return (
        <>
        <div className="Registro">
            <div className="form-registro">
                <h1 className='titulo'>Crear Usuario:</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className='input-field' id='nombre'>
                            <img src="../usuario-imagen.png" alt="usuario" />
                            <input className="inputinicio" type="text" id="nombre" placeholder="Nombre" value={name} onChange={handleNameChange} required/>
                        </div>
                        <div className="input-field" id='email'>
                        <img src="../email-imagen.png" alt="email" />
                            <input className="inputinicio" type="email" id="email" placeholder="Correo" value={email} onChange={handleEmailChange} required/>
                        </div>
                        <div className="input-field" id='contrasena'>
                        <img className="contrasena" src="../contrasena.png" alt="contraseña" />
                            <input className="inputinicio" type="password" id="contrasena" placeholder="Contraseña" value={password} onChange={handlePasswordChange} required/>
                        </div>
                        <div className="boton">
                            <button id='registro' type='submit'> Registro </button>
                        </div>
                    </div>
                </form>
                <div className="usuario-re">
                    <a href='/login'>¿Ya tienes cuenta?</a>
                </div>
            </div>
        </div>
        <Toast toastlist={list} position='buttom-right' setList={setList} />
        </>
    )
}