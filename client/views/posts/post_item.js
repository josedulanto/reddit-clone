var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null);

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
    if(isNaN(v))
      v = 0;
    
    return v;
  },
  attributes: function() {
    var post = _.extend({}, Positions.findOne({postId: this._id}), this);
    var newPosition = post._rank * POST_HEIGHT;
    var attributes = {};
    
    if (_.isUndefined(post.position)) {
      attributes.class = 'post invisible';
    } else {
      var delta = post.position - newPosition;
      attributes.style = "top: " + delta + "px";
      
      if (delta === 0)
        attributes.class = "post animate"
    }

    Meteor.setTimeout(function() {
      Positions.upsert({postId: post._id}, {$set: {position: newPosition}})
    });
    
    return attributes;
  }
});

Template.postItem.events({
    
  'click .vote-up': function(e) {
    e.preventDefault();
    Meteor.call('vote', this._id, 1, function(error, id) {
      if (error)
        return notify(error.reason, 'danger');
    });
  },
  'click .vote-down': function(e) {
    e.preventDefault();
    if(this.votes === 0) {
      return false;
    } else {
      Meteor.call('vote', this._id, -1, function(error, id) {
        if (error)
          return notify(error.reason, 'danger');
      })
    }
  }
});