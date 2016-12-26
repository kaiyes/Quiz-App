Template.stats.onRendered(function() {
  $(document).ready(function(){
    $(function(){
      var $ppc = $('.eddy-progress--wrapper'),
        percent = 65,
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

});

Template.stats.events({

});
