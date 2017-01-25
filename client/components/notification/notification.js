
Template.notification.helpers({

  challangeNotifications: function(){
    return Notification.find({ "defender._id": Meteor.userId()},
    { sort: { when: -1 }} );
  },

  postNotifications: function(){
    if (Meteor.user()) {
      let objArray = Meteor.user().profile.selectedCourses;
      let topicsChosen = _.map(objArray,'courseName');

      return Notification.find({ topic: { $in: topicsChosen }, type: "post"},
      { sort: { when: -1 }});
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
    console.log(this);
    let instance = this;
    Meteor.call('acceptQuizChallenge', {_id: instance.quizRoomId}, function () {
      Meteor.call('createQuizSession', { roomId: instance.quizRoomId }, function (err) {
        if(err) {
          toastr.error('unable to create quiz session');
        } else {
          // Meteor.call("removeChallangeNotification", instance._id, instance.quizRoomId);
          Router.go(`/quiz/${instance.quizRoomId}`);
        }
      });
    });
  },

  "click #denyChallange": function(event, template){
    Meteor.call("removeChallangeNotification", this._id, this.quizRoomId);
  },

  "click #postNotification": function(event, template){
      console.log(this.topic);
      Session.set('topicName',this.topic);
      Router.go('/courseDetails#community');
  },

  "click #likeNotification": function(event, template){
      console.log(this);
      Session.set('topicName',this.topic);
      Router.go('/courseDetails#community');
  },

  "click #likesOnComment": function(event, template){
      console.log(this);
      Session.set('topicName',this.topic);
      Router.go('/courseDetails#community');
  },

  "click #commentNotification": function(event, template){
      console.log(this);
      Session.set('topicName',this.topic);
      Router.go('/courseDetails#community');
  },


});
