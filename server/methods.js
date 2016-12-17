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

    addPhoto:function(url, id){
      Meteor.users.update(
        { _id: this.userId },
        {  $set: { "profile.image": url, "profile.imageId": id } }
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
           gameEnded:false,
         });

         PlayedSessions.insert({
             challanger: notificationData.challanger,
             challanged: notificationData.challanged,
             questions:questions,
             originalRoomId:quizRoom,
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

    incChallangerRoomPoints: function( quizRoomId ){
      QuizRooms.update({ _id:  quizRoomId }, { $inc:{ challangerRoomPoints:10 } });
      Meteor.users.update({ _id: this.userId },{ $inc: { "profile.totalPoints": 10 }});
    },

    incChallangedRoomPoints: function( quizRoomId ){
      QuizRooms.update({ _id: quizRoomId }, { $inc:{ challangedRoomPoints:10 } });
      Meteor.users.update({ _id: this.userId },{ $inc: { "profile.totalPoints": 10 }});
    },

    endGame:function(quizRoomId){
        QuizRooms.update({ _id: quizRoomId }, { $set: { gameEnded: true }});
    },

    updateSessionData: function (quizRoomId, givenAnswer, questionNumber) {
      let quizRoom = QuizRooms.findOne({ _id:  quizRoomId });

      if (quizRoom.challanger._id === this.userId) {

        if (questionNumber===0) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
          { $set: { "questions.0.challangersAnswer": givenAnswer }});
        };

        if (questionNumber===1) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
          { $set: { "questions.1.challangersAnswer": givenAnswer }});
        };

        if (questionNumber===2) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
          { $set: { "questions.2.challangersAnswer": givenAnswer }});
        };

        if (questionNumber===3) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
          { $set: { "questions.3.challangersAnswer": givenAnswer }});
        };

        if (questionNumber===4) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
          { $set: { "questions.4.challangersAnswer": givenAnswer }});
        };

        if (questionNumber===5) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
          { $set: { "questions.5.challangersAnswer": givenAnswer }});
        };

      };


      if (quizRoom.challanged._id === this.userId) {

        if (questionNumber===0) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
           { $set:  { "questions.0.defendersAnswer" : givenAnswer }});
        };

        if (questionNumber===1) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
           { $set:  { "questions.1.defendersAnswer" : givenAnswer }});
        };

        if (questionNumber===2) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
           { $set:  { "questions.2.defendersAnswer" : givenAnswer }});
        };

        if (questionNumber===3) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
           { $set:  { "questions.3.defendersAnswer" : givenAnswer }});
        };

        if (questionNumber===4) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
           { $set:  { "questions.4.defendersAnswer" : givenAnswer }});
        };

        if (questionNumber===5) {
          PlayedSessions.update({ originalRoomId : quizRoomId },
           { $set:  { "questions.5.defendersAnswer" : givenAnswer }});
        }


      };



    }
});
