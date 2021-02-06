myArray = [1, 2, 3];

arrayPorDos = myArray.map((x) => x * 2);
arrayFiltrado = myArray.filter((el) => el >= 2);
arraySumado = myArray.reduce((accumulator, item) => accumulator + item);

console.log(arrayPorDos);
console.log(arrayFiltrado);
console.log(arraySumado);
