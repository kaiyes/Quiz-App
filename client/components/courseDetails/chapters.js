
Template.chapters.helpers({
  chapters(){
    let courseName = Session.get('topicName');
    let chapters =  Courses.findOne({courseName:courseName});
    console.log(chapters);
    return chapters;
  },
});

Template.chapters.events({
  "click #list": function(event, template){
     console.log(this);
  }
});
