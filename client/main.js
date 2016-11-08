Meteor.startup(function(){
   myApp = new Framework7({
      fastClicks: true
    });
   $$ = Dom7;

   var courseCount = Courses.find().count();
   if (courseCount<=0) {
     Courses.insert({ "courseName": "science", "chapters":['biology', 'maths']});
     Courses.insert({ "courseName": "art", "chapters":['history', 'ভূগোল']})
   }
});
