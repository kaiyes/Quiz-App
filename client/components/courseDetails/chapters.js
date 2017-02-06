Handlebars.registerHelper("inc", function(value, options){
    return parseInt(value) + 1;
});

Template.chapters.helpers({
  chapters(){
    let courseName = Session.get('topicName');
    let chapters =  Courses.findOne({courseName:courseName}).chapters;
    return chapters;
  },

  hasPlayed(){
    let courseName = Session.get('topicName');
    let playerCourses =  Meteor.user().profile.selectedCourses;
    let course = _.find(playerCourses, ['courseName', "science"]);
    let ifIncludes = _.includes(course.playedChapters, this.toString());

     if (ifIncludes) {
       return '__list';
     }
  }
});

Template.chapters.events({
  "click #list": function(event, template){
    console.log(this);
     Session.set("chapter", this.toString())
     Router.go('/challengeOpponent');

  }
});
