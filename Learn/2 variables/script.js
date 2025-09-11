document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});
let Firstname = "Vlad";
let age;
age = 19;
let student;
student = true;


age = age + 1;
console.log(Firstname + " have a " + age + " years old. Im a student: " + student);
console.log(age);
console.log(student);


document.getElementById("p1").innerHTML = "Hello " + Firstname;
document.getElementById("p2").innerHTML = "I have a " + age + " years old.";
document.getElementById("p3").innerHTML = "I'm a student: " + student;