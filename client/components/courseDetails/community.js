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
      likes:0,
      reply:[],
    };
    Meteor.call('insertPost', payload);
    console.log(Posts.find().fetch());
  },

  "click #comment": function(event, template){
    event.preventDefault();
    $(event.target).parents('#post-'+ this._id).find('.eddy-community--post--comment-section').removeClass('hide');
    console.log($(event.target).parents('post-'+this._id));
  },

  "click #reply": function(event, template){
    event.preventDefault();
    $(event.target).parents('#post-'+ this._id).find('.eddy-community--post--comments--reply').removeClass('hide');
  },

});
