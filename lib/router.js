Router.configure({
    layoutTemplate: 'layOut'
});

Router.route('/', {
    name: 'home',
    template: "landingPage"
});

Router.route('/signUp');
Router.route('/login');
Router.route('/forgot-pass');
Router.route('/profile');
Router.route('/courseDetails');
Router.route('/toolbar');
Router.route('/editProfile');
Router.route('/help');
Router.route('/privacy');
Router.route('/mantra');
Router.route('/challengeOpponent');
Router.route('/playFirst');
Router.route('/loading');
Router.route('/newProfile');
Router.route('/resultExplanation');
Router.route('/editCourses');
Router.route('/player');
Router.route('/adminUniversity');
Router.route('/adminQuestions');
Router.route('/adminNickNames');
Router.route('/adminCourses');

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
  }
});

Router.route('/hackChapter', {
    path: '/hackChapter/:topicName',
});

Router.route('/course');