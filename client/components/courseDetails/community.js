Template.registerHelper('getTimePosted', date => {
  if (date) {
    return moment(new Date(date)).fromNow(true);
  }
});

Template.community.onRendered(function() {
    $(document)
      .on("focus", ".eddy-community--post-area--input__reply", function(){
        var outerHeight = 0;
        $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().prevAll('.eddy-community--post').each(function() {
          outerHeight += $(this).outerHeight() + 10;
        });

        $(".page-content").animate({
          scrollTop: outerHeight + $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().height()
        },"slow");
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
      likes:[],
      reply:[],
    };

    Meteor.call('insertPost', payload);
    console.log(Posts.find().fetch());
  },

  "click #comment": function(event, template){
    event.preventDefault();
    $(event.target).parents('#post-'+ this._id).find('.eddy-community--post--comment-section').removeClass('hide');
  },

  "click #reply": function(event, template){
    event.preventDefault();
    $(event.target).parents('#post-'+ this._id).find('.eddy-community--post--comments--reply').removeClass('hide');
  },

  "click #like": function(event, template){
    event.preventDefault();
    console.log(this);
    Meteor.call('like', this._id, Meteor.userId());
  }
});
