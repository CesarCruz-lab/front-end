const secondsTag = document.querySelector('#seconds');
const minutesTag = document.querySelector('#minutes');
const hoursTag = document.querySelector('#hours');
const daysTag = document.querySelector('#days');
const nextYearTag = document.querySelector('#year');

function getUnit(unit) {
  return unit < 10 ? '0' + unit : unit;
}

function insertCountDownValues(obj) {
  secondsTag.textContent = getUnit(obj.seconds);
  minutesTag.textContent = getUnit(obj.minutes);
  hoursTag.textContent = getUnit(obj.hours);
  daysTag.textContent = getUnit(obj.days);
}

function updateCountDown() {
  const nextYear = new Date().getFullYear() + 1;
  const newYearTime = new Date(`january 01 ${nextYear} 00:00:00`);
  
  nextYearTag.innerHTML = nextYear;
  
  const currentTime = new Date();
  const difference = newYearTime - currentTime;
  
  const seconds = Math.floor(difference / 1000) % 60;
  const minutes = Math.floor(difference / 1000 / 60) % 60;
  const hours = Math.floor(difference / 1000 / 60 / 60) % 24;
  const days = Math.floor(difference / 1000 / 60 / 60 / 24);
  
  insertCountDownValues({seconds, minutes, hours, days});
}

setInterval(() => {
  requestAnimationFrame(updateCountDown);
}, 1000);

// end
