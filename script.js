//restart , pause~resume , new timer //

//===== STARTING ====///
const section = document.querySelector("section");

const titleInput = document.getElementById("taskInput");
const hoursInput = document.getElementById("hoursInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const setTimerBtn = document.getElementById("setTimer");
const alert = document.querySelector(".alert");

hoursInput.value = 0;
minutesInput.value = 0;
secondsInput.value = 0;

//===== MAIN ====///
const main = document.querySelector("main");

const titleOutput = document.getElementById("titleOutput");
const timerOutput = document.getElementById("timerOutput");
const pauseBtn = document.getElementById("pauseOrResumeBtn");
const restartBtn = document.getElementById("restartBtn");
const newTimerBtn = document.getElementById("newTimerBTn");
const sucessMessage = document.querySelector(".sucessMessage");

let totalSeconds = 0;
let restartTimer = 0;
let intervalId = null;
let isPause = false;
setTimerBtn.addEventListener("click", timer);
//== COLLECT & HIDE //

function timer(){

    if(!titleInput.value){
        alert.style.display="block";
        setTimeout(()=>{
        alert.style.display="none";
        },3000)
        return;
    }
alert.style.display="none"; 
   let hours = Number(hoursInput.value);
   let minutes = Number(minutesInput.value);
   let seconds = Number(secondsInput.value);

totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
restartTimer = (hours * 3600) + (minutes * 60) + seconds;

    if(totalSeconds <= 0){ //if totalSeconds is 0 that means there is nothing to timer so return;
    section.style.display="block";
    main.style.display="none";
    return;
    }

section.style.display="none";
main.style.display="block";
displayTimer();
starInterval();
};

function displayTimer(){
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    const title = titleInput.value.trim();

    titleOutput.textContent = title;
    timerOutput.textContent = `
    ${String(hrs).padStart(2,"0")} : 
    ${String(mins).padStart(2,"0")}: 
    ${String(secs).padStart(2,"0")}`;
}

function starInterval(){

intervalId = setInterval(()=>{
totalSeconds--;
displayTimer();

if(totalSeconds <= 0){
    clearInterval(intervalId);
    intervalId = null;
sucessMessage.textContent = "TIMES UP!"; 
pauseBtn.style.display="none";
return;
}
},1000)
}
//pause ...if paused...resume //
pauseBtn.addEventListener("click",()=>{
if(isPause){ //resume  
isPause = false;
pauseBtn.textContent="PAUSE";
intervalId = null;
starInterval();

}else{ //pause
clearInterval(intervalId);
intervalId = null;
pauseBtn.textContent="RESUME";
isPause = true;
}

})

//restart to how it started..when the restart btn is clicked...the button should act like the setTimerBtn ..like it should star afresh with the inputs the user typed before clicking setTimerBtn
restartBtn.addEventListener("click",()=>{
clearInterval(intervalId);
intervalId = null;
totalSeconds = restartTimer;
pauseBtn.style.display="block"; 
starInterval();
}); 

// clear everything -> go back //
newTimerBtn.addEventListener("click",()=>{
clearInterval(intervalId);
intervalId = null;
totalSeconds = 0;

hoursInput.value="";
minutesInput.value="";
secondsInput.value="";
titleInput.value="";

section.style.display="block";
main.style.display="none"; 
timerOutput.textContent = "00 : 00 : 00";
pauseBtn.textContent = "PAUSE"; 
pauseBtn.style.display="block"; 
sucessMessage.textContent = "TIMES UP!"; 
})