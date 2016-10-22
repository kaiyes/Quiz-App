Template.registerHelper('getTimePosted', date => {
  if (date) {
    console.log(moment(new Date(date)).fromNow(true));
    return moment(new Date(date)).fromNow(true);
  }
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
  },

  "focus .eddy-community--post-area--input__reply": function(event, template) {
      $(".page-content").animate({
            scrollTop: $('#post-'+ this._id).height() * $('#post-'+ this._id).index()
          },"slow");

          console.log($('#post-'+ this._id).height());
          console.log($('#post-'+ this._id).height() * $('#post-'+ this._id).index());
  }
  ,
  "blur .eddy-community--post-area--input__reply": function(event, template) {
    if($(event.target).hasClass('eddy-community--post-area--input__reply')) {
      //$(".page-content").animate({ scrollTop: ($(".page-content").offset().top += 100 )}, "slow");
    }
    $('.eddy-toolbar').show();
  }


});
