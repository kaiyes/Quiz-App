Template.toolbar.events({
  "click #home": function(event, template){
    Router.go('/homePage');
  },

});

Template.toolbar.onRendered(function() {
  $(document).ready(function	(){
    if (Framework7.prototype.device.android) {
        $('.eddy-toolbar--icon__noti--badge').css('right', '1.5rem');
      }
      else {
        $('.eddy-toolbar--icon__noti--badge').css('left', '3.2rem');
      }
  });
});
