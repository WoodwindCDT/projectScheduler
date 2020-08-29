// Work times
var times = {
'9 am': '',
'10 am': '', 
'11 am': '', 
'12 pm': '', 
'1 pm': '', 
'2 pm': '',
'3 pm': '',
'4 pm': '',
'5 pm': ''
};

$(document).ready(function(){
    // To set localStorage
    // if none, set it in localStorage
    if (!localStorage.getItem('times')) {
        updateTasks(times);
        }
        else {
        updateTasks(JSON.parse(localStorage.getItem('times')));
    };
});

// Current Date from Moment
const now = moment().format('LL');

// Setting Date at top of page
let pageDate = $('#currentDay');
$(pageDate).text(now);

var count = 1;
for(const property in times) {
    // Setting index values to corresponding areas to identify
    var textEntry = "#text-entry" + count;
    $(textEntry).text(times[property]);
    var timeId = "#time" + count;
    var currHR = moment().hour();
    var timeString = $(timeId).text();
    var timeNum = numberStrings(timeString);

    // Changing text-area colors according to hours
    if (timeNum < currHR) {
    $(textEntry).addClass(".past");
    }
    else if (timeNum > currHR) {
    $(textEntry).addClass(".future");
    } else {
    $(textEntry).addClass(".present");
    }
    count ++;
};

// Save Button On Click
$('.saveBtn').click(function(){
    value = $(this).siblings(".description").val();
    hourString = $(this).siblings('.hour').text();

    // Starting Save tasks by creating
    createTasks(hourString, value);
});

// Returning stringed number for each hour
function numberStrings(hourString) {
    switch(hourString) {
      case "9 am": return 9;
      case "10 am": return 10;
      case "11 am": return 11;
      case "12 pm": return 12;
      case "1 pm": return 13;
      case "2 pm": return 14;
      case "3 pm": return 15;
      case "4 pm": return 16;
      case "5 pm": return 17;
    };
};

function loadTasks() {
    result = localStorage.getItem('times')
    return (result ? result : times);
};

function storageSet() {
    localStorage.setItem('times', JSON.stringify(times));
};

function saveToStorage(timeObj) {
    localStorage.setItem('times', JSON.stringify(timeObj));
}

function createTasks(hourString, val) {
    if(!localStorage.getItem('times')) {
        storageSet();
    }
    // User data set to pair with hours in localStorage
    var userData = JSON.parse(localStorage.getItem('times'));
    userData[hourString] = val;

    saveToStorage(userData);
};

    // Updating textarea with localStorage
function updateTasks(dataObject) {
    $('.row').each(function() {
        var res = $(this).children('div');
        $(this).children('textarea').text(dataObject[res.text()]);
    });
};