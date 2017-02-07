Template.chart.onRendered(function () {

  let ctx = document.getElementById("myChart").getContext("2d");
  let courseName = Session.get('topicName');
  let playerCourses =  Meteor.user().profile.selectedCourses;
  let course = _.find(playerCourses, ['courseName', courseName]);

  let data = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [{
        label: 'My First dataset',
        fillColor: "rgba(22, 222, 102, 0.2)",
          strokeColor: "rgba(223, 219, 219, 1)",
          pointColor: "rgba(252, 245, 245, 1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#e4ecc5",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: course.accuracy,
        }],
  };
  let myLineChart = new Chart(ctx).Line(data);

});
