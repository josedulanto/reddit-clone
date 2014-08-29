Meteor.publish('posts', function(){
  return Posts.find();
});

Meteor.publish('comments', function(postId){
  return Comments.find({postId: postId});
});

Meteor.publish('activities', function(){
  return Activities.find();
});