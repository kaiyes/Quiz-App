Template.quizResult.onRendered(function() {
  $(document).ready(function	(){
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

Template.quizResult.events({

});

Template.quizResult.helpers({
  resultRoom: function(){
    let resultRoomId = Router.current().params._id;
    return PlayedSessions.findOne({ _id: resultRoomId });
  }
});
