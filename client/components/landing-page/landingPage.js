Template.landingPage.events({
  "click #signupRoute": function(event, template){
    Router.go('signUp');
  },

  "click #loginRoute": function(event, template){
    Router.go('login');
  },
});
