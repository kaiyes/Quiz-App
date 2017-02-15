Template.login.onRendered(function() {
   $('.eddy-form--lists .item-input:nth-of-type(1)').click(function() {
     $(".page-content").animate({
       scrollTop: 228
     },"slow");
   });
   $('.eddy-form--lists .item-input:nth-of-type(2)').click(function() {
     $(".page-content").animate({
       scrollTop: 228
     },"slow");
   });
});

Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        myApp.addNotification({
          title: 'Login Error',
          message: error.reason,
          hold:2000,
        });
      } else {
        myApp.addNotification({
          title: 'Login',
          message: 'Your Login was Successful',
          hold:2000,
        });
        Accounts._autoLoginEnabled = true;
        Router.go('/homePage');
      }
    });
    $('[name="listName"]').val('');
    $('[name = password]').val('');
  },
  "click #forgotPassRoute": function(event, template) {
    event.preventDefault();
    Router.go('/forgot-pass');
  }
});
