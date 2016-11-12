Template.challengeOpponent.onRendered(function() {
    if (Framework7.prototype.device.android) {
      $('.eddy-challenge-mrgn-top').addClass('margin-top-56');
    }else {
      $('.eddy-challenge-mrgn-top').addClass('margin-top-48');
    }
});
