// onlinemode.js

// Configuración del servidor WebSocket
const WS_URL = 'https://tu-app.railway.app/ws-renumber'; // CAMBIAR POR TU URL DE RAILWAY

let stompClient = null;
let miId = null;
let miNombre = null;
let codigoSalaActual = null;
let esMiTurno = false;

// Referencias a elementos del DOM
const screens = {
    menu: document.getElementById('menuOnline'),
    unirse: document.getElementById('unirseScreen'),
    espera: document.getElementById('esperaScreen'),
    juego: document.getElementById('juegoScreen'),
    resultado: document.getElementById('resultadoScreen')
};

const buttons = {
    crearSala: document.getElementById('crearSalaBtn'),
    unirseSala: document.getElementById('unirseSalaBtn'),
    unirse: document.getElementById('unirseBtn'),
    cancelarUnirse: document.getElementById('cancelarUnirseBtn'),
    copiarCodigo: document.getElementById('copiarCodigoBtn'),
    cancelarEspera: document.getElementById('cancelarEsperaBtn'),
    enviarJugada: document.getElementById('enviarJugadaBtn'),
    volverMenu: document.getElementById('volverMenuBtn')
};

const inputs = {
    codigo: document.getElementById('codigoInput'),
    nombre1: document.getElementById('nombreJugador1'),
    nombre2: document.getElementById('nombreJugador2'),
    secuencia: document.getElementById('secuenciaInput')
};

const displays = {
    codigoSala: document.getElementById('codigoSala'),
    errorUnirse: document.getElementById('errorUnirse'),
    turnoActual: document.getElementById('turnoActual'),
    secuenciaDisplay: document.getElementById('secuenciaDisplay'),
    player1Name: document.getElementById('player1Name'),
    player2Name: document.getElementById('player2Name'),
    player1Status: document.getElementById('player1Status'),
    player2Status: document.getElementById('player2Status'),
    player1Card: document.getElementById('player1Card'),
    player2Card: document.getElementById('player2Card'),
    gameMessages: document.getElementById('gameMessages'),
    resultadoTitulo: document.getElementById('resultadoTitulo'),
    resultadoMensaje: document.getElementById('resultadoMensaje')
};

// Conectar WebSocket al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    conectarWebSocket();
    configurarEventListeners();
    miId = generarIdUnico();
});

function conectarWebSocket() {
    const socket = new SockJS(WS_URL);
    stompClient = Stomp.over(socket);
    
    stompClient.connect({}, function(frame) {
        console.log('Conectado al servidor:', frame);
        agregarMensaje('Conectado al servidor');
    }, function(error) {
        console.error('Error de conexión:', error);
        agregarMensaje('Error: No se pudo conectar al servidor');
    });
}

function configurarEventListeners() {
    // Botones del menú
    buttons.crearSala.addEventListener('click', crearSala);
    buttons.unirseSala.addEventListener('click', mostrarPantallaUnirse);
    
    // Botones de unirse
    buttons.unirse.addEventListener('click', unirseASala);
    buttons.cancelarUnirse.addEventListener('click', () => mostrarPantalla('menu'));
    
    // Botones de espera
    buttons.copiarCodigo.addEventListener('click', copiarCodigo);
    buttons.cancelarEspera.addEventListener('click', cancelarSala);
    
    // Botones de juego
    buttons.enviarJugada.addEventListener('click', enviarJugada);
    inputs.secuencia.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !buttons.enviarJugada.disabled) {
            enviarJugada();
        }
    });
    
    // Botón de resultado
    buttons.volverMenu.addEventListener('click', volverAlMenu);
    
    // Solo permitir números en el input de secuencia
    inputs.secuencia.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
    
    // Convertir código a mayúsculas
    inputs.codigo.addEventListener('input', function(e) {
        e.target.value = e.target.value.toUpperCase();
    });
}

function mostrarPantalla(nombre) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[nombre].classList.add('active');
}

function generarIdUnico() {
    return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
}

function crearSala() {
    miNombre = inputs.nombre1.value.trim() || 'Jugador 1';
    inputs.nombre1.value = miNombre;
    
    mostrarPantalla('espera');
    
    const mensaje = {
        tipo: 'crear',
        jugadorId: miId,
        jugadorNombre: miNombre
    };
    
    stompClient.send('/app/game/crear', {}, JSON.stringify(mensaje));
    
    // Suscribirse a la sala (se actualizará cuando llegue el código)
    setTimeout(() => {
        if (codigoSalaActual) {
            suscribirseASala(codigoSalaActual);
        }
    }, 500);
}

function mostrarPantallaUnirse() {
    mostrarPantalla('unirse');
    displays.errorUnirse.textContent = '';
}

function unirseASala() {
    const codigo = inputs.codigo.value.trim().toUpperCase();
    miNombre = inputs.nombre2.value.trim() || 'Jugador 2';
    
    if (codigo.length !== 6) {
        displays.errorUnirse.textContent = 'El código debe tener 6 caracteres';
        return;
    }
    
    codigoSalaActual = codigo;
    suscribirseASala(codigo);
    
    const mensaje = {
        tipo: 'unirse',
        jugadorId: miId,
        jugadorNombre: miNombre
    };
    
    stompClient.send(`/app/game/unirse/${codigo}`, {}, JSON.stringify(mensaje));
}

function suscribirseASala(codigo) {
    stompClient.subscribe(`/topic/sala/${codigo}`, function(response) {
        const data = JSON.parse(response.body);
        manejarMensajeServidor(data);
    });
}

function manejarMensajeServidor(data) {
    console.log('Mensaje recibido:', data);
    
    switch(data.tipo) {
        case 'sala-creada':
            codigoSalaActual = data.codigoSala;
            displays.codigoSala.textContent = data.codigoSala;
            agregarMensaje(data.mensaje);
            break;
            
        case 'juego-iniciado':
            mostrarPantalla('juego');
            displays.player1Name.textContent = miNombre;
            agregarMensaje(data.mensaje);
            actualizarTurno(data.jugadorActual);
            break;
            
        case 'turno':
            displays.secuenciaDisplay.textContent = 'Secuencia: ' + data.secuenciaActual;
            actualizarTurno(data.jugadorActual);
            agregarMensaje(data.mensaje);
            break;
            
        case 'victoria':
            mostrarResultado(data);
            break;
            
        case 'error':
            displays.errorUnirse.textContent = data.mensaje;
            agregarMensaje('Error: ' + data.mensaje);
            break;
    }
}

function actualizarTurno(jugadorActual) {
    esMiTurno = jugadorActual.id === miId;
    
    if (esMiTurno) {
        displays.turnoActual.textContent = '¡Tu turno!';
        inputs.secuencia.disabled = false;
        buttons.enviarJugada.disabled = false;
        inputs.secuencia.focus();
        
        displays.player1Card.classList.add('active');
        displays.player2Card.classList.remove('active');
        displays.player1Status.textContent = '●';
        displays.player2Status.textContent = '○';
    } else {
        displays.turnoActual.textContent = 'Turno de ' + jugadorActual.nombre;
        inputs.secuencia.disabled = true;
        buttons.enviarJugada.disabled = true;
        
        displays.player1Card.classList.remove('active');
        displays.player2Card.classList.add('active');
        displays.player1Status.textContent = '○';
        displays.player2Status.textContent = '●';
        displays.player2Name.textContent = jugadorActual.nombre;
    }
}

function enviarJugada() {
    const secuencia = inputs.secuencia.value.trim();
    
    if (!secuencia) {
        agregarMensaje('Debes ingresar una secuencia');
        return;
    }
    
    const mensaje = {
        tipo: 'jugada',
        jugadorId: miId,
        jugadorNombre: miNombre,
        secuencia: secuencia
    };
    
    stompClient.send(`/app/game/jugada/${codigoSalaActual}`, {}, JSON.stringify(mensaje));
    
    inputs.secuencia.value = '';
    inputs.secuencia.disabled = true;
    buttons.enviarJugada.disabled = true;
}

function mostrarResultado(data) {
    mostrarPantalla('resultado');
    
    const gane = data.jugadorActual.id === miId;
    
    if (gane) {
        displays.resultadoTitulo.textContent = '¡GANASTE!';
        displays.resultadoTitulo.style.color = '#0f0';
    } else {
        displays.resultadoTitulo.textContent = 'PERDISTE';
        displays.resultadoTitulo.style.color = '#f00';
    }
    
    displays.resultadoMensaje.textContent = data.mensaje;
}

function copiarCodigo() {
    const codigo = displays.codigoSala.textContent;
    navigator.clipboard.writeText(codigo).then(() => {
        agregarMensaje('Código copiado al portapapeles');
        buttons.copiarCodigo.textContent = '✓ Copiado';
        setTimeout(() => {
            buttons.copiarCodigo.textContent = 'Copiar';
        }, 2000);
    });
}

function cancelarSala() {
    codigoSalaActual = null;
    mostrarPantalla('menu');
}

function volverAlMenu() {
    location.reload(); // Recargar para limpiar todo
}

function agregarMensaje(texto) {
    const p = document.createElement('p');
    p.textContent = '• ' + texto;
    displays.gameMessages.appendChild(p);
    displays.gameMessages.scrollTop = displays.gameMessages.scrollHeight;
