var UTIL = UTIL || {};

UTIL = {
    tempo: 1000,
    /**
     * Retorna um objeto que contem a posicao do mouse no canvas ja com a correcao 
     * aplicada
     */
    getPosicaoMouse: function(mouseEvent, tela) {
        var x = mouseEvent.clientX - tela.offsetLeft;
        var y = mouseEvent.clientY - tela.offsetTop;

        return { x: x, y:y };
    },
    sleepPromise: function() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.tempo);
        });
    },
    sleep: function() {
        const date = Date.now();
        let currentDate = null;
        do {
        currentDate = Date.now();
        } while (currentDate - date < this.tempo);
    }
}