//Variables i constants globals
var joc;
let gameStarted = false;
// Control de musica i efectes
let musicAudio = new Audio('audio/retro-game-music.mp3');
musicAudio.loop = true;

let gameStart = new Audio('audio/game-start.mp3');


let soRebot = new Audio('audio/ball-tap.wav');
let soParet = new Audio('audio/ball-top-bottom.wav');
soParet.volume = 0.6;
let soWin = new Audio('audio/win.wav');
let soLose = new Audio('audio/lose.wav');

let musicOn = false;

let effectsOn = true;

//Main de l'aplicatiu
// Quan en doc estigui preparat, executa la funcio
$(function () {
    let myCanvas = $("#joc")[0];
    let myCtx = myCanvas.getContext("2d"); // obté canvas i context per...

    /********************************* 
     * Tasca. Inicialitza la classe JOC les posicions 
     * dels elements del joc
     * al canva: Pales, bola, etc
    **********************************/
    joc = new Joc(myCanvas, myCtx); // ... dibuixar el joc
    inicialitzaMenu();

    // joc.inicialitza(); // Més bona pràctica fer-ho al Game Start
    // animacio();
})

let requestId = null; // Variable global

function animacio() {
    console.log("frame");
    joc.update();
    //Oportunitat per actualitzar les puntuacions
    //revisar si seguim jugant o no
    //Si pujem de nivell, etc

    //Crida recursiva per generar animació
    requestId = requestAnimationFrame(animacio);
}

function aturaAnimacio() {
    if (requestId) {
        cancelAnimationFrame(requestId);
        requestId = null;
        console.log("animació aturada");
    }
}

// funcions globals
// efectes amb inicialització passada ruta path
function playEffect(audioObj) {
    if (effectsOn) {
        audioObj.currentTime = 0;
        audioObj.play()
    }
}

function inicialitzaMenu() {
    // Llegim el nom del jugador de localStorage (si existeix si no ps posar el)
    const nomGuardat = localStorage.getItem('playerName');
    if (nomGuardat) {
        $('#player-name').val(nomGuardat);
    } else {
        $('#player-name').val('PLAYER1');
    }

    // Cargar récords
    const highScores = [
        { name: "PRO", score: 22 },
        { name: "MASTER", score: 18 },
        { name: "ACE", score: 13 },
        { name: "NOVA", score: 8 },
        { name: "ROOKIE", score: 2 }
    ];

    const $scoresBody = $('#scores-body');
    const $playerName = $('#player-name');

    // Mostrar los récords
    $.each(highScores, function (index, player) {
        $scoresBody.append(`
            <tr>
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.score}</td>
            </tr>
        `);
    });

    // Guardar nombre cuando cambia
    $playerName.on('change', function () {
        const nomJugador = $(this).val();
        localStorage.setItem('playerName', nomJugador);
        // console.log("name:", nomJugador);
    });

    // Manejar Enter en el input
    $playerName.on('keypress', function (e) {
        if (e.which === 13 && !gameStarted) { // 13 es el código de Enter
            e.preventDefault();
            startGame();
        }
    });

    // Manejar otras teclas en el documento
    $(document).on('keydown', function (e) {
        // Solo iniciar si no está en el input y no es Enter
        if (!$(e.target).is('input') && e.which !== 13 && !gameStarted) {
            startGame();
        } else if (e.key === 'Enter') { // si enter i està focus sobre els span... 
            let $focused = $(document.activeElement);
            if ($focused.is('.menu-label[role="button"]')) {
                $focused.click(); // ... simula clic amb enter o espai
            }
        }
    });

    // Función para iniciar el juego
    function startGame() {
        const playerName = $playerName.val() || 'PLAYER1';
        localStorage.setItem('playerName', playerName);

        aturaAnimacio();

        joc.inicialitza();
        animacio();
        $('.menu').hide();
        $('#display, #divjoc').show();
        document.getElementById("final-message").style.display = "none"; // per si de cas està obert

        playEffect(gameStart);
        gameStarted = true;

        console.log("Game Strt");
    }

    // Gestió del botó MUSIC
    $('.menu-row:contains("MUSIC")').on('click', function () {
        musicOn = !musicOn;
        if (musicOn) {
            musicAudio.play();
            $(this).find('.menu-value').text("ON");
        } else {
            musicAudio.pause();
            musicAudio.currentTime = 0;
            $(this).find('.menu-value').text("OFF");
        }
    });

    // Gestió efectes
    $('.menu-row:contains("SFX")').on('click', function () {
        effectsOn = !effectsOn;
        $(this).find('.menu-value').text(effectsOn ? "ON" : "OFF");
    });

    //Función "boton" cache
    var botoCache = $("#cache-button");
    botoCache.on("click", ()=>{
        localStorage.clear();
        botoCache.text("CLEARED");
        setTimeout(() => {
        location.reload();
    }, 700); 

    })

    // colores del tema
    const colorsGame = {
        default: {
            fons: "#222",
            pala1: "#eee",
            pala2: "#eee",
            bola: "#7a7a7a",
        },
        blue: {
            fons: "#0d1b2a",
            pala1: "#4fc3f7",
            pala2: "#4fc3f7",
            bola: "#00b4d8",
        },
        red: {
            fons: "#2d0606",
            pala1: "#ff4e4e",
            pala2: "#ff4e4e",
            bola: "#ffd6a5",
        },
        green: {
            fons: "#1b5e20",
            pala1: "#43a047",
            pala2: "#43a047",
            bola: "#b2ff59",
        },
        orange: {
            fons: "#ff9800",
            pala1: "#fff3e0",
            pala2: "#fff3e0",
            bola: "#ff5722",
        }
    };
    $("#select-color").on("change", function() {
        colores();
        this.blur(); // perd focus
    });
    function colores() {
        var colorSelected = $("#select-color").val(); // usa .val() en vez de .value
        let colorGame = colorsGame[colorSelected];
        let fonsJoc = $("#joc");

        if (!colorGame) return; // protección por si el color no existe

        // cambiamos colores del fondo, palas y bola
        fonsJoc.css("background-color", colorGame.fons);
        joc.bola.colorRectangle = colorGame.bola;
        joc.palaJugador1.colorRectangle = colorGame.pala1;
        joc.palaJugador2.colorRectangle = colorGame.pala2;
    }
}