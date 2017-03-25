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
      let courses = Meteor.user().profile.selectedCourses;
      let courseToBeRemoved = _.find(courses, ['courseName', courseData.courseName])
      Meteor.users.update(
        { _id: this.userId },
        { $pull: { "profile.selectedCourses": courseToBeRemoved  }}
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
      let post=Posts.insert(payload);
        Notification.insert({
          postId : post,
          topic: payload.topicName,
          when: new Date(),
          type: "post",
          createdBy: payload.createdBy,
          seen:[this.userId],
          deleted:[this.userId],
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
         postId : commentPayload.postId,
         postCreator: commentPayload.postCreator,
         topic: commentPayload.topic,
         when: new Date(),
         type: "comment",
         commenter: commentPayload.commenter,
         seen:[this.userId],
         deleted:[this.userId],
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
    var likeArray = Posts.findOne({  _id: id  }).likes;
    let idsInArray = _.map(likeArray, '_id');
    let ifIncludes = _.includes( idsInArray, Meteor.userId());
    if (ifIncludes) {
      let findLiker = _.find(likeArray, ['_id', Meteor.userId()]);
      Posts.update(
        { _id: id },
        { $pull: { "likes": findLiker  }}
      )
    } else {
      Posts.update({ _id: id },{ $addToSet: likerData });
      let post = Posts.findOne({ _id:id });
        Notification.insert({
          postId: id,
          postCreator: post.createdBy.profile.name,
          topic: post.topicName,
          when: new Date(),
          type: "like",
          liker: liker,
          seen:[this.userId],
          deleted:[this.userId],
        });
        let text =`${liker.profile.name} liked your post in ${post.topicName}`;

        Push.send({
          text,
          title:"Comment",
          from:"Liker",
          badge: 1,
          query: { userId: post.createdBy._id },
        });
     }
    },

    likeAcomment: function ( commentData, liker ) {
      let commentArray = Posts.findOne({ _id: commentData.postId }).comments;
      let rightComment = _.find(commentArray, ['body', commentData.body]);
      var likerArray = rightComment.likes;
      var likerData = _.find(likerArray, ['_id', Meteor.userId()]);
      if (likerData===undefined) {
        Posts.update(
          { _id: commentData.postId , "comments.body":commentData.body },
          { $addToSet: {"comments.$.likes": liker }}
         );
         Notification.insert({
           commentCreator: commentData.commenter.profile.name,
           topic: commentData.topic,
           when: new Date(),
           type: "commentLike",
           liker: liker,
           seen:[this.userId],
           deleted:[this.userId],
         });
         let text =`${liker.profile.name} liked your comment in ${commentData.topic}`;
         Push.send({
           text,
           title:"Comment",
           from:"Liker",
           badge: 1,
           query: { userId: commentData.commenter._id },
         });
      } else {
        Posts.update(
          { _id: commentData.postId , "comments.body":commentData.body },
          { $pull: {"comments.$.likes": liker }}
         );
      }
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
           challangersRightAnswer:0,
           defendersRightAnswer:0,
           challangersAccuracy:0,
           defendersAccuracy:0,
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
             challangersAccuracy:0,
             defendersAccuracy:0,
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
          seen:[],
          deleted:[],
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

    makeSeen:function() {
      Notification.update(
        {  },
        { $addToSet: { seen: this.userId }},
        { multi: true }
      );
    },

    defenderSeen:function(notificationId) {
      Notification.update(
        { _id: notificationId },
        { $addToSet: { seen: this.userId }},
      );
    },

    defenderDeleted:function(notificationId) {
      Notification.update(
        { _id: notificationId },
        { $push: { deleted: this.userId }}
      );
    },

    delete:function(notificationData) {
      Notification.update(
        { _id: notificationData._id },
        { $push: { deleted: this.userId }}
      );
    },

    updateOpponent: function (quizRoomId) {
       QuizRooms.update(
         { _id:quizRoomId },
         { $set:{ defenderStarted: true }}
       );
     },

    removeChallangeNotification: function (notificationId) {
      let notification = Notification.findOne({
        _id: notificationId,
       });
       if (notification) {
          Notification.remove({ _id: notificationId });
       };
    },

    incChallangerRoomPoints: function( quizRoomId, time, questionNumber){
      if (questionNumber===5) {
        if (time<=9) {
          var points = 10
        } else if (time<=14) {
          var points = 14
        } else if (time<=20) {
          var points = 20
        }
      } else {
        if (time<=9) {
          var points = 5
        } else if (time<=14) {
          var points = 7
        } else if (time<=20) {
          var points = 10
        }
      }
      QuizRooms.update({ _id:  quizRoomId },
        { $inc:{ challangerRoomPoints:points, challangersRightAnswer:1 }
      });
      PlayedSessions.update({ originalRoomId: quizRoomId }, {
        $inc: { challangersPoint: points, challangersRightAnswer:1 }
      });
        let room = QuizRooms.findOne({ _id:  quizRoomId });
        let topic = room.questions[0].topic;
        let userCourseArray = Meteor.user().profile.selectedCourses;
        let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': topic });
        let increasePoints = {};
        increasePoints[`profile.selectedCourses.${thisCoursesIndex}.points`] = points;
        Meteor.users.update({ _id: this.userId },
          {  $inc:   increasePoints });
        let userArray = Courses.findOne({ courseName: topic }).ranking;
        let usersIndexinCourse = _.findIndex(userArray, { 'userId': this.userId });
        let increaseCoursePoints = {};
        increaseCoursePoints[`ranking.${usersIndexinCourse}.points`] = points;
        Courses.update({ courseName: topic }, {  $inc:   increaseCoursePoints });
    },

    incdefenderRoomPoints: function( quizRoomId, time, questionNumber ){
      if (questionNumber===5) {
        if (time<=9) {
          var points = 10
        } else if (time<=14) {
          var points = 14
        } else if (time<=20) {
          var points = 20
        }
      } else {
        if (time<=9) {
          var points = 5
        } else if (time<=14) {
          var points = 7
        } else if (time<=20) {
          var points = 10
        }
      }
      QuizRooms.update({ _id: quizRoomId },
        { $inc:{ defenderRoomPoints:points,  defendersRightAnswer:1 }
        });
        PlayedSessions.update({ originalRoomId: quizRoomId }, {
          $inc: { defendersPoint: points, defendersRightAnswer:1 }
        });
        let room = QuizRooms.findOne({ _id:  quizRoomId });
        let topic = room.questions[0].topic;
        let userCourseArray = Meteor.user().profile.selectedCourses;
        let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': topic });
        let increasePoints = {};
        increasePoints[`profile.selectedCourses.${thisCoursesIndex}.points`] = points;
        Meteor.users.update({ _id: this.userId },
          {  $inc:   increasePoints });
        let userArray = Courses.findOne({ courseName: topic }).ranking;
        let usersIndexinCourse = _.findIndex(userArray, { 'userId': this.userId });
        let increaseCoursePoints = {};
        increaseCoursePoints[`ranking.${usersIndexinCourse}.points`] = points;
        Courses.update({ courseName: topic }, {  $inc:   increaseCoursePoints });
    },

    updateChallangersAccuracy:function (quizRoomId) {
        let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
        let number = (quizRoom.challangersRightAnswer / 6) * 100;
        let roundedNumber = Math.round(number);
        let topic = quizRoom.questions[0].topic;
        let userCourseArray = Meteor.user().profile.selectedCourses;
        let  accuracy = _.find(userCourseArray, { 'courseName': topic });
        accuracy.accuracy.push(roundedNumber);
        let  index = _.findIndex(userCourseArray, { 'courseName': topic });
        let addAccuracy = {};
        addAccuracy[`profile.selectedCourses.${index}`] = accuracy;
        Meteor.users.update({ _id: this.userId },
          {  $set:   addAccuracy });
        QuizRooms.update({ _id: quizRoomId }, { $set: { challangersAccuracy:  roundedNumber }});
        PlayedSessions.update({ originalRoomId: quizRoomId }, { $set: { challangersAccuracy:  roundedNumber }});
    },

    updateDefendersAccuracy:function (quizRoomId) {
        let quizRoom = QuizRooms.findOne({ _id: quizRoomId });
        let number = (quizRoom.defendersRightAnswer / 6) * 100;
        let roundedNumber = Math.round(number);
        let topic = quizRoom.questions[0].topic;
        let userCourseArray = Meteor.user().profile.selectedCourses;
        let  accuracy = _.find(userCourseArray, { 'courseName': topic });
        accuracy.accuracy.push(roundedNumber);
        let  index = _.findIndex(userCourseArray, { 'courseName': topic });

        let addAccuracy = {};
        addAccuracy[`profile.selectedCourses.${index}`] = accuracy;

        Meteor.users.update({ _id: this.userId },
          {  $set:   addAccuracy });

        QuizRooms.update({ _id: quizRoomId }, { $set: { defendersAccuracy:  roundedNumber }});
        PlayedSessions.update({ originalRoomId: quizRoomId }, { $set: { defendersAccuracy:  roundedNumber }});
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

    muteSound:function () {
      Meteor.users.update({ _id:this.userId },
        { $set: {   "profile.sound": false }
      });
    },

    turnOnSound:function () {
      Meteor.users.update({ _id:this.userId },
        { $set: {   "profile.sound": true }
      });
    },

    muteNotification:function () {
      Meteor.users.update({ _id:this.userId },
        { $set: {   "profile.notification": false }
      });
    },

    turnNotificationOn:function () {
      Meteor.users.update({ _id:this.userId },
        { $set: {   "profile.notification": true }
      });
    },

    updateStatus:function(topicName,helpInfo){
      let userCourseArray = Meteor.user().profile.selectedCourses;
      let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': topicName });
      let helpStatus = {};
      helpStatus[`profile.selectedCourses.${thisCoursesIndex}.wantHelp`] = helpInfo;
      Meteor.users.update({ _id: this.userId },
        {  $set:   helpStatus });
    },

    sendEmail: function () {
      Email.send({
        to: 'kaiyes.ansary@gmail.com',
        from: "eddy",
        subject: "horiya",
        text: "hey hey "
      });
    },
    // .................Admin Stuff.......................

    insertCourses: function (obj) {
      let ifCourseExists = Courses.findOne({ courseName: obj.courseName });
      if (!ifCourseExists) {
        Courses.insert({
          courseName: obj.courseName,
          courseNumber:obj.courseNumber,
          chapters: obj.chapters,
          ranking:[],
        });
      }
     },

     insertNickName: function (nickName) {
       let ifNickExists = NickNames.findOne({ nick: nickName });
       if (!ifNickExists) {
        NickNames.insert({ nick: nickName })
       }
      },

      insertUniversity: function (universityName) {
        let ifUniExists = University.findOne({ name: universityName });
        if (!ifUniExists) {
         University.insert({ name : universityName })
        }
       },

       insertQuestions: function (obj) {
         QuestionBank.insert({
            question: obj.question,
            rightAnswer: obj.rightAnswer,
            firstAnswer:obj.answer1,
            secondAnswer:obj.answer2,
            thirdAnswer:obj.answer3,
            fourthAnswer:obj.answer4,
            chapter:obj.chapterName,
            topic:obj.courseName,
            explanation:obj.explanation,
          });
        },
});
