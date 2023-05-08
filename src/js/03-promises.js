import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form")

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const onSubmittingClick = event => {
  event.preventDefault();
  let { delay, step, amount } = event.target.elements;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);
  if (amount <= 0 || delay < 0 || step < 0) {
    Notify.failure(` Please input correct values (>=0)`);
    return;
  }

  for (let position = 0; position < amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(` Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  form.reset();
};

form.addEventListener('submit', onSubmittingClick);