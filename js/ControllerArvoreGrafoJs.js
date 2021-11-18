var ControlleArvoreGrafo = ControlleArvoreGrafo || {};

ControlleArvoreGrafo = function(canvas) {
    this.canvas  = canvas;
    this.tela    = this.canvas.parentElement;
    this.desenho = new Desenho(this.canvas.getContext('2d'));
    this.arvore  = new Arvore(this.desenho);

    this.setRoot = function(nodo) {
        this.arvore.setRoot(nodo);
    }

    this.addNodo = function(nodo) {
        this.arvore.addNodo(nodo);
    }

    this.desenhaArvore = function() {
        this.clear();
        this.arvore.desenhaNodos(null);
    }

    this.destacaoCaminhoSolucao = function(nodo) {
        this.clear();
        this.arvore.desenhaNodos(nodo);
    }
    
    this.reset = function() {
        this.clear();
        this.arvore.reset();
    }

    this.clear = function() {
        this.desenho.context.clearRect(0, 0, canvas.width, canvas.height);
    }
}