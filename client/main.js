Meteor.startup(function(){
   myApp = new Framework7({
      fastClicks: true,
      materialRipple:true,
    });
   $$ = Dom7;

   toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-bottom-right",
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

   var courseCount = Courses.find().count();
   if (courseCount<=0) {
     Courses.insert({ "courseName": "science", "chapters":['biology', 'maths']});
     Courses.insert({ "courseName": "art", "chapters":['history', 'ভূগোল']})
   }
});
