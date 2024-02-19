import './SobreNosotros.css'

export default function SobreNosotros() {
    return (
        <div className='sobre-nosotros'>
            <h1>El equipo Colibries</h1>
            <section className="descripcion-equipo">
                <h2>Descripción del Equipo</h2>
                <p>Somos un equipo apasionado de estudiantes, cursando el ramo Tecnología y Aplicaciones Web, que se han unido para crear una experiencia de juego única. Cada uno de nosotros aporta habilidades y conocimientos valiosos a este proyecto.</p>
            </section>
            <section className="miembros-equipo">
                <h2>Miembros del Equipo</h2>
                <ul>
                    <li>
                        <div className='nombre-foto-integrante'>
                            <h3 className='nombre-integrante'>Martín Novoa</h3>
                            <div class="imagen-circular">
                                <img src="../foto_perfil_martin.jpg" alt="Foto Martín" />
                            </div>
                        </div>
                        <p><strong>Especialización:</strong> Major en Computación y Minor en Data Science</p>
                        <p>Martín es nuestro experto en tecnologías de la información y análisis de datos. Su pasión por la informática y su capacidad para extraer información significativa de los datos son fundamentales para el éxito de nuestro juego.</p>
                    </li>
                    <li>
                        <div className='nombre-foto-integrante'>
                            <h3 className='nombre-integrante'>Pablo Bustos</h3>
                            <div class="imagen-circular">
                                <img src="../foto_perfil_pablo.jpg" alt="Foto Martín" />
                            </div>
                        </div>
                        <p><strong>Especialización:</strong> Major en Ingeniería de Software y Minor en Ingeniería Industrial</p>
                        <p>Pablo aporta una sólida formación en ingeniería de software y un enfoque en la eficiencia industrial. Su habilidad para diseñar sistemas y procesos eficaces es esencial para la creación de una experiencia de juego fluida.</p>
                    </li>
                    <li>
                        <div className='nombre-foto-integrante'>
                            <h3 className='nombre-integrante'>Tomás Tapia</h3>
                            <div class="imagen-circular">
                                <img src="../foto_perfil_tomas.jpg" alt="Foto Martín" />
                            </div>
                        </div>
                        <p><strong>Especialización:</strong> Major en Ingeniería de Software y Minor en Ingeniería Industrial</p>
                        <p>Tomás comparte la especialización en ingeniería de software e ingeniería industrial con Pablo, lo que nos permite abordar los aspectos técnicos y operativos del proyecto de manera integral. Su capacidad para gestionar proyectos es un activo valioso.</p>
                    </li>
                </ul>
            </section>
            <section className="nuestra-mision">
                <h2>Nuestra Misión</h2>
                <p>Estamos comprometidos a ofrecer un juego web excepcional que brinde entretenimiento y diversión a nuestros usuarios. Nuestro enfoque en la tecnología y la eficiencia asegura que cada aspecto del juego esté diseñado con precisión y calidad.</p>
            </section>
            <section className="contactanos">
                <h2>Contáctanos</h2>
                <p>Si tienes alguna pregunta, sugerencia o comentario, no dudes en ponerte en contacto con nosotros en <a href="colibries.devsg@uc.cl">colibries.devs@uc.cl</a> o a través de nuestras redes sociales:</p>
                <ul>
                    <li><a href="https://www.facebook.com/tucuenta" target="_blank">Facebook</a></li>
                    <li><a href="https://twitter.com/tucuenta" target="_blank">Twitter</a></li>
                </ul>
            </section>
            <button onClick={() => window.location.href = '/'}>Volver al Inicio</button>
        </div>
    );
}