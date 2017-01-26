/**
 * Created by zahed on 1/24/17.
 */
Meteor.methods({
  createRoom: function(options) {
    try {
      let array = QuestionBank.find({ chapter: options.chapter }).fetch();
      let questions = _.sampleSize(array, 6);
      let defender = Meteor.users.findOne({
        _id: options.defender._id
      }, { fields: { _id: 1, emails: 1, profile: 1 } });

      const quizRoom = {
        challenger: options.challenger,
        defender: defender,
        questions: _.map(questions, (data)=>{ data.answer = null; return data;}),
        course: options.topic,
        chapter: options.chapter
      };
      const _id = QuizRooms.insert(quizRoom);

      return _id;
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
  startPlayFirst: function (options) {
    try {
      QuizRooms.update({
        _id: options._id
      }, {
        $set: { isFirst: true }
      });
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
  acceptQuizChallenge: function (options) {
    try {
      console.log('acceptQuizChallenge');
      console.log(options);
      QuizRooms.update({
        _id: options._id
      }, {
        $set: { status: 'running' }
      });
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
  updateChallengerResult: function (options) {
    
  },
  updateDefenderResult: function (options) {

  },
  rejectRoomRequest: function (options) {
    
  },
  removeRoomRequest: function (options) {
    try {
      let quizRoom = QuizRooms.findOne({_id: options._id});
      if (quizRoom.challenger._id === Meteor.userId()) {
        return QuizRooms.remove({_id: options._id});
      } else {
        return new Meteor.Error('permission denied')
      }
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
  storeQuizAnswer: function (options) {
    try {
      console.log(options);
      let increment = {};
      let quizRoom = QuizRooms.findOne({_id: options.roomId});
      let question = quizRoom.questions[options.questionIndex];

      let dataSet = {};
      dataSet[`questions.${options.questionIndex}.answer`] = options.answer;

      increment.givenAnswer = 1;
      increment.totalTIme = options.timeCount;
      increment.points = 0;
      if (question.rightAnswer == options.answer) {
        increment.points = 10;
        increment.correctAnswer = 1;
      } else {
        increment.wrongAnswer = 1;
      }

      if (options.questionIndex == 5) {
        console.log('match')
        dataSet.isCompleted = true;
        increment.points *= 2;
      }

      if (quizRoom.challenger._id === Meteor.userId()) {
        QuizRooms.update({_id: options.roomId }, {
          $inc: { 'challenger.totalPoint': increment.points, 'challenger.totalTime': options.timeCount }
        })
      } else if (quizRoom.defender._id === Meteor.userId()) {
        QuizRooms.update({_id: options.roomId }, {
          $inc: { 'defender.totalPoint': increment.points, 'defender.totalTime': options.timeCount }
        })
      } else {
        return new Meteor.Error('permission denied')
      }

      const isUpdate = PlayedSessions.update({
        quizRoomId: options.roomId,
        'player._id': Meteor.userId()
      }, {
        $inc: increment,
        $set: dataSet
      });

      if (dataSet.isCompleted) {
        if (quizRoom.defender._id === Meteor.userId()) {
          QuizRooms.update({_id: quizRoom._id}, {$set: { 'defender.isCompleted': true }})
        } else {
          QuizRooms.update({_id: quizRoom._id}, {$set: { 'challenger.isCompleted': true }})
        }
        let newQuizRoom = QuizRooms.findOne({_id: quizRoom._id})

        if ((newQuizRoom.challenger.isCompleted === true) && (newQuizRoom.defender.isCompleted === true)) {
          QuizRooms.update({_id: quizRoom._id}, {$set: { 'status': 'completed' }});

          let userCourseArray = Meteor.users.findOne({_id: newQuizRoom.challenger._id}).profile.selectedCourses;
          let thisCoursesIndex = _.findIndex(userCourseArray, { 'courseName': newQuizRoom.course });
          let increasePoints = {};
          increasePoints[`profile.selectedCourses.${thisCoursesIndex}.points`] = newQuizRoom.challenger.totalPoint;
          Meteor.users.update({
            _id: newQuizRoom.challenger._id
          }, {  $inc:   increasePoints });
          console.log('complete challenger point');

          let defenderCourseArray = Meteor.users.findOne({_id: newQuizRoom.defender._id}).profile.selectedCourses;
          let defenderCoursesIndex = _.findIndex(defenderCourseArray, { 'courseName': newQuizRoom.course });
          let defenderPoints = {};
          defenderPoints[`profile.selectedCourses.${defenderCoursesIndex}.points`] = newQuizRoom.defender.totalPoint;
          Meteor.users.update({
            _id: newQuizRoom.defender._id
          }, {  $inc:   defenderPoints });
          console.log('complete defender point');

          let courseRanking = Courses.findOne({ courseName: newQuizRoom.course }).ranking;
          let challengerIndexCourse = _.findIndex(courseRanking, { 'userId': newQuizRoom.challenger._id });
          let defenderIndexCourse = _.findIndex(courseRanking, { 'userId': newQuizRoom.defender._id });

          let increaseCoursePoints = {};
          increaseCoursePoints[`ranking.${challengerIndexCourse}.points`] = newQuizRoom.challenger.totalPoint;
          increaseCoursePoints[`ranking.${defenderIndexCourse}.points`] = newQuizRoom.defender.totalPoint;
          console.log(increaseCoursePoints);
          let isCourseUpdate = Courses.update({ courseName: newQuizRoom.course }, {  $inc:   increaseCoursePoints });

          console.log(isCourseUpdate);

        }
      }

      return isUpdate;
    } catch (err) {
      console.log(err);
      throw new Meteor.Error(err);
    }
  },
});