Meteor.publish("courses", function(){
   return Courses.find();
});

Meteor.publish("universities", function(){
  return University.find();
});

Meteor.publish("nickNames", function(){
  return NickNames.find();
});

Meteor.publish("countries", function(){
  return SuxezCountries.find();
});

Meteor.publish("posts", function(topicName){
  return Posts.find({ topicName: topicName });
});

Meteor.publish("notification", function(){
  return Notification.find();
});

Meteor.publish("users", function(topicName){
  return Meteor.users.find({ 'profile.selectedCourses.courseName': topicName });
});

Meteor.publish("quiz", function(quizRoomId){
  return QuizRooms.find({ _id: quizRoomId });
});

Meteor.publish("resultRoom", function(resultRoomId){
  return PlayedSessions.find({ _id: resultRoomId });
});

Meteor.publish("resultRoomByOriginalId", function(quizRoomId){
  return PlayedSessions.find({ originalRoomId: quizRoomId })
});
