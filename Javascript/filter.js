const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(numeros);
//o filter retorna o valor se a condição proposta render um True 
//const numerosFilter = numeros.filter(numero => { return numero % 2 === 0 });
const numerosFilter = numeros.filter(numero => numero % 2 === 0);
console.log(numerosFilter);