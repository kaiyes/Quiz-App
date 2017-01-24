Template.quiz.onCreated(function () {
  let self = this;
  self.roomId = Router.current().params._id;
  self.questionLenght = 6;
  self.questionTimer = new ReactiveCountdown(6);
  let quizRoomId = Router.current().params._id;
  console.log(quizRoomId);
  self.sixSecondTimer = new ReactiveCountdown(6);

  self.autorun(function () {
    let quizRoom = QuizRooms.findOne({_id: self.roomId });
    console.log(quizRoom);
  });

  // if (quizRoom.gameEnded) {
  //   toastr.success("Game ended, start a new game");
  //   Router.go('/homePage');
  // }
});

Template.quiz.onRendered(function(){
  let self = this;
  let i = 0;
  // while (i < 6) {
  //   // self.sixSecondTimer.start(function () {
  //   //   console.log('done');
  //   //   Meteor.call('updateAnswer', {_id: self.roomId}, function (err) {
  //   //     if (!err) {
  //   //       // self.sixSecondTimer.stop();
  //   //     }
  //   //   });
  //   // });
  //   // i++;
  //   console.log(i);
  // }

  self.autorun(function () {
    let quizRoom = QuizRooms.findOne({_id: self.roomId });
    console.log(quizRoom);
    if (quizRoom) {
      let user = quizRoom.challenger._id === Meteor.userId() ? quizRoom.challenger : quizRoom.defender;
      if (user.givenAnswer < 6) {
        self.sixSecondTimer.stop();
        self.sixSecondTimer.start(function () {
          console.log('done');
          Meteor.call('updateAnswer', {_id: self.roomId}, function (err) {
            if (!err) {
              // self.sixSecondTimer.stop();
            } else {
              toastr.error(err);
            }
          });
        });
      } else {
        toastr.success('Congratulation!! quiz is finished')
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
    let quizRoom = QuizRooms.findOne({ _id: Template.instance().roomId });
    if (quizRoom) {
      if (quizRoom.challenger._id === Meteor.userId()) {
        return quizRoom.challenger;
      }
      return quizRoom.defender;
    }
    return '';
  },
  opponentProfile: function() {
    let quizRoom = QuizRooms.findOne({ _id: Template.instance().roomId });
    if (quizRoom) {
      if (quizRoom.challenger._id !== Meteor.userId()) {
        return quizRoom.challenger;
      }
      return quizRoom.defender;
    }
    return '';
  },
  timerCount: function(){
    return Template.instance().sixSecondTimer.get();
  },
  quiz: function () {
    let quizRoom = QuizRooms.findOne({ _id: Template.instance().roomId });
    let userQuestion;
    if (quizRoom) {
      userQuestion = quizRoom.defender;
      if (quizRoom.challenger._id === Meteor.userId()) {
        userQuestion = quizRoom.challenger;
      }
      return quizRoom.questions[userQuestion.givenAnswer];
    }
  },

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
    let quizRoomId = Router.current().params._id;
    let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
    let firstAnswer = this.firstAnswer;
    let rightAnswer = this.rightAnswer;
    if (firstAnswer===rightAnswer) {
        if (Meteor.userId()===quizRoom.challanger._id) {
          console.log("challanger wins");
          Meteor.call("incChallangerRoomPoints", quizRoomId );
        };
        if (Meteor.userId()===quizRoom.defender._id) {
          console.log("defender wins");
          Meteor.call("incdefenderRoomPoints", quizRoomId );
        };
    };
    let questionNumber = Session.get('question');
    Meteor.call("updateSessionData", quizRoomId, this.firstAnswer, questionNumber );
  },
  "click .eddy--sqr-buttons__plan": function(event, template) {
    event.preventDefault();
    let quizRoomId = Router.current().params._id;
    let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
    let secondAnswer = this.secondAnswer;
    let rightAnswer = this.rightAnswer;
    if (secondAnswer===rightAnswer) {
        if (Meteor.userId()===quizRoom.challanger._id) {
          console.log("challanger wins");
          Meteor.call("incChallangerRoomPoints", quizRoomId );
        };
        if (Meteor.userId()===quizRoom.defender._id) {
          console.log("defender wins");
          Meteor.call("incdefenderRoomPoints", quizRoomId );
        };
    };
    let questionNumber = Session.get('question');
    Meteor.call("updateSessionData", quizRoomId, this.secondAnswer, questionNumber );
  },
  "click .eddy--sqr-buttons__place": function(event, template) {
    event.preventDefault();
    let quizRoomId = Router.current().params._id;
    let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
    let thirdAnswer = this.thirdAnswer;
    let rightAnswer = this.rightAnswer;
    if (thirdAnswer===rightAnswer) {
        if (Meteor.userId()===quizRoom.challanger._id) {
          console.log("challanger wins");
          Meteor.call("incChallangerRoomPoints", quizRoomId );
        };
        if (Meteor.userId()===quizRoom.defender._id) {
          console.log("defender wins");
          Meteor.call("incdefenderRoomPoints", quizRoomId );
        };
    };
    let questionNumber = Session.get('question');
    Meteor.call("updateSessionData", quizRoomId, this.thirdAnswer, questionNumber);
  },
  "click .eddy--sqr-buttons__product": function(event, template) {
    event.preventDefault();
    let quizRoomId = Router.current().params._id;
    let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
    let fourthAnswer = this.fourthAnswer;
    let rightAnswer = this.rightAnswer;
    if (fourthAnswer===rightAnswer) {
        if (Meteor.userId()===quizRoom.challanger._id) {
          console.log("challanger wins");
          Meteor.call("incChallangerRoomPoints", quizRoomId );
        };
        if (Meteor.userId()===quizRoom.defender._id) {
          console.log("defender wins");
          Meteor.call("incdefenderRoomPoints", quizRoomId );
        };

    };
    let questionNumber = Session.get('question');
    Meteor.call("updateSessionData", quizRoomId, this.fourthAnswer, questionNumber );
  }
});
