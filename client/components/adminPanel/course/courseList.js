Template.courseList.helpers({
  courses: function(){
    Meteor.subscribe('courses');
    return Courses.find();
  },
});

Template.courseList.events({

    'click #del' (event, instance) {
      event.preventDefault();
      Courses.remove({ _id: this._id });
    },
    'click #edit' (event, instance) {
      event.preventDefault();
      Router.go(`/editCourse/${this.courseName}`);
    },

    "click #backButton": function(event, template) {
        event.preventDefault();
        window.history.back();
    },

});
