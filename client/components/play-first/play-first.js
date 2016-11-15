var countdown = new ReactiveCountdown(5);

Template.playFirst.onRendered(function(){
  countdown.start(function() {
    toastr.error("Match Failed");
    Router.go('/homePage');
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
    console.log(countdown.get());
  }
});
