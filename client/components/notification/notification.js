
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

  likeNotifications: function(){
    return Notification.find({
      type: "like",
      postCreator: Meteor.user().profile.name
     });
  },

});

Template.notification.events({
  "click #foo": function(event, template){

  }
});
