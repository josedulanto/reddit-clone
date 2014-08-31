Template.activities.helpers({
  activities: function(){
    return Activities.find({userId: Meteor.userId(), read: false});
  },
  activitiesCount: function(){
    return Activities.find({userId: Meteor.userId(), read: false}).count();
  }
});

Template.activity.helpers({
  activityPostPath: function(){
    return Router.routes.postShow({_id: this.postId})
  }
});

Template.activity.events({
  'click a': function(){
    Activities.update(this._id, { $set: { read: true } })
  }
})