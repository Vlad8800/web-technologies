document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});

let username =" Vlad";
let phonenumber = " 8-800-555-35-35 ";
let nameLeng = username.length;
console.log(username.length);
console.log(username);

console.log(nameLeng);

console.log(username.charAt(2));

console.log(username.indexOf("a"));

console.log(username.lastIndexOf("a"));

username = username.trim();
console.log(username);

username = username.toUpperCase();
console.log(username);

username = username.toLowerCase();      
console.log(username);

console.log(phonenumber.replaceAll( "-",""));

