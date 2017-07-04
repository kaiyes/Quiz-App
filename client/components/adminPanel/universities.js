Template.adminUniversity.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
      let universityName = document.querySelector("#university").value.trim();

      Meteor.call("insertUniversity", universityName, function (err) {
        if (!err) {
          myApp.addNotification({
            title: 'Admin',
            message: "New University Inserted",
            hold:2000,
          });
        } else {
          myApp.addNotification({
            title: 'Admin',
            message: err.reason,
            hold:2000,
          });
        }
      });
  },

  'click #del' (event, instance) {
    event.preventDefault();
    University.remove({ _id: this._id });
  },
  'click #edit' (event, instance) {
    event.preventDefault();
    console.log("edit");
  }

});



Template.adminUniversity.helpers({
  uni: function(){
    Meteor.subscribe('universities');
    return University.find();
  }
});
