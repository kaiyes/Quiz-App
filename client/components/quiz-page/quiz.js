var sixSecondTimer = new ReactiveCountdown(20);


Template.quiz.onCreated(function () {
  let quizRoomId = Router.current().params._id;
  Session.set('routerId',quizRoomId);
  Meteor.subscribe("quiz", quizRoomId);
  Meteor.subscribe("resultRoomByOriginalId", quizRoomId);
  let quizRoom = QuizRooms.findOne({ _id: quizRoomId });

  if (Meteor.userId()===quizRoom.challanger._id ){
    if (quizRoom.challangerPlayed) {
      myApp.addNotification({
        title: 'Quiz',
        message: "Game ended, start a new game",
        hold:2000,
      });
      Router.go('/challengeOpponent');
    }
  };

  if (Meteor.userId()===quizRoom.defender._id ){
    if (quizRoom.defenderPlayed) {
      myApp.addNotification({
        title: 'Quiz',
        message: "Game ended, start a new game",
        hold:2000,
      });
      Router.go('/challengeOpponent');
    }
  };

});

Template.quiz.onRendered(function(event, instance){
  let quizRoomId = Router.current().params._id;
  let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
  let ifQuestionsExists = quizRoom.questions[2];
if (ifQuestionsExists===undefined) {
  myApp.addNotification({
    title: 'Quiz',
    message: "There are no questions in this category",
    hold:2000,
  });
 }else {
   myApp.addNotification({
     title: 'Quiz',
     message: "Question 1",
     hold:2000,
   });
     if (Meteor.user().profile.sound===true) {
       Feedback.provide("somethingHappened");
     }
     $('.question-container').find('.active-state').removeClass('active-state');
  Session.set('question', 0);
    sixSecondTimer.start(function() {
      myApp.addNotification({
        title: 'Quiz',
        message: "Question 2",
        hold:2000,
      });
      if (Meteor.user().profile.sound===true) {
        Feedback.provide("somethingHappened");
        $('.question-container').find('.active-state').removeClass('active-state');
      }
      Session.set('question',1);
      sixSecondTimer.start(function() {
        myApp.addNotification({
          title: 'Quiz',
          message: "Question 3",
          hold:2000,
        });
        if (Meteor.user().profile.sound===true) {
          Feedback.provide("somethingHappened");
          $('.question-container').find('.active-state').removeClass('active-state');
        }
        Session.set('question',2);
        sixSecondTimer.start(function() {
          myApp.addNotification({
            title: 'Quiz',
            message: "Question 4",
            hold:2000,
          });
          if (Meteor.user().profile.sound===true) {
            Feedback.provide("somethingHappened");
            $('.question-container').find('.active-state').removeClass('active-state');
          }
          Session.set('question',3);
            sixSecondTimer.start(function() {
              myApp.addNotification({
                title: 'Quiz',
                message: "Question 5",
                hold:2000,
              });
              if (Meteor.user().profile.sound===true) {
                Feedback.provide("somethingHappened");
                $('.question-container').find('.active-state').removeClass('active-state');
              }
              Session.set('question',4);
                sixSecondTimer.start(function() {
                  myApp.addNotification({
                    title: 'Quiz',
                    message: "Question 6",
                    hold:2000,
                  });
                  if (Meteor.user().profile.sound===true) {
                    Feedback.provide("somethingHappened");
                    $('.question-container').find('.active-state').removeClass('active-state');
                  }
                  Session.set('question',5);
                    sixSecondTimer.start(function() {
                      let quizRoomId = Router.current().params._id;
                      let resultRoom = PlayedSessions.findOne({ originalRoomId: quizRoomId });
                      let quizRoom = QuizRooms.findOne({ _id: quizRoomId });

                      if (Meteor.userId()===quizRoom.challanger._id ){
                        Meteor.call("endGameForChallanger", quizRoomId );
                          if ( quizRoom.defenderPlayed) {
                            Meteor.call("makePlayFirstFalse",resultRoom._id);
                          };
                      };

                      if (Meteor.userId()===quizRoom.defender._id ){
                        Meteor.call("endGameForDefender", quizRoomId );
                          if ( quizRoom.challangerPlayed) {
                            Meteor.call("makePlayFirstFalse",resultRoom._id);
                          };
                      };
                       Router.go(`/quizResult/${resultRoom._id}`);
                      });
                  });
              });
          });
       });
    });
   }
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
      return quizRoom.questions[0];
    };
    if (Session.get('question')===1) {
      return quizRoom.questions[1];
    };
    if (Session.get('question')===2) {
      return quizRoom.questions[2];
    };
    if (Session.get('question')===3) {
      return quizRoom.questions[3];
    };
    if (Session.get('question')===4) {
      return quizRoom.questions[4];
    };
    if (Session.get('question')===5) {
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
    var time = sixSecondTimer.get();         
    var questionNumber = Session.get('question');               
    if (firstAnswer===rightAnswer) {
        if (Meteor.userId()===quizRoom.challanger._id) {
          Meteor.call("incChallangerRoomPoints", quizRoomId, time, questionNumber );
        };
        if (Meteor.userId()===quizRoom.defender._id) {
          Meteor.call("incdefenderRoomPoints", quizRoomId, time, questionNumber );
        };
    };
    Meteor.call("updateSessionData", quizRoomId, this.firstAnswer, questionNumber );
    sixSecondTimer.remove(time);
  },
  "click .eddy--sqr-buttons__plan": function(event, template) {
    event.preventDefault();
    let quizRoomId = Router.current().params._id
    let quizRoom = QuizRooms.findOne({ _id: quizRoomId })
    let secondAnswer = this.secondAnswer
    let rightAnswer = this.rightAnswer
    var time = sixSecondTimer.get() 
    var questionNumber = Session.get('question');
    if (secondAnswer===rightAnswer) {
        if (Meteor.userId()===quizRoom.challanger._id) {
          Meteor.call("incChallangerRoomPoints", quizRoomId, time, questionNumber )
        }
        if (Meteor.userId()===quizRoom.defender._id) {
          Meteor.call("incdefenderRoomPoints", quizRoomId, time, questionNumber )
        }
    }
    Meteor.call("updateSessionData", quizRoomId, this.secondAnswer, questionNumber )
    sixSecondTimer.remove(time)
  },
  "click .eddy--sqr-buttons__place": function(event, template) {
    event.preventDefault();
    let quizRoomId = Router.current().params._id;
    let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
    let thirdAnswer = this.thirdAnswer;
    let rightAnswer = this.rightAnswer;
    var time = sixSecondTimer.get(); 
    var questionNumber = Session.get('question');
    if (thirdAnswer===rightAnswer) {
        if (Meteor.userId()===quizRoom.challanger._id) {
          Meteor.call("incChallangerRoomPoints", quizRoomId, time, questionNumber);
        };
        if (Meteor.userId()===quizRoom.defender._id) {
          Meteor.call("incdefenderRoomPoints", quizRoomId, time, questionNumber );
        };
    };
    Meteor.call("updateSessionData", quizRoomId, this.thirdAnswer, questionNumber);
    sixSecondTimer.remove(time);
  },
  "click .eddy--sqr-buttons__product": function(event, template) {
    event.preventDefault();
    let quizRoomId = Router.current().params._id;
    let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
    let fourthAnswer = this.fourthAnswer;
    let rightAnswer = this.rightAnswer;
    var time = sixSecondTimer.get(); 
    var questionNumber = Session.get('question');
    if (fourthAnswer===rightAnswer) {
        if (Meteor.userId()===quizRoom.challanger._id) {
          Meteor.call("incChallangerRoomPoints", quizRoomId, time, questionNumber );
        };
        if (Meteor.userId()===quizRoom.defender._id) {
          Meteor.call("incdefenderRoomPoints", quizRoomId, time, questionNumber );
        };
    };
    Meteor.call("updateSessionData", quizRoomId, this.fourthAnswer, questionNumber );
    sixSecondTimer.remove(time);
  },

  'click #surrender':function(event,template){
    event.preventDefault();
    let quizRoomId = Router.current().params._id;
    let resultRoom = PlayedSessions.findOne({ originalRoomId: quizRoomId });
    let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
    if (Meteor.userId()===quizRoom.challanger._id ){
      Meteor.call("endGameForChallanger", quizRoomId );
        if ( quizRoom.defenderPlayed) {
          Meteor.call("makePlayFirstFalse",resultRoom._id);
        };
    };

    if (Meteor.userId()===quizRoom.defender._id ){
      Meteor.call("endGameForDefender", quizRoomId );
        if ( quizRoom.challangerPlayed) {
          Meteor.call("makePlayFirstFalse",resultRoom._id);
        };
    };
    sixSecondTimer.stop();
    Router.go(`/quizResult/${resultRoom._id}`);

  },

});

Template.quiz.onDestroyed(function () {

  let quizRoomId = Session.get('routerId');
  let quizRoom = QuizRooms.findOne({ _id: quizRoomId });

  if (Meteor.userId() === quizRoom.challanger._id) {
      Meteor.call("updateChallangersAccuracy", quizRoomId)
  }
  if (Meteor.userId() === quizRoom.defender._id) {
      Meteor.call("updateDefendersAccuracy", quizRoomId)
  }

  Session.set('challangeNotification', null);
  Session.set('didAccept', null);
  Session.set('question',null);
  console.log("accuracy method called");

});
