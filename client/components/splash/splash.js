Template.splash.events({
    'popup:closed .popup-splash': function() {
        console.log("closed")
    }
});

Template.splash.onRendered(function() {
    var $$ = Dom7
        // myApp.popup('.popup-splash');
        // _.delay(function() {
        //     myApp.closeModal('.popup-splash', false);
        // }, 2000);
});