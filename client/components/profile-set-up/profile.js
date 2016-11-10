Template.profile.onRendered(function() {
  $(document).ready(function() {
    $(".eddy-profile .form-group:nth-of-type(3) select option:nth-child(1)").html('University *');
    $(".eddy-profile .form-group:nth-of-type(5) select option:nth-child(1)").html('Nickname');
    $(".eddy-profile .form-group:nth-of-type(7) select option:nth-child(1)").html('Country');
    $('.eddy-profile .form-group:nth-of-type(8) button').html('DONE');

    $('.eddy-profile .form-group:not(.form-group:nth-of-type(1))').click(function() {
      var outerHeight = 0;
      $(this).prevAll('.form-group').each(function() {
        outerHeight += $(this).outerHeight() + 10;
      });

      $(".page-content").animate({
        scrollTop: outerHeight + $(this).outerHeight()
      },"slow");
    });
  })
});

Template.profile.events({

  "click .eddy-profile .form-group:nth-of-type(1) .afCloudinary button": function(event, template) {
    //$('.eddy-profile .form-group:nth-of-type(1) .afCloudinary .js-remove').html('<i class="fa fa-close" aria-hidden="true"></i>');
  }
  ,
  "click .eddy-profile .form-group:nth-of-type(1) .afCloudinary .js-remove": function(event, template) {
    //$('.eddy-profile .form-group:nth-of-type(1) .afCloudinary button').html('<i class="fa fa-plus" aria-hidden="true"></i>');
  },
  "click .form-group:nth-of-type(7)": function(event, template) {
    console.log(this);
  }
});
