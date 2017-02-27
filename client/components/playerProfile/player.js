Template.player.onDestroyed(function() {
    Session.set('player', null);
});

Template.player.helpers({
    getAge(age) {
        return _.isNaN(moment().diff(age, "years")) ? "" : moment().diff(age, "years");
    },
    userInfo: function() {
        return Session.get('player');
    },
    ranking() { 
        let topicName = this.courseName;
        let rankingArray = Courses.findOne({ courseName: topicName }).ranking;
        let points = _.sortBy(rankingArray, ['points']);
        let reverse = _.reverse(points);
        let ranking = _.findIndex(reverse, { 'userId': Meteor.userId() });

        if (ranking <= 0) {
            return 'king';
        } else {
            return ranking;
        };
    },

      status(){
       let topicName = this.courseName;
       let courseArray = Meteor.user().profile.selectedCourses;
       let course = _.find(courseArray, ['courseName', topicName]);
       if(course.wantHelp===false){
           return 'zmdi zmdi-info-outline';
       }else{
           return 'zmdi zmdi-help-outline'
       }
    },
    
});

Template.player.events({

    "click #cross": function(event, instance) {
        event.preventDefault();
        window.history.back();
    },

    "click .course": function(event, instance) {
        event.preventDefault();
        let player = Session.get('player');
        Session.set('playerInfo', player);
          _.delay(function() {
            Router.go(`/hackChapter/${this.courseName}`);
        }, 100);
    },

});