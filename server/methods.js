Meteor.methods({
     addUser: function(email,password,profile){
     Accounts.createUser({
           email: email,
           password: password,
           profile: profile,
         });
     },

    addToProfile: function(profile){
      Meteor.users.update(
        { _id: this.userId },
        { $set: { profile: profile }}
      );
      console.log(profile);
    },

    removeUnusedInfo: function(){
      UserInformation.remove({ createdBy: this.userId });
    },

    insertPost: function(payload){
      Posts.insert(payload);
    },

    like: function (id,liker) {
    let likerData = {
      likes: liker
    };
    Posts.update(
        { _id: id },
        { $addToSet: likerData}
      );
    },

    increaseTotalPoints: function () {
      Meteor.users.update(
        { _id: this.userId },
        { $inc: { "profile.totalPoints": 10 }}
      );
    },

    increaseGamePoints: function () {
      Meteor.users.update(
        { _id: this.userId },
        { $inc: { "profile.gamePoints": 10 }}
      );
    },


});
