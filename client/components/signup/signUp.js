Template.signUp.onRendered(function() {
    $('.eddy-form--lists .item-input:nth-of-type(1)').click(function() {
      $(".page-content").animate({
        scrollTop: 210
      },"slow");
    });
    $('.eddy-form--lists .item-input:nth-of-type(2)').click(function() {
      $(".page-content").animate({
        scrollTop: 210
      },"slow");
    });
});

Template.signUp.events({
  "click #back": function(event, template){
    Router.go('/');
  },

  'submit form': function() {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    profile = {
      age: "",
      country:"",
      name:"",
      university:"",
      nickName:"",
      programme:"",
      image:" ",
      imageId: "",
      selectedCourses:[],
      sound:true,
      notification:true,
    };

    Loading.call("addUser", email,password, profile, function(error,result){
      if (error) {
        myApp.addNotification({
          title: 'Signup Error',
          message: error.reason,
          hold:2000,
        });
      } else {
        Meteor.loginWithPassword(email, password,
          function(error) {
            if (error) {
              myApp.addNotification({
                title: 'Signup Error',
                message: error.reason,
                hold:2000,
              });
            } else {
              myApp.addNotification({
                title: 'Signup',
                message: 'Your Signup was Successful',
                hold:2000,
              });
              Router.go('/course');
            };
          });
       }
    });

    $('[name = password]').val('');
    $('[name = email]').val('');
  },

});
