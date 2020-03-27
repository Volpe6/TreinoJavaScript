var Arvore = Arvore || {};

Arvore = function(desenho) {
    
    this.nodos   = new Map();
    this.root    = null;
    this.desenho = desenho;

    this.setRoot = function(nodo) {
        if(this.root != null) {
            return;
        }
        
        let root = Object.assign({}, nodo);
        root.sucessores = [];

        this.nodos.set(root.id, root);

        this.root = root;
    }

    this.getNodos = function() {
        return this.nodos;
    }

    this.getIdPai = function(nodo) {
        let folha = nodo; 

        let id      = "";
        let nodoAux = folha.pai;
        while(nodoAux != null) {
            id += nodoAux.id;
            
            nodoAux = nodoAux.pai;
        }

        return id.split('').reverse().join('');
    }

    this.addNodo = function(nodo) {
        let folha = Object.assign({}, nodo); 

        let id = this.getIdPai(folha);

        let nodoPai     = this.nodos.get(id);
        folha.sucessores = [];
        folha.id = id + folha.id
        nodoPai.sucessores.push(folha);
        this.nodos.set(folha.id, folha);
    }

    this.desenhaNodos = function(solucao) {
        let meta = "";
        if(solucao != null) {
            meta = this.getIdPai(solucao) + solucao.id;
        }

        naoPintados = [];
        nivel       = 0;
        let raio    = 10;
        naoPintados.push(this.root);

        caminhoSolucao = [];
        
        while(naoPintados.length > 0) {
            let canvas = this.desenho.context.canvas;
            let espacamentoLateral  = (naoPintados.length == 1)?canvas.width/2:((canvas.width/(naoPintados.length + 1)));
            let espacamentoSuperior =  ((raio*4)*nivel) + (raio*2);
            let arrAux = [];
            
            for(let i = 0; i < naoPintados.length; i++) {
                nodo = naoPintados[i];

                let x = espacamentoLateral + (i*espacamentoLateral);
                let y = espacamentoSuperior;

                if(nodo.pai != null) {
                    this.desenho.linha(nodo.pai.x, nodo.pai.y, x, y);
                    this.desenho.circuloPreenchido(nodo.pai.x, nodo.pai.y, raio, 'white');
                    this.desenho.circuloVazio(nodo.pai.x, nodo.pai.y, raio, 'black');
                    this.desenho.texto(nodo.pai.x - raio/2, nodo.pai.y + raio/2, nodo.pai.id, "black", 15);
                }

                this.desenho.circuloPreenchido(x, y, raio, 'white');
                this.desenho.circuloVazio(x, y, raio, 'black');
                this.desenho.texto(x - raio/2, y + raio/2, nodo.id.substr(nodo.id.length-1, nodo.id.length-1), "black", 15);

                
                for(let j = 0; j < nodo.sucessores.length; j++) {
                    if(nodo.sucessores[j].pai != null) {
                        nodo.sucessores[j].pai.x = x;
                        nodo.sucessores[j].pai.y = y;
                        nodo.sucessores[j].pai = Object.assign({}, nodo.sucessores[j].pai);
                    }
                    arrAux.push(nodo.sucessores[j]);
                }
                if(solucao == null) {
                    continue;
                }

                if(nodo.id === meta) {
                    let nodoAtual = nodo;
                    nodoAtual.x = x;
                    nodoAtual.y = y;
                    while(nodoAtual != null) {
                        caminhoSolucao.push(nodoAtual);
                        nodoAtual = nodoAtual.pai;
                    }
                }
            }

            naoPintados = arrAux;

            nivel++;
        }

        for(let i = 0; i < caminhoSolucao.length; i++) {
            this.desenho.circuloVazio(caminhoSolucao[i].x, caminhoSolucao[i].y, raio + 5, 'red');
        }
    }

    this.reset = function() {
        this.nodos = new Map();
        this.root = null;
    }

}