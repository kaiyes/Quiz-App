Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper('selected', function(foo, bar) {
    return foo == bar ? ' selected' : '';
});

Template.chapters.helpers({
    chapters() {
        let courseName = Session.get('topicName');
        let chapters = Courses.findOne({ courseName: courseName }).chapters;
        return chapters;
    },

    hasPlayed() {
        let courseName = Session.get('topicName');
        let playerCourses = Meteor.user().profile.selectedCourses;
        let course = _.find(playerCourses, ['courseName', courseName]);
        let ifIncludes = _.includes(course.playedChapters, this.toString());

        if (ifIncludes) {
            return '__list';
        }
    }
});

Template.chapters.events({
    "click #list": function(event, template) {
        Session.set("chapter", this.toString())
        _.delay(function() { Router.go('/challengeOpponent') }, 100);

    }
});


Template.hackChapter.helpers({
    chapters() {
        let courseName = Session.get('topicName');
        let chapters = Courses.findOne({ courseName: courseName }).chapters;
        return chapters;
    },

    hasPlayed() {
        let courseName = Session.get('topicName');
        let playerCourses = Meteor.user().profile.selectedCourses;
        let course = _.find(playerCourses, ['courseName', courseName]);
        let ifIncludes = _.includes(course.playedChapters, this.toString());

        if (ifIncludes) {
            return '__list';
        }
    }
});

Template.hackChapter.events({
    "click .back-link": function() {
        Session.set('player', Session.get('playerInfo'));
        _.delay(function() {
            history.back();
        }, 100);
    },
    "click #list": function(event, template) {
        event.preventDefault();

        let notificationData = {
            challanger: Meteor.user(),
            defender: Session.get('playerInfo'),
            when: new Date(),
            topic: Router.current().params.topicName,
            chapter: this.toString(),
        };

        Session.set('challangeNotification', notificationData);
        Meteor.call("insertChallangeNotification", notificationData);
        _.delay(function() { Router.go('/playFirst') }, 100);
    }
});