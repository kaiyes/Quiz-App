Template.homePage.events({
  "click #list": function(event, template){
    console.log(this.toString());
    Session.set("topicName", this.toString());
    Router.go('/courseDetails');
 },
});
