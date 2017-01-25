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
          console.log('done');
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
        self.sixSecondTimer.stop();
        toastr.success('Congratulation!! quiz is finished');
        Router.go('/quiz-result/'+ self.roomId);
      }
    }
  });

});

Template.quiz.onDestroyed(function () {
  // Session.set('challangeNotification', null);
  // Session.set('didAccept', null);
  // Session.set('question',null);
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
  // "click .eddy--sqr-buttons__price": function(event, template) {
  //   event.preventDefault();
  //   let quizRoomId = Router.current().params._id;
  //   let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
  //   let firstAnswer = this.firstAnswer;
  //   let rightAnswer = this.rightAnswer;
  //   if (firstAnswer===rightAnswer) {
  //       if (Meteor.userId()===quizRoom.challanger._id) {
  //         console.log("challanger wins");
  //         Meteor.call("incChallangerRoomPoints", quizRoomId );
  //       };
  //       if (Meteor.userId()===quizRoom.defender._id) {
  //         console.log("defender wins");
  //         Meteor.call("incdefenderRoomPoints", quizRoomId );
  //       };
  //   };
  //   let questionNumber = Session.get('question');
  //   Meteor.call("updateSessionData", quizRoomId, this.firstAnswer, questionNumber );
  // },
  // "click .eddy--sqr-buttons__plan": function(event, template) {
  //   event.preventDefault();
  //   let quizRoomId = Router.current().params._id;
  //   let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
  //   let secondAnswer = this.secondAnswer;
  //   let rightAnswer = this.rightAnswer;
  //   if (secondAnswer===rightAnswer) {
  //       if (Meteor.userId()===quizRoom.challanger._id) {
  //         console.log("challanger wins");
  //         Meteor.call("incChallangerRoomPoints", quizRoomId );
  //       };
  //       if (Meteor.userId()===quizRoom.defender._id) {
  //         console.log("defender wins");
  //         Meteor.call("incdefenderRoomPoints", quizRoomId );
  //       };
  //   };
  //   let questionNumber = Session.get('question');
  //   Meteor.call("updateSessionData", quizRoomId, this.secondAnswer, questionNumber );
  // },
  // "click .eddy--sqr-buttons__place": function(event, template) {
  //   event.preventDefault();
  //   let quizRoomId = Router.current().params._id;
  //   let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
  //   let thirdAnswer = this.thirdAnswer;
  //   let rightAnswer = this.rightAnswer;
  //   if (thirdAnswer===rightAnswer) {
  //       if (Meteor.userId()===quizRoom.challanger._id) {
  //         console.log("challanger wins");
  //         Meteor.call("incChallangerRoomPoints", quizRoomId );
  //       };
  //       if (Meteor.userId()===quizRoom.defender._id) {
  //         console.log("defender wins");
  //         Meteor.call("incdefenderRoomPoints", quizRoomId );
  //       };
  //   };
  //   let questionNumber = Session.get('question');
  //   Meteor.call("updateSessionData", quizRoomId, this.thirdAnswer, questionNumber);
  // },
  // "click .eddy--sqr-buttons__product": function(event, template) {
  //   event.preventDefault();
  //   let quizRoomId = Router.current().params._id;
  //   let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
  //   let fourthAnswer = this.fourthAnswer;
  //   let rightAnswer = this.rightAnswer;
  //   if (fourthAnswer===rightAnswer) {
  //       if (Meteor.userId()===quizRoom.challanger._id) {
  //         console.log("challanger wins");
  //         Meteor.call("incChallangerRoomPoints", quizRoomId );
  //       };
  //       if (Meteor.userId()===quizRoom.defender._id) {
  //         console.log("defender wins");
  //         Meteor.call("incdefenderRoomPoints", quizRoomId );
  //       };
  //
  //   };
  //   let questionNumber = Session.get('question');
  //   Meteor.call("updateSessionData", quizRoomId, this.fourthAnswer, questionNumber );
  // }
});
