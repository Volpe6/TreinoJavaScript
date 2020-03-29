var TELA = TELA || {};

TELA = {
    observadores: [],
    dado:{},
    tipoBusca: "",
    autualizaDados: function(dado) {
        this.dado = dado;
    },
    busca: async function(elemInical, elemMeta) {
        const solucao = await BUSCA[this.tipoBusca](elemInical, elemMeta);
        this.autualizaDados(solucao);
        this.notificaNodosSolucao();
    },
    anexar: function(observador) {
        this.observadores.push(observador);
    },
    notificaNodosVisitados: function() {
        for(let i = 0; i < this.observadores.length; i++) {
            let obser = this.observadores[i];
            obser.nodosVisitados(this.dado);
        }
    },
    notificaNodosAbertos: function() {
        for(let i = 0; i < this.observadores.length; i++) {
            let obser = this.observadores[i];
            obser.nodosAbertos(this.dado);
        }
    },
    notificaNodosSolucao: function() {
        for(let i = 0; i < this.observadores.length; i++) {
            let obser = this.observadores[i];
            obser.nodosSolucao(this.dado);
        }
    },
    notificaLimpaTela : function() {
        for(let i = 0; i < this.observadores.length; i++) {
            let obser = this.observadores[i];
            obser.limpo(this.dado);
        }
    }
}