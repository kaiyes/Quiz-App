Template.quizResult.onRendered(function() {
  $(document).ready(function	(){
    $(function(){
      var $ppc = $('.eddy-progress--wrapper'),
        percent = parseInt($ppc.data('percent')),
        deg = 360*percent/100;
      if (percent > 50) {
        $ppc.addClass('gt-50');
      }
      $('.eddy-progress--bar--fill').css('transform','rotate('+ deg +'deg)');
      $('.eddy-progress--percents span').html(percent+' %');
    });
  });
});

Template.quizResult.events({

  "click #community": function(event, template){
    event.preventDefault();
    Router.go('/courseDetails#community');
  },

  "click #playAgain": function(event, template){
    event.preventDefault();
    let resultRoomId = Router.current().params._id;
    let room = PlayedSessions.findOne({ _id: resultRoomId });
    let chapter = room.questions[0].chapter;
    if (Meteor.userId()===room.challanger._id) {
      Session.set('playerInfo', room.defender);
    }
    if (Meteor.userId()===room.defender._id) {
      Session.set('playerInfo', room.challanger);
    }

    let notificationData = {
      challanger: Meteor.user(),
      defender: Session.get('playerInfo'),
      when: new Date(),
      topic: Session.get('topicName'),
      chapter: chapter,
    };

    Session.set('challangeNotification', notificationData);
    Meteor.call("insertChallangeNotification",notificationData);
    Router.go('/playFirst');
  },

});

Template.quizResult.helpers({
  resultRoom: function(){
    let resultRoomId = Router.current().params._id;
    return PlayedSessions.findOne({ _id: resultRoomId });
  }
});
