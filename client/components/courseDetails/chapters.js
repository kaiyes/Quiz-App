Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

Template.chapters.helpers({
  chapters(){
    let courseName = Session.get('topicName');
    let chapters =  Courses.findOne({courseName:courseName}).chapters;
    return chapters;
  },
});

Template.chapters.events({
  "click #list": function(event, template){
    console.log(this);
     Session.set("chapter", this.toString())
     Router.go('/challengeOpponent');

  }
});
