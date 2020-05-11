const containerBar = document.querySelector(".Container__Bar");
const pauseToggleDiv = document.querySelector(".pause-toggle");
const progressLine = document.querySelector(".Container__Bar-linebox__line");
const progressPercent = document.querySelector(
  ".Progress__content-text-percent"
);
const progressLeftSeconds = document.querySelector(
  ".Progress__content-text-leftSeconds"
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

const SetProgressLeftFiles = (seconds) => {
  if (isRun) {
    progressLeftSeconds.innerText = `${seconds} Seconds left`;
  } else {
    progressLeftSeconds.innerText = `Paused`;
  }
};

const runForTest = () => {
  const id = setInterval(() => {
    SetProgressLeftFiles("7");
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
    progressLine.classList.remove("lineRun");
    progressLine.classList.add("linePause");
  } else {
    isRun = true;
    parentNode.removeChild(target);
    parentNode.appendChild(puaseIcon());
    progressLine.classList.remove("linePause");
    progressLine.classList.add("lineRun");
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
