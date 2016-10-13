Template.registerHelper('getTimePosted', date => {
  if (date) {
    console.log(moment(new Date(date)).fromNow(true));
    return moment(new Date(date)).fromNow(true);
  }
});


Template.community.onRendered(function() {
  $(document).ready(function() {
    $('.eddy-comment-btn').click(function() {
      $(this).parent().parent().parent().siblings('.eddy-community--post--comment-section').removeClass('hide');
    });
    $('.eddy-comment-reply-btn').click(function() {
      $(this).parent().parent().parent().siblings('.eddy-community--post--comments--reply').removeClass('hide');
    });
  })
});

Template.community.helpers({
    posts(){
      return Posts.find();
    }
});

Template.community.events({
  "submit form": function(event, template){
    event.preventDefault();
     var text = event.target.text.value;

    let payload = {
      body : text,
      createdBy: Meteor.user(),
      createdAt: new Date(),
      likes:0,
      reply:[],
    };
    Meteor.call('insertPost', payload);
    console.log(Posts.find().fetch());
  }
});
