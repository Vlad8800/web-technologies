document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});

let fullName = "Vladyslav Susla";
let firstName;
let lastName;
// firstName = fullName.slice(0,9);
// console.log(firstName);
// lastName = fullName.slice(10);
// console.log(lastName);

firstName = fullName.slice(0, fullName.indexOf(" "));
lastName = fullName.slice(fullName.indexOf(" ")+1);

console.log(firstName);
console.log(lastName);


