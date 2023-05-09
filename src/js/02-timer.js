// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.getElementById('datetime-picker'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};
refs.startBtn.disabled = true;
let currentDate = new Date();
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate.getTime() > options.defaultDate.getTime()) {
      refs.startBtn.disabled = false;
    } else {
      refs.startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    }
  },
};

const fp = flatpickr(refs.input, options);

const handleOnStartClick = () => {
  setInterval(() => {
    const currentDate = new Date();
    const ms = selectedDate.getTime() - currentDate.getTime();
    if (ms<=0) {return}
    const timeLeft = convertMs(ms);
    refs.daysEl.textContent = addLeadingZero(timeLeft.days);
    refs.hoursEl.textContent = addLeadingZero(timeLeft.hours);
    refs.minutesEl.textContent = addLeadingZero(timeLeft.minutes);
    refs.secondsEl.textContent = addLeadingZero(timeLeft.seconds);
  }, 1000);
  refs.startBtn.disabled = true;
};

refs.startBtn.addEventListener('click', handleOnStartClick);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
