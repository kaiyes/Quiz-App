
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

  "click #adminCourses": function(event, template){
    Router.go('/adminCourses');
  },

  "click #adminUniversity": function(event, template){
    Router.go('/adminUniversity');
  },

  "click #adminQuestions": function(event, template){
    Router.go('/adminQuestions');
  },

  "click #adminNickNames": function(event, template){
    Router.go('/adminNickNames');
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
        myApp.addNotification({
          title: 'Settings',
          message: "Muted All Sound",
          hold:2000,
        });
      } else {
        Meteor.call("turnOnSound");
        myApp.addNotification({
          title: 'Settings',
          message: "Turned Sound On",
          hold:2000,
        });
      }

  },

  "change #notification": function(event, template){
    if (Meteor.user().profile.notification===true) {
      Meteor.call("muteNotification");
      myApp.addNotification({
        title: 'Settings',
        message: "Notification is Turned Off",
        hold:2000,
      });
    } else {
      Meteor.call("turnNotificationOn");
      myApp.addNotification({
        title: 'Settings',
        message: "Notification Turned Back On",
        hold:2000,
      });
    }
  },

  "click #logout": function(event, template){
    Meteor.logout(function(){
      myApp.addNotification({
        title: 'Logout',
        message: "You are now logged out",
        hold:2000,
      });
      Router.go('/');
    });
  },

});
