Template.course.onRendered(function() {
  // $(document).ready(function() {
  //   $(".select-course").click(function() {
  //     $('.select-course').removeClass('eddy-courses--selected');
  //     $(this).toggleClass('eddy-courses--selected');
  //   });
  // });
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
  }
});
