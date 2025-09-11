document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});
// let username = window.prompt('Enter your name:');
// console.log('Hello, ' + username + '!');
document.getElementById('btn').onclick= function(){
    username=document.getElementById('text').value;
    console.log('Hello, ' + username + '!');
    document.getElementById('mylabel').innerText='Hello, ' + username + '!';
}