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
        questions: _.map(questions, (data)=>{ data.answer = null; return data;}),
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
  acceptQuizChallenge: function (options) {
    try {
      QuizRooms.update({
        _id: options._id
      }, {
        $set: { status: 'running' }
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
      let increment = {};
      let quizRoom = QuizRooms.findOne({_id: options.roomId});
      let question = quizRoom.questions[options.questionIndex];

      if (quizRoom.challenger._id === Meteor.userId()) {
        QuizRooms.update({_id: options.roomId }, {
          $inc: { 'challenger.totalPoint': options.point, 'challenger.totalTime': options.timeCount }
        })
      } else if (quizRoom.defender._id === Meteor.userId()) {
        QuizRooms.update({_id: options.roomId }, {
          $inc: { 'defender.totalPoint': options.point, 'defender.totalTime': options.timeCount }
        })
      } else {
        return new Meteor.Error('permission denied')
      }

      let dataSet = {};
      dataSet[`questions.${options.questionIndex}.answer`] = options.answer;

      increment.givenAnswer = 1;
      increment.totalTIme = options.totalTime;
      if (question.rightAnswer == options.answer) {
        increment.point = 10;
        increment.correctAnswer = 1;
      } else {
        increment.wrongAnswer = 1;
      }

      if (question.length === (options.questionIndex+1)) {
        dataSet.isCompleted = true;
        increment.point *= 2;
      }

      const isUpdate = PlayedSessions.update({
        quizRoomId: options.roomId,
        'player._id': Meteor.userId()
      }, {
        $inc: increment,
        $set: dataSet
      });

      if (question.length === (options.questionIndex+1)) {
        if (quizRoom.defender._id === Meteor.userId()) {
          QuizRooms.update({_id: quizRoom._id}, {$set: { status: 'completed' }})
        }
      }

      return isUpdate;
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
});