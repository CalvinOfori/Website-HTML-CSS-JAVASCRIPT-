//DOM Elements
const startScreen = document.getElementById('start-screen');
const QuizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');
const resultMessage = document.getElementById('result-message');
const finalScoreSpan = document.getElementById('final-score');
const totalQuestionsSpan = document.getElementById('total-questions');
const currentQuestionSpan = document.getElementById('question-number');

const quizQuestions = [
    {
        "question": "What is the primary way to declare a variable in Python, and how does it differ from a common way to declare a variable in JavaScript?",
        "answerOptions": [
            { "text": "Python uses `var` while JavaScript uses no keyword.", "correct": false },
            { "text": "Python requires `let` or `const`, while JavaScript uses no keyword.", "correct": false },
            { "text": "Python uses no keyword, while JavaScript commonly uses `let` or `const`.", "correct": true },
            { "text": "Python and JavaScript both use the `var` keyword.", "correct": false }
        ],
    },
    {
        "question": "In Python, a list is a mutable, ordered sequence of elements. Which of the following data structures in Javascript is the most similar?",
        "answerOptions": [
            { "text": "Object", "correct": false },
            { "text": "Set", "correct": false },
            { "text": "Array", "correct": true },
            { "text": "Map", "correct": false }
        ],
    },
    {
        "question": "How do you define a function in Python compared to Javascript?",
        "answerOptions": [
            { "text": "Python uses `def`, while Javascript uses `func`.", "correct": false },
            { "text": "Python uses `function`, while Javascript uses `def`.", "correct": false },
            { "text": "Python and Javascript both use the `function` keyword.", "correct": false },
            { "text": "Python uses the `def` keyword, while Javascript uses the `function` keyword.", "rationale": "This is the correct statement. Python uses `def` to define a function, and Javascript uses `function`.", "correct": true }
        ],
    },
    {
        "question": "What is a major difference in how Python and Javascript handle code blocks (e.g., for loops, if statements)?",
        "answerOptions": [
            { "text": "Python uses curly braces `{}` for indentation, while Javascript uses semicolons `;`.", "correct": false },
            { "text": "Python uses indentation, while Javascript uses curly braces `{}`.", "correct": true },
            { "text": "Python and Javascript both use curly braces `{}`.", "correct": false },
            { "text": "Python uses semicolons `;`, while Javascript uses indentation.", "correct": false }
        ],
    },
    {
        "question": "Which statement best describes the execution environment of Python and Javascript?",
        "answerOptions": [
            { "text": "Both Python and Javascript are primarily used for front-end web development.", "correct": false },
            { "text": "Python is interpreted and primarily runs on a server, while Javascript is compiled and primarily runs in a browser.", "correct": false },
            { "text": "Both Python and Javascript are compiled languages.", "correct": false },
            { "text": "Python is generally a back-end, server-side language, while Javascript is a core language for front-end web development.", "correct": true }
        ],
    }
];


// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;

//EVENT LISTENERS
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    //reset state
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = 0;
    resultScreen.classList.remove("active");
    startScreen.classList.remove("active");
    QuizScreen.classList.add("active");
    showQuestion();
}

function showQuestion() {
    // resetState
    answerButtonsElement.innerHTML = '';
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionElement.textContent = currentQuestion.question;

    currentQuestion.answerOptions.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');

        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    // Highlight the selected answer
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Update the score display
    scoreElement.textContent = score;

    // Show the correct answer
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
    });

    // Move to the next question or end the quiz after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    QuizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScoreSpan.textContent = score;
    resultMessage.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
}

function restartQuiz() {
    startScreen.classList.add("active");
    resultScreen.classList.remove("active");
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = 0;
    // reset the progress bar
    progressBar.style.width = '0%';
}