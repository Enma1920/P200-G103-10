class Pala extends Rectangle {
    constructor(puntPosicio, amplada, alcada) {
        super(puntPosicio, amplada, alcada);
        this.velocitatX = 2;
        this.velocitatY = 2;
        this.cocolorRectangle = "#eee";
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
        let y = this.velocitatY;
        let novaPosicioY = this.puntPosicio.y + y;

            if (novaPosicioY >= alcada - this.alcada) {
                this.velocitatY = -1;
            }

            if (novaPosicioY <= 0) {
                this.velocitatY = 1;
            }

            this.mou(x, this.velocitatY);
        
        
    }
}