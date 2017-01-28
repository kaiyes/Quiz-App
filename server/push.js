Push.allow({
  send: (userId, notification) => {
    // allow all users to send notifications
    return true;
  }
});

Meteor.methods({
  'serverNotification'(title, text) {
    Push.send({
      title,
      text,
      from: 'server',
      badge: 1,
      query: {}
    });
  }
});
