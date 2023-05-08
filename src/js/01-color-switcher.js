const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.stopBtn.disabled = true;
let intervalId = null;

refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    changeColorBackground();
  }, 1000);
  refs.stopBtn.disabled = false;
  refs.startBtn.disabled = true;
});
refs.stopBtn.addEventListener('click', () => {
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
  clearInterval(intervalId);
});

function changeColorBackground() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
