Template.player.onDestroyed(function() {
    Session.set('player', null);
});

Template.player.helpers({
    getAge(age) {
        return moment().diff(age, "years");
    },
    userInfo: function() {
        return Session.get('player');
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

});

Template.player.events({
    "click #cross": function(event, instance) {
        event.preventDefault();
        window.history.back();
    },

});