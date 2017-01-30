Template.quizResult.onCreated(function() {

  let resultRoomId = Router.current().params._id;
  let room = PlayedSessions.findOne({ _id: resultRoomId });

  if (Meteor.userId()===room.challanger._id ){
    let accuracy = (room.challangersRightAnswer/6)*100;
    Session.set('percent', accuracy);
    Meteor.call("updateChallangersAccuracy", resultRoomId, accuracy);
  };
  if (Meteor.userId()===room.defender._id ){
    let accuracy = (room.defendersRightAnswer/6)*100;
    Session.set('percent', accuracy);
    Meteor.call("updateDefendersAccuracy", resultRoomId, accuracy);
  };
  Session.set('question', room.questions[0]);
  Session.set('number', 0);
});


Template.quizResult.onRendered(function() {

  $(document).ready(function	(){
    $(function(){
      var $ppc = $('.eddy-progress--wrapper'),
        accuracy = parseInt($ppc.data('percent')),
        deg = 360*accuracy/100;
      if (accuracy > 50) {
        $ppc.addClass('gt-50');
      }
      $('.eddy-progress--bar--fill').css('transform','rotate('+ deg +'deg)');
      $('.eddy-progress--percents span').html(accuracy+' %');
    });
  });

});

Template.quizResult.helpers({
  ranking: function(){
    let resultRoomId = Router.current().params._id;
    let room = PlayedSessions.findOne({ _id: resultRoomId });
    let topic = room.questions[0].topic;

    let rankingArray =  Courses.findOne({ courseName: topic }).ranking;
    let points = _.sortBy(rankingArray, ['points']);
    let reverse = _.reverse(points);
    let ranking = _.findIndex(reverse , {'userId': Meteor.userId() });

    if (ranking<=0) {
      return 'king';
    } else {
      return ranking;
    };
  },

  rightAnswer:function(answer) {
    if (this.rightAnswer === answer) {
     return 'eddy--sqr-buttons__plan__primary'
   }
 },

 usersAnswer:function(answer){

   let resultRoomId = Router.current().params._id;
   let room = PlayedSessions.findOne({ _id: resultRoomId });

   if ( Meteor.userId()===room.challanger._id ){
       if (this.challangersAnswer=== answer) {
        return 'eddy--sqr-buttons__product__primary'
      } else {
        return 'eddy--sqr-buttons__price'
      }
   };

   if ( Meteor.userId()===room.defender._id ){
     if (this.defendersAnswer=== answer) {
      return 'eddy--sqr-buttons__product__primary'
    } else {
      return 'eddy--sqr-buttons__price'
    }
   };

 },

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

  "click #cross": function(event, template){
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
        Session.set('question', room.questions[0]);
        break;
        case 1:
        Session.set('question', room.questions[1]);
        break;
        case 2:
        Session.set('question', room.questions[2]);
        break;
        case 3:
        Session.set('question', room.questions[3]);
        break;
        case 4:
        Session.set('question', room.questions[4]);
        break;
        case 5:
        Session.set('question', room.questions[5]);
        break;
        default:
        Session.set('question', room.questions[5]);
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
        Session.set('question', room.questions[0]);
        break;
        case 1:
        Session.set('question', room.questions[1]);
        break;
        case 2:
        Session.set('question', room.questions[2]);
        break;
        case 3:
        Session.set('question', room.questions[3]);
        break;
        case 4:
        Session.set('question', room.questions[4]);
        break;
        case 5:
        Session.set('question', room.questions[5]);
        break;
        default:
        Session.set('question', room.questions[1]);
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

  indexOfTopic: function(){
    let resultRoomId = Router.current().params._id;
    let room =  PlayedSessions.findOne({ _id: resultRoomId });
    let topic = room.questions[0].topic;
    let userCourseArray = Meteor.user().profile.selectedCourses;
    let courseObject = _.find(userCourseArray, { 'courseName': topic });
    return courseObject;
  },

  whoWon:function(){
    let resultRoomId = Router.current().params._id;
    let room =  PlayedSessions.findOne({ _id: resultRoomId });

    if (room.playfirst) {
       return 'result will be displayed after opponent has played';
    } else {
      if (room.challangersPoint > room.defendersPoint) {
        if (Meteor.userId()===room.challanger._id ) {
           return 'you won :D';
        } else {
           return 'you lost :(';
        }
      } else if (room.challangersPoint < room.defendersPoint){
        if (Meteor.userId()===room.challanger._id ) {
           return 'you lost :(';
        } else {
            return 'you won :D';
        }
      };
    }
  },

});
