Handlebars.registerHelper ('truncate', function (str, len) {
    if (!_.isUndefined(str) && str.length > len && str.length > 0) {
        var new_str = str + " ";
        new_str = str.substr (0, len);
        new_str = str.substr (0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

        return new Handlebars.SafeString ( new_str +'...' );
    }
    return str;
});

Template.registerHelper('getTimePosted', date => {
    if (date) {
        return moment(new Date(date)).fromNow(true);
    }
});


Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});

Handlebars.registerHelper('selected', function(foo, bar) {
    return foo == bar ? ' selected' : '';
});


Template.registerHelper('photo', userId => {
    let photo =  Meteor.users.findOne({ _id: userId }).profile.image;
    if (photo===" ") {
      return "/assets/generic_800.png";
    } else {
      return photo;
    }
});

Template.registerHelper('status', (courseName, userId) => {
    let courses =  Meteor.users.findOne({ _id: userId }).profile.selectedCourses;
    let thisCourse = _.find(courses, ['courseName', courseName]);
    let status = thisCourse.wantHelp;
    if (status === false) {
        return 'zmdi zmdi-info-outline';
    } else if (status === true) {
        return 'zmdi zmdi-help-outline'
    }
})
