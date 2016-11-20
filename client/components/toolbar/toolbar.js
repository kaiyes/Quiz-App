Template.toolbar.events({
  "click #home": function(event, template){
    Router.go('/homePage');
  },

});

Template.toolbar.onRendered(function() {

    if (Framework7.prototype.device.android) {
        $('.eddy-toolbar--icon__noti--badge').css('right', '2rem');
      }
      else {
        $('.eddy-toolbar--icon__noti--badge').css('left', '3.2rem');
      }

});

Template.toolbar.helpers({
  notification: function(){
   return Notification.find({
      "challanged._id": Meteor.userId(),
    }).count();
  },

  notificationAll: function(){
    let topicsChosen = Meteor.user().profile.selectedCourses;

    return Notification.find({
      $or:
      [{ "challanged._id": Meteor.userId(), type: "challange" },
       { topic: { $in: topicsChosen }, type: "post"}]
    }).count();
  },


});
