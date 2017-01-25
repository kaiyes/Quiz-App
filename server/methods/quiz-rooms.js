/**
 * Created by zahed on 1/24/17.
 */
Meteor.methods({
  createRoom: function(options) {
    try {
      let array = QuestionBank.find({ chapter: options.chapter }).fetch();
      let questions = _.sampleSize(array, 6);
      let defender = Meteor.users.findOne({
        _id: options.defender._id
      }, { fields: { _id: 1, emails: 1, profile: 1 } });

      const quizRoom = {
        challenger: options.challenger,
        defender: defender,
        questions: questions,
        course: options.topic,
        chapter: options.chapter
      };
      const _id = QuizRooms.insert(quizRoom);

      return _id;
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
  startPlayFirst: function (options) {
    try {
      QuizRooms.update({
        _id: options._id
      }, {
        $set: { isFirst: true }
      });
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
  updateChallengerResult: function (options) {
    
  },
  updateDefenderResult: function (options) {

  },
  rejectRoomRequest: function (options) {
    
  },
  removeRoomRequest: function (options) {
    try {
      let quizRoom = QuizRooms.findOne({_id: options._id});
      if (quizRoom.challenger._id === Meteor.userId()) {
        return QuizRooms.remove({_id: options._id});
      } else {
        return new Meteor.Error('permission denied')
      }
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
  storeQuizAnswer: function (options) {
    try {
      let quizRoom = QuizRooms.findOne({_id: options.roomId});
      let point = 0;
      let correctAnswer = 0;
      let wrongAnswer = 0;
      console.log(options);
      let question = quizRoom.questions[options.questionIndex];
      console.log(question);
      if (question.rightAnswer == options.answer) {
        point = 10;
        correctAnswer = 1;
      } else {
        wrongAnswer = 1;
      }
      if (quizRoom.challenger._id === Meteor.userId()) {
        QuizRooms.update({_id: options.roomId }, {
          $inc: { 'challenger.totalPoint': point, 'challenger.totalTime': options.timeCount }
        })
      } else if (quizRoom.defender._id === Meteor.userId()) {
        QuizRooms.update({_id: options.roomId }, {
          $inc: { 'defender.totalPoint': point, 'defender.totalTime': options.timeCount }
        })
      } else {
        return new Meteor.Error('permission denied')
      }
      let updateQuestion = [];
      updateQuestion = `question.${options.questionIndex}`;
      // updateQuestion = options.answer;
      console.log(updateQuestion);
      return PlayedSessions.update({
        quizRoomId: options.roomId,
        'player._id': Meteor.userId()
      }, {
        $inc: {
          givenAnswer: 1,
          points: point,
          wrongAnswer: wrongAnswer,
          correctAnswer: correctAnswer,
          totalTime: options.timeCount
        },
        $set: { updateQuestion: { answer: options.answer} }
      }, false, true);
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
});