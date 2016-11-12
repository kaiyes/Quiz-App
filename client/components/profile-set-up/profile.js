Template.profile.onRendered(function() {
  $(document).ready(function() {
    $(".eddy-profile .form-group:nth-of-type(3) select option:nth-child(1)").html('University *');
    $(".eddy-profile .form-group:nth-of-type(5) select option:nth-child(1)").html('Nickname');
    $(".eddy-profile .form-group:nth-of-type(7) select option:nth-child(1)").html('Country');
    $('.eddy-profile .form-group:nth-of-type(8) button').html('DONE');

    $('.eddy-profile .form-group:not(.form-group:nth-of-type(1))').click(function() {
      //console.log(this);
      var outerHeight = 0;
      $(this).prevAll('.form-group').each(function() {
        outerHeight += $(this).outerHeight() + 10;
        //console.log(outerHeight);
        //console.log($(this).outerHeight());
      });
      //console.log("TEST");

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

  "click .form-group:nth-of-type(2)": function(event, template) {
      $(".page-content").animate({
            scrollTop: $('.form-group:nth-of-type(2)').height() * $('.form-group:nth-of-type(2)').index()
          },"slow");
  },
  "click .form-group:nth-of-type(3)": function(event, template) {
      $(".page-content").animate({
            scrollTop: $('.form-group:nth-of-type(3)').height() * 3
          },"slow");
  },
  "click .form-group:nth-of-type(4)": function(event, template) {
      $(".page-content").animate({
            scrollTop: $('.form-group:nth-of-type(4)').height() * 4
          },"slow");
  },
  "click .form-group:nth-of-type(5)": function(event, template) {
      $(".page-content").animate({
            scrollTop: $('.form-group:nth-of-type(5)').height() * 5 + 10
          },"slow");
  },
  "click .form-group:nth-of-type(6)": function(event, template) {
      $(".page-content").animate({
            scrollTop: $('.form-group:nth-of-type(6)').height() * 6 + 10
          },"slow");
  },
  "click .form-group:nth-of-type(7)": function(event, template) {
    console.log(this);
  }
});
