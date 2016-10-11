Template.courseDetails.onRendered(function() {
  $(document).ready(function() {
    if (Framework7.prototype.device.android) {
      $('.eddy-tabs').addClass('margin-top-115');
    }else {
      $('.eddy-tabs').addClass('margin-top-110');
    }
  });
});


Template.courseDetails.helpers({
  selectedCourse(){
    return Session.get('topicName');
  }
});
