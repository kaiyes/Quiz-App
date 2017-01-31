Meteor.startup(function(){

   myApp = new Framework7({
      fastClicks: true,
      materialRipple:true,
    });
   $$ = Dom7;

   Transitioner.default({
     in: "transition.slideRightIn",
     out: "transition.slideRightOut"
   });

   toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "200",
      "hideDuration": "1000",
      "timeOut": "1000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };

    $.cloudinary.config({
      cloud_name: 'jahanara',
    });


    Push.Configure({
      ios: {
        alert: true,
        badge: true,
        sound: true,
        clearBadge: true
      }
   });

});
