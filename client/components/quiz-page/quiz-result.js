Template.quizResult.onCreated(function() {
  let self = this;
  let resultRoomId = Router.current().params._id;
  self.roomId = Router.current().params._id;

  self.autorun(function () {
    let room = PlayedSessions.findOne({ quizRoomId: resultRoomId, 'player._id': Meteor.userId() });
    if (room) {
      let accuracy = (room.correctAnswer/6)*100;
      Session.set('percent', accuracy);

      Session.set('question', room.questions[0]);
      Session.set('number', 0);
    }
  });

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
  rank: function () {
    let resultRoomId = Router.current().params._id;
    let quizRoom = QuizRooms.findOne({ _id: resultRoomId});
    let courseRanking = Courses.findOne({ courseName: quizRoom.course }).ranking;
    courseRanking = _.sortBy(courseRanking, ['points']);

    return _.findIndex(courseRanking, { 'userId': Meteor.userId() });
  },
  resultRoom: function(){
    let resultRoomId = Router.current().params._id;
    return QuizRooms.findOne({ _id: resultRoomId});
  },
  player: function () {
    return PlayedSessions.findOne({
      quizRoomId: Template.instance().roomId, 'player._id': Meteor.userId()
    });
  },
  opponent: function () {
    return PlayedSessions.findOne({
      quizRoomId: Template.instance().roomId, 'opponent._id': Meteor.userId()
    });
  },
  question: function(){
    let data = Session.get('question');
    return data;
  },
  questionRightAnswer(answer){
    console.log(this);
    console.log(answer);
    if (this.rightAnswer == answer) {
      return 'eddy--sqr-buttons__plan__primary'
    } else {
      return 'eddy--sqr-buttons__price';
    }

  },
  userGivenAnswer(answer){
    console.log(answer);
    if (this.answer == answer) {
      return 'eddy--sqr-buttons__product__primary'
    } else {
      return 'eddy--sqr-buttons__price';
    }
  },
  indexOfTopic: function(){
    let resultRoomId = Router.current().params._id;
    let room =  PlayedSessions.findOne({ quizRoomId: resultRoomId });
    let topic = room.questions[0].topic;
    let userCourseArray = Meteor.user().profile.selectedCourses;
    let courseObject = _.find(userCourseArray, { 'courseName': topic });
    return courseObject;
  },

  whoWon:function(){
    let resultRoomId = Router.current().params._id;
    let room =  PlayedSessions.findOne({ _id: resultRoomId });

    let player = PlayedSessions.findOne({
      quizRoomId: Template.instance().roomId, 'player._id': Meteor.userId()
    });
    let opponent = PlayedSessions.findOne({
      quizRoomId: Template.instance().roomId, 'opponent._id': Meteor.userId()
    });

    if (player.points > opponent.points) {
      return 'You won :D';
    } else if ( player.points == opponent.points){
      return 'Draw :|';
    } else {
      return 'You lost :(';
    }
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
    let room = PlayedSessions.findOne({ quizRoomId: resultRoomId });
    let chapter = room.questions[0].chapter;
    Session.set('playerInfo', room.opponent);


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
    let room = PlayedSessions.findOne({ quizRoomId: resultRoomId });
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
    let room = PlayedSessions.findOne({ quizRoomId: resultRoomId });
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

  "click #cross": function(event, template){
    event.preventDefault();
    Router.go('/challengeOpponent');
  },


});
