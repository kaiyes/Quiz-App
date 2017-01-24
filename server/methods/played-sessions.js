/**
 * Created by zahed on 1/24/17.
 */
Meteor.methods({
  createQuizSession: function (options) {
    try {
      let quizRoom = QuizRooms.findOne({_id: options.roomId});
      let quizSessions = {};
      if (quizRoom.challenger._id === Meteor.userId()) {
        quizSessions.player = quizRoom.challenger;
        quizSessions.opponent = quizRoom.defender;
      } else {
        quizSessions.player = quizRoom.defender;
        quizSessions.opponent = quizRoom.challenger;
      }

      quizSessions.totalQuestion = quizRoom.questions.length;
      quizSessions.quizRoomId = options.roomId;
      quizSessions.chapter = quizRoom.chapter;
      quizSessions.course = quizRoom.course;
      quizSessions.questions = quizRoom.questions;

      let checkSession = PlayedSessions.findOne({ quizRoomId: options.roomId, 'player._id': Meteor.userId()});
      if (!checkSession) {
        let _id = PlayedSessions.insert(quizSessions);
        console.log(_id);
        return _id;
      }

      return checkSession._id;
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
  skipQuizQuestion: function (options) {
    try {
      return PlayedSessions.update({
        quizRoomId: options.roomId,
        'player._id': Meteor.userId()
      }, { $inc: { givenAnswer: 1}})
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
});