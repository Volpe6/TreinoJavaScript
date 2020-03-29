var SortedPriorityQueue = SortedPriorityQueue || {};

SortedPriorityQueue = function() {
    this.comparador = new ComparadorInteiros();
    this.lista      = new LinkedPositionalList();

    /**
     * retorna se a lista esta vazia
     */
    this.isEmpty = function() {
        return this.size() == 0;
    }

    /**
     * retorna o tamanho da fila de prioridades
     */
    this.size = function() {
        return this.lista.size();
    }

    this.inserir = function(key, value) {
        checkKey(this.comparador, key);
        nodoNovo  = new PrioriryQueueEntry(key, value);//novo elemento a ser inserido
        nodoAtual = this.lista.last();//elemento atual da fila
        
        
        // Procura um nodo com uma chave menor que o novo nodo
        while(nodoAtual != null && (compare(this.comparador, nodoNovo, nodoAtual.getElemento()) < 0)) {
            nodoAtual = this.lista.before(nodoAtual);
        }

        //caso nao nao encontre nenhum adiciona o novo nodo na primeira posicao
        if(nodoAtual == null) {
            this.lista.addFirst(nodoNovo);
        } else {
            //caso encontre, adiciona o novo nodo depois do nodo atual
            this.lista.addAfter(nodoAtual, nodoNovo);
        }

        return nodoNovo;
    }

    /**
     * Retorna, mas nao remove uma entrada com chave minima
     */
    this.min = function() {
        if(this.lista.isEmpty()) {
            return null;
        }

        return this.lista.first();
    }

    /**
     * Remove e retorna uma entrada com chave minima
     */
    this.removeMin = function() {
        if(this.lista.isEmpty()) {
            return null;
        }
        return this.lista.remove(this.lista.first());
    }

    this.imprimeElementos = function() {
        texto = '(';
        nodoAtual = this.lista.first();
        while(nodoAtual != this.lista.trailer) {
            texto += '{ key: ' + nodoAtual.getElemento().getKey();
            texto += ', value: ' + nodoAtual.getElemento().getValue().id + '}';
            nodoAtual = nodoAtual.getNext();
            if(nodoAtual != this.trailer) {
                texto += ', \n';
            }
        }
        texto += ')';
        console.log(texto);
    }

    function compare(comparador, a, b) {
        return comparador.compare(a.getKey(), b.getKey());
    }

    /**
     * Verifica se nao ha alguma inconsistencia na chave
     */
    function checkKey(comparador, key) {
        try {
            return (comparador.compare(key, key)) == 0;
        } catch (error) {
            throw new Error('incompatibilidade de chave');
        }
    }

    function ComparadorInteiros() {
        this.compare = function(a, b) {
            if(a < b) {
                return -1;
            } else if(a == b) {
                return 0;
            } else {
                return 1;
            }
        }
    }

    /**
     * Fornece um meio para entrada chave valor
     */
    function PrioriryQueueEntry(key, value) {
        this.key   = key;
        this.value = value;
    
        this.setKey = function(key) {
            this.key = key;
        }
    
        this.getKey = function() {
            return this.key;
        }
    
        this.setValue = function(value) {
            this.value = value;
        }
    
        this.getValue = function() {
            return this.value;
        }
    }
}

