Template.adminNickNames.events({
  'click .submit-profile' (event, instance) {
    event.preventDefault();
      let nickName1 = document.querySelector("#nickName1").value;
      // let nickName2 = document.querySelector("#nickName2").value;
      // let nickName3 = document.querySelector("#nickName3").value;
      // let nickName4 = document.querySelector("#nickName4").value;
      // let nickNames = [nickName1,nickName2,nickName3, nickName4];
      // let removeEmptyStuff = _.remove(nickNames, function(x) { return x === "" });
      console.log(nickName1);
      Meteor.call("insertNickName", nickName1, function (err) {
        if (!err) {
          toastr.success("New Nick Name Inserted");
        } else {
          toastr.error(err.reason);
        }
      });
  },

    "click .p-form:nth-of-type(1)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(1)').height() + 15
            },"slow");
    },
    "click .p-form:nth-of-type(2)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(2)').height() * 2
            },"slow");
    },
    "click .p-form:nth-of-type(3)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(3)').height() * 3 + 15
            },"slow");
    },
    "click .p-form:nth-of-type(4)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(4)').height() * 4 + 15
            },"slow");
    },
    "click .p-form:nth-of-type(5)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(5)').height() * 5 + 15
            },"slow");
    },
    "click .p-form:nth-of-type(6)": function(event, template) {
        $(".page-content").animate({
              scrollTop: $('.p-form:nth-of-type(6)').height() * 6 + 15
            },"slow");
    },

});
