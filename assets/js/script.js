// Variable & DOM Elements
currentDay = $('#currentDay');
timeblockContainer = $('.container-fluid');
timeblocksArr = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

init();
createTimeblocks();
function init() {
    day = moment().format('dddd, MMMM Do');
    currentDay.text(day);
}

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
        textarea.setAttribute('class', 'col-8');
        textarea.setAttribute('id', 'textarea-' + [i]);
        inputGroup.append(textarea);

        var saveBtn = document.createElement('button');
        saveBtn.setAttribute('class', 'btn saveBtn col-2');
        saveBtn.setAttribute('id', 'saveBtn-' + [i]);
        saveBtn.innerText = "Save";
        inputGroup.append(saveBtn);
    }
}