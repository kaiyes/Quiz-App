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

    addCourse:function (courseData) {
      Meteor.users.update(
        { _id: this.userId },
        { $addToSet: { "profile.selectedCourses": courseData  }}
      );
    },

    removeCourse:function (courseData) {
      Meteor.users.update(
        { _id: this.userId },
        { $pull: { "profile.selectedCourses": courseData  }}
      );
    },

    addRanking: function(){
        let objArray = Meteor.user().profile.selectedCourses;
        let topicsChosen = _.map(objArray,'courseName');

        let userData = {
          user: Meteor.user(),
          points: 0,
          userId: this.userId,
          name: Meteor.user().profile.name,
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

      let text =`${payload.createdBy.profile.name} posted in ${payload.topicName}` ;
      let usersArray = Courses.findOne({ courseName:`${payload.topicName}` }).ranking;
      let users = _.map(usersArray,'userId');

      Push.send({
        text,
        title:"Post",
        from:"Poster",
        badge: 1,
        query: { userId: {$in: users} },
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

       let text =`${commentPayload.commenter.profile.name} commented on your post in ${commentPayload.topic}`;
       let userId = commentPayload.postCreator._id;

       Push.send({
         text,
         title:"Comment",
         from:"commenter",
         badge: 1,
         query: { userId: userId },
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

      let text =`${liker.profile.name} liked your post in ${post.topicName}`;

      Push.send({
        text,
        title:"Comment",
        from:"Liker",
        badge: 1,
        query: { userId: post.createdBy._id },
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

       let text =`${liker.profile.name} liked your comment in ${commentData.topic}`;
       Push.send({
         text,
         title:"Comment",
         from:"Liker",
         badge: 1,
         query: { userId: commentData.commenter._id },
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
           challangerPlayed:false,
           defenderPlayed:false,
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
             playfirst:false,
             challangerPlayed:false,
             defenderPlayed:false,
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

        let text =`${notificationData.challanger.profile.name} Challenged you in ${notificationData.topic}`;
        Push.send({
          text,
          title:"Challenge",
          from:"Challenger",
          badge: 1,
          query: { userId: notificationData.defender._id },
        });


        let userCourseArray = Meteor.user().profile.selectedCourses;
        let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': notificationData.topic });

        let playedChapters = {};
        playedChapters[`profile.selectedCourses.${thisCoursesIndex}.playedChapters`] = notificationData.chapter;
        Meteor.users.update({ _id: this.userId },
          {  $addToSet:   playedChapters });
    },

    updateOpponent: function (quizRoomId) {
       QuizRooms.update(
         { _id:quizRoomId },
         { $set:{ defenderStarted: true }}
       );

       let chapter = QuizRooms.findOne({ "_id": quizRoomId }).questions[0].chapter;
       let topic = QuizRooms.findOne({ "_id": quizRoomId }).questions[0].topic;
       let userCourseArray = Meteor.user().profile.selectedCourses;
       let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': topic });

       let playedChapters = {};
       playedChapters[`profile.selectedCourses.${thisCoursesIndex}.playedChapters`] = chapter;
       Meteor.users.update({ _id: this.userId },
         {  $addToSet:   playedChapters });
     },

    removeChallangeNotification: function (notificationId,quizRoomId) {

      let notification = Notification.findOne({
        _id: notificationId,
       });
       if (notification) {
          Notification.remove({ _id: notificationId });
       };

      //  let quizRoom = QuizRooms.findOne({
      //    _id: quizRoomId,
      //   });
      //   if (quizRoom) {
      //      QuizRooms.remove({ _id: quizRoomId });
      //   };
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

    updateChallangersAccuracy:function (resultRoomId, accuracy) {
      let resultRoom = PlayedSessions.findOne({_id: resultRoomId });
      let topic = resultRoom.questions[0].topic;
      let userCourseArray = Meteor.user().profile.selectedCourses;
      let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': topic });
      let addAccuracy = {};
      addAccuracy[`profile.selectedCourses.${thisCoursesIndex}.accuracy`] = accuracy;

      Meteor.users.update({ _id: this.userId },
        {  $addToSet:   addAccuracy });
    },

    updateDefendersAccuracy:function (resultRoomId, accuracy) {
      let resultRoom = PlayedSessions.findOne({_id: resultRoomId });
      let topic = resultRoom.questions[0].topic;
      let userCourseArray = Meteor.user().profile.selectedCourses;
      let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': topic });
      let addAccuracy = {};
      addAccuracy[`profile.selectedCourses.${thisCoursesIndex}.accuracy`] = accuracy;

      Meteor.users.update({ _id: this.userId },
        {  $addToSet:   addAccuracy });
    },

    endGameForChallanger:function(quizRoomId){
        QuizRooms.update({ _id: quizRoomId }, { $set: { challangerPlayed : true }});
        PlayedSessions.update(
          { originalRoomId: quizRoomId },
          { $set:{ challangerPlayed: true }}
        );
    },

    endGameForDefender:function(quizRoomId){
        QuizRooms.update({ _id: quizRoomId }, { $set: { defenderPlayed : true }});
        PlayedSessions.update(
          { originalRoomId: quizRoomId },
          { $set:{ defenderPlayed: true }}
        );
    },

    updatePlayFirst: function (quizRoomId) {
       PlayedSessions.update(
         { originalRoomId: quizRoomId },
         { $set:{ playfirst: true }}
       );
     },

     makePlayFirstFalse: function (resultRoomId) {
        PlayedSessions.update(
          { _id: resultRoomId },
          { $set:{ playfirst: false }}
        );
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

    // .................Admin Stuff.......................

    insertCourses: function (obj) {
      let ifCourseExists = Courses.findOne({ courseName: obj.courseName });
      if (!ifCourseExists) {
        Courses.insert({
          courseName: obj.courseName,
          chapters: obj.chapters,
          ranking:[],
        });
      }
     },


});
