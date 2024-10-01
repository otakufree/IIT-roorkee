function alert(title, text, icon) {
    const container = document.querySelector('.container');
    container.classList.add('blur-background');
    Swal.fire({
        title: title,
        html: text,
        icon: icon,
    }).then(() => {
        container.classList.remove('blur-background');
    });
}

function checkAnswers() {
    const answers = {
        q1: 'd',
        q2: 'c',
        q3: 'b',
        q4: 'c',
        q5: 'b',
        q6: 'c',
        q7: 'b',
        q8: 'c',
        q9: 'c',
        q10: 'a'
    };

    let score = 0;
    const form = document.forms['quizForm'];
    const resultDiv = document.getElementById('result');
    let allAnswered = true;

    for (let i = 1; i <= 10; i++) {
        const questionName = 'q' + i;
        const userAnswer = form[questionName].value;
        const feedback = document.getElementById('feedback-' + questionName);
        
        if (!userAnswer) {
            allAnswered = false;
            feedback.textContent = 'Please select an answer.';
            feedback.className = 'feedback incorrect';
        } else if (userAnswer === answers[questionName]) {
            score++;
            feedback.textContent = 'Correct!';
            feedback.className = 'feedback correct';
        } else {
            feedback.textContent = 'Incorrect. The correct answer is ' + answers[questionName] + '.';
            feedback.className = 'feedback incorrect';
        }
    }

    if (!allAnswered) {
        for (let i = 1; i <= 10; i++) {
            const questionName = 'q' + i;
            const userAnswer = form[questionName].value;
            const feedback = document.getElementById('feedback-' + questionName);
            
            if (userAnswer) {
                feedback.textContent = 'Invalid';
                feedback.className = 'feedback incorrect';
            }
        }
        alert('Warning', 'Please answer all questions.', 'warning');
        return;
    }

    alert('Score:', `You scored ${score} out of 10`, 'success');
    
    const percentage = (score / 10) * 100;
    resultDiv.textContent = `You scored ${score} out of 10 (${percentage.toFixed(2)}%)`;
    document.getElementById('score').value = score;
    document.getElementById('Percentage').value = percentage + ' %';
}

function resetQuiz() {
    const form = document.forms['quizForm'];
    form.reset();

    for (let i = 1; i <= 10; i++) {
        const feedback = document.getElementById('feedback-q' + i);
        feedback.textContent = '';
    }

    document.getElementById('result').textContent = '';
    document.getElementById('score').value = 'Score out of 10';
    document.getElementById('Percentage').value = 'Percentage score';
}



