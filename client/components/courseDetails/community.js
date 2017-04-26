Template.community.onCreated(function() {
    let topicName = Session.get('topicName');
    Meteor.subscribe("posts", topicName);
    Meteor.subscribe("users", topicName);
})

Template.community.onRendered(function() {

    $(document).on('click', '.reply-comment', function(e) {
        $(".post-comment-form").trigger("submit");
    });
    $(document).on('submit', '.post-comment-form', function(e) {
        e.preventDefault();
        $("#comment-text").prop("disabled", true);
        if (Meteor.user().profile.sound === true) {
            new Audio('send.mp3').play();
        }
        let comment = $("#comment-text").val();
        let topicName = Session.get('topicName');
        let commentPayload = {
            body: comment,
            commenter: Meteor.user(),
            createdAt: new Date(),
            likes: [],
            postId: $("#comment-post-id").val(),
            postCreator: Session.get('comment-post-creator'),
            topic: topicName,
        };
        Meteor.call('insertComment', commentPayload);
        _.delay(function() {
            $('#post-' + $("#comment-post-id").val()).find('.eddy-community--post--comment-section').show();
            myApp.closeModal();
        }, 1500);
    });
    var jumpto = Session.get('jumpto');
    if (!_.isUndefined(jumpto) && !_.isEmpty(jumpto)) {
        $("#post-" + jumpto).removeClass("highlighted");
        /**
         * jump to the element with the post id.
         */
        $("#post-" + jumpto).addClass("highlighted");
        _.delay(function() {
            $('.page-content:last').animate({
                scrollTop: $("#post-" + jumpto).offset().top - 100
            }, 200);
        }, 100);

        _.delay(function() {
            $(".highlighted").removeClass("highlighted");
            Session.delete('jumpto');
        }, 2000);
    }
});
Template.community.helpers({
    posts() {
        let topicName = Session.get('topicName');
        return Posts.find({
            topicName: topicName
        }, {
            sort: {
                createdAt: -1
            }
        });
    },

    status() {
        let poster = Meteor.users.findOne({
            _id: this.createdBy._id
        });
        let course = _.find(this.createdBy.profile.selectedCourses, ['courseName', this.topicName]);
        if (!_.isUndefined(course) && course.wantHelp === false) {
            return 'zmdi zmdi-info-outline';
        } else if (!_.isUndefined(course) && course.wantHelp === true) {
            return 'zmdi zmdi-help-outline'
        }
    },

    commenterStatus() {
        let poster = Meteor.users.findOne({
            _id: this.commenter._id
        });
        let course = _.find(this.commenter.profile.selectedCourses, ['courseName', this.topic]);
        if (course.wantHelp === false) {
            return 'zmdi zmdi-info-outline';
        } else if (course.wantHelp === true) {
            return 'zmdi zmdi-help-outline'
        }
    },

});
Template.community.events({
    "submit  #post": function(event, template) {
        event.preventDefault();
        if (Meteor.user().profile.sound === true) {
            new Audio('send.mp3').play();
        }
        let text = event.target.text.value;
        let topicName = Session.get('topicName');
        let payload = {
            body: text,
            createdBy: Meteor.user(),
            createdAt: new Date(),
            likes: [],
            comments: [],
            topicName
        };
        Meteor.call('insertPost', payload);
        $('[name="text"]').val('');
    },
    "submit #commentForm": function(event, template) {
        event.preventDefault();
        if (Meteor.user().profile.sound === true) {
            new Audio('send.mp3').play();
        }
        let comment = event.target.comment.value;
        let topicName = Session.get('topicName');
        let commentPayload = {
            body: comment,
            commenter: Meteor.user(),
            createdAt: new Date(),
            likes: [],
            postId: this._id,
            postCreator: this.createdBy,
            topic: topicName,
        };
        Meteor.call('insertComment', commentPayload);
        $('[name="comment"]').val('');
        let that = this;
        _.delay(function() {
            $('#post-' + that._id).find('.eddy-community--post--comment-section').show();
        }, 1500);

    },
    "click #openCommenting": function(event, template) {
        event.preventDefault();
        // $('#post-' + this._id).find('.eddy-community--post--comments--reply, .eddy-community--post--comment-section').toggle();
        $('#post-' + this._id).find('.eddy-community--post--comments--reply').toggle();
        $('#post-' + this._id).find('.eddy-community--post--comment-section').toggle();
    },
    "click #like": function(event, template) {
        event.preventDefault();
        Meteor.call('like', this._id, Meteor.user());
    },
    "click #commentLike": function(event, template) {
        event.preventDefault();
        Meteor.call('likeAcomment', this, Meteor.user());
    },
    "click #player": function(event, template) {
        event.preventDefault();
        Session.set('player', this.createdBy);
        _.delay(function() {
            Router.go('/player');
        }, 100);
    },
    "click .reply-link": function(event, template) {
        Session.set('comment-post-creator', this.createdBy);
        var post_id = $(event.target).attr("id").split("-")[1];
        var popupHTML = '<div class="popup reply-popup tablet-fullscreen">' +
            '<div class="flex-direction--column full-height">' +
            '<div class="flex--1">' +
            ' <div id="cross" class="flex-direction--row flex-justify-content--flex-end padding-top-10 padding-right-10">' +
            ' <a href="#" class="close-popup link icon-only text-center padding-h-10">' +
            '<i class="zmdi zmdi-close eddy-result-exp__close font-size-fixed-24"></i>' +
            ' </a>' +
            '</div>' +
            '<div class="eddy-result-exp margin-top-60 padding-h-30">' +
            '<h4 class="eddy-result-exp__title font-size-fixed-14 margin-0 text-center">' +
            '<form method="post" id="post" class="post-comment-form flex-direction--row flex-justify-content--space-between flex-align-items--center">' +
            '<input type="hidden" id="comment-post-id" value="' + post_id + '">' +
            '<input autofocus required="reauired" id="comment-text" style="width:100%" class="eddy-community--post-area--input border-r-25 padding-10 ' +
            'height-auto" type="text" name="text" placeholder="Reply...">' +
            '</h4>' +
            '<p class="font-size-fixed-12 line-height-bigger eddy-result-exp__content margin-top-30">' +
            '<input type="submit" class="eddy--primary-button-revert reply-comment border-r-25 font-size-fixed-12" value="submit">' +
            '</p>' +
            '</form>' +
            '</div>' +

            '</div>' +
            '</div>' +
            '</div>'
        myApp.popup(popupHTML, 1, 0);
        event.preventDefault();
    },
    "click #commenter": function(event, template) {
        event.preventDefault();
        Session.set('player', this.commenter);
        _.delay(function() {
            Router.go('/player');
        }, 100);
    },
    "click .eddy-community--post--play-btn": function(event, template) {
        event.preventDefault();
        Session.set('playerInfo', this.createdBy);
        _.delay(function() {
            Router.go(`/hackChapter/${this.topicName}`);
        }, 100);

    },


});