const hours = document.querySelector('.hours');
const minutes = document.querySelector('.min');
const seconds = document.querySelector('.seg');

function getDate() {
  const date = new Date();

  return {
    hh: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  }
}

function addTimeClockwise(hourDeg, minDeg, segDeg) {
  hours.style.transform = `rotateZ(${hourDeg}deg)`;
  minutes.style.transform = `rotateZ(${minDeg}deg)`;
  seconds.style.transform = `rotateZ(${segDeg}deg)`;
}

function updateClock() {
  const { hh, mm, ss } = getDate();

  const rotateHours = (hh * (24 + 6) + (mm / 2 + ss * .012)) - 180;
  const rotateMinutes = (mm * 6 + ss / 10) - 180;
  const rotateSeconds = (ss * 6) - 180;

  addTimeClockwise(rotateHours, rotateMinutes, rotateSeconds);
}

function animate() {
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000);

  updateClock();
}


setTimeout(() => {
  requestAnimationFrame(animate);
}, 1000)
