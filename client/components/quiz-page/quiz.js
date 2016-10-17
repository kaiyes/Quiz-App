Template.quiz.events({
  "click .eddy-quiz--option-btn": function(event, template){
    event.stopPropagation();
    $('.toggle-opacity').addClass('opacity-20');
    $('.eddy-quiz--option').css('top', '0');
  },

  "click .eddy-quiz--option--close": function(event, template){
    $('.eddy-quiz--option').css({'top': '-120px', 'transition': 'all 0.3s'});
    $('.toggle-opacity').removeClass('opacity-20');
  },

  "click .eddy-quiz--option--ok": function(event, template){
    $('.eddy-quiz--option').css({'top': '-120px', 'transition': 'all 0.3s'});
    $('.toggle-opacity').removeClass('opacity-20');
  },

  "click .toggle-opacity": function(event, template){
    $('.eddy-quiz--option').css({'top': '-120px', 'transition': 'all 0.3s'});
    $('.toggle-opacity').removeClass('opacity-20');
  },

  "click .eddy--sqr-buttons__price": function(event, template) {
    event.preventDefault();
    Router.go('/quiz-result');
  },
  "click .eddy--sqr-buttons__plan": function(event, template) {
    event.preventDefault();
    Router.go('/quiz-result');
  },
  "click .eddy--sqr-buttons__place": function(event, template) {
    event.preventDefault();
    Router.go('/quiz-result');
  },
  "click .eddy--sqr-buttons__product": function(event, template) {
    event.preventDefault();
    Router.go('/quiz-result');
  }
});
