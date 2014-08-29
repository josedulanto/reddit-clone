Activities = new Meteor.Collection('activities');

Activities.allow({
  update: ownsDocument
})

activity = function(comment) {
  var post = Posts.findOne(comment.postId);
  if comment.userId !== post.userId {  
    var activityAttributes = {
      userId: post.userId,
      commentId: comment._id,
      commentAuthor: comment.author,
      commentBody: comment.body,
      postId: post._id,
      postTitle: post.title,
      postAuthor: post.author,
      createdAt: moment(),
      read: false
    }
    Activities.insert(activityAttributes);
  }
}