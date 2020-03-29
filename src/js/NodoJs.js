var Nodo = Nodo || {};

Nodo = function(x, y, raio, desenho) {
    this.x          = x;
    this.y          = y;
    this.raio       = raio;
    this.id         = "";
    this.sucessores = [];
    this.heuristica = 0;
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

            //mostra a distancia entre nodos
            if(true) {
                let x  = nodo.getX() - this.x;
                let y  = nodo.getY() - this.y;

                let distanciaNodos = Math.round(Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2))));

                //geometria analitica para determinar as coordenadas do ponto médio
                let xPontoMedio = (nodo.getX() + this.x)/2;
                let YPontoMedio = (nodo.getY() + this.y)/2;

                this.desenho.texto(xPontoMedio, YPontoMedio, distanciaNodos, "black", 15);
            }
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