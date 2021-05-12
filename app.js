const quizData = [
    {
        question: '影響',
        a: 'えきまで',
        b: 'えんぴつ',
        c: 'えいきょう',
        d: 'かげきょう',
        correct: 'c'
    },{
        question: '交換',
        a: 'こうかん',
        b: 'こうりつ',
        c: 'しゅうかん',
        d: 'こうこう',
        correct: 'a'
    },{
        question: '上げる',
        a: 'あげる',
        b: 'さげる',
        c: '怖げる',
        d: 'ささげる',
        correct: 'a'
    },{
        question: '必要',
        a: 'かならず',
        b: 'ひつよう',
        c: 'するべき',
        d: 'ないよう',
        correct: 'b'
    },{
        question: '考える',
        a: 'こえる',
        b: 'かえる',
        c: 'つたえる',
        d: 'かんがえる',
        correct: 'd'
    }

];

var quizesNum = 0;

const quiz = (quizes) => {

    // create html for the quiz

    // create DIV quiz-container
    const quizContainer = document.createElement('div');
    quizContainer.classList.add('quiz-container');

    // create h1
    const questionH1 = document.createElement('h1');
    questionH1.textContent = quizData[quizes].question;      // textContent question
    questionH1.setAttribute('id', 'question');
    // append to div
    quizContainer.appendChild(questionH1);

    // create ul
    const answersUl = document.createElement('ul');
    answersUl.classList.add('answers');
    quizContainer.appendChild(answersUl);
    
    // create lis and buttons
    for (let i = 0; i < 4; i++){
        let choices = [quizData[quizes].a, quizData[quizes].b, quizData[quizes].c, quizData[quizes].d];
        let choicesKey = ['a', 'b', 'c', 'd'];

        // create li
        const answerLi = document.createElement('li');
        answerLi.classList.add('answer-wrapper');
        // create button
        const answerButton = document.createElement('button');
        answerButton.classList.add('answer');
        answerButton.setAttribute('id', choicesKey[i]);
        answerButton.textContent = choices[i];
        // append button to li then append li to ul
        answerLi.appendChild(answerButton);
        answersUl.appendChild(answerLi);    

    }

    document.body.appendChild(quizContainer); 
    const buttons = document.querySelectorAll('.answer');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            let choice = e.target.getAttribute('id');
            console.log(choice);
            if(choice === quizData[quizes].correct){
                alert('Correct!');
                score++;
                quizesNum;
                quizContainer.remove();
                quiz(quizesNum);
                return;
            } else {
                alert('wrong');
                return;
            }
        })
    })
}

var score = 0;

quiz(quizesNum);



