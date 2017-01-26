Template.quiz.onCreated(function () {
  let self = this;
  self.roomId = Router.current().params._id;
  self.questionLenght = 6;
  self.currentQuestionIndex = 0;
  self.sixSecondTimer = new ReactiveCountdown(6);

  self.autorun(function () {
    let quizRoom = QuizRooms.findOne({_id: self.roomId });
    console.log(quizRoom);
  });
});

Template.quiz.onRendered(function(){
  let self = this;
  self.autorun(function () {
    let playerSession = PlayedSessions.findOne({quizRoomId: self.roomId, 'player._id': Meteor.userId() });
    console.log(playerSession);
    if (playerSession) {
      self.currentQuestionIndex = playerSession.givenAnswer;
      if (playerSession.givenAnswer < 6) {
        self.sixSecondTimer.start(function () {
          Meteor.call('skipQuizQuestion', { roomId: self.roomId }, function (err) {
            if (!err) {
              // self.sixSecondTimer.stop();
            } else {
              toastr.error(err);
            }
          });
        });
        // self.sixSecondTimer.stop(6);
      } else {
        // self.sixSecondTimer.stop();
        toastr.success('Congratulation!! quiz is finished');
        Router.go('/quiz-result/'+ self.roomId);
      }
    }
  });

});

Template.quiz.onDestroyed(function () {

});


Template.quiz.helpers({

  quizRoom: function(){
    let quizRoomId = Router.current().params._id;
    return QuizRooms.findOne({ _id: quizRoomId });
  },
  userProfile: function(){
    let quizSession = PlayedSessions.findOne({ quizRoomId: Template.instance().roomId, 'player._id': Meteor.userId() });
    if (quizSession) {
      return quizSession.player;
    }
    return '';
  },
  opponentProfile: function() {
    let quizSession = PlayedSessions.findOne({ quizRoomId: Template.instance().roomId, 'player._id': Meteor.userId() });
    if (quizSession) {
      return quizSession.opponent;
    }
    return '';
  },
  timerCount: function(){
    return Template.instance().sixSecondTimer.get();
  },
  quiz: function () {
    let instance = Template.instance();
    let quizRoom = QuizRooms.findOne({ _id: instance.roomId });
    let quizSession = PlayedSessions.findOne({ quizRoomId: instance.roomId, 'player._id': Meteor.userId() });
    if (quizRoom) {
      instance.currentQuestionIndex = quizSession.givenAnswer;
      return quizRoom.questions[quizSession.givenAnswer];
    }
  },

});

Template.quiz.events({
  "click .eddy-quiz--option-btn": function(event, template){
    event.stopPropagation();
    $('.toggle-opacity').addClass('opacity-20');
    $('.eddy-quiz--option').css('top', '0');
  },
  'click .userAnswer'(event, instance) {
    const options = {
      answer: event.target.text.trim(),
      questionIndex: instance.currentQuestionIndex,
      roomId: instance.roomId,
      timeCount: 6 - parseInt(instance.sixSecondTimer.get())
    };
    Meteor.call('storeQuizAnswer', options, function (err) {
      instance.sixSecondTimer.stop(6);
      if (!err) {
        console.log('data updated');
      }
    });
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

});
