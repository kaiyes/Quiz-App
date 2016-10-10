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
