Template.editUniversity.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
      let universityName = document.querySelector("#university").value.trim();
      let routerName = Router.current().params.name;
      Meteor.call("editUniversity", universityName, routerName, function (err) {
        if (!err) {
          myApp.addNotification({
            title: 'Admin',
            message: "New University Inserted",
            hold:2000,
          });
          Router.go('/adminUniversity');
        } else {
          myApp.addNotification({
            title: 'Admin',
            message: err.reason,
            hold:2000,
          });
        }
      });
  },

  "click #backButton": function(event, template) {
      event.preventDefault();
      window.history.back();
  },

});



Template.editUniversity.helpers({
  uni: function(){
    let uni = Router.current().params.name;
    return uni;
  },
});
