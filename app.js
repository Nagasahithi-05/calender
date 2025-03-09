let newDateFunction = new Date();

function renderDate() {
    newDateFunction.setDate(1);
    let firstDayIndex = newDateFunction.getDay(); // First day of the month (0 = Sunday, 1 = Monday, etc.)

    let currentMonthDays = new Date(
        newDateFunction.getFullYear(),
        newDateFunction.getMonth() + 1,
        0
    ).getDate(); // Last day of the current month

    let prevMonthDays = new Date(
        newDateFunction.getFullYear(),
        newDateFunction.getMonth(),
        0
    ).getDate(); // Last day of the previous month

    let month = newDateFunction.getMonth();
    let year = newDateFunction.getFullYear();
    let today = new Date();

    let monthArr = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Update Month and Year
    document.getElementById("month").innerHTML = `${monthArr[month]} - ${year}`;
    document.getElementById("date").innerHTML = today.toDateString();

    let DATES = "";

    // 🔹 Add previous month's last few days (gray)
    for (let x = firstDayIndex; x > 0; x--) {
        DATES += `<div class='prev'>${prevMonthDays - x + 1}</div>`;
    }

    // 🔹 Add current month's days (normal)
    for (let i = 1; i <= currentMonthDays; i++) {
        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            DATES += `<div class='today'>${i}</div>`;
        } else {
            DATES += `<div>${i}</div>`;
        }
    }

    // 🔹 Add next month's first few days (gray)
    let totalCells = firstDayIndex + currentMonthDays;
    let nextDays = 42 - totalCells; // Ensures 6 rows (42 cells in total)

    for (let k = 1; k <= nextDays; k++) {
        DATES += `<div class='next'>${k}</div>`;
    }

    document.querySelector('.dates').innerHTML = DATES;
}
function updateClock() {
    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let format = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Add leading zeros if needed
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    // Update the clock in the HTML
    document.querySelector(".hours").textContent = hours;
    document.querySelector(".minutes").textContent = minutes;
    document.querySelector(".seconds").textContent = seconds;
    document.querySelector(".format").textContent = format;
}

// Call updateClock every second
setInterval(updateClock, 1000);

// Initialize the clock when the page loads
updateClock();

function moveDate(direction) {
    if (direction === 'prev') {
        newDateFunction.setMonth(newDateFunction.getMonth() - 1);
    } else if (direction === 'next') {
        newDateFunction.setMonth(newDateFunction.getMonth() + 1);
    }

    renderDate();
}

// Initialize Calendar
document.addEventListener("DOMContentLoaded", function () {
    renderDate();
});
