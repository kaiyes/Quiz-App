Meteor.startup(function(){
  var myApp = new Framework7({
      materialRipple: true,
      materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, .floating-button',
      fastClicks: true
  });
  var $$ = Dom7;

});
