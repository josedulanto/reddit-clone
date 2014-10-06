Template.userProfile.helpers({
  fullName: function() {
    var _fullName = "";
    var firstName = this.profile.firstName;
    var lastName = this.profile.lastName;
    if(typeof(firstName) !== 'undefined' && typeof(lastName) !== 'undefined')
      _fullName = firstName+" "+lastName+" "+"("+this.username+")";
    else if(typeof(firstName) !== 'undefined')
      _fullName = firstName+" "+"("+this.username+")";
    else if(typeof(lastName) !== 'undefined')
      _fullName = lastName+" "+"("+this.username+")";
    else
      _fullName = this.username;
      
    return _fullName
  }
})