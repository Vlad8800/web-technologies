//завдання 1
let a = 0, b = 1, sum = 0, count = 0;
while (count <= 10) {
    sum += a;
    let temp = a + b;
    a = b;
    b = temp;
    count++;
}
console.log("Сума перших 10 чисел Фібоначчі:", sum);
//завдання 2
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

let summ = 0;
for (let i = 1; i <= 1000; i++) {
    if (isPrime(i)) {
        summ += i;
    }
}

console.log("Сума всіх простих чисел від 1 до 1000:", summ);
//завдання 3
let dayNumber = parseInt(prompt("Введіть число від 1 до 7:"));
let dayName;

switch (dayNumber) {
    case 1:
        dayName = "Понеділок";
        break;
    case 2:
        dayName = "Вівторок";
        break;
    case 3:
        dayName = "Середа";
        break;
    case 4:
        dayName = "Четвер";
        break;
    case 5:
        dayName = "П’ятниця";
        break;
    case 6:
        dayName = "Субота";
        break;
    case 7:
        dayName = "Неділя";
        break;
    default:
        dayName = "Некоректне число! Введіть від 1 до 7.";
}

alert(dayName);
//завдання 4
function filterOddLengthStrings(arr) {
    return arr.filter(str => str.length % 2 !== 0);
}

// Приклад використання
let strings = ["apple", "banana", "kiwi", "grape", "mango"];
let oddLengthStrings = filterOddLengthStrings(strings);
console.log("Рядки з непарною довжиною:", oddLengthStrings);
//завдання 5
const incrementArray = arr => arr.map(num => num + 1);

// Приклад використання
let numbers = [1, 2, 3, 4, 5];
let incrementedNumbers = incrementArray(numbers);
console.log("Масив із збільшеними значеннями:", incrementedNumbers);


//завдання 6
const checkSumOrDifference = (a, b) => (a + b === 10 || Math.abs(a - b) === 10);

// Приклад використання
console.log(checkSumOrDifference(7, 3)); // true
console.log(checkSumOrDifference(20, 10)); // true
console.log(checkSumOrDifference(5, 2)); // false