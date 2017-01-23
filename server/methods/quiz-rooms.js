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
  }
});