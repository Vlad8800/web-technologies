document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});
 
const PI = 3.14;
let radius;
let sicrumference;
radius= window.prompt("Enter radius of circle:");
radius=Number(radius);

//PI=13.14; // This will cause an error because PI is a constant

sicrumference=2*PI*radius;
console.log("Circumference is: " + sicrumference);