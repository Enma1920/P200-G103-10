const PUNTS_GUANYADOR = 5;

class Joc{
    constructor(myCanvas, myCtx){
        this.myCanvas = myCanvas;
        this.myCtx = myCtx;
        this.amplada = myCanvas.width;
        this.alcada = myCanvas.height;

        // variables Puntuacions Jugadors
        this.puntuacioJugador1 = 0;
        this.puntuacioJugador2 = 0;

        this.gameOver = false;


        //Elements del joc
        /********************************* 
         * Tasca. Crear els elements del joc
         * Pales, bola, etc
        **********************************/
       this.reiniciaBola();
        // this.bola = new Bola(new Punt((myCanvas.width/2)-5,(myCanvas.height/2)-5),10,10);
        this.palaJugador1 = new Pala(new Punt(10,40),10,60);
        this.palaJugador2 = new Pala(new Punt(myCanvas.width-20,70),10,60);

        //Tecles de control
         //tecles del Joc. Només fem servir up i down
        this.key = {
            RIGHT: {code: 39, pressed: false},
            LEFT: {code: 37, pressed: false},
            DOWN: {code: 40, pressed: false},
            UP: {code: 38, pressed: false}
        }
    }
    set velocitat(velocitatJoc){
        this.velocitatJoc = velocitatJoc;
    }

    inicialitza(){
        this.gameOver = false;
        $(document).on("keydown",{joc:this}, function(e){
             /********************************* 
             * Tasca. Indetificar la tecla premuda si és alguna
             * de les definides com a tecla de moviment
             * Actualitzar la propietat pressed a true 
            **********************************/
            if(e.keyCode == joc.key.DOWN.code){
                joc.key.DOWN.pressed = true;
                joc.key.UP.pressed = false;
            }
        });
        $(document).on("keyup", {joc:this}, function(e){
            /********************************* 
             * Tasca. Indetificar la tecla que ja no està premuda,
             * si és alguna de les definides com a tecla de moviment
             * Actualitzar la propietat pressed a false
            **********************************/
           if(e.keyCode == joc.key.UP.code){
                joc.key.UP.pressed = true;
                joc.key.DOWN.pressed = false;
            }
        });

        /********************************* 
         * Tasca. Dibuixar inicialment els elements del joc
         * al canva: Pales, bola, etc
        **********************************/
       //Màtode de crida recursiva per generar l'animació dels objectes
        requestAnimationFrame(animacio);
    }

    update(){
        if (this.gameOver) return;
        /********************************* 
         * Tasca. Actualitzar les posicions 
         * dels elements del joc
         * al canva: Pales, bola, etc
        **********************************/   
        this.palaJugador1.update(this.key, this.alcada);
        this.palaJugador2.updateAuto(this.alcada);
        this.bola.update(this.amplada, this.alcada, this.palaJugador1, this.palaJugador2);
        this.draw();

        // Actualitzar puntuacions a la pantalla
        document.getElementById("score-jugador1").textContent = this.puntuacioJugador1;
        document.getElementById("score-jugador2").textContent = this.puntuacioJugador2;

        // Comprovació de guanyador
        if (this.puntuacioJugador1 >= PUNTS_GUANYADOR || this.puntuacioJugador2 >= PUNTS_GUANYADOR) {
            this.gameOver = true;
            aturaAnimacio();

            // Mostrar missatge i determinar guanyador
            const guanyaJugador1 = this.puntuacioJugador1 >= PUNTS_GUANYADOR;
            const guanyador = guanyaJugador1 ? 'Jugador 1' : 'Jugador 2';
            const puntsGuanyador = guanyaJugador1 ? this.puntuacioJugador1 : this.puntuacioJugador2;

            if (guanyaJugador1) playEffect(soWin);

            setTimeout(() => {
                // Mostrar missatge a la pantalla
                document.getElementById("final-message").style.display = "block";
                document.getElementById("final-message").textContent = guanyaJugador1
                    ? `GUANYADOR: ${guanyador}! Nivell ${this.nivell || 1} completat.`
                    : 'HAS PERDUT.';
                // No se si posarem funcionalitat de nivells i 1 vs 1, ho deixo preprat
                // Tancar el missatge als 3 segons
                setTimeout(() => {
                    document.getElementById("final-message").style.display = "none";
                }, 8000);

                // També ocultar si es fa clic fora del missatge
                const tancarMissatge = (e) => {
                    const finalMsg = document.getElementById("final-message");
                    if (!finalMsg.contains(e.target)) {
                        finalMsg.style.display = "none";
                        document.removeEventListener("click", tancarMissatge);
                    }
                };
                document.addEventListener("click", tancarMissatge);

                // Mostrar menú i ocultar el joc
                $('#divjoc').hide();
                $('#display').hide();
                $('.menu').show();

                // Guardar rècord si guanya jugador 1
                if (guanyaJugador1) {
                    const playerName = localStorage.getItem('playerName') || 'PLAYER';
                    const nouRecord = { name: playerName, score: puntsGuanyador };
                    let records = JSON.parse(localStorage.getItem("records")) || [];

                    records.push(nouRecord);
                    records.sort((a, b) => b.score - a.score);
                    records = records.slice(0, 5); // només els 5 millors
                    localStorage.setItem("records", JSON.stringify(records));
                }

                // Reiniciar estat
                this.puntuacioJugador1 = 0;
                this.puntuacioJugador2 = 0;
                gameStarted = false;

            }, 100);
        }
    }

    reiniciaBola() {
        this.bola = null;
        // Posició centrada
        const posicioInicial = new Punt((this.myCanvas.width / 2) - 5, (this.myCanvas.height / 2) - 5);
        this.bola = new Bola(posicioInicial, 10, 10);
        console.log("Bola nova");
    }

    draw(){
        this.clearCanvas();
        /********************************* 
         * Tasca. Dibuixar els elements del joc
         * al canva, un cop actualitzades
         * les seves posicions: Pales, bola, etc
        **********************************/
        this.palaJugador1.draw(this.myCtx);
        this.palaJugador2.draw(this.myCtx);
        this.bola.draw(this.myCtx);

    }

    //Neteja el canvas
    clearCanvas(){
        this.myCtx.clearRect(
            0,0,
            this.amplada, this.alcada
        )
    }
}