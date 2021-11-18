var Desenho = Desenho || {};

Desenho = function(context) {
    this.context = context;

    this.circuloPreenchido = function(posX, posY, raio, cor) {
        this.context.beginPath();
        this.context.lineWidth   = "1";
        this.context.fillStyle   = 'white';
        this.context.strokeStyle = cor;
        // ctx.strokeStyle = "blue";
        this.context.arc(posX, posY, raio, 0, 2 * Math.PI);
        this.context.fill();
    }

    this.circuloVazio = function(posX, posY, raio, cor) {
        this.context.beginPath();
        this.context.lineWidth   = "1";
        this.context.strokeStyle = cor;
        // ctx.strokeStyle = "blue";
        this.context.arc(posX, posY, raio, 0, 2 * Math.PI);
        this.context.stroke();
    }
    
    this.retangulo = function(posX, posY, largura, altura, cor) {
        this.context.beginPath();
        this.context.lineWidth = "0.1";
        this.context.fillStyle = cor;
        this.context.rect(posX, posY, largura, altura);
        this.context.stroke();
    }

    this.texto = function(posX, posY, texto, cor, fonte) {
        this.context.beginPath();
        this.context.font = fonte + "px Arial";
        this.context.fillStyle = cor;
        this.context.fillText(texto, posX, posY);
    }

    this.linha = function(oX, oY, dX, dY, cor) {
        this.context.beginPath();
        this.context.fillStyle = cor;
        this.context.moveTo(oX, oY);
        this.context.lineTo(dX, dY);
        this.context.stroke();
    }
}