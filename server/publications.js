Meteor.publish('posts', function(options){
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id){
  return id && Posts.find(id);
});

Meteor.publish('comments', function(postId){
  return Comments.find({postId: postId});
});

Meteor.publish('activities', function(){
  return Activities.find({userId: this.userId});
});