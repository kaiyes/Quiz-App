Meteor.startup(function() {

    myApp = new Framework7({
        fastClicks: true,
        statusbarOverlay: false,
        activeState: true
    });


    $$ = Dom7;

    if (typeof StatusBar !== 'undefined') {
        StatusBar.hide();
    }

    Transitioner.default({ in: "transition.slideRightIn",
        out: "transition.slideRightOut"
    });


    $.cloudinary.config({
        cloud_name: 'jahanara',
    });


    Push.Configure({
        android: {
            senderID: 647765285364,
            alert: true,
            badge: true,
            sound: true,
            vibrate: true,
            clearNotifications: true
        },
        ios: {
            alert: true,
            badge: true,
            sound: true,
            clearBadge: true
        }
    });

});