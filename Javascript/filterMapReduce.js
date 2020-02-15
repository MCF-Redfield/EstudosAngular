//A soma do dobro de todos números ímpares

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const total = numeros.filter(numero => numero % 2 !== 0)
    .map(numero => numero * 2)
    .reduce((acumulador, valor, indice, array) => { return acumulador += valor }, 0);

console.log(total);