Template.course.helpers({
  courses: function(){
    // var courses = Courses.find().fetch();
    // var grouped = _.chain(courses).groupBy(function(v){
    // return v.courseName.substr(0,1).toUpperCase();
    // }).value();


    // var initials = Object.keys(grouped);

    // var alphabets = _(_.range(65,91)).map(function(v){
    // return String.fromCharCode(v);
    // }).map(function(v){
    // var obj={};
    // obj[v]=_.isUndefined(grouped[v]) ? [] : grouped[v];
    // return obj;
    // }).value();
    //
    // return alphabets;
    //
    // var template =  _.template(document.getElementById("tpl").innerText);
    // document.getElementById("list").innerHTML = template({data:alphabets});
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
    };

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
    // console.log(this );

  },


});
