var initial_click_time_ms = new Date();
var time_since_click_interval;
var current_time_interval;
var timer_interval;
var timer_target_ms;
var timer_ms;
var shakeLeft_interval;
var shakeRight_interval;
var ball_shaking = false;
var music_timer = new Audio('wrecking-balls.mp3')


function rotate_balls(){

    var img = document.querySelector( '#bellImg' ),
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

    time_string = ms_to_timeString(delta_ms);

    const timeDisplay = document.getElementById("time");
    timeDisplay.textContent = time_string;
}

function refresh_timer(){
    timer_ms = timer_ms - 1000;

    if (timer_ms <= 0) {
        time_string = "00:00:00"
        if (!ball_shaking) {
            shakeLeft_interval = setInterval(shakeLeft, 100);
            shakeRight_interval = setInterval(shakeRight, 200);
            ball_shaking = true;
            music_timer.play();
            music_timer.loop = true;
        }
    } else {
        time_string = ms_to_timeString(timer_ms)
    }
   
    const timeDisplay = document.getElementById("time");
    timeDisplay.textContent = time_string;
}

function ms_to_timeString(x) {
    var ms = x % 1000;
    x = (x - ms) / 1000;

    var secs = x % 60;
    x = (x - secs) / 60;

    var mins = x % 60;
    var hrs = (x - mins) / 60;

    if (hrs < 10) {
        hrs = "0" + hrs
    }
    
    if (mins < 10) {
        mins = "0" + mins
    }

    if (secs < 10) {
        secs = "0" + secs
    }
    return time_string = hrs + ':' + mins + ':' + secs;
}

function current_time_button_click(){

    // stop music if on
    music_timer.pause();
    music_timer.currentTime = 0

    clearInterval(time_since_click_interval);
    clearInterval(current_time_interval);
    clearInterval(timer_interval);
    clearInterval(shakeLeft_interval);
    clearInterval(shakeRight_interval);
    current_time_interval = setInterval(refresh_current_time, 1000);
    refresh_current_time();
}

function time_since_click_button_click(){

    // stop music if on
    music_timer.pause();
    music_timer.currentTime = 0

    clearInterval(time_since_click_interval);
    clearInterval(current_time_interval);
    clearInterval(timer_interval);
    clearInterval(shakeLeft_interval);
    clearInterval(shakeRight_interval);
    initial_click_time_ms = new Date() // set the t0 of the chrono
    time_since_click_interval = setInterval(refresh_time_since_click, 1000);
    refresh_time_since_click();
}

function timer_button_click(){

    // stop music if on
    music_timer.pause();
    music_timer.currentTime = 0

    clearInterval(time_since_click_interval);
    clearInterval(current_time_interval);
    clearInterval(timer_interval);
    clearInterval(shakeLeft_interval);
    clearInterval(shakeRight_interval);
    ball_shaking = false;

    // get user input
    // document.getElementById("time").setAttribute("contentediatable", true);

    initial_click_time_ms = new Date(); // set the t0 of the chrono
    timer_target_ms = 5000; // timer duration target
    timer_ms = timer_target_ms + 1000;

    timer_interval = setInterval(refresh_timer, 1000);
    refresh_timer();
}

function shakeLeft(){
    marginLeftIni = document.getElementById('bellImg').style.marginLeft
    marginLeftIni = Number(marginLeftIni.substring(0, marginLeftIni.length-2))
    marginLeft = marginLeftIni - 20
    document.getElementById('bellImg').style.marginLeft = marginLeft + "px"
}

function shakeRight(){
    marginLeftIni = document.getElementById('bellImg').style.marginLeft
    marginLeftIni = Number(marginLeftIni.substring(0, marginLeftIni.length-2))
    marginLeft = marginLeftIni + 40
    document.getElementById('bellImg').style.marginLeft = marginLeft + "px"
}