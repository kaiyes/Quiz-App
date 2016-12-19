Template.registerHelper('getTimePosted', date => {
  if (date) {
    return moment(new Date(date)).fromNow(true);
  }
});

Template.community.onRendered(function() {
    $(document)
      .on("focus", ".eddy-community--post-area--input__reply", function(){
        var outerHeight = 0;
        $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().prevAll('.eddy-community--post').each(function() {
          outerHeight += $(this).outerHeight() + 10;
        });

        var d = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().height();
        console.log(d);
        $(".page-content").animate({
          scrollTop: outerHeight + $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().height()
        },"slow");
        console.log(outerHeight);
      });
});


Template.community.helpers({
    posts(){
      let topicName = Session.get('topicName');
      return Posts.find({ topicName:topicName }, { sort: { createdAt: -1 }} );
    },

});

Template.community.events({
  "submit  #post": function(event, template){
    event.preventDefault();
     let text = event.target.text.value;
     let topicName = Session.get('topicName');

    let payload = {
      body : text,
      createdBy: Meteor.user(),
      createdAt: new Date(),
      likes:[],
      comments:[],
      topicName:topicName
    };

    Meteor.call('insertPost', payload);
    $('[name="text"]').val('');
  },

  "submit #commentForm": function(event, template){
    event.preventDefault();
    let comment = event.target.comment.value;
    let topicName = Session.get('topicName');
    let commentPayload = {
      body : comment,
      commenter: Meteor.user(),
      createdAt: new Date(),
      likes:[],
      postId:this._id,
      postCreator:this.createdBy,
      topic: topicName,
    };
    Meteor.call('insertComment', commentPayload);
    $('.eddy-community--post--comments--reply, .eddy-community--post--comment-section').hide();
    $('#post-'+this._id)
            .find('.eddy-community--post--comments--reply, .eddy-community--post--comment-section')
            .show();

    $('[name="comment"]').val('');
  },

  "click #openCommenting": function(event, template){
    event.preventDefault();
    $('#post-'+this._id)
            .find('.eddy-community--post--comments--reply, .eddy-community--post--comment-section')
            .toggle();
  },

  "click #like": function(event, template){
    event.preventDefault();
    Meteor.call('like', this._id, Meteor.user());
  },

  "click #commentLike": function(event, template){
    event.preventDefault();
    console.log(this);
    Meteor.call('likeAcomment', this, Meteor.user());
  },


});
