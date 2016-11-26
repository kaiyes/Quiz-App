var sixSecondTimer = new ReactiveCountdown(6);

Template.quiz.onRendered(function(){
  Session.set('quizStarted', "started");
    //Router.go('/homePage');
      // sixSecondTimer.start(function() {
        console.log("works");
      // });

});


Template.quiz.onDestroyed(function () {
  Session.set('quizStarted', null);
});

Template.quiz.helpers({
  quizRoom: function(){
    let quizRoomId = Router.current().params._id;
    return QuizRooms.findOne({ _id: quizRoomId });
  },

  timer: function(){
    return sixSecondTimer.get();
  }
});



Template.quiz.events({
  "click .eddy-quiz--option-btn": function(event, template){
    event.stopPropagation();
    $('.toggle-opacity').addClass('opacity-20');
    $('.eddy-quiz--option').css('top', '0');
  },

  "click .eddy-quiz--option--close": function(event, template){
    $('.eddy-quiz--option').css({'top': '-120px', 'transition': 'all 0.3s'});
    $('.toggle-opacity').removeClass('opacity-20');
  },

  "click .eddy-quiz--option--ok": function(event, template){
    $('.eddy-quiz--option').css({'top': '-120px', 'transition': 'all 0.3s'});
    $('.toggle-opacity').removeClass('opacity-20');
  },

  "click .toggle-opacity": function(event, template){
    $('.eddy-quiz--option').css({'top': '-120px', 'transition': 'all 0.3s'});
    $('.toggle-opacity').removeClass('opacity-20');
  },

  "click .eddy--sqr-buttons__price": function(event, template) {
    event.preventDefault();
    Router.go('/quiz-result');
  },
  "click .eddy--sqr-buttons__plan": function(event, template) {
    event.preventDefault();
    Router.go('/quiz-result');
  },
  "click .eddy--sqr-buttons__place": function(event, template) {
    event.preventDefault();
    Router.go('/quiz-result');
  },
  "click .eddy--sqr-buttons__product": function(event, template) {
    event.preventDefault();
    Router.go('/quiz-result');
  }
});

// QuestionBank.insert({
//   question:"how many rakat for Dhuhor sunnah",
//   rightAnswer:"6",
//   firstAnswer:"2",
//   secondAnswer:"4",
//   thirdAnswer:"6",
//   fourthAnswer:"8",
//   chapter:"maths",
//   explanation:"The marketing mix refers to the set of actions, or tactics that a company uses to promise its brand or product in the market.The 4Ps make up a typical marketing mix - Price. Product. Promotion and Place.However nowadays the marketing mix increasingly includes several others Ps like Packaging.Positioning. People and even Politics as virtual mix elements.",
// })
