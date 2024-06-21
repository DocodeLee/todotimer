const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click',() => {
   addTask();
})

addTaskBtn.addEventListener('keyup',(e) => {
    if (e.key === "Enter"){
        addTask();
    }
})


function addTask(){
    const taskText = taskInput.value.trim();
    if (taskText !== ''){
        const li = document.createElement('li');
        li.innerHTML= `
            ${taskText}
            <div class = "taskButtons">
                <button class = "startBtn"> Start </button>
                <button class = "stopBtn"> Stop </buton>
                <button class = "resetBtn"> Reset </buton>
                <button class = "deleteBtn"> Delete </buton>
            </div>
            <span class ="timer"> 00:00:00</span>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

taskList.addEventListener('click', (e) => {
    const target = e.target;
    if(target.classList.contains('deleteBtn')){
        target.parentElement.parentElement.remove();
    } else if (target.classList.contains('startBtn')){
        startTimer(target);
    } else if (target.classList.contains('stopBtn')){
        stopTimer(target);
    } else if (target.classList.contains('resetBtn')){
        resetTimer(target);
    }
});

let timers = new Map();

function startTimer(btn){
    const listItem = btn.parentElement.parentElement;
    const timerDisplay = listItem.querySelector('.timer');

    let startTime = parseInt(timerDisplay.getAttribute('data-start-time'), 10);

    
    // check if startime is NaN
    if (!isNaN(startTime) && startTime !== undefined){
        startTime = new Date().getTime() - startTime;
    } else{
        
        startTime = new Date().getTime() ;
    }

    // if timer is running
    if (timers.has(timerDisplay)){
        return;
    }

    const timerId = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;

        updateTimerDisplay(timerDisplay, elapsedTime);
    }, 1000);

    timers.set(timerDisplay,{id : timerId, startTime: startTime});
}

function stopTimer(btn){
    const listItem = btn.parentElement.parentElement;
    const timerDisplay = listItem.querySelector('.timer');

    if (timers.has(timerDisplay)) {
        clearInterval(timers.get(timerDisplay).id);
        
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - parseInt(timers.get(timerDisplay).startTime);

        timerDisplay.setAttribute('data-start-time',elapsedTime.toString());
        timers.delete(timerDisplay);
    }
    
}

function resetTimer(btn){
    const listItem = btn.parentElement.parentElement;
    const timerDisplay = listItem.querySelector('.timer');

    //Clear interval if running
    if (timers.has(timerDisplay)){
        clearInterval(timers.get(timerDisplay).id);
        timers.delete(timerDisplay);
    }

    // Reset display to 00
    timerDisplay.textContent = '00:00:00';
   
    
}

function updateTimerDisplay(timerDisplay, elapsedTime){

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    timerDisplay.textContent = formattedTime;
}

function pad(number){
    if (number < 10 ){
        return '0' +number;
    }
    return number;
}