Template.login.onRendered(function() {
   $('.eddy-form--lists .item-input:nth-of-type(1)').click(function() {
     $(".page-content").animate({
       scrollTop: 170
     },"slow");
   });
   $('.eddy-form--lists .item-input:nth-of-type(2)').click(function() {
     $(".page-content").animate({
       scrollTop: 214
     },"slow");
   });
});

Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    Meteor.loginWithPassword(email, password,
      function(error) {
        if (error) {
          toastr.error(error.reason);
        } else {
          toastr.success("Log In Successful");
          Router.go('/homePage');
        };
      });
    $('[name="listName"]').val('');
    $('[name = password]').val('');
  },
  "click #forgotPassRoute": function(event, template) {
    event.preventDefault();
    Router.go('/forgot-pass');
  }
});
