Feedback.profiles = {
    "somethingHappened": {
        sound: "/sounds/ting.mp3",
    }
};


Template.stats.onCreated(function() {
    let topicName = Session.get('topicName');
    let array = Meteor.user().profile.selectedCourses;
    let course = _.find(array, { 'courseName': topicName });
    let accuracyArray = course.accuracy;
    let accuracy = _.mean(accuracyArray);
    let isAccuracyNaN = _.isNaN(accuracy);

    if (isAccuracyNaN) {
        Session.set('percent', 0);
    } else {
        Session.set('percent', accuracy);
    }
});

Template.stats.onRendered(function() {

      var topicName = Session.get('topicName');
      var array = Meteor.user().profile.selectedCourses;
      var course = _.find(array, { 'courseName': topicName });
      var accuracyArray = course.accuracy;
      var accuracy = _.mean(accuracyArray);
      var isAccuracyNaN = _.isNaN(accuracy);

        if (isAccuracyNaN) {
            Session.set('percent', 0);
        } else {
            Session.set('percent', accuracy);
        }

        var $ppc = $('.eddy-progress--wrapper'),
            percent = parseInt($ppc.data('percent')),
            deg = 360 * percent / 100;
        if (percent > 50) {
            $ppc.addClass('gt-50');
        }

      $('.eddy-progress--bar--fill').css('transform', 'rotate(' + deg + 'deg)');
      $('.eddy-progress--percents span').html(percent + ' %');

});


Template.stats.helpers({

    ranking: function() {
        let topicName = Session.get('topicName');
        let rankingArray = Courses.findOne({ courseName: topicName }).ranking;
        let ranking = _.sortBy(rankingArray, ['points']);
        let reverseRanking = _.reverse(ranking);
        let firstFive = _.take(reverseRanking, 5);
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
      let firstFive = _.take(reverseRanking, 5);
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
        let restOftheUsers = newRanking.slice(usersIndex);
        return restOftheUsers;
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


});
