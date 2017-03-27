var countdown = new ReactiveCountdown(120);

Template.playFirst.onCreated(function() {
    Session.set('shouldTimerStart', true);
    if (_.isUndefined(Session.get('last_shown_opponent')) || moment.duration(moment(moment.now()).diff(moment(Session.get('last_shown_opponent').ts))).asMinutes() > 3) {
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
    Session.set('last_shown_opponent', { page: 'choose_opponent', ts: moment.now() });
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

Template.playFirst.onRendered(function() {

    countdown.start(function() {
        if (Session.get('shouldTimerStart')) {
            myApp.addNotification({
                title: 'Quiz',
                message: "Match Failed",
                hold: 2000,
            });
            Router.go('/challengeOpponent');
        } else {}
    });

    this.autorun(function() {
        let router = Session.get('didAccept');
        if (Session.get('didAccept')) {
            countdown.stop();
            Router.go(`/quiz/${router}`);
        }

    });

});

Template.playFirst.onDestroyed(function() {
    Session.set('challangeNotification', null);
    Session.set('shouldTimerStart', false);
    Session.set('didAccept', null);
    countdown.stop();
});

Template.playFirst.helpers({
    getAge(age) {
        return moment().diff(age, "years");
    },

    userInfo: function() {
        return Session.get('playerInfo');
    },

    time: function(event, instance) {
        return countdown.get();
    },

    opponentStarted: function(event, instance) {
        var notificationData = Session.get('challangeNotification');
        var notification = Notification.findOne({
            when: notificationData.when,
        });
        Meteor.subscribe("quiz", notification.quizRoomId);
        var quizRoom = QuizRooms.findOne({
            _id: notification.quizRoomId,
        });
        if (quizRoom.defenderStarted) {
            Session.set('didAccept', quizRoom._id);
            if (Session.get('didAccept')) {
                return "accepted";
            }
        }
    },
});

Template.playFirst.events({

    "click #play": function(event, instance) {
        let sessionData = Session.get('challangeNotification');
        let time = sessionData.when;
        let handle = Notification.findOne({ when: time });
        Meteor.call("updatePlayFirst", handle.quizRoomId);
        Router.go(`/quiz/${handle.quizRoomId}`);
    },

    "click #cross": function(event, instance) {
        myApp.addNotification({
            title: 'Quiz',
            message: "Match Failed",
            hold: 2000,
        });
        Router.go('/challengeOpponent');

        let notificationData = Session.get('challangeNotification');
        let notification = Notification.findOne({
            when: notificationData.when,
        });
        let quizRoom = QuizRooms.findOne({
            _id: notification.quizRoomId,
        });

        if (notification && quizRoom) {
            Meteor.call("removeChallangeNotification", notification._id);
        };

    },
});
