var BUSCA = BUSCA || {};

BUSCA = {
    /*======================BUSCAS-CEGAS==============================*/
    /* o modo como foi implementado, torna possivel que entre em loop*/
    buscaLargura : async function(elemInicial, elemMeta) {

        return await busca();

        async function busca() {
            let abertos = [];
            abertos.push(new BUSCA.funcoes.node(elemInicial, null, 0));

            while(abertos.length > 0) {
                await UTIL.sleepPromise();
                let nodoAtual = abertos.shift();

                BUSCA.funcoes.notificaVisitados(nodoAtual);

                if(BUSCA.funcoes.meta(nodoAtual, elemMeta)) {
                    BUSCA.funcoes.notificaAbertos(abertos);
                    return nodoAtual;
                }

                BUSCA.funcoes.addSucessores(abertos, BUSCA.funcoes.sucessores(nodoAtual));
            }

            return null;
        }
    },
    buscaProfundidade:  async function(elemInicial, elemMeta, profundidadeMax) {
        return await busca();

        async function busca() {
            let abertos = [];
            abertos.push(new BUSCA.funcoes.node(elemInicial, null, 0));

            while(abertos.length > 0) {
                await UTIL.sleepPromise();
                let nodoAtual = abertos.pop();

                BUSCA.funcoes.notificaVisitados(nodoAtual);

                if(BUSCA.funcoes.meta(nodoAtual, elemMeta)) {
                    BUSCA.funcoes.notificaAbertos(abertos);
                    return nodoAtual;
                }

                if(nodoAtual.nivel < profundidadeMax) {
                    BUSCA.funcoes.addSucessores(abertos, BUSCA.funcoes.sucessores(nodoAtual));
                }
            }

            return null;
        }
    },
    buscaProfundidadeIterativa: async function(elemInicial, elemMeta) {
        return await busca();

        async function busca() {
            let profundidade = 1;
            while(profundidade < 99) {
                let solucao = await BUSCA.buscaProfundidade(elemInicial, elemMeta, profundidade);
                if(solucao != null) {
                    return solucao;
                }
                profundidade += 1;
            }
        }
    },
    buscaBidirecional: async function(elemInicial, elemMeta) {

        return await busca();

        async function busca() {
            let abertosCima  = [];
            let abertosBaixo = [];

            abertosCima.push(new BUSCA.funcoes.node(elemInicial, null, 0));
            abertosBaixo.push(new BUSCA.funcoes.node(elemMeta, null, 0));

            while((abertosCima.length>0) && (abertosBaixo.length>0)) {
                await UTIL.sleepPromise();
                let nodoCima = abertosCima.shift();
                BUSCA.funcoes.notificaVisitados(nodoCima);

                if(typeof abertosBaixo.find(nodo => {
                    return nodo.id == nodoCima.id
                }) != 'undefined') {
                    BUSCA.funcoes.notificaAbertos(abertosCima);
                    return conectar(nodoCima, abertosBaixo);
                }
                BUSCA.funcoes.addSucessores(abertosCima, BUSCA.funcoes.sucessores(nodoCima));
                await UTIL.sleepPromise();
                let nodoBaixo = abertosBaixo.shift();
                BUSCA.funcoes.notificaVisitados(nodoBaixo);

                if(typeof abertosCima.find(nodo => {
                    return nodo.id == nodoBaixo.id
                }) != 'undefined')  {
                    BUSCA.funcoes.notificaAbertos(abertosBaixo);
                    return conectar(nodoBaixo, abertosCima);;
                }
                BUSCA.funcoes.addSucessores(abertosBaixo, BUSCA.funcoes.sucessores(nodoBaixo));
            }

            return null;
        }

        function conectar(elem, array) {

            meta = null;

            nodo = array.find(nodo => {
                return nodo.id == elem.id;
            });

            let iNodo = nodo;
            let caminho = [];
            while(iNodo != null) {
                if(BUSCA.funcoes.meta(iNodo, elemMeta)) {
                    meta = iNodo;
                    caminho.push(iNodo);
                    break;
                }
                caminho.push(iNodo);
                iNodo = iNodo.pai;
            }

            if(meta != null) {
                for(let i = caminho.length - 1; i >= 0; i--) {
                    let nodo = caminho[i];
    
                    if(i == 0) {
                        nodo.pai = null;
                        break;
                    }
    
                    nodo.pai = caminho[i-1];
                }
    
                for(let j = 0 ; j < caminho.length; j++) {
                    let nodo = caminho[j];
    
                    if(nodo.id == elem.id) {
                        nodo.pai = elem.pai;
                        break;
                    }
                }
    
                return caminho.find(meta => {
                    return meta.id == elemMeta.id;
                });
            }
            
            let iNodoo = elem;
            let caminhoo = [];
            while(iNodoo != null) {
                // if(BUSCA.funcoes.meta(iNodo, elemMeta)) {
                //     meta = iNodo;
                //     caminho.push(iNodo);
                //     break;
                // }
                caminhoo.push(iNodoo);
                iNodoo = iNodoo.pai;
            }

            for(let i = caminhoo.length - 1; i >= 0; i--) {
                let nodo = caminhoo[i];

                if(i == 0) {
                    nodo.pai = null;
                    nodo.sucessores = [];
                    nodo.sucessores.push(caminhoo[i+1]);
                    break;
                }

                nodo.pai = caminhoo[i-1];
                if(i == caminhoo.length -1) {
                    nodo.sucessores = [];
                } else {
                  nodo.sucessores = [];
                  nodo.sucessores.push(caminhoo[i+1]);  
                }
            }

            for(let j = 0 ; j < caminhoo.length; j++) {

                let nodo = caminhoo[j];

                if(nodo.id == elem.id) {
                    nodoAux = array.find(nodoAux => {
                        return nodoAux.id == elem.id;
                    });
                    nodo.pai = nodoAux.pai;
                    nodo.sucessores = nodoAux.sucessores;
                }

                array.push(nodo);

            }

            return array.find(meta => {
                return meta.id == elemMeta.id;
            });

        }

    },
    /*=======================BUSCAS-INFORMADAS==============================*/ 
     /* o modo como foi implementado, torna possivel que entre em loop*/
    buscaGulosa: async function(elemInicial, elemMeta) {
        
        return await busca();

        async function busca() {
            let abertos = new SortedPriorityQueue();
            abertos.inserir(elemInicial.heuristica, new BUSCA.funcoes.node(elemInicial, null));

            while(!abertos.isEmpty()) {
                await UTIL.sleepPromise();
                nodoAtual = abertos.removeMin().getValue();

                BUSCA.funcoes.notificaVisitados(nodoAtual);
                if(BUSCA.funcoes.meta(nodoAtual, elemMeta)) {
                    // BUSCA.funcoes.notificaAbertos(abertos);
                    return nodoAtual;
                }

                let sucessores = BUSCA.funcoes.sucessores(nodoAtual);
                for(let i = 0; i < sucessores.length; i++) {
                    let sucessor = sucessores[i];
                    abertos.inserir(sucessor.heuristica, sucessor);
                }
            }
            return null;
        }
    },
    //Revisar
    buscaEstrela: async function(elemInicial, elemMeta) {

        return await busca();

        async function busca() {
            let abertos = new SortedPriorityQueue();
            abertos.inserir(elemInicial.heuristica + getDistanciaEntreNodos(elemInicial, elemInicial), elemInicial);

            while(!abertos.isEmpty()) {
                await UTIL.sleepPromise();
                nodoAtual = abertos.removeMin().getValue();
                
                BUSCA.funcoes.notificaVisitados(nodoAtual);
                if(BUSCA.funcoes.meta(nodoAtual, elemMeta)) {
                    // BUSCA.funcoes.notificaAbertos(abertos);
                    return nodoAtual;
                }

                let sucessores = BUSCA.funcoes.sucessores(nodoAtual);
                for(let i = 0; i < sucessores.length; i++) {
                    let sucessor = sucessores[i];
                    let soma     = 0;//g(n) custo do caminho do nó inicial até n

                    let currentNode = sucessor;
                    while(currentNode != null) {
                        if(currentNode.pai == null) {
                            break;
                        }
                        soma += getDistanciaEntreNodos(currentNode.pai, currentNode);
                        currentNode = currentNode.pai;
                    }
                    
                    abertos.inserir(sucessor.heuristica + soma, sucessor);
                }
                // abertos.imprimeElementos();
            }
        }

        function getDistanciaEntreNodos(nodoA, nodoB) {
            let x = nodoB.x - nodoA.x;
            let y = nodoB.y - nodoA.y;

            return Math.round(Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2))));
        }
    }
}

BUSCA.funcoes = {
    node:  function Node(elem, pai, nivel) {
        this.id         = elem.id;
        this.pai        = pai;
        this.sucessores = elem.sucessores;
        this.x          = elem.getX();
        this.y          = elem.getY();
        this.raio       = elem.raio;
        this.nivel      = nivel;
        this.heuristica = elem.heuristica;
    },
    sucessores: function(elem) {
        if(typeof elem.sucessores == 'undefined') {
            return;
        }
        let sucessores   = (elem.sucessores.length > 0)? elem.sucessores : [];
        let descendentes = [];

        for(let i = 0; i < sucessores.length; i++) {
            for(let j = i; j < sucessores.length; j++) {
                let eleI = sucessores[i];
                let eleJ = sucessores[j];
                if(eleI.id > eleJ.id) {
                    let aux = eleI;
                    sucessores[i] = eleJ;
                    sucessores[j] = aux;
                }
            }
        }

        for(let k = 0; k < sucessores.length; k++) {
            descendentes.push(new BUSCA.funcoes.node(sucessores[k], elem, (elem.nivel + 1)));
        }

        return descendentes;
    }, 
    predecessores: function(elem) {
        if(typeof elem.sucessores == 'undefined') {
            return;
        }

        let sucessores    = (elem.sucessores.length > 0)? elem.sucessores : [];
        let predecessores = [];

        for(let i = 0; i < sucessores.length; i++) {
            for(let j = i; j < sucessores.length; j++) {
                let eleI = sucessores[i];
                let eleJ = sucessores[j];
                if(eleI.id > eleJ.id) {
                    let aux = eleI;
                    sucessores[i] = eleJ;
                    sucessores[j] = aux;
                }
            }
        }

        for(let k = 0; k < sucessores.length; k++) {
            let nodo = new BUSCA.funcoes.node(sucessores[k], null, (elem.nivel - 1));
            nodo.sucessores.push(elem);
            predecessores.push(nodo);
        }

        return  predecessores;
    },
    /**
     * Adiciona os nodos abertos no array abertos
     * 
     * @param {*} arFonte array onde colocar os nodos ainda abertos 
     * @param {*} arCont array de elementos abertos
     */
    addSucessores: function(arFonte, arCont) {
        for(let i = 0; i < arCont.length; i++) {
            arFonte.push(arCont[i]);
        }
    },
    meta: function(elem, elemMeta) {
        return elem.id == elemMeta.id;
    },
    notificaAbertos: function(nodos) {
        for(let i = 0; i< nodos.length; i++) {
            TELA.autualizaDados(nodos[i]);
            TELA.notificaNodosAbertos();
        }
    },
    notificaVisitados: function(nodoAtual) {
        TELA.autualizaDados(nodoAtual);
        TELA.notificaNodosVisitados();
    }
}