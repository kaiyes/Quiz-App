Template.homePage.onCreated(function() {
    Meteor.subscribe("courses");
    if (_.isUndefined(Session.get('last_shown')) || moment.duration(moment(moment.now()).diff(moment(Session.get('last_shown').ts))).asMinutes() > 3) {
        showLoadingScreen();
    }
});

var loadingScreenMessages = [
    "<h3>SUCCESS IS THE SUM OF SMALL EFFORTS., REPEATED DAY-IN AND DAY OUT</h3><p>Robert Collier</p>",
    "<h3>DID YOU KNOW THAT UQ WAS ESTABLISHED IN 1909?</h3>"
];

function showLoadingScreen(htmlOrStr, closeTimeout) {
    var message = loadingScreenMessages[Math.floor(Math.random() * loadingScreenMessages.length)];
    var timer = !_.isUndefined(closeTimeout) || 3000;
    Session.set('last_shown', { page: 'home', ts: moment.now() });
    $.blockUI({
        "message": message,
        css: {
            border: 0,
            color: '#51c6ac',
            width: '80%',
            left: '10%',
            zIndex: 5050,
        },
        overlayCSS: {
            opacity: 1.0,
            backgroundColor: '#FFF',
            zIndex: 5000
        }
    });
    _.delay(function() {
        $.unblockUI();
    }, timer);
}

Template.homePage.helpers({
    status() {
        let topicName = this.courseName;
        let courseArray = Meteor.user().profile.selectedCourses;
        let course = _.find(courseArray, ['courseName', topicName]);
        if (course.wantHelp === false) {
            return 'zmdi zmdi-info-outline';
        } else if (course.wantHelp === true) {
            return 'zmdi zmdi-help-outline'
        }
    },

    getAge(age) {
        return moment().diff(age, "years");
    },
    ranking() {
        let topicName = this.courseName;
        let rankingArray = Courses.findOne({ courseName: topicName }).ranking;
        let points = _.sortBy(rankingArray, ['points']);
        let reverse = _.reverse(points);
        let ranking = _.findIndex(reverse, { 'userId': Meteor.userId() });

        if (ranking <= 0) {
            return 'king';
        } else {
            return ranking;
        };
    },

    mates() {
        let topicName = this.courseName;
        let numberOfMates = Courses.findOne({ courseName: topicName }).ranking.length;
        return numberOfMates;
    },

    totalChapters() {
        let topicName = this.courseName;
        let courseArray = Meteor.user().profile.selectedCourses;
        let course = _.find(courseArray, ['courseName', topicName]);
        let totalChapters = course.totalChapters;
        return totalChapters;
    },

    playedChapters() {
        let topicName = this.courseName;
        let courseArray = Meteor.user().profile.selectedCourses;
        let course = _.find(courseArray, ['courseName', topicName]);
        let playedChapters = course.playedChapters.length;
        return playedChapters;
    },

});

Template.homePage.events({
    "click .item-content": function(event, template) {
        event.preventDefault();
        Session.set("topicName", this.courseName);
        Router.go('/courseDetails');
    },
    "click #showProfileInfo": function(event, template) {
        $('.with-subnavbar').removeClass('toggle-profile');
        $('#showProfileInfo').slideUp();
        $('#showProfileInfo').hide();
        $('.eddy-home').removeClass('margin-top-10').addClass('full-height margin-0');
        $('.eddy-home--profile-info').css({ 'margin-top': '0', 'transition': 'all 0.3s' });
        $('.eddy-home--quizes').removeClass('margin-top-90 margin-bottom-70').addClass('margin-bottom-285 full-height');

    },
    "click #hideProfileInfo": function(event, template) {
        $('.with-subnavbar').addClass('toggle-profile');
        $('#showProfileInfo').slideDown();
        $('.eddy-home').removeClass('full-height margin-0').addClass('margin-top-10');
        $('.eddy-home--profile-info').css({ 'margin-top': '-350px', 'transition': 'all 0.3s' });
        $('.eddy-home--quizes').addClass('margin-top-90 margin-bottom-70').removeClass('margin-bottom-285 full-height');
    },

    "click .needHelp": function(event, template) {
        event.preventDefault();
        Meteor.call('updateStatus', this.courseName, true);
    },

    "click .canHelp": function(event, template) {
        event.preventDefault();
        Meteor.call('updateStatus', this.courseName, false);
    },
});
