Template.editCourses.helpers({
  courses: function(){
    return Courses.find();
  },

});

Template.editCourses.onRendered(function() {
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

Template.editCourses.events({

  "click .select-course": function(event, template){
    if ($(event.target).hasClass('select-course')) {
        $(event.target).toggleClass('eddy-courses--selected');
    } else {
      $(event.target).parents('.select-course').toggleClass('eddy-courses--selected')
    }
  },

  "click #course": function(){
    event.preventDefault();
    let selectedCourses = Meteor.user().profile.selectedCourses;
    let courseData = {
      courseName : this.courseName,
      points: 0,
      accuracy:[],
      playedChapters:[],
      totalChapters:this.chapters.length,
    };
    if (Session.get(`${this.courseName}`)===true) {
      Session.set(`${this.courseName}`, false);
      console.log(Session.get(`${this.courseName}`));
      Meteor.call("removeCourse", courseData, function(error, result){
        if(error){
          toastr.warning("something went wrong");
          console.log(error);
        } else {
          toastr.error(`removed ${courseData.courseName}`);
        }
      });
    }else {
      Session.set(`${this.courseName}`, true);
      console.log(Session.get(`${this.courseName}`));
      Meteor.call("addCourse", courseData, function(error, result){
        if(error){
          toastr.warning("something went wrong");
          console.log(error);
        } else {
          toastr.success(`added ${courseData.courseName}`);
        }
      });
    }

  },

  "click #back": function(event, template){
     event.preventDefault();
     window.history.back();
  }

});
