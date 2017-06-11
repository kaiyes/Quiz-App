Template.adminNickNames.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
      let nickName1 = document.querySelector("#nickName1").value;
      // let nickName2 = document.querySelector("#nickName2").value;
      // let nickName3 = document.querySelector("#nickName3").value;
      // let nickName4 = document.querySelector("#nickName4").value;
      // let nickNames = [nickName1,nickName2,nickName3, nickName4];
      // let removeEmptyStuff = _.remove(nickNames, function(x) { return x === "" });
      Meteor.call("insertNickName", nickName1, function (err) {
        if (!err) {
          myApp.addNotification({
            title: 'Admin',
            message: "New Nick Name Inserted",
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
    NickNames.remove({ _id: this._id });
  }
});


Template.adminNickNames.helpers({
  nicks: function(){
    Meteor.subscribe('nickNames');
    return NickNames.find();
  }
});
