Template.forgotPass.onRendered(function() {
  $(document).ready(function() {
    $('.eddy-form--lists .item-input').click(function() {
      $(".page-content").animate({
        scrollTop: 170
      },"slow");
    });
  })
});

Template.forgotPass.events({

});
