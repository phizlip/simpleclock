const analogClock = document.getElementById('analog-clock');
const digitalClock = document.getElementById('digital-clock');
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const themeToggle = document.getElementById('theme-toggle');

let clockType = 1; // 1: 12h clock, 2: 24h clock, 3: analog clock
let darkMode = false;

digitalClock.addEventListener('click', toggleClock);
analogClock.addEventListener('click', toggleClock);
themeToggle.addEventListener('click', toggleTheme);

function toggleClock() {
    clockType = clockType % 3 + 1;
    updateTime();
}

function toggleTheme() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark', darkMode);
}

function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    if (clockType === 1) {
        digitalClock.style.display = 'block';
        analogClock.style.display = 'none';
        timeElement.textContent = format12Hour(hours, minutes, seconds);
    } else if (clockType === 2) {
        digitalClock.style.display = 'block';
        analogClock.style.display = 'none';
        timeElement.textContent = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
    } else {
        digitalClock.style.display = 'none';
        analogClock.style.display = 'block';
        updateAnalogClock(hours, minutes, seconds);
    }

    dateElement.textContent = date;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

function format12Hour(hours, minutes, seconds) {
    const period = hours >= 12 ? 'PM' : 'AM';
    const twelveHour = hours % 12 || 12;
    return `${padNumber(twelveHour)}:${padNumber(minutes)}:${padNumber(seconds)} ${period}`;
}

function updateAnalogClock(hours, minutes, seconds) {
    const hourHand = document.getElementById('hand-hour');
    const minuteHand = document.getElementById('hand-minute');
    const secondHand = document.getElementById('hand-second');

    hourHand.style.transform = `translateX(-50%) rotate(${(hours % 12 + minutes / 60) * 30}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
}

setInterval(updateTime, 1000);
