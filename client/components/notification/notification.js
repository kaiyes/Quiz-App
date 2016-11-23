
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

  likesOnComment: function(){
    return Notification.find({
      type: "commentLike",
      commentCreator: Meteor.user().profile.name
     });
  },

  commentNotification: function(){
    return Notification.find({
      type: "comment",
      postCreator: Meteor.user(),
     });
  },

});

Template.notification.events({

  "click #acceptChallange": function(event, template){
    console.log(this);
  },

  "click #denyChallange": function(event, template){
    Meteor.call("removeChallangeNotification", this._id);
  },
});
