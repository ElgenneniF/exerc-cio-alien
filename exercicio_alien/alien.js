// define constantes com a largura e altura da tela
const larguraJogo = 700;
const alturaJogo = 850;

// define o tamanho da cena e oq faz parte dela
const config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,

    physics:{
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {y: 300}
        },
        
    },
    
   
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// criação de uma instancia
const game = new Phaser.Game(config);

//definindo as variaveis e constantes que serão usadas
var alien;
var teclado;
var fogo;
var tijolo;
var moeda ;
var pontuação = 0;
var placar;
var pedra;



function preload() {
    this.load.image('background', 'assets/bg.png');
    this.load.image('jogador', 'assets/alienigena.png');
    this.load.image('fogo', 'assets/turbo.png');
    this.load.image('tijolo', 'assets/tijolos.png');
    this.load.image('moeda', 'assets/moeda.png');
    this.load.image('pedra', 'assets/pedra.png')
}

function create() {
    
    teclado = this.input.keyboard.createCursorKeys(); 
   
    // adiciona a imagem de fundo
    this.add.image(larguraJogo/2, alturaJogo/2 + 82, 'background');
    //cria as fronteiras
    this.cameras.main.setBounds(0, 0, larguraJogo, 950)
    
    // cria o fogo
    fogo = this.add.sprite(0,0, 'fogo');
    fogo.setVisible(false); 
   
    //cria a plataforma
    tijolo = this.physics.add.staticImage(larguraJogo/2, alturaJogo/2, 'tijolo');

    //cria uma pedra
    pedra = this.physics.add.staticImage(larguraJogo/2, alturaJogo - 50, 'pedra').setSize(110,100).setScale(0.5);
    

    // adiciona o alien
    alien = this.physics.add.sprite(larguraJogo/2, 0, 'jogador');
    alien.setCollideWorldBounds(true);
    this.cameras.main.startFollow(alien);
    alien.body.setSize(90, 90, true)
    this.physics.add.collider(alien, tijolo);
    this.physics.add.collider(alien, pedra);
    alien.setBounce(0.1);

    //cria as moedas
    moeda = this.physics.add.sprite(10, 30, 'moeda');
    moeda.setVelocityX(100);
    this.physics.add.collider(tijolo, moeda);
    this.physics.add.collider(pedra, moeda);
    moeda.setCollideWorldBounds(true);
    moeda.setBounce(0.5);

    //placar e coletar as moedas
    placar = this.add.text(240, alturaJogo/2 + 30, 'Moedas:' + pontuação, {fontSize:'45px', fill:'#495613'});
    
    this.physics.add.overlap(alien, moeda, function(){
        moeda.setVisible(false);
        
        var posicaomoeda = Phaser.Math.RND.between(50, 600);
        moeda.setPosition(posicaomoeda, 50);

        var velocidademoeda = Phaser.Math.RND.between(-150, 150);
        moeda.setVelocityX(velocidademoeda);
        
        pontuação += 1;
        placar.setText('Moedas:' + pontuação);

        moeda.setVisible(true);

    });
   
   
    

   
  

}

function update() {
      //movimento do jogador, separei a movimentação dos eixos x e y para possibilitar a movimentação na diagonal
    if (teclado.left.isDown){
            alien.setVelocityX(-150);
        }
            else if (teclado.right.isDown){
            alien.setVelocityX(150);
        }
            else {
                
        }
    
        if (teclado.up.isDown){
            alien.setVelocityY(-200);
            ativarFogo()
        }
            else {  semFogo();
           
    }
    //deixa o fogo na posição dele
    fogo.setPosition(alien.x, alien.y + alien.height/2);
    



}
//funções que ativam ou desativam a visibilidade do fogo
function ativarFogo(){
    fogo.setVisible(true)
}

function semFogo(){
    fogo.setVisible(false)
}

