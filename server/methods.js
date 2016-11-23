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

       Notification.insert({
         postCreator: commentPayload.postCreator,
         topic: commentPayload.topic,
         when: new Date(),
         type: "comment",
         commenter: commentPayload.commenter,
       });
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

    likeAcomment: function ( commentData, liker ) {

    Posts.update(
      { _id: commentData.postId , "comments.body":commentData.body},
      { $addToSet: {"comments.$.likes": liker }}
     );

     Notification.insert({
       commentCreator: commentData.commenter.profile.name,
       topic: commentData.topic,
       when: new Date(),
       type: "commentLike",
       liker: liker,
     });

    },

    insertChallangeNotification: function (notificationData) {

      let array = QuestionBank.find({ chapter: notificationData.chapter }).fetch();
      let questions = _.sample(array, 6);

     let quizRoom = QuizRooms.insert({
         challanger: notificationData.challanger,
         challanged: notificationData.challanged,
         createdAt: new Date(),
         challangerRoomPoints: 0,
         challangedRoomPoints:0,
         questions:questions,
       });

       console.log(quizRoom);

      Notification.insert({
        challanger: notificationData.challanger,
        challanged: notificationData.challanged,
        when: notificationData.when,
        topic: notificationData.topic,
        chapter: notificationData.chapter,
        type: "challange",
        quizRoomId: quizRoom,
      });

    },

    removeChallangeNotification: function (notificationId,quizRoomId) {
      QuizRooms.remove({ _id: quizRoomId });
      Notification.remove({ _id: notificationId });
    },

    removeChallangeNotificationFromTimerPage: function (notificationData) {
      let notification = Notification.findOne({
        when: notificationData.when,
       });
       if (notification) {
          Notification.remove({ _id: notification._id });
       };
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
