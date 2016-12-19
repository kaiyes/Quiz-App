var countdown = new ReactiveCountdown(120);

Template.playFirst.onCreated(function(){
    Session.set('shouldTimerStart', true);
});

Template.playFirst.onRendered(function(){

  countdown.start(function() {
    if (Session.get('shouldTimerStart')) {
      toastr.error("Match Failed");
      console.log("timer in play first ended");
      Router.go('/homePage');
    } else {
      console.log("Routing Shouldn't happen");
    }
  });

  this.autorun(function(){
    let router = Session.get('didAccept');
      if (Session.get('didAccept')) {
        Router.go(`/quiz/${router}`);
      }

  });

});

Template.playFirst.helpers({
  userInfo: function(){
    return Session.get('playerInfo');
  },

  time:function(event, instance){
   return countdown.get();
  },

  opponentStarted:function(event, instance){
    var notificationData = Session.get('challangeNotification');
    var notification = Notification.findOne({
      when: notificationData.when,
     });
     var quizRoom = QuizRooms.findOne({
       _id: notification.quizRoomId,
      });
      if (quizRoom.defenderStarted) {
        Session.set('didAccept', quizRoom._id);
        if (Session.get('didAccept')) {
            return "accepted";
        }
      }
  },
});

Template.playFirst.events({
  "click #play": function(event, instance){
    let sessionData = Session.get('challangeNotification');
    let time = sessionData.when;
    let handle = Notification.findOne({ when: time.when });
    Router.go(`/quiz/${handle.quizRoomId}`);
  },

  "click #cross": function(event, instance){
     toastr.error("Match Failed");
     Router.go('/homePage');
     let notificationData = Session.get('challangeNotification');
     let notification = Notification.findOne({
       when: notificationData.when,
      });
      let quizRoom = QuizRooms.findOne({
        _id: notification.quizRoomId,
       });

      if (notification && quizRoom) {
         Meteor.call("removeChallangeNotification", notification._id,notification.quizRoomId);
      }
  },
});

Template.playFirst.onDestroyed(function () {
  Session.set('challangeNotification', null);
  Session.set('shouldTimerStart', false);
  Session.set('didAccept', null);
});
