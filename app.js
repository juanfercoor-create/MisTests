let preguntas = [];
let preguntasEspecifico = [];
let examen = [];
let tipoSeleccionado = "comun";
let tipoRepasoSeleccionado = "comun";

let numeroPreguntas = 10;
let preguntaActual = 0;
let aciertos = 0;

let respuestaSeleccionada = null;

let resultadosExamen = [];
let esRepasoFallos = false;
let fallosPendientes = JSON.parse(
    localStorage.getItem("fallosPendientes")
) || [];
let historialResultados = JSON.parse(
    localStorage.getItem("historialResultados")
) || [];


// ==========================================
// VARIABLES DEL SIMULACRO
// ==========================================

let simulacro = [];

let preguntaActualSimulacro = 0;

let respuestasSimulacro = [];

let tiempoSimulacro = 90 * 60;

let temporizadorSimulacro = null;

let simulacroActivo = false;
let indiceRevisionSimulacro = 0;
let enRevisionSimulacro = false;
let preguntasPendientesSimulacro = [];
let correccionSimulacro = [];





const inicio =
    document.getElementById("inicio");
const volverInicioExamen =
    document.getElementById("volverInicioExamen");

const examenPantalla =
    document.getElementById("examen");

const resultadoPantalla =
    document.getElementById("resultado");

const correccionPantalla =
    document.getElementById("correccionPantalla");

const progreso =
    document.getElementById("progreso");

const preguntaTexto =
    document.getElementById("pregunta");

const respuestasDiv =
    document.getElementById("respuestas");

const siguiente =
    document.getElementById("siguiente");

const resultadoTexto =
    document.getElementById("resultadoTexto");

const listaCorreccion =
    document.getElementById("listaCorreccion");
const historialPantalla =
    document.getElementById("historialPantalla");

const listaHistorial =
    document.getElementById("listaHistorial");

const verHistorial =
    document.getElementById("verHistorial");
const verEstadisticas =
    document.getElementById("verEstadisticas");

const estadisticasPantalla =
    document.getElementById("estadisticasPantalla");

const volverInicioEstadisticas =
    document.getElementById("volverInicioEstadisticas");
const borrarTodosFallos =
    document.getElementById("borrarTodosFallos");

const repasarFallos =
    document.getElementById("repasarFallos");
const simulacros =
    document.getElementById("simulacros");

const simulacroPantalla =
    document.getElementById("simulacroPantalla");

const volverInicioSimulacro =
    document.getElementById("volverInicioSimulacro");

const comenzarSimulacro =
    document.getElementById("comenzarSimulacro");

const revisionSimulacroPantalla =
    document.getElementById("revisionSimulacroPantalla");

const datosRevisionSimulacro =
    document.getElementById("datosRevisionSimulacro");

const revisarSinContestar =
    document.getElementById("revisarSinContestar");

const finalizarSimulacro =
    document.getElementById("finalizarSimulacro");

const resultadoSimulacroPantalla =
    document.getElementById(
        "resultadoSimulacroPantalla"
    );

const volverInicioResultadoSimulacro =
    document.getElementById(
        "volverInicioResultadoSimulacro"
    );

const verCorreccionSimulacro =
    document.getElementById(
        "verCorreccionSimulacro"
    );

const correccionSimulacroPantalla =
    document.getElementById(
        "correccionSimulacroPantalla"
    );

const datosCorreccionSimulacro =
    document.getElementById(
        "datosCorreccionSimulacro"
    );

const volverResultadoCorreccionSimulacro =
    document.getElementById(
        "volverResultadoCorreccionSimulacro"
    );

document
    .getElementById("verCorreccionSimulacro")
    .addEventListener("click", () => {

        datosCorreccionSimulacro.innerHTML = "";

        if (correccionSimulacro.length === 0) {

            datosCorreccionSimulacro.innerHTML = `
                <p>
                    🎉 No has fallado ninguna pregunta.
                </p>
            `;

        } else {

            correccionSimulacro.forEach(
                (fallo) => {

                    const bloque =
                        document.createElement("div");

                    bloque.className =
                        "bloque-correccion";

                    if (fallo.sinContestar) {

                        bloque.innerHTML = `
                            <h2>
                                Pregunta ${fallo.numero}
                                ⚪
                            </h2>

                            <p>
                                <strong>
                                    ${fallo.pregunta}
                                </strong>
                            </p>

                            <p>
                                ⚪ <strong>Sin contestar</strong>
                            </p>

                            <p>
                                ✅ Respuesta correcta:
                                <br>
                                <strong>
                                    ${fallo.respuestaCorrecta}
                                </strong>
                            </p>

                            <hr>
                        `;

                    } else {

                        bloque.innerHTML = `
                            <h2>
                                Pregunta ${fallo.numero}
                                ❌
                            </h2>

                            <p>
                                <strong>
                                    ${fallo.pregunta}
                                </strong>
                            </p>

                            <p>
                                ❌ Tu respuesta:
                                <br>
                                <strong>
                                    ${fallo.respuestaUsuario}
                                </strong>
                            </p>

                            <p>
                                ✅ Respuesta correcta:
                                <br>
                                <strong>
                                    ${fallo.respuestaCorrecta}
                                </strong>
                            </p>

                            <hr>
                        `;
                    }

                    datosCorreccionSimulacro.appendChild(
                        bloque
                    );
                }
            );
        }

        document
            .getElementById(
                "resultadoSimulacroPantalla"
            )
            .classList.add("oculto");

        document
            .getElementById(
                "correccionSimulacroPantalla"
            )
            .classList.remove("oculto");

        window.scrollTo(0, 0);
    });
volverResultadoCorreccionSimulacro.addEventListener(
    "click",
    () => {

        correccionSimulacroPantalla.classList.add(
            "oculto"
        );

        resultadoSimulacroPantalla.classList.remove(
            "oculto"
        );
        
        datosCorreccionSimulacro.innerHTML = "";

        if (correccionSimulacro.length === 0) {

            datosCorreccionSimulacro.innerHTML = `
                <p>
                    🎉 No has fallado ninguna pregunta.
                </p>
            `;

        } else {

            correccionSimulacro.forEach(
                (fallo, indice) => {

                    const bloque =
                        document.createElement("div");

                    bloque.className =
                        "bloque-correccion";

                    bloque.innerHTML = `
                        <h2>
                            Pregunta ${fallo.numero}
                        </h2>

                        <p>
                            <strong>
                                ${fallo.pregunta}
                            </strong>
                        </p>

                        <p>
                            ❌ Tu respuesta:
                            <strong>
                                ${fallo.respuestaUsuario}
                            </strong>
                        </p>

                        <p>
                            ✅ Respuesta correcta:
                            <strong>
                                ${fallo.respuestaCorrecta}
                            </strong>
                        </p>
                    `;

                    datosCorreccionSimulacro.appendChild(
                        bloque
                    );
                }
            );
        }

        window.scrollTo(0, 0);
    }
);
function mostrarResultadoSimulacro() {

    // ==========================================
    // RESULTADO DEL SIMULACRO
    // Las preguntas 1-100 puntúan.
    // Las preguntas 101-110 son de reserva.
    // ==========================================

    const preguntasPuntuables =
        respuestasSimulacro.slice(0, 100);

    const preguntasReserva =
        respuestasSimulacro.slice(100, 110);

    // Contabilizar aciertos en las 100 primeras
    const aciertosSimulacro =
        preguntasPuntuables.filter(
            (respuesta, indice) =>
                respuesta.respuesta !== null &&
                respuesta.respuesta ===
                simulacro[indice].respuestas[
                    simulacro[indice].correcta
                ]
        ).length;

    // Contabilizar preguntas contestadas
    const contestadasPuntuables =
        preguntasPuntuables.filter(
            respuesta =>
                respuesta.respuesta !== null
        ).length;

    // Errores
    const erroresSimulacro =
        contestadasPuntuables -
        aciertosSimulacro;

    // Sin contestar
    const sinContestarSimulacro =
        preguntasPuntuables.length -
        contestadasPuntuables;

    // Nota sobre 10
    const notaSimulacro =
        (aciertosSimulacro / 100) * 10;

    // Preguntas de reserva contestadas
    const reservaContestadas =
        preguntasReserva.filter(
            respuesta =>
                respuesta.respuesta !== null
        ).length;
    
    correccionSimulacro =
        preguntasPuntuables
            .map((respuesta, indice) => {

                // Pregunta sin contestar
                if (
                    respuesta.respuesta === null
                ) {
                    return {
                        numero: indice + 1,
                        pregunta:
                            simulacro[indice].pregunta,
                        respuestaUsuario:
                            null,
                        respuestaCorrecta:
                            simulacro[indice].respuestas[
                                simulacro[indice].correcta
                            ],
                        sinContestar: true
                    };
                }

                // Pregunta contestada incorrectamente
                if (
                    respuesta.respuesta !==
                        simulacro[indice].respuestas[
                            simulacro[indice].correcta
                        ]
                ) {
                    return {
                        numero: indice + 1,
                        pregunta:
                            simulacro[indice].pregunta,
                        respuestaUsuario:
                            respuesta.respuesta,
                        respuestaCorrecta:
                            simulacro[indice].respuestas[
                                simulacro[indice].correcta
                            ],
                        sinContestar: false
                    };
                }

                // Pregunta contestada correctamente
                return null;

            })
            .filter(
                pregunta =>
                    pregunta !== null
            );

    // Mostrar pantalla final
    revisionSimulacroPantalla.classList.add(
        "oculto"
    );

    examenPantalla.classList.add(
        "oculto"
    );
    document
        .getElementById("resultadoSimulacroPantalla")
        .classList.remove("oculto");

    document
        .getElementById("datosResultadoSimulacro")
        .innerHTML = `

            <h2>RESULTADO</h2>

            <p>
                ✅ Aciertos:
                <strong>${aciertosSimulacro}</strong>
            </p>

            <p>
                ❌ Errores:
                <strong>${erroresSimulacro}</strong>
            </p>

            <p>
                ⭕ Sin contestar:
                <strong>${sinContestarSimulacro}</strong>
            </p>

            <p>
                <strong>Nota:
                ${notaSimulacro.toFixed(2)} / 10</strong>
            </p>

            <hr>

            <p>
                <strong>Preguntas de reserva</strong>
            </p>

            <p>
                Contestadas:
                <strong>${reservaContestadas} de 10</strong>
            </p>

            <p>
                Las preguntas de reserva
                no puntúan en este simulacro.
            </p>
        `;
}

finalizarSimulacro.addEventListener("click", () => {

    clearInterval(temporizadorSimulacro);

    mostrarResultadoSimulacro();

});
revisarSinContestar.addEventListener("click", () => {

    indiceRevisionSimulacro = 0;

    preguntasPendientesSimulacro =
        respuestasSimulacro
            .map((respuesta, indice) => {
                return respuesta.respuesta === null
                    ? indice
                    : null;
            })
            .filter(indice => indice !== null);

    enRevisionSimulacro = true;

    revisionSimulacroPantalla.classList.add("oculto");
    examenPantalla.classList.remove("oculto");

    mostrarPreguntaRevisionSimulacro();

});
        // Guardar la respuesta de esta pregunta
    function siguientePreguntaRevisionSimulacro() {

        // Guardar la respuesta de esta pregunta
        respuestasSimulacro[preguntaActualSimulacro] = {
            pregunta:
                simulacro[preguntaActualSimulacro].pregunta,

            respuesta:
                respuestaSeleccionada
                    ? respuestaSeleccionada.texto
                    : null
        };

        // Pasar a la siguiente pregunta pendiente
        indiceRevisionSimulacro++;

        mostrarPreguntaRevisionSimulacro();
    }
const repasoFallosPantalla =
    document.getElementById("repasoFallosPantalla");

const datosFallos =
    document.getElementById("datosFallos");

const volverInicioFallos =
    document.getElementById("volverInicioFallos");
const empezarRepasoFallos =
    document.getElementById("empezarRepasoFallos");


const volverInicioHistorial =
    document.getElementById("volverInicioHistorial");
const verHistorialResultado =
    document.getElementById("verHistorialResultado");

// ==========================================
// SELECCIONAR NÚMERO DE PREGUNTAS
// ==========================================

document.querySelectorAll(".opcion-repaso").forEach(boton => {

    boton.addEventListener("click", () => {

        document
            .querySelectorAll(".opcion-repaso")
            .forEach(b => {
                b.classList.remove("activa");
            });

        boton.classList.add("activa");

        tipoRepasoSeleccionado =
            boton.dataset.repaso;

        mostrarRepasoFallos();

    });

});
// ==========================================
// SELECCIONAR NÚMERO DE PREGUNTAS
// ==========================================

document.querySelectorAll(".opcion-numero").forEach(boton => {

    boton.addEventListener("click", () => {

        document
            .querySelectorAll(".opcion-numero")
            .forEach(b => {
                b.classList.remove("activa");
            });

        boton.classList.add("activa");

        numeroPreguntas =
            Number(boton.dataset.numero);

        console.log(
            "Número de preguntas:",
            numeroPreguntas
        );

    });

});
// ==========================================
// SELECCIONAR TIPO DE CONTENIDO
// ==========================================

document.querySelectorAll(".opcion-contenido").forEach(boton => {

    boton.addEventListener("click", () => {

        document
            .querySelectorAll(".opcion-contenido")
            .forEach(b => {
                b.classList.remove("activa");
            });

        boton.classList.add("activa");

        tipoSeleccionado =
            boton.dataset.tipo;

        console.log(
            "Contenido seleccionado:",
            tipoSeleccionado
        );

    });

});

// ==========================================
// SELECCIONAR TIPO DE REPASO
// ==========================================

document.querySelectorAll(".opcion-repaso").forEach(boton => {

    boton.addEventListener("click", () => {


        document
            .querySelectorAll(".opcion-repaso")
            .forEach(b => {
                
                b.classList.remove("activa");
            });

        boton.classList.add("activa");

        tipoRepasoSeleccionado =
            boton.dataset.repaso;

        console.log(
            "Tipo de repaso seleccionado:",
            tipoRepasoSeleccionado
        );

    });

});
// ==========================================
// BOTONES
// ==========================================

document.getElementById("empezar")
    .addEventListener("click", comenzarExamen);

document.getElementById("nuevo")
    .addEventListener("click", volverInicio);

document.getElementById("nuevoDesdeCorreccion")
    .addEventListener("click", volverInicio);

document.getElementById("correccion")
    .addEventListener("click", mostrarCorreccion);

document.getElementById("volverResultado")
    .addEventListener("click", () => {

        correccionPantalla.classList.add("oculto");

        resultadoPantalla.classList.remove("oculto");

    });

        siguiente.addEventListener("click", () => {

            if (enRevisionSimulacro) {

                siguientePreguntaRevisionSimulacro();

            } else if (simulacroActivo) {

                siguientePreguntaSimulacro();

            } else {

                siguientePregunta();

            }

        });

// ==========================================
// CARGAR PREGUNTAS
// ==========================================

async function cargarPreguntas() {

    try {

        const respuestaComun =
            await fetch("preguntas.json");

        preguntas =
            await respuestaComun.json();

        const respuestaEspecifico =
            await fetch("preguntas_especifico.json");

        preguntasEspecifico =
            await respuestaEspecifico.json();

        console.log(
            `Se han cargado ${preguntas.length} preguntas comunes.`
        );

        console.log(
            `Se han cargado ${preguntasEspecifico.length} preguntas específicas.`
        );

    } catch (error) {

        console.error(
            "Error al cargar las preguntas:",
            error
        );

        alert(
            "No se pudieron cargar las preguntas."
        );
    }
}


// ==========================================
// MEZCLAR ARRAY
// ==========================================

function mezclar(array) {

    return [...array]
        .sort(() => Math.random() - 0.5);

}


// ==========================================
// COMENZAR EXAMEN
// ==========================================

function comenzarExamen() {

    // Recuperar el número seleccionado en pantalla
    const numeroSeleccionado =
        document.querySelector(".opcion-numero.activa");

    if (numeroSeleccionado) {

        numeroPreguntas =
            Number(numeroSeleccionado.dataset.numero);

    }

    // Un examen normal deja de ser un repaso
    esRepasoFallos = false;

    console.log(
        "COMENZAR EXAMEN",
        tipoSeleccionado,
        numeroPreguntas
    );

    let bancoPreguntas = [];

    if (tipoSeleccionado === "comun") {

        bancoPreguntas = preguntas;

    } else if (tipoSeleccionado === "especifico") {

        bancoPreguntas = preguntasEspecifico;

    } else if (tipoSeleccionado === "todos") {

        bancoPreguntas = [
            ...preguntas,
            ...preguntasEspecifico
        ];
    }


    if (bancoPreguntas.length < numeroPreguntas) {

        alert(
            `Solo hay ${bancoPreguntas.length} preguntas disponibles.`
        );

        return;
    }


    examen =
        mezclar(bancoPreguntas)
        .slice(0, numeroPreguntas);


    preguntaActual = 0;
    aciertos = 0;
    resultadosExamen = [];


    mostrarPregunta();


    inicio.classList.add("oculto");
    resultadoPantalla.classList.add("oculto");
    correccionPantalla.classList.add("oculto");
    examenPantalla.classList.remove("oculto");
}

function prepararSimulacro() {

    // Seleccionar 44 preguntas comunes
    const comunes =
        mezclar(preguntas)
        .slice(0, 44);

    // Seleccionar 66 preguntas de farmacia
    const farmacia =
        mezclar(preguntasEspecifico)
        .slice(0, 66);

    // Unir las 110 preguntas y mezclarlas
    simulacro =
        mezclar([
            ...comunes,
            ...farmacia
        ]);

    console.log(
        "SIMULACRO PREPARADO:",
        simulacro.length,
        "preguntas"
    );

}
function iniciarTemporizadorSimulacro() {

    clearInterval(temporizadorSimulacro);

    tiempoSimulacro = 90 * 60;

    const reloj =
        document.getElementById(
            "temporizadorSimulacro"
        );

    reloj.textContent = "90:00";

    temporizadorSimulacro =
        setInterval(() => {

            if (tiempoSimulacro <= 0) {

                clearInterval(
                    temporizadorSimulacro
                );

                tiempoSimulacro = 0;

                reloj.textContent = "00:00";

                mostrarResultadoSimulacro();

                return;
            }

            tiempoSimulacro--;

            const minutos =
                Math.floor(
                    tiempoSimulacro / 60
                );

            const segundos =
                tiempoSimulacro % 60;

            reloj.textContent =
                `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

        }, 1000);
}
// ==========================================
// MOSTRAR PREGUNTA DEL SIMULACRO
// ==========================================

function mostrarPreguntaSimulacro() {

    const actual =
        simulacro[preguntaActualSimulacro];
    console.log("PREGUNTA SIMULACRO:", actual);

    const numeroActual =
        preguntaActualSimulacro + 1;

    document.getElementById("numeroPregunta").textContent =
        `Pregunta ${numeroActual} de ${simulacro.length}`;

    const porcentaje = Math.round(
        (numeroActual / simulacro.length) * 100
    );

    document.getElementById("porcentaje").textContent =
        `${porcentaje}%`;

    document.getElementById("barraProgreso").style.width =
        `${porcentaje}%`;

    preguntaTexto.textContent =
        actual.pregunta;

    respuestasDiv.innerHTML = "";

    respuestaSeleccionada = null;

    siguiente.disabled = false;

    const respuestas =
        actual.respuestas.map((texto, indice) => {

            return {
                texto: texto,
                esCorrecta:
                    indice === actual.correcta
            };

        });

    const respuestasMezcladas =
        mezclar(respuestas);

    respuestasMezcladas.forEach(
        (respuesta, indice) => {

            const boton =
                document.createElement("button");

            boton.className =
                "respuesta";

            const letra =
                String.fromCharCode(97 + indice);

            boton.textContent =
                `${letra}) ${respuesta.texto}`;

            boton.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".respuesta")
                        .forEach(boton => {
                            boton.classList.remove(
                                "seleccionada"
                            );
                        });

                    boton.classList.add(
                        "seleccionada"
                    );

                    respuestaSeleccionada =
                        respuesta;

                    siguiente.disabled =
                        false;

                }
            );

            respuestasDiv.appendChild(
                boton
            );

        }
    );
}

function mostrarPreguntaRevisionSimulacro() {
    
    console.log(
        "PENDIENTES EN REVISIÓN:",
        preguntasPendientesSimulacro.length
    );

    // Buscar las preguntas que todavía están sin contestar
    

    // Si ya no quedan preguntas pendientes
    if (
        indiceRevisionSimulacro >=
        preguntasPendientesSimulacro.length
    ) {

        mostrarRevisionSimulacro();

        return;
    }


    // Obtener la posición real de la pregunta
    const indicePregunta =
        preguntasPendientesSimulacro[
            indiceRevisionSimulacro
        ];

    preguntaActualSimulacro =
        indicePregunta;

    const actual =
        simulacro[indicePregunta];

    console.log(
        "REVISANDO PREGUNTA:",
        indicePregunta + 1
    );

    // Mostrar número de pregunta dentro de la revisión
    const numeroActual =
        indiceRevisionSimulacro + 1;

    document.getElementById(
        "numeroPregunta"
    ).textContent =
        `Pregunta ${numeroActual} de ${preguntasPendientesSimulacro.length}`;
    
    // Mostrar progreso
    const porcentaje =
        Math.round(
            (numeroActual /
                simulacro.length) *
            100
        );

    document.getElementById(
        "porcentaje"
    ).textContent =
        `${porcentaje}%`;

    document.getElementById(
        "barraProgreso"
    ).style.width =
        `${porcentaje}%`;

    // Mostrar pregunta
    preguntaTexto.textContent =
        actual.pregunta;

    respuestasDiv.innerHTML = "";

    respuestaSeleccionada = null;

    siguiente.disabled = false;

    // Preparar respuestas
    const respuestas =
        actual.respuestas.map(
            (texto, indice) => {

                return {
                    texto: texto,
                    esCorrecta:
                        indice ===
                        actual.correcta
                };

            }
        );

    const respuestasMezcladas =
        mezclar(respuestas);

    // Mostrar respuestas
    respuestasMezcladas.forEach(
        (respuesta, indice) => {

            const boton =
                document.createElement(
                    "button"
                );

            boton.className =
                "respuesta";

            const letra =
                String.fromCharCode(
                    97 + indice
                );

            boton.textContent =
                `${letra}) ${respuesta.texto}`;

            boton.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".respuesta"
                        )
                        .forEach(
                            boton => {
                                boton.classList.remove(
                                    "seleccionada"
                                );
                            }
                        );

                    boton.classList.add(
                        "seleccionada"
                    );

                    respuestaSeleccionada =
                        respuesta;

                }
            );

            respuestasDiv.appendChild(
                boton
            );

        }
    );
}


// ==========================================
// SIGUIENTE PREGUNTA DEL SIMULACRO
// ==========================================

function siguientePreguntaSimulacro() {

    // Guardar la respuesta de esta pregunta
    respuestasSimulacro[preguntaActualSimulacro] = {
        pregunta:
            simulacro[preguntaActualSimulacro].pregunta,

        respuesta:
            respuestaSeleccionada
                ? respuestaSeleccionada.texto
                : null
    };

    // Pasar a la siguiente pregunta
    preguntaActualSimulacro++;

    // Si todavía quedan preguntas
        if (
            preguntaActualSimulacro <
            simulacro.length
        ) {

            mostrarPreguntaSimulacro();

        } else {

            mostrarRevisionSimulacro();

        }

    }

// ==========================================
// MOSTRAR REVISIÓN DEL SIMULACRO
// ==========================================

function mostrarRevisionSimulacro() {

    const sinContestar =
        respuestasSimulacro.filter(
            respuesta =>
                respuesta.respuesta === null
        );

    const contestadas =
        respuestasSimulacro.length -
        sinContestar.length;

    examenPantalla.classList.add("oculto");

    revisionSimulacroPantalla.classList.remove(
        "oculto"
    );

    datosRevisionSimulacro.innerHTML = `
        <p>
            Has contestado
            <strong>${contestadas}</strong>
            de
            <strong>${simulacro.length}</strong>
            preguntas.
        </p>

        <p>
            Preguntas sin contestar:
            <strong>${sinContestar.length}</strong>
        </p>
    `;

}

// ==========================================
// MOSTRAR PREGUNTA
// ==========================================

function mostrarPregunta() {

    const actual =
        examen[preguntaActual];


    const numeroActual = preguntaActual + 1;
    const totalPreguntas = examen.length;

    document.getElementById("numeroPregunta").textContent =
        `Pregunta ${numeroActual} de ${totalPreguntas}`;

    const porcentaje = Math.round(
        (numeroActual / totalPreguntas) * 100
    );

    document.getElementById("porcentaje").textContent =
        `${porcentaje}%`;

    document.getElementById("barraProgreso").style.width =
        `${porcentaje}%`;
    preguntaTexto.textContent =
        actual.pregunta;


    respuestasDiv.innerHTML = "";

    respuestaSeleccionada = null;

    siguiente.disabled = true;


    // Creamos las respuestas

    const respuestas =
        actual.respuestas.map((texto, indice) => {

            return {

                texto: texto,

                esCorrecta:
                    indice === actual.correcta

            };

        });


    // Mezclamos las respuestas

    const respuestasMezcladas =
        mezclar(respuestas);


    // Las mostramos

    respuestasMezcladas.forEach(
        (respuesta, indice) => {

            const boton =
                document.createElement("button");

            boton.className =
                "respuesta";


            const letra =
                String.fromCharCode(97 + indice);


            boton.textContent =
                `${letra}) ${respuesta.texto}`;


            boton.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".respuesta")
                        .forEach(boton => {

                            boton.classList.remove(
                                "seleccionada"
                            );

                        });


                    boton.classList.add(
                        "seleccionada"
                    );


                    respuestaSeleccionada =
                        respuesta;


                    siguiente.disabled =
                        false;

                }
            );


            respuestasDiv.appendChild(
                boton
            );

        }
    );

}


// ==========================================
// SIGUIENTE PREGUNTA
// ==========================================

function siguientePregunta() {

    if (respuestaSeleccionada === null) {

        return;

    }


    const actual =
        examen[preguntaActual];


    const correcta =
        respuestaSeleccionada.esCorrecta;


    if (correcta) {

        aciertos++;

        // Si estamos haciendo un repaso,
        // la pregunta deja de estar pendiente
        if (esRepasoFallos) {

            fallosPendientes =
                fallosPendientes.filter(
                    fallo =>
                        fallo.pregunta !== actual.pregunta
                );

            localStorage.setItem(
                "fallosPendientes",
                JSON.stringify(fallosPendientes)
            );
        }

    } else {

        // Si es un examen normal,
        // guardamos el fallo
        if (!esRepasoFallos) {

            const yaExiste =
                fallosPendientes.some(
                    fallo =>
                        fallo.pregunta === actual.pregunta
                );

            if (!yaExiste) {

                fallosPendientes.push({
                    pregunta: actual.pregunta,
                    respuestas: actual.respuestas,
                    correcta: actual.correcta,
                    tipo: tipoSeleccionado
                });
                localStorage.setItem(
                    "fallosPendientes",
                    JSON.stringify(
                        fallosPendientes
                    )
                );
            }
        }
    }
    // Guardamos la información
    // para poder mostrar la corrección

    resultadosExamen.push({

        pregunta:
            actual.pregunta,

        respuestaUsuario:
            respuestaSeleccionada.texto,

        respuestaCorrecta:
            actual.respuestas[actual.correcta],

        correcta:
            correcta

    });


    preguntaActual++;


    if (preguntaActual < examen.length) {

        mostrarPregunta();

    } else {

        mostrarResultado();

    }

}


// ==========================================
// MOSTRAR RESULTADO
// ==========================================

function mostrarResultado() {

    const errores =
        numeroPreguntas - aciertos;

    const nota =
        (aciertos / numeroPreguntas * 10)
        .toFixed(1)
        .replace(".", ",");


    // =========================
    // GUARDAR RESULTADO
    // =========================

    const resultado = {
        fecha: new Date().toLocaleString("es-ES"),
        preguntas: numeroPreguntas,
        aciertos: aciertos,
        errores: errores,
        nota: nota,
        correccion: resultadosExamen
    };

    historialResultados.push(resultado);

    localStorage.setItem(
        "historialResultados",
        JSON.stringify(historialResultados)
    );


    // =========================
    // MOSTRAR RESULTADO
    // =========================

    resultadoTexto.innerHTML = `

        <div>
            ✅ Aciertos:
            <strong>${aciertos}</strong>
        </div>

        <div>
            ❌ Errores:
            <strong>${errores}</strong>
        </div>

        <div>
            📝 Nota:
            <strong>${nota} / 10</strong>
        </div>

    `;


    examenPantalla.classList.add("oculto");
    correccionPantalla.classList.add("oculto");
    resultadoPantalla.classList.remove("oculto");
}

// ==========================================
// MOSTRAR CORRECCIÓN
// ==========================================

function mostrarCorreccion() {

    listaCorreccion.innerHTML = "";


    resultadosExamen.forEach(
        (resultado, indice) => {

            const bloque =
                document.createElement("div");

            bloque.className =
                resultado.correcta
                    ? "correccion correcta"
                    : "correccion incorrecta";


            if (resultado.correcta) {

                bloque.innerHTML = `

                    <h3>
                        Pregunta ${indice + 1}
                        <span>✅</span>
                    </h3>

                    <p class="texto-pregunta">
                        ${resultado.pregunta}
                    </p>

                    <p>
                        <strong>Tu respuesta:</strong><br>
                        <span class="respuesta-correcta">
                            ${resultado.respuestaUsuario}
                        </span>
                    </p>

                `;

            } else {

                bloque.innerHTML = `

                    <h3>
                        Pregunta ${indice + 1}
                        <span>❌</span>
                    </h3>

                    <p class="texto-pregunta">
                        ${resultado.pregunta}
                    </p>

                    <p>
                        <strong>Tu respuesta:</strong><br>
                        <span class="respuesta-incorrecta">
                            ${resultado.respuestaUsuario}
                        </span>
                    </p>

                    <p>
                        <strong>Respuesta correcta:</strong><br>
                        <span class="respuesta-correcta">
                            ${resultado.respuestaCorrecta}
                        </span>
                    </p>

                `;

            }


            listaCorreccion.appendChild(
                bloque
            );

        }
    );


    resultadoPantalla.classList.add("oculto");

    correccionPantalla.classList.remove("oculto");

}


// ==========================================
// VOLVER AL INICIO
// ==========================================

function volverInicio() {

    correccionPantalla.classList.add("oculto");

    resultadoPantalla.classList.add("oculto");

    examenPantalla.classList.add("oculto");

    inicio.classList.remove("oculto");

}
function mostrarHistorial() {

    inicio.classList.add("oculto");
    examenPantalla.classList.add("oculto");
    resultadoPantalla.classList.add("oculto");
    correccionPantalla.classList.add("oculto");

    historialPantalla.classList.remove("oculto");

    listaHistorial.innerHTML = "";

    if (historialResultados.length === 0) {

        listaHistorial.innerHTML = `
            <p>
                Todavía no has realizado ningún examen.
            </p>
        `;

        return;
    }

    historialResultados
        .slice()
        .reverse()
        .forEach((resultado, indice) => {

            const indiceReal =
                historialResultados.length - 1 - indice;

            const elemento =
                document.createElement("div");

            elemento.className =
                "resultado-historial";

            elemento.innerHTML = `
                <div class="historial-cabecera">
                    <strong>
                        Examen ${indiceReal + 1}
                    </strong>

                    <span>
                        ${resultado.fecha}
                    </span>
                </div>

                <div class="historial-datos">

                    <span>
                        📝 ${resultado.preguntas} preguntas
                    </span>

                    <span>
                        ✅ ${resultado.aciertos} aciertos
                    </span>

                    <span>
                        ❌ ${resultado.errores} errores
                    </span>

                    <strong>
                        ⭐ Nota: ${resultado.nota} / 10
                    </strong>

                </div>

               ${
                   resultado.correccion
                       ? `
                           <button
                               class="principal boton-secundario boton-ver-correccion"
                               data-indice="${indiceReal}">
                               VER CORRECCIÓN
                           </button>
                         `
                       : ""
               }

               <button
                   class="principal boton-eliminar"
                   data-indice="${indiceReal}">
                   ELIMINAR
               </button>
            `;

            listaHistorial.appendChild(elemento);
        });


    document
        .querySelectorAll(".boton-ver-correccion")
        .forEach(boton => {

            boton.addEventListener(
                "click",
                () => {

                    const indice =
                        Number(boton.dataset.indice);

                    mostrarCorreccionHistorial(indice);

                }
            );

        });
    document
        .querySelectorAll(".boton-eliminar")
        .forEach(boton => {

            boton.addEventListener(
                "click",
                () => {

                    const indice =
                        Number(boton.dataset.indice);

                    const confirmar =
                        confirm(
                            "¿Quieres eliminar este resultado?"
                        );

                    if (!confirmar) {
                        return;
                    }

                    historialResultados.splice(
                        indice,
                        1
                    );

                    localStorage.setItem(
                        "historialResultados",
                        JSON.stringify(
                            historialResultados
                        )
                    );

                    mostrarHistorial();

                }
            );

        });
}


function mostrarCorreccionHistorial(indice) {

    const examenGuardado =
        historialResultados[indice];

    if (!examenGuardado.correccion) {
        return;
    }

    listaCorreccion.innerHTML = "";

    examenGuardado.correccion.forEach(
        (resultado, indicePregunta) => {

            const bloque =
                document.createElement("div");

            bloque.className =
                resultado.correcta
                    ? "correccion correcta"
                    : "correccion incorrecta";


            if (resultado.correcta) {

                bloque.innerHTML = `

                    <h3>
                        Pregunta ${indicePregunta + 1}
                        <span>✅</span>
                    </h3>

                    <p class="texto-pregunta">
                        ${resultado.pregunta}
                    </p>

                    <p>
                        <strong>Tu respuesta:</strong><br>

                        <span class="respuesta-correcta">
                            ${resultado.respuestaUsuario}
                        </span>
                    </p>

                `;

            } else {

                bloque.innerHTML = `

                    <h3>
                        Pregunta ${indicePregunta + 1}
                        <span>❌</span>
                    </h3>

                    <p class="texto-pregunta">
                        ${resultado.pregunta}
                    </p>

                    <p>
                        <strong>Tu respuesta:</strong><br>

                        <span class="respuesta-incorrecta">
                            ${resultado.respuestaUsuario}
                        </span>
                    </p>

                    <p>
                        <strong>Respuesta correcta:</strong><br>

                        <span class="respuesta-correcta">
                            ${resultado.respuestaCorrecta}
                        </span>
                    </p>

                `;
            }

            listaCorreccion.appendChild(bloque);
        }
    );


    historialPantalla.classList.add("oculto");
    correccionPantalla.classList.remove("oculto");
}


function volverAlInicioDesdeHistorial() {

    historialPantalla.classList.add("oculto");
    inicio.classList.remove("oculto");

}

function mostrarEstadisticas() {
    inicio.classList.add("oculto");
    examenPantalla.classList.add("oculto");
    resultadoPantalla.classList.add("oculto");
    correccionPantalla.classList.add("oculto");
    historialPantalla.classList.add("oculto");

    estadisticasPantalla.classList.remove("oculto");

    const totalExamenes = historialResultados.length;

    const datosEstadisticas =
        document.getElementById("datosEstadisticas");

    if (totalExamenes === 0) {
        datosEstadisticas.innerHTML = `
            <p>
                Todavía no has realizado ningún examen.
            </p>
        `;
        return;
    }

    let totalPreguntas = 0;
    let totalAciertos = 0;
    let totalErrores = 0;
    let sumaNotas = 0;
    let mejorNota = 0;

    historialResultados.forEach(resultado => {
        totalPreguntas += resultado.preguntas;
        totalAciertos += resultado.aciertos;
        totalErrores += resultado.errores;

        const nota =
            parseFloat(
                String(resultado.nota).replace(",", ".")
            );

        sumaNotas += nota;

        if (nota > mejorNota) {
            mejorNota = nota;
        }
    });

    const mediaNotas =
        (sumaNotas / totalExamenes)
            .toFixed(1)
            .replace(".", ",");

    const ultimaNota =
        historialResultados[
            historialResultados.length - 1
        ].nota;

    datosEstadisticas.innerHTML = `
        <div class="estadistica">
            <span>📚 Exámenes realizados</span>
            <strong>${totalExamenes}</strong>
        </div>

        <div class="estadistica">
            <span>📝 Preguntas contestadas</span>
            <strong>${totalPreguntas}</strong>
        </div>

        <div class="estadistica">
            <span>✅ Aciertos</span>
            <strong>${totalAciertos}</strong>
        </div>

        <div class="estadistica">
            <span>❌ Errores</span>
            <strong>${totalErrores}</strong>
        </div>
    <div class="estadistica">
        <span>🎯 Porcentaje de aciertos</span>
        <strong>
            ${(totalAciertos / totalPreguntas * 100)
                .toFixed(1)
                .replace(".", ",")} %
        </strong>
    </div>
        <div class="estadistica">
            <span>📊 Media de las notas</span>
            <strong>${mediaNotas} / 10</strong>
        </div>

        <div class="estadistica">
            <span>🏆 Mejor nota</span>
            <strong>
                ${mejorNota.toFixed(1).replace(".", ",")} / 10
            </strong>
        </div>

        <div class="estadistica">
            <span>📌 Última nota</span>
            <strong>${ultimaNota} / 10</strong>
        </div>
    `;
}


function mostrarRepasoFallos() {

    inicio.classList.add("oculto");
    examenPantalla.classList.add("oculto");
    resultadoPantalla.classList.add("oculto");
    correccionPantalla.classList.add("oculto");
    historialPantalla.classList.add("oculto");
    estadisticasPantalla.classList.add("oculto");

    repasoFallosPantalla.classList.remove("oculto");

    datosFallos.innerHTML = "";

    // ==========================================
    // FILTRAR LOS FALLOS SEGÚN LA SELECCIÓN
    // ==========================================

    let fallosMostrar = [];

    if (tipoRepasoSeleccionado === "comun") {

        fallosMostrar =
            fallosPendientes.filter(
                fallo => fallo.tipo === "comun"
            );

    } else if (tipoRepasoSeleccionado === "especifico") {

        fallosMostrar =
            fallosPendientes.filter(
                fallo => fallo.tipo === "especifico"
            );

    } else if (tipoRepasoSeleccionado === "todos") {

        fallosMostrar =
            fallosPendientes;

    }


    // ==========================================
    // NO HAY FALLOS
    // ==========================================

    if (fallosMostrar.length === 0) {

        datosFallos.innerHTML = `
            <p>
                🎉 No tienes preguntas pendientes
                de este tipo para repasar.
            </p>
        `;

        return;
    }


    // ==========================================
    // MOSTRAR NÚMERO DE FALLOS
    // ==========================================

    datosFallos.innerHTML = `
        <p>
            Tienes
            <strong>${fallosMostrar.length}</strong>
            preguntas pendientes de repasar.
        </p>
    `;


    // ==========================================
    // MOSTRAR LOS FALLOS
    // ==========================================

    fallosMostrar.forEach((fallo, indice) => {

        const bloque =
            document.createElement("div");

        bloque.className = "estadistica";

        bloque.innerHTML = `
            <div>

                <strong>
                    Pregunta ${indice + 1}
                </strong>

                <p>
                    ${fallo.pregunta}
                </p>

                <p>
                    <strong>Respuesta correcta:</strong><br>
                    ${fallo.respuestas[fallo.correcta]}
                </p>

            </div>
        `;

        datosFallos.appendChild(bloque);

    });

}
function comenzarRepasoFallos() {

    // ==========================================
    // SELECCIONAR LOS FALLOS QUE SE VAN A REPASAR
    // ==========================================

    let fallosMostrar = [];

    if (tipoRepasoSeleccionado === "comun") {

        fallosMostrar =
            fallosPendientes.filter(
                fallo => fallo.tipo === "comun"
            );

    } else if (tipoRepasoSeleccionado === "especifico") {

        fallosMostrar =
            fallosPendientes.filter(
                fallo => fallo.tipo === "especifico"
            );

    } else if (tipoRepasoSeleccionado === "todos") {

        fallosMostrar =
            fallosPendientes;

    }


    // ==========================================
    // NO HAY FALLOS PARA ESTE TIPO
    // ==========================================

    if (fallosMostrar.length === 0) {

        alert(
            "No tienes preguntas pendientes de este tipo para repasar."
        );

        return;
    }


    // ==========================================
    // CREAR EL EXAMEN CON LOS FALLOS FILTRADOS
    // ==========================================

    examen = [...fallosMostrar];

    numeroPreguntas = examen.length;

    preguntaActual = 0;
    aciertos = 0;
    respuestaSeleccionada = null;
    resultadosExamen = [];

    esRepasoFallos = true;


    // ==========================================
    // MOSTRAR PANTALLA DE EXAMEN
    // ==========================================

    repasoFallosPantalla.classList.add("oculto");
    resultadoPantalla.classList.add("oculto");
    correccionPantalla.classList.add("oculto");
    historialPantalla.classList.add("oculto");
    estadisticasPantalla.classList.add("oculto");

    examenPantalla.classList.remove("oculto");

    mostrarPregunta();
}
verHistorial.addEventListener(
    "click",
    mostrarHistorial
);

verHistorialResultado.addEventListener(
    "click",
    mostrarHistorial
);

volverInicioHistorial.addEventListener(
    "click",
    volverAlInicioDesdeHistorial
);

verEstadisticas.addEventListener(
    "click",
    mostrarEstadisticas
);

volverInicioEstadisticas.addEventListener(
    "click",
    () => {
        estadisticasPantalla.classList.add("oculto");
        inicio.classList.remove("oculto");
    }
);

repasarFallos.addEventListener(
    "click",
    mostrarRepasoFallos
);
borrarTodosFallos.addEventListener(
    "click",
    () => {

        const confirmar =
            confirm(
                "¿Seguro que quieres borrar todos los fallos pendientes de repaso?"
            );

        if (!confirmar) {
            return;
        }

        fallosPendientes = [];

        localStorage.removeItem(
            "fallosPendientes"
        );

        mostrarRepasoFallos();

    }
);
simulacros.addEventListener("click", () => {

    inicio.classList.add("oculto");

    simulacroPantalla.classList.remove("oculto");

});

simulacros.addEventListener("click", () => {

    inicio.classList.add("oculto");

    simulacroPantalla.classList.remove("oculto");

});

volverInicioSimulacro.addEventListener("click", () => {

    simulacroPantalla.classList.add("oculto");

    inicio.classList.remove("oculto");

    window.scrollTo(0, 0);

});
volverInicioResultadoSimulacro.addEventListener(
    "click",
    () => {

        resultadoSimulacroPantalla.classList.add(
            "oculto"
        );

        inicio.classList.remove(
            "oculto"
        );

        simulacroActivo = false;
        enRevisionSimulacro = false;

        window.scrollTo(0, 0);
    }
);
volverInicioFallos.addEventListener(
    "click",
    () => {
        repasoFallosPantalla.classList.add("oculto");
        inicio.classList.remove("oculto");

        window.scrollTo(0, 0);
    }
);
empezarRepasoFallos.addEventListener(
    "click",
    comenzarRepasoFallos
);

comenzarSimulacro.addEventListener("click", () => {

    prepararSimulacro();
    iniciarTemporizadorSimulacro();

    preguntaActualSimulacro = 0;

    respuestasSimulacro =
        Array.from(
            { length: simulacro.length },
            (_, indice) => ({
                pregunta:
                    simulacro[indice].pregunta,
                respuesta: null
            })
        );

    simulacroActivo = true;

    simulacroPantalla.classList.add("oculto");

    examenPantalla.classList.remove("oculto");

    mostrarPreguntaSimulacro();

});
// ==========================================
// VOLVER AL INICIO DESDE EL EXAMEN
// ==========================================

volverInicioExamen.addEventListener("click", () => {

    examenPantalla.classList.add("oculto");

    resultadoPantalla.classList.add("oculto");
    correccionPantalla.classList.add("oculto");
    historialPantalla.classList.add("oculto");
    estadisticasPantalla.classList.add("oculto");
    repasoFallosPantalla.classList.add("oculto");

    inicio.classList.remove("oculto");

});



// ==========================================
// CARGAR LAS PREGUNTAS
// ==========================================

cargarPreguntas();

// ==========================================
// ACTIVAR SERVICE WORKER
// ==========================================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register(
            "./service-worker.js"
        )
        .then(() => {

            console.log(
                "Service Worker registrado correctamente"
            );

        })
        .catch(error => {

            console.error(
                "Error al registrar el Service Worker:",
                error
            );

        });

    });

}
