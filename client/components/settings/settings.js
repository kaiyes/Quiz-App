Template.settings.events({
  "click #editProfile": function(event, template){
    console.log("works");
    Router.go('/editProfile');
  }
});
