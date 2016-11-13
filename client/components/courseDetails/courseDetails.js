Template.courseDetails.onRendered(function() {
    if (Framework7.prototype.device.android) {
      $('.eddy-tabs').addClass('margin-top-105');
    }else {
      $('.eddy-tabs').addClass('margin-top-110');
    }

    // $('.eddy-navbar--sub--item').click(function() {
    //   $('.eddy-navbar--sub--item').removeClass('active');
    //   $(this).addClass('active');
    //   $('.tab').removeClass('active');
    //   $($(this).attr('href')).addClass('active');
    // })
});

Template.courseDetails.helpers({
  selectedCourse(){
    return Session.get('topicName');
  },

});
