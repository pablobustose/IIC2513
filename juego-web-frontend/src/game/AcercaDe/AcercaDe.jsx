import './AcercaDe.css'; 
import Carta from './Carta';

const cartas = [
    {
        id: 1,
        imagen: "../principiante.png",
        descripcion: 'Esta es una carta de tipo "Principiante". Al utilizar esta carta, se podrá canjear por 3 guerreros principiantes. ',
    },
    {
        id: 2,
        imagen: "../intermedio.png",
        descripcion: 'Esta es una carta de tipo "Intermedio". Al utilizar esta carta, se podrá canjear por 2 guerreros intermedios.',
    },
    {
        id: 3,
        imagen: "../avanzado.png",
        descripcion: 'Esta es una carta de tipo "Avanzado". Al utilizar esta carta, se podrá canjear por 1 guerrero avanzado.',
    },
  ];

function AcercaDe() {
  return (
    <div className="acerca-de">
        <h1>Acerca De Coliquin</h1>
        {/* <div className='grid-container-1'> */}
            <section className='descripcion'>
                <h2>Objetivo</h2>
                <p>Este es un juego de estrategia de dominio de territorio (facultades), diseñado para 3 a 4 jugadores. El objetivo principal es conquistar todas las facultades de San Joaquín, eliminando a los otros jugadores. Para esto, cada jugador cuenta con los alumnos de su ejercito.</p>
            </section>
            <section className='rondas'>
                <h2>Rondas</h2>
                <p>El juego se desarrolla en rondas y turnos. Los jugadores juegan por turnos, comenzando con el primer jugador en la ronda 1 y siguiendo en orden. Cada turno consta de 3 fases: Reforzamiento, Ataque y Desplazamiento.</p>
            </section>
            <section className='mapa'>
                <h2>Mapa</h2>
                <p>El juego se desarrolla en un mapa de territorios con conexiones entre ellos. Cada facultad tiene un número de alumnos, quienes protegen la facultad y a su vez pueden atacar una facultad enemiga. El mapa se actualiza en tiempo real.</p>
                <p>Los territorios del mapa son los siguientes:
                    <ul>
                        <li>Facultad de Ingeniería</li>
                        <li>Facultad de Economía</li>
                        <li>Facultad de Odontología</li>
                        <li>Facultad de Humanidades</li>
                        <li>Facultad de Letras</li>
                        <li>Facultad de Física</li>
                        <li>Facultad de Matemática</li>
                        <li>Facultad de Psicología</li>
                        <li>Facultad de Deportes</li>
                        <li>Facultad de Agronomía</li>
                        <li>Facultad de College</li>
                    </ul>
                </p>
            </section>
            <section className='ejercitos'>
                <h2>Ejercitos</h2>
                <div className='contenedor-ejercitos'>
                    <p>Los Ejercitos disponibles son:
                        <ul>
                            <li>Ejército de Cisnes</li>
                            <li>Ejército Águilas</li>
                            <li>Ejército de Flamencos</li>
                            <li>Ejército de Golondrinas</li>
                        </ul>
                    </p>
                </div>
            </section>
            <section className='cartas'>
            <h2>Cartas</h2>
            <p>Existen cartas de bonificación que los jugadores pueden usar para obtener refuerzos, las cuales se adquieren aleatoriamente al principio de cada turno.</p>
            <div className='grilla'>
                {cartas.map((carta) => (
                    <Carta key={carta.id} carta={carta} />
                ))}
            </div>
            </section>
        
        <button onClick={() => window.location.href = '/'}>Volver al Inicio</button>
        </div>
    );
}

export default AcercaDe;
