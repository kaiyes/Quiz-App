
Template.notification.helpers({

  challangeNotifications: function(){
    return Notification.find({
       "challanged._id": Meteor.userId(),
     });
  },

  postNotifications: function(){
    Notification.find({
      $or:
      [{ "challanged._id": Meteor.userId(), type: "challange" },
       { topic: { $in: topicsChosen }, type: "post"}]
    });
  },

});

Template.notification.events({
  "click #foo": function(event, template){

  }
});
