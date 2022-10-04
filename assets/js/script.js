let clockId;
let time = 10;
let i=0;
let correctAns=0;
//let totalanswered=0;

document.querySelector('.start').addEventListener('click', handleStart);

function handleStart() {
    document.querySelector('.banner').style.display = 'none';
    clockId = setInterval(clock,1000);
    showQuestions();
}

function clock() {
    document.querySelector('.time').innerText = time;
    if (time<1) {
        clearInterval(clockId);
        document.querySelector('.time').innerText = 0;
        finishQuiz();
    };
    time--;
}

function showQuestions() {
    if(i<questions.length && time > 0) {
        document.querySelector(".container").innerHTML = `
            <h2> ${questions[i].question} </h2>
            <div class="answers"></div>
        `

        questions[i].answers.forEach(ans=>{
            document.querySelector('.answers').innerHTML += `<button id="choices"> ${ans} </button>`
        })

        if (time == 0) {
            finishQuiz();
        };

    } else
        finishQuiz();
};

document.addEventListener('click',(e)=>{
    if(e.target && e.target.id == 'choices') {
        var totalanswered=0
        totalanswered++;
        if(e.target.innerText != questions[i].correct){
            time -= 10;
        }else

            correctAns++;
        i++;
        showQuestions();

    }

})


function finishQuiz() {
    document.querySelector(".container").innerHTML = `
    <h2>QUIZ OVER</h2> `
}


