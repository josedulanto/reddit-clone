Template.postItem.helpers({
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  trackback: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  votesCount: function() {
    var v = this.votes;
    if(isNaN(v)){
      v = 0;
    }
    return v;
  }
})

Template.postItem.events({
    
  'click .vote-up': function(e) {
    e.preventDefault();
    Meteor.call('voteUp', this._id, 1, function(error, id) {
      if (error)
        return notify(error.reason, 'danger');
    });
  },
  'click .vote-down': function(e) {
    e.preventDefault();
    Meteor.call('voteUp', this._id, -1, function(error, id) {
      if (error)
        return notify(error.reason, 'danger');
    })
  }
});

Template.postItem.formatDate = function(timestamp){
  return moment(timestamp).fromNow();
}
