Template.settings.events({

  "click #editProfile": function(event, template){
    Router.go('/editProfile');
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
