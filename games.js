// Definição das variáveis
var playerHeight, playerWidth, playerPosX, playerSpeed, playerPoints, playerImg;
var orangeImg, appleImg, pearImg, fruitPosX, fruitPosY, fruitSpeed, bombImg;
var collisionFlag, gameOver;

// Função que inicializa o jogo, carrega todos os recursos e seta o valor inicial das variáveis
function initialize(){
  // Seta a variável canvas para o canvas do HTML
  canvas = document.getElementById("stage");
  context = canvas.getContext("2d");

  // Cria e carrega todas as imagens do jogo
  orangeImg = new Image();
  orangeImg.src = 'Object/orange-games.png';
  appleImg = new Image();
  appleImg.src = 'Object/orange-games.png';
  pearImg = new Image();
  pearImg.src = 'Object/orange-games.png';
  bombImg = new Image();
  bombImg.src = 'Object/bomba-games.png';
  playerImg = new Image();
  playerImg.src ='Object/cesta-games.png';
 
  // Seta os valores iniciais para as variáveis do jogador
  playerHeight = 175;
  playerWidth  = 100;
  playerSpeed  = 20;
  playerPoints = 00;
  playerPosX   = (canvas.width/2)-(playerWidth/2);
 
  // Inicia os valores das flags do jogo
  collisionFlag = false;
  gameOver = false;
 
  // Inicia as variáveis necessárias das frutas
  fruitPosY = -50;
  fruitSpeed = 5;
  fruitPosX = canvas.width/2;
  fruitImg = orangeImg;

  // Desenha a cesta de frutas na tela na posição X e Y
  context.drawImage(playerImg, playerPosX, canvas.height-120);
 
  // Add eventos de teclado
  document.addEventListener("keydown", keyDown);
 
  // Chama o metodo gameLoop a cada 30 milissegundos
  loop = setInterval(gameLoop, 30);
}

// Função que controla as teclas pressionadas
function keyDown(key){
  if(key.keyCode == 37)
    if( playerPosX > 0 )
      playerPosX -= playerSpeed;
 
  if(key.keyCode == 39)
    if( playerPosX < (canvas.width - playerWidth) )
      playerPosX += playerSpeed;

  // Se o jogo ainda não terminou desenha a cesta de frutas na tela
  if( gameOver == false )
    context.drawImage(playerImg, playerPosX, canvas.height-120);
}

function gameLoop(){

  // Limpa o canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
 
  // Desenha a fruta e a cesta de frutas
  context.drawImage(fruitImg, fruitPosX, fruitPosY);
  context.drawImage(playerImg, playerPosX, canvas.height-120);

  // Se a fruta não chegou ao final da tela, ela continua 'caindo'
  if( fruitPosY <= canvas.height ){
    fruitPosY += fruitSpeed;
  // Senão ela reseta a posição e gera uma fruta ou bomba aleatória
  }else{
    fruitPosY = -50;
    fruitPosX = Math.random() * (canvas.width-50);
    collisionFlag = false;

    if( Math.floor((Math.random() * 4)) == 0 )
      fruitImg = bombImg;
    else if( Math.floor((Math.random() * 4)) == 1 )
      fruitImg = appleImg;
    else if( Math.floor((Math.random() * 4)) == 2 )
      fruitImg = pearImg;
    else if( Math.floor((Math.random() * 4)) == 3 )
      fruitImg = orangeImg;

  }
 
  // Testa se a fruta 'caiu' dentro do cesto, se sim, incrementa um ponto e seta a flag colisão como true
  if( ( fruitPosX > playerPosX && fruitPosX < (playerPosX+playerWidth) ) && 
      ( fruitPosY >= canvas.height-100) &&
      collisionFlag == false &&
      fruitImg != bombImg){
 
    playerPoints++;
    collisionFlag = true;
    // Senão, testa se o que colidiu era a bomba, da game over, e para o loop do jogo
  }else if( ( fruitPosX > playerPosX && fruitPosX < (playerPosX+playerWidth) ) && 
    ( fruitPosY >= canvas.height-playerHeight) &&
    collisionFlag == false &&
    fruitImg == bombImg){

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "80pt Arial";
    context.fillText("Game Over", (canvas.width/2)-250, 300, 500);
    gameOver = true;
    clearInterval(loop);

  }

  // Mostra os pontos do jogador na tela
  context.font = "32pt Arial";
  context.fillText(playerPoints+" fruits", canvas.width-140, 50, 100);
}