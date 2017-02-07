Meteor.startup(function(){

   myApp = new Framework7({
      fastClicks: true,
      materialRipple:true,
      statusbarOverlay:false,
    });
   $$ = Dom7;

   StatusBar.hide();

   Transitioner.default({
     in: "transition.slideRightIn",
     out: "transition.slideRightOut"
   });

   toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-full-width",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "100",
      "hideDuration": "1000",
      "timeOut": "1000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut",
    };

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
