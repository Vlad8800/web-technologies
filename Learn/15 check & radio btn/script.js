document.getElementById('myBtn').addEventListener('click', function() {
    alert('Button clicked!');
});

// document.getElementById("myButton").onclick = function() {

//      if(document.getElementById("myCheck").checked == true){
//         document.getElementById("myText").textContent = "Checked";
//         console.log("Checked");
//      }else{
//         document.getElementById("myText").textContent = "Not Checked";
//         console.log("Not Checked");
//      }
// };
document.getElementById("myButton").onclick = function() {
const myCheckbox=document.getElementById("myCheck");
const visaBtn =document.getElementById("visaBtn");
const mastercardBtn=document.getElementById("mastercardBtn");
if(myCheckbox.checked){
    document.getElementById("myText").textContent = "Checked";
    console.log("Checked");
}
else{
    document.getElementById("myText").textContent = "Not Checked";
    console.log("Not Checked");
}
if(visaBtn.checked){
    console.log("You selected Visa");
    document.getElementById("myCard").textContent = "Your card: Visa";
        console.log("Your card: Visa");
}
else if(mastercardBtn.checked){
    console.log("You selected Mastercard");
        document.getElementById("myCard").textContent = "Your card: Mastercard";
            console.log("Your card: Mastercard");
}else{
    document.getElementById("myCard").textContent = "You don't select a card";
} console.log("You don't select a card");
};
