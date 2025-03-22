// Завдання 1
let fruits = ["банан", "яблуко", "апельсин", "груша", "виноград"];

// 1. Видаляємо останній елемент і виводимо оновлений масив
fruits.pop();
console.log("Масив після видалення останнього елемента:", fruits);

// 2. Додаємо "ананас" на початок масиву
fruits.unshift("ананас");
console.log("Масив після додавання ананаса:", fruits);

// 3. Сортуємо у зворотньому алфавітному порядку
fruits.sort((a, b) => b.localeCompare(a));
console.log("Масив у зворотньому алфавітному порядку:", fruits);

// 4. Знаходимо індекс "яблуко"
let appleIndex = fruits.indexOf("яблуко");
console.log("Індекс елемента 'яблуко':", appleIndex);

//Завдання 2
// 1. Створюємо масив кольорів
let colors = ["червоний", "синій", "жовтий", "зелений", "темно-синій", "фіолетовий"];

// 2. Знаходимо найдовший і найкоротший елементи
let longest = colors.reduce((a, b) => a.length > b.length ? a : b);
let shortest = colors.reduce((a, b) => a.length < b.length ? a : b);
console.log("Найдовший колір:", longest);
console.log("Найкоротший колір:", shortest);

// 3. Залишаємо тільки рядки, що містять "синій"
colors = colors.filter(color => color.includes("синій"));
console.log("Масив з кольорами, що містять 'синій':", colors);

// 4-5. Об'єднуємо елементи в рядок через кому та виводимо
let result = colors.join(", ");
console.log("Фінальний рядок:", result);

//Завдання 3
// 1. Створюємо масив об’єктів працівників
let employees = [
    { name: "Олег", age: 30, position: "розробник" },
    { name: "Анна", age: 25, position: "дизайнер" },
    { name: "Іван", age: 28, position: "розробник" },
    { name: "Марія", age: 35, position: "менеджер" }
];

// 2. Сортуємо за алфавітом за іменами
employees.sort((a, b) => a.name.localeCompare(b.name));
console.log("Відсортований масив за іменами:", employees);

// 3. Знаходимо всіх розробників
let developers = employees.filter(employee => employee.position === "розробник");
console.log("Розробники:", developers);

// 4. Видаляємо працівника за умовою (наприклад, вік > 30)
employees = employees.filter(employee => employee.age <= 30);
console.log("Масив після видалення працівників старше 30:", employees);

// 5. Додаємо нового працівника та виводимо оновлений масив
let newEmployee = { name: "Юлія", age: 27, position: "розробник" };
employees.push(newEmployee);
console.log("Оновлений масив з новим працівником:", employees);

//4 завдання

// 1. Створюємо масив об’єктів студентів
let students = [
    { name: "Олена", age: 20, course: 2 },
    { name: "Олексій", age: 19, course: 1 },
    { name: "Дмитро", age: 22, course: 3 },
    { name: "Софія", age: 21, course: 4 }
];

// 2. Видаляємо студента з ім’ям "Олексій"
students = students.filter(student => student.name !== "Олексій");
console.log("Масив після видалення Олексія:", students);

// 3. Додаємо нового студента
let newStudent = { name: "Марта", age: 18, course: 1 };
students.push(newStudent);
console.log("Масив з новим студентом:", students);

// 4. Сортуємо за віком від найстаршого до наймолодшого
students.sort((a, b) => b.age - a.age);
console.log("Відсортований масив за віком:", students);

// 5. Знаходимо студента на 3-му курсі
let thirdCourseStudent = students.find(student => student.course === 3);
console.log("Студент 3-го курсу:", thirdCourseStudent);

// 5 завдання
// 1. Створюємо масив чисел і підносимо до квадрату за допомогою map()
let numbers = [1, 2, 3, 4, 5];
let squaredNumbers = numbers.map(num => num * num);
console.log("Числа у квадраті:", squaredNumbers);

// 2. Отримуємо парні числа за допомогою filter()
let evenNumbers = squaredNumbers.filter(num => num % 2 === 0);
console.log("Парні числа:", evenNumbers);

// 3. Знаходимо суму всіх елементів за допомогою reduce()
let sum = squaredNumbers.reduce((acc, curr) => acc + curr, 0);
console.log("Сума всіх елементів:", sum);

// 4. Створюємо новий масив і об’єднуємо з початковим
let additionalNumbers = [6, 7, 8, 9, 10];
numbers = [...squaredNumbers, ...additionalNumbers];
console.log("Оновлений масив:", numbers);

// 5. Видаляємо перші 3 елементи за допомогою splice()
numbers.splice(0, 3);
console.log("Масив після видалення перших 3 елементів:", numbers);
//6 завдання
function libraryManagement() {
    // 1. Створюємо початковий масив книг
    let books = [
        { title: "Гаррі Поттер", author: "Дж. К. Ролінґ", genre: "Фентезі", pages: 400, isAvailable: true },
        { title: "1984", author: "Джордж Орвелл", genre: "Антиутопія", pages: 328, isAvailable: false },
        { title: "Intermezzo", author: "Михайло Коцюбинський", genre: "Містика", pages: 384, isAvailable: true },
        { title: "Тіні забутих предків", author: "Михайло Коцюбинський", genre: "Повість", pages: 150, isAvailable: true }
    ];

    // 2. Функція для додавання нової книги
    function addBook(title, author, genre, pages) {
        const newBook = { 
            title, 
            author, 
            genre, 
            pages, 
            isAvailable: true 
        };
        books.push(newBook);
        console.log(`Додано книгу: ${title}`);
    }

    // 3. Функція для видалення книги за назвою
    function removeBook(title) {
        books = books.filter(book => book.title !== title);
        console.log(`Видалено книгу: ${title}`);
    }

    // 4. Функція для пошуку книг за автором
    function findBooksByAuthor(author) {
        const foundBooks = books.filter(book => book.author === author);
        console.log(`Книги автора ${author}:`, foundBooks);
        return foundBooks;
    }

    // 5. Функція для зміни статусу доступності книги
    function toggleBookAvailability(title, isBorrowed) {
        const book = books.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
            console.log(`Статус книги ${title} змінено на ${book.isAvailable ? "доступна" : "взята"}`);
        } else {
            console.log(`Книга ${title} не знайдена`);
        }
    }

    // 6. Функція для сортування книг за кількістю сторінок
    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
        console.log("Відсортовані книги за кількістю сторінок:", books);
    }

    // 7. Функція для отримання статистики
    function getBooksStatistics() {
        const totalBooks = books.length;
        const availableBooks = books.filter(book => book.isAvailable).length;
        const borrowedBooks = totalBooks - availableBooks;
        const averagePages = totalBooks > 0 
            ? books.reduce((sum, book) => sum + book.pages, 0) / totalBooks 
            : 0;

        const stats = {
            totalBooks,
            availableBooks,
            borrowedBooks,
            averagePages: Number(averagePages.toFixed(2))
        };
        
        console.log("Статистика бібліотеки:", stats);
        return stats;
    }

    // Повертаємо об’єкт з усіма функціями для доступу ззовні
    return {
        addBook,
        removeBook,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooksStatistics,
        getBooks: () => books // Додаємо функцію для перегляду всіх книг
    };
}

// Приклад використання
const library = libraryManagement();

// Тестуємо всі функції
console.log("Початковий стан бібліотеки:", library.getBooks());
library.addBook("Дюна", "Френк Герберт", "Фантастика", 412);
library.removeBook("1984");
library.findBooksByAuthor("Михайло Коцюбинський");
library.toggleBookAvailability("Гаррі Поттер", true); // Беремо книгу
library.sortBooksByPages();
library.getBooksStatistics();
//7 завдання
// 1. Створюємо об’єкт студента
let student = {
    name: "Ірина",
    age: 20,
    course: 3
};

// 2. Додаємо властивість зі списком предметів
student.subjects = ["Математика", "Програмування", "Фізика", "Англійська"];

// 3. Видаляємо властивість "вік"
delete student.age;

// 4. Виводимо оновлений об’єкт у консоль
console.log("Оновлений об’єкт студента:", student);