Template.adminQuestions.onRendered(function() {
  let self = this;
  self.autorun(function () {
    let user = Meteor.users.find({}).fetch();
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


Template.adminQuestions.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
    if (instance.$( "#profileInfo" ).valid()) {
      let question = document.querySelector("#question").value;
      let courseName = document.querySelector("#courseName").value;
      let chapterName = document.querySelector("#chapterName").value;
      let answer1 = document.querySelector("#answer1").value;
      let answer2 = document.querySelector("#answer2").value;
      let answer3 = document.querySelector("#answer3").value;
      let answer4 = document.querySelector("#answer4").value;
      let explanation = document.querySelector("#explanation").value;
      var rightAnswer = document.querySelector("#rightAnswer").value;

      if (rightAnswer==="1") {
        rightAnswer = answer1
      }else if (rightAnswer==="2") {
        rightAnswer = answer2
      } else if (rightAnswer==="3") {
        rightAnswer= answer3
      }else if (rightAnswer==="4") {
        rightAnswer= answer4
      }

      let obj = { question, courseName, chapterName, answer1, answer2, answer3, answer4, rightAnswer, explanation }
      console.log(obj);

      Meteor.call("insertQuestions", obj, function (err) {
        if (!err) {
          myApp.addNotification({
            title: 'Admin',
            message: "Question Inserted",
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
