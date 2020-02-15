const letras = ['a', 'b', 'c', 'd', 'e'];
console.log(letras);
//(índice onde começar a remover; qtde de elems a remover)(a função remove os elementos e os retornam)
const removed = letras.splice(2, 2);
letras.splice(2, 0, 'f');
console.log(letras);
console.log(removed);

const numeros = [1, 2, 3]
console.log(...letras, ...numeros);