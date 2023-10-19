const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".header__menu");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("hamburger-active");
    navMenu.classList.toggle("header__menu-active");
})

document.querySelectorAll(".nav-link").forEach(n =>
    n.addEventListener("click",()=>{
        hamburger.classList.remove("hamburger-active");
        navMenu.classList.remove("header__menu-active");
    }))