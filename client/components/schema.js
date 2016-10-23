UserInformation.attachSchema(new SimpleSchema({

    profilePicture: {
      type: String,
      optional: true,
      autoform: {
        afFieldInput: {
          type: 'cloudinary'
        }
      }
    },

    name: {
      type: String,
      label: "Number of copies *",
      autoform: {
        'label-type': 'floating',
        placeholder: 'First Name'
      }
    },

    programme: {
      type: String,
    },

    university: {
     type: String,
     allowedValues: ['UH', 'NSU'],
  },

    nickName: {
     type: String,
     allowedValues: ['warrior', 'lion'],
  },

  country:{
    type: String,
    optional:true,
    allowedValues: ['bd', 'uk'],
  },

  age: {
    type: Number,
    max: 60,
    optional:true,
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

  AutoForm.addHooks('userInformation', {
    onSuccess: function() {
       var userInfo = UserInformation.findOne({ createdBy: Meteor.userId()});

       var profile = {
         "age": userInfo.age,
         "name": userInfo.name,
         "nickName": userInfo.nickName,
         "country": userInfo.country,
         "programme": userInfo.programme,
         "university": userInfo.university,
         "totalPoints": 10,
         "gamePoints": 10,
         "selectedCourses": Meteor.user().profile.selectedCourses,
         "image": userInfo.profilePicture,
       }

      Meteor.call('addToProfile', profile);
      Meteor.call("removeUnusedInfo");
      Router.go('/homePage');
    }
  });
