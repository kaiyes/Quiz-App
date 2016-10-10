Template.homePage.events({
  "click #list": function(event, template){
    console.log(this.toString());
    var topicName = Session.set("topicName", this.toString());
    Router.go('/courseDetails');
 },
});
