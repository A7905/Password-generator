const dataSlider=document.querySelector("[dataSlider]");
const datalengthNumber=document.querySelector("[datalengthNumber]");
const displayPassword=document.querySelector(".display");
const copyBtnMsg=document.querySelector("[data-copiedMsg]");
const copybtn=document.querySelector("[data-copy]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const specialCharacter=document.querySelector("#special-character");
const numbersCheck=document.querySelector("#numbers");
var indicator = document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generatePassword");
const checkboxes=document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

var Password="";
var Passlength=10;
let checkCount=0;
handleSlider();
setIndicator("#ccc");


function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


function handleSlider(){
    dataSlider.value=Passlength;
    datalengthNumber.innerText=Passlength;
    const minn=dataSlider.min;
    const maxx=dataSlider.max;
    dataSlider.style.backgroundSize=((Passlength-minn)*100/(maxx-minn)+"% 100%");
}


function setInteger(color){
    indicator.style.backgroundColor=color;
    // shadow
    indicator.style.boxShadow="10px 10px 5px ligthblue";
}


function getRmdInt(min,max){
   return Math.floor(Math.random()*(max-min))+ min
}


function getRandomNum(){
    return getRmdInt(0,9);
}


function generateLowercase(){
    return String.fromCharCode(getRmdInt(97,123));
}


function generateUppercase(){
    return String.fromCharCode(getRmdInt(65,90));
}

function generateSymbols(){
 const RmdNum=getRmdInt(0,symbols.length);
 return symbols.charAt(RmdNum);
}


function calculateStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (specialCharacter.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && Passlength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await  navigator.clipboard.writeText(displayPassword.value);
        copyBtnMsg.innerText="Copied";
    }
    catch (e){
        copyBtnMsg.innerText="Failed";
    }
   copyBtnMsg.classList.add("active");
   setTimeout(()=>{
    copyBtnMsg.classList.remove("active");
   },2000)
}



function shufflePassword(array){
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * (currentIndex+1));
        currentIndex--; 

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    let str="";
    array.forEach((e)=>{
        str+=e
    });
    return str;
}
// console.log("shuffle password working....");
function handleCheckboxChange(){
    checkCount=0
    checkboxes.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;

    });

    if(Passlength<checkCount){
        Passlength=checkCount;
        handleSlider();
    }
}



checkboxes.forEach((checkbox)=>{
    checkbox.addEventListener("change",handleCheckboxChange);
})

dataSlider.addEventListener('input',(e)=>{
    Passlength=e.target.value;
    handleSlider();
});

copybtn.addEventListener("click",()=>{
    if(displayPassword.value){
        copyContent();
    }
});




generatebtn.addEventListener('click',()=>{
    console.log('Before generating password:', displayPassword.value);
    // console.log("1. an start");
    if(checkCount==0) return;

    
    // console.log("2. working!");
    if(Passlength < checkCount) {
        Passlength = checkCount;
        handleSlider();
    }
    // console.log("3. working!");
    // Empty karo password ko
    Password="";
    // check what all boxes are checked
    let Arr=[];

    if(uppercaseCheck.checked){
        Arr.push(generateUppercase);
    }
    
    if(lowercaseCheck.checked){
        Arr.push(generateLowercase);
    }
    if(numbersCheck.checked){
        Arr.push(getRandomNum);
    }
    if(specialCharacter.checked){
        Arr.push(generateSymbols);
    }
    // console.log("all working!");

    // compulsory Addition
    for (let i=0; i<Arr.length; i++){
        Password+=Arr[i]();
    }
    // console.log("compulsory addition done!");
    // remaining addition

    for (let i=0; i<Passlength-Arr.length; i++){
        let RmdInd=getRmdInt(0,Arr.length);
        Password+=Arr[RmdInd]();  
    }
    // console.log("remaining addition done");
    // shuffle the password
    Password=shufflePassword(Array.from(Password));
    // console.log("shuffling done");
    // Display karana hai
    displayPassword.value=Password;
    // console.log("showing..");
    // caculate Strength

    calculateStrength();
    console.log('After generating password:', displayPassword.value);
    
})




