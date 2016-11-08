Template.homePage.events({
  "click #list": function(event, template){
    Session.set("topicName", this.toString());
    Router.go('/courseDetails');
 },
 "click #showProfileInfo": function(event, template) {
   $('#showProfileInfo').slideUp();
   $('.eddy-home--profile-info').css({'margin-top': '0', 'transition': 'all 0.3s'});
   $('.eddy-home--quizes').removeClass('margin-v-70').addClass('margin-bottom-285');
 },
 "click #hideProfileInfo": function(event, template) {
   $('#showProfileInfo').slideDown();
   $('.eddy-home--profile-info').css({'margin-top': '-172px', 'transition': 'all 0.3s'});
   $('.eddy-home--quizes').addClass('margin-v-70').removeClass('margin-bottom-285');
 }
});

Template.homePage.helpers({
  quizRankFormat(i){
      var j = i % 10,
          k = i % 100;
      if (j == 1 && k != 11) {
          return "st";
      }
      if (j == 2 && k != 12) {
          return "nd";
      }
      if (j == 3 && k != 13) {
          return "rd";
      }
      return "th";
    },

  userInfo(){
    return UserInformation.findOne({ createdBy: Meteor.userId()});
  }
});
