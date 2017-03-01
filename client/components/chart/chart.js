Template.chart.onRendered(function () {

  this.autorun(function(){
    let ctx = document.getElementById("myChart").getContext("2d");
    let courseName = Session.get('topicName');
    let playerCourses =  Meteor.user().profile.selectedCourses;
    let course = _.find(playerCourses, ['courseName', courseName]);
    let label = Object.keys(course.accuracy);

    let data = {
      labels: label,
      datasets: [{
            label: 'My First dataset',
            fillColor: "#51c8ac",
            strokeColor: "rgba(223, 219, 219, 1)",
            pointColor: "rgba(105, 98, 98, 1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#e4ecc5",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: course.accuracy,
          }],
    };

    var options = {
      scaleShowLabels: false,
    };

    Tracker.afterFlush(function(){
      let myLineChart = new Chart(ctx).Line(data, options);
    });


  });

});
