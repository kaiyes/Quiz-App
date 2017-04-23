Router.configure({
    layoutTemplate: 'layOut'
});

Router.route('/', {
  name: 'home',
  template: "landingPage",

  onBeforeAction: function() {
    if (Meteor.userId()) {
        Router.go('/homePage');
    } else {
      this.next();
    }
  }});

Router.route('/signUp');
Router.route('/login');
Router.route('/forgot-pass');
Router.route('/profile');
Router.route('/courseDetails');
Router.route('/courseDetails/:_timestamp',{
  layoutTemplate : 'courseDetails'
});
Router.route('/courseDetailsJump/:_timestamp',{
  layoutTemplate : 'courseDetails'
});
Router.route('/toolbar');
Router.route('/editProfile');
Router.route('/help');
Router.route('/privacy');
Router.route('/mantra');
Router.route('/challengeOpponent');
Router.route('/playFirst',{
  waitOn : function(){
    return Meteor.subscribe('notifyWhen');
  }
});
Router.route('/loading');
Router.route('/newProfile');
Router.route('/resultExplanation');
Router.route('/editCourses');
Router.route('/player');
Router.route('/adminUniversity');
Router.route('/adminQuestions');
Router.route('/adminNickNames');
Router.route('/adminCourses');
Router.route('/tell');

Router.route('quiz', {
    path: '/quiz/:_id',
});

Router.route('/quizResult', {
    path: '/quizResult/:_id',
});


Router.route('/homePage',{

  onBeforeAction: function() {
    var isCompleted = Meteor.user().profile.profileCompleted;
    if (isCompleted === true) {
      this.next();
    } else {
      Router.go("course");
    }
  },
  waitOn: function() {
     return [
       Meteor.subscribe("notification"),
       Meteor.subscribe("courseForUser"),
    ]
   },
});

Router.route('/hackChapter', {
    path: '/hackChapter/:topicName',
});

Router.route('/course');
