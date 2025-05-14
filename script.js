const menuIcon = document.getElementById('menuIcon');
const menuList = document.getElementById('menuList');

menuIcon.addEventListener("click", function () {
    menuList.classList.toggle('navbar');
});