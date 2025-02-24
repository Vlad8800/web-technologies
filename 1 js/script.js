// Виведення "Hello world!" у заголовок <h1>
document.getElementById("message").textContent = "Hello world!";

// Отримання всіх <li> через querySelectorAll
const listItems = document.querySelectorAll("ul li");

// Виведення "Hello world!" у кожен <li> через JS
listItems.forEach(item => {
    item.textContent = "Hello world!";
});

// Додавання події ondblclick до кнопки
document.getElementById("myButton").ondblclick = function() {
    listItems.forEach(item => {
        console.log("Елемент:", item.textContent);
    });

    // Виведення імені студента в консоль як error
    console.error("Сусла Владислав");
};
