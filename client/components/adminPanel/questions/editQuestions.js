Template.editQuestions.onRendered(function() {
  let self = this;
  self.autorun(function () {
    let user = Meteor.users.find({}).fetch();
    let id = Router.current().params._id;
    Meteor.subscribe('singleQuestion', id);
    let thisQuestion =  QuestionBank.findOne();
    Session.set('thisQuestion', thisQuestion);
    Tracker.afterFlush(function () {
      self.$( "#profileInfo" ).validate({
        rules: {
          question: {
            required: true
          },
          courseName: {
            required: true
          },
          chapterName: {
            required: true
          },
          answer1: {
            required: true
          },
          answer2: {
            required: true
          },
          answer3: {
            required: true
          },
          answer4: {
            required: true
          },
          rightAnswer: {
            required: true
          },
        },
        messages: {
          question: {
            required: 'you need to insert a question'
          },
          courseName: {
            required: 'which Course this belongs to'
          },
          chapterName: {
            required: 'which chapter this belongs to'
          },
          answer1: {
            required: 'whats the answer 1 ? '
          },
          answer2: {
            required: 'whats the answer 2 ?'
          },
          answer3: {
            required: 'whats the answer 3 ?'
          },
          answer4: {
            required: 'whats the answer 4 ? '
          },
          rightAnswer: {
            required: 'whats the right answer ?'
          },
        }
      });
    });
  });

});


Template.editQuestions.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
    if (instance.$( "#profileInfo" ).valid()) {
      let question = document.querySelector("#question").value.trim();
      let courseName = document.querySelector("#courseName").value.trim();
      let chapterName = document.querySelector("#chapterName").value.trim();
      let answer1 = document.querySelector("#answer1").value.trim();
      let answer2 = document.querySelector("#answer2").value.trim();
      let answer3 = document.querySelector("#answer3").value.trim();
      let answer4 = document.querySelector("#answer4").value.trim();
      let explanation = document.querySelector("#explanation").value.trim();
      var rightAnswer = document.querySelector("#rightAnswer").value.trim();
      let id = Router.current().params._id;

      if (rightAnswer==="1") {
        rightAnswer = answer1
      }else if (rightAnswer==="2") {
        rightAnswer = answer2
      } else if (rightAnswer==="3") {
        rightAnswer= answer3
      }else if (rightAnswer==="4") {
        rightAnswer= answer4
      }

      let obj = { question, courseName, chapterName, answer1, answer2, answer3, answer4, rightAnswer, explanation, id }
      console.log(obj);

      Meteor.call("editQuestions", obj, function (err) {
        if (!err) {
          myApp.addNotification({
            title: 'Admin',
            message: "Question Edited",
            hold:2000,
          });
          Router.go('/adminQuestions');
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

    "change #courseName": function(event, template) {
      let topic = document.querySelector("#courseName").value;
      let chapters = Courses.findOne({ courseName: topic }).chapters;
      Session.set('chapters', chapters);
      console.log(Session.get('chapters'));
    },

    "click #backButton": function(event, template) {
        event.preventDefault();
        window.history.back();
    },


});


Template.editQuestions.helpers({
  question: function(){
    let id = Router.current().params._id;
    Meteor.subscribe('singleQuestion', id);
    return QuestionBank.findOne();
  },

   courses: function(){
    Meteor.subscribe('courses');
    return Courses.find();
  },

  chapters: function(){
   Meteor.subscribe('courses');
   return Courses.find();
 },

});
