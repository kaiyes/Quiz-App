Template.challengeOpponent.onCreated(function() {
    let topicName = Session.get('topicName');
    Meteor.subscribe("users", topicName);
    Meteor.subscribe("course", topicName);
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
        return Courses.findOne({ courseName: topicName }).ranking;
    },

    status(userId){
       let topicName = Session.get('topicName');
       let courses =  Meteor.users.findOne({ _id: userId }).profile.selectedCourses;
       let thisCourse = _.find(courses, ['courseName', topicName]);
       let status = thisCourse.wantHelp;
       if (status === false) {
           return 'zmdi zmdi-info-outline';
       } else if (status === true) {
           return 'zmdi zmdi-help-outline'
       }
    },
});

Template.challengeOpponent.events({
    "click .item-content": function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        Session.set('playerInfo', this.user);

        let notificationData = {
            challanger: Meteor.user(),
            defender: Session.get('playerInfo'),
            when: new Date(),
            topic: Session.get('topicName'),
            chapter: Session.get('chapter'),
            randomHelper: Math.random(),
        };

        Session.set('challangeNotification', notificationData);
        _.delay(function() { Meteor.call("insertChallangeNotification", notificationData); }, 100);
        _.delay(function() { Router.go('/playFirst') }, 300);
    },

    "click #playerIcon": function(event, template) {
        event.preventDefault();
        event.stopPropagation();
        Session.set('player', this.user);
        Session.set('playerStatus', this);
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
        }, { skip: parseInt(Math.floor(Math.random() * totalUser),10) });

        Session.set('playerInfo', playerInfo);

        let notificationData = {
            challanger: Meteor.user(),
            defender: Session.get('playerInfo'),
            when: new Date(),
            topic: Session.get('topicName'),
            chapter: Session.get('chapter'),
            randomHelper: Math.random(),
        };

        Session.set('challangeNotification', notificationData);
        _.delay(function() {
          Meteor.call("insertChallangeNotification", notificationData, function(err) {
              if (!err) {
                  Router.go('/playFirst');
              }
          });
        }, 300);

    },

});
