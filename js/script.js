window.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".nav-menu"),
    menuItem = document.querySelectorAll(".nav-menu__list-item"),
    hamburger = document.querySelector(".hamburger");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("hamburger_active");
    menu.classList.toggle("nav-menu_active");
  });

  menuItem.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger_active");
      menu.classList.toggle("nav-menu_active");
    });
  });
});

//слайдер

let sliderWrapper = document.querySelector(".skills__games");
let sliders = document.querySelectorAll(".guitar_centers");
let arrowLeft = document.querySelector(".arrow_one");
let arrowReght = document.querySelector(".arrow_two");
let dotsContainer = document.querySelector(".dots");

let currSlide = 0;
const maxSlide = sliders.length;

function createDots() {
  sliders.forEach(function (_, i) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `
    <button class='dots__dot' data-slide='${i}'></button>
    `
    );
  });
}

createDots();

function gotoSlede(slede) {
  sliders.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * (i - slede)}%)`;
  });
}

function nextSled() {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  gotoSlede(currSlide);
  activateDots(currSlide);
}

function prevSled() {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }

  gotoSlede(currSlide);
  activateDots(currSlide);
}

function activateDots(slide) {
  document.querySelectorAll(".dots__dot").forEach(function (dot) {
    dot.classList.remove("dots__dot_active");
  });
  document
    .querySelector(`.dots__dot[data-slide = '${slide}']`)
    .classList.add("dots__dot_active");
}
activateDots(0);

arrowReght.addEventListener("click", nextSled);
arrowLeft.addEventListener("click", prevSled);
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSled();
  }
  if (e.key === "ArrowRight") {
    nextSled();
  }
});

dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    gotoSlede(slide);
    activateDots(slide);
  }
});
let startX, startY, endX, endY;

sliderWrapper.addEventListener("touchstart", function (e) {
  startX = e.touches[0].pageX;
  startY = e.touches[0].pageY;
});

sliderWrapper.addEventListener("touchmove", function (e) {
  // Предотвращаем вертикальную прокрутку
  e.preventDefault();

  endX = e.touches[0].pageX;
  endY = e.touches[0].pageY;
});

sliderWrapper.addEventListener("touchend", function () {
  // Рассчитываем расстояние перемещения
  let deltaX = endX - startX;
  let deltaY = endY - startY;

  // Устанавливаем порог для минимального расстояния свайпа
  let swipeThreshold = 50;

  // Проверяем, является ли свайп горизонтальным
  if (Math.abs(deltaX) > swipeThreshold) {
    // Определяем направление свайпа и вызываем соответствующую функцию
    if (deltaX < 0) {
      nextSled();
    } else {
      prevSled();
    }
  }
});
