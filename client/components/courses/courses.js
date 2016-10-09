
Template.course.events({
  "click .select-course": function(event, template){
    if ($(event.target).hasClass('select-course')) {
        $('.select-course').removeClass('.select-course');
        $(event.target).toggleClass('eddy-courses--selected');
    }
    else {
      $('.select-course').removeClass('.select-course');
      $(event.target).parents('.select-course').toggleClass('eddy-courses--selected')
    }
  }
});
