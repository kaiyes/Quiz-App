Template.editProfile.onRendered(function() {
    let self = this;

    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format',
        closeOnSelect: true,
        dateFormat: 'MM dd, yyyy'
    });

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
        return SuxezCountries.find({});
    },

    nickNames: function() {
        return NickNames.find()
    },

    universities: function() {
        return University.find()
    }

});


Template.editProfile.helpers({
    getAge(age) {
        if (age) {
            return moment(age, "YYYY-MM-DD").format("MMMM DD, YYYY");
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
        if (instance.$("#profileInfo").valid()) {
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
            };
            console.log(profile);

            Meteor.call("addToProfile", profile, function(err) {
                if (!err) {
                    toastr.success("profile update successfully");
                    Router.go('/homePage');
                } else {
                    toastr.error(err);
                }
            });
        }
    },
    'change input[type="file"]' (event, template) {
        let imageData = event.currentTarget.files[0];
        console.log(imageData);

        Resizer.resize(imageData, { width: 300, height: 300, cropSquare: true }, function(err, file) {

            Cloudinary.upload(file, {}, function(err, res) {
                if (err) {
                    toastr.error("couldn't upload your photo");
                    console.log(err);
                }
                if (file) {
                    console.log(res);
                    toastr.success("Photo uploaded");
                    Meteor.call("addPhoto", res.url, res.public_id);
                }

            });

        });

    },

    "click #remove": function(event, template) {
        Cloudinary.delete(this.imageId, function(err, res) {
            if (err) {
                toastr.error("Something went wrong !!");
            }
            if (res) {
                Meteor.call("removePhoto");
                toastr.success("removed your photo");
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