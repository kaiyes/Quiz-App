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
        topic: options.topic,
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
        $set: { 'challenger.isFirst': true }
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
});