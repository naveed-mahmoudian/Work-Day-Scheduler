// Variable & DOM Elements
currentDay = $('#currentDay');
currentTime = moment().format('ha');
timeblockContainer = $('.container-fluid');
timeblocksArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

init();
createTimeblocks();
colorTimeBlocks();
allSaveBtns = document.querySelectorAll('.saveBtn');
allTextareas = document.querySelectorAll('.ta')
addEventListeners();
getLocalStorage();

// Initialize the page with Current Day
function init() {
    day = moment().format('dddd, MMMM Do');
    currentDay.text(day);
}

// Create and Display Timeblocks
function createTimeblocks() {
    var rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row vh-100');
    timeblockContainer.append(rowDiv);
    for (i = 0; i < timeblocksArr.length; i++) {
        var inputGroup = document.createElement('div');
        inputGroup.setAttribute('class', 'input-group m-1');
        rowDiv.append(inputGroup);

        var time = document.createElement('input');
        time.setAttribute('class', 'col-2 hour text-center');
        time.setAttribute('type', 'text');
        time.setAttribute('readonly', '');
        time.setAttribute('value', timeblocksArr[i]);
        inputGroup.append(time);

        var textarea = document.createElement('textarea');
        textarea.setAttribute('type', 'text');
        textarea.setAttribute('class', 'col-8 ta textarea-' + [i]);
        textarea.setAttribute('id', [i]);
        inputGroup.append(textarea);

        var saveBtn = document.createElement('button');
        saveBtn.setAttribute('class', 'btn saveBtn col-2');
        saveBtn.setAttribute('id', [i]);
        saveBtn.innerHTML = '<i class="far fa-save" id="' + [i] + '"></i>'
        inputGroup.append(saveBtn);
    }
}

// Color Timeblocks according to Current Time
function colorTimeBlocks() {
    for (i = 0; i < timeblocksArr.length; i++) {
        if (currentTime === timeblocksArr[i]) {
            var current = document.querySelector('.textarea-' + [i]);
            current.setAttribute('class', 'col-8 present ta textarea-' + [i]);
            currentIndex = i
        }
    }
    for (i = currentIndex + 1; i <= timeblocksArr.length - 1; i++) {
        var future = document.querySelector('.textarea-' + [i]);
        future.setAttribute('class', 'col-8 future ta textarea-' + [i]);
    }
    for (i = currentIndex - 1; i >= 0; i--) {
        var past = document.querySelector('.textarea-' + [i]);
        past.setAttribute('class', 'col-8 past ta textarea-' + [i]);
    }
}

// Adds an Event Listener to All Save Buttons
function addEventListeners() {
    for (i = 0; i < allSaveBtns.length; i++) {
        allSaveBtns[i].addEventListener('click', saveEvent);
    }
}

// Saves Textarea Value to Local Storage
function saveEvent(event) {
    buttonClicked = event.target.id;
    for (i = 0; i < allTextareas.length; i++) {
        var textareaID = allTextareas[i].id
        if (textareaID === buttonClicked){
            if (allTextareas[i].value != "") {
            localStorage.setItem(timeblocksArr[i], allTextareas[i].value);
            alert("Saved to local storage!");
            } else {
                alert("Please enter some text before saving!");
            }
        } 
    }
}
// Retrieve Textarea values from Local Storage
function getLocalStorage() {
    for (i = 0; i < timeblocksArr.length; i++) {
        var storage = localStorage.getItem(timeblocksArr[i]);
        if (storage != null) {
            allTextareas[i].textContent = storage
        }
    }
}