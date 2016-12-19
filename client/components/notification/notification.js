
Template.notification.helpers({

  challangeNotifications: function(){
    return Notification.find({ "defender._id": Meteor.userId()}, { sort: { when: -1 }} );
  },

  postNotifications: function(){
    if (Meteor.user()) {
      let topicsChosen = Meteor.user().profile.selectedCourses;
      return Notification.find({ topic: { $in: topicsChosen }, type: "post"}, { sort: { when: -1 }});
    }
  },

  likeNotifications: function(){
    if (Meteor.user()) {
      return Notification.find({
        type: "like",
        postCreator: Meteor.user().profile.name
       }, { sort: { when: -1 }});
    }
  },

  likesOnComment: function(){
    if (Meteor.user()) {
      return Notification.find({
        type: "commentLike",
        commentCreator: Meteor.user().profile.name
       }, { sort: { when: -1 }});
    }
  },

  commentNotification: function(){
    if (Meteor.user()) {
      return Notification.find({
        type: "comment",
        postCreator: Meteor.user(),
       }, { sort: { when: -1 }});
    }
  },

});

Template.notification.events({

  "click #acceptChallange": function(event, template){
     Meteor.call("updateOpponent", this.quizRoomId);
     Router.go(`/quiz/${this.quizRoomId}`);
  },

  "click #denyChallange": function(event, template){
    Meteor.call("removeChallangeNotification", this._id, this.quizRoomId);
  },
});
