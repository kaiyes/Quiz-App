Template.notification.onRendered(function () {
  Meteor.subscribe("notification");
})

Template.notification.helpers({

  challangeNotifications: function () {
    return Notification.find({
      "defender._id": Meteor.userId(),
      deleted: {
        $ne: Meteor.userId()
      },
    }, {
      sort: {
        when: -1
      }
    });
  },

  gameEndedNotifications: function () {
    return Notification.find({
      "challanger._id": Meteor.userId(),
      deleted: {
        $ne: Meteor.userId()
      },
      type:"challangerFinished",
    }, {
      sort: {
        when: -1
      }
    });
  },

  postNotifications: function () {
    if (Meteor.user()) {
      let objArray = Meteor.user().profile.selectedCourses;
      let topicsChosen = _.map(objArray, 'courseName');

      let notifications = Notification.find({
        topic: {
          $in: topicsChosen
        },
        deleted: {
          $ne: Meteor.userId()
        },
        type: "post"
      }, {
        sort: {
          when: -1
        }
      });
      return notifications;
    }
  },

  likeNotifications: function () {
    if (Meteor.user()) {
      return Notification.find({
        type: "like",
        deleted: {
          $ne: Meteor.userId()
        },
        postCreator: Meteor.user().profile.name
      }, {
        sort: {
          when: -1
        }
      });
    }
  },

  likesOnComment: function () {
    if (Meteor.user()) {
      return Notification.find({
        type: "commentLike",
        deleted: {
          $ne: Meteor.userId()
        },
        commentCreator: Meteor.user().profile.name
      }, {
        sort: {
          when: -1
        }
      });
    }
  },

  commentNotification: function () {
    if (Meteor.user()) {
      return Notification.find({
        type: "comment",
        deleted: {
          $ne: Meteor.userId()
        },
        postCreator: Meteor.user(),
      }, {
        sort: {
          when: -1
        }
      });
    }
  },

});

function altRoute() {
  _.delay(function () {
    if (Router.current().url.indexOf("courseDetailsJump") >= 0) {
      Router.go('/courseDetails#community');
    } else {
      Router.go('/courseDetailsJump/' + moment.now() + '#community');
    }
  }, 100);
}

Template.notification.events({

  "click #acceptChallange": function (event, template) {
    Meteor.call("updateOpponent", this.quizRoomId);
    Meteor.call("defenderDeleted", this._id);
    Router.go(`/quiz/${this.quizRoomId}`);
  },

  "click #denyChallange": function (event, template) {
    Meteor.call("defenderDeleted", this._id);
  },

  "click #deleteNoti": function (event, template) {
    Meteor.call("defenderDeleted", this._id);
  },

  "click #gameEnded": function (event, template) {
    event.preventDefault();
    Meteor.call("defenderDeleted", this._id);
    Router.go(`/quizResult/${this.resultRoomId}`);
  },

  "click #postNotification": function (event, template) {
    event.preventDefault();
    Session.set('jumpto', this.postId);
    Session.set('topicName', this.topic);
    altRoute();
  },

  "click #likeNotification": function (event, template) {
    event.preventDefault();
    Session.set('jumpto', this.postId);
    Session.set('topicName', this.topic);
    altRoute();
  },

  "click #likesOnComment": function (event, template) {
    event.preventDefault();
    Session.set('jumpto', this.postId);
    Session.set('topicName', this.topic);
    altRoute();
  },

  "click #commentNotification": function (event, template) {
    event.preventDefault();
    Session.set('jumpto', this.postId);
    Session.set('topicName', this.topic);
    altRoute();
  },

  "click #player": function (event, template) {
    event.preventDefault();
    Session.set('jumpto', this.postId);
    Session.set('topicName', this.topic);

    _.delay(function () {
      Router.go('/courseDetails#community');
    }, 100);
  },

  "click #playerAsLiker": function (event, template) {
    event.preventDefault();
    Session.set('jumpto', this.postId);
    Session.set('topicName', this.topic);
    altRoute();
  },

  "click #playerAsCommenter": function (event, template) {
    event.preventDefault();
    Session.set('jumpto', this.postId);
    Session.set('topicName', this.topic);

    _.delay(function () {
      Router.go('/courseDetails#community');
    }, 100);
  },

  "click #playerAsPostLiker": function (event, template) {
    event.preventDefault();
    Session.set('jumpto', this.postId);
    Session.set('topicName', this.topic);
    altRoute();
  },

  "click #playerAsPoster": function (event, template) {
    event.preventDefault();
    Session.set('jumpto', this.postId);
    Session.set('topicName', this.topic);
    altRoute();
  },

  "click #removePostNotification": function (event, template) {
    event.preventDefault();
    Meteor.call("delete", this);
  },

  "click #removeLikeNotification": function (event, template) {
    event.preventDefault();
    Meteor.call("delete", this);
  },

  "click #removeCommentsLikeNotification": function (event, template) {
    event.preventDefault();
    Meteor.call("delete", this);
  },

  "click #removeCommentsNotification": function (event, template) {
    event.preventDefault();
    Meteor.call("delete", this);
  },

});
