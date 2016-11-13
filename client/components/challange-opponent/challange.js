Template.challengeOpponent.onRendered(function() {
    if (Framework7.prototype.device.android) {
      $('.eddy-challenge-mrgn-top').addClass('margin-top-56');
    }else {
      $('.eddy-challenge-mrgn-top').addClass('margin-top-48');
    }
});

Template.challengeOpponent.helpers({
  players: function(){
    return Meteor.users.find();
  }
});

Template.challengeOpponent.events({
  "click #player": function(event, template){
    console.log(Session.get('topicName'));
  },
});
