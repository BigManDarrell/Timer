const target = document.getElementById("target");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const reset = document.getElementById("reset");
const select = document.getElementById("op");
const input = document.getElementById("input");
let i = 0,
  isPaused,
  t;

pause.style.display = "none";
resume.style.display = "none";
reset.style.display = "none";

const leadingZero = (n) => (n < 10 ? `0${n}` : n);

start.addEventListener("click", () => {
  switch (select.value) {
    case "sec":
      t = Number(input.value);
      break;
    case "min":
      t = Number(input.value) * 60;
      break;
    case "hours":
      t = Number(input.value) * 3600;
      break;
    default:
      t = null;
      break;
  }
  start.style.display = "none";
  input.style.display = "none";
  select.style.display = "none";
  pause.style.display = "inline-block";
  reset.style.display = "inline-block";
  isPaused = false;
  const date = new Date();

  const id = setInterval(() => {
    if (t != null ? !isPaused && i < t : !isPaused) {
      i++;
      date.setHours(0, 0, i);
      target.innerHTML = `${leadingZero(date.getHours())}:${leadingZero(
        date.getMinutes()
      )}:${leadingZero(date.getSeconds())}`;
    } else if (i == t) {
      clearInterval(id);
      target.innerHTML = "Time's up!";
      pause.style.display = "none";
    }
  }, 1000);

  pause.addEventListener("click", () => {
    isPaused = true;
    pause.style.display = "none";
    resume.style.display = "inline-block";
  });

  resume.addEventListener("click", () => {
    isPaused = false;
    resume.style.display = "none";
    pause.style.display = "inline-block";
  });

  reset.addEventListener("click", () => {
    clearInterval(id);
    start.style.display = "inline-block";
    input.style.display = "inline-block";
    select.style.display = "inline-block";
    resume.style.display = "none";
    pause.style.display = "none";
    reset.style.display = "none";
    i = 0;
    target.innerHTML = "00:00:00";
  });
});
