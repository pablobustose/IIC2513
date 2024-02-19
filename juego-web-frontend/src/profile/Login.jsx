import React, { useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';
import './Login.css'
import Toast from '../common/toast/Toast';

export default function Login () {
    const { token, setToken } = useContext(AuthContext);
    const { userId, setUserId } = useContext(AuthContext);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            mail: email,
            contrasena: password
          }).then((response) => {
            handleToast("success", {title: "Submit", description: "Submit exitoso"});
            // Recibimos el token y lo procesamos
            const access_token = response.data.access_token;
            const user_id = response.data.user_id;
            setToken(access_token);
            setUserId(user_id);
          }).catch((error) => {
            handleToast("error", {title: "Submit", description: error.response.data});
          })
    };
    
    return (
        <>
        <div className="Login">
            <div className="form-login">
                <h1 className='titulo'>Iniciar Sesión:</h1>
                <form onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input-field" id='email'>
                            <img src="../email-imagen.png" alt="email" />
                            <input className="inputinicio" type="email" id="email" placeholder="Correo" value={email} onChange={handleEmailChange} required/>
                        </div>
                        <div className="input-field" id='contrasena'>
                            <img src="../contrasena.png" alt="contrasena" />
                            <input className="inputinicio" type="password" id="contrasena" placeholder="Contraseña" value={password} onChange={handlePasswordChange} required/>
                        </div>
                        <div className="boton">
                            <button id='registro' type='submit'> Ingresar </button>
                        </div>
                    </div>
                </form>
                <div className="usuario-re">
                    <a href='/registro'>¿No tienes cuenta?</a>
                </div>
            </div>
            <Toast toastlist={list} position='buttom-right' setList={setList} />
        </div>
        <Toast toastlist={list} position='buttom-right' setList={setList} />
        </>
    )
}