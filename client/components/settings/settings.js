Template.settings.onRendered(function() {
  $('.eddy-settings ul li').click(function() {
    $('.eddy-settings ul li').removeClass('eddy-settings__active');
    $(this).addClass('eddy-settings__active');
  });
});

Template.settings.events({

  "click #editProfile": function(event, template){
    Router.go('/editProfile');
  },

  "click #admin": function(event, template){
    Router.go('/adminPanel');
  },

  "click #help": function(event, template){
    Router.go('/help');
  },

  "click #privacy": function(event, template){
    Router.go('/privacy');
  },

  "click #mantra": function(event, template){
    Router.go('/mantra');
  },

  "click #logout": function(event, template){
    Meteor.logout(function(){
      toastr.warning("Logged Out");
      Router.go('/');
    });
  },

});
