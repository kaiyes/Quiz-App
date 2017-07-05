Template.editNames.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
      let nickName1 = document.querySelector("#nickName1").value.trim();
      let routerName = Router.current().params.nick;
      Meteor.call("editNickName", nickName1, routerName, function (err) {
        if (!err) {
          myApp.addNotification({
            title: 'Admin',
            message: "New Nick Name Inserted",
            hold:2000,
          });
        Router.go('/adminNickNames');
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


Template.editNames.helpers({
  nick: function(){
    let name = Router.current().params.nick;
    return name;
  }
});
