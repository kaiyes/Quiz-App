Template.quizResult.onRendered(function() {

  let resultRoomId = Router.current().params._id;
  let room = PlayedSessions.findOne({ _id: resultRoomId });
  Session.set('question', room.questions[0]);
  Session.set('number', 0);

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

  "click #playAnother": function(event, template){
    event.preventDefault();
    Router.go('/challengeOpponent');
  },

  "click #left": function(event, template){
    event.preventDefault();
    let resultRoomId = Router.current().params._id;
    let room = PlayedSessions.findOne({ _id: resultRoomId });
    let currentNumber = Session.get('number');
    if (currentNumber===0) {
      Session.set('number', 5);
    } else {
      Session.set('number', currentNumber-1);
    }

    var session = Session.get('number');
      switch(session) {
        case 0:
        console.log("0");
        break;
        case 1:
        console.log("1");
        break;
        case 2:
        console.log("2");
        break;
        case 3:
        console.log("3");
        break;
        case 4:
        console.log("4");
        break;
        case 5:
        console.log("5");
        break;
        default:
        console.log("0");
      }
  },

  "click #right": function(event, template){
    event.preventDefault();
    let resultRoomId = Router.current().params._id;
    let room = PlayedSessions.findOne({ _id: resultRoomId });
    let currentNumber = Session.get('number');
    if (currentNumber===5) {
      Session.set('number', 0);
    } else {
      Session.set('number', currentNumber+1);
    }

    var session = Session.get('number');
      switch(session) {
        case 0:
        console.log("0");
        break;
        case 1:
        console.log("1");
        break;
        case 2:
        console.log("2");
        break;
        case 3:
        console.log("3");
        break;
        case 4:
        console.log("4");
        break;
        case 5:
        console.log("5");
        break;
        default:
        console.log("0");
      }
  },

});

Template.quizResult.helpers({
  resultRoom: function(){
    let resultRoomId = Router.current().params._id;
    return PlayedSessions.findOne({ _id: resultRoomId });
  },

   question: function(){
    let data = Session.get('question');
    return data;
  },

});
