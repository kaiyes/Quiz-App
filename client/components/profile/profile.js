Template.profile.onCreated(function(){
  Meteor.subscribe("universities");
  Meteor.subscribe("nickNames");
  Meteor.subscribe('countries')
})

Template.profile.onRendered(function() {
  let self = this;

  var calendarDateFormat = myApp.calendar({
      input: '#ks-calendar-date-format',
      closeOnSelect: true,
      dateFormat: 'MM dd, yyyy'
  });

  self.$( "#profileInfo" ).validate({
    rules: {
      name: {
        required: true
      },
      university: {
        required: true
      },
      programme: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'please write your name'
      },
      university: {
        required: 'please select you university'
      },
      programme: {
        required: 'please state your program'
      }
    }
  });
});

Template.profile.helpers({
  countries: function(){
  return SuxezCountries.find({});
 },
  nickNames: function(){
    return NickNames.find()
  },
  universities:function(){
    return University.find()
  }
});


Template.profile.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
    if(instance.$( "#profileInfo" ).valid()) {
      let name = document.querySelector("#name").value;
      let university = document.querySelector("#university").value;
      let programme = document.querySelector("#programme").value;
      let nickname = document.querySelector("#nickname").value;
      let age = $("#ks-calendar-date-format").val();
      let country = document.querySelector("#country").value.toLowerCase();

      let profile = {
        age: moment(age).format("YYYY-MM-DD"),
        country: country,
        name: name,
        university: university,
        nickName: nickname,
        programme: programme,
        selectedCourses: Meteor.user().profile.selectedCourses,
        image: Meteor.user().profile.image,
        imageId: Meteor.user().profile.imageId,
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        sound:true,
        notification:true,
        profileCompleted:true,
      };

      Meteor.call("addToProfile", profile, function (err) {
        if (!err) {
          Meteor.call("addRanking");
          myApp.addNotification({
            title: 'Profile',
            message: "profile updated successfully",
            hold:2000,
          });
          Router.go('/homePage');
        }
      });
    }
  },

    'change input[type="file"]' ( event, template ) {
      let imageData = event.currentTarget.files[0];      

      Resizer.resize(imageData, {width: 300, height: 300, cropSquare: true }, function(err, file) {

        Cloudinary.upload(file, {},function(err, res) {
          if (err) {
            myApp.addNotification({
              title: 'Profile Photo',
              message: "couldn't upload your photo",
              hold:2000,
            });
            console.log( err);
          }
          if (file) {            
            myApp.addNotification({
              title: 'Profile Photo',
              message: "Profile Photo Uploaded",
              hold:2000,
            });
            Meteor.call("addPhoto", res.url, res.public_id );
          }
          });

      });
    },

    "click #remove": function(event, template) {
      Cloudinary.delete(Meteor.user().profile.imageId,function(err, res) {
            if (err) {
              myApp.addNotification({
                title: 'Profile Photo',
                message: "Something went wrong !!",
                hold:2000,
              });
            }
            if (res) {
              Meteor.call("removePhoto");
              myApp.addNotification({
                title: 'Profile Photo',
                message: "Removed Your Photo",
                hold:2000,
              });
            }
        });
    },

  'submit form': function() {
    event.preventDefault();

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

Template.profile.onDestroyed(function () {
  Session.set('image', null);
});
