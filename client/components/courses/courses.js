
Template.course.onCreated(function() {
  Meteor.subscribe("courses");
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
    };

});


Template.course.helpers({
    objectToPairs: function (object) {
      return _.map(object, function (value, key) {
        return {
          key: key,
          value: value
        }
      })
    },
    getIndex: function (obj) {
      return _.first(_.keys(obj))
    },
    hasCources: function (obj) {
      return !_.isEmpty(_.first(_.values(obj)))
    },
    getValue: function (obj) {
      return _.values(obj)
    },
    courses: function () {
      var all_courses = Courses.find().fetch()

      var grouped = _.chain(all_courses).groupBy(function (v) {
        return v.courseName.substr(0, 1).toUpperCase()
      })
        .mapValues(function (v) {
          return _.transform(v, _.ary(_.extend, 2), {})
        })
        .value()


      var alphabets = _(_.range(65, 91)).map(function (v) {
        return String.fromCharCode(v)
      }).map(function (v) {
        var obj = {}
        obj[v] = _.isUndefined(grouped[v]) ? {} : grouped[v]
        return obj
      }).value()

      return alphabets
    },
});




Template.course.events({

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
      courseNumber:this.courseNumber,
      totalChapters:this.chapters.length,
    };
    if (Session.get(`${this.courseName}`)===true) {
      Session.set(`${this.courseName}`, false);
      console.log(Session.get(`${this.courseName}`));
      Meteor.call("removeCourse", courseData, function(error, result){
        if(error){
          myApp.addNotification({
            title: 'Course',
            message: 'Something Went Wrong',
            hold:2000,
          });
          console.log(error);
        } else {
          myApp.addNotification({
            title: 'Course',
            message: `removed ${courseData.courseName}`,
            hold:2000,
          });
        }
      });
    }else {
      Session.set(`${this.courseName}`, true);
      console.log(Session.get(`${this.courseName}`));
      Meteor.call("addCourse", courseData, function(error, result){
        if(error){
          myApp.addNotification({
            title: 'Course',
            message: 'Something Went Wrong',
            hold:2000,
          });
          console.log(error);
        } else {
          myApp.addNotification({
            title: 'Course',
            message: `added ${courseData.courseName}`,
            hold:2000,
          });
        }
      });
    }
  },


});
