Template.mantra.events({
  "click #backButton": function(event, template){
     event.preventDefault();
     window.history.back();
  }
});
