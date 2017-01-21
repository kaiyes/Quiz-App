Meteor.publish('posts', function coursesPublication() {
  return Posts.find();
});