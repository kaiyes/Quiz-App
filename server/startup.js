/**
 * Created by zahed on 1/19/17.
 */
Meteor.startup(function () {
  console.log('Eddie meteor server start at ' + moment().format('llll'));
  console.log('Eddie using ' + process.env.MONGO_URL);
});