Template.homePage.helpers({
  ranking() {
    let topicName = this.courseName;
    let rankingArray =  Courses.findOne({ courseName: topicName }).ranking;
    let points = _.sortBy(rankingArray, ['points']);
    let reverse = _.reverse(points);
    let ranking = _.findIndex(reverse , {'userId': Meteor.userId() });

    if (ranking<=0) {
      return 'king';
    } else {
      return ranking;
    };

  },

});

Template.homePage.events({
  "click #list": function(event, template){
    event.preventDefault();
    console.log(this.courseName);
    Session.set("topicName", this.courseName);
    Router.go('/courseDetails');
 },
 "click #showProfileInfo": function(event, template) {
    $('.with-subnavbar').removeClass('toggle-profile');
   $('#showProfileInfo').slideUp();
   $('#showProfileInfo').hide();
   $('.eddy-home').removeClass('margin-top-10').addClass('full-height margin-0');
   $('.eddy-home--profile-info').css({'margin-top': '0', 'transition': 'all 0.3s'});
   $('.eddy-home--quizes').removeClass('margin-top-90 margin-bottom-70').addClass('margin-bottom-285 full-height');

 },
 "click #hideProfileInfo": function(event, template) {
   $('.with-subnavbar').addClass('toggle-profile');
   $('#showProfileInfo').slideDown();
   $('.eddy-home').removeClass('full-height margin-0').addClass('margin-top-10');
   $('.eddy-home--profile-info').css({'margin-top': '-350px', 'transition': 'all 0.3s'});
   $('.eddy-home--quizes').addClass('margin-top-90 margin-bottom-70').removeClass('margin-bottom-285 full-height');
 },

});
