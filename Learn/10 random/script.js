document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});
let x;
let y;
let z;

// console.log(x);
// console.log(y);
// console.log(z);

document.getElementById("rollbtn").onclick=function(){
     x =Math.floor(Math.random() *6)+1;
     y =Math.floor(Math.random() *6)+1;
     z =Math.floor(Math.random() *6)+1;

     document.getElementById("xlabel").innerText=x;
     document.getElementById("ylabel").innerText=y;
     document.getElementById("zlabel").innerText=z; 
}