
//Name field focus state when page loads
const nameEle = document.getElementById("name");
nameEle.focus();

const jobRoleSelect = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");

//Use the "Other job role" variable to hide this element by default
otherJobRole.style.display = "none";

//Use the variable for the "Job role" menu to listen for the change event on this element. Hide Other text box until Other Job role is selected out of the available option values for the job role section dropdown
jobRoleSelect.addEventListener("change", ()=>{
    console.log(jobRoleSelect);
        if (jobRoleSelect.value === "other"){
            otherJobRole.style.display = "block";
        } else {
            otherJobRole.style.display = "none";
        }
    });

//Display the color element, program the design element to listen for user changes and detect when
const color = document.getElementById("color");
color.disabled = true;

// after clicking on the field. Both the color field AND drop down menu must correctly update when the user
const design = document.getElementById("design");
const optionColor = color.children;


//used code from https://stackoverflow.com/questions/24359879/change-option-in-select-drop-down-using-javascript 
//to figure out how to update default dropdown to design-related default
//use the variable for design or theme menu to listen for the change even on this element
design.addEventListener("change", (e)=>{
    color.disabled = false;
    for(let i=0; i < optionColor.length; i++){
    const colorValue = e.target.value;
    const colorTheme = optionColor[i].getAttribute("data-theme");
        if (colorValue === colorTheme){
            optionColor[i].hidden = false;
            optionColor[i].setAttribute("selected", true);
            color.getElementsByTagName("option")[i].selected = true;

        } else if (colorValue !== colorTheme) {
            optionColor[i].hidden = true;
            optionColor[i].setAttribute("selected", false);
            console.log(colorTheme);
        }
    }
});



//If activity is checked, the total cost should increase by the value of the data cost attribute
//If unchecked, the total cost decreases by the value of the data cost attribute
//using code from stackoverflow: https://stackoverflow.com/questions/42017798/javascript-how-do-i-add-cost

let activity = document.getElementById("activities");
let cart = document.getElementById("activities-cost");
let totalCart = 0

activity.addEventListener("change", (e)=>{
    let costUpdate = e.target.getAttribute("data-cost");
    costUpdate =+costUpdate;
if(e.target.checked){
    totalCart += costUpdate;
    cart.innerHTML = `Total: $${totalCart}`
}else{
    totalCart -= costUpdate;
    cart.innerHTML = `Total: $${totalCart}`
}
})

//Payment method - PayPal and bitCoin start hidden. Credit Card selection is defaulted to first option
//When payment method is selected - all other non-associated payment options hide and selected method displays

const payMeth = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const payPal = document.getElementById("paypal");
const bitCoin = document.getElementById("bitcoin");

payPal.style.display = 'none';
bitCoin.style.display = 'none';

payMeth.children.item(1).setAttribute("selected", "select");

payMeth.addEventListener("change", (e)=>{
if(e.target.value === "paypal"){
    payPal.style.display = "block";
    bitCoin.style.display = "none";
    creditCard.style.display = "none";
};
if (e.target.value === "bitcoin"){
    payPal.style.display = "none";
    bitCoin.style.display = "block";
    creditCard.style.display = "none";
};

if (e.target.value === "credit-card"){
    payPal.style.display = "none";
    bitCoin.style.display = "none";
    creditCard.style.display = "block";
}
});

//Form Validation 
const email = document.getElementById("email");
const form = document.querySelector("form");
const checkBoxes = document.querySelectorAll("input[type=checkbox]");

//name validation
form.addEventListener("submit", (e)=>{
const nameValue = nameEle.value
const nameRegex = /[a-zA-Z0-9]$/
const nameTest = nameRegex.test(nameValue);
if(nameTest === false){
    e.preventDefault();
    nameEle.parentNode.classList.add("not-valid");
    nameEle.parentNode.classList.remove("valid");
    nameEle.lastElementChild;
    document.querySelector("#name-hint").style.display = "block";
} 

if(nameTest === true){
    nameEle.parentNode.classList.remove("not-valid");
    nameEle.parentNode.classList.add("valid");
    document.querySelector("#name-hint").style.display = "none";
}

//email validation
const emailValue = email.value
const emailRegex = /[^@]+@[^@.]+\.[a-z]+$/i;
const emailTest = emailRegex.test(emailValue);

if(emailTest === false){
    e.preventDefault();
    email.parentNode.classList.add("not-valid");
    email.parentNode.classList.remove("valid");
    document.querySelector("#email-hint").style.display = "block";
} 

if(emailTest === true){
    email.parentNode.classList.remove("not-valid");
    email.parentNode.classList.add("valid");
    document.querySelector("#email-hint").style.display = "none";
}

//activities validation
let activities = [];
let activ = document.getElementById("activities-box")


for (i=0; i < checkBoxes.length; i++){
    activities += checkBoxes[i].checked;
}


if (activities.includes(true)){
    activ.parentNode.classList.remove("not-valid");
    activ.parentNode.classList.add("valid");
    document.querySelector("#activities-hint").style.display = "none";
} 

if (activities.includes(true) === false){
    e.preventDefault();
    activ.parentNode.classList.add("not-valid");
    activ.parentNode.classList.remove("valid");
    document.querySelector("#activities-hint").style.display = "block";
}

if (payMeth.value === "credit-card" ) {
    const cardNumber = document.getElementById("cc-num");
    const zipCode = document.getElementById("zip");
    const cvv = document.getElementById("cvv");
    
    //credit card validation
    const ccVal = cardNumber.value
    const ccRegex = /\d{13,16}?$/;
    const ccTest = ccRegex.test(ccVal);
    
    if(ccTest === false){
        e.preventDefault();
        cardNumber.parentNode.classList.add("not-valid");
        cardNumber.parentNode.classList.add("valid");
        document.querySelector("#cc-hint").style.display = "block";
    }
    
    if(ccTest === true){
        cardNumber.parentNode.classList.remove("not-valid");
        cardNumber.parentNode.classList.add("valid");
        document.querySelector("#cc-hint").style.display = "none";
    }
    
    //zip code validation
    
    const zipVal = zipCode.value
    const zipRegex = /^\d{5}?$/;
    const zipTest = zipRegex.test(zipVal);
    
    if(zipTest === false){
        e.preventDefault();
        zipCode.parentNode.classList.add("not-valid");
        zipCode.parentNode.classList.remove("valid");
        document.querySelector("#zip-hint").style.display = "block";
    }
    
    if(zipTest === true){
        zipCode.parentNode.classList.remove("not-valid");
        zipCode.parentNode.classList.add("valid");
        document.querySelector("#zip-hint").style.display = "none";
    }
    
    //cvv validation
    
    const cvvVal = cvv.value
    const cvvRegex = /^\d{3,4}?$/;
    const cvvTest = cvvRegex.test(cvvVal);
    const cvvHint = document.getElementById("cvv-hint");
    
    if(cvvTest === false){
        e.preventDefault();
        cvv.parentNode.classList.add("not-valid");
        cvv.parentNode.classList.remove("valid");
        document.querySelector("#cvv-hint").style.display = "block";
    }
    
    if(cvvTest === true){
        cvv.parentNode.classList.remove("not-valid");
        cvv.parentNode.classList.add("valid");
        document.querySelector("#cvv-hint").style.display = "none";
    }
} 
}
)

//Accessibility - focus and blur on activities
const activityCheckbox = document.querySelectorAll('input[type=checkbox]');

for(i=0; i < activityCheckbox.length; i++){
    activityCheckbox[i].addEventListener("focus",(e)=>{
        e.target.parentElement.classList.add("focus");
    });
    activityCheckbox[i].addEventListener("blur",(e)=>{
        e.target.parentNode.classList.remove("focus");
    });
};
