document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});

let grade = "100";

// switch(grade){
//     case "A":
//         console.log("Відмінно");
//         document.getElementById("result").textContent =" Відмінно";
//         break;
//     case "B":
//         console.log("Добре");
//         document.getElementById("result").textContent =" Добре";
//         break;
//     case "C":
//         console.log("Достатньо");
//         document.getElementById("result").textContent =" Достатньо";
//         break;
//     case "D":
//         console.log("Задовільно");
//         document.getElementById("result").textContent =" Задовільно";
//         break;
//     case "F":
//         console.log("Не задовільно");
//         document.getElementById("result").textContent =" Не задовільно";
//         break;
// default:
//     console.log(grade," - це не правильна оцінка");
//      document.getElementById("result").textContent =(grade+"- це не правильна оцінка");
//         break;
// }

switch(true){
    case grade>=90&& grade<=100:
        console.log("Відмінно");
        document.getElementById("result").textContent =" Відмінно";
        break;
    case grade>=80 && grade<90:
        console.log("Добре");
        document.getElementById("result").textContent =" Добре";
        break;
    case grade>=65 && grade<80:
        console.log("Достатньо");
        document.getElementById("result").textContent =" Достатньо";
        break;
    case grade>=50 && grade<65:
        console.log("Задовільно");
        document.getElementById("result").textContent =" Задовільно";
        break;
    case grade<50 && grade>=0:
        console.log("Не задовільно");
        document.getElementById("result").textContent =" Не задовільно";
        break;
default:
    console.log(grade," - це не правильна оцінка");
     document.getElementById("result").textContent =(grade+"- це не правильна оцінка");
        break;
}
