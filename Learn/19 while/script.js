document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});

let username ="1";
 while(username == "" || username == null){
    username =prompt("Enter your name ")
} 
 console.log("Hello " + username);
 alert ("Hello " +username)

//  while(1==1){
//     console.log("Help! Im stuck in a loop!")
//  }
let count =0;
while(count<=100){
    console.log(count);
    count=count+1;
}