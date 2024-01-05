
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

