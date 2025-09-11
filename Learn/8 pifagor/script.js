document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});
let a;
let b;
let c;

// a=window.prompt("Enter side a:");
// a=Number(a);

// b=window.prompt("Enter side b:");
// b=Number(b);

// c=Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
// console.log("Hypotenuse is: " + c);

document.getElementById('submitButton').onclick=function(){
    a=document.getElementById('aTextbox').value;
    a=Number(a);
    b=document.getElementById('bTextbox').value;
    b=Number(b);
    c=Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
    document.getElementById('cLabel').innerText="Side C: " + c;
}
