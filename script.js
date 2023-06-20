const numero_moedas = 70;
const tempo_inicial = 10;
let pontos = 0;
let tempo = 0;
let timer = null;

let nome_da_pessoa = prompt ("Qual seu nome ?");
document.write("Oie " + nome_da_pessoa);

function criarElemento(pokemon, link){
  const container = document.getElementById("container"); 
  const name= document.createElement("p");
  const url= document.createElement("span");

  name.textContent = pokemon;
  url.textContent= link;

  container.appendChild(name);
  container.appendChild(url);

}

function iniciaJogo(){
pontos = 0;
tempo = tempo_inicial;
let tela = document.getElementById("tela");
tela.innerHTML = "";

for(let i = 0; i < numero_moedas; ++i){
 let moeda = document.createElement("img");
 moeda.src = "bell.svg";
 moeda.id = "j" + i;
 moeda.onclick = function(){
 pegaMoeda(this);
 }
 tela.appendChild(moeda);
}
timer = setInterval(contaTempo,1000);

  
fetch('http://localhost:5050/score')
.then(response => {
  if (!response.ok) {
    throw new Error('Erro na requisição'); 
  }
  return response.json();
})
.then(data => {
  const jogadores = data ;
  console.log(data);
  jogadores.forEach(jogador => {
    criarElemento(jogador.name, jogador.pontos);
  });
})
.catch(error => {
  console.log(error);
});

}

function pegaMoeda(moeda){
 moeda
 moeda.src = "bell-off.svg";
 ++pontos;
let contadorPontos = document.getElementById("pontos");
contadorPontos.innerText = pontos;
}
function contaTempo(){
 if(tempo > 0){
 --tempo;
 let contadorTempo = document.getElementById("tempo");
 contadorTempo.innerText = tempo;
 
 return contaTempo = null;
 }
 if(tempo <= 0){
 clearInterval(timer);
 
 let pontuacao = {
  name: nome_da_pessoa,
  pontos: pontos
}

fetch('http://localhost:5050/score', {
  method: "POST",
  body: JSON.stringify(pontuacao),
  headers: {"Content-type":"application/json; charset=UTF-8"}
})
.then(response => response.json())
.then(json => console.log(json))
.catch(error => console.log(error))

 alert("você fez " + pontos + " pontos, parabéns!");
 iniciaJogo();
 }
}
