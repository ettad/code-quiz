let clockId;
let time = 60;
let i=0;
let correctAns=0;

// hide elements and calls functions on click
document.querySelector('.container').style.display = 'none';
document.querySelector('.start').addEventListener('click', handleStart);
document.querySelector('.highScore').addEventListener('click', showHighScore);

function handleStart() {
    document.querySelector('.container').style.display = '';
    document.querySelector('.banner').style.display = 'none';
    clockId = setInterval(clock,1000); //1sec interval set
    showQuestions();

}

//checks if the clock has ran out
function clock() {

    document.querySelector('.time').innerText = time;
    if (time<1 || i === 5) {
        clearInterval(clockId);
        document.querySelector('.time').innerText = 0;
        finishQuiz();
    };
    time--;

}

// display each question and choices for each question in the questions array
function showQuestions() {

    if(i<questions.length || time ===0) {
        document.querySelector(".container").innerHTML = `
            <h2 class="questions"> ${questions[i].question} </h2>
            <div class="answers"></div>
        `

        questions[i].answers.forEach(ans=>{
            document.querySelector('.answers').innerHTML += `<button id="choices"> ${ans} </button>`
        })

    } 

};

// control when time shoud be deducted and keeps track of how many questions user got correct.
document.addEventListener('click',(e)=>{
    if(e.target && e.target.id == 'choices') {
        if(e.target.innerText != questions[i].correct){
            time -= 10;
            document.querySelector(".container").innerHTML = `
                <p>WRONG</p>
            `
        }else
            correctAns++;
        i++;
        showQuestions();

    }
});


function finishQuiz() {
    // hides elements for next section to display
    document.querySelector('.answers').style.display = 'none';
    document.querySelector('.questions').style.display = 'none';
    
    var container = document.querySelector(".container");
    
    // code below created the content that is displayed after the user finish quiz
    var scoreContainerEl = document.createElement("div");
    scoreContainerEl.className = "score-submission";

    var doneEl = document.createElement("h2");
    doneEl.setAttribute("class", "done");
    doneEl.textContent = "Done!"

    scoreContainerEl.appendChild(doneEl);

    var scoreEl = document.createElement("h3")
    scoreEl.setAttribute("class", "score");
    scoreEl.textContent = "Score: "+ (correctAns/5)*100 + "%";

    scoreContainerEl.appendChild(scoreEl)


    var initialsLabelEl = document.createElement("label");
    initialsLabelEl.setAttribute("class", "createLabel");
    initialsLabelEl.textContent = "Enter your name or initials: ";

    scoreContainerEl.appendChild(initialsLabelEl);


    var initialsInputEl = document.createElement("input");
    initialsInputEl.setAttribute("type", "text");
    initialsInputEl.setAttribute("class", "initials");
    initialsInputEl.textContent = "";

    scoreContainerEl.appendChild(initialsInputEl);

    var submitBtnEl = document.createElement("button");
    submitBtnEl.setAttribute("type", "submit");
    submitBtnEl.setAttribute("class", "submit");
    submitBtnEl.textContent = "Submit";

    scoreContainerEl.appendChild(submitBtnEl);

    submitBtnEl.addEventListener("click", function () {
        var initials = initialsInputEl.value;
        var score = (correctAns/5)*100;
        if (!initials) {

            alert("Please enter your initials");
            return false;

        } else {
            var finalScore = {
                initials: initials,
                score: score
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            console.log("New Score " + newScore);
        }
        showHighScore();
        // hide the div which displays current score and input for inials.
        document.querySelector('.score-submission').style.display='none';

    });

    container.appendChild(scoreContainerEl);


}

// gets data from local storage and create list items to display scores
function showHighScore() {
    document.querySelector('.banner').style.display = 'none';

    var containerEl = document.querySelector(".container");
    var highScoreEl = document.createElement('div');
    highScoreEl.className = "scores-container";
 
    var savedHighScores = JSON.parse(localStorage.getItem("allScores"));
    
    if(!savedHighScores) {
        alert("There are no saved scores. Please click Start Quiz")
        document.querySelector('.banner').style.display = '';
        return false;
    }

    for (var i = 0; i < savedHighScores.length; i++) {
        
        let highScoreContainerEl = document.createElement("div");
        highScoreContainerEl.className = "scores-container";
        
        let listEl = document.createElement("li");
        listEl.className= "scoresList"
        listEl.textContent = savedHighScores[i].initials + " - " + savedHighScores[i].score + "%";
        highScoreEl.appendChild(listEl); 
    }    
    
    containerEl.appendChild(highScoreEl);
};


// when the retake quiz button is clicked, it reloads the page
document.querySelector('.retakeQuiz').addEventListener('click', 
function() {
    location.reload();
}

);

// wen the clear Highscore button is clicked, it will clear localStorage and reload the page.
document.querySelector('.clearHighScore').addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});


