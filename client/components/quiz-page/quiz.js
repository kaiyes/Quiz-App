var sixSecondTimer = new ReactiveCountdown(20);

Template.quiz.onCreated(function () {
  let quizRoomId = Router.current().params._id;
  let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
  if (quizRoom.gameEnded) {
    toastr.success("Game ended, start a new game");
    Router.go('/homePage');
  }
});

Template.quiz.onRendered(function(event, instance){

  Session.set('question', 0);
    sixSecondTimer.start(function() {
      Session.set('question',1);
      sixSecondTimer.start(function() {
        Session.set('question',2);
        sixSecondTimer.start(function() {
          Session.set('question',3);
            sixSecondTimer.start(function() {
              Session.set('question',4);
                sixSecondTimer.start(function() {
                  Session.set('question',5);
                    sixSecondTimer.start(function() {
                       Router.go('/quiz-result')
                      });
                  });
              });
          });
      });
  });

});

Template.quiz.onDestroyed(function () {
  Session.set('challangeNotification', null);
  Session.set('didAccept', null);
  Session.set('question',null);
});


Template.quiz.helpers({

  quizRoom: function(){
    let quizRoomId = Router.current().params._id;
    return QuizRooms.findOne({ _id: quizRoomId });
  },

  timerCount: function(){
    return sixSecondTimer.get();
  },

  timer: function() {
    let quizRoomId = Router.current().params._id;
    let quizRoom = QuizRooms.findOne({ _id: quizRoomId });

    if (Session.get('question')===0) {
      toastr.success("question 1");
      return quizRoom.questions[0];
    };
    if (Session.get('question')===1) {
      toastr.success("question 2");
      return quizRoom.questions[1];
    };
    if (Session.get('question')===2) {
      toastr.success("question 3");
      return quizRoom.questions[2];
    };
    if (Session.get('question')===3) {
      toastr.success("question 4");
      return quizRoom.questions[3];
    };
    if (Session.get('question')===4) {
      toastr.success("question 5");
      return quizRoom.questions[4];
    };
    if (Session.get('question')===5) {
      toastr.success("Last Question");
      let quizRoomId = Router.current().params._id;
      Meteor.call("endGame", quizRoomId);
      return quizRoom.questions[5];
    };
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
        if (Meteor.userId()===quizRoom.challanged._id) {
          console.log("challanged wins");
          Meteor.call("incChallangedRoomPoints", quizRoomId );
        };
     let questionNumber = Session.get('question');
     Meteor.call("updateSessionData", quizRoomId, this.firstAnswer, questionNumber );
    };

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
        if (Meteor.userId()===quizRoom.challanged._id) {
          console.log("challanged wins");
          Meteor.call("incChallangedRoomPoints", quizRoomId );
        };
      let questionNumber = Session.get('question');
      Meteor.call("updateSessionData", quizRoomId, this.secondAnswer, questionNumber );
    }
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
        if (Meteor.userId()===quizRoom.challanged._id) {
          console.log("challanged wins");
          Meteor.call("incChallangedRoomPoints", quizRoomId );
        };

    let questionNumber = Session.get('question');
    Meteor.call("updateSessionData", quizRoomId, this.thirdAnswer, questionNumber);
    }
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
        if (Meteor.userId()===quizRoom.challanged._id) {
          console.log("challanged wins");
          Meteor.call("incChallangedRoomPoints", quizRoomId );
        };
      let questionNumber = Session.get('question');
      Meteor.call("updateSessionData", quizRoomId, this.fourthAnswer, questionNumber );
    }
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


    // sixSecondTimer.start(function() {
    //   return quizRoom.question[0];
    //     sixSecondTimer.start(function() {
    //         return quizRoom.question[1];
    //     });
    // });
