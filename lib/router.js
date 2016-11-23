
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
Router.route('/quiz-result');
Router.route('/toolbar');
Router.route('/editProfile');
Router.route('/help');
Router.route('/privacy');
Router.route('/mantra');
Router.route('/challengeOpponent');
Router.route('/playFirst');

Router.route('/quiz');
// , {
//   path: '/quiz/:_id',
//
//   onBeforeAction: function() {
//     var verify = Meteor.user().emails[0].verified;
//     var hasDb = Meteor.user().profile.hasDb;
//     var banned = Meteor.user().profile.banned;
//       if (!verify) {
//         Router.go('verifyEmail');
//       } else if (!hasDb) {
//         Router.go("details");
//       } else if (banned) {
//         Router.go("banned");
//       }
//       this.next();
//   },
//   waitOn: function() {
//     var username = Router.current().params.username;
//     var user = Meteor.user().username;
//     return [
//       Meteor.subscribe('users',username),
//       Meteor.subscribe("friends"),
//       Meteor.subscribe('conversation')
//    ]
//   },
//
//   data: function(){
//     var user = Meteor.users.findOne({
//       username: this.params.username
//      });
//     return user;
//    }
//  }
