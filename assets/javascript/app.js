$(document).ready(function () {

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0;
    var answered = false;
    var correct;
    var triviaGame = [{
        question: "What was the first game show to air on television?",
        answer: ["Spelling Bee", "To Tell the Truth", "Match Game", "Twenty-One"],
        correct: "0",
        image: ("assets/images/1.jpg")
    }, {
        question: "Who is the current host of Family Feud?",
        answer: ["Richard Dawson", "Richard Karn", "John O'Hurley", "Steve Harvey"],
        correct: "3",
        image: ("assets//images/2.jpg")
    }, {
        question: "What was the most amount of money ever won on an American game show?",
        answer: ["$4,455,102", "$7,500,000", "$15,000,000", "$0.01"],
        correct: "0",
        image: ("assets//images/3.jpg")
    }, {
        question: "How many cases are used in the American version of Deal or No Deal?",
        answer: ["32", "26", "24", "18"],
        correct: "1",
        image: ("assets//images/4.jpg")
    }, {
        question: "What was the name of the first winner in Who Want's To Be a Millionaire?",
        answer: ["John Carpenter", "John Smith", "John Cena", "John Wick"],
        correct: "0",
        image: ("assets/images/5.jpg")
    }, {
        question: "What year did the game Plinko debut on The Price is Right?",
        answer: ["1975", "1983", "1999", "2005"],
        correct: "1",
        image: ("assets//images/6.jpg")
    }, {
        question: "What Nickelodeon game show had a talking Olmec Head as its announcer?",
        answer: ["Think Fast", "BrainSurge", "Double Dare", "Legends of the Hidden Temple"],
        correct: "3",
        image: ("assets//images/7.jpg")
    }, {
        question: "What British game show features Mark Labbett as The Beast?",
        answer: ["Wheel of Fortune", "Jeopardy!", "The Chase", "Wipeout"],
        correct: "2",
        image: ("assets//images/8.jpg")
    }];


    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false;
        timeRemaining = 16;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true;
                $('.question').text("Correct! The Answer is: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true;
                $('.question').text("Incorrect..." + "The Answer is: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("Time Up! The Correct Answer is: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('You have ' + timeRemaining + ' Seconds Remaining');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("Great Job!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("Too Bad.").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("Time Up!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++;
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000);
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 10000);
            }, 6000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});
