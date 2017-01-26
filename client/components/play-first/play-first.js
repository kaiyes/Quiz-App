Template.playFirst.onCreated(function () {
  let self = this;
  self.roomId = Router.current().params._id;
  self.countdown = new ReactiveCountdown(120);

  Session.set('shouldTimerStart', true);

  self.countdown.start(function () {
    if (Session.get('shouldTimerStart')) {
      toastr.error("Match Failed");
      console.log("timer in play first ended");
      Router.go('/challengeOpponent');
    } else {
      console.log("Routing Shouldn't happen");
    }
  });

  self.autorun(function () {
    let quizRoom = QuizRooms.findOne({_id: self.roomId});
    if (quizRoom) {
      console.log(quizRoom.status);
      if (quizRoom.status==='running') {
        self.countdown.stop();
        Meteor.call('createQuizSession', { roomId: self.roomId }, function (err) {
          if(err) {
            toastr.error('unable to create quiz session');
          } else {
            Router.go(`/quiz/${self.roomId}`);
          }
        });
      }
    }
  })
});

Template.playFirst.onRendered(function () {
  let self = this;


});

Template.playFirst.helpers({
  userInfo: function () {
    return Session.get('playerInfo');
  },

  time: function () {
    return Template.instance().countdown.get();
  },

  opponentStarted: function (event, instance) {

  },
});

Template.playFirst.events({

  "click #play": function (event, instance) {
    event.preventDefault();
    console.log(instance.roomId);
    Meteor.call('startPlayFirst', { _id: instance.roomId }, function (err) {
      if (!err) {
        Meteor.call('createQuizSession', { roomId: instance.roomId }, function (err) {
          if(err) {
            toastr.error('unable to create quiz session');
          } else {
            Router.go(`/quiz/${instance.roomId}`);
          }
        });
      } else {
        toastr.error(err);
      }
    });
  },

  "click #cross": function (event, instance) {
    event.preventDefault();
    Router.go('/challengeOpponent');
    Meteor.call('removeRoomRequest', {_id: instance.roomId}, function (err) {
      if (!err) {
        toastr.info("Removed challenge request");
      } else {
        toastr.error(err);
      }
    });

  },
});

Template.playFirst.onDestroyed(function () {
  Session.set('challangeNotification', null);
  Session.set('shouldTimerStart', false);
  Session.set('didAccept', null);
  self.countdown.stop();
});
