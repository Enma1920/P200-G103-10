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

        document.getElementById("score-jugador1").textContent = this.puntuacioJugador1;
        document.getElementById("score-jugador2").textContent = this.puntuacioJugador2;

        if (this.puntuacioJugador1 >= PUNTS_GUANYADOR) {
            playEffect(soWin);
    
            const guanyador = this.puntuacioJugador1 >= PUNTS_GUANYADOR ? 'Jugador 1' : 'Jugador 2';
            const puntsGuanyador = this.puntuacioJugador1 >= PUNTS_GUANYADOR ? this.puntuacioJugador1 : this.puntuacioJugador2;

            setTimeout(() => {
                alert(`GUANYADOR: ${guanyador}! Nivell ${this.nivell || 1} completat.`);
            }, 100); // no se si posarem nivells en un futur

            const playerName = localStorage.getItem('playerName') || 'PLAYER';
            const nouRecord = { name: playerName, score: puntsGuanyador };
            let records = JSON.parse(localStorage.getItem("records")) || [];

            // records.push(nouRecord);
            // records.sort((a, b) => b.score - a.score);
            // records = records.slice(0, 5); // només els 5 millors
            // localStorage.setItem("records", JSON.stringify(records));

            // Tornar al menú i reiniciar estat
            $('#divjoc').hide();
            $('#display').hide();
            $('.menu').show();
            joc.puntuacioJugador1 = 0;
            joc.puntuacioJugador2 = 0;
            gameStarted = false;

            aturaAnimacio();

            this.gameOver = true; // al final
        }
        else if (this.puntuacioJugador2 >= PUNTS_GUANYADOR) {
            alert(`HAS PERDUT.`);
            $('#divjoc').hide();
            $('#display').hide();
            $('.menu').show();
            joc.puntuacioJugador1 = 0;
            joc.puntuacioJugador2 = 0;
            gameStarted = false;

            aturaAnimacio();

            this.gameOver = true;
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