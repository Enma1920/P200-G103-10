class Pala extends Rectangle {
    constructor(puntPosicio, amplada, alcada) {
        super(puntPosicio, amplada, alcada);
        this.velocitatX = 1;
        this.velocitatY = 1;
        this.colorRectangle = "#eee";
        this.framesUltimCanvi = 0; // Nou atribut
        this.framesMinims = 30;
    }

    mou(mouX, mouY) {
        this.puntPosicio.x += mouX;
        this.puntPosicio.y += mouY;
    }
    update(key, alcada) {
        if (key.DOWN.pressed) {
            /********************************* 
             * Tasca. Definir el moviment de la pala
             * en funció de la tecla premuda
             *********************************/

            //limits 1 . Atura*********************************************
            let x = 0;
            let y = 1;
            let novaPosicioY = this.puntPosicio.y + y;

            if(novaPosicioY >= alcada - this.alcada){
                y = 0;
            }

            if(novaPosicioY <= 0){
                y = 0;
            }

            this.mou(x, y);
        }
        if (key.UP.pressed) {
            /********************************* 
             * Tasca. Definir el moviment de la pala
             * en funció de la tecla premuda
             *********************************/
            let x = 0;
            let y = -1;
            let novaPosicioY = this.puntPosicio.y + y;

            if (novaPosicioY >= alcada - this.alcada) {
                y = 0;
            }

            if (novaPosicioY <= 0) {
                y = 0;
            }

            this.mou(x, y);
        }
    }
    updateAuto(alcada) {
        /*********************************
         * Tasca. Definir el moviment de la pala
         * automàtica en moviment constant 
         * o amb variacions aleatories
         *********************************/
        let x = 0;
        if (this.framesUltimCanvi >= this.framesMinims) {
            // Probabilitat de canvi (per exemple, 10%)
            if (Math.random() < 0.01) {
                this.velocitatY *= -1; // Canvi de direcció
                this.framesUltimCanvi = 0; // Reinicia el comptador
            }
        } else {
            this.framesUltimCanvi++;
        }

        let novaPosicioY = this.puntPosicio.y + this.velocitatY;

        // Si arriba als límits, inverteix direcció i reinicia comptador
        if (novaPosicioY >= alcada - this.alcada) {
            this.velocitatY = -Math.abs(this.velocitatY);
            this.framesUltimCanvi = 0;
        } else if (novaPosicioY <= 0) {
            this.velocitatY = Math.abs(this.velocitatY);
            this.framesUltimCanvi = 0;
        }

        this.mou(x, this.velocitatY);
    }
}