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

    addRanking: function(){
        let objArray = Meteor.user().profile.selectedCourses;
        let topicsChosen = _.map(objArray,'courseName');

        let userData = {
          user: Meteor.user(),
          points: 10,
          userId: this.userId,
        };

       topicsChosen.forEach(function(q){
         Courses.update (
           { courseName: q },
            { $addToSet: { ranking: userData  }});
       });
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
      let questions = _.sampleSize(array, 6);

       let quizRoom = QuizRooms.insert({
           challanger: notificationData.challanger,
           defender: notificationData.defender,
           createdAt: new Date(),
           challangerRoomPoints: 0,
           defenderRoomPoints:0,
           questions:questions,
           challangerStarted: true,
           defenderStarted: false,
           gameEnded:false,
         });

         PlayedSessions.insert({
             challanger: notificationData.challanger,
             defender: notificationData.defender,
             questions:questions,
             originalRoomId:quizRoom,
             challangersPoint:0,
             defendersPoint:0,
             challangersRightAnswer:0,
             defendersRightAnswer:0,
             accuracy:0,
           });

        Notification.insert({
          challanger: notificationData.challanger,
          defender: notificationData.defender,
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
         { $set:{ defenderStarted: true }}
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

      PlayedSessions.update({ originalRoomId: quizRoomId }, {
        $inc: { challangersPoint: 10, challangersRightAnswer:1 }
      });

      let room = QuizRooms.findOne({ _id:  quizRoomId });
      let topic = room.questions[0].topic;
      let userCourseArray = Meteor.user().profile.selectedCourses;
      let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': topic });
      let increasePoints = {};
      increasePoints[`profile.selectedCourses.${thisCoursesIndex}.points`] = 10;
      Meteor.users.update({ _id: this.userId },
        {  $inc:   increasePoints });

      let userArray = Courses.findOne({ courseName: topic }).ranking;
      let usersIndexinCourse = _.findIndex(userArray, { 'userId': this.userId });
      let increaseCoursePoints = {};
      increaseCoursePoints[`ranking.${usersIndexinCourse}.points`] = 10;
      Courses.update({ courseName: topic }, {  $inc:   increaseCoursePoints });

      console.log("challangers point updated");
    },

    incdefenderRoomPoints: function( quizRoomId ){
      QuizRooms.update({ _id: quizRoomId }, { $inc:{ defenderRoomPoints:10 } });

      PlayedSessions.update({ originalRoomId: quizRoomId }, {
        $inc: { defendersPoint: 10, defendersRightAnswer:1 }
      });

      let room = QuizRooms.findOne({ _id:  quizRoomId });
      let topic = room.questions[0].topic;
      let userCourseArray = Meteor.user().profile.selectedCourses;
      let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': topic });
      let increasePoints = {};
      increasePoints[`profile.selectedCourses.${thisCoursesIndex}.points`] = 10;
      Meteor.users.update({ _id: this.userId },
        {  $inc:   increasePoints });

      let userArray = Courses.findOne({ courseName: topic }).ranking;
      let usersIndexinCourse = _.findIndex(userArray, { 'userId': this.userId });
      let increaseCoursePoints = {};
      increaseCoursePoints[`ranking.${usersIndexinCourse}.points`] = 10;
      Courses.update({ courseName: topic }, {  $inc:   increaseCoursePoints });

      console.log("defenders point updated");
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


      if (quizRoom.defender._id === this.userId) {

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

    },

    test:function () {
      console.log("working");
      let index = 0;
      let toUpdate = {};
      toUpdate[`profile.selectedCourses.${index}.points`] = 100;

      Meteor.users.update({ _id: this.userId },
        {  $inc:   toUpdate });
    },
});
