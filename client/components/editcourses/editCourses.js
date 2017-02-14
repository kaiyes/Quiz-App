Template.editCourses.helpers({
    objectToPairs: function(object) {
        return _.map(object, function(value, key) {
            return {
                key: key,
                value: value
            }
        })
    },
    getIndex: function(obj) {
        return _.first(_.keys(obj))
    },
    hasCources: function(obj) {
        return !_.isEmpty(_.first(_.values(obj)))
    },
    getValue: function(obj) {
        return _.values(obj)
    },
    courses: function() {
        var all_courses = Courses.find().fetch()

        var grouped = _.chain(all_courses).groupBy(function(v) {
                return v.courseName.substr(0, 1).toUpperCase()
            })
            .mapValues(function(v) {
                return _.transform(v, _.ary(_.extend, 2), {})
            })
            .value()


        var alphabets = _(_.range(65, 91)).map(function(v) {
            return String.fromCharCode(v)
        }).map(function(v) {
            var obj = {}
            obj[v] = _.isUndefined(grouped[v]) ? {} : grouped[v]
            return obj
        }).value()

        return alphabets
    },

    addedCourse() {
        let playerCourses = Meteor.user().profile.selectedCourses
        let course = _.map(playerCourses, 'courseName')
        let ifIncludes = _.includes(course, this.courseName)

        if (ifIncludes) {
            Session.set(`${this.courseName}`, true)
            return 'eddy-courses--selected'
        }
    }
})

Template.editCourses.onRendered(function() {
    var mySearchbar = myApp.searchbar('.searchbar', {
        searchList: '.list-block-search',
        searchIn: '.course-title'
    });
    if (Framework7.prototype.device.android) {
        $('.eddy-navbar').addClass('eddy-navbar--android')
        $('.navbar-fixed .page>.searchbar~.page-content').css('padding-top', '115px')
        $('.eddy-courses').addClass('padding-top-20')
    } else {
        $('.eddy-navbar').addClass('eddy-navbar--ios')
        $('.eddy-searchbar').css('top', '45px')
        $('.navbar-fixed .page>.searchbar~.page-content').css('padding-top', '110px')
        $('.eddy-courses--sorting').addClass('line-height-normal height-auto padding-v-8')
    }
})

Template.editCourses.events({
    'click .select-course': function(event, template) {
        if ($(event.target).hasClass('select-course')) {
            $(event.target).toggleClass('eddy-courses--selected')
        } else {
            $(event.target).parents('.select-course').toggleClass('eddy-courses--selected')
        }
    },

    'click #course': function() {
        event.preventDefault()
        let selectedCourses = Meteor.user().profile.selectedCourses
        let courseData = {
            courseName: this.courseName,
            points: 0,
            courseNumber: this.courseNumber,
            accuracy: [],
            playedChapters: [],
            totalChapters: this.chapters.length
        }
        if (Session.get(`${this.courseName}`) === true) {
            Session.set(`${this.courseName}`, false)
            console.log(Session.get(`${this.courseName}`))
            Meteor.call('removeCourse', courseData, function(error, result) {
                if (error) {
                    toastr.warning('something went wrong')
                    console.log(error)
                } else {
                    toastr.error(`removed ${courseData.courseName}`)
                }
            })
        } else {
            Session.set(`${this.courseName}`, true)
            console.log(Session.get(`${this.courseName}`))
            Meteor.call('addCourse', courseData, function(error, result) {
                if (error) {
                    toastr.warning('something went wrong')
                    console.log(error)
                } else {
                    toastr.success(`added ${courseData.courseName}`)
                }
            })
        }
    },

    'click #back': function(event, template) {
        event.preventDefault()
        window.history.back()
    }

})