Template.chapters.helpers({
  chapters(){
    let courseName = Session.get('topicName');
    let chapters =  Courses.findOne({courseName:courseName});
    return chapters;
  },
});

Template.chapters.events({
  "click #list": function(event, template){
     Session.set("chapter", this.toString())
     Router.go('/challengeOpponent');
    
  }
});
