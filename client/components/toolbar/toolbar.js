Template.toolbar.events({
  "click #home": function(event, template){
    console.log("works");
    Router.go('/homePage');
  },

});
