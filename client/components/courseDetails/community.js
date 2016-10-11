
Template.community.helpers({
chapters(){
  return Courses.find();
  },
});

Template.community.events({
  "click #foo": function(event, template){

  }
});
