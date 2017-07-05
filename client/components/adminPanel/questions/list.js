Template.questionList.events({
    'click #del' (event, instance) {
      event.preventDefault();
      QuestionBank.remove({ _id: this._id });
    },
    'click #edit' (event, instance) {
      event.preventDefault();
      Router.go(`/editQuestions/${this._id}`);
    }

});

Template.questionList.helpers({
  questions: function(){
    Meteor.subscribe('questions');
    return QuestionBank.find();
  },
});
