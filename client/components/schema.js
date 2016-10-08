UserInformation.attachSchema(new SimpleSchema({

  /*image: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'cloudinary'
      }
    }
  },*/

  name: {
    type: String,
  },

  nickName: {
   type: String,
   allowedValues: ['warrior', 'lion'],
},

  age: {
    type: Number,
    max: 150,
    optional:true,
  },

  country:{
    type: String,
    optional:true,
    allowedValues: ['bd', 'uk'],
  },

  createdBy: {
  type: String,
  autoValue: function() {
    if (this.isInsert) {
      console.log("id inserted :  " + this.userId);
      return this.userId;
    } else {
      console.log("no userId entered");;
    }
  }
}

}));


UserInformation.allow({
    insert: function(userId, doc) {
    return !! userId;
    },

    update:function(userId, doc) {
    return !! userId;
    },

    remove:function(userId, doc) {
    return !! userId;
    },
  });

  AutoForm.addHooks('details', {
    onSuccess: function() {
       var userInfo = UserInformation.findOne({ createdBy: Meteor.userId()});
       var profile = {
         "age": userInfo.age,
         "name": userInfo.name,
         "nickName": userInfo.nickName,
         "country": userInfo.country,
         "totalPoints": 10,
         "gamePoints": 10,
       }

      Meteor.call('addToProfile', profile);
      Meteor.call("removeUnusedInfo");
      Router.go('/topics');
    }
  });
