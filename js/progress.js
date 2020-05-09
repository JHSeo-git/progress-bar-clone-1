const container = document.querySelector(".Container");

const SetColorByWidth = (width) => {
  container.style.background = `linear-gradient(90deg, #F8F8FB ${width}%, white ${
    100 - width
  }%)`;
  //container.style.background = "wheat";
};

const run = () => {
  width = 0;
  setInterval(() => {
    if (width > 100) {
      width = 0;
    }
    SetColorByWidth(width);
    width += 1;
  }, 100);
};

function init() {
  SetColorByWidth(20);
}

if (container) {
  init();
}
