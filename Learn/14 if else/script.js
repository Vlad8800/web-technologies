document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});

let age = 65;

if(age >= 18 && age < 65){
    console.log("You are a adult");
} 
else if(age <0){    
    console.log("Age cannot be negative");
}
else if(age >=65){
    console.log("You are a senior");
}
else{
    console.log("You are a child");
}

let online = false;
if(online){ 
    console.log("You are online");
}
else{
    console.log("You are offline");
}
