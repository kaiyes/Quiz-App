Template.resultExplanation.helpers({

  answer: function(){
    let data = Session.get('question');
    return data;
  },

});

Template.resultExplanation.events({
  "click #cross": function(event, template){
     event.preventDefault();
     window.history.back();
  }
});
