const container = document.querySelector(".Container");
const containerBar = document.querySelector(".Container__Bar");
const pauseToggleDiv = document.querySelector(".pause-toggle");
const expandToggleDiv = document.querySelector(".expand-toggle");
const stopDiv = document.querySelector(".stop");
const progressLine = document.querySelector(".Container__Bar-linebox__line");
const progressPercent = document.querySelector(
  ".Progress__content-text-percent"
);
const progressLeftSeconds = document.querySelector(
  ".Progress__content-text-leftSeconds"
);

const INTERVAL_TIME = 10;
const PROGRESS_UNIT = 0.1;

let isRun = true;
let isExpand = false;
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

const expandIcon = (classes) => {
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-expand-alt");
  icon.addEventListener("click", handleIconClick);
  return icon;
};

const compressIcon = (classes) => {
  const icon = document.createElement("i");
  icon.classList.add("fas", "fa-compress-alt");
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

let leftTime = 100 * (INTERVAL_TIME / PROGRESS_UNIT);
const runForTest = () => {
  const id = setInterval(() => {
    if (isRun) {
      if (width > 100) {
        clearInterval(id);
      }
      leftTime -= INTERVAL_TIME;
      SetColorByWidth(width);
      SetProgressPercent(width);
      width += PROGRESS_UNIT;
    }
    SetProgressLeftFiles(Math.floor(leftTime / 1000) + 1);
  }, INTERVAL_TIME);
};

const handleIconClick = (event) => {
  const {
    target: { parentNode },
    target,
  } = event;
  if (target.parentNode.classList.contains("pause-toggle")) {
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
  } else if (target.parentNode.classList.contains("expand-toggle")) {
    if (isExpand) {
      isExpand = false;
      parentNode.removeChild(target);
      parentNode.appendChild(expandIcon());
      container.classList.remove("expand");
      container.classList.add("compress");
      containerBar.classList.remove("disappear");
      containerBar.classList.add("appear");
    } else {
      isExpand = true;
      parentNode.removeChild(target);
      parentNode.appendChild(compressIcon());
      container.classList.remove("compress");
      container.classList.add("expand");
      containerBar.classList.remove("appear");
      containerBar.classList.add("disappear");
    }
  }
};

const handleContainerHover = () => {
  pauseToggleDiv.style.opacity = 0.5;
  stopDiv.style.opacity = 0.5;
};

const handleContainerLeave = () => {
  pauseToggleDiv.style.opacity = 0;
  stopDiv.style.opacity = 0;
};

function init() {
  console.log("init");
  pauseToggleDiv.appendChild(puaseIcon());
  expandToggleDiv.appendChild(expandIcon());
  container.addEventListener("mouseover", handleContainerHover);
  container.addEventListener("mouseleave", handleContainerLeave);

  pauseToggleDiv.style.opacity = 0;
  stopDiv.style.opacity = 0;

  runForTest();
}

if (containerBar && pauseToggleDiv && expandToggleDiv && progressPercent) {
  init();
}
