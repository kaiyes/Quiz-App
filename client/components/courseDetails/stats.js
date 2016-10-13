Template.stats.helpers({
  showMessages(){
    return Posts.find();
  },
});

Template.stats.events({

  "click #button": function(event, template){
    let value = Session.get('showComments');
    if (value==="Show") {
      Session.set("showComments", "Hide");
      console.log(Session.get('showComments'));
    } else {
      Session.set("showComments", "Show");
      console.log(Session.get('showComments'));
    }
  },
});
