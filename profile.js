const menuIcon = document.getElementById('menuIcon');
const menuList = document.getElementById('menuList');

const infoOji = document.getElementById("infoOji");
const infoRifki = document.getElementById("infoRifki");
const infoYep = document.getElementById("infoYep");
const infoFadhel = document.getElementById("infoFadhel");
const infoRakha = document.getElementById("infoRakha");

const infoOjikemb = document.getElementById("infoOjikemb")
const infofadhelkemb = document.getElementById("infoFadhelkemb")
const infoYepkemb = document.getElementById("infoYepkemb")
const infoRifkikemb = document.getElementById("infoRifkikemb")
const infoRakhakemb = document.getElementById("infoRakhakemb")

const cardOji = document.getElementById("cardOji");
const cardRifki = document.getElementById("cardRifki");
const cardYep = document.getElementById("cardYep");
const cardFadhel = document.getElementById("cardFadhel");
const cardRakha = document.getElementById("cardRakha");

menuIcon.addEventListener("click", function () {
    menuList.classList.toggle('navbar');
});

infoOji.addEventListener("click", function () {
    cardOji.style.transform = "rotateY(180deg)";
    cardOji.style.transition = "all";
    cardOji.style.transitionDuration = "0.5s";
})

infoOjikemb.addEventListener("click", function () {
    cardOji.style.transform = "rotateY(0deg)";
    cardOji.style.transition = "all";
    cardOji.style.transitionDuration = "0.5s";
})

infoRifki.addEventListener("click", function () {
    cardRifki.style.transform = "rotateY(180deg)";
    cardRifki.style.transition = "all";
    cardRifki.style.transitionDuration = "0.5s";
})

infoRifkikemb.addEventListener("click", function () {
    cardRifki.style.transform = "rotateY(0deg)";
    cardRifki.style.transition = "all";
    cardRifki.style.transitionDuration = "0.5s";
})

infoYep.addEventListener("click", function () {
    cardYep.style.transform = "rotateY(180deg)";
    cardYep.style.transition = "all";
    cardYep.style.transitionDuration = "0.5s";
})

infoYepkemb.addEventListener("click", function () {
    cardYep.style.transform = "rotateY(0deg)";
    cardYep.style.transition = "all";
    cardYep.style.transitionDuration = "0.5s";
})

infoFadhel.addEventListener("click", function () {
    cardFadhel.style.transform = "rotateY(180deg)";
    cardFadhel.style.transition = "all";
    cardFadhel.style.transitionDuration = "0.5s";
})

infoFadhelkemb.addEventListener("click", function () {
    cardFadhel.style.transform = "rotateY(0deg)";
    cardFadhel.style.transition = "all";
    cardFadhel.style.transitionDuration = "0.5s";
})

infoRakha.addEventListener("click", function () {
    cardRakha.style.transform = "rotateY(180deg)";
    cardRakha.style.transition = "all";
    cardRakha.style.transitionDuration = "0.5s";
})

infoRakhakemb.addEventListener("click", function () {
    cardRakha.style.transform = "rotateY(0deg)";
    cardRakha.style.transition = "all";
    cardRakha.style.transitionDuration = "0.5s";
})