var Nodo = Nodo || {};

Nodo = function(x, y, raio, desenho) {
    this.x          = x;
    this.y          = y;
    this.raio       = raio;
    this.id         = "";
    this.sucessores = [];
    this.desenho    = desenho;

    this.atualiza =  function(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Desenha as conexoes desse nodo com seus sucessores
     */
    this.desenhaConexoes = function() {
        if(this.sucessores.length == 0) {
            return;
        }

        for(let i = 0; i < this.sucessores.length; i++) {
            var nodo = this.sucessores[i];
            this.desenho.linha(this.x, this.y, nodo.getX(), nodo.getY(), "black");
        }
    }

    this.desenhaCirculo = function() {
        this.desenho.circuloPreenchido(this.x, this.y, this.raio, 'white');
        this.desenho.circuloVazio(this.x, this.y, this.raio, 'black');
    }

    this.desenhaTexto = function() {
        this.desenho.texto(this.x - raio/2, this.y + raio/2, this.id, "black", 15);
    }

    this.setId = function(id) {
        this.id = id;
    };

    //verifica se o mouse ta dentro da area do nodo
    this.colisao = function(x, y) {
        var bColidiu = false;

        var topo     = this.y - this.raio;
        var base     = this.y + this.raio;
        var esquerda = this.x - this.raio;
        var direita  = this.x + this.raio;
        
        if((x > esquerda) && (x < direita) 
        && (y >  topo)    && (y < base)) {
            bColidiu = true;
        }
        return bColidiu;
    }

    this.getSucessores = function() {
        return this.sucessores;
    }

    this.addSucessor   = function(elem) {
        if(this.sucessores.includes(elem)) {
            return;
        }
        this.sucessores.push(elem);
    } 

    this.getX = function() {
        return this.x;
    }

    this.getY = function() {
        return this.y;
    }

}