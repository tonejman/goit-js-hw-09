import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      Notiflix.Notify.success('Please press button start');
      startBtn.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

const calendarPicker = flatpickr(input, options);

let timerId = null;

startBtn.addEventListener('click', finalCountdown);

function finalCountdown() {
  const selectedDate = calendarPicker.selectedDates[0];
  startBtn.disabled = false;

  const endOfFinalCountdown = new Date(selectedDate).getTime();

  timerId = setInterval(timerFinalCountdown, 1000);

  function timerFinalCountdown() {
    const currentDate = new Date().getTime();
    const timeDiff = endOfFinalCountdown - currentDate;

    if (timeDiff <= 0) {
      clearInterval(timerId);
      dataDays.textContent = '00';
      dataHours.textContent = '00';
      dataMinutes.textContent = '00';
      dataSeconds.textContent = '00';
      Notiflix.Report.info('You have reached the selected date');
      input.disabled = false;
      return;
    }

    const addLeadingZero = value => {
      return `${value}`.padStart(2, '0');
    };

    startBtn.disabled = true;
    input.disabled = true;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(timeDiff / day);
    // Remaining hours
    const hours = Math.floor((timeDiff % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((timeDiff % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((timeDiff % day) % hour) % minute) / second);

    dataDays.textContent = addLeadingZero(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
  }
}
