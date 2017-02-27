Template.quizResult.onCreated(function() {

    if (Meteor.user()) {
        let resultRoomId = Router.current().params._id;
        Meteor.subscribe("resultRoom", resultRoomId);
        let room = PlayedSessions.findOne({ _id: resultRoomId })

        if (Meteor.userId() === room.challanger._id) {
            let accuracy = (room.challangersRightAnswer / 6) * 100
            Session.set('percent', accuracy)
            Meteor.call("updateChallangersAccuracy", resultRoomId, accuracy)
        }
        if (Meteor.userId() === room.defender._id) {
            let accuracy = (room.defendersRightAnswer / 6) * 100
            Session.set('percent', accuracy)
            Meteor.call("updateDefendersAccuracy", resultRoomId, accuracy)
        }
        Session.set('question', room.questions[0])
        Session.set('number', 1)
    }
});


Template.quizResult.onRendered(function() {

    $(document).ready(function() {
        $(function() {
            var $ppc = $('.eddy-progress--wrapper'),
                accuracy = parseInt($ppc.data('percent')),
                deg = 360 * accuracy / 100
            if (accuracy > 50) {
                $ppc.addClass('gt-50')
            }
            $('.eddy-progress--bar--fill').css('transform', 'rotate(' + deg + 'deg)')
            $('.eddy-progress--percents span').html(accuracy + ' %')
        })
    })

});

Template.quizResult.helpers({
    ranking: function() {
        let resultRoomId = Router.current().params._id
        let room = PlayedSessions.findOne({ _id: resultRoomId })
        let topic = room.questions[0].topic

        let rankingArray = Courses.findOne({ courseName: topic }).ranking
        let points = _.sortBy(rankingArray, ['points'])
        let reverse = _.reverse(points)
        let ranking = _.findIndex(reverse, { 'userId': Meteor.userId() })

        if (ranking <= 0) {
            return 'king'
        } else {
            return ranking
        }
    },

    rightAnswer: function(answer) {
        if (this.rightAnswer === answer) {
            return 'eddy--sqr-buttons__plan__primary'
        }
    },

    usersAnswer: function(answer) {

        let resultRoomId = Router.current().params._id
        let room = PlayedSessions.findOne({ _id: resultRoomId })

        if (Meteor.userId() === room.challanger._id) {
            if (this.challangersAnswer === answer) {
                return 'eddy--sqr-buttons__product__primary'
            } else {
                return 'eddy--sqr-buttons__price'
            }
        }

        if (Meteor.userId() === room.defender._id) {
            if (this.defendersAnswer === answer) {
                return 'eddy--sqr-buttons__product__primary'
            } else {
                return 'eddy--sqr-buttons__price'
            }
        }
    },

    resultRoom: function() {
        let resultRoomId = Router.current().params._id
        return PlayedSessions.findOne({ _id: resultRoomId })
    },

    question: function() {
        let data = Session.get('question');
        return data
    },

    indexOfTopic: function() {
        let resultRoomId = Router.current().params._id
        let room = PlayedSessions.findOne({ _id: resultRoomId })
        let topic = room.questions[0].topic
        let userCourseArray = Meteor.user().profile.selectedCourses
        let courseObject = _.find(userCourseArray, { 'courseName': topic })
        return courseObject
    },

    whoWon: function() {
        let resultRoomId = Router.current().params._id;
        let room = PlayedSessions.findOne({ _id: resultRoomId })

        if (room.playfirst) {
            return 'Waiting for opponent'
        } else {
            if (room.challangersPoint > room.defendersPoint) {
                if (Meteor.userId() === room.challanger._id) {
                    return 'you won :D'
                } else {
                    return 'you lost :('
                }
            } else if (room.challangersPoint < room.defendersPoint) {
                if (Meteor.userId() === room.challanger._id) {
                    return 'you lost :('
                } else {
                    return 'you won :D'
                }
            };
        }
    },

    challengerDull: function() {
        let resultRoomId = Router.current().params._id
        let room = PlayedSessions.findOne({ _id: resultRoomId })

        if (room.playfirst) {
            if (room.challangerPlayed === false) {
                return '-dull'
            }
        }
        return ''
    },

    defenderDull: function() {
        let resultRoomId = Router.current().params._id
        let room = PlayedSessions.findOne({ _id: resultRoomId })

        if (room.playfirst) {
            if (room.defenderPlayed === false) {
                return '-dull'
            }
        }
        return ''
    },

});


Template.quizResult.events({

    "click #community": function(event, template) {
        event.preventDefault();
        Router.go('/courseDetails#community');
    },

    "click #playAgain": function(event, template) {
        event.preventDefault();
        let resultRoomId = Router.current().params._id;
        let room = PlayedSessions.findOne({ _id: resultRoomId });
        let chapter = room.questions[0].chapter;
        if (Meteor.userId() === room.challanger._id) {
            Session.set('playerInfo', room.defender);
        }
        if (Meteor.userId() === room.defender._id) {
            Session.set('playerInfo', room.challanger);
        }

        let notificationData = {
            challanger: Meteor.user(),
            defender: Session.get('playerInfo'),
            when: new Date(),
            topic: Session.get('topicName'),
            chapter: chapter,
        };

        Session.set('challangeNotification', notificationData);
        Meteor.call("insertChallangeNotification", notificationData);
        Router.go('/playFirst');
    },

    "click #playAnother": function(event, template) {
        event.preventDefault();
        Router.go('/challengeOpponent');
    },

    "click #cross": function(event, template) {
        event.preventDefault();
        Router.go('/challengeOpponent');
    },

    "click #left": function(event, template) {
        event.preventDefault();
        let resultRoomId = Router.current().params._id;
        let room = PlayedSessions.findOne({ _id: resultRoomId });
        let currentNumber = Session.get('number');
        if (currentNumber === 1) {
            Session.set('number', 6);
        } else {
            Session.set('number', currentNumber - 1);
        }

        var session = Session.get('number');
        switch (session) {
            case 1:
                Session.set('question', room.questions[0]);
                break;
            case 2:
                Session.set('question', room.questions[1]);
                break;
            case 3:
                Session.set('question', room.questions[2]);
                break;
            case 4:
                Session.set('question', room.questions[3]);
                break;
            case 5:
                Session.set('question', room.questions[4]);
                break;
            case 6:
                Session.set('question', room.questions[5]);
                break;
            default:
                Session.set('question', room.questions[6]);
        }
    },

    "click #right": function(event, template) {
        event.preventDefault();
        let resultRoomId = Router.current().params._id;
        let room = PlayedSessions.findOne({ _id: resultRoomId });
        let currentNumber = Session.get('number');
        if (currentNumber === 6) {
            Session.set('number', 1);
        } else {
            Session.set('number', currentNumber + 1);
        }

        var session = Session.get('number');
        switch (session) {
            case 1:
                Session.set('question', room.questions[0]);
                break;
            case 2:
                Session.set('question', room.questions[1]);
                break;
            case 3:
                Session.set('question', room.questions[2]);
                break;
            case 4:
                Session.set('question', room.questions[3]);
                break;
            case 5:
                Session.set('question', room.questions[4]);
                break;
            case 6:
                Session.set('question', room.questions[5]);
                break;
            default:
                Session.set('question', room.questions[1]);
        }
    },

    "click .pops": function(event, template) {
        var popupHTML = '<div class="popup chapter-popup">' +
                            '<div class="flex-direction--column full-height">' +
                              '<div class="flex--1">'+

                                ' <div id="cross" class="flex-direction--row flex-justify-content--flex-end padding-top-10 padding-right-10">'+
                                  ' <a href="#" class="link icon-only text-center">'+
                                    '<i class="close-popup zmdi zmdi-close eddy-result-exp__close font-size-fixed-24 margin-top-10"></i>'+
                                  ' </a>'+
                                  '</div>'+

                                  '<div class="eddy-result-exp margin-top-60 padding-h-30">'+
                                    '<h4 class="eddy-result-exp__title font-size-fixed-14 margin-0 text-center">'+
                                      this.question+
                                    '</h4>'+
                                    '<p class="font-size-fixed-12 line-height-bigger eddy-result-exp__content margin-top-30">'+
                                      this.explanation+
                                    '</p>'+
                                  '</div>'+

                                '</div>'+
                              '</div>'+
                          '</div>'
        myApp.popup(popupHTML);
        event.preventDefault();
    },

});
