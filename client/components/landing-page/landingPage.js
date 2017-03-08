Template.landingPage.events({
  "click #signupRoute": function(event, template){
    event.preventDefault();
    Router.go('signUp');
  },

  "click #loginRoute": function(event, template){
    event.preventDefault();
    Router.go('login');
  },
});

// Template.landingPage.onCreated(function() {
//   if (Meteor.userId()) {
//       Router.go('/homePage');
//     }
//   });
