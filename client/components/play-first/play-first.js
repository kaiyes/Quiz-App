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
    Router.go('/quiz');
  },
  "click #cross": function(event, instance){
    toastr.error("Match Failed");
    Router.go('/homePage');
  },
});
