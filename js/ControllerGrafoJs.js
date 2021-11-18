var ControllerGrafo = ControllerGrafo || {};

ControllerGrafo  = function(canvas) {
    this.canvas  = canvas;
    this.tela    = this.canvas.parentElement;
    this.grafo   = new Grafo();
    this.letras  = 97;//a entre letra miniscula
    this.desenho = new Desenho(this.canvas.getContext('2d'));

    this.nodoSelecionado  = {};
    this.funcaoMouseAtual = "";
    this.funcoesMouse     = {
        //possibilita mover os nodos
        POINTER : function(mouseEvent, control) {
            control.limpaNodoSelecionado();

            var oNodoSelecionado = control.grafo.nodoSelecionado(mouseEvent, control.tela);

            if(oNodoSelecionado == null) {
                return;
            }

            function atualizaNodo(e) {
                control.clear();
                var posicao = UTIL.getPosicaoMouse(e, control.tela);
                
                oNodoSelecionado.atualiza(posicao.x, posicao.y);
                control.grafo.desenhaNodos();
            }

            function remove() {
                control.canvas.removeEventListener("mousemove", atualizaNodo);
                window.removeEventListener("mouseup", remove);
            }

            control.canvas.addEventListener('mousemove', atualizaNodo);
            window.addEventListener('mouseup', remove);
        },
        //adiciona nodo no canvas
        ADD_NODE : function(mouseEvent, control) {
            control.limpaNodoSelecionado();
            var pos  = UTIL.getPosicaoMouse(mouseEvent, control.tela);;
            var raio = 10; 

            var node = new Nodo(pos.x, pos.y, raio, control.desenho);
            node.setId(String.fromCharCode(control.letras).toUpperCase());

            control.grafo.addNodo(node);
            control.clear();
            control.grafo.desenhaNodos();
            control.letras++;
        }, 
        //conecta dois nodos
        CONECT_NODE: function(mouseEvent, control) {

            if(control.nodoSelecionado == null) {
                control.nodoSelecionado = control.grafo.nodoSelecionado(mouseEvent, control.tela);
                return;
            }

            var nodoConexao = control.grafo.nodoSelecionado(mouseEvent, control.tela);

            if(nodoConexao == null || control.nodoSelecionado == null) {
                return;
            }

            control.nodoSelecionado.addSucessor(nodoConexao);
            nodoConexao.addSucessor(control.nodoSelecionado);

            control.limpaNodoSelecionado();
            control.clear();
            control.grafo.desenhaNodos();
        },
        //apaga o nodo(ainda nao implementado)
        ERASE : function(mouseEvent) {
            control.limpaNodoSelecionado();
        }
    }

    /**
     * Retorna um objeto que contem a posicao do mouse no canvas ja com a correcao 
     * aplicada
     */
    this.getPosicaoMouse = function(mouseEvent) {
        var x = mouseEvent.clientX - divCan.offsetLeft;
        var y = mouseEvent.clientY - divCan.offsetTop;

        return { x: x, y:y };
    }

    this.mudaFuncaoMouse = function(e, control) {
        let id = e.target.id;

        if(id == '') {
            id = e.target.parentElement.id;
        }

        control.setFuncaoMouse(id);
    }

    this.limpaNodoSelecionado = function() {
        this.nodoSelecionado = null;
    }

    this.setFuncaoMouse = function(func) {
        this.funcaoMouseAtual = this.funcoesMouse[func];
    }

    this.destacaNodoVisitado = function(nodo) {
        let elem = this.grafo.getNodos().get(nodo.id);
        this.desenho.circuloVazio(elem.x, elem.y, elem.raio + 5, "green");
    }

    this.destacaoCaminhoSolucao = function(nodo) {
        let nodoAtual = nodo;
        while(nodoAtual != null) {
            let elem = this.grafo.getNodos().get(nodoAtual.id);
            this.desenho.circuloVazio(elem.x, elem.y, elem.raio + 10, "red");
            nodoAtual = nodoAtual.pai;
        }
    }

    this.reset = function() {
        this.grafo.desenhaNodos();
        this.clear();
        this.grafo.reset();
    }

    this.clear = function() {
        this.desenho.context.clearRect(0, 0, canvas.width, canvas.height);
    }

}