// //1 завдання


// function findMinMax(arr) {
//     if (!Array.isArray(arr) || arr.length === 0) {
//         return "Invalid input: provide a non-empty array of numbers.";
//     }

//     let min = Math.min(...arr);
//     let max = Math.max(...arr);

//     return { min, max };
// }

// // Приклад використання:
// let numbers = [10, 5, 8, 22, -3, 7];
// console.log(findMinMax(numbers)); 

// function compareObjects(obj1, obj2) {
//     let keys1 = Object.keys(obj1);
//     let keys2 = Object.keys(obj2);

//     if (keys1.length !== keys2.length) {
//         return false; 
//     }

//     for (let key of keys1) {
//         if (obj1[key] !== obj2[key]) {
//             return false; 
//         }
//     }

//     return true;
// }

// // Приклад використання:
// let objA = { name: "John", age: 30 };
// let objB = { name: "John", age: 30 };
// let objC = { name: "Alice", age: 25 };

// console.log(compareObjects(objA, objB)); 
// console.log(compareObjects(objA, objC)); 

// //2 завдання
// let num = prompt("Введіть число");
// if (num > 5 && num<20) {
//     alert( 'Число в діапазоні від 5 до 20' );
//   }else {
//     alert( 'Число не в діапазоні від 5 до 20' );
//   }



// let isActive = true;
// console.log("Початкове значення:", isActive); 

// isActive = !isActive;  
// console.log("Після першої зміни:", isActive); 

// isActive = !isActive; 
// console.log("Після другої зміни:", isActive);  // true

// function toggleState(currentState) {
//     return !currentState;
// }

// let status = false;
// console.log("Початковий статус:", status);    
// status = toggleState(status);
// console.log("Новий статус:", status);        

// let isLoading = true;
// if (!isLoading) {  
//     console.log("Завантаження завершено");
// } else {
//     console.log("Йде завантаження"); 
// }


// let lightsOn = false;
// let doorOpen = true;

// lightsOn = !lightsOn;
// doorOpen = !doorOpen; 

// console.log("Світло:", lightsOn);   
// console.log("Двері:", doorOpen);   


// let oci = Number(prompt("Введіть оцінку від 0 до 100"));
// function getGradeIf(grade) {
//     if (isNaN(grade) || grade < 0 || grade > 100) {
//         return "Некоректна оцінка. Введіть число від 0 до 100.";
//     } else if (grade < 50) {
//         return "Незадовільно";
//     } else if (grade >= 50 && grade <= 70) {
//         return "Задовільно";
//     } else if (grade > 70 && grade <= 90) {
//         return "Добре";
//     } else if (grade > 90 && grade <= 100) {
//         return "Відмінно";
//     }
// }
// let resultIf = getGradeIf(oci);
// alert(resultIf); 
// let ocin = Number(prompt("Введіть оцінку від 0 до 100"));
// function getGradeTernary(grade) {
//     return grade < 50 
//         ? "Незадовільно"
//         : (grade <= 70 
//             ? "Задовільно"
//             : (grade <= 90 
//                 ? "Добре"
//                 : (grade <= 100 
//                     ? "Відмінно"
//                     : "Некоректна оцінка")));
// }
// let resultTernary = getGradeTernary(ocin);
// alert(resultTernary); // Показуємо результат

let month = prompt("Введіть номер місяця"); // Removed extra parentheses

function monthselect(month) {
    // Convert string input to number and check validity
    month = Number(month);
    if (isNaN(month) || month < 1 || month > 12) { // Changed 0 to 1 since months are 1-12
        return "Некоректний місяць";
    } else if (month <= 2 || month === 12) { // Fixed winter condition (changed && to ||)
        return "Зима";
    } else if (month >= 3 && month <= 5) { // Spring - fixed condition
        return "Весна";
    } else if (month >= 6 && month <= 8) { // Summer - fixed range (was 5-8)
        return "Літо";
    } else if (month >= 9 && month <= 11) { // Autumn - was correct
        return "Осінь";
    }
}
let resultmonth = monthselect(month);
   
alert( resultmonth); 
