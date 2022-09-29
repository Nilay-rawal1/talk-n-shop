const logIn = document.querySelector(".logIn");
const toggleButton = document.getElementById("buttonT");
const button = document.getElementById("button");
const password = document.getElementById("password");
const passwordL = document.getElementById("passwordL");
const email = document.getElementById("email");
const username = document.getElementById("username");
const usernameL = document.getElementById("usernameL");
const heading = document.getElementById("heading");
const radio =  document.getElementById("radio");


toggleButton.onclick = () => {
  logIn.classList.toggle("signUp");

  email.classList.toggle("signUp");
  password.classList.toggle("signUp");
  username.classList.toggle("signUp");

  passwordL.classList.toggle("signUp");
  usernameL.classList.toggle("signUp");
  radio.classList.toggle("signUp");

  if (toggleButton.textContent === "Log In") {
    button.innerText = "Log In";
    toggleButton.innerText = "Sign Up";

    heading.innerText = "Log In Here";
    
   
  } else {
    button.innerText = "Sign Up";
    toggleButton.innerText = "Log In";
    
    heading.innerText = "Sign Up Here";
  }
};


const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})