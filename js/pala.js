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
            **********************************/
            this.mou(0, 1);

        }
        if (key.UP.pressed) {
            /********************************* 
              * Tasca. Definir el moviment de la pala
              * en funció de la tecla premuda
             **********************************/
            this.mou(0, -1);

            }
    }
    updateAuto(alcada) {
        /********************************* 
         * Tasca. Definir el moviment de la pala
         * automàtica en moviment constant 
         * o amb variacions aleatories
        **********************************/

    }

}