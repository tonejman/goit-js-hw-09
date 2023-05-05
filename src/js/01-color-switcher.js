function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  timerId = setInterval(() => {
    const valueColor = getRandomHexColor();
    body.style.backgroundColor = valueColor;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
});
