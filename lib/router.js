
Router.route('/', {
  name: 'home',
  template: "landingPage"
});

Router.route('/signUp');
Router.route('/login');
Router.route('/course');
Router.route('/forgot-pass');
Router.route('/profile');
Router.route('/homePage');
Router.route('/courseDetails');
Router.route('/toolbar');
Router.route('/editProfile');
Router.route('/help');
Router.route('/privacy');
Router.route('/mantra.html');
Router.route('/challengeOpponent');
Router.route('/playFirst');
Router.route('/loading');
Router.route('/newProfile');
Router.route('/adminPanel');

Router.route('quiz',{
  path: '/quiz/:_id',
});

Router.route('/quizResult',{
  path: '/quizResult/:_id',
});
