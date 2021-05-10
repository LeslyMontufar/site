// console.log("tempo real")
// tipagem dinamica

// objetos ***********************

// let pessoa = {
//     nome: 'myname',
//     idade: 1
// };

// console.log(pessoa);

// // arrays ************************
// let familia = [true, 45, 'nome',17];
// console.log(familia.length);
// console.log(familia[2]);

// funcoes ***********************
// var coor = "azul";
// function greetThePlanet(){ //funcoes usa camelCase
//     return "amarelo";
// };
// console.log(greetThePlanet());
// // let str = greetThePlanet();
// // console.log(str);
// function square(number) { return number * number;};
// console.log(square(32));

// //operadores *********************
// // ===  igualdade estrita
// // == igualdade solta

// // tem condicional ternaria
// pontos = -1.2
// let tipo = Math.abs(pontos) > 1.1 ? "ganho" : "perdido";
// console.log(tipo)

// // switch () { case 1: break; case ... ; default: console.log('bla bla');}

// // laços ******************************
// for(let i=0; i<5; i++){console.log(i)}
// // while(){}
// // do{}while()
// const pessoa = {
//     nome: 'Nome',
//     idade: 25
// };
// for(let chave in pessoa){console.log(chave, pessoa[chave])};
// const cores = ['vermelho', 'azul', 'verde'];
// for(let cor of cores){console.log(cor)}

// Factory functions ************************ 
// construtor de objetos

// const celular = {
//     marcaCelular: 'ASUS',
//     tamanhoTela: {
//         vertical: 155,
//         horizontal: 75
//     },
//     capacidadeBateria: 5000,
//     ligar: function(){console.log('Ligando...')}
// }

// function criarCelular(marcaCelular, tamanhoTela, capacidadeBateria){
//     return {
//         marcaCelular,
//         tamanhoTela, 
//         capacidadeBateria,
//         ligar(){
//             console.log("Fazer ligação...")
//         }
//     }
// }

// const celular1 = criarCelular('Zenfone', 5.5,5000);
// console.log(celular1)

// Constructor functions **********************
//camelCase umDois
//Pascal Case UmDois

// function Celular(marcaCelular, tamanhoTela, capacidadeBateria){
//     this.marcaCelular = marcaCelular,
//     this.tamanhoTela = tamanhoTela,
//     this.capacidadeBateria = capacidadeBateria,
//     this.ligar = function(){console.log('Ligando')}
// }
// const celular = new Celular('huawei', 5.5, 5000);
// // new instancia/CRIA um novo objet
// console.log(celular)

// Natureza dinâmica de objetos *******************
// posso acrecentando atributos nos objetos
// const mouse = {
//     cor: 'red',
//     marcar: 'dazz'
// }
// delete mouse.cor;
// console.log(mouse)


// Clonando objetos ******************************

// const celular = {
//     marcaCelular: 'ASUS',
//     tamanhoTela: {
//         vertical: 155,
//         horizontal: 75
//     },
//     capacidadeBateria: 5000,
//     ligar: function(){console.log('Ligando...')}
// }

// const novoObjeto = Object.assign({usuario:'eu'},celular);
// console.log(novoObjeto);

// const objeto2 = {...celular}; // clonou o objeto celular
// console.log(objeto2);

// Math *******************************************
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math

// String *****************************************
// let m = '   mensagem oioioioi tudo bom mensagem';
// const obj = new String('bom dia');
// m = m.trim()
// console.log(obj.includes('om'));
// console.log(m.startsWith('men'));
// console.log(m.endsWith('agem'));
// console.log(m.indexOf('oi'));
// console.log(m.replace('mensagem', 'palavra'));
// console.log(m);
// outros: .split(' ')

// let str = '982';
// let numero = +str;
// console.log(typeof(str),typeof(numero)) // parecido com python print()

// https://www.w3schools.com/js/js_es6.asp
// https://www.luiztools.com.br/post/programacao-assincrona-em-nodejs-callbacks-e-promises/

// Template Literal ****************************
// const mensagem = 'oi essa eh a minha mensagem\n\'oioi\'';
// console.log(mensagem)
// const nome = 'Lesly'
// const m =
// 'oi tudo bom ${nome}\n'+
// 'mensage em string';

// console.log(m)
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String

// Date ********************************
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date

// Array ********************************
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array

// let numeros = [1,2,3,4,1,5];
// console.log(numeros.lastIndexOf(1))
// remover ultimo .pop()
// remover primeiro .shift()
// remover no meio .splice(2,1) // remove index=2 e só 1 item

//esvaziar array
// numeros = []
// numeros.length = 0

const primeiro = [1,2,3];
const segundo = [4,5,6];
let combinado = primeiro.concat(segundo);
console.log(combinado)

const dividido = combinado.slice(0,3); //copia referencia
console.log(dividido);

// Operador Spread (...) *********************** js ES6 
combinado = [...primeiro,'a',...segundo,'#'] // ... pega valor um por um do array
console.log(combinado)
const clonado = [...combinado];
console.log(clonado)

// Foreach ********************************** ES6 - n precisa digitar funciton..
combinado.forEach((numero, indice) => console.log(numero, indice));

const outroarray = combinado.join('.')
console.log(outroarray)
const array3 = outroarray.split('.')
console.log(array3)


// imteressante: *************************
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find
// const movimentos = [
//   {id:1, nome: 'posto avançado cavalo', pontos:0.6},  
//   {id:2, nome: 'ataque precipitado', pontos:-0.2}
// ];

//const movimento = movimentos.find(function(movimento){return movimento.pontos>=0});
// ou
//const movimento = movimentos.find((movimento)=>{return movimento.pontos>=0});
//ou
// const movimento = movimentos.find(movimento => movimento.pontos>=0); // se for return só um param
// console.log(movimento);

// Input *******************************
cor = prompt('Digite uma cor: ')
console.log('vc disse '+cor)

// DOM ****************
// DOM (Document Object Model) é uma interface que representa como os documentos HTML e XML são lidos pelo seu browser. Após o browser ler seu documento HTML, ele cria um objeto que faz uma representação estruturada do seu documento e define meios de como essa estrutura pode ser acessada. Nós podemos acessar e manipular o DOM com JavaScript, é a forma mais fácil e usada.
// https://tableless.com.br/entendendo-o-dom-document-object-model/
