Template.editProfile.helpers({
   user: function(){
     return UserInformation.findOne({createdBy: Meteor.userId()});
  }
});
