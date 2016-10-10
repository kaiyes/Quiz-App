Template.community.onRendered(function() {
  $(document).ready(function() {
    if (Framework7.prototype.device.android) {
      $('.eddy-tabs').addClass('margin-top-115');
    }else {
      $('.eddy-tabs').addClass('margin-top-110');
    }
  });

Template.community.helpers({
chapters(){
  return Courses.find();
  },
});

Template.community.events({
  "click #foo": function(event, template){
  }
});
