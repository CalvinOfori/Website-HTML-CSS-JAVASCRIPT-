const textbox = document.getElementById("textbox");
const fahrenheit= document.getElementById("toFahrenheit");
const celsius = document.getElementById("toCelsius");
const displaytemp = document.getElementById("displaytemp");

let temp;

function coversion(){
    if(fahrenheit.checked){
        temp = Number(textbox.value);
        temp = temp * 9/5 + 32;
        displaytemp.textContent = temp.toFixed(1) + "F";
    }
    else if(celsius.checked){
        temp = Number(textbox.value);
        temp = (temp - 32) * (5/9);
        displaytemp.textContent = temp.toFixed(1) + "C";
    }
    else{
        displaytemp.textContent = "Select a unit";
    }
}
