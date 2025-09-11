document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});
let count=0;
    let Button1= document.getElementById('incrementButton1');
    Button1.style.display="none";
document.getElementById('incrementButton').onclick=function(){
    count++;
    document.getElementById('countLabel').innerText=count;
}
document.getElementById('decrementButton').onclick=function(){
  
    document.getElementById('countLabel').innerText=count; 
    if(count<0){
        window.alert("недостатньо коштів");
    }
      count--;
}
document.getElementById('resetButton').onclick=function(){
    count=0;
   
    document.getElementById('countLabel').innerText=count;
}
document.getElementById('updateButton').onclick=function(){
    count=count-100;
    if(count<0){
        window.alert("недостатньо коштів");
        count=count+100;
        return;
    }
    let Button= document.getElementById('incrementButton');
    Button.style.display="none";
    let Button1= document.getElementById('incrementButton1');
    Button1.style.display="inline";
    
}
document.getElementById('incrementButton1').onclick=function(){
    count+=2;
    document.getElementById('countLabel').innerText=count;
}