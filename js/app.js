//Variables i constants globals
//Main de l'aplicatiu
var joc;
$(function () {
    let myCanvas = $("#joc")[0];
    let myCtx = myCanvas.getContext("2d");

    /********************************* 
     * Tasca. Inicialitza la classe JOC les posicions 
     * dels elements del joc
     * al canva: Pales, bola, etc
    **********************************/
    joc = new Joc(myCanvas, myCtx);
    inicialitzaMenu();
    joc.inicialitza();

    animacio();
})

function animacio() {
    joc.update();
    //Oportunitat per actualitzar les puntuacions
    //revisar si seguim jugant o no
    //Si pujem de nivell, etc

    //Crida recursiva per generar animació
    requestAnimationFrame(animacio);
}

function inicialitzaMenu() {
    // Cargar récords
    const highScores = [
        { name: "PRO", score: 8500 },
        { name: "MASTER", score: 7200 },
        { name: "ACE", score: 6800 },
        { name: "NOVA", score: 5500 },
        { name: "ROOKIE", score: 4200 }
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
        localStorage.setItem('playerName', $(this).val());
    });

    // Manejar Enter en el input
    $playerName.on('keypress', function (e) {
        if (e.which === 13) { // 13 es el código de Enter
            e.preventDefault();
            startGame();
        }
    });

    // Manejar otras teclas en el documento
    $(document).on('keydown', function (e) {
        // Solo iniciar si no está en el input y no es Enter
        if (!$(e.target).is('input') && e.which !== 13) {
            startGame();
        }
    });

    // Función para iniciar el juego
    function startGame() {
        const playerName = $playerName.val() || 'PLAYER1';
        localStorage.setItem('playerName', playerName);

        $('.menu').hide();
        $('#display, #divjoc').show();
    }

    // Función "boton" musica 
    var audioMusica = $("#audioMusica")[0];
    var botoMusica = $("#music-button");
    var musicaOn = false;

    // Parar musica de fons 
    botoMusica.on("click",function(){
        // Quan la música esta ON 
        if(musicaOn){  
            // pausem la música
            audioMusica.pause();
            document.getElementById("music-button").textContent = "OFF";
            musicaOn = false;
        }
        // Quan la música esta OFF
        else{
            // Reproduim la música
            audioMusica.play();
            document.getElementById("music-button").textContent = "ON";
            musicaOn = true;
        }
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
}