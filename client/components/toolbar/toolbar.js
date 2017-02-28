Template.toolbar.onCreated(function() {
    if (Meteor.user()) {
    Meteor.subscribe("notification");
    let objArray = Meteor.user().profile.selectedCourses;
    let topicsChosen = _.map(objArray,'courseName');
    let notificationCount = Notification.find({
      $or: [
        { type: "challange", "defender._id": Meteor.userId(), seen: { $ne: Meteor.userId()} },
        { type: "post", topic: { $in: topicsChosen }, seen: { $ne: Meteor.userId()} },
        { type: "like", postCreator: Meteor.user().profile.name, seen: { $ne: Meteor.userId()} },
        { type: "commentLike", commentCreator: Meteor.user().profile.name, seen: { $ne: Meteor.userId()} },
        { type: "comment", postCreator: Meteor.user(), seen: { $ne: Meteor.userId()} }
      ]
    }).count();
   Session.set('notificationOld', notificationCount);
 }
});


Template.toolbar.onRendered(function() {
  this.autorun(function(){
    if (Meteor.user()) {
      let objArray = Meteor.user().profile.selectedCourses;
      let topicsChosen = _.map(objArray,'courseName');
      let notification = Notification.find({
        $or: [
          { type: "challange", "defender._id": Meteor.userId(), seen: { $ne: Meteor.userId()} },
          { type: "post", topic: { $in: topicsChosen }, seen: { $ne: Meteor.userId()} },
          { type: "like", postCreator: Meteor.user().profile.name, seen: { $ne: Meteor.userId()} },
          { type: "commentLike", commentCreator: Meteor.user().profile.name, seen: { $ne: Meteor.userId()} },
          { type: "comment", postCreator: Meteor.user(), seen: { $ne: Meteor.userId()} }
        ]
      }).count();

     let oldNotification = Session.get('notificationOld');

     Tracker.afterFlush(function() {
         if (notification>oldNotification) {
           if (Meteor.user().profile.sound===true) {
            Feedback.provide("somethingHappened");
          }else {
          }
         }
      });
    }
 });

});

Template.toolbar.helpers({
  notificationAll: function(){
    if (Meteor.user()) {
      let objArray = Meteor.user().profile.selectedCourses;
      let topicsChosen = _.map(objArray,'courseName');

      let notification = Notification.find({
        $or: [
          { type: "challange", "defender._id": Meteor.userId() },
          { type: "post", topic: { $in: topicsChosen }, seen: { $ne: Meteor.userId()} },
          { type: "like", postCreator: Meteor.user().profile.name, seen: { $ne: Meteor.userId()} },
          { type: "commentLike", commentCreator: Meteor.user().profile.name, seen: { $ne: Meteor.userId()} },
          { type: "comment", postCreator: Meteor.user(), seen: { $ne: Meteor.userId()} }
        ]
      }).count();
      return notification;
    }
  },
});

Template.toolbar.events({
  "click #home": function(event, template){
    Router.go('/homePage');
  },
});
