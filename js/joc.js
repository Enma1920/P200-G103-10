class Joc{
    constructor(myCanvas, myCtx){
        this.myCanvas = myCanvas;
        this.myCtx = myCtx;
        this.amplada = myCanvas.width;
        this.alcada = myCanvas.height;

        //Elements del joc
        /********************************* 
         * Tasca. Crear els elements del joc
         * Pales, bola, etc
        **********************************/
        this.bola = new Bola(new Punt((myCanvas.width/2)-5,(myCanvas.height/2)-5),10,10);
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
          /********************************* 
         * Tasca. Actualitzar les posicions 
         * dels elements del joc
         * al canva: Pales, bola, etc
        **********************************/      
       this.palaJugador1.update(this.key, this.alcada);
       this.palaJugador2.updateAuto(this.alcada);
       this.bola.update(this.amplada, this.alcada, this.palaJugador1, this.palaJugador2);
       this.draw();
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