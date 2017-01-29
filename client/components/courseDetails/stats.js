Template.stats.onCreated(function() {
  let topicName = Session.get('topicName');
  let array = Meteor.user().profile.selectedCourses;
  let course = _.find(array, {'courseName': topicName });
  let accuracyArray = course.accuracy;
  let accuracy=  _.mean(accuracyArray);
  Session.set('percent', accuracy);
});

Template.stats.onRendered(function() {
  $(document).ready(function(){
    $(function(){
      var $ppc = $('.eddy-progress--wrapper'),
        percent = parseInt($ppc.data('percent')),
        deg = 360*percent/100;
      if (percent > 50) {
        $ppc.addClass('gt-50');
      }
      $('.eddy-progress--bar--fill').css('transform','rotate('+ deg +'deg)');
      $('.eddy-progress--percents span').html(percent+' %');
    });
  });
});


Template.stats.helpers({

  ranking: function(){
    let topicName = Session.get('topicName');
    let rankingArray =  Courses.findOne({ courseName: topicName }).ranking;
    let  ranking = _.sortBy(rankingArray, ['points']);
    return _.reverse(ranking);
  },

  indexOfUser: function(){
    let topicName = Session.get('topicName');
    let rankingArray =  Courses.findOne({ courseName: topicName }).ranking;
    let points = _.sortBy(rankingArray, ['points']);
    let reverse = _.reverse(points);
    let ranking = _.findIndex(reverse , {'userId': Meteor.userId() });

    if (ranking<=0) {
      console.log(ranking);
      // return 1;
      return 'king';
    } else {
      // return ranking+1;
      return ranking;
    };
  },

  point: function(){
    let topicName = Session.get('topicName');
    let array = Meteor.user().profile.selectedCourses;
    return _.find(array, {'courseName': topicName });
  },


});

Template.stats.events({

  "click #4": function(event, template) {
   event.preventDefault();
   console.log(this);
 },

});
