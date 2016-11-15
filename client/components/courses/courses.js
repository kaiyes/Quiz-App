Template.course.helpers({
  courses: function(){
    return Courses.find();
  },

});


Template.course.events({

  "click .select-course": function(event, template){
    if ($(event.target).hasClass('select-course')) {
        $('.select-course').removeClass('eddy-courses--selected');
        $(event.target).toggleClass('eddy-courses--selected');
    }
    else {
      $('.select-course').removeClass('eddy-courses--selected');
      $(event.target).parents('.select-course').toggleClass('eddy-courses--selected')
    }
  },

  "click #course": function(){
    event.preventDefault();
    toastr.success(`added ${this.courseName}`);
    let selectedCourses = Meteor.user().profile.selectedCourses;
    console.log(selectedCourses);
      Meteor.users.update(
        { _id: Meteor.userId()},
        { $addToSet: { "profile.selectedCourses": this.courseName }});
    },
});
