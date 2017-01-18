Template.course.helpers({
  courses: function(){
    return Courses.find();
  },

});

Template.course.onRendered(function() {
  if (Framework7.prototype.device.android) {
        $('.eddy-navbar').addClass('eddy-navbar--android');
        $('.navbar-fixed .page>.searchbar~.page-content').css('padding-top', '115px');
        $('.eddy-courses').addClass('padding-top-20');
    }else {
      $('.eddy-navbar').addClass('eddy-navbar--ios');
      $('.eddy-searchbar').css('top', '45px');
      $('.navbar-fixed .page>.searchbar~.page-content').css('padding-top', '110px');
      $('.eddy-courses--sorting').addClass('line-height-normal height-auto padding-v-8');
    }
});

Template.course.events({

  "click .select-course": function(event, template){
    if ($(event.target).hasClass('select-course')) {
        //$('.select-course').removeClass('eddy-courses--selected');
        $(event.target).toggleClass('eddy-courses--selected');
    } else {
      //$('.select-course').removeClass('eddy-courses--selected');
      $(event.target).parents('.select-course').toggleClass('eddy-courses--selected')
    }
  },

  "click #course": function(){
    event.preventDefault();
    toastr.success(`added ${this.courseName}`);
    let selectedCourses = Meteor.user().profile.selectedCourses;

    let courseData = {
      courseName : this.courseName,
      points: 10,
    };

      Meteor.users.update(
        { _id: Meteor.userId()},
        { $addToSet: { "profile.selectedCourses": courseData  }});
    },


});
