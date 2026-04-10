// add javascript here
let guess = 0;
let answer = 0;
let guessCount = 0;
const scores = [];
let range = 0;
let roundStart = -1;
let username = prompt("Please enter your preferred name:");
const times = [];
username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
document.getElementById("playBtn").addEventListener("click",play);
document.getElementById("guessBtn").addEventListener("click",makeGuess);
document.getElementById("giveUpBtn").addEventListener("click",giveUp);

setInterval(function(){
    document.getElementById("date").innerText = updateDate();
},1000);
function updateDate(){
    let dateToday = new Date();
    let month = dateToday.getMonth(); 
    let day = dateToday.getDate();
    let year = dateToday.getFullYear();
    let monthName = "";
    let dayWithAbreviation = "";
    let hour = dateToday.getHours();
    let minutes = dateToday.getMinutes();
    let seconds = dateToday.getSeconds();
    switch (month) {
        case 0: monthName = 'January'; break; // 2. Added quotes and break
        case 1: monthName = 'February'; break;
        case 2: monthName = 'March'; break;
        case 3: monthName = 'April'; break;
        case 4: monthName = 'May'; break;
        case 5: monthName = 'June'; break;
        case 6: monthName = 'July'; break;
        case 7: monthName = 'August'; break;
        case 8: monthName = 'September'; break;
        case 9: monthName = 'October'; break;
        case 10: monthName = 'November'; break;
        case 11: monthName = 'December'; break;
        default: monthName = 'Unknown';
    }

    if (day > 3 && day < 21){ 
        dayWithAbreviation = day + 'th';
    }else{
        switch (day % 10) {
            case 1:  dayWithAbreviation = day + "st";
            case 2:  dayWithAbreviation = day + "nd";
            case 3:  dayWithAbreviation = day + "rd";
            default: dayWithAbreviation = day + "th";
        }
    }
    return monthName + " " + dayWithAbreviation + ", " + year + "    " + "\n" +
    hour + ":" + minutes + ":" + seconds;


}

function play(){
    let levels = document.getElementsByName("level");
    roundStart = new Date().getTime();
    for(let i=0; i<levels.length; i++){
        if(levels[i].checked){
            range = parseInt(levels[i].value);
        }
        levels[i].disabled = true;
    }

    document.getElementById("msg").textContent = "Hi " + username + ", Guess a number 1-" + range;
    answer = Math.floor(Math.random()*range) +1;
    guessCount = 0;

    guessBtn.disabled = false;
    giveUpBtn.disabled = false;
    playBtn.disabled = true;
}

function makeGuess(){
    let guess = parseInt(document.getElementById("guess").value);
    if(isNaN(guess) || guess < 1 || guess > range){
        msg.textContent = "Please enter a valid number";
        return;
    }
    guessCount++;
    if(guess == answer){
        msg.textContent = username + ", you got it correct! It took " + guessCount + " tries.";
        updateScore(guessCount);
        resetGame();
    }
    else if(guess < answer){
        msg.textContent = "Too low, try again.";
    }
    else{
        msg.textContent = "Too high, try again";
    }
    
}

function updateScore(score){
    scores.push(score);
    wins.textContent = "Total Wins: " + scores.length;
    let sum = 0;
    for(let i = 0; i < scores.length; i++){
        sum += scores[i];
    }
    avgScore.textContent = "Average Score: " + (sum/scores.length).toFixed(1);

    scores.sort(function(a,b){return a-b});

    let lb = document.getElementsByName("leaderboard");
    for(let i = 0; i < lb.length; i++){
        if(i < scores.length){
            lb[i].textContent = scores[i];
        }
    }
    let roundEnd = new Date().getTime();
    let timeElapsed = Math.abs(roundEnd - roundStart) / 1000; 

    times.push(timeElapsed);
    let fastest = Infinity;
    for (const val of times) {
        if (val < fastest) fastest = val;
    }

    let sumTimer = 0;
    for (const val of times) {
        sumTimer += val;
    }
    let averageTime = sumTimer/times.length;
    document.getElementById("avgTime").textContent = "Average time: " + averageTime + " seconds";
    document.getElementById("fastest").textContent = "Fastest time: " + fastest + " seconds";
    
}

function resetGame(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;

}

function giveUp(){
    guess.value = "";
    guessBtn.disabled = true;
    giveUpBtn.disabled = true;
    playBtn.disabled = false;
    e.disabled = false;
    m.disabled = false;
    h.disabled = false;
    updateScore(range);
    document.getElementById("msg").textContent = "Whoops, you gave up. Select a level to play again!";
}