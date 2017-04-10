var sixSecondTimer = new ReactiveCountdown(20);


Template.quiz.onCreated(function() {
    let quizRoomId = Router.current().params._id;
    Meteor.subscribe("quiz", quizRoomId);
    Meteor.subscribe("resultRoomByOriginalId", quizRoomId);
    Session.set('routerId', quizRoomId);
    Session.set('greenAnswer', null);

    _.delay(function () {
      var quizRoom = QuizRooms.findOne({ _id: quizRoomId });
      Meteor.subscribe("users", quizRoom.questions[2].topic);
      if (Meteor.userId() === quizRoom.challanger._id) {
          if (quizRoom.challangerPlayed) {
              myApp.addNotification({
                  title: 'Quiz',
                  message: "Game ended, start a new game",
                  hold: 2000,
              });
              Router.go('/challengeOpponent');
          }
      };

      if (Meteor.userId() === quizRoom.defender._id) {
          if (quizRoom.defenderPlayed) {
              myApp.addNotification({
                  title: 'Quiz',
                  message: "Game ended, start a new game",
                  hold: 2000,
              });
              Router.go('/challengeOpponent');
          }
      };
    }, 100);

});

Template.quiz.onRendered(function(event, instance) {

  _.delay(function () {
    var quizRoomId = Router.current().params._id;
    var quizRoom = QuizRooms.findOne({ _id: quizRoomId });
    var ifQuestionsExists = quizRoom.questions[2];
    if (ifQuestionsExists === undefined) {
        myApp.addNotification({
            title: 'Quiz',
            message: "There are no questions in this category",
            hold: 2000,
        });
        Router.go('/challengeOpponent');
    } else {
        myApp.addNotification({
            title: 'Quiz',
            message: "Question 1",
            hold: 2000,
        });
        $('.question-container').find('.active-state').removeClass('active-state');
        Session.set('question', 0);
        Session.set('greenAnswer', null);
        Session.set('firstAnswer', null);
        Session.set('secondAnswer', null);
        Session.set('thirdAnswer', null);
        Session.set('fourthAnswer', null);
        sixSecondTimer.start(function() {
            $(".question-container").unblock();
            myApp.addNotification({
                title: 'Quiz',
                message: "Question 2",
                hold: 2000,
            });
            $('.question-container').find('.active-state').removeClass('active-state');
            Session.set('question', 1);
            Session.set('greenAnswer', null);
            Session.set('firstAnswer', null);
            Session.set('secondAnswer', null);
            Session.set('thirdAnswer', null);
            Session.set('fourthAnswer', null);
            sixSecondTimer.start(function() {
                $(".question-container").unblock();
                myApp.addNotification({
                    title: 'Quiz',
                    message: "Question 3",
                    hold: 2000,
                });
                $('.question-container').find('.active-state').removeClass('active-state');
                Session.set('question', 2);
                Session.set('greenAnswer', null);
                Session.set('firstAnswer', null);
                Session.set('secondAnswer', null);
                Session.set('thirdAnswer', null);
                Session.set('fourthAnswer', null);
                sixSecondTimer.start(function() {
                    $(".question-container").unblock();
                    myApp.addNotification({
                        title: 'Quiz',
                        message: "Question 4",
                        hold: 2000,
                    });
                    $('.question-container').find('.active-state').removeClass('active-state');
                    Session.set('question', 3);
                    Session.set('greenAnswer', null);
                    Session.set('firstAnswer', null);
                    Session.set('secondAnswer', null);
                    Session.set('thirdAnswer', null);
                    Session.set('fourthAnswer', null);
                    sixSecondTimer.start(function() {
                        $(".question-container").unblock();
                        myApp.addNotification({
                            title: 'Quiz',
                            message: "Question 5",
                            hold: 2000,
                        });
                        $('.question-container').find('.active-state').removeClass('active-state');
                        Session.set('question', 4);
                        Session.set('greenAnswer', null);
                        Session.set('firstAnswer', null);
                        Session.set('secondAnswer', null);
                        Session.set('thirdAnswer', null);
                        Session.set('fourthAnswer', null);
                        sixSecondTimer.start(function() {
                            $(".question-container").unblock();
                            myApp.addNotification({
                                title: 'Quiz',
                                message: "Question 6",
                                hold: 2000,
                            });
                            $('.question-container').find('.active-state').removeClass('active-state');
                            Session.set('question', 5);
                            Session.set('greenAnswer', null);
                            Session.set('firstAnswer', null);
                            Session.set('secondAnswer', null);
                            Session.set('thirdAnswer', null);
                            Session.set('fourthAnswer', null);
                            sixSecondTimer.start(function() {
                                $(".question-container").unblock();
                                let quizRoomId = Router.current().params._id;
                                let resultRoom = PlayedSessions.findOne({ originalRoomId: quizRoomId });
                                let quizRoom = QuizRooms.findOne({ _id: quizRoomId });

                                if (Meteor.userId() === quizRoom.challanger._id) {
                                    Meteor.call("endGameForChallanger", quizRoomId);
                                    if (quizRoom.defenderPlayed) {
                                        Meteor.call("makePlayFirstFalse", resultRoom._id);
                                    };
                                };

                                if (Meteor.userId() === quizRoom.defender._id) {
                                    Meteor.call("endGameForDefender", quizRoomId);
                                    if (quizRoom.challangerPlayed) {
                                        Meteor.call("makePlayFirstFalse", resultRoom._id);
                                        Meteor.call("playfirstNotificationForDefender", quizRoomId);
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
  }, 300);
});



Template.quiz.helpers({

    quizRoom: function() {
        let quizRoomId = Router.current().params._id;
        return QuizRooms.findOne({ _id: quizRoomId });
    },

    timerCount: function() {
        return sixSecondTimer.get();
    },

    timer: function() {
        let quizRoomId = Router.current().params._id;
        let quizRoom = QuizRooms.findOne({ _id: quizRoomId });

        if (Session.get('question') === 0) {
            return quizRoom.questions[0];
        };
        if (Session.get('question') === 1) {
            return quizRoom.questions[1];
        };
        if (Session.get('question') === 2) {
            return quizRoom.questions[2];
        };
        if (Session.get('question') === 3) {
            return quizRoom.questions[3];
        };
        if (Session.get('question') === 4) {
            return quizRoom.questions[4];
        };
        if (Session.get('question') === 5) {
            return quizRoom.questions[5];
        };
    },

    rightAnswer: function(answer) {
        if (this.rightAnswer === answer) {
            return 'eddy--sqr-buttons__plan__primary'
        }
    },
});



Template.quiz.events({
    "click .eddy-quiz--option-btn": function(event, template) {
        event.stopPropagation();
        $('.toggle-opacity').addClass('opacity-20');
        $('.eddy-quiz--option').css('top', '0');
    },

    "click .eddy-quiz--option--close": function(event, template) {
        $('.eddy-quiz--option').css({ 'top': '-120px', 'transition': 'all 0.3s' });
        $('.toggle-opacity').removeClass('opacity-20');
    },

    "click .eddy-quiz--option--ok": function(event, template) {
        $('.eddy-quiz--option').css({ 'top': '-120px', 'transition': 'all 0.3s' });
        $('.toggle-opacity').removeClass('opacity-20');
    },

    "click .toggle-opacity": function(event, template) {
        $('.eddy-quiz--option').css({ 'top': '-120px', 'transition': 'all 0.3s' });
        $('.toggle-opacity').removeClass('opacity-20');
    },

    "click .button1": function(event, template) {
        event.preventDefault();
        Session.set('greenAnswer', 'value');
        let quizRoomId = Router.current().params._id;
        let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
        let firstAnswer = this.firstAnswer;
        let rightAnswer = this.rightAnswer;
        var time = sixSecondTimer.get();         
        var questionNumber = Session.get('question');               
        if (firstAnswer === rightAnswer) {
            if (Meteor.user().profile.sound === true) {
                $("#correct-answer").get(0).play();
            }
            Session.set('firstAnswer', 'eddy--sqr-buttons__plan__primary');
            if (Meteor.userId() === quizRoom.challanger._id) {
                Meteor.call("incChallangerRoomPoints", quizRoomId, time, questionNumber);
            };
            if (Meteor.userId() === quizRoom.defender._id) {
                Meteor.call("incdefenderRoomPoints", quizRoomId, time, questionNumber);
            };
        } else {
            if (Meteor.user().profile.sound === true) {
                $("#wrong-answer").get(0).play();
            }
            Session.set('firstAnswer', 'eddy--sqr-buttons__product__primary');
        };
        Meteor.call("updateSessionData", quizRoomId, this.firstAnswer, questionNumber);
        $$(".question-container").find(".eddy--sqr-buttons").removeClass("active-state");
        sixSecondTimer.remove(time);
        $(".question-container").block({ "message": null, overlayCSS: { backgroundColor: '#FFF' } });
    },
    "click .button2": function(event, template) {
        event.preventDefault();
        Session.set('greenAnswer', 'value');
        let quizRoomId = Router.current().params._id
        let quizRoom = QuizRooms.findOne({ _id: quizRoomId })
        let secondAnswer = this.secondAnswer
        let rightAnswer = this.rightAnswer
        var time = sixSecondTimer.get() 
        var questionNumber = Session.get('question');
        if (secondAnswer === rightAnswer) {
            if (Meteor.user().profile.sound === true) {
                $("#correct-answer").get(0).play();
            }
            Session.set('secondAnswer', 'eddy--sqr-buttons__plan__primary');
            if (Meteor.userId() === quizRoom.challanger._id) {
                Meteor.call("incChallangerRoomPoints", quizRoomId, time, questionNumber)
            }
            if (Meteor.userId() === quizRoom.defender._id) {
                Meteor.call("incdefenderRoomPoints", quizRoomId, time, questionNumber)
            }
        } else {
            if (Meteor.user().profile.sound === true) {
                $("#wrong-answer").get(0).play();
            }
            Session.set('secondAnswer', 'eddy--sqr-buttons__product__primary');
        };
        Meteor.call("updateSessionData", quizRoomId, this.secondAnswer, questionNumber)
        $$(".question-container").find(".eddy--sqr-buttons").removeClass("active-state");
        sixSecondTimer.remove(time);
        $(".question-container").block({ "message": null, overlayCSS: { backgroundColor: '#FFF' } });
    },
    "click .button3": function(event, template) {
        event.preventDefault();
        Session.set('greenAnswer', 'value');
        let quizRoomId = Router.current().params._id;
        let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
        let thirdAnswer = this.thirdAnswer;
        let rightAnswer = this.rightAnswer;
        var time = sixSecondTimer.get(); 
        var questionNumber = Session.get('question');
        if (thirdAnswer === rightAnswer) {
            if (Meteor.user().profile.sound === true) {
                $("#correct-answer").get(0).play();
            }
            Session.set('thirdAnswer', 'eddy--sqr-buttons__plan__primary');
            if (Meteor.userId() === quizRoom.challanger._id) {
                Meteor.call("incChallangerRoomPoints", quizRoomId, time, questionNumber);
            };
            if (Meteor.userId() === quizRoom.defender._id) {
                Meteor.call("incdefenderRoomPoints", quizRoomId, time, questionNumber);
            };
        } else {
            if (Meteor.user().profile.sound === true) {
                $("#wrong-answer").get(0).play();
            }
            Session.set('thirdAnswer', 'eddy--sqr-buttons__product__primary');
        };

        Meteor.call("updateSessionData", quizRoomId, this.thirdAnswer, questionNumber);
        $$(".question-container").find(".eddy--sqr-buttons").removeClass("active-state");
        sixSecondTimer.remove(time);
        $(".question-container").block({ "message": null, overlayCSS: { backgroundColor: '#FFF' } });
    },
    "click .button4": function(event, template) {
        event.preventDefault();
        Session.set('greenAnswer', 'value');
        let quizRoomId = Router.current().params._id;
        let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
        let fourthAnswer = this.fourthAnswer;
        let rightAnswer = this.rightAnswer;
        var time = sixSecondTimer.get(); 
        var questionNumber = Session.get('question');
        if (fourthAnswer === rightAnswer) {
            if (Meteor.user().profile.sound === true) {
                $("#correct-answer").get(0).play();
            }
            Session.set('fourthAnswer', 'eddy--sqr-buttons__plan__primary');
            if (Meteor.userId() === quizRoom.challanger._id) {
                Meteor.call("incChallangerRoomPoints", quizRoomId, time, questionNumber);
            };
            if (Meteor.userId() === quizRoom.defender._id) {
                Meteor.call("incdefenderRoomPoints", quizRoomId, time, questionNumber);
            };
        } else {
            if (Meteor.user().profile.sound === true) {
                $("#wrong-answer").get(0).play();
            }
            Session.set('fourthAnswer', 'eddy--sqr-buttons__product__primary');
        };
        Meteor.call("updateSessionData", quizRoomId, this.fourthAnswer, questionNumber);
        $$(".question-container").find(".eddy--sqr-buttons").removeClass("active-state");
        sixSecondTimer.remove(time);
        $(".question-container").block({ "message": null, overlayCSS: { backgroundColor: '#FFF' } });
    },

    'click #surrender': function(event, template) {
        event.preventDefault();
        let quizRoomId = Router.current().params._id;
        let resultRoom = PlayedSessions.findOne({ originalRoomId: quizRoomId });
        let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
        if (Meteor.userId() === quizRoom.challanger._id) {
            Meteor.call("endGameForChallanger", quizRoomId);
            if (quizRoom.defenderPlayed) {
                Meteor.call("makePlayFirstFalse", resultRoom._id);
            };
        };

        if (Meteor.userId() === quizRoom.defender._id) {
            Meteor.call("endGameForDefender", quizRoomId);
            if (quizRoom.challangerPlayed) {
                Meteor.call("makePlayFirstFalse", resultRoom._id);
                Meteor.call("playfirstNotificationForDefender", quizRoomId);
            };
        };
        sixSecondTimer.stop();
        Router.go(`/quizResult/${resultRoom._id}`);

    },

});

Template.quiz.onDestroyed(function() {

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
    Session.set('question', null);

});
