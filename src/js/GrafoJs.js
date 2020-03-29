var Grafo = Grafo || {};

Grafo = function() {

    this.nodos = new Map();

    /**
     * Retorna o nodo seleciona com base na posicao do ponteiro do mouse
     */
    this.nodoSelecionado = function(mouseEvent, tela) {
        let pos  = UTIL.getPosicaoMouse(mouseEvent, tela);
        let nodo = null;

        for(let [key, value] of this.nodos) {
            if(value.colisao(pos.x, pos.y)) {
                nodo = value;
                break;
            }
        }
        return nodo;
    }

    this.addNodo = function(nodo) {
        this.nodos.set(nodo.id, nodo);
    }

    this.getNodos = function() {
        return this.nodos;
    }

    /**
     * Desenha todos os nodos que estao no map de nodos
    */
    this.desenhaNodos = function() {
        for(let [key, value] of this.nodos) {
            value.desenhaConexoes();
        }
        for(let [key, value] of this.nodos) {
            value.desenhaCirculo();
            value.desenhaTexto();
        }
    }

    this.reset = function() {
        this.nodos = new Map();
    }

}