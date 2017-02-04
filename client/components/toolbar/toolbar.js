Template.toolbar.events({
  "click #home": function(event, template){
    Router.go('/homePage');
  },

});

Template.toolbar.onRendered(function() {

    if (Framework7.prototype.device.android) {
        //$('.eddy-toolbar--icon__noti--badge').css({'right': '4rem', 'top': '1rem'});
      }
      else {
        //$('.eddy-toolbar--icon__noti--badge').css({'right': '4rem', 'top': '1rem'});
      }

});

Template.toolbar.helpers({
  notificationAll: function(){
    if (Meteor.user()) {
      let objArray = Meteor.user().profile.selectedCourses;
      let topicsChosen = _.map(objArray,'courseName');

      return Notification.find({
        $or: [
          { type: "challange", "defender._id": Meteor.userId(),  },
          { type: "post", topic: { $in: topicsChosen }},
          { type: "like", postCreator: Meteor.user().profile.name },
          { type: "commentLike", commentCreator: Meteor.user().profile.name },
          { type: "comment", postCreator: Meteor.user() }
        ]
      }).count();
    }
    return {};
  },
});
