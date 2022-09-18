//variáveis da bolinha

let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;

//velocidade da bolinha

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;
let raio = diametro / 2;

let colidiu = false

//Placar 

let meusPontos = 0;
let pontoDoOponente = 0;

//Raquete

let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;  

//RaqueteOponente

let xRaqueteOponente =585;
let yRaqueteOponente =150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//Sons do jogo

let trilha;
let raquetada;
let ponto;

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3")
}
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}
function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificarBorda();
  Raquete(xRaquete,yRaquete);
  movimentoRaquete();
  Raquete(xRaqueteOponente,yRaqueteOponente);
  verificaColisaoRaquete(xRaquete, yRaquete);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  }
function mostraBolinha(){
  circle (xBolinha,yBolinha,diametro); 
}
function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}
function verificarBorda (){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0)
    velocidadeXBolinha *=-1;
  
  if (yBolinha + raio > height || 
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1; 
} 
}
function Raquete(x,y){ 
rect (x,y,comprimentoRaquete,alturaRaquete);
}

function movimentoRaquete(){
  if(keyIsDown(UP_ARROW) )
    yRaquete -= 10;
  if(keyIsDown(DOWN_ARROW) )
    yRaquete += 10;
}
function verificaColisaoRaquete( x, y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
    if (colidiu) {velocidadeXBolinha *= -1;
        raquetada.play();
          }
        } 
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - comprimentoRaquete / 2 - 60;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar();
}
function calculaChanceDeErrar() {
  if (pontoDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
function incluirPlacar(){
  
  stroke (255);
  textAlign (CENTER);
  textSize(16);
  fill (color(255, 140, 0));
  rect (200, 10, 40, 20);
  fill(255);
  text(meusPontos,220 , 26);
  fill (color(255, 140, 0));
  rect (400, 10, 40, 20);
  fill(255);
  text(pontoDoOponente, 420 , 26);
}
function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontoDoOponente += 1;
    ponto.play();
  }
}