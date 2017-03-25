Template.courseDetails.onRendered(function() {    
    if (!_.isEmpty(window.location.hash) && window.location.hash !== $(".subnavbar .active").attr("href")) {
        myApp.showTab(window.location.hash);
    }
    if (Framework7.prototype.device.android) {
        $('.eddy-tabs').addClass('margin-top-105');
    } else {
        $('.eddy-tabs').addClass('margin-top-90');
    }
});

Template.courseDetails.helpers({
    selectedCourse() {
        return Session.get('topicName');
    },

});

Template.courseDetails.events({
    "click #openTopicList": function(event, template) {
        event.preventDefault();
        $('.eddy-courseDetails__select-topic').addClass('opened');
        $('.pages').addClass('opacity-50');
        $('.toolbar').addClass('opacity-30');
    },
    "click #closeTopicList": function(event, template) {
        $('.eddy-courseDetails__select-topic').removeClass('opened');
        $('.pages').removeClass('opacity-50');
        $('.toolbar').removeClass('opacity-30');
    },
    "click .eddy-courseDetails__select-topic": function(event, Template) {
        event.preventDefault();
    },
    "click .toolbar": function(event, Template) {
        $('.eddy-courseDetails__select-topic').removeClass('opened');
        $('.pages').removeClass('opacity-50');
        $('.toolbar').removeClass('opacity-30');
    },
    "click .pages": function(event, Template) {
        $('.eddy-courseDetails__select-topic').removeClass('opened');
        $('.pages').removeClass('opacity-50');
        $('.toolbar').removeClass('opacity-30');
    },

    "click #popUpList": function(event, template) {
        event.preventDefault();
        Session.set("topicName", this.courseName);
        $('.eddy-courseDetails__select-topic').removeClass('opened');
        $('.pages').removeClass('opacity-50');
        $('.toolbar').removeClass('opacity-30');
    },


});
