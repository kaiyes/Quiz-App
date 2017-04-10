Template.toolbar.onCreated(function() {
    if (Meteor.user()) {
    Meteor.subscribe("notificationCount");
    let notificationCount = Notification.find({ }).count();
   Session.set('notificationOld', notificationCount);
 }
});

Template.toolbar.onRendered(function() {
  $("#notification-sound").hide();
  this.autorun(function(){
    if (Meteor.user()) {
     let notification = Notification.find({ }).count();
     let oldNotification = Session.get('notificationOld');
     Tracker.afterFlush(function() {
         if (notification>oldNotification) {
           if (Meteor.user().profile.sound===true) {
             $("#notification-sound").get(0).play();
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
        seen: { $ne: Meteor.userId()}
      }).count();
      return notification;
    }
  },
});

Template.toolbar.events({
  "click #home": function(event, template){
    Router.go('/homePage');
  },
  "click .eddy-toolbar--icon__noti": function(event, template) {
   event.preventDefault();
   Meteor.call("makeSeen");
  },
});
