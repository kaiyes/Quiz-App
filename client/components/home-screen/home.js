Template.homePage.helpers({
  userInfo(){
    if (Meteor.userId()) {
      console.log(Meteor.user());
      return Meteor.user().profile;
    }
    return {};
    // return UserInformation.findOne({ createdBy: Meteor.userId()});
  },
  showRanking() {
    if (!this.ranking) {
      return 'no rank';
    }
    let ranking = this.ranking;
    console.log(ranking)
    if (this.ranking === 1) {
      ranking += '<sup>st</sup>';
    } else if (this.ranking === 2) {
      ranking += '<sup>nd</sup>';
    } else if (this.ranking === 3) {
      ranking += '<sup>rd</sup>';
    } else {
      ranking += '<sup>th</sup>';
    }
    console.log(ranking);
    return Spacebars.SafeString(ranking);
  }
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
