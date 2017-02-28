Template.notification.onCreated(function() {
  Meteor.subscribe("notification");
})

Template.notification.helpers({

  challangeNotifications: function(){
    return Notification.find({ "defender._id": Meteor.userId()},
      { sort: { when: -1 }} );
  },

  postNotifications: function(){
    if (Meteor.user()) {
      let objArray = Meteor.user().profile.selectedCourses;
      let topicsChosen = _.map(objArray,'courseName');

      return Notification.find({
        topic: { $in: topicsChosen },
        deleted: { $ne: Meteor.userId()},
        type: "post"},{
          sort: { when: -1 }
        });
    }
  },

  likeNotifications: function(){
    if (Meteor.user()) {
      return Notification.find({
        type: "like",
        deleted: { $ne: Meteor.userId()},
        postCreator: Meteor.user().profile.name
      }, { sort: { when: -1 }});
    }
  },

  likesOnComment: function(){
    if (Meteor.user()) {
      return Notification.find({
        type: "commentLike",
        deleted: { $ne: Meteor.userId()},
        commentCreator: Meteor.user().profile.name
      }, { sort: { when: -1 }});
    }
  },

  commentNotification: function(){
    if (Meteor.user()) {
      return Notification.find({
        type: "comment",
        deleted: { $ne: Meteor.userId()},
        "postCreator._id": Meteor.userId(),
      }, { sort: { when: -1 }});
    }
  },

});

Template.notification.events({

  "click #acceptChallange": function(event, template){
   Meteor.call("updateOpponent", this.quizRoomId);
   Meteor.call("removeChallangeNotification", this._id);
   Router.go(`/quiz/${this.quizRoomId}`);
 },

 "click #denyChallange": function(event, template){
  Meteor.call("removeChallangeNotification", this._id);
},

"click #postNotification": function(event, template){
  Session.set('topicName',this.topic);
  _.delay(function(){ Router.go('/courseDetails#community'); },100);
},

"click #likeNotification": function(event, template){
  Session.set('topicName',this.topic);
  _.delay(function(){ Router.go('/courseDetails#community'); },100);
},

"click #likesOnComment": function(event, template){
  Session.set('topicName',this.topic);
  _.delay(function(){ Router.go('/courseDetails#community'); },100);
},

"click #commentNotification": function(event, template){
  Session.set('topicName',this.topic);
  _.delay(function(){ Router.go('/courseDetails#community'); },100);
},

"click #player": function(event, template) {
 event.preventDefault();
 Session.set('player', this.challanger);
 _.delay(function(){ Router.go('/player'); },100);
},

"click #playerAsLiker": function(event, template) {
  event.preventDefault();
  Session.set('player', this.liker);
  _.delay(function(){ Router.go('/player'); },100);
},

"click #playerAsCommenter": function(event, template) {
  event.preventDefault();
  Session.set('player', this.commenter);
  _.delay(function(){ Router.go('/player'); },100);
},

"click #playerAsPostLiker": function(event, template) {
 event.preventDefault();
 Session.set('player', this.liker);
 _.delay(function(){ Router.go('/player'); },100);
},

"click #playerAsPoster": function(event, template) {
  event.preventDefault();
  Session.set('player', this.createdBy);
  _.delay(function(){ Router.go('/player'); },100);
},

"click #removePostNotification": function(event, template) {
  event.preventDefault();
  Meteor.call("delete", this);
},

"click #removeLikeNotification": function(event, template) {
  event.preventDefault();
  Meteor.call("delete", this);
},

"click #removeCommentsLikeNotification": function(event, template) {
  event.preventDefault();
  Meteor.call("delete", this);
},

"click #removeCommentsNotification": function(event, template) {
 event.preventDefault();
 Meteor.call("delete", this);
},

"click .eddy-toolbar--icon__noti": function(event, template) {
 event.preventDefault();
 Meteor.call("makeSeen");
},

});
