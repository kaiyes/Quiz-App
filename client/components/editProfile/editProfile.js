Template.editProfile.helpers({
   user: function(){
     return UserInformation.findOne({createdBy: Meteor.userId()});
  }
});

Template.editProfile.onRendered(function() {

});

Template.editProfile.onDestroyed(function () {
  Session.set('image', null);
});

Template.editProfile.events({

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

    'submit form': function() {
      event.preventDefault();
      let name = document.querySelector("#name").value;
      let university = document.querySelector("#university").value;
      let programme = document.querySelector("#programme").value;
      let nickname = document.querySelector("#nickname").value;
      let age = document.querySelector("#age").value;
      let country = document.querySelector("#country").value;

      profile = {
        age: age,
        country: country,
        name: name,
        university: university,
        nickName: nickname,
        programme: programme,
        selectedCourses: Meteor.user().profile.selectedCourses,
        "totalPoints": 0,
        image: Meteor.user().profile.image,
        imageId: Meteor.user().profile.imageId,
        createdAt: new Date(),
        createdBy: Meteor.userId(),
      };

      Meteor.call("addToProfile", profile);
      toastr.success("created Profile");
      Router.go('/homePage');
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
