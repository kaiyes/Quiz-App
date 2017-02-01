Template.privacy.events({
  "click #backButton": function(event, template){
     event.preventDefault();
     window.history.back();
  }
});
