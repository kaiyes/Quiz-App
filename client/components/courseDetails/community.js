Template.registerHelper('getTimePosted', date => {
    if (date) {
        return moment(new Date(date)).fromNow(true);
    }
});
Template.community.onCreated(function () {
    let topicName = Session.get('topicName');
    Meteor.subscribe("posts", topicName);
})
Template.community.onRendered(function () {
    $(document).on("focus", ".eddy-community--post-area--input__reply", function () {
        var outerHeight = 0;
        $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().prevAll('.eddy-community--post').each(function () {
            outerHeight += $(this).outerHeight() + 10;
        });
        var d = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().height();
        $(".page-content").animate({
            scrollTop: outerHeight + $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().height()
        }, "slow");
    });
    var jumpto = Session.get('jumpto');    
    if (!_.isUndefined(jumpto) && !_.isEmpty(jumpto)) {
        /**
         * jump to the element with the post id. 
         */
        $("#post-" + jumpto).addClass("highlighted");
        _.delay(function () {            
            $('.page-content:last').animate({
                scrollTop: $("#post-" + jumpto).offset().top - 100
            }, 200);
        }, 500);

        _.delay(function () {
            $(".highlighted").removeClass("highlighted");
            Session.delete('jumpto');
        }, 3000);            
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
        if (course.wantHelp === false) {
            return 'zmdi zmdi-info-outline';
        } else if (course.wantHelp === true) {
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
    "submit  #post": function (event, template) {
        event.preventDefault();
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
    "submit #commentForm": function (event, template) {
        event.preventDefault();
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
        _.delay(function () {
            $('#post-' + that._id).find('.eddy-community--post--comment-section').show();
        }, 1500);

    },
    "click #openCommenting": function (event, template) {
        event.preventDefault();
        // $('#post-' + this._id).find('.eddy-community--post--comments--reply, .eddy-community--post--comment-section').toggle();
        $('#post-' + this._id).find('.eddy-community--post--comments--reply').toggle();
        $('#post-' + this._id).find('.eddy-community--post--comment-section').toggle();
    },
    "click #like": function (event, template) {
        event.preventDefault();
        Meteor.call('like', this._id, Meteor.user());
    },
    "click #commentLike": function (event, template) {
        event.preventDefault();
        Meteor.call('likeAcomment', this, Meteor.user());
    },
    "click #player": function (event, template) {
        event.preventDefault();
        Session.set('player', this.createdBy);
        _.delay(function () {
            Router.go('/player');
        }, 100);
    },
    "click #commenter": function (event, template) {
        event.preventDefault();
        Session.set('player', this.commenter);
        _.delay(function () {
            Router.go('/player');
        }, 100);
    },
    "click .eddy-community--post--play-btn": function (event, template) {
        event.preventDefault();
        Session.set('playerInfo', this.createdBy);
        _.delay(function () {
            Router.go(`/hackChapter/${this.topicName}`);
        }, 100);

    },


});