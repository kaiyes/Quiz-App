Template.forgotPass.onRendered(function() {
    $('.eddy-form--lists .item-input').click(function() {
      $(".page-content").animate({
        scrollTop: 170
      },"slow");
    });
});

Template.forgotPass.events({
  'click .eddy-password--button'(event) {
    event.preventDefault();
    myApp.addNotification({
      title: 'Password',
      message: "Password is being sent",
      hold:2000,
    });
  }
});
