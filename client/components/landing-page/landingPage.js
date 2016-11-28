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

Template.landingPage.onCreated(function() {
  // var currentLoginToken = localStorage.key(Accounts._storeLoginToken);
  //     if (currentLoginToken) {
  //         Accounts.loginWithToken(currentLoginToken);
  //         Router.go('/homePage');
  //     }

  if (Meteor.userId()) {
      Router.go('/homePage');
    }
  });
