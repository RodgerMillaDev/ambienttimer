let timerWorker = new Worker('js/timerWorker.js');
let pageVisibilityHidden = false;
let sessionTime = 1500;
let breakTime = 300;
let clockTime = sessionTime;
let clockType = 'FOCUS';
let clockRunning = false;
let pausedClockTime = 0;
let pausedToStart = false;

// Function to send messages to the Web Worker
function sendMessageToWorker(type, payload) {
    //console.log("Sending message to worker:", type, payload); // Log message being sent to worker
    timerWorker.postMessage({ type, payload });
}

// Functions to handle messages from the Web Worker
timerWorker.onmessage = function(event) {
    const { type, time } = event.data;
    //console.log("Message received from worker:", type, time); // Log message received from worker
   //console.log(' sessionTime on',  sessionTime);
   if (!isNaN(time) && isFinite(time)) {
    sessionTime = time;
   }
   //console.log(' time on',  time); 
    switch (type) {
        case 'TICK':
           
            updateClockCounter(time);
            break;
        case 'FOCUS_END':
            handleFocusEnd();
            break;
        case 'BREAK_END':
            handleBreakEnd();
            break;
        default:
            break;
    }
}

function toggleTimer() {
    if (!clockRunning) {
        // If the clock is not running, start the timer
        notifySound();

        let timeStart = pausedClockTime > 0 && pausedToStart ? pausedClockTime :(clockType === "FOCUS" ? clockTime : breakTime) ;
        
        sendMessageToWorker('START', { time: timeStart, type: clockType });
        $('#clock-button').text('Pause');
        $('#reset-button').prop('disabled', true);

        // Display notification based on the timer type
        let TXT = clockType === "FOCUS" ? "Your ambient timer session has begun. Stay productive!" : "Enjoy a well-deserved break, pal!.";
        displayNotification(TXT);

        clockRunning = true; // Update clock state to running
        pausedToStart = false;

        focusNotificationDisplayed = false;
        breakNotificationDisplayed = false;
    } else {
        // If the clock is running, pause the timer
        pausedClockTime = sessionTime;
        pausedToStart = true;
        sendMessageToWorker('PAUSE', { time: pausedClockTime, type: clockType }); // Send PAUSE message to the worker
        $('#clock-button').text('Resume');
        $('#reset-button').prop('disabled', false);
        clockRunning = false; // Update clock state to paused
    }
}

function resetTimer(reset) {
    sendMessageToWorker('RESET', { reset }); // Pass clockTime as part of the payload
    //updateClockCounter(clockTime);
    resetApp(reset);
}

// Function to update session and break times
function updateTimes(session, breakTime) {
    sendMessageToWorker('UPDATE_TIMES', { sessionTime: session, breakTime: breakTime });
}

// Function to update clock counter in UI
function updateClockCounter(time) {
    if (!isNaN(time) && isFinite(time)) {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        $('#clock-counter').text(minutes + ':' + seconds);

        // Update page title dynamically
        document.title = `${minutes}:${seconds} ${clockType === 'FOCUS' ? 'Focus Time' : 'Break Time'} - ambientimer`;
        
        totalProgress = clockType === 'FOCUS' ? clockTime : breakTime;
        
        // Update progress
        updateProgress(time / totalProgress * 100);
    } else {
        console.error("Invalid time value received:", time);
        $('#clock-counter').text('00:00'); // Display default value
    }
}

// $('#session-minus').on('click', function () {
//     if (clockRunning) { return; }

//     sessionTime = (Math.floor(sessionTime / 60) * 60);

//     if (sessionTime > 0) {
//         sessionTime -= 60;
//     } else {
//         sessionTime = 60;
//     }

//     // Decrement sessionTime by 60 seconds
    
//     // Update clock counter with the updated sessionTime
//     resetApp(sessionTime, true);
// });

// // Function to handle increasing session time
// $('#session-plus').on('click', function () {
//     if (clockRunning) { return; }

//     sessionTime = (Math.floor(sessionTime / 60) * 60) + 60;
   
//     console.log('sessionTime',sessionTime);
//     resetApp(sessionTime, true);
// });


$('#session-minus').on('click', function () {
    if (clockRunning) { return; }

    sessionTime = (Math.floor(sessionTime / 60) * 60); // Round down to the nearest minute

    if (sessionTime > 60) { // Ensure sessionTime does not go below 60 seconds
        sessionTime -= 60;
    } else {
        sessionTime = 60;
    }
console.log('sessionTime', sessionTime);
    // Update clock counter with the updated sessionTime
    resetApp(sessionTime, true);
});

// Function to handle increasing session time
$('#session-plus').on('click', function () {
    if (clockRunning) { return; }
    console.log('sessionTime', sessionTime);
    sessionTime = (Math.floor(sessionTime / 60) * 60) + 60; // Round down to the nearest minute and add 60 seconds

    if(sessionTime === 0) {
        sessionTime = 120;
    }

    resetApp(sessionTime, true);
});

// Function to handle decreasing break time
$('#break-minus').on('click', function () {
    if (clockRunning) { return; }

    breakTime = (Math.floor(breakTime / 60) * 60);

    if (breakTime >= 60) {
        breakTime -= 60;
        //resetApp(breakTime, true);
    }
    if (breakTime === 0) {
        breakTime = 60;
        //resetApp(breakTime, true);
    }

    
console.log('breakTime',breakTime);
    updateBreakIndicator();
});

// Function to handle increasing break time
$('#break-plus').on('click', function () {
    if (clockRunning) { return; }

    breakTime = (Math.floor(breakTime / 60) * 60);
    breakTime += 60;

    console.log('breakTime',breakTime);
    
    updateBreakIndicator();
    //resetApp(breakTime, true);
});

// Function to handle the click event of the clock button
$('#clock-button').on('click', function() {
    toggleTimer();
});

// Function to handle the click event of the reset button
$('#reset-button').on('click', function() {
    sessionTime = 1500;
    breakTime = 300;
    resetTimer(sessionTime); // Pass sessionTime as an argument
    updateBreakIndicator();
    updateSessionIndicator();
});

function toclocksettings() {
    document.getElementById('flipper').style.transform = "rotateY(180deg)";
}

function toclockcounter() {
    document.getElementById('flipper').style.transform = "rotateY(0deg)";
}

// Function to reset the app
function resetApp(clockSetTime, indicate = false) {
    clockTime = clockSetTime;
    clockType = 'FOCUS';
    if (indicate) {
        clockTime = clockSetTime;
        updateBreakIndicator();
        updateSessionIndicator();
    }
    updateClockCounter(clockSetTime);
    updateProgress(100);

    pausedClockTime = 0;
    pausedToStart = false;

    $('#clock-label').text('FOCUS');
    $('#clock-button').text('Start');
    $('#reset-button').attr('disabled', true);
}

// Function to update break indicator in UI
function updateBreakIndicator() {
    $('#break-indicator').text(Math.floor(breakTime / 60));
}

// Function to update session indicator in UI
function updateSessionIndicator() {
    console.log('sessionTime session', sessionTime);
    $('#session-indicator').text(Math.floor(sessionTime / 60));
}

// Function to update progress indicator in UI
function updateProgress(progress) {
    //console.log('progress before', progress);
    progress = Math.abs(progress - 100).toFixed(2).toString() + '%';
    //console.log('progress', progress);
    $('#inner').width(progress);
}

// Function to display notification
function displayNotification(message) {
    document.getElementById("notifyTXT").innerText = message;
    document.getElementById("notification").style.transform = "scale(1)";
    setTimeout(function () {
        document.getElementById("notification").style.transform = "scale(0.001)";
    }, 8000);
}

let focusNotificationDisplayed = false;
let breakNotificationDisplayed = false;

function handleFocusEnd() {
    if (!focusNotificationDisplayed) {
        // Display the notification to the user
        notifySound();
        let TXT = "Great work! You've aced every challenge!";
        displayNotification(TXT);
        focusNotificationDisplayed = true;

        // Reset sessionTime to its initial value (1500 seconds)
        //sessionTime = 1500;
        //updateClockCounter(sessionTime);

        $('#clock-label').text('BREAK');
        $('#clock-button').text('Start');
        $('#reset-button').prop('disabled', false);

        // Update break indicator and clock counter
        updateBreakIndicator();
        updateClockCounter(breakTime);

        // Reset the timer settings
        resetTimerSettings('BREAK');
        updateProgress(100);
        document.title = "Break Time";
    }
}


function handleBreakEnd() {
    if (!breakNotificationDisplayed) {
        // Display the notification to the user
        notifySound();
        let finishTXT = "Your break time is up. Get ready to tackle your next task.";
        displayNotification(finishTXT);
        breakNotificationDisplayed = true;

        // Reset sessionTime to its initial value (1500 seconds)
        breakTime = 300;
        sessionTime = 1500;
        updateClockCounter(sessionTime);

        $('#clock-label').text('FOCUS');
        $('#clock-button').text('Start');
        $('#reset-button').prop('disabled', false);

        // Update UI to reflect the changes
        updateSessionIndicator();
        updateBreakIndicator();
        //updateClockCounter(sessionTime);
        updateProgress(100);
        resetTimerSettings('FOCUS');

        document.title = "Focus Time";
    }
}


function resetTimerSettings(title) {
    clockRunning = false;
    clockType = title;
}

