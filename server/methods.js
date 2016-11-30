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

    removePhoto:function(){
      Meteor.users.update(
        { _id: this.userId },
        {  $set: { "profile.image": " ", "profile.imageId": " " } }
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
           challangerStarted: true,
           challangedStarted: false,
         });

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

    updateOpponent: function (quizRoomId) {
       QuizRooms.update(
         { _id:quizRoomId },
         { $set:{ challangedStarted: true }}
       );
     },

    removeChallangeNotification: function (notificationId,quizRoomId) {
      QuizRooms.remove({ _id: quizRoomId });

      let notification = Notification.findOne({
        _id: notificationId,
       });
       if (notification) {
          Notification.remove({ _id: notificationId });
       };

       let quizRoom = QuizRooms.findOne({
         _id: quizRoomId,
        });
        if (quizRoom) {
           QuizRooms.remove({ _id: quizRoomId });
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
