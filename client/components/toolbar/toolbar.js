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

  notificationAll: function(){
    let topicsChosen = Meteor.user().profile.selectedCourses;

    return Notification.find({
      $or:
      [
        { "challanged._id": Meteor.userId(), type: "challange" },
        { topic: { $in: topicsChosen }, type: "post"},
        { type: "like", postCreator: Meteor.user().profile.name },
        { type: "commentLike", commentCreator: Meteor.user().profile.name }
      ]
    }).count();
  },


});
