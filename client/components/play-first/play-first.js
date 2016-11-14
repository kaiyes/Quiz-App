
Template.playFirst.helpers({
  userInfo: function(){
     return Session.get('playerInfo');
  },
}); 

Template.playFirst.events({
  "click #foo": function(event, template){

  }
});
