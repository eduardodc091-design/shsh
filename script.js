const btnStart = document.getElementById('btn-start');
const startScreen = document.getElementById('start-screen');
const introCard = document.getElementById('intro-card');
const mainCard = document.getElementById('main-card');

const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const bearImg = document.getElementById('cute-bear');

// EL GUION DE LA COMEDIA (Textos, si es remate, y los milisegundos de pausa)
const historia = [
    { texto: "Hola... preparé un monólogo de alto nivel intelectual para impresionarte. 🧐", clase: "normal", pausa: 3500 },
    { texto: "Ahí va el primero: ¿Sabes cuál es el café más peligroso de todos? ☕", clase: "normal", pausa: 3500 },
    { texto: "¡El ex-preso! 🚔🤣", clase: "punchline", pausa: 3500 },
    { texto: "(A ver, acéptalo, ese fue ingenioso...) 🙈", clase: "normal", pausa: 2500 },
    { texto: "Va otro: ¿Por qué los astronautas no son buenos novios? 👩‍🚀", clase: "normal", pausa: 3500 },
    { texto: "¡Porque siempre necesitan su espacio! 🚀🛸", clase: "punchline", pausa: 4000 },
    { texto: "... 🦗 ...🦗 ...🦗 ...", clase: "normal", pausa: 2500 },
    { texto: "Ok, confirmo que mi futuro no está en la comedia. Mejor pasemos a lo importante...", clase: "normal", pausa: 4500 }
];

// Iniciar al tocar el botón principal
btnStart.addEventListener('click', () => {
    // 1. Ocultar pantalla de inicio
    startScreen.style.opacity = '0';
    setTimeout(() => startScreen.remove(), 500);
    
    // 2. Reproducir audio (El navegador ya lo permite porque hubo clic)
    document.getElementById('audioFondo').play().catch(e => console.log(e));

    // 3. Mostrar la tarjeta de introducción e iniciar el show
    introCard.classList.remove('hidden');
    iniciarShow();
});

// Función automática para revelar el texto poco a poco
async function iniciarShow() {
    const club = document.getElementById('comedy-club');
    
    for (let i = 0; i < historia.length; i++) {
        const linea = historia[i];
        
        // Crear el párrafo
        const p = document.createElement('p');
        p.innerText = linea.texto;
        p.className = linea.clase; // Le asigna 'normal' o 'punchline'
        club.appendChild(p);

        // Pequeño retraso para que CSS active la animación de entrada
        setTimeout(() => p.classList.add('visible'), 50);

        // Esperar el tiempo exacto antes de lanzar la siguiente frase
        await new Promise(resolve => setTimeout(resolve, linea.pausa));
    }

    // TERMINÓ EL MONÓLOGO -> Cambio mágico al plato principal
    introCard.classList.add('hidden'); 
    setTimeout(() => {
        mainCard.classList.remove('hidden'); 
    }, 800); // Espera a que se desvanezca la intro antes de mostrar la propuesta
}

// ==========================================
// LÓGICA DEL BOTÓN NO (EL ESCURRIDIZO)
// ==========================================
function moverBoton() {
    if (btnNo.parentElement !== document.body) {
        document.body.appendChild(btnNo);
        btnNo.style.position = 'fixed';
    }

    const maxX = window.innerWidth - btnNo.offsetWidth - 20;
    const maxY = window.innerHeight - btnNo.offsetHeight - 20;

    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));

    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
}

btnNo.addEventListener('mouseover', moverBoton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moverBoton();
}, { passive: false });

// ==========================================
// LÓGICA DEL BOTÓN SÍ (LA CELEBRACIÓN)
// ==========================================
btnYes.addEventListener('click', () => {
    // Si tienes "feliz.gif" guárdado, ponlo aquí
    bearImg.src = "feliz.gif"; 
    
    document.getElementById('question-title').innerText = "¡Sabía que ibas a aceptar! 🥰";
    document.getElementById('question-desc').innerHTML = "Era obvio era obvio jajaja... Ve preparándote porque la vamos a pasar increíble. <br><br> <i>Te escribo para los detalles...</i>";
    
    document.querySelector('#main-card .buttons-container').style.display = 'none';
    btnNo.style.display = 'none';

    crearLluviaDeCorazones();
});

function crearLluviaDeCorazones() {
    const bgContainer = document.getElementById('background-hearts');
    const corazones = ['❤️', '💖', '💘', '🌸', '✨'];

    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('falling-heart');
            heart.innerText = corazones[Math.floor(Math.random() * corazones.length)];
            
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.fontSize = `${Math.random() * 20 + 15}px`;
            heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
            
            bgContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 6000);
        }, i * 100); 
    }
}