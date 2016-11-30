// UserInformation.attachSchema(new SimpleSchema({
//
//     profilePicture: {
//       type: String,
//       optional: true,
//       autoform: {
//         afFieldInput: {
//           type: 'cloudinary'
//         }
//       }
//     },
//
//     name: {
//       type: String,
//       autoform: {
//         'label-type': 'floating',
//         placeholder : 'Name *'
//       }
//     },
//
//     university: {
//        type: String,
//        allowedValues: ['UH', 'NSU'],
//     },
//
//     programme: {
//       type: String,
//       autoform: {
//         'label-type': 'floating',
//         placeholder : 'Programme *'
//       }
//     },
//     nickName: {
//        type: String,
//        allowedValues: ['warrior', 'lion'],
//        optional:true,
//        autoform: {
//          'label-type': 'floating',
//          placeholder : 'Nickname'
//        }
//     },
//
//     age: {
//       type: Number,
//       max: 60,
//       optional:true,
//       autoform: {
//         'label-type': 'floating',
//         placeholder : 'Age'
//       }
//     },
//
//     country:{
//       type: String,
//       optional:true,
//       allowedValues: ['bd', 'uk'],
//       optional:true,
//       autoform: {
//         'label-type': 'floating',
//         placeholder : 'Country'
//       }
//     },
//
//     createdBy: {
//       type: String,
//       autoValue: function() {
//         if (this.isInsert) {
//           console.log("id inserted :  " + this.userId);
//           return this.userId;
//         } else {
//           console.log("no userId entered");;
//         }
//       }
//     }
//
// }));


// UserInformation.allow({
//
//     insert: function(userId, doc) {
//     return !! userId;
//     },
//
//     update:function(userId, doc) {
//     return !! userId;
//     },
//
//     remove:function(userId, doc) {
//     return !! userId;
//     },
//   });

  // AutoForm.addHooks('userInformation', {
  //   onSuccess: function() {
  //     var userInfo = UserInformation.findOne({ createdBy: Meteor.userId()});
  //     var profile = {
  //       "age": userInfo.age,
  //       "name": userInfo.name,
  //       "nickName": userInfo.nickName,
  //       "country": userInfo.country,
  //       "programme": userInfo.programme,
  //       "university": userInfo.university,
  //       "totalPoints": 10,
  //       "gamePoints": 10,
  //       "selectedCourses": Meteor.user().profile.selectedCourses,
  //       "image": userInfo.profilePicture,
  //   };
  //     Meteor.call('addToProfile', profile);
  //     toastr.success("created Profile");
  //     Router.go('/homePage');
  //   }
  // });


  // AutoForm.addHooks('updateInfo', {
  //   onSuccess: function() {
  //     var userInfo = UserInformation.findOne({ createdBy: Meteor.userId()});
  //     var profile = {
  //       "age": userInfo.age,
  //       "name": userInfo.name,
  //       "nickName": userInfo.nickName,
  //       "country": userInfo.country,
  //       "programme": userInfo.programme,
  //       "university": userInfo.university,
  //       "totalPoints": 10,
  //       "gamePoints": 10,
  //       "selectedCourses": Meteor.user().profile.selectedCourses,
  //       "image": userInfo.profilePicture,
  //   };
  //     Meteor.call('addToProfile', profile);
  //     toastr.success("Updated Profile");
  //     Router.go('/homePage');
  //   }
  // });
