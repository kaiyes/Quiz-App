Template.challengeOpponent.onRendered(function() {
    if (Framework7.prototype.device.android) {
      $('.eddy-challenge-mrgn-top').addClass('margin-top-56');
    }else {
      $('.eddy-challenge-mrgn-top').addClass('margin-top-48');
    }
});

Template.challengeOpponent.helpers({
  players: function(){
    let topicName = Session.get('topicName');
    return Meteor.users.find({
      'profile.selectedCourses.courseName': topicName,
      _id: { $ne: Meteor.userId() }
    });
  }
});

Template.challengeOpponent.events({
  "click #player": function(event, template){
    Session.set('playerInfo', this);

    let notificationData = {
      challanger: Meteor.user(),
      defender: Session.get('playerInfo'),
      when: new Date(),
      topic: Session.get('topicName'),
      chapter: Session.get('chapter'),
    };

    Session.set('challangeNotification', notificationData);
    Meteor.call("insertChallangeNotification",notificationData);
    Router.go('/playFirst');
  },
});
