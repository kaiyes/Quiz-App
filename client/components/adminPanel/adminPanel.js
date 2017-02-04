Template.adminPanel.onRendered(function() {
  let self = this;
  self.autorun(function () {
    let user = Meteor.users.find({}).fetch();
    Tracker.afterFlush(function () {
      self.$( "#profileInfo" ).validate({
        rules: {
          courseName: {
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

        }
      });
    });
  });

});

Template.adminPanel.helpers({

});

Template.editProfile.onDestroyed(function () {
  Session.set('image', null);
});

Template.adminPanel.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
    if (instance.$( "#profileInfo" ).valid()) {
      let courseName = document.querySelector("#courseName").value;
      let chapter3 = document.querySelector("#chapter3").value;
      let chapter2 = document.querySelector("#chapter2").value;
      let chapter1 = document.querySelector("#chapter1").value;
      let chapters = [chapter1,chapter2,chapter3];
      let removeEmptyStuff = _.remove(chapters, function(x) { return x == "" });
      let obj = { courseName, chapters }
      console.log(obj);

      Meteor.call("insertCourses", obj, function (err) {
        if (!err) {
          toastr.success("Course Inserted");
        } else {
          toastr.error(err.reason);
        }
      });

    }
  },
   'change input[type="file"]' ( event, template ) {
      let imageData = event.currentTarget.files[0];
      console.log(imageData);

      Resizer.resize(imageData, {width: 300, height: 300, cropSquare: true }, function(err, file) {

        Cloudinary.upload(file, {},function(err, res) {
            if (err) {
              toastr.error("couldn't upload your photo");
              console.log( err);
            }
            if (file) {
              console.log(res);
              toastr.success("Photo uploaded");
              Meteor.call("addPhoto", res.url, res.public_id );
            }

          });

      });

    },

    "click #remove": function(event, template) {
        Cloudinary.delete(this.imageId,function(err, res) {
              if (err) {
                  toastr.error("Something went wrong !!");
              }
              if (res) {
                Meteor.call("removePhoto");
                toastr.success("removed your photo");
              }
          });
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
