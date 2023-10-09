// DarkMode && Light Mode
let root = document.querySelector(":root");
let rootStyles = getComputedStyle(root);
let mainColor = rootStyles.getPropertyValue("--main-color");
let backGroundColor = rootStyles.getPropertyValue("--backhround-color");
let darkModeLabel = document.querySelector(".dark-mode");
let checkBox = document.querySelector(".toggle-checkbox");
let bgSection = document.querySelectorAll(".bg-section");
let textWhite = document.querySelectorAll(".c-white");

getDataFromLocalStorage();

darkModeLabel.onclick = function () {
  if (checkBox.checked === true) {
    darkMode();
  } else {
    whiteMode();
  }
};

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("mode");
  let check = window.localStorage.getItem("check");
  //let bg = window.localStorage.getItem("backgroundColor");
  //let txtColor = window.localStorage.getItem("textColor");
  if (data && check) {
    if (data === "#eef0f2") {
      whiteMode();
    } else {
      darkMode();
    }
  }
}
function whiteMode() {
  root.style.setProperty("--backhround-color", "#eef0f2");
  let lightMode = rootStyles.getPropertyValue("--backhround-color");
  checkBox.checked = false;
  bgSection.forEach((e) => {
    e.style.backgroundColor = "white";
  });
  textWhite.forEach((e) => {
    e.style.color = "black";
  });

  window.localStorage.setItem("mode", lightMode);
  window.localStorage.setItem("check", false);
}

function darkMode() {
  root.style.setProperty("--backhround-color", "rgb(22, 21, 29)");
  let darkMode = rootStyles.getPropertyValue("--backhround-color");
  checkBox.checked = true;
  bgSection.forEach((e) => {
    e.style.backgroundColor = "#222";
  });
  textWhite.forEach((e) => {
    e.style.color = "white";
  });
  window.localStorage.setItem("mode", darkMode);
  window.localStorage.setItem("check", true);
}

//function changeElements()

//------------------------------
// Scroll
let myScrollButton = document.querySelector(".scroll");
window.onscroll = function () {
  if (window.scrollY >= 600) {
    myScrollButton.style.display = "flex";
  } else {
    myScrollButton.style.display = "none";
  }
};

myScrollButton.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// SLIDER

let sliderCover = document.querySelector(".dots-nav");
let slider = document.querySelector(".slider");
let descriptionBox = Array.from(
  document.querySelectorAll(".slider-container .describtion")
);
let sliderContainer = document.querySelector(".slider-container");
let isDragStart = false;
// Get Number of Boxes
let slidesCount = descriptionBox.length;

// current box
let currentBox = 1;
let x = 0;
//Triggering Function For the Sliders

// Creating Bullets as same as descriptionBox Numbers
let bulletsContainer = document.createElement("ul");
bulletsContainer.classList.add("bullets");
for (let i = 0; i < slidesCount; i++) {
  let lis = document.createElement("li");
  lis.setAttribute("data-index", i);
  bulletsContainer.appendChild(lis);
}

sliderCover.appendChild(bulletsContainer);

// Manual Slider [Clicking on Bullets]
let manualSlider = Array.from(document.querySelectorAll(".bullets li"));
manualSlider.forEach(function (e) {
  e.addEventListener("click", (e) => {
    clearInterval(counter1);
    clearInterval(counter2);
    e.target.getAttribute("data-index");
    let currTarget = parseInt(e.target.getAttribute("data-index"));
    manualSlider.forEach((e) => {
      e.classList.remove("active");
    });
    descriptionBox.forEach((e) => {
      e.classList.remove("active");
    });
    descriptionBox[currTarget].classList.add("active");
    let descriptionBoxWidth = parseInt(
      getComputedStyle(descriptionBox[0]).width
    );

    sliderContainer.style.transform = `translateX(-${
      currTarget * descriptionBoxWidth
    }px)`;

    e.target.classList.add("active");
  });
});

let counter1 = setInterval(function () {
  x += parseInt(getComputedStyle(descriptionBox[0]).width);
  let y = (sliderContainer.style.transform = `translateX(-${x}px);`);
  sliderContainer.style.transform = `translateX(-${x}px)`;
  if (y === `translateX(-${getComputedStyle(sliderContainer).width});`) {
    x = 0;
    sliderContainer.style.transform = `translateX(-${x}px)`;
  }
}, 2000);

// set active before setInterval
descriptionBox[0].classList.add("active");
manualSlider[0].classList.add("active");
let counter2 = setInterval(function () {
  removeAllActive();
  descriptionBox[currentBox].classList.add("active");
  manualSlider[currentBox].classList.add("active");
  currentBox++;
  if (currentBox === slidesCount) {
    currentBox = 0;
  }
}, 2000);

// Removing class active from boxes and Bullets
function removeAllActive() {
  descriptionBox.forEach((box) => {
    box.classList.remove("active");
  });
  manualSlider.forEach((bullet) => {
    bullet.classList.remove("active");
  });
}
