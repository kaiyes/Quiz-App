
Template.notification.helpers({

  notifications: function(){
    return Notification.find({
       "challanged._id": Meteor.userId(),
     });
  },
});

Template.notification.events({
  "click #foo": function(event, template){

  }
});
