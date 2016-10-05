var myApp = new Framework7({
    router: false,
});

Template.main1.events({
  "click #1": function(event, template){
    console.log("message");
    Router.go('/main2');
  }
});
