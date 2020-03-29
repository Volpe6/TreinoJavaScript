var Heap = Heap || {};

/**
 * Em desenvolvimento
 */
Heap = function() {
    const FRONT = 1;

    this.elementos = [];
    this.size      = 0;

    this.parent = function(pos) {
        return pos/2;
    }

    this.leftChild = function(pos) {
        return (2 * pos);
    }

    this.rigthChild = function(pos) {
        return (2 * pos) + 1;
    }

    this.isLeaf = function(pos) {
        if(pos >= (this.size/2) && pos <= this.size) {
            return true;
        }
        return false;
    }

    this.troca = function(fpos, spos) {
        temp = this.elementos[fpos];
        this.elementos[fpos] = this.elementos[spos];
        this.elementos[spos] = temp;
    }

    this.minHeapify = function(pos) {
        if(!this.isLeaf(pos)) {
            if(this.elementos[pos] > this.elementos[this.leftChild(pos)] ||
               this.elementos[pos] > this.elementos[this.rigthChild(pos)]) {
                   
                if(this.elementos[this.leftChild(pos)] < this.elementos[this.rigthChild(pos)]) {
                    this.troca(pos, this.leftChild(pos));
                    this.minHeapify(this.leftChild(pos));
                } else {
                    this.troca(pos, rigthChild(pos));
                    minHeapify(rigthChild(pos));
                }
            }
        }
    }

    this.insert = function(elem) {
        this.elementos[++this.size] = elem;
        atual = this.size;


        while(this.elementos[atual] < this.elementos[this.parent(atual)]) {
            this.troca(atual, this.parent(atual));
            atual = this.parent(atual);
        }
    }

    this.minHeap = function() {
        for(let pos = (size/2); pos >= 1; pos--) {
            minHeapify(pos);
        }
    }

    this.remove = function() {
        popped = this.elementos[FRONT];
        this.elementos[FRONT] = this.elementos[this.size--];
        minHeapify(FRONT);
        return popped;
    }

}