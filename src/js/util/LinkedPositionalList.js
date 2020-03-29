var LinkedPositionalList = LinkedPositionalList || {};

LinkedPositionalList = function() {
    this.tamanho = 0;
    this.header  = new NodoPosicao(null, null, null);//cabeça da lista aponta para o primeiro elemento da lista
    this.trailer = new NodoPosicao(null, this.header, null);//cauda da lista aponta para o ultimo elemento da lista
    this.header.setNext(this.trailer);


    /**
     * Verifica se o elemento ainda esta na lista
     */
    this.validate = function(nodo) {
        if(nodo.getNext() == null) {
            throw new Error('elemento não se encontra mais na lista');
        }
        return nodo;
    }

    /**
     * Verifica se o nodo eh a cabeça ou a cauda
     */
    this.position = function(nodo) {
        if(nodo == this.header || nodo == this.trailer) {
            return null;
        }
        return nodo;
    }

    /**
     * Retorna o tamanho da lista
     */
    this.size = function() {
        return this.tamanho;
    }

    this.isEmpty = function() {
        return this.size() == 0;
    }

    /**
     * Retorna o primeiro elemento da lista. 
     * Caso o nodo seja o header ou o trailer, retorna null
     */
    this.first = function() {
        return this.position(this.header.getNext());
    }

    /**
     * retorna o ultimo elemento da lista.
     *  Caso o nodo seja o header ou o trailer, retorna null
     */
    this.last = function() {
        return this.position(this.trailer.getPrev());
    }

    /**
     * Retorna o nodo anterior ao nodo informado. 
     * Caso o nodo seja o header ou o trailer, retorna null
     */
    this.before = function(nodo) {
        nodo = this.validate(nodo);
        return this.position(nodo.getPrev());
    }

    /**
     * Retorna o proximo nodo ao nodo informado. 
     * Caso o nodo seja o header ou o trailer, retorna null
     */
    this.after = function(nodo) {
        nodo = this.validate(nodo);
        return this.position(nodo.getNext());
    }

    /**
     * Adiciona um novo elemento entre dois nodos informados. 
     * Retorna o novo nodo criado
     */
    this.addBetween = function(elem, nPred, nSucs) {
        novoElem = new NodoPosicao(elem, nPred, nSucs);
        nPred.setNext(novoElem);
        nSucs.setPrev(novoElem);
        this.tamanho++;
        return novoElem;
    }

    /**
     * Adiciona um novo elemento na primeira posicao. 
     * Retorna o novo nodo criado
     */
    this.addFirst = function(elem) {
        return this.addBetween(elem, this.header, this.header.getNext());
    }

    /**
     * Adiciona um novo elemento na primeira posicao. 
     * Retorna o novo nodo criado
     */
    this.addLast = function(elem) {
        return this.addBetween(elem, this.trailer.getPrev(), this.trailer);
    }

    /**
     * Adiciona um novo elemento depois do nodo informado.
     * Retorna o novo nodo criado
     */
    this.addAfter = function(nodo, elem) {
        nodo = this.validate(nodo);
        return this.addBetween(elem, nodo, nodo.getNext());
    }

    /**
     * Adiciona um novo antes depois do nodo informado.
     * Retorna o novo nodo criado
     */
    this.addBefore = function(nodo, elem) {
        nodo = this.validate(nodo);
        return this.addBetween(elem, nodo.getPrev(), nodo);
    }

    /**
     * Muda o elemento do nodo informado.
     * Retorna o antigo elemento que o nodo possuia
     */
    this.setElementNode = function(nodo, elem) {
        nodo = this.validate(nodo);
        elemAnt = nodo.getElemento();//elemento que o nodo continha
        nodo.setElemento(elem);
        return elemAnt;
    }

    this.remove = function(nodo) {
        nodo = this.validate(nodo);
        pred = nodo.getPrev();
        sucs = nodo.getNext();

        pred.setNext(sucs);
        sucs.setPrev(pred);
        this.tamanho--;

        elem = nodo.getElemento();
        nodo.setElemento(null);
        nodo.setPrev(null);
        nodo.setNext(null);
        return elem;
    }

    this.imprimeElementos = function() {
        texto = '(';
        nodoAtual = this.header.getNext();
        while(nodoAtual != this.trailer) {
            texto += nodoAtual.getElemento();
            nodoAtual = nodoAtual.getNext();
            if(nodoAtual != this.trailer) {
                texto += ', ';
            }
        }
        texto += ')';
        console.log(texto);
    }

    function NodoPosicao(elem, nPrev, nNext) {
        this.elem = elem;
        this.prev = nPrev;
        this.next = nNext;
    
        this.setElemento = function(elem) {
            this.elem = elem;
        }
    
        /**
         * Retorna o elemento contido no nodo
         */
        this.getElemento = function() {
            //verificacao necessaria pois caso o elemento nao se encontre mais na lista, ele nao
            //tera sucessor, ja que ao menos sempre sera apontado para trailer
            if(this.next == null) {
                throw new Error('Este elemento não é mais valido');
            }
            return this.elem
        }
    
        /**
         * Define o nodo anterior a este
         */
        this.setPrev = function(elem) {
            this.prev = elem;
        }
    
        /**
         * Retorna o nodo anterior a este
         */
        this.getPrev = function() {
            return this.prev;
        }
    
        /**
         * Define o nodo depois deste
         */
        this.setNext = function(elem) {
            this.next = elem;
        }
    
        /**
         * Retorna o nodo depois deste
         */
        this.getNext = function() {
            return this.next;
        }
    }
}
