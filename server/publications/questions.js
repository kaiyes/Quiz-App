Meteor.publish('questions', function coursesPublication() {
  return QuestionBank.find();
});