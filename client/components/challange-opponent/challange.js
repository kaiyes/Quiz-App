Template.challengeOpponent.onCreated(function() {
    let topicName = Session.get('topicName');
    Meteor.subscribe("users", topicName);
})

Template.challengeOpponent.onRendered(function() {
    if (Framework7.prototype.device.android) {
        $('.eddy-challenge-mrgn-top').addClass('margin-top-56');
        $('.eddy-challenge__random-op-btn').css('top', '56px');
        $('.eddy-challenge-mrgn-top >div').addClass('padding-top-38');
    } else {
        $('.eddy-challenge-mrgn-top').addClass('margin-top-48');
        $('.eddy-challenge__random-op-btn').css('top', '44px');
        $('.eddy-challenge-mrgn-top >div').addClass('padding-top-30');
    }
});

Template.challengeOpponent.helpers({
    players: function() {
        let topicName = Session.get('topicName');
        return Meteor.users.find({
            'profile.selectedCourses.courseName': topicName,
            _id: { $ne: Meteor.userId() }
        });
    }
});

Template.challengeOpponent.events({
    "click .item-content": function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        Session.set('playerInfo', this);

        let notificationData = {
            challanger: Meteor.user(),
            defender: Session.get('playerInfo'),
            when: new Date(),
            topic: Session.get('topicName'),
            chapter: Session.get('chapter'),
        };

        Session.set('challangeNotification', notificationData);
        Meteor.call("insertChallangeNotification", notificationData);
        _.delay(function() { Router.go('/playFirst') }, 100);
    },

    "click #playerIcon": function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        Session.set('player', this);
        Router.go('/player');
    },

    'click #randomOpponent' (event) {
        event.preventDefault();
        let topicName = Session.get('topicName');
        let totalUser = Meteor.users.find({
            'profile.selectedCourses.courseName': topicName,
            _id: { $ne: Meteor.userId() }
        }).count();

        let playerInfo = Meteor.users.findOne({
            'profile.selectedCourses.courseName': topicName,
            _id: { $ne: Meteor.userId() }
        }, { skip: parseInt(Math.random() * totalUser) });

        Session.set('playerInfo', playerInfo);

        let notificationData = {
            challanger: Meteor.user(),
            defender: Session.get('playerInfo'),
            when: new Date(),
            topic: Session.get('topicName'),
            chapter: Session.get('chapter'),
        };

        Session.set('challangeNotification', notificationData);
        Meteor.call("insertChallangeNotification", notificationData, function(err) {
            if (!err) {
                Router.go('/playFirst');
            }
        });
    },

});