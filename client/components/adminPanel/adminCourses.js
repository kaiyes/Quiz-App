Template.adminCourses.onRendered(function() {
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

Template.adminCourses.helpers({
  courses: function(){
    return Courses.find();
  }
});

Template.adminCourses.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
    if (instance.$( "#profileInfo" ).valid()) {
      let courseName = document.querySelector("#courseName").value;
      let courseNumber = document.querySelector("#courseNumber").value;
      let chapter3 = document.querySelector("#chapter3").value;
      let chapter2 = document.querySelector("#chapter2").value;
      let chapter1 = document.querySelector("#chapter1").value;
      let chapters = [chapter1,chapter2,chapter3];
      let removeEmptyStuff = _.remove(chapters, function(x) { return x == "" });
      let obj = { courseName, chapters, courseNumber }

      Meteor.call("insertCourses", obj, function (err) {
        if (!err) {
          myApp.addNotification({
            title: 'Admin',
            message: "Course Inserted",
            hold:2000,
          });
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

});
