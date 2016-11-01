Template.stats.onRendered(function() {
  $(document).ready(function	(){
    $(function(){
      var $ppc = $('.eddy-progress--wrapper'),
        percent = parseInt($ppc.data('percent')),
        deg = 360*percent/100;
      if (percent > 50) {
        $ppc.addClass('gt-50');
      }
      $('.eddy-progress--bar--fill').css('transform','rotate('+ deg +'deg)');
      $('.eddy-progress--percents span').html(percent+' %');
    });
  });
});


Template.stats.helpers({
  showMessages(){
    return Posts.find();
  },
});

Template.stats.events({

  "click #button": function(event, template){
    let value = Session.get('showComments');
    if (value==="Show") {
      Session.set("showComments", "Hide");
      console.log(Session.get('showComments'));
    } else {
      Session.set("showComments", "Show");
      console.log(Session.get('showComments'));
    }
  },
});
