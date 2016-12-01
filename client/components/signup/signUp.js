Template.signUp.onRendered(function() {
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
    };

    Meteor.call("addUser", email,password, profile, function(error,result){
      if (error) {
        toastr.error(error.reason);
      } else {
        Meteor.loginWithPassword(email, password,
          function(error) {
            if (error) {
              toastr.error(error.reason);
            } else {
              toastr.success("Signup Successful");
              Router.go('/course');
            };
          });
       }
    });

    $('[name = password]').val('');
    $('[name = email]').val('');
  },

});
