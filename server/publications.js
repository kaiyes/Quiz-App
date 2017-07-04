Meteor.publish("courses", function(){
   return Courses.find();
});

Meteor.publish("course", function(courseName){
   return Courses.find({ courseName });
});

Meteor.publish("courseForUser", function(){
  let objArray = Meteor.users.findOne({ _id: this.userId }).profile.selectedCourses;
  let topicsChosen = _.map(objArray,'courseName');
  return Courses.find({ courseName: { $in: topicsChosen }});
});

Meteor.publish("questions", function(){
   return QuestionBank.find({ });
});

Meteor.publish("singleQuestion", function(id){
   return QuestionBank.find({ _id: id });
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



// ....................notification publication ..........................

Meteor.publish("notificationCount", function(){
  let user = Meteor.users.findOne({ _id: this.userId });
  let objArray = user.profile.selectedCourses;
  let topicsChosen = _.map(objArray,'courseName');
  let username = user.profile.name;
  return Notification.find({
    $or: [
      { type: "challange", "defender._id": this.userId, seen: { $ne: this.userId } },
      { type: "challangerFinished", "challanger._id": this.userId, seen: { $ne: this.userId } },
      { type: "post", topic: { $in: topicsChosen }, seen: { $ne: this.userId } },
      { type: "like", postCreator: username, seen: { $ne: this.userId} },
      { type: "commentLike", commentCreator: username, seen: { $ne: this.userId} },
      { type: "comment",  postCreator: this.userId, seen: { $ne: this.userId} }
    ]
  });
});

Meteor.publish("notification", function(){
  let user = Meteor.users.findOne({ _id: this.userId });
  let objArray = user.profile.selectedCourses;
  let topicsChosen = _.map(objArray,'courseName');
  let username = user.profile.name;
  return Notification.find({
    $or: [
      { type: "challange", "defender._id": this.userId, deleted: { $ne: this.userId } },
      { type: "challangerFinished", "challanger._id": this.userId, deleted: { $ne: this.userId } },
      { type: "post", topic: { $in: topicsChosen }, deleted: { $ne: this.userId } },
      { type: "like", postCreator: username, deleted: { $ne: this.userId} },
      { type: "commentLike", commentCreator: username, deleted: { $ne: this.userId} },
      { type: "comment",  postCreator: this.userId, deleted: { $ne: this.userId} },
    ]
  });
});

Meteor.publish("notifyWhen", function () {
  return Notification.find({
    $or: [
      { type: "challange", "defender._id": this.userId },
      { type: "challange", "challanger._id": this.userId },
    ]
   });
});
