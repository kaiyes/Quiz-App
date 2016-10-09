Template.login.events({
  'submit form': function(event) {
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    Meteor.loginWithPassword(email, password,
      function(error) {
        if (error) {
          console.log(error.reason);
        } else {
          Router.go('/course');
        };
      });
    $('[name="listName"]').val('');
    $('[name = password]').val('');
  }
});
