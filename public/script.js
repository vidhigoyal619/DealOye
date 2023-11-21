// --------------------- js code for login/signup form----------------------------------
let signupbtn = document.getElementById("signupbtn");
let loginbtn = document.getElementById("loginbtn");
let namefield = document.getElementById("name-field");
let phonefield = document.getElementById("phone-field");
let confirmfield = document.getElementById("confirm-field");
let title = document.getElementById("title");

loginbtn.onclick = function(){
    namefield.style.maxHeight= "0";
    phonefield.style.maxHeight= "0";
    confirmfield.style.maxHeight= "0";
    title.innerHTML = "Login";
    signupbtn.classList.add("disable");
    loginbtn.classList.remove("disable");
}
signupbtn.onclick = function(){
    namefield.style.maxHeight= "60px";
    phonefield.style.maxHeight= "60px";
    confirmfield.style.maxHeight= "60px";
    title.innerHTML = "Sign Up";
    signupbtn.classList.remove("disable");
    loginbtn.classList.add("disable");
}

//------------------------------js code for signup to otp page redirection-----------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if all input fields are filled
    function areFieldsFilled() {
        var inputFields = document.querySelectorAll('.input-field input');
        return Array.from(inputFields).every(function(input) {
            return input.value.trim() !== '';
        });
    }

    // Function to handle the signup button click
    function signupHandler() {
        if (areFieldsFilled()) {
            // Redirect to OTP page only if all fields are filled
            window.location.href = 'otp.html';
        } else {
            // Show an alert if any field is not filled
            alert('Please fill in all the required fields.');
        }
    }

    // Get the signup button element
    var signupButton = document.getElementById('signupbtn');

    // Attach a click event listener to the signup button
    signupButton.addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Call the signupHandler function
        signupHandler();
    });
});

// --------------------js code for loginbutton---------------------
document.addEventListener('DOMContentLoaded', function() {
    // Attach a click event listener to the login button
    var loginButton = document.getElementById('loginbtn');
    loginButton.addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the values of input fields
        var username = document.getElementById('email-field').value.trim();
        var password = document.getElementById('password-field').value.trim();

        // Perform validation or other checks here

        // Redirect to home.html
        window.location.href = 'home.html';
    });
});


// -----------------------------------------js code for FAQ's--------------------------------------------
const faqs = document.querySelectorAll(".faq"); 
        for (const item of faqs) { 
            const curr_faq = item.childNodes; 
            console.log(curr_faq); 
            const question = curr_faq[1]; 
            const answer = curr_faq[3]; 
            const icon = question.querySelector(".icon-main"); 
            icon.addEventListener("click", function () { 
                answer.classList.toggle("non-active"); 
                const i = icon.querySelector("i"); 
                i.classList.toggle("fa-xmark"); 
                i.classList.toggle("fa-plus"); 
            }); 
        } 