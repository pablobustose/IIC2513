import React, { useState } from "react";
import Carta from "../common/cartas/Cartas.jsx";
import "./Instrucciones.css";
import EjemploDado from "../common/dados/EjemploDado.jsx";

export default function Instrucciones() {
  const [index, setIndex] = useState(0);
  const instrucciones = [
    {
      titulo: <h1 className="titulo-juego"> Objetivo </h1>,
      descripcion: 
      <div className="objetivo-juego">
        <p>Este es un juego de estrategia de tipo dominio de territorio y recursos, en donde pueden jugar de a 4 personas. El objetivo del juego es atacar a los demás jugadores hasta conquistar todo el territorio del mapa.</p>
      </div>,
    },
    {
      titulo: <h1 className="titulo-juego">Rondas</h1>,
      descripcion:<><p>El transcurso del juego está determinado por turnos y rondas. Los jugadores juegan las rondas en orden, es decir, parte la ronda 1 el primer jugador y una vez que termina su turno completo puede jugar el siguiente.
      </p>
      <p>
      Cada turno contempla 3 fases. La primera es REFORZAMIENTO. En esta fase el jugador deberá reforzar algún o varios territorios propios, hasta agotar la cantidad de guerreros disponibles. La segunda etapa es ATAQUE. El jugador podrá seleccionar un territorio propio con el cual desea atacar, para luego seleccionar un territorio enemigo que va a ser atacado. Dicha acción es opcional y se puede realizar tantas veces como quiera. Por último, la tercera fase es DESPLAZAMIENTO. La cual consiste en movilizar tropas desde un territorio aliado a otro que es vecino, con el fin de reforzar este último. Esta acción se puede realizar como máximo dos veces. Las reglas asociadas a cada fase se describen en Fases.
      </p>
      <p>
      Finalizadas las 3 fases se acaba el turno del jugador y pasa al siguiente jugador. Así ocurrirá el flujo sucesivamente, hasta que termine el juego (véase Fin del juego).
      </p></>   
    },
    {
      titulo: <h1 className="titulo-juego">Fase: Reforzamiento</h1>,
      descripcion: <><p>Esta fase es la primera que debe ejecutar el jugador al iniciar una ronda. En esta fase se disponen N guerreros que han de ser distribuidos por los territorios aliados. El número de guerreros y el tipo es proporcional a la cantidad de jugadores en la partida y la ronda actual. El fin de esta fase es reforzar territorios estratégicos para defenderse en los turnos enemigos o bien planificar un ataque (a ejecutar en la siguiente fase). La ejecución de la ronda ocurre seleccionando el territorio al que se desea reforzar y luego, seleccionando la cantidad de guerreros que se le quiere dar. Se pueden reforzar tantos territorios como guerreros se dispongan para ello. Una vez distribuidos todos los guerreros se podrá avanzar a la siguiente fase.
      </p></>,
    },
    {
      titulo: <h1 className="titulo-juego">Fase: Ataque</h1>,
      descripcion: <><p>En esta fase el jugador podrá seleccionar un territorio aliado con el cual desea atacar y un territorio enemigo el cual será atacado. Una vez seleccionados los territorios se deben de seleccionar los guerreros que iran a la batalla, para luego tirar dados los respectivos por parte del atacante y el defensor, los cuales dependen del tipo. El atacante tendrá tantos dados como guerreros tenga en el territorio, dejando al menos uno sin atacar y teniendo como máximo un número de 3 dados. Para el defensor es lo mismo pero el número máximo de dados es 2, sin importar que se quede uno cuidando el territorio. La función de los dados es determinar cuántos guerreros perderá el ejército atacante. Entonces la ejecución es la siguiente: se lanzan los dados por ambos bandos. Se compara el mayor valor obtenido de los dados del atacante con el mayor valor obtenido de los dados del defensor. El bando que obtenga el mejor número le resta un soldado al otro. Esto ocurrirá hasta que el territorio atacado se quede sin guerreros o, en caso de que el territorio atacante llegue a tener 1 soldado, se detiene el ataque. Cuando una de estas condiciones se cumple, entonces finaliza la batalla. El territorio que quede sin guerreros será conquistado por el territorio que haya ganado la batalla. Este jugador decidirá cuántos guerreros enviará a su nuevo territorio (de los guerreros del territorio con el que atacó), pudiendo darle tanto guerreros como K- 1, donde K es el número de guerreros del territorio dador. Se pueden realizar ataques solo a los territorios enemigos colindantes con territorios aliados. Y se pueden realizar tantos ataques como se desee. Sin embargo, solo podrán realizar ataque los territorios aliados con cantidad de guerreros mayor que 1. Para finalizar esta fase se deberá presionar un botón que lleva a la siguiente y última fase, Desplazamiento.
      </p>
      <h2>Ejemplo de combate</h2>
      <EjemploDado /></>,
    
    },
    {
      titulo: <h1 className="titulo-juego">Fase: Desplazamiento</h1>,
      descripcion: <><p>En esta fase se tendrá la opción de movilizar tropas desde un territorio aliado a otro. Solo se podrá hacer la movilización entre territorios colindantes. Se podrán mover K-1 guerreros donde K es el número de guerreros del territorio dador. Además, esta acción se ejecutará seleccionando ambos territorios y señalando la cantidad de tropas a movilizar. Solo se podrá hacer como máximo 2 veces en cada turno. Una vez realizadas las 2 movilizaciones se terminará automáticamente la fase. También habrá un botón de finalización de la fase, en caso de no querer realizar la acción más de una o ninguna vez.
      </p></>,
    },
    {
      titulo: <h1 className="titulo-juego">Mapa</h1>,
      descripcion: <><p>Se dispondrá de un mapa de juego, que posee como objetos a los territorios. Tendrá un número definido de territorios. Los territorios colindantes estarán enlazados. Solo aquellos territorios que comparten frontera tendrán conexión. Las conexiones son un requisito para movilizar guerreros y atacar territorios. Cada territorio será gobernado por un ejército (jugador). Nunca habrá territorios sin ejército, pues al iniciar el juego se distribuirán de manera aleatoria todos los territorios, asignando una cantidad aleatoria entre 1 y 4 guerreros. Esta asignación garantiza que siempre haya un ejército sobre un territorio. Pues la función atacar cumple con la propiedad de reasignar cada ejército conquistado (aquellos que quedan sin guerreros al ser atacados). Todos los jugadores tendrán la misma vista del mapa. Este además se actualizará según cada acción realizada, indicando sobre cada territorio el número de guerreros en este, y, con distintos colores, a qué ejército pertenece.
      </p></>,
    },
    {
      titulo: <h1 className="titulo-juego">Jugadores</h1>,
      descripcion: <><p>Los jugadores buscarán sobrevivir. Para ello tendrán que realizar jugadas estratégicas. En primer lugar, existen 4 tipos de ejércitos, los cuales podrán ser seleccionados antes de comenzar la partida por el usuario. Cada ejército representa una facultad de San Joaquín. No se pueden repetir. Estos son: Ingeniería, Economía, Letras y Psicología. Cada uno posee un logo identificador diferente y un color asociado. El orden de los jugadores en las rondas será determinado de manera aleatoria al comenzar la partida y se mantendrá así hasta finalizar. Tras terminar cada turno, el jugador recibirá una carta de tipo aleatoria, la cual podrá ser utilizada posteriormente, lo cual se explica en Cartas.
      </p></>,
    },
    {
      titulo: <h1 className="titulo-juego">Guerreros</h1>,
      descripcion: <><p>Existen tres tipos de soladados distintos, los cuales tendrán un comportamiento distinto al momento de combatir. Primero, existe el soldado maestro, el cual es el más poderoso de todos y al atacar puede obtener un número aleatorio entre 2 y 6. Luego, lo sigue el soldado intermedio, el cual es el más común y al atacar puede obtener un número aleatorio entre 1 y 4. Por último, se encuentra el soldado novato, el cual es el más débil de todos y al atacar puede obtener un número aleatorio entre 1 y 3. Cada ejército tendrá una cantidad de guerreros de cada tipo, los cuales se distribuirán de manera aleatoria al inicio de la partida. 
      </p></>,
    },
    {
      titulo: <h1 className="titulo-juego">Cartas</h1>,
      descripcion: <><p>Existen tres tipos de cartas bonus, las cuales afectarán de manera positiva al jugador que las utilice y serán otorgadas aleatóriamente al inicio de cada turno. Primero, se tiene a la carta de tipo Novato, la cual sirve para obtener 3 guerreros principiantes aliados. Luego se encuentra la carta tipo Mateo, la 
      cual podrá ser intercambiada por 3 guerreros intermedios. Además, se cuenta con la carta tipo Genio, que permite obtener 3 guerreros maestros.
      </p></>,
    },
    {
      titulo: <h1 className="titulo-juego">Eliminación y desertar partida</h1>,
      descripcion: <><p>Un jugador es eliminado de la partida cuando se queda sin guerreros y, en consecuencia, territorios. Al ocurrir dicha circunstancia, las cartas que poseía el jugador eliminado pasarán automáticamente hacia el jugador que ejecutó. Además, un jugador podrá abandonar la partida mediante un botón en la pantalla de juego. Si un jugador decide abandonar, todas sus cartas y territorios serán repartidos al azar como territorios de cada ejército en juego, con las mismas reglas que al crear la distribución inicial de territorios.
      </p></>,
    },
    {
      titulo: <h1 className="titulo-juego">Fin del juego</h1>,
      descripcion: <><p>El final del juego ocurre cuando solamente queda un jugador en la partida, y todos los otros hayan sido eliminados o hayan decidido desertar. En este momento, el jugador será dueño de todos los territorios. Aquí la partida ha llegado a su fin. Se desplegará un tablero con los puestos en que quedó cada jugador, según el orden en el que hayan perdido. Señalando también datos como el máximo de guerreros que tuvo el ejército y la mayor cantidad de territorios conquistados.
      </p></>,
    },
  ];

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= instrucciones.length) {
      newIndex = instrucciones.length - 1;
    }

    setIndex(newIndex);
  };

  return (
    <div className="Instrucciones">
      <h1>¿Cómo jugar?</h1>
      <div className="ins-botones">
        <button onClick={() => { updateIndex(index - 1); }}>
          <img src="../izquierda.svg" alt="" />
        </button>
        <button onClick={() => { updateIndex(index + 1); }}>
          <img src="../derecha.svg" alt="" />
        </button>
      </div>
      <div className="ins">
        <div className="inner">
          <div className="instruccion-item2">
            <Carta instruccion={instrucciones[index]} />
          </div>
        </div>
      </div>
      <button onClick={() => window.location.href = '/'}>Volver al Inicio</button>
    </div>
  );
}