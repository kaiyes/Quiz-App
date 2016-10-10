
Template.login.events({
  "click #forgotPassRoute": function(event, template){
    event.preventDefault();
    Router.go('/forgot-pass');
  }
});
