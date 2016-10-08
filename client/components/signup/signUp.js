
Template.signUp.events({
  "submit #signUpForm": function(event, template){
    event.preventDefault();
    Router.go('/course');
  }
});
