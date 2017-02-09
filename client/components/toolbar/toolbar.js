Template.toolbar.events({
  "click #home": function(event, template){
    Router.go('/homePage');
  },

});


Template.toolbar.helpers({
  notificationAll: function(){
    if (Meteor.user()) {
      let objArray = Meteor.user().profile.selectedCourses;
      let topicsChosen = _.map(objArray,'courseName');

      let notification = Notification.find({
        $or: [
          { type: "challange", "defender._id": Meteor.userId(),  },
          { type: "post", topic: { $in: topicsChosen }},
          { type: "like", postCreator: Meteor.user().profile.name },
          { type: "commentLike", commentCreator: Meteor.user().profile.name },
          { type: "comment", postCreator: Meteor.user() }
        ]
      }).count();
      return notification;
    }
    return {};
  },
});

Template.toolbar.onCreated(function() {
    if (Meteor.user()) {
    let objArray = Meteor.user().profile.selectedCourses;
    let topicsChosen = _.map(objArray,'courseName');
    let notificationCount = Notification.find({
      $or: [
        { type: "challange", "defender._id": Meteor.userId(),  },
        { type: "post", topic: { $in: topicsChosen }},
        { type: "like", postCreator: Meteor.user().profile.name },
        { type: "commentLike", commentCreator: Meteor.user().profile.name },
        { type: "comment", postCreator: Meteor.user() }
      ]
    }).count();
   Session.set('notificationOld', notificationCount);
   console.log(Session.get('notificationOld'));
 }
});


Template.toolbar.onRendered(function() {
  this.autorun(function(){
    if (Meteor.user()) {
      let objArray = Meteor.user().profile.selectedCourses;
      let topicsChosen = _.map(objArray,'courseName');
      let notification = Notification.find({
        $or: [
          { type: "challange", "defender._id": Meteor.userId(),  },
          { type: "post", topic: { $in: topicsChosen }},
          { type: "like", postCreator: Meteor.user().profile.name },
          { type: "commentLike", commentCreator: Meteor.user().profile.name },
          { type: "comment", postCreator: Meteor.user() }
        ]
      }).count();

     let oldNotification = Session.get('notificationOld');

     Tracker.afterFlush(function() {
         if (notification>oldNotification) {
           if (Meteor.user().profile.sound===true) {
            Feedback.provide("somethingHappened");
          }else {
            console.log(notification);
          }
         }
      });
    }
 });

});
