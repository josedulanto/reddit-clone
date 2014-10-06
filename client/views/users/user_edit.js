Template.userEdit.events({
  
  'submit form': function(e) {
    e.preventDefault();
    
    var currentUserId = Meteor.userId();
    
    var firstName = $(e.target).find('[name=firstName]').val();
    var lastName = $(e.target).find('[name=lastName]').val();
    
    var userProperties = {
      "profile.name": firstName+' '+lastName,
      "profile.firstName": firstName,
      "profile.lastName": lastName
    }
    
    Meteor.users.update({_id: currentUserId}, {$set: userProperties}, function(error){
      if(error) {
        return notify(error.reason, 'danger');
      } else {
        Router.go('userProfile');
      }
    })
  }
  
});