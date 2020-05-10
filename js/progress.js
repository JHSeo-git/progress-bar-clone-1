const containerBar = document.querySelector(".Container__Bar");
const pauseToggleDiv = document.querySelector(".pause-toggle");
const progressPercent = document.querySelector(
  ".Progress__content-text-percent"
);

let isRun = true;
let width = 0;

const puaseIcon = () => {
  const icon = document.createElement("i");
  icon.classList.add("far", "fa-pause-circle");
  icon.addEventListener("click", handleIconClick);
  return icon;
};

const reStartIcon = () => {
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-sync");
  icon.addEventListener("click", handleIconClick);
  return icon;
};

const SetColorByWidth = (width) => {
  containerBar.style.width = `${width}%`;
  //container.style.background = "wheat";
};

const SetProgressPercent = (progress) => {
  const convertNumber = Math.ceil(progress) - 1;
  progressPercent.innerText = `${convertNumber}%`;
};

const runForTest = () => {
  const id = setInterval(() => {
    if (isRun) {
      if (width > 100) {
        clearInterval(id);
      }
      SetColorByWidth(width);
      SetProgressPercent(width);
      width += 0.1;
    }
  }, 10);
};

const handleIconClick = (event) => {
  const {
    target: { parentNode },
    target,
  } = event;
  if (isRun) {
    isRun = false;
    parentNode.removeChild(target);
    parentNode.appendChild(reStartIcon());
  } else {
    isRun = true;
    parentNode.removeChild(target);
    parentNode.appendChild(puaseIcon());
  }
};

function init() {
  console.log("init");
  pauseToggleDiv.appendChild(puaseIcon());

  runForTest();
}

if (containerBar && pauseToggleDiv && progressPercent) {
  init();
}
