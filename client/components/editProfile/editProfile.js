Template.editProfile.onRendered(function() {
    let self = this;
    self.autorun(function() {
        let user = Meteor.users.find({}).fetch();
        Tracker.afterFlush(function() {
            self.$("#profileInfo").validate({
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
                        required: 'please write your program'
                    }
                }
            });
        });
    });

});

Template.editProfile.helpers({
    countries: function() {
        Meteor.subscribe("countries");
        return SuxezCountries.find({});
    },

    birthYears: function() {
        return _.range(1980, moment().format("YYYY") - 10);
    },

    nickNames: function() {
      Meteor.subscribe("nickNames");
      return NickNames.find()
    },

    universities: function() {
      Meteor.subscribe("universities");
      return University.find()
    },

    getCountry: function() {
        return Meteor.user().profile.country.toUpperCase();
    },

    getAge(age) {
        return parseInt(moment(Meteor.user().profile.age, "YYYY-MM-DD").format("YYYY"), 10);
    },
    getYear(age) {
        if (age) {
            return parseInt(moment(age, "YYYY-MM-DD").format("YYYY"), 10);
        }
        return '';
    },
    user: function() {
        return UserInformation.findOne({ createdBy: Meteor.userId() });
    }
});

Template.editProfile.onDestroyed(function() {
    Session.set('image', null);
});

Template.editProfile.events({
    'click .submit-profile' (event, instance) {
        event.preventDefault();
        if (instance.$("#profileInfo").valid().trim()) {
            let name = document.querySelector("#name").value.trim();
            let university = document.querySelector("#university").value.trim();
            let programme = document.querySelector("#programme").value.trim();
            let nickname = document.querySelector("#nickname").value.trim();
            let age = $("#birthYear").val() + "-01-01"; //$("#ks-calendar-date-format").val();
            let country = document.querySelector("#country").value.toLowerCase().trim();

            let profile = {
                age: moment(age).format("YYYY-MM-DD"),
                country,
                name,
                university,
                nickName,
                programme,
                selectedCourses: Meteor.user().profile.selectedCourses,
                image: Meteor.user().profile.image,
                imageId: Meteor.user().profile.imageId,
                createdAt: new Date(),
                createdBy: Meteor.userId(),
                profileCompleted: true,
            };

            Meteor.call("addToProfile", profile, function(err) {
                if (!err) {
                    Meteor.call('updateRanking');
                    myApp.addNotification({
                        title: 'Profile',
                        message: "profile updated successfully",
                        hold: 2000,
                    });
                    Router.go('/homePage');
                } else {
                    myApp.addNotification({
                        title: 'Profile',
                        message: err,
                        hold: 2000,
                    });
                }
            });
        }
    },
    'change input[type="file"]' (event, template) {
        let imageData = event.currentTarget.files[0];

        Resizer.resize(imageData, { width: 300, height: 300, cropSquare: true }, function(err, file) {

            Cloudinary.upload(file, {}, function(err, res) {
                if (err) {
                    myApp.addNotification({
                        title: 'Profile Photo',
                        message: "couldn't upload your photo",
                        hold: 2000,
                    });
                    console.log(err);
                }
                if (file) {
                    myApp.addNotification({
                        title: 'Profile Photo',
                        message: "Profile Photo Uploaded",
                        hold: 2000,
                    });
                    Meteor.call("addPhoto", res.url, res.public_id);
                }

            });

        });

    },

    "click #remove": function(event, template) {
        Cloudinary.delete(this.imageId, function(err, res) {
            if (err) {
                myApp.addNotification({
                    title: 'Profile Photo',
                    message: "Something went wrong !!",
                    hold: 2000,
                });
            }
            if (res) {
                Meteor.call("removePhoto");
                myApp.addNotification({
                    title: 'Profile Photo',
                    message: "Removed Your Photo",
                    hold: 2000,
                });
            }
        });
    },

    "click #backButton": function(event, template) {
        event.preventDefault();
        window.history.back();
    },

    "click .p-form:nth-of-type(1)": function(event, template) {
        $(".page-content").animate({
            scrollTop: $('.p-form:nth-of-type(1)').height() + 15
        }, "slow");
    },
    "click .p-form:nth-of-type(2)": function(event, template) {
        $(".page-content").animate({
            scrollTop: $('.p-form:nth-of-type(2)').height() * 2
        }, "slow");
    },
    "click .p-form:nth-of-type(3)": function(event, template) {
        $(".page-content").animate({
            scrollTop: $('.p-form:nth-of-type(3)').height() * 3 + 15
        }, "slow");
    },
    "click .p-form:nth-of-type(4)": function(event, template) {
        $(".page-content").animate({
            scrollTop: $('.p-form:nth-of-type(4)').height() * 4 + 15
        }, "slow");
    },
    "click .p-form:nth-of-type(5)": function(event, template) {
        $(".page-content").animate({
            scrollTop: $('.p-form:nth-of-type(5)').height() * 5 + 15
        }, "slow");
    },
    "click .p-form:nth-of-type(6)": function(event, template) {
        $(".page-content").animate({
            scrollTop: $('.p-form:nth-of-type(6)').height() * 6 + 15
        }, "slow");
    },

});
