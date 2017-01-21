Meteor.publish('notifications', function coursesPublication() {
  return Notification.find();
});