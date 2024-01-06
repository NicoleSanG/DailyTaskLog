
// Display current day at the top
var currentDay = $('#currentDay');
currentDay.text(dayWithSuffix(dayjs()));

// Function to add suffix according to the day of the month
function dayWithSuffix(date) {
    var dayOfMonth = date.format('D');
    var suffix = dayOfMonthSuffix(dayOfMonth);
    return date.format(`dddd, MMMM D[${suffix}]`);
}

// Function to get the correct suffix
function dayOfMonthSuffix(day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {   // The % (modulo) operator returns the remainder of the division between two numbers. In this case, day % 10 is used to get the last digit of the day number. 
        // In the numbering of the days of the month, starting from 10, the suffixes are repeated every ten days.
        case 1: return 'st';  // If the last digit of the day is 1, it will add 'st'
        case 2: return 'nd'; // If the last digit of the day is 2, it will add 'nd'
        case 3: return 'rd'; // If the last digit of the day is 3, it will add 'rd'
        default: return 'th'; // For other numbers it will add 'th'
    }
}

// Working hours (9am-5pm) to be displayed in rows
var currentHour = dayjs().hour();

// Function to to display each hour in a 12h AM/PM format
function formatHour(hour) {
    return dayjs().hour(hour).format('h A');
}
//Function that given the time, returns the corresponding color class 'past', 'present', 'future' according to CSS.
function getColorClass(hour) {
    var currentHour = dayjs().hour();
    return hour < currentHour ? 'past' : hour > currentHour ? 'future' : 'present';
}
//For loop to create a row for each hour from 9am to 5pm
for (var hour = 9; hour <= 17; hour++) {
    var rowClass = getColorClass(hour);
    // Add rows to container
    $('.container').append(`<div class="row time-block ${rowClass}">
      <div class="col-2 hour pt-3">${formatHour(hour)}</div>
      <textarea class="col"></textarea>
      <button class="saveBtn col-2">
        <i class="fas fa-save"></i>
      </button>
    </div>`);
}
// Load saved event from local storage
var savedEvent = localStorage.getItem(formatHour(hour));
if (savedEvent) {
    $(`.container textarea.${rowClass}`).last().val(savedEvent);
}
// Add event listener to save button and save it in the local storage
$('.saveBtn').on('click', function () {
    var key = $(this).siblings('.hour').text();
    var value = $(this).siblings('textarea').val();
    localStorage.setItem(key, value);
    window.alert('Your task has been added to localStorage!');
});
// Iterates over each textarea, gets the associated time, and restores the value from local storage
$('textarea').each(function () {
    var key = $(this).siblings('.hour').text();
    $(this).val(localStorage.getItem(key));
});
