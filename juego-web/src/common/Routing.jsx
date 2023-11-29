import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SobreNosotros from '../game/SobreNosotros'
import AcercaDe from '../game/AcercaDe/AcercaDe';
import Registro from '../profile/Registro';
import Login from '../profile/Login';
import Instrucciones from '../game/Instrucciones';
import Juego from '../game/Juego';
import LandingPage from '../game/LandingPage';
import UserCheck from '../protected/UserCheck';
import SalaEspera from '../game/SalaEspera';
import CrearPartida from '../game/CrearPartida';
import ResumenPartida from '../game/ResumenPartida';
import PaginaAdmin from '../profile/PaginaAdmin';



function Routing() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/instrucciones" element={<Instrucciones />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/acerca-de" element={<AcercaDe />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/login" element={<Login />} />
                <Route path='/juego/:game_id' element={<Juego />} />
                <Route path='/usercheck' element={<UserCheck />} />
                <Route path="/sala-espera/:game_id" element={<SalaEspera />} />
                <Route path="/menu-partidas" element={<CrearPartida />} />
                <Route path="/postgame/resumen" element={<ResumenPartida />} />
                <Route path="/postgame/historial" element={<ResumenPartida />} />
                <Route path="/admin" element={<PaginaAdmin />} />
                <Route path="/resumen/:game_id" element={<ResumenPartida />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

export default Routing 