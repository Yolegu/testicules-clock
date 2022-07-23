var initial_click_time_ms = new Date();
var time_since_click_interval;
var current_time_interval;


function rotate_balls(){

    var img = document.querySelector( '.bellImg' ),
    start = 0;
    function sine(){
        img.style.transform = "rotate(" + 20 * Math.sin( start ) + "deg)";
        start += 0.05;
        setTimeout(sine, 1000/60)
    }
    setTimeout(sine, 3000);
}

function get_current_time(){
    return new Date().toLocaleTimeString();
}

function refresh_current_time(){
    time_string = get_current_time()
    const timeDisplay = document.getElementById("time");
    timeDisplay.textContent = time_string;
}

function refresh_time_since_click(){
    current_time_ms = new Date();
    delta_ms = current_time_ms - initial_click_time_ms;

    var ms = delta_ms % 1000;
    delta_ms = (delta_ms - ms) / 1000;

    var secs = delta_ms % 60;
    delta_ms = (delta_ms - secs) / 60;

    var mins = delta_ms % 60;
    var hrs = (delta_ms - mins) / 60;

    if (hrs < 10) {
        hrs = "0" + hrs
    }
    
    if (mins < 10) {
        mins = "0" + mins
    }

    if (secs < 10) {
        secs = "0" + secs
    }
    const time_string = hrs + ':' + mins + ':' + secs;

    const timeDisplay = document.getElementById("time");
    timeDisplay.textContent = time_string;
}

function current_time_button_click(){
    clearInterval(time_since_click_interval);
    clearInterval(current_time_interval);
    current_time_interval = setInterval(refresh_current_time, 1000);
    refresh_current_time();
}

function time_since_click_button_click(){
    clearInterval(time_since_click_interval);
    clearInterval(current_time_interval);
    initial_click_time_ms = new Date() // set the t0 of the chrono
    time_since_click_interval = setInterval(refresh_time_since_click, 1000);
    refresh_time_since_click();
}