document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});

let x;;
let y=5;
let z=7;
let maximum;
let minimum;
// x=Math.round(x); // x will be 3
// console.log(x);
//x=Math.floor(x); // x will be 3
//console.log(x);
//  x=Math.ceil(x); // x will be 4
//  console.log(x);
// x=Math.pow(x,3); // x will be 3     
// x=Math.sqrt(x); // x will be 1.7320508075688772
// x=Math.abs(-x); // x will be 3.14
x=Math.PI; // x will be 3.14
maximum=Math.max(x,y,z); // maximum will be 7
minimum=Math.min(x,y,z);
console.log(maximum);
console.log(minimum);
console.log(x);