const quizData = [
    {
        question: '影響',
        choiceA: 'えきまで',
        choiceB: 'えんぴつ',
        choiceC: 'えいきょう',
        choiceD: 'かげきょう',
        correct: 'C'
    },{
        question: '交換',
        choiceA: 'こうかん',
        choiceB: 'こうりつ',
        choiceC: 'しゅうかん',
        choiceD: 'こうこう',
        correct: 'A'
    },{
        question: '上げる',
        choiceA: 'あげる',
        choiceB: 'さげる',
        choiceC: 'こわげる',
        choiceD: 'ささげる',
        correct: 'A'
    },{
        question: '必要',
        choiceA: 'かならず',
        choiceB: 'ひつよう',
        choiceC: 'するべき',
        choiceD: 'ないよう',
        correct: 'B'
    },{
        question: '考える',
        choiceA: 'こえる',
        choiceB: 'かえる',
        choiceC: 'つたえる',
        choiceD: 'かんがえる',
        correct: 'D'
    }

];

// get elements
const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
const question = document.getElementById('question');
const progress = document.getElementById('progress');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');
const choiceD = document.getElementById('D');
const scoreDisplay = document.getElementById('score');
const counter = document.querySelector('.counter');
const timeGauge = document.querySelector('.time-gauge');

// create var
const lastQuestion = quizData.length - 1;
let currentQuestion = 0;
let TIMER;
let score = 0;

// add an eventlistener (click) to start the quiz onclick
start.addEventListener('click', function(){
    startQuiz();
});


function startQuiz(){
    start.style.display = 'none';
    quiz.style.display = 'block';
    renderQuestion();
    renderProgress();
    renderTimer();
    TIMER = setInterval(renderTimer, 1000);
};

// render the quiz's question and choices
const renderQuestion = () => {
    let q = quizData[currentQuestion];
    question.innerHTML = `<p>${q.question}</p>`;
    choiceA.innerText = `${q.choiceA}`;
    choiceB.innerText = `${q.choiceB}`;
    choiceC.innerText = `${q.choiceC}`;
    choiceD.innerText = `${q.choiceD}`;
};

// render the progress bar
const renderProgress = () => {
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += `<div class="prog" id = '${qIndex}'></div>`
    }
}

// render the timer
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 80; // 80px
const gaugeUnit = 80 / 10;

const renderTimer = () => {
    if(count <= questionTime){
        counter.innerText = count;
        timeGauge.style.width = count * gaugeUnit + 'px';
        count++;
    } else {
        count = 0;
        answerIsWrong();
        if(currentQuestion < lastQuestion){
            // render the next question
            currentQuestion++;
            renderQuestion();
        } else {
            // end the quiz
            clearInterval(TIMER);
            scoreRender();
        }
    }
};

// check answer

const checkAnswer = (answer) => {
    let q = quizData[currentQuestion];
    if(answer === q.correct){   // answer correct
        score++;
        count = 0;
        answerIsCorrect();
    } else {
        count = 0;
        answerIsWrong();
    }
    if(currentQuestion < lastQuestion){
        // render next question
        currentQuestion++;
        renderQuestion();
    } else {
            // end the quiz
            clearInterval(TIMER);
            scoreRender();
        };
};

const answerIsCorrect = () => {
    document.getElementById(currentQuestion).style.backgroundColor = '#9bdd54';
};

const answerIsWrong = () => {
    document.getElementById(currentQuestion).style.backgroundColor = '#dd5555';
}

let scorePerCentDisplay = document.querySelector('.score-percent');
let scoreImg = document.querySelector('.score-img');
let scoreMessage = document.querySelector('.score-message');

const scoreRender = () => {
    quiz.style.display = 'none';
    scoreDisplay.style.display = 'block';
    const scorePerCent = Math.round(100 * score / quizData.length);
    scorePerCentDisplay.innerText = scorePerCent + '%';

    let img = (scorePerCent >= 90) ? './img/1.png':
              (scorePerCent >= 60) ? './img/2.png': 
              (scorePerCent >= 40) ? './img/3.png':
              (scorePerCent >= 20) ? './img/4.png':
              './img/5.png';

    let message = (scorePerCent >= 90) ? 'すごい！日本語の天才だ！':
              (scorePerCent >= 60) ? '日本語がお上手ですね。': 
              (scorePerCent >= 40) ? '大丈夫よ…':
              (scorePerCent >= 20) ? '残念ですね。':
              'どうしたんですか。';

    scoreImg.src = img;
    scoreMessage.innerText = message;
};