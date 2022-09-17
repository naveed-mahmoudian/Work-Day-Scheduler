// Variable & DOM Elements
currentDay = $('#currentDay');
currentTime = moment().format('ha');
timeblockContainer = $('.container-fluid');
timeblocksArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

init();
createTimeblocks();
colorTimeBlocks();
allSaveBtns = document.querySelectorAll('.saveBtn');
allClearBtns = document.querySelectorAll('.clearBtn');
allTextareas = document.querySelectorAll('.ta')
addSaveEventListeners();
addClearEventListeners();
getLocalStorage();

// Initialize the page with Current Day
function init() {
    day = moment().format('dddd, MMMM Do');
    currentDay.text(day);
}

// Create and Display Timeblocks
function createTimeblocks() {
    var rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'row offset-1 vh-100');
    timeblockContainer.append(rowDiv);
    for (i = 0; i < timeblocksArr.length; i++) {
        var inputGroup = document.createElement('div');
        inputGroup.setAttribute('class', 'input-group m-1');
        rowDiv.append(inputGroup);

        var time = document.createElement('input');
        time.setAttribute('class', 'col-1 hour text-center p-1');
        time.setAttribute('type', 'text');
        time.setAttribute('readonly', '');
        time.setAttribute('value', timeblocksArr[i]);
        inputGroup.append(time);

        var textarea = document.createElement('textarea');
        textarea.setAttribute('type', 'text');
        textarea.setAttribute('class', 'col-9 ta textarea-' + [i]);
        textarea.setAttribute('id', [i]);
        inputGroup.append(textarea);

        var saveBtn = document.createElement('button');
        saveBtn.setAttribute('class', 'btn saveBtn col-1');
        saveBtn.setAttribute('id', [i]);
        saveBtn.innerHTML = '<i class="far fa-save" id="' + [i] + '"></i>';
        inputGroup.append(saveBtn);

        var clearBtn = document.createElement('button');
        clearBtn.setAttribute('class', 'btn clearBtn mx-1 col-1')
        clearBtn.setAttribute('id', [i]);
        clearBtn.innerHTML = '<i class="far fa-window-close" id="' + [i] + '"></i>';
        inputGroup.append(clearBtn);
    }
}

// Color Timeblocks according to Current Time
function colorTimeBlocks() {
    for (i = 0; i < timeblocksArr.length; i++) {
        if (currentTime === timeblocksArr[i]) {
            var current = document.querySelector('.textarea-' + [i]);
            current.setAttribute('class', 'col-8 present ta textarea-' + [i]);
            var currentIndex = i
        } else if (timeblocksArr.every(t => t != currentTime)) {
            var allPast = document.querySelectorAll('.ta');
            for (i = 0; i < allPast.length; i++) {
            allPast[i].setAttribute('class', 'col-8 past ta textarea-' + [i]);
            }
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
function addSaveEventListeners() {
    for (i = 0; i < allSaveBtns.length; i++) {
        allSaveBtns[i].addEventListener('click', saveEvent);
    }
}

// Saves Textarea Value to Local Storage
function saveEvent(event) {
    var buttonClicked = event.target.id;
    for (i = 0; i < allTextareas.length; i++) {
        var textareaID = allTextareas[i].id;
        if (textareaID === buttonClicked) {
            if (allTextareas[i].value != "") {
            localStorage.setItem(timeblocksArr[i], allTextareas[i].value);
            alert("Saved to local storage!");
            } else {
                alert("Please enter some text before saving!");
            }
        } 
    }
}

// Adds an Event Listner to All Clear Buttons
function addClearEventListeners() {
    for (i = 0; i < allClearBtns.length; i++) {
        allClearBtns[i].addEventListener('click', clearEvent);
    }
}

// Clears Textarea Value and Local Storage
function clearEvent(event) {
    var buttonClicked = event.target.id;
    for (i = 0; i < allTextareas.length; i++) {
        var textareaID = allTextareas[i].id;
        if (textareaID === buttonClicked) {
            if (allTextareas[i].value != "") {
                localStorage.removeItem(timeblocksArr[i]);
                allTextareas[i].value = "";
                alert("Removed your " + timeblocksArr[i] + " event!");
            } else {
                alert("Cannot remove an empty event!");
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