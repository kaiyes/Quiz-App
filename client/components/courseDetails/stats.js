Feedback.profiles = {
    "somethingHappened": {
        sound: "/sounds/Notification.wav",
    },
    "click": {
        sound: "/sounds/Clicking.mp3",
    },
    "send": {
        sound: "/sounds/send.mp3",
    },
    "correct": {
        sound: "/sounds/correct.mp3",
    },
    "wrong": {
        sound: "/sounds/wrong.mp3",
    },
    "winning": {
        sound: "/sounds/winning.wav",
    },
    "losing": {
        sound: "/sounds/loosing.wav",
    },
    "waiting": {
        sound: "/sounds/ting.mp3",
    },
    "gameStart": {
        sound: "/sounds/gameStart.mp3",
    },
};

Template.stats.onRendered(function() {
  this.autorun(function(){
        var topicName = Session.get('topicName');
        Tracker.afterFlush(function(){
          var array = Meteor.user().profile.selectedCourses;
          var course = _.find(array, { 'courseName': topicName });
          var accuracyArray = course.accuracy;
          var accuracyNotRound = _.mean(accuracyArray);
          var accuracy = Math.round(accuracyNotRound);
          var isAccuracyNaN = _.isNaN(accuracy);

          if (isAccuracyNaN===true) {
              Session.set('progressPercent', 0);
              Session.set('progressText', "0");
          } else {
              Session.set('progressPercent', accuracy);
              Session.set('progressText', `${accuracy}`);
          }
        });
   });
});

Template.stats.helpers({

    ranking: function() {
        let topicName = Session.get('topicName');
        let rankingArray = Courses.findOne({ courseName: topicName }).ranking;
        let ranking = _.sortBy(rankingArray, ['points']);
        let reverseRanking = _.reverse(ranking);
        let firstFive = _.take(reverseRanking, 9);
        let ifExists = _.find(firstFive,["userId", Meteor.userId()]);
        if (ifExists===undefined) {
          return firstFive;
        }else {
          return reverseRanking;
        }
    },

    exists:function(){
      let topicName = Session.get('topicName');
      let rankingArray = Courses.findOne({ courseName: topicName }).ranking;
      let ranking = _.sortBy(rankingArray, ['points']);
      let reverseRanking = _.reverse(ranking);
      let firstFive = _.take(reverseRanking, 10);
      let ifExists = _.find(firstFive,["userId", Meteor.userId()]);
      if (ifExists===undefined) {
        return false;
      }else {
        return true;
      }
    },

    userRanking: function() {
        let topicName = Session.get('topicName');
        let rankingArray = Courses.findOne({ courseName: topicName }).ranking;
        let ranking = _.sortBy(rankingArray, ['points']);
        let reverseRanking = _.reverse(ranking);
        let usersIndex = _.findIndex(reverseRanking,["userId", Meteor.userId()]);
        let newRanking=_.map(reverseRanking,function(v,usersIndex){
          v.index=usersIndex; return v
        });
        let restOftheUsers = _.take(newRanking.slice(usersIndex),1);
        return restOftheUsers;
    },

    userPhoto: function(userId) {
      console.log(Meteor.users.findOne({ _id: userId }).profile.image);
      return Meteor.users.findOne({ _id: userId }).profile.image;
    },

    indexOfUser: function() {
        let topicName = Session.get('topicName');
        let rankingArray = Courses.findOne({ courseName: topicName }).ranking;
        let points = _.sortBy(rankingArray, ['points']);
        let reverse = _.reverse(points);
        let ranking = _.findIndex(reverse, { 'userId': Meteor.userId() });

        if (ranking <= 0) {
            return 'king';
        } else {
            return ranking;
        };
    },

    point: function() {
        let topicName = Session.get('topicName');
        let array = Meteor.user().profile.selectedCourses;
        return _.find(array, { 'courseName': topicName });
    },


});

Template.stats.events({

    "click #player": function(event, template) {
        event.preventDefault();
        Session.set('player', this.user);
        _.delay(function() { Router.go('/player') }, 100);
    },

    "click #4": function(event, template) {
        event.preventDefault();
        if (Meteor.user().profile.sound === true) {
            console.log(Meteor.user().profile.sound);
            Feedback.provide("send");
        }
    },



});
