document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});

let temp =20;
let sunny = true;

if(temp>0 && temp<=30 && sunny == true){
    console.log("The weather is good");
}
else{
    console.log("The weather is bad");
}
if(temp<=0 || temp>=30){
    console.log("The weather is bad");
}
else{
    console.log("The weather is good");
}