Posts = new Meteor.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fields) {
    return(_.without(fields, 'title', 'url', 'message').length > 0);
  }
});

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user();
    var postWithSameLink = Posts.findOne({url: postAttributes.url});

    // validation - check if the user is signed in
    if(!user)
      throw new Meteor.Error(401, "You need to login to create a post");

    // validation - ensure the post has a title
    if (!postAttributes.title)
      throw new Meteor.Error(422, 'Please complete the fields');

    // validation - check that there are no previous posts with the same link
    if (postAttributes.url && postWithSameLink)
      throw new Meteor.Error(302, 'This URL has already been posted', postWithSameLink._id);

    // pick out the whitelisted keys
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
      userId: user._id,
      author: user.username,
      votes: 0,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  },
  voteUp: function(id, vote) {
    var post = Posts.findOne(id);
    if(!post) {
      throw new Meteor.Error(422, "Couldn't find the post");
    } else {
      Posts.update(post._id, {$set: { votes: post.votes+vote }}, function(error){
        if(error) {
          alert(error.reason);
        }
      })
    }
  }
});