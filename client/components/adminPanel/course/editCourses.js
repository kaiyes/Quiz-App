Template.editCourse.onRendered(function() {
  let self = this;
  self.autorun(function () {
    let user = Meteor.users.find({}).fetch();
    Tracker.afterFlush(function () {
      self.$( "#profileInfo" ).validate({
        rules: {
          courseName: {
            required: true
          },
          courseNumber: {
            required: true
          },
          chapter1: {
            required: true
          },
        },
        messages: {
          name: {
            required: 'please Pick a Course name'
          },
          chapter1: {
            required: 'Please select at 1 chapter name'
          },
          courseNumber: {
            required: 'Please add course Number'
          },
        }
      });
    });
  });

});


Template.editCourse.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
    if (instance.$( "#profileInfo" ).valid()) {
      let courseName = document.querySelector("#courseName").value.trim();
      let courseNumber = document.querySelector("#courseNumber").value.trim();
      let chapter1 = document.querySelector("#chapter1").value.trim();
      let chapter2 = document.querySelector("#chapter2").value.trim();
      let chapter3 = document.querySelector("#chapter3").value.trim();
      let chapter4 = document.querySelector("#chapter4").value.trim();
      let chapter5 = document.querySelector("#chapter5").value.trim();
      let chapter6 = document.querySelector("#chapter6").value.trim();
      let chapter7 = document.querySelector("#chapter7").value.trim();
      let chapter8 = document.querySelector("#chapter8").value.trim();
      let chapter9 = document.querySelector("#chapter9").value.trim();
      let chapter10 = document.querySelector("#chapter10").value.trim();
      let chapter11 = document.querySelector("#chapter11").value.trim();
      let chapter12 = document.querySelector("#chapter12").value.trim();
      let chapter13 = document.querySelector("#chapter13").value.trim();
      let chapter14 = document.querySelector("#chapter14").value.trim();


      let chapters = [
        chapter1,chapter2,chapter3,chapter4,chapter5,
        chapter6,chapter7,chapter8,chapter9,chapter10,
        chapter11,chapter12,chapter13,chapter14];

      let removeEmptyStuff = _.remove(chapters, function(x) { return x == "" });
      let routerCourse = Router.current().params.courseName;
      let obj = { courseName, chapters, courseNumber, routerCourse };

      Meteor.call("editCourses", obj, function (err) {
        if (!err) {
          myApp.addNotification({
            title: 'Admin',
            message: "Course Inserted",
            hold:2000,
          });
          Router.go('/adminCourses');
        } else {
          myApp.addNotification({
            title: 'Admin',
            message: err.reason,
            hold:2000,
          });
        }
      });

    }
  },

    "click .p-form:nth-of-type(1)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(1)').height() + 15
            },"slow");
    },
    "click .p-form:nth-of-type(2)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(2)').height() * 2
            },"slow");
    },
    "click .p-form:nth-of-type(3)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(3)').height() * 3 + 15
            },"slow");
    },
    "click .p-form:nth-of-type(4)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(4)').height() * 4 + 15
            },"slow");
    },
    "click .p-form:nth-of-type(5)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(5)').height() * 5 + 15
            },"slow");
    },
    "click .p-form:nth-of-type(6)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(6)').height() * 6 + 15
            },"slow");
    },

    'click #del' (event, instance) {
      event.preventDefault();
      Courses.remove({ _id: this._id });
    },
    'click #edit' (event, instance) {
      event.preventDefault();
      console.log("edit");
    },

    "click #backButton": function(event, template) {
        event.preventDefault();
        window.history.back();
    },

});


Template.editCourse.helpers({
  course: function(){
    Meteor.subscribe('courses');
    let course = Router.current().params.courseName;
    return Courses.findOne({ courseName: course });
  },
});
