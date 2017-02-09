
Template.settings.helpers({
  isSoundChecked: function(){
    if (Meteor.user().profile.sound===true) {
      return 'checked'
    }else {
      return ''
    }
  },

  isNotificationChecked: function(){
    if (Meteor.user().profile.notification===true) {
      return 'checked'
    }else {
      return ''
    }
  },
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

  "click #course": function(event, template){
    Router.go('/editCourses');
  },

  "click #mantra": function(event, template){
    Router.go('/mantra');
  },

  "change #soundSwitch": function(event, template){

      if (Meteor.user().profile.sound===true) {
        Meteor.call("muteSound");
        toastr.error('Muted All Sound');
      } else {
        Meteor.call("turnOnSound");
        toastr.success('Turned Sound on');
      }

  },

  "change #notification": function(event, template){
    if (Meteor.user().profile.notification===true) {
      Meteor.call("muteNotification");
      toastr.error('Notifications off');
    } else {
      Meteor.call("turnNotificationOn");
      toastr.success('Notifications on');
    }
  },

  "click #logout": function(event, template){
    Meteor.logout(function(){
      toastr.warning("Logged Out");
      Router.go('/');
    });
  },

});
