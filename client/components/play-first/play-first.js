var countdown = new ReactiveCountdown(120);

Template.playFirst.onRendered(function(){
  countdown.start(function() {
    if (Session.equals('quizStarted','started')) {
      console.log("timer was stopped");
    } else {
      toastr.error("Match Failed");
      Router.go('/homePage');
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
     let notificationData = Session.get('challangeNotification');
     let notification = Notification.findOne({
       when: notificationData.when,
      });
      console.log(notification);
      Meteor.call("removeChallangeNotification", notification._id,notification.quizRoomId);
     Router.go('/homePage');
  },
});

Template.quiz.onDestroyed(function () {
  Session.set('challangeNotification', null);
});
