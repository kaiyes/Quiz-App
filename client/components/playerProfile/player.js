Template.player.onDestroyed(function () {
    Session.set('player',null);
});

Template.player.helpers({
  userInfo: function(){
    return Session.get('player');
  },
});

Template.player.events({
  "click #cross": function(event, instance){
     event.preventDefault();
     window.history.back();
  },
});
