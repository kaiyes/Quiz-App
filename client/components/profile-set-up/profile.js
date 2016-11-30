Template.profile.onRendered(function() {
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
});

Template.profile.events({

    'change input[type="file"]' ( event, template ) {
      let imageData = event.currentTarget.files[0];
      console.log(imageData);
      Cloudinary.upload(imageData, {}, function(err, res) {
          console.log(res.url);
          Session.set('image', res.url);
          console.log("Upload Error: " + err);
          return console.log("Upload Result: " + res);
        });
    },

  'submit form': function() {
    event.preventDefault();
    let name = document.querySelector("#name").value;
    let university = document.querySelector("#university").value;
    let programme = document.querySelector("#programme").value;
    let nickname = document.querySelector("#nickname").value;
    let age = document.querySelector("#age").value;
    let country = document.querySelector("#country").value;
    let imageUrl  = Session.get('image');

    profile = {
      age: age,
      country: country,
      name: name,
      university: university,
      nickName: nickname,
      programme: programme,
      selectedCourses: Meteor.user().profile.selectedCourses,
      "totalPoints": 0,
      image:imageUrl,
      createdAt: new Date(),
      createdBy: Meteor.userId(),
    };

    Meteor.call("addToProfile", profile);
    toastr.success("created Profile");
    Router.go('/homePage');
  },

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
});
