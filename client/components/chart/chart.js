var movingAvg = require('/client/lib/moving-average.js')
Template.chart.onRendered(function () {

  this.autorun(function () {
    let ctx = document.getElementById("myChart").getContext("2d");
    let courseName = Session.get('topicName');
    let playerCourses = Meteor.user().profile.selectedCourses;
    let course = _.find(playerCourses, ['courseName', courseName]);    
    let label = Object.keys(course.accuracy);

    
    Tracker.afterFlush(function () {      
      var myLineChart = new Chart(ctx, {
        type: 'line',
        options: {
          pointRadius:0,
          responsive : true,
          elements: {
            point : {
              radius : 0,
              borderWidth: 10
            },
            line: {
              tension: .02
            }
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              display: false,
              ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.              
                beginAtZero: true   // minimum value will be 0.
              }
            }],
            xAxes: [{
              display: false
            }]
          }
        },
        data: {
          labels: course.accuracy,
          datasets: [{
            pointRadius: 0,
            borderWidth: 0,
            borderColor: '#54c5ac',
            data: movingAvg(course.accuracy),
            backgroundColor: "rgba(255,255,255,1)"
          }]
        }
      });      
    });


  });

});

