

const menuIcon= document.querySelector('.menu-icon');
const navbarMenu = document.querySelector('.navbar__menu');
const overlay = document.querySelector('.overlay');


// menu hamburguesa 

const menuToggle = () => {
    navbarMenu.classList.toggle('show-menu');
    overlay.classList.toggle('show-overlay');
}

// efectos overlay 
const overlayClick = () => {
    navbarMenu.classList.remove('show-menu');
    overlay.classList.toggle('show-overlay');
}

// cerra menu al clickear los links 

const closeMenu = (e) => {
    if(!e.target.classList.contains('nav-link')) 
    return;
    navbarMenu.classList.remove('show-menu');
    overlay.classList.remove('show-overlay');
}


const init = () => {
    menuIcon.addEventListener('click', menuToggle);
    overlay.addEventListener('click', overlayClick);
    navbarMenu.addEventListener('click', closeMenu);
};

init();