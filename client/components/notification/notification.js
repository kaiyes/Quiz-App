
Template.notification.helpers({

  challangeNotifications: function(){
    return Notification.find({
       "challanged._id": Meteor.userId(),
     });
  },

  postNotifications: function(){
    let topicsChosen = Meteor.user().profile.selectedCourses;
    return Notification.find({
      topic: { $in: topicsChosen }, type: "post"
    });
  },

});

Template.notification.events({
  "click #foo": function(event, template){

  }
});
