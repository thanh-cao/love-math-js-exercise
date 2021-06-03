// Wait until the DOM has loaded before running the game. Get the button elements, and add event listeners to them.
document.addEventListener('DOMContentLoaded', () => {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', () => {
            if (button.getAttribute('data-type') === 'submit') {
                checkAnswer();
            } else {
                let gameType = button.getAttribute('data-type');
                runGame(gameType);
            }
        });
    }
    runGame('addition');
})

// The main game "loop", called when the script is first loaded and after the user's answer has been processed

function runGame(gameType) {
    document.getElementById("answer-input").value = '';
     // Creates two numbers with a value of between 1 and 25
    let num1 = Math.floor(Math.random() * 25 + 1);
    let num2 = Math.floor(Math.random() * 25 + 1);

     // Selects and displays the question depending on the gameType which we set when we called the function
    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === 'subtract') {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === 'multiply') {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === 'division') {
        displayDivisionQuestion(num1, num2);
    }
}

// Called when the user clicks the Submit button or presses Enter
function checkAnswer() {
    // Checks the answer against the first element in the returned calculateCorrectAnswer array
    let answerInput = parseInt(document.getElementById('answer-input').value);
    let correctAnswer = calculateCorrectAnswer();
    let isCorrect = answerInput === parseInt(correctAnswer[0]);

    if (isCorrect) {
        alert('Yay! You got it right!');
        incrementCorrectScore();
    } else {
        alert(`Woops that was wrong. You answered ${answerInput}, but correct answer is ${correctAnswer[0]}`);
        incrementIncorectScore();
    }
    runGame(correctAnswer[1]);
}

function calculateCorrectAnswer() {
    // Gets the operands (the numbers) and the operator (plus, minus sign etc.) directly from the DOM
    let num1 = parseInt(document.getElementById('operand1').innerText);
    let num2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if (operator === '+') {
        return [num1 + num2, 'addition'];
    } else if (operator === '-') {
        return [num1 - num2, 'subtract'];
    } else if (operator === 'x') {
        return [num1 * num2, 'multiply'];
    } else if (operator ==='/') {
        return [num1 / num2, 'division'];
    } else {
        alert('Unknown operator');
    }
}

function incrementCorrectScore() {
     // Gets the current score from the DOM and increments it
    let oldScore = parseInt(document.getElementById('correct-score').innerText);
    document.getElementById('correct-score').innerText = oldScore + 1;
}

function incrementIncorectScore() {
    // Gets the current tally of incorrect answers from the DOM and increments it
    let oldScore = parseInt(document.getElementById('incorrect-score').innerText);
    document.getElementById('incorrect-score').innerText = oldScore + 1;
}

// Displays the questions.
function displayAdditionQuestion(num1, num2) {
    document.getElementById('operand1').textContent = num1;
    document.getElementById('operand2').textContent = num2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion(num1, num2) {
    document.getElementById('operand1').textContent = num1;
    document.getElementById('operand2').textContent = num2;
    document.getElementById('operator').textContent = '-';
}

function displayMultiplyQuestion(num1, num2) {
    document.getElementById('operand1').textContent = num1;
    document.getElementById('operand2').textContent = num2;
    document.getElementById('operator').textContent = 'x';
}

function displayDivisionQuestion(num1, num2) {
    document.getElementById('operand1').textContent = num1;
    document.getElementById('operand2').textContent = num2;
    document.getElementById('operator').textContent = '/';
}