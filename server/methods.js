Meteor.methods({
     addUser: function(email,password,profile){
     Accounts.createUser({
           email: email,
           password: password,
           profile: profile,
         });
     },

    addToProfile: function(profile){
      Meteor.users.update(
        { _id: this.userId },
        { $set: { profile: profile }}
      );
    },

    insertPost: function(payload){
      Posts.insert(payload);

      Notification.insert({
        topic: payload.topicName,
        when: new Date(),
        type: "post",
        createdBy: payload.createdBy,
      });
    },

    insertComment: function(commentPayload){
      Posts.update({ _id: commentPayload.postId },
         { $addToSet: { comments: commentPayload }});
    },

    like: function (id,liker) {
    let likerData = { likes: liker };
    Posts.update({ _id: id },{ $addToSet: likerData });

    let post = Posts.findOne({ _id:id });

      Notification.insert({
        postId: id,
        postCreator: post.createdBy.profile.name,
        topic: post.topicName,
        when: new Date(),
        type: "like",
        liker: liker,
      });
    },

    likeAcomment: function (id,body,liker) {
    let likerData = { likes: liker };

    Posts.update(
      { _id: id , "comments.body":body},
      {$addToSet: {"comments.$.likes": likerData }}
     );
    },

    insertChallangeNotification: function (notificationData) {
      Notification.insert({
        challanger: notificationData.challanger,
        challanged: notificationData.challanged,
        when: notificationData.when,
        topic: notificationData.topic,
        chapter: notificationData.chapter,
        type: "challange"
      });
    },


});


// increaseTotalPoints: function () {
//   Meteor.users.update(
//     { _id: this.userId },
//     { $inc: { "profile.totalPoints": 10 }}
//   );
// },
//
// increaseGamePoints: function () {
//   Meteor.users.update(
//     { _id: this.userId },
//     { $inc: { "profile.gamePoints": 10 }}
//   );
// },
