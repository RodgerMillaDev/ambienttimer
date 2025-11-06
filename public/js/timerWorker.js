let countdownID;


function countdown() {
    if (clockTime > 0 && clockRunning) {
        clockTime -= 1;
        postMessage({ type: 'TICK', time: clockTime });
    } else if (clockTime === 0 && clockRunning) {
        if (clockType === 'FOCUS') {
            postMessage({ type: 'FOCUS_END' });
        } else if (clockType === 'BREAK') {
            postMessage({ type: 'BREAK_END' });
        }
    }
}

onmessage = function(event) {
    const { type, payload } = event.data;
    //console.log("Message received:", type); // Log received message type
    //console.log("Payload:", payload); // Log payload
    switch (type) {
        case 'START':
            //console.log("START message received with payload:", payload); // Log payload of START message
            clockTime = payload.time;
            clockType = payload.type;
            clearInterval(countdownID); // Clear any existing countdown
            countdownID = setInterval(countdown, 1000); // Start new countdown
            clockRunning = true; // Set clockRunning to true
            break;
        case 'PAUSE':
            clockRunning = false; // Update clockRunning variable
            clearInterval(countdownID); // Pause the countdown
            break;
        case 'RESET':
            //console.log("RESET message received"); // Log that RESET message received
            clearInterval(countdownID); // Reset and stop the countdown
            clockTime = payload.clockTime;
            clockType = 'FOCUS';
            break;
        case 'UPDATE_TIMES':
            //console.log("UPDATE_TIMES message received with payload:", payload); // Log payload of UPDATE_TIMES message
            sessionTime = payload.sessionTime;
            breakTime = payload.breakTime;
            break;
        default:
            //console.log("Unknown message received:", type); // Log unknown message type
            break;
    }
}
