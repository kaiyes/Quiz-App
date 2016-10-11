Template.community.onRendered(function() {
  $(document).ready(function() {
    $('.eddy-comment-btn').click(function() {
      console.log(this);
      $(this).parent().parent().parent().siblings('.eddy-community--post--comment-section').removeClass('hide');
    });
    $('.eddy-comment-reply-btn').click(function() {
      console.log(this);
      $(this).parent().parent().parent().siblings('.eddy-community--post--comments--reply').removeClass('hide');
    });
  })
});

Template.community.helpers({

});

Template.community.events({
  "click #foo": function(event, template){
  }
});
