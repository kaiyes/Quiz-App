
Template.signUp.events({

  // "click #signUpSuccess": function(event, template){
  //   event.preventDefault();
  //   let email = event.target.email.value;
  //   let password = event.target.password.value;
  //   console.log(email);
  // //  Router.go('/course');
  // },

  "click #back": function(event, template){
    Router.go('/');
  },

  'submit form': function() {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;
    console.log(email);

    // profile = {
    //   age: "",
    //   country:"",
    //   name:"",
    // };
    //
    // Meteor.call("addUser", email,password, profile, function(error,result){
    //   if (error) {
    //     console.log(error.reason);
    //   } else {
    //     Meteor.loginWithPassword(email, password,
    //       function(error) {
    //         if (error) {
    //           console.log(error.reason);
    //         } else {
    //           Router.go('/profile')
    //         };
    //       });
    //    }
    // });

    $('[name = password]').val('');
    $('[name = email]').val('');
  },
});
