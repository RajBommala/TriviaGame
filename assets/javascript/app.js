//Global variables
var display = $('#wrapper3');
var countStartNumber = 30;

// Array of game questions

let questions = [{
    question: "Which of the following is correct?",
    answers: ["jQuery is a JSON Library", "jQuery is a JavaScript Library"],
    correctAnswer: "jQuery is a JavaScript Library" 
  }, {
    question: "Which sign does jQuery use as a shortcut for jQuery?",
    answers: ["the $ sign", "the % sign", "the ? Sign"],
    correctAnswer: "the $ sign"
  }, {
    question: "Is jQuery a library for client scripting or server scripting?",
    answers: ["Server scripting", "Client scripting"],
    correctAnswer: "Client scripting"
  }, {
    question: "Which jQuery method is used to hide selected elements?",
    answers: ["hidden()", "display(none)", "hide()", "visible(false)"],
    correctAnswer: "hide()"
  }, {
    question: "What scripting language is jQuery written in?",
    answers: ["VBScript", "JavaScript", "C++", "C#"],
    correctAnswer: "JavaScript"
  }];


// on click events

$(document).on('click', '#start-over', function(e) {
    game.reset();
  });
  
  $(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
  });
  
  $(document).on('click', '#start', function(e) {
    $('#wrapper2').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
  });

// object with name-value pairs and methods

let game = {
    questions:questions,
    currentQuestion:0,
    counter:countStartNumber,
    correct:0,
    incorrect:0,
    countdown: function(){
      game.counter--;
      $('#counter-number').html(game.counter);
  
      if (game.counter === 0){
        console.log('TIME UP');
        game.timeUp();
      }
    },
    loadQuestion: function(){
      timer = setInterval(game.countdown, 1000);
      display.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
      for (let i = 0; i<questions[this.currentQuestion].answers.length; i++){
        display.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
      }
    },
    nextQuestion: function(){
      game.counter = countStartNumber;
      $('#counter-number').html(game.counter);
      game.currentQuestion++;
      game.loadQuestion();
    },
    timeUp: function (){
      clearInterval(timer);
      $('#counter-number').html(game.counter);
  
      display.html('<h2>Out of Time!</h2>');
      display.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    
  
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    results: function() {
      clearInterval(timer);
  
      display.html('<h2>All done, heres how you did!</h2>');
      $('#counter-number').html(game.counter);
      display.append('<h3>Correct Answers: ' + game.correct + '</h3>');
      display.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
      display.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
      display.append('<br><button id="start-over">Start Over?</button>');
    },
    clicked: function(e) {
      clearInterval(timer);
  
      if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
        this.answeredCorrectly();
      } else {
        this.answeredIncorrectly();
      }
    },
    answeredIncorrectly: function() {
      game.incorrect++;
      clearInterval(timer);
      display.html('<h2>Nope!</h2>');
      display.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
     
  
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    answeredCorrectly: function(){
      clearInterval(timer);
      game.correct++;
      display.html('<h2>Correct!</h2>');
     
  
      if (game.currentQuestion === questions.length - 1){
        setTimeout(game.results, 3 * 1000);
      } else {
        setTimeout(game.nextQuestion, 3 * 1000);
      }
    },
    reset: function(){
      this.currentQuestion = 0;
      this.counter = countStartNumber;
      this.correct = 0;
      this.incorrect = 0;
      this.loadQuestion();
    }
  };
  


